/**
* 车辆总里程
**/
<style type="scss" scoped>
  .hy-line {
    display: inline-block;
    margin-top: 20px;
    margin-left: 90px;
    /*color: #000000;*/
    font-size: 14px;
    font-weight: bold;
  }
  .number {
    color: #000;
    font-size: 18px;
    font-weight: bold;
  }
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
              style="width: 200px;"
              v-model="searchData.vinCode"
              filterable
              remote
              transfer
              clearable
              :remote-method="vinMethod"
              :not-found-text="notFoundText"
              ref="select"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <DatePicker type="date" :options="designDate" v-model="searchData.timeBegin" placement="bottom" placeholder="开始日期" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
          <FormItem label="">
            <DatePicker type="date" :options="designDate" v-model="searchData.timeEnd" placement="bottom" placeholder="结束日期" style="width: 200px;"></DatePicker>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success"  shape="circle" style="margin-left: 10px;margin-top: 1px" class="export" @click="exports">导出
          </i-button>
        </Form>
      </div>
      <hy-table :column-type="columnAuthType" :columnsTitle="columnsAuthTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
      </hy-table>
      <div v-show="vTotalMileage != null">
        <span class="hy-line">行驶里程合计：<span class="number">{{vTotalMileage >= 0 ? `${vTotalMileage}km` : '异常'}}</span></span>
      </div>
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
  import { vehicleDayMileageList, vehicleDayMileageExport, summaryDayMileage } from '@/service/vehicleManageService/vehicleDayMileage';
  import list from '@/js/mixins/list';
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table.vue';
  import { mapState, mapMutations } from 'vuex';
  import storeVin from '@/js/mixins/storeVin/storeVin';

  export default {
    components: {
      HyTable
    },
    mixins: [list, date, storeVin],
    data () {
      return {
        searchData: {
          timeBegin: new Date(+new Date() - 86400 * 1000 * 7),
          timeEnd: new Date(+new Date() - 86400 * 1000)
        },
        designDate: null,
        loading: true,
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            title: '序号',
            width: 60,
            type: 'index'
          },
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: 'GPRS号',
            key: 'gprsCode'
          },
          {
            title: '车系',
            key: 'carSeries'
          },
          {
            title: '车型',
            key: 'carType'
          },
          {
            title: '总里程(Km)',
            key: 'mileage',
            render: (h, params) => {
              let num = '';
              if (params.row['mileage']) {
                if (Number.isInteger(params.row['mileage'])) {
                  num = params.row['mileage'];
                } else {
                  num = params.row['mileage'].toFixed(2);
                }
              }
              return h('p', null, num);
            }
          },
          {
            title: '统计日期',
            key: 'collectTime',
            render: (h, params) => {
              return this.__filters.formatDate(h, params, 'collectTime');
            }
          }
        ],
        vTotalMileage: null
      };
    },
    mounted () {
      this.designDate = this.disabledDate;
      this.watchVin('select'); // 搜过的vin码
    },
    watch: {
       searchData: {
         handler (data) {
          if (data.vinCode) this.designDate = this.reportDate;
          else this.designDate = this.disabledDate;
       },
       deep: true
      }
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
      // 列表
      _getList (page, flag) {
        if (!this.searchData.vinCode) delete this.searchData.vinCode;
        if (this.searchData.timeBegin) {
          this.searchData.startDate = new Date(this.searchData.timeBegin).getTime();
        } else {
        //  delete this.searchData.startDate;
        if (this.searchData.vinCode) delete this.searchData.startDate;
        else {
           this.searchData.timeBegin = new Date(+new Date() - 86400 * 1000 * 7);
           this.searchData.startDate = new Date(this.searchData.timeBegin).getTime();
          }
        }
        if (this.searchData.timeEnd) {
          this.searchData.endDate = new Date(this.searchData.timeEnd).getTime() + (24 * 3600 * 1000 - 1);
        } else {
         if (this.searchData.vinCode) delete this.searchData.endDate;
         else {
          this.searchData.timeEnd = new Date(+new Date() - 86400 * 1000);
          this.searchData.endDate = new Date(this.searchData.timeEnd).getTime();
         }
        }
        if (this.searchData.startDate && this.searchData.endDate && !this.searchData.vinCode) {
          let bol = this.checkDate(this.searchData.startDate, this.searchData.endDate, 7);
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
        if (this.searchData.startDate && this.searchData.endDate) {
          if (this.searchData.timeBegin > this.searchData.timeEnd) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '开始时间不能大于结束时间',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
        }
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        vehicleDayMileageList(this.searchPageData, res => {
          this.loading = false;
          this.totalElement = res.totalElements;
          this.totalPage = res.totalPages;
          this.list = res.content ? res.content : [];
          if (this.list.length === 0) {
            this.noDataText = '暂无数据';
            this.showCheckbox = false;
          } else {
            this.noDataText = null;
            this.showCheckbox = true;
          }
          if (this.searchPageData.vinCode) {
            // 汇总车辆每日总里程
            summaryDayMileage(this.searchPageData, res => {
              if (res === null) {
                this.vTotalMileage = 0;
              } else if (res.toString().indexOf('.') > -1) {
                this.vTotalMileage = res.toFixed(2);
              } else {
                this.vTotalMileage = res;
              }
            }, ret => {
              this.vTotalMileage = null;
              this.loading = false;
              this.$Notice.error({
                title: '查询车辆总里程失败',
                desc: ret
              });
            });
          } else {
            this.vTotalMileage = null;
          }
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车辆总里程失败',
            desc: ret
          });
        });
        if (this.searchData.vinCode) this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      // 导出
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
        vehicleDayMileageExport(this.searchData, res => {
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
