
<style lang="scss" scoped>
  .hy-sleft {
    width: 100%;
    float: left;
  }
  .hy-sright {
    display:inline-block;
    // width: 20%;
    //  float: right;
  }
  .clearfix{
    clear:both;
    zoom:1;
    overflow: hidden;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <div class="hy-sleft">
          <Form label-position="right" inline :label-width="10">
            <FormItem label="">
              <Select
                placeholder="VIN码"
                style="width: 200px;"
                v-model="searchData.vin"
                filterable
                remote
                clearable
                :remote-method="vinMethod"
                :not-found-text="notFoundText"
                ref="select"
                :loading="loading1">
                <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <Select
                placeholder="报警编码"
                style="width: 200px;"
                v-model="searchData.alarmCode"
                filterable
                clearable
                :loading="loading1">
                <Option v-for="(option, index) in alarmCodeList" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <DatePicker type="datetime" v-model="searchData.timeBegin" :options="disabledDate" placement="bottom" placeholder="开始时间" style="width:200px;"></DatePicker>
            </FormItem>
            <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
            <FormItem label="">
              <DatePicker type="datetime" v-model="searchData.timeEnd" :options="disabledDate" placement="bottom" placeholder="结束时间" style="width:200px;"></DatePicker>
            </FormItem>
            <FormItem label="">
              <i-select placeholder="故障等级" v-model="searchData.gbLevel" clearable filterable style="width:200px;">
                <Option v-for="item in level" :value="item.value" :key="item.id" :label="item.label">
                  {{ item.label }}
                </Option>
              </i-select>
            </FormItem>
            <FormItem label="">
              <i-input placeholder="报警内容" v-model.trim="searchData.alarmContent" style="width:200px;" clearable></i-input>
            </FormItem>
            <FormItem label="">
              <i-select placeholder="报警状态" v-model="searchData.alarmStatus" clearable filterable style="width:200px;">
                <i-option value="0">未处理</i-option>
                <i-option value="1">处理中</i-option>
                <i-option value="2">已处理</i-option>
                <i-option value="3">已关闭</i-option>
              </i-select>
            </FormItem>
            <div class="hy-sright">
              <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                        class="search" >查询
              </i-button>
              <i-button type="success"  @click="exports" shape="circle"
                        style="margin-left: 10px;margin-top: 1px;font-size: 16px;" class="export">导出
              </i-button>
            </div>
            <div style="float:right">
              <i-button type="primary" @click="go">返回</i-button>
            </div>
          </Form>
        </div>
        <div class="clearfix"></div>
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
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table.vue';
  import { historyAlarm, excelBattery } from '@/service/alarmService/nationalStandard';
  import { mapState, mapMutations } from 'vuex';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { queryParam } from '@/service/alarmService/queryParam';
  export default {
    components: {
      HyTable
    },
    mixins: [list, date, storeVin],
    data () {
      return {
        searchData: {
        },
        alarmTimeEnd: '',
        alarmCodeList: [],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 165,
            key: 'vin'
          },
          {
            title: '报警编码',
            key: 'alarmCode',
            width: 170
          },
          {
            title: '报警内容',
            width: 300,
            key: 'alarmContent'
          },
          {
            title: '统计时间',
            key: 'statisticsTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'statisticsTime');
            }
          },
          {
            title: 'GPRS号',
            key: 'gprs',
            width: 160
          },
          {
            title: '开始时间',
            key: 'startTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            title: '结束时间',
            key: 'endTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'endTime');
            }
          },
          {
            title: '报警来源',
            width: 85,
            key: 'alarmSource'
          },
          {
            title: '故障等级',
            key: 'gbLevel',
            width: 85,
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, null, 'gbLevel', false)
              ]);
            }
          },
          {
            title: '持续时间',
            key: 'continuedTime',
            width: 200,
            render: (h, params) => {
              if (params.row.endTime && params.row.startTime) return this._hyTool.MillisecondToDate(params.row.endTime - params.row.startTime);
              else return '';
            }
          },
          {
            title: '报警条数',
            width: 85,
            key: 'alarmCount'
          },
          {
            title: '状态',
            key: 'alarmStatus',
            width: 160,
            render: (h, params) => {
              return this.__filters.alarmStatus(h, params, 'alarmStatus', null);
            }
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'taskNum',
        'level'
      ])
    },
    mounted () {
      this.getAlarmCodeList();
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 返回
      go () {
        this.$router.push({path: '/main/alarm/batteryMonitor', query: {current: this.$route.query.currentPage}});
      },
      _getList (page, flag) {
        let code = this.$route.query.code;
        if (code) {
          this.searchData.batterySupplierCode = code;
        } else {
          return;
        }
        if (this.searchData.timeBegin) {
          this.searchData.startTimeBegin = +new Date(this.searchData.timeBegin);
        } else {
          delete this.searchData.startTimeBegin;
        }
        if (this.searchData.timeEnd) {
          this.searchData.createTimeEnd = +new Date(this.searchData.timeEnd);
        } else {
          delete this.searchData.createTimeEnd;
        }
        if (this.searchData.startTimeBegin && this.searchData.createTimeEnd) {
          let bol = this.checkDate(this.searchData.startTimeBegin, this.searchData.createTimeEnd, 7);
          if (!bol) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '开始时间与结束时间间隔不能超过7天',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
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
        this.searchPageData.type = 1;
        if (!this.searchPageData.componentCode) this.searchPageData.componentCode = 'BMS';
        if (!this.searchData.createTimeEnd) this.searchPageData.createTimeEnd = +new Date(new Date().setHours(0, 0, 0, 0));
        historyAlarm(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询电池供应商报警详情失败',
            desc: ret
          });
        });
        if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      // 查询
      search () {
        if (this.alarmTimeEnd instanceof Array && this.alarmTimeEnd[0] !== undefined && this.alarmTimeEnd[0] !== null) {
          this.searchData.alarmTimeBegin = this._hyTool.DateFormat(this.alarmTimeEnd[0], 'yyyy-MM-dd hh:mm:ss');
          this.searchData.alarmTimeEnd = this._hyTool.DateFormat(this.alarmTimeEnd[1], 'yyyy-MM-dd hh:mm:ss');
        } else {
          delete this.searchData.alarmTimeBegin;
          delete this.searchData.alarmTimeEnd;
        }
        if (this.searchData.alarmTimeBegin && this.searchData.alarmTimeEnd) {
          let bol = this.checkDate(new Date(this.searchData.alarmTimeBegin).getTime(), new Date(this.searchData.alarmTimeEnd).getTime(), 7);
          if (!bol) {
            this.$Notice.warning({
              title: '',
              desc: '开始时间与结束时间间隔不能超过7天'
            });
            return;
          }
        }
        this.currentChange(1);
      },
      // 报警编码
      getAlarmCodeList () {
        this.alarmCodeList = [];
        queryParam({field: 'alarm_code'}, res => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].startsWith('BMS')) {
              this.alarmCodeList.push({label: res[i], value: res[i]});
            }
          }
        });
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
        excelBattery(this.searchPageData, res => {
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
