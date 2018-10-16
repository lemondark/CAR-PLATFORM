<!-- 页面取消，换成弹窗显示，可删除  20180912  by zhangxiahui -->

/**
* 作者：szh
* 时间：2018-01-24
* 描述：异常车辆唤醒详情
*/
<style lang="scss" scoped>

</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <i-input placeholder="VIN码" v-model.trim="searchData.vinCode" style="width:200px;" clearable></i-input>
          </FormItem>
          <FormItem label="">
            <i-select placeholder="车系" v-model="searchData.carSeries" clearable style="width:200px;">
              <i-option v-for="item in seriesList" :value="item" :key="item" :label="item"></i-option>
            </i-select>
          </FormItem>
          <FormItem label="">
            <i-input placeholder="GPRS号" v-model.trim="searchData.gprsNo" style="width:200px;" clearable></i-input>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <div style="float:right">
            <i-button type="primary" style="background:#4784ff" @click="go">返回</i-button>
          </div>
        </Form>
      </div>
      <hy-table :column-type="columnAuthType" :columnsTitle="columnsAuthTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
      </hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="_getList"></hy-page>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import { wakeUpDetailList } from '@/service/alarmService/wakeUpRecord';
  import { listAllSeries } from '@/service/vehicleManageService/basicDataService/modelService';

  export default {
    components: {
      HyTable
    },
    mixins: [list],
    data () {
      return {
        loading: true,
        wakeUpDate: '',
        searchData: {},
        seriesList: [],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 165,
            key: 'vinCode'
          },
          {
            title: '车系',
            key: 'carSeries'
          },
          {
            title: '车辆颜色',
            key: 'carColor'
          },
          {
            title: 'GPRS号',
            width: 160,
            key: 'gprsNo'
          },
          {
            title: '下线日期',
            key: 'outTime',
            render: (h, params) => {
              return this.__filters.formatDate(h, params, 'outTime');
            }
          },
          {
            title: '异常原因',
            key: 'exceptionInformation'
          },
          {
            title: '唤醒时间',
            key: 'callTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'callTime');
            }
          },
          {
            title: '结果',
            key: 'state',
            render: (h, params) => {
              return this.__filters.wakeUpState(h, params, 'state');
            }
          }
        ]
      };
    },
    mounted () {
      let params = {
        page: 1,
        size: 1000
      };
      listAllSeries(params, res => {
        this.seriesList = res.content;
      });
    },
    methods: {
      // 列表
      _getList (page, flag) {
        this.loading = true;
        if (!this.searchData.vinCode) {
          delete this.searchData.vinCode;
        }
        if (!this.searchData.carSeries) {
          delete this.searchData.carSeries;
        }
        if (!this.searchData.gprsNo) {
          delete this.searchData.gprsNo;
        }
        this.searchData.callRecordId = this.$route.query.id;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        wakeUpDetailList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询唤醒记录详情列表失败',
            desc: ret
          });
        });
      },
      // 返回
      go () {
        this.$router.push({path: '/main/vehicle/wakeUpRecord', query: {current: this.$route.query.currentPage}});
      }
    }
  };
</script>
