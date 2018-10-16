/**
* 作者：szh
* 时间：2018-03-8
* 描述：车辆运行统计
**/
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
            <Select
              placeholder="VIN码"
              style="width: 200px"
              v-model="searchData.vinCode"
              filterable
              remote
              transfer
              clearable
              :remote-method="vinMethod"
              ref="select"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <DatePicker type="date" v-model="searchData.timeBegin" :options="designDate" placement="bottom" placeholder="统计范围开始日期" :editable="false" :clearable="false"></DatePicker>
          </FormItem>
          <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
          <FormItem label="">
            <DatePicker type="date" v-model="searchData.timeEnd" :options="designDate" placement="bottom" placeholder="统计范围结束日期" :editable="false" :clearable="false"></DatePicker>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success" shape="circle" style="margin-left: 10px;margin-top: 1px" class="export" @click="exports">导出
          </i-button>
        </Form>
      </div>
      <Table border :columns="columnsAuthTitle" :data="list"></Table>
      <!-- 分页 -->
      <hy-page
        v-if="noVin"
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="_getList"></hy-page>
      <!-- 分页 -->
      <hy-page
        v-else
        :current-page="currentPage"
        :total-element="totalElements"
        :total-page="totalPages"
        @current-change="changePage"></hy-page>
    </div>
  </div>
</template>

