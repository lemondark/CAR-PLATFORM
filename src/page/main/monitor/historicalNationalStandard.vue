/**
* 作者：szh
* 时间：2018-03-26
* 描述：历史国标
**/
<style lang="scss" scoped>
  .button{
    margin-left: 10px;
    background-color:#fff !important;
    border: 1px solid #E6EDFD !important;
    color:#4A79EF !important;
  }
  .button:hover{
    background-color:#E6EDFD !important;
    color:#4A79EF !important;
    border: 1px solid #4A79EF !important;
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
              style="width: 200px"
              :class="warnTip"
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
            <DatePicker type="datetime" :options="disabledTime" v-model="searchData.positionTimeBegin" placement="bottom" placeholder="开始时间" :editable="false" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledTime" v-model="searchData.positionTimeEnd" placement="bottom" placeholder="结束时间" :editable="false" style="width: 200px"></DatePicker>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="primary" @click="search(1)" :loading="loading"
                    style="font-size:10px;" class="button">近6小时查询
          </i-button>
        </Form>
      </div>
      <Table border ref="tables" :columns="d3" :loading="loading" :data="list" style="margin-top: 10px;margin-bottom: 20px;" v-if="d3Show" :no-data-text="noText"></Table>
      <Table border ref="tables" :columns="d2" :loading="loading" :data="list" style="margin-top: 10px;margin-bottom: 20px;" :no-data-text="noText" v-else></Table>
      <!-- 分页 -->
      <hy-page
        :current-page="currentPage"
        :total-element="totalElement"
        :total-page="totalPage"
        :show-item="5"
        @current-change="changePage"></hy-page>
      <!--<p style="float: right;padding-right: 10px;font-size: 15px;">共：{{list.length}}条</p>-->
      <!--<div class="clearfix"></div>-->
      <!--详情-->
      <Modal v-model="modalDetailShow" :mask-closable="false" width="800" :styles="{top: '20px'}" @on-cancel="cancel">
        <p slot="header" class="hy-modal-title">
          <span>历史国标详情</span>
        </p>
        <div style="text-align:left; height: 500px;overflow: auto;" id="outerDiv">
          <h2>整车数据</h2>
          <hy-detail1 :form="vehicleDetail.overview" :rowData="vehicleData" v-if="modalDetailShow"></hy-detail1>
          <br>
          <h2>驱动电机数据</h2>
          <hy-detail1 :form="vehicleDetail.motor" :rowData="driveMotor" v-if="modalDetailShow"></hy-detail1>
          <br>
          <h2>电池数据</h2>
          <hy-detail1 :form="vehicleDetail.battery" :rowData="battery" v-if="modalDetailShow"></hy-detail1>
          <br>
          <h2>车辆位置数据</h2>
          <hy-detail1 :form="vehicleDetail.position" :rowData="location" v-if="modalDetailShow"></hy-detail1>
          <br>
          <h2>极值数据</h2>
          <hy-detail1 :form="vehicleDetail.peak" :rowData="extremum" v-if="modalDetailShow"></hy-detail1>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="cancel">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import { vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  import { historyList } from '@/service/monitor/realCan';
  import date from '@/js/mixins/date';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import HyDetail1 from '@/components/common/detail/detail1.vue';

  export default {
    components: {
      HyDetail1
    },
    mixins: [date, storeVin],
    data () {
      return {
        currentPage: 1, // 当前页
        totalElement: 0, // 总数量
        totalPage: 1,   // 总页数
        d3Show: true,
        warnTip: 'warn',
        searchData: {
          positionTimeBegin: new Date(+new Date() - (6 * 3600 * 1000)),
          positionTimeEnd: new Date()
        },
        loading: false,
        loading1: false,
        modalDetailShow: false,
        noText: '',
        list: [],
        allList: [],
        columnAuthType: 'index',
        d3: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vin',
            width: 170,
            render: (h, params) => {
              return h('p', null, params.row['vehicle'].vinCode);
            }
          },
          {
            title: '数据类型',
            width: 150,
            key: 'dataType',
            render: (h, params) => {
              if (!params.row['overview']) return '';
              let text = '';
              switch (params.row['overview'].dataType) {
                case 1:
                  text = '实时';
                  break;
                case 2:
                  text = '补发';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            width: 160,
            render: (h, params) => {
              return params.row['overview'] ? h('p', null, this._hyTool.DateFormat(new Date(+params.row['overview']['collectTime']), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '接收时间',
            key: 'receiveTime',
            width: 160,
            render: (h, params) => {
              return params.row['overview'] ? h('p', null, this._hyTool.DateFormat(new Date(+params.row['overview']['receiveTime']), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '车辆状态',
            width: 160,
            key: 'carStatus',
            render: (h, params) => {
              if (!params.row['overview']) return '';
              switch (params.row['overview'].carStatus) {
                case 1:
                  return h('p', null, '启动');
                case 2:
                  return h('p', null, '熄火');
                case 3:
                  return h('p', null, '其它');
                case '异常':
                  return h('p', null, '异常');
                case '无效':
                  return h('p', null, '无效');
              }
            }
          },
          {
            title: '充电状态',
            width: 140,
            key: 'chargeStatus',
            render: (h, params) => {
              if (!params.row['overview']) return '';
              switch (params.row['overview'].chargeStatus) {
                case 1:
                  return h('p', null, '停车充电');
                case 2:
                  return h('p', null, '行驶充电');
                case 3:
                  return h('p', null, '未充电');
                case 4:
                  return h('p', null, '充电完成');
                case '异常':
                  return h('p', null, '异常');
                case '无效':
                  return h('p', null, '无效');
              }
            }
          },
          {
            title: '实时车速(km/h)',
            width: 130,
            key: 'vehicleSpeed',
            render: (h, params) => {
              return params.row['overview'] ? h('p', null, params.row['overview'].vehicleSpeed) : '';
            }
          },
          {
            title: 'SOC(%)',
            key: 'soc',
            width: 130,
            render: (h, params) => {
              return params.row['overview'] ? h('p', null, params.row['overview'].soc) : '';
            }
          },
          {
            title: '总电流(A)',
            width: 130,
            key: 'totalCurrent',
            render: (h, params) => {
              return params.row['overview'] ? h('p', null, params.row['overview'].totalCurrent) : '';
            }
          },
          {
            title: '总电压(V)',
            width: 130,
            key: 'totalVoltage',
            render: (h, params) => {
              return params.row['overview'] ? h('p', null, params.row['overview'].totalVoltage) : '';
            }
          },
          {
            title: '累计行驶里程(km)',
            width: 150,
            key: 'mileage',
            render: (h, params) => {
              return params.row['overview'] ? h('p', null, params.row['overview'].mileage.toFixed(2)) : '';
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        d2: [
          {
            type: 'index',
            title: '序号',
            width: 100,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode',
            width: 170,
            render: (h, params) => {
              return params.row['vehicle'] ? h('p', null, params.row['vehicle'].vinCode) : '';
            }
          },
          {
            title: '数据类型',
            key: 'dataType',
            render: (h, params) => {
              if (!params.row['position']) return '';
              let text = '';
              switch (params.row['position'].dataType) {
                case 1:
                  text = '实时';
                  break;
                case 2:
                  text = '补发';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            width: 160,
            render: (h, params) => {
              if (!params.row['position']) return '';
              let date = params.row['position'].collectTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '接收时间',
            width: 160,
            key: 'receiveTime',
            render: (h, params) => {
              if (!params.row['position']) return '';
              let date = params.row['position'].receiveTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '经度',
            key: 'longitude',
            render: (h, params) => {
              return params.row['position'] ? h('p', null, params.row['position'].longitude ? ((params.row['position'].longitude)).toFixed(6) : '') : '';
            }
          },
          {
            title: '纬度',
            key: 'latitude',
            render: (h, params) => {
              return params.row['position'] ? h('p', null, params.row['position'].latitude ? (params.row['position'].latitude).toFixed(6) : '') : '';
            }
          },
          {
            title: '车速(km/h)',
            key: 'speed',
            render: (h, params) => {
              return params.row['position'] ? h('p', null, params.row['position'].speed) : '';
            }
          },
          {
            title: '方位',
            key: 'direction',
            render: (h, params) => {
              return params.row['position'] ? this.__filters.direction(h, params, 'direction') : '';
            }
          },
//          {
//            title: '海拔高度(m)',
//            key: 'altitude',
//            render: (h, params) => {
//              return h('p', null, params.row['position'].altitude);
//            }
//          },
          {
            title: '里程数(km)',
            key: 'mileage',
            render: (h, params) => {
              return params.row['position'] ? h('p', null, params.row['position'].mileage ? Number.isInteger(params.row['position'].mileage) ? params.row['position'].mileage : params.row['position'].mileage.toFixed(2) : 0) : '';
            }
          },
          {
            title: '定位方式',
            key: 'positionMode',
            render: (h, params) => {
              if (!params.row['position']) return '';
              let text = '';
              switch (params.row['position'].positionMode) {
                case 0:
                  text = '无效定位';
                  break;
                case 6:
                  text = '有效定位';
                  break;
                default:
                  text = '定位方式未知';
              }
              return h('p', null, text);
            }
          }
        ],
        vehicleDetail: {},
        vehicleData: [    // 整车数据
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'carStatus', title: '车辆状态', array: [{value: 0x01, label: '启动'}, {value: 0x02, label: '熄火'}, {value: 0x03, label: '其它'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]},
          {key: 'chargeStatus', title: '充电状态', array: [{value: 0x01, label: '停车充电'}, {value: 0x02, label: '行驶充电'}, {value: 0x03, label: '未充电'}, {value: 0x04, label: '充电完成'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]},
          {key: 'runStatus', title: '运行模式', array: [{value: 1, label: '纯电'}, {value: 2, label: '混动'}, {value: 3, label: '燃油'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]},
          {key: 'vehicleSpeed', title: '车速(km/h)'},
          {key: 'mileage', title: '累计里程(km)'},
          {key: 'totalVoltage', title: '总电压(V)'},
          {key: 'totalCurrent', title: '总电流(A)'},
          {key: 'soc', title: 'SOC(%)'},
          {key: 'dcdcStatus', title: 'DC-DC状态', array: [{value: 1, label: '工作'}, {value: 2, label: '断开'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]},
          {key: 'clutchStatus', title: '档位', array: [{value: 0, label: 'N 挡'}, {value: 1, label: 'D 挡'}, {value: 2, label: 'D 挡'}, {value: 3, label: 'D 挡'}, {value: 4, label: 'D 挡'}, {value: 5, label: 'D 挡'}, {value: 6, label: 'D 挡'}, {value: 13, label: 'R 挡'}, {value: 14, label: 'D 挡'}, {value: 15, label: 'P 挡'}]},
          {key: 'issueValue', title: '绝缘电阻(KΩ)'}
        ],
        driveMotor: [     // 驱动电机
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'motorTotal', title: '驱动电机个数'},
          {key: 'motorSeq', title: '驱动电机序号'},
          {key: 'motorStatus', title: '驱动电机状态', array: [{value: 0x01, label: '耗电'}, {value: 0x02, label: '发电'}, {value: 0x03, label: '关闭状态'}, {value: 0x04, label: '准备状态'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]},
          {key: 'controllerTemperature', title: '驱动电机控制器温度(℃)'},
          {key: 'speed', title: '驱动电机转速(r/min)'},
          {key: 'torque', title: '驱动电机转矩(N·m)'},
          {key: 'motorTemperature', title: '驱动电机温度(℃)'},
          {key: 'controllerInputVoltage', title: '电机控制器输入电压(V)'},
          {key: 'controllerDirectCurrent', title: '电机控制器直流母线电流(A)'}
        ],
        battery: [     // 电池数据
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'totalVoltage', title: '电池电压(V)'},
          {key: 'totalCurrent', title: '电池电流(A)'},
          {key: 'number', title: '电池温度探针总数'},
          {key: 'temperatures', title: '探针温度值(℃)'},
          {key: 'batterySysNumber', title: '动力蓄电池字子系统个数'},
          {key: 'batterySysIndex', title: '电池子系统号'},
          {key: 'batteryVoltages', title: '单体蓄电池电压值'},
          {key: 'batteryNumber', title: '单体蓄电池总数'},
          {key: 'batteryStartIndex', title: '本帧起始电池序号'},
          {key: 'batteryPacketNumber', title: '本帧单体电池总数'}
        ],
        location: [   // 位置数据
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'positionMode', title: '定位状态', array: [{value: 0, label: '无效定位'}, {value: 6, label: '有效定位'}]},
          {key: 'longitude', title: '经度'},
          {key: 'latitude', title: '纬度'}
        ],
        extremum: [     // 极值数据
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'highBatteryId', title: '最高电压电池子系统号'},
          {key: 'highBatteryCode', title: '最高电压电池单体代号'},
          {key: 'highVoltage', title: '电池单体电压最高值(V)'},
          {key: 'lowBatteryId', title: '最低电压电池子系统号'},
          {key: 'lowBatteryCode', title: '最低电压电池单体代号'},
          {key: 'lowVoltage', title: '电池单体电压最低值(V)'},
          {key: 'highTemperatureId', title: '最高温度子系统号'},
          {key: 'highProbeCode', title: '最高温度点探针序号'},
          {key: 'highTemperature', title: '最高温度值(℃)'},
          {key: 'lowTemperatureId', title: '最低温度子系统号'},
          {key: 'lowProbeCode', title: '最低温度点探针序号'},
          {key: 'lowTemperature', title: '最低温度值(℃)'}
        ]
      };
    },
    created () {
      let vin = this.$route.query.vin;
      if (vin) {
        this.searchData.vinCode = vin;
        this.getVehicle(vin);
        this.$nextTick(() => {
          this.search();
        });
      };
    },
    mounted () {
       this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      search (flag) {
        let searchData = {};
        if (!this.searchData.vinCode) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        searchData.vin = this.searchData.vinCode;
        // 近6小时快速查询
        if (flag === 1) {
          this.searchData.positionTimeBegin = new Date(+new Date() - (6 * 3600 * 1000));
          this.searchData.positionTimeEnd = new Date();
        }
        if (this.searchData.positionTimeBegin) {
          searchData.startDate = new Date(this.searchData.positionTimeBegin.setMilliseconds(0)).getTime();
        } else {
          delete searchData.startDate;
        }
        if (this.searchData.positionTimeEnd) {
          searchData.endDate = new Date(this.searchData.positionTimeEnd.setMilliseconds(0)).getTime();
        } else {
          delete searchData.endDate;
        }
        if (!searchData.startDate || !searchData.endDate) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '开始时间与结束时间不能为空',
            desc: '',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        if (searchData.startDate >= searchData.endDate) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '开始时间不能大于或等于结束时间',
            desc: '',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        let bol = this.checkTime(searchData.startDate, searchData.endDate, 6);
        if (!bol) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '',
            desc: '开始时间与结束时间间隔不能超过6个小时',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        this.allList = [];
        this.loading = true;
        this.currentPage = 0;
        this.totalPage = 0;
        this.totalElement = 0;
        historyList(searchData, res => {
          this.currentPage = 1; // 每次查询都展示当前页
          this.totalElement = res.length; // 总数量
          this.allList = res;
          this.list = [];
          if (res.length <= 10) {
            this.list = res;
            this.totalPage = 1;
          } else {
            this.totalPage = Math.ceil(res.length / 10); // 总页数
            for (let i = 0; i <= 9; i++) {
              this.list.push(res[i]);
            }
          }
          this.loading = false;
          if (this.list.length) {
            let version = this.list[0].vehicle ? this.list[0].vehicle.commProtocolVersion : 0;
            if (version === 0) {
              this.d3Show = true;
              this.allList.map(item => {
                for (let i in item.overview) {
                  item.overview[i] = item.overview[i] === -1 ? '异常' : (item.overview[i] === -2 ? '无效' : item.overview[i]);
                  item.overview[i] = item.overview[i] === -8000 ? '异常' : (item.overview[i] === -9000 ? '无效' : item.overview[i]);
                }
              });
            } else {
              this.d3Show = false;
              this.allList.map(item => {
                for (let i in item.position) {
                  item.position[i] = item.position[i] === -1 ? '异常' : (item.position[i] === -2 ? '无效' : item.position[i]);
                  item.position[i] = item.position[i] === -8000 ? '异常' : (item.position[i] === -9000 ? '无效' : item.position[i]);
                }
              });
            }
          } else {
            this.noText = '暂无数据';
          }
        }, ret => {
          this.list = [];
          this.noText = '';
          this.loading = false;
          this.$Notice.error({
            title: '获取数据失败',
            desc: ret
          });
        });
        this.storeVin(this.searchData.vinCode); // 存储搜索的vin
      },
      // 翻页
      changePage (page) {
        let [start, end] = [0, 0];
        if (page === 1) {
          start = 0;
          end = 9;
        } else if (page > 1 && page < this.totalPage) {
          start = Number.parseInt(`${page - 1}0`);
          end = start + 9;
        } else if (page === this.totalPage) {
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
      // 详情
      detail (row) {
        this.vehicleDetail = this._hyTool.extend({}, row);
        if (row.motorList) {
          this.vehicleDetail.motor = row.motorList[0];
        } else {
          this.vehicleDetail.motor = {};
        }
        if (this.vehicleDetail.battery && row.temperature) {
          this.vehicleDetail.battery.temperatures = row.temperature.temperatures;
          this.vehicleDetail.battery.number = row.temperature.number;
        }
        for (let item in this.vehicleDetail) {
          if (item !== 'vehicle' && typeof this.vehicleDetail[item] === 'object') {
            if (this.vehicleDetail[item]) {
              this.vehicleDetail[item].collectTime1 = !this.vehicleDetail[item].collectTime ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail[item].collectTime), 'yyyy-MM-dd hh:mm:ss');
              this.vehicleDetail[item].receiveTime1 = !this.vehicleDetail[item].receiveTime ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail[item].receiveTime), 'yyyy-MM-dd hh:mm:ss');
            }
          }
        }
        this.modalDetailShow = true;
      },
      // 关闭
      cancel () {
        this.modalDetailShow = false;
        document.getElementById('outerDiv').scrollTop = 0;
      },
      getVehicle (vin) {
        vehicleListAll({vinCode: vin}, res => {
          this.optionsVin = res.map(item => {
            return {value: item.vinCode, label: `【${item.vinCode}】【${!item.plateNo === true ? '无车主' : item.plateNo}】`};
          });
        });
      }
    },
    watch: {
      // 若无数据，则提示居中显示
      list (value) {
        if (!value.length) {
          let divs = document.getElementsByClassName('ivu-table-wrapper');
          let tableWidth = this.$refs.tables.tableWidth;
          let clientWidth = null;
          for (let div of divs) {
            clientWidth = div.clientWidth;
            if (tableWidth > clientWidth) {
              let noData = document.getElementsByClassName('ivu-table-tip');
              for (let tds of noData) {
                let tdStyle = tds.getElementsByTagName('td')[0];
                tdStyle.style.textAlign = 'left';
                tdStyle.style.paddingLeft = `${clientWidth / 2 + tds.scrollLeft}px`;
              }
            }
          }
        }
      }
    }
  };
</script>
