/**
* 电池不均衡统计详情
* szh
**/
<style lang="scss" scoped>
  .hy-right-btn {
    float: right;
    background: rgba(0, 0, 0, 0.125);
    border: 0;
    color: #777777;
  }
  .mg-t20 {
    margin-top: 20px;
  }
  .hy-search-bar2{
    margin-bottom:20px;
  }
  .title {
    padding-top: 20px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content ">
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
  import { batteryBalanceDetail, batteryBalanceDetailExcel } from '@/service/alarmService/batteryBalanceStatistics';
  import HyTable from '@/components/common/table/table.vue';
  import { mapState, mapMutations } from 'vuex';
  export default {
    components: {
      HyTable
    },
    mixins: [list],
    data () {
      return {
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: 'GPRS码',
            key: 'gprsCode'
          },
          {
            title: '不均衡等级',
            key: 'dataLevel',
            render: (h, params) => {
              return this.__filters.batteryLevel(h, params, 'dataLevel');
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'collectTime');
            }
          },
          {
            title: '压差数值（v）',
            key: 'diffVoltage'
          }
        ],
        levelArray: [{label: '一级', value: 1}, {label: '二级', value: 2}, {label: '三级', value: 3}]
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
          this.searchData.vinCode = this.$route.query.vinCode;
          this.searchData.dataLevel = this.$route.query.dataLevel;
          this.searchData.startTime = this.$route.query.startTime;
          this.searchData.endTime = this.$route.query.endTime;
          batteryBalanceDetail(this.searchData, this.callback, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '查询电池不均衡统计详情失败',
              desc: ret
            });
          });
        }
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
        }
        batteryBalanceDetailExcel(this.searchData, res => {
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
        this.$router.push({path: '/main/alarm/batteryBalanceStatistics', query: this.$route.query});
      }
    }
  };
</script>
