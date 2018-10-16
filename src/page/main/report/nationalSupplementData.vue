/**
* 作者：szh
* 时间：2018-02-12
* 描述：国补数据
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
              style="width: 200px;"
              v-model="searchData.vin"
              filterable
              remote
              transfer
              clearable
              :remote-method="vinMethod"
              ref="select"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">
                {{option.label}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <DatePicker type="date" v-model="selectData.soldDateStart" placement="bottom-start" :options="reportDate"
                        placeholder="销售起始日期" :editable="false"></DatePicker>
          </FormItem>
          -
          <FormItem label="">
            <DatePicker type="date" v-model="selectData.soldDateEnd" placement="bottom-end" :options="reportDate"
                        placeholder="销售结束日期" :editable="false"></DatePicker>
          </FormItem>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormItem label="">
            <DatePicker type="date" v-model="selectData.certificateDateStart" placement="bottom-start"
                        :options="reportDate" placeholder="合格证起始日期" :editable="false"></DatePicker>
          </FormItem>
          -
          <FormItem label="">
            <DatePicker type="date" v-model="selectData.certificateDateEnd" placement="bottom-end" :options="reportDate"
                        placeholder="合格证结束日期" :editable="false"></DatePicker>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success" shape="circle" @click="exports"
                    style="margin-left: 10px;margin-top: 1px" class="export">导出
          </i-button>
        </Form>
      </div>
      <hy-table :column-type="columnAuthType" :columnsTitle="columnsAuthTitle" :list="list"
                :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading"
                :no-data-text="noDataText">
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
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table.vue';
  import {nationalList, nationalExport} from '@/service/report/nationalSupplementData';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import {mapState, mapMutations} from 'vuex';

  export default {
    components: {
      HyTable
    },
    mixins: [list, date, storeVin],
    data () {
      return {
        loading: false,
        searchData: {},   // api查询条件
        selectData: {},   // 查询条件
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
            key: 'vinCode',
            width: 165
          },
          {
            title: '车牌号',
            key: 'plateNo'
          },
          {
            title: '销售日期',
            key: 'veDeliveredDate',
            width: 100,
            render: (h, params) => {
              return params.row['veDeliveredDate'] ? this.__filters.formatDate(h, params, 'veDeliveredDate') : '';
            }
          },
          {
            title: '合格证日期',
            width: 100,
            key: 'certificateDate',
            render: (h, params) => {
              return params.row['certificateDate'] ? this.__filters.formatDate(h, params, 'certificateDate') : '';
            }
          },
          {
            title: '车辆充满一次电能行驶里程(公里)',
            key: 'limitMileage',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconAndText(h, params, {
                  color: '#e20607',
                  type: 'gantanhao',
                  size: '13'
                }, params.row['rechargeMileageLower'], params.row['rechargeMileageUpper'])
              ]);
            }
          },
          {
            title: '车辆充满一次电能所需时间(h)',
            key: 'maxEnergyTime1',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconAndText(h, params, {
                  color: '#e20607',
                  type: 'gantanhao',
                  size: '13'
                }, params.row['chargerMidSoc1Lower'], params.row['chargerMidSoc1Upper'])
              ]);
            }
          },
          {
            title: '最大的充电功率(kw)',
            key: 'maxElectricPower',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconAndText(h, params, {
                  color: '#e20607',
                  type: 'gantanhao',
                  size: '13'
                }, params.row['maxElePowerLower'], params.row['maxElePowerUpper'])
              ]);
            }
          },
          {
            title: '月均行驶里程(km)',
            key: 'mileage'
          },
          {
            title: '百公里耗电量(kwh/100km)',
            key: 'hundredsKmusePower',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconAndText(h, params, {
                  color: '#e20607',
                  type: 'gantanhao',
                  size: '13'
                }, params.row['powerConsumptionLower'], params.row['powerConsumptionUpper'])
              ]);
            }
          },
          {
            title: '平均单日运行时间(h)',
            key: 'avgDailyRunTime',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIconAndText(h, params, {
                  color: '#e20607',
                  type: 'gantanhao',
                  size: '13'
                }, params.row['dailyRunTimeLower'], params.row['dailyRunTimeUpper'])
              ]);
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
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 列表
      _getList (page, flag) {
        if (this.selectData.soldDateStart) {
          this.searchData.soldDateStart = new Date(this.selectData.soldDateStart).setHours(0, 0, 0, 0);
        } else {
          delete this.searchData.soldDateStart;
        }
        if (this.selectData.soldDateEnd) {
          this.searchData.soldDateEnd = new Date(this.selectData.soldDateEnd).setHours(23, 59, 59, 0);
        } else {
          delete this.searchData.soldDateEnd;
        }
        if (this.selectData.certificateDateStart) {
          this.searchData.certificateDateStart = new Date(this.selectData.certificateDateStart).setHours(0, 0, 0, 0);
        } else {
          delete this.searchData.certificateDateStart;
        }
        if (this.selectData.certificateDateEnd) {
          this.searchData.certificateDateEnd = new Date(this.selectData.certificateDateEnd).setHours(23, 59, 59, 0);
        } else {
          delete this.searchData.certificateDateEnd;
        }
        if (this.searchData.soldDateStart && this.searchData.soldDateEnd) {
          let bol = this.checkDate(this.searchData.soldDateStart, this.searchData.soldDateEnd, 90);
          if (!bol) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '销售起始日期与结束日期间隔不能超过三个月',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
        }
        if (this.searchData.soldDateStart > this.searchData.soldDateEnd) {
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
        if (this.searchData.certificateDateStart && this.searchData.certificateDateEnd) {
          let bol = this.checkDate(this.searchData.certificateDateStart, this.searchData.certificateDateEnd, 90);
          if (!bol) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '合格证起始日期与结束日期间隔不能超过三个月',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
        }
        if (this.searchData.certificateDateStart > this.searchData.certificateDateEnd) {
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
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        nationalList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询国补数据失败',
            desc: ret
          });
        });
         if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
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
        nationalExport(this.searchData, res => {
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
