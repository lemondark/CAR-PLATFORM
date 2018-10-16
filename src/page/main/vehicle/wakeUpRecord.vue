/**
* 作者：szh
* 时间：2018-01-24
* 描述：唤醒记录
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
            <DatePicker v-model="wakeUpDate" type="daterange" :options="disabledDate" placement="bottom-start" placeholder="唤醒日期"></DatePicker>
          </FormItem>
          <FormItem label="">
            <i-input placeholder="操作人" v-model.trim="searchData.userName" style="width:200px;" clearable></i-input>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="primary" style="float:right;background:#4784ff" @click="go">返回</i-button>
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
      <!-- 详情弹出框 -->
      <Modal v-model="showDetail"  title="详情" width="75">
        <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
          <hy-table :column-type="columnAuthType" :columnsTitle="columnsDetailTitle" :list="detailList" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="detailLoading" :no-data-text="noDataText">
          </hy-table>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table.vue';
  import { wakeUpList } from '@/service/alarmService/wakeUpRecord';
  import { listAllSeries } from '@/service/vehicleManageService/basicDataService/modelService';

  export default {
    components: {
      HyTable
    },
    mixins: [list, date],
    data () {
      return {
        loading: true,
        wakeUpDate: '',
        searchData: {},
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
            title: '唤醒时间',
            key: 'callTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'callTime');
            }
          },
          {
            title: '唤醒总数',
            key: 'callNum'
          },
          {
            title: '成功总数',
            key: 'successedNum'
          },
          {
            title: '失败总数',
            key: 'failedNum'
          },
          {
            title: '操作人',
            key: 'userName'
          },
          {
            title: '操作',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top'})
              ]);
            }
          }
        ],
        showDetail: false,
        seriesList: [],
        columnsDetailTitle: [
          {
            type: 'index',
            title: '序号',
            align: 'center'
          },
          {
            title: 'VIN码',
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
        ],
        detailList: [],
        detailLoading: false
      };
    },
    mounted () {
      if (this.$route.query.current) {
        this.currentChange(this.$route.query.current);
      }
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
        if (this.wakeUpDate instanceof Array && this.wakeUpDate[0]) {
          this.searchData.callTimeBegin = this._hyTool.DateFormat(this.wakeUpDate[0], 'yyyy-MM-dd');
          this.searchData.callTimeEnd = this._hyTool.DateFormat(this.wakeUpDate[1], 'yyyy-MM-dd');
        } else {
          delete this.searchData.callTimeBegin;
          delete this.searchData.callTimeEnd;
        }
        if (this.searchData.callTimeBegin && this.searchData.callTimeEnd) {
          let bol = this.checkDate(this.searchData.callTimeBegin, this.searchData.callTimeEnd, 7);
          if (!bol) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '开始日期与结束日期间隔不能超过7天',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
        }
        if (!this.searchData.userName) {
          delete this.searchData.userName;
        }
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        wakeUpList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询唤醒记录失败',
            desc: ret
          });
        });
      },
      // 返回
      go () {
        this.$router.push({path: '/main/vehicle/vehicleException', query: {current: this.$route.query.recode}});
      },
      // 详情
      detail (row) {
        this.showDetail = true;
        this.detailList = row.vehicleCallDetails;
      }
    }
  };
</script>
