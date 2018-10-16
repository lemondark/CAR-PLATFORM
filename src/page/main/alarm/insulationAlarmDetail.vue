/**
* 作者：szh
* 时间：2018-03-24
* 描述：绝缘报警统计
**/
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline>
          <i-button type="success" shape="circle" style="margin-left: 10px;margin-top: 1px" @click="exports" class="export">导出
          </i-button>
          <!--工具条部分-->
          <div style="float:right">
            <i-button type="primary" @click="goBack">返回</i-button>
          </div>
        </Form>
      </div>
      <!--table部分-->
      <!--<Table border :columns="columnsTitle" :data="list" @on-selection-change="handleSelectionChange"></Table>-->
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="showCheckbox" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText"></hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="currentChange"></hy-page>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import { insulationAlarmDetail, detailExcel } from '@/service/alarmService/insulationAlarm';
  import { mapState, mapMutations } from 'vuex';

  export default {
    mixins: [list],
    components: {
      HyTable
    },
    data () {
      return {
        columnType: 'index',
        optionsVin: [],
        loading1: false,
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'gprsCode',
            title: 'GPRS号'
          },
          {
            key: 'collectTime',
            title: '采集时间',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'collectTime');
            }
          },
          {
            key: 'insulationValue',
            title: '绝缘电阻数值(kΩ)'
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      _getList () {
        if (this.$route.query) {
          let param = JSON.parse(this._hyTool.getStore('insulaParams'));
          this.searchData.vinCode = this.$route.query.vinCode;
          this.searchData.startTime = param.startTime;
          this.searchData.endTime = param.endTime;
          insulationAlarmDetail(this.searchData, this.callback, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '绝缘报警统计查询失败',
              desc: ret
            });
          });
        };
      },
      exports () {
        if (!this.list.length) {
          this.$confirm('无导出数据', '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        };
        detailExcel(this.searchData, res => {
          this.TASK_NUM(this.taskNum + 1);
          this.$confirm('已加入下载任务', '提示', {
            confirmButtonText: '知道了',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        }, ret => {
          this.$Notice.error({
            title: '加入下载任务失败',
            desc: ret
          });
        });
      },
      // 返回
      goBack () {
        this.$router.push({path: '/main/alarm/insulationAlarm', query: this.$route.query});
      }
    }
  };

</script>