<script>
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { vehicleRunningList, vehicleRunningExport } from '@/service/report/bicycleStatistics';
  import { mapMutations, mapState } from 'vuex';

  export default {
    components: {
      HyTable
    },
    mixins: [date, storeVin],
    data () {
      return {
        designDate: null,
        list: [],
        allList: [],
        noVin: true,
        totalElement: 0, // 总数
        totalPage: 1, // 总页数
        totalElements: 0, // 总数
        totalPages: 1, // 总页数
        currentPage: 1, // 当前页
        saleDate: '',
        drivingDate: '',
        loading: false,
        modalShow: false,
        searchData: {
          pageNum: 1,
          pageSize: 10,
          timeBegin: new Date(+new Date() - 86400 * 1000 * 6),
          timeEnd: new Date()
        },
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
            title: '统计日期',
            width: 120,
            key: 'statisDate',
            render: (h, params) => {
              return this.__filters.formatDate(h, params, 'statisDate');
            }
          },
          {
            title: '总里程(KM)',
            key: 'totalMileage',
            render: (h, params) => {
              let num = Math.sign(params.row.totalMileage);
              return h('p', num >= 0 ? params.row.totalMileage : 0);
            }
          },
          {
            title: '单日行驶时间(Min)',
            key: 'runningMinutes',
            render: (h, params) => {
              let num = Math.sign(params.row.runningMinutes);
              return h('p', num >= 0 ? params.row.runningMinutes : 0);
            }
          },
          {
            title: '单日行驶里程(KM)',
            key: 'runningMileage',
            render: (h, params) => {
              let num = Math.sign(params.row.runningMileage);
              return h('p', num >= 0 ? params.row.runningMileage : 0);
            }
          },
//          {
//            title: '单日在线时长(Min)',
//            width: 165,
//            key: 'yuejun'
//          },
//          {
//            title: '单日在线率(%)',
//            width: 165,
//            key: 'haodian'
//          },
          {
            title: '单日消耗电量(%)',
            key: 'socConsumption',
            render: (h, params) => {
              let num = Math.sign(params.row.socConsumption);
              if (num >= 0) {
                  let num = '';
                  if (Number.isInteger(params.row['socConsumption'])) {
                    num = params.row['socConsumption'];
                  } else {
                    num = params.row['socConsumption'].toFixed(1);
                  }
                  return h('p', num);
              } else {
                return h('p', 0);
              }
            }
          },
          {
            title: '单日耗电量(KWh)',
            key: 'powerConsumption',
            render: (h, params) => {
              let num = Math.sign(params.row.powerConsumption);
              return h('p', num >= 0 ? params.row.powerConsumption : 0);
            }
          },
//          {
//            title: '百公里耗电量(KWh/百公里)',
//            width: 165,
//            key: 'pinjun'
//          },
          {
            title: '单日行驶次数(次)',
            key: 'tripTimes',
            render: (h, params) => {
              let num = Math.sign(params.row.tripTimes);
              return h('p', num >= 0 ? params.row.tripTimes : 0);
            }
          },
          {
            title: '单日平均车速(Km/h)',
            key: 'avgSpeed',
            render: (h, params) => {
              let num = Math.sign(params.row.avgSpeed);
              return h('p', num >= 0 ? params.row.avgSpeed : 0);
            }
          },
          {
            title: '单日充电次数(次)',
            key: 'chargeTimes',
            render: (h, params) => {
              let num = Math.sign(params.row.chargeTimes);
              return h('p', num >= 0 ? params.row.chargeTimes : 0);
            }
          },
          {
            title: '单日充电时长(Min)',
            key: 'chargeMinutes',
            render: (h, params) => {
              let num = Math.sign(params.row.chargeMinutes);
              return h('p', num >= 0 ? params.row.chargeMinutes : 0);
            }
          },
          {
            title: '单日充电电量(KWh)',
            key: 'chargePowerAmount',
            render: (h, params) => {
              let num = Math.sign(params.row.chargePowerAmount);
              return h('p', num >= 0 ? params.row.chargePowerAmount : 0);
            }
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    mounted () {
      this.designDate = this.disabledDate;
      this.watchVin('select'); // 搜过的vin码
      this._getList(1, true);
    },
    watch: { // 没有vin码查3个月，反之半年
       searchData: {
         handler (data) {
          if (data.vinCode) this.designDate = this.disabledVehicleOpe;
          else this.designDate = this.disabledDate;
       },
       deep: true
      }
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 列表
      _getList (page, flag) {
        if (this.searchData.timeBegin) {
          this.searchData.createTimeBegin = new Date(this.searchData.timeBegin).setHours(0, 0, 0, 0);
        } else {
          delete this.searchData.createTimeBegin;
        }
        if (this.searchData.timeEnd) {
          this.searchData.createTimeEnd = new Date(this.searchData.timeEnd).setHours(23, 59, 59, 0);
        } else {
          delete this.searchData.createTimeEnd;
        }
        if (!this.searchData.vinCode) delete this.searchData.vinCode;
        if (this.searchData.createTimeBegin && this.searchData.createTimeEnd && !this.searchData.vinCode) {
          let bol = this.checkDate(this.searchData.createTimeBegin, this.searchData.createTimeEnd, 7);
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
        if (this.searchData.createTimeBegin > this.searchData.createTimeEnd) {
          if (this.isFirst) return;
          this.$Notice.warning({
            title: '',
            desc: '开始日期不能大于结束日期',
            onClose: () => {
              this.isFirst = false;
            }
          });
          this.isFirst = true;
          return;
        }
        this.loading = true;
        // if (page) {
           this.searchData.pageNum = page;
        //   this.searchPageData.pageNum = page;
        // }
        this.allList = [];
        this.currentPage = 0;
        this.totalPages = 0;
        this.totalElements = 0;
        // 查询按钮
        // if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        vehicleRunningList(this.searchData, res => {
          if (JSON.stringify(res.totalElements)) {
             this.noVin = true;
             this.list = res.content;
             this.totalElement = res.totalElements;
             this.totalPage = res.totalPages;
          } else {
              this.currentPage = 1; // 每次查询都展示当前页
              this.totalElements = res.length; // 总数量
              this.allList = res;
              this.noVin = false;
              this.list = [];
              if (res.length <= 10) {
                this.list = res;
                this.totalPages = 1;
              } else {
                this.totalPages = Math.ceil(res.length / 10); // 总页数
                for (let i = 0; i <= 9; i++) {
                  this.list.push(res[i]);
                }
            }
          }
          this.loading = false;
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车辆运行统计失败',
            desc: ret
          });
        });
        if (this.searchData.vinCode) this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      // 翻页
      changePage (page) {
        let [start, end] = [0, 0];
        if (page === 1) {
          start = 0;
          end = 9;
        } else if (page > 1 && page < this.totalPages) {
          start = Number.parseInt(`${page - 1}0`);
          end = start + 9;
        } else if (page === this.totalPages) {
          start = Number.parseInt(`${page - 1}0`);
          end = this.allList.length - 1;
        }
        this.loading = true;
        this.list = [];
        for (start; start <= end; start++) {
          this.list.push(this.allList[start]);
        }
        this.loading = false;
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
        let days = Number.parseInt((this.searchData.createTimeEnd - this.searchData.createTimeBegin) / 86400000);
        if (days > 7) {
          this.$confirm('导出数据不能超过7天', '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        }
        vehicleRunningExport(this.searchData, res => {
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
           title: '加入下载列表失败',
           desc: ret
         });
       });
      }
    }
  };
</script>
