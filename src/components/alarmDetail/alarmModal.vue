/**
* 描述：报警详情整理
*/
<style lang="scss" scoped>
.map {
    min-width: 100px;
    height: 100%;
    .button-group {
      z-index: 99;
      position: absolute;
      left: 2%;
      top: 4%;
    }
    .cardTop {
      position: absolute;
      z-index: 99;
      right: 2%;
      top: 2%;
    }
    .goBack {
      z-index: 99;
      position: absolute;
      left: 120px;
      top: 4%;
    }
  }
   .map_card {
    padding:5% 0 0 10%;
      p {
        height: 30px;
        line-height:30px;
      }
    }
</style>
<template>
  <div class="alarmPageStyle" :class="{content: hasMap}">
        <Row style="height: 70%;margin-top:10px;" v-if="hasMap">
        <i-col span="18" style="height: 100%;">
          <div class="map" id="detailMap">
            <i-button type="primary" class="button-group" @click.stop="getLocal">当前位置</i-button>
            <i-button type="ghost" class="goBack" @click="go">返回</i-button>
          </div>
        </i-col>
        <i-col span="6" style="height: 100%;">
          <div class="map_card">
            <p style="font-size:16px;color:#000000;">车辆信息</p>
            <p>VIN码：{{vehicleData.vinCode}}</p>
            <p>车型：{{vehicleData.carType}}</p>
            <p>车牌：{{vehicleData.plateNo ? vehicleData.plateNo : '--'}}</p>
            <p>速度：{{vehicleInfo.speed}} km/h</p>
            <p>位置采集时间：{{vehicleInfo.collectTime ? vehicleInfo.collectTime : '--' | dateNaN}}</p>
            <p style="height:60px">位置：{{vehicleInfo.address ? vehicleInfo.address : '--'}}</p>
          </div>
        </i-col>
      </Row>
        <div class="gauge">
          <div style="font-size:16px;padding:20px 0 5px 0;">基本信息 </div>
          <Row style="background:#fafbfe;height: 250px;">
            <i-col span="2"></i-col>
            <i-col span="4" class="card">
              <div id="soc_gauge" class="col_gauge"></div>
            </i-col>
            <i-col span="4" class="card">
              <div id="speed_gauge" class="col_gauge"></div>
            </i-col>
            <i-col span="4" class="card">
              <div id="motor_gauge" class="col_gauge"></div>
            </i-col>
            <i-col span="4" class="card">
              <div id="voltage_gauge" class="col_gauge"></div>
            </i-col>
            <i-col span="4" class="card">
              <div id="current_gauge" class="col_gauge"></div>
            </i-col>
            <i-col span="2"></i-col>
          </Row>
          <div class="templateData" :style="{height: onData.commProtocolVersion !== 0? '290px' : ''}">
           <Row>
            <i-col span="14" >
              <div class="hy_vehicle">
                <div class="l-info wth14">
                  <span class="title">总里程</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? (onData.overview.mileage ? ((String(onData.overview.mileage).indexOf('.') > -1 ? (onData.overview.mileage.toFixed(2) + 'km') : (isNaN(onData.overview.mileage) ? onData.overview.mileage : (onData.overview.mileage + 'km')))) : '--') : '--'}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1"><i>{{onData.icu ? (onData.icu.totalMile ? ((String(onData.icu.totalMile).indexOf('.') > -1 ? onData.icu.totalMile.toFixed(2) : onData.icu.totalMile) + 'km') : '--') : '--'}}</i></span>
                </div>
                <!--<div class="l-info wth14" >-->
                  <!--<span class="title">小计里程</span>-->
                  <!--<span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? (onData.overview.currentMileage ? (onData.overview.currentMileage + 'km') : '&#45;&#45;') : '&#45;&#45;'}}</i></span>-->
                  <!--<span class="fonts" v-if="onData.commProtocolVersion === 1"><i>&#45;&#45;</i></span>-->
                <!--</div>-->
                <div class="l-info wth14">
                  <span class="title">充电状态</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? onData.overview.chargeStatus : null | chargeStatus}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1"><i>{{onData.bms ? onData.bms.batteryStatus : null | chargeStatusBMS}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion !== 1 && onData.commProtocolVersion !== 0"><i>--</i></span>
                </div>
                <!--<div class="l-info wth14" v-if="onData.commProtocolVersion === 1">-->
                <!--<span class="title">充电次数</span>-->
                <!--<span class="fonts"><i>&#45;&#45;</i>次</span>-->
                <!--</div>-->
                <div class="l-info wth14">
                  <span class="title">电池类型</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0 && onData.matrixVersion === 0"><i>{{batteryTypeCode | batteryTypeCode}}</i></span>
                  <span class="fonts" v-else><i>{{onData.bms ? onData.bms.batterytypeCode : null | batteryTypeCode}}</i></span>
                </div>
                <div class="l-info wth14">
                  <span class="title">整车状态</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? onData.overview.carStatus : null | carStatus}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1"><i>{{onData.vms ? onData.vms.keyPosStatus : null | carStatusVms}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion !== 1 && onData.commProtocolVersion !== 0"><i>--</i></span>
                </div>
                <div class="l-info wth14" style=" width:20%;">
                  <span class="title">制动状态</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? onData.overview.driveBrakeStatus : null | driveBrakeStatus}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1"><i>--</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion !== 1 && onData.commProtocolVersion !== 0"><i>--</i></span>
                </div>
              </div>
              <!-- <div class="hy_vehicle">
                <div class="l-info wth12">
                  <span class="title">电机故障等级</span>
                  <span class="fonts"><i>--</i></span>
                </div>
                <div class="l-info wth12">
                  <span class="title">电机故障码</span>
                  <span class="fonts"><i>--</i></span>
                </div>
                <div class="l-info wth12">
                  <span class="title">电池故障等级</span>
                  <span class="fonts"><i>--</i></span>
                </div>
                <div class="l-info wth12">
                  <span class="title">电池故障码</span>
                  <span class="fonts"><i>--</i></span>
                </div>
                <div class="l-info wth12">
                  <span class="title">EPS故障码</span>
                  <span class="fonts"><i>--</i></span>
                </div>
                <div class="l-info wth12">
                  <span class="title">DCDC故障码</span>
                  <span class="fonts"><i>--</i></span>
                </div>
                <div class="l-info wth12">
                  <span class="title">整车故障等级</span>
                  <span class="fonts"><i>--</i></span>
                </div>
                <div class="l-info wth12">
                  <span class="title">其他故障码</span>
                  <span class="fonts"><i>--</i></span>
                </div>
              </div> -->
            </i-col>
            <i-col span="4" class="mt51">
              <div class="ready">
                <i class="iconfont icon-qiyong" v-if="(onData.commProtocolVersion === 0 && onData.overview && onData.overview.carStatus === 1) || (onData.commProtocolVersion === 1 && onData.vms && onData.vms.isReady === 1)"></i>
                <i class="iconfont icon-cuowu" v-if="(onData.commProtocolVersion === 0 && onData.overview && (onData.overview.carStatus === 2 || onData.overview.carStatus === 3 || onData.overview.carStatus === '异常' || onData.overview.carStatus === '无效')) || (onData.commProtocolVersion === 1 && onData.vms && onData.vms.isReady === 0)"></i>
                <img src="/static/images/new/main/detail.png"/>
                <span v-if="onData.commProtocolVersion === 0">{{(onData.overview ? onData.overview.clutchStatus : '') | clutchStatus}}</span>
                <span v-if="onData.commProtocolVersion === 1">{{onData.vms ? onData.vms.gearStatus : '' | gearStatus}}</span>
              </div>
            </i-col>
            <i-col span="6" >
              <i-col span="8" style="padding-left: 40px;padding-top: 15px;text-align: center;">
                <thermometer :degrees="onData.commProtocolVersion === 0 ? onData.custom.motorTemp : (onData.mc ? onData.mc.motorTemp : 0)" :height="180" :width="8"></thermometer>
                <p style="position:absolute;left:5px;top:220px;width:80px;">电机温度</p>
              </i-col>
              <i-col span="8" style="padding-left: 40px;padding-top: 15px;text-align: center;">
                <thermometer :degrees="onData.custom.temperatureAverage" :height="180" :width="8"></thermometer>
                <p style="position:absolute;left:5px;top:220px;width:80px;">电池温度</p>
              </i-col>
              <i-col span="8" style="padding-left: 40px;padding-top: 15px;text-align: center;">
                <thermometer :degrees="onData.commProtocolVersion === 0 ? onData.custom.motorContTemp : (onData.mc ? onData.mc.mcTemp : 0)" :height="180" :width="8"></thermometer>
                <p style="position:absolute;left:5px;top:220px;width:100px;">电机控制器温度</p>
              </i-col>
            </i-col>
          </Row>
          </div>
        </div>
        <div>
         <div class="foot ">
          <row style="border-bottom:1px dashed #EDF1F8;padding-bottom: 50px;" v-show="onData.commProtocolVersion === 0 || (onData.commProtocolVersion === 1 && onData.bms && onData.bms.temps1)">
            <i-col span="11">
              <div style="height:30px;line-height:30px;margin:20px 0 0 10px;">
                <span style="color:black;font-size:16px;">探针信息 </span>
                <span style="color:#808080;" v-if="onData.commProtocolVersion === 0">探针{{onData.temperature ? onData.temperature.number : 0}}个</span>
                <span style="color:#808080;" v-if="onData.commProtocolVersion === 1">探针{{onData.bms ? (onData.bms.temps1 ? (this.onData.bms.temps1 + ',' + this.onData.bms.temps2).split(',').length : 0) : 0}}个</span>
              </div>
              <div style="height:400px;position:relative;">
                <span style="position: absolute;font-size: 35px;color: #ff3c15;left: 19%;top: 25%;" v-if="onData.commProtocolVersion === 0">{{onData.peak ? (onData.peak.highTemperature === '无效' || onData.peak.highTemperature === '异常') ?  '--' : onData.peak.highTemperature : 0}}°C</span>
                <span style="position: absolute;font-size: 35px;color: #ff3c15;left: 19%;top: 25%;" v-if="onData.commProtocolVersion === 1">{{onData.bms ? (onData.bms.tempHighest === '无效' || onData.bms.tempHighest === '异常') ?  '--' : onData.bms.tempHighest : 0}}°C</span>
                <img src="/static/images/1.png" class="hy_img"/>
                <span style="position: absolute;left: 20%;top: 39%;">最高温度</span>
                <span style="position: absolute;left: 21%;top: 43%;" v-if="onData.commProtocolVersion === 0">探针: {{onData.peak ? onData.peak.highProbeCode : '--'}}</span>
                <span style="position: absolute;left: 21%;top: 43%;" v-if="onData.commProtocolVersion === 1">探针: {{onData.bms ? onData.bms.highestTempNo : '--'}}</span>
                <div class="hy_wendu">
                  <span v-if="onData.commProtocolVersion === 0">
                    {{((onData.peak ? onData.peak.highTemperature : 0) - (onData.peak ? onData.peak.lowTemperature : 0)) | dataNaN}}°C
                  </span>
                  <span v-if="onData.commProtocolVersion === 1">
                    {{((onData.bms ? onData.bms.tempHighest : 0) - (onData.bms ? (onData.bms.tempLowest ? onData.bms.tempLowest : '--') : 0)) | dataNaN}}°C</span>
                  <hr/>
                  <span>温差</span>
                </div>
                <span class="" style="position: absolute;font-size: 35px;color: #356fff;left: 57%;top: 25%;" v-if="onData.commProtocolVersion === 0">{{onData.peak ? (onData.peak.lowTemperature === '无效' || onData.peak.lowTemperature === '异常') ? '--' : onData.peak.lowTemperature : 0}}°C</span>
                <span class="" style="position: absolute;font-size: 35px;color: #356fff;left: 57%;top: 25%;" v-if="onData.commProtocolVersion === 1">{{onData.bms ? (onData.bms.tempLowest === '无效' || onData.bms.tempLowest === '异常') ? '--' : (onData.bms.tempLowest ? onData.bms.tempLowest : '--') : 0}}°C</span>
                <img src="/static/images/1-05.png" class="hy_img1"/>
                <span style="position: absolute;left: 58%;top: 39%;">最低温度</span>
                <span style="position: absolute;left: 59%;top: 43%;" v-if="onData.commProtocolVersion === 0">探针: {{onData.peak ? onData.peak.lowProbeCode : '--'}}</span>
                <span style="position: absolute;left: 59%;top: 43%;" v-if="onData.commProtocolVersion === 1">探针: {{onData.bms ? (onData.bms.templowestSubsyscode ? onData.bms.templowestSubsyscode : '--') : '--'}}</span>
              </div>
            </i-col>
            <i-col span="1">
              <div ></div>
            </i-col>
            <i-col span="12">
              <!--</i-col>-->
              <div id="probe_cross" class="ceoss"></div>
            </i-col>
          </row>
          <row v-show="onData.commProtocolVersion === 0 || (onData.commProtocolVersion === 1 && onData.bms && onData.bms.voltages1)">
            <i-col span="11">
              <div style="height:30px;line-height:30px;margin:20px 0 0 10px;">
                <span style="color:black;font-size:16px;">单体信息 </span>
                <span style="color:#808080;" v-if="onData.commProtocolVersion === 0">单体{{onData.battery ? onData.battery.batteryNumber : 0}}个</span>
                <span style="color:#808080;" v-if="onData.commProtocolVersion === 1">单体{{onData.bms ? (onData.bms.voltageCount ? onData.bms.voltageCount : 0) : 0}}个</span>
              </div>
              <div style="" class="volPosition">
                <i-col span="11">
                <div id="voltage" style="" class="hightestVol"></div>
                <div class="volSize">
                  <p style="" >最高电压</p>
                  <p style="" >电池: {{onData.commProtocolVersion === 0 ? (onData.peak ? onData.peak.highBatteryCode : '--') : (onData.bms ? onData.bms.highestVoltageNo  : '--')}}</p>
                </div>
                </i-col>
                <i-col span="2">
                <div class="pressCha">
                  <span v-if="onData.commProtocolVersion === 0">{{((onData.peak ? onData.peak.highVoltage : 0) - (onData.peak ? onData.peak.lowVoltage : 0)).toFixed(3) | dataNaN}}V</span>
                  <span v-if="onData.commProtocolVersion === 1">{{((onData.bms ? onData.bms.voltageHighest : 0) - (onData.bms ? onData.bms.voltageLowest : 0)).toFixed(3) | dataNaN}}V</span>
                  <hr/>
                  <span>压差</span>
                </div>
                </i-col>
                <i-col span="11">
                <div id="vol" style="" class="lowerVol"></div>
                <div class="lowVolSize">
                  <p style="" >最低电压</p>
                  <p style="" >电池: {{onData.commProtocolVersion === 0 ? (onData.peak ? (onData.peak.lowBatteryCode === '无效' || onData.peak.lowBatteryCode === '异常') ? '--' : onData.peak.lowBatteryCode : '--') : (onData.bms ? onData.bms.lowestVoltageNo  : '--')}}</p>
               </div>
               </i-col>
              </div>
            </i-col>
            <i-col span="1">
            </i-col>
            <i-col span="12" style="padding-bottom:70px;">
              <div id="monomer_cross" class="col_ceoss"></div>
            </i-col>
          </row>
        </div>
        </div>
      </div>
</template>
<script>
import AMap from 'AMap';
import echarts from 'echarts';
import thermometer from '@/components/thermometer/thermometer';
import { amapGregeoOne } from '@/service/serviceStationService/serviceStation';

  export default {
    components: {
      thermometer
    },
    data () {
      return {
        map: null,
        vehicleInfo: {     // 车辆信息的位置，采集时间
          mileage: '',
          address: '',
          collectTime1: '',
          speed: ''
        },
        markerCar: null,   // 车辆标记
        currentLocation: {      // 当前位置
          lon: 103.916776,
          lat: 36.950676
        },
        batteryTypeCode: '',
        zoomData: {   // 柱状图dataZoom
          zoomStart1: 0,
          zoomEnd1: 100,
          zoomStart2: 0,
          zoomEnd2: 100
        },
        onData: {
          commProtocolVersion: 0,       // 0 : 三期, 1 : 二期
          matrixVersion: 0,       // 0 : D3, 1 : D2_100, 2 : D2_80
          overview: {
            mileage: '',
            currentMileage: '',
            chargeStatus: null,
            carStatus: 0,
            driveBrakeStatus: null,
            soc: 0,
            clutchStatus: null,
            vehicleSpeed: 0,
            totalVoltage: 0,
            totalCurrent: 0,
            collectTime1: null,
            receiveTime1: null
          },
          position: {
            mileage: '',
            collectTime1: null,
            receiveTime1: null
          },
          bms: {
            collectTime1: null,
            receiveTime1: null,
            temps1: '',
            temps2: '',
            batteryTypeCode: '',
            highestTemp: 0,
            tempLowest: 0,  // 无值
            batteryTempcount: 0,  // 无值
            highestVoltage: 0,
            lowestVoltage: 0,
            voltageCount: 0,    // 无值
            voltageTotal: 0,
            currentTotal: 0
          },
          peak: {
            highTemperature: 0,
            lowTemperature: 0,
            highProbeCode: null, // 最高温度探针序号
            lowProbeCode: null,  // 最低温度探针序号
            highBatteryCode: null,  // 最高电压电池单体代号
            lowBatteryCode: null,  // 最低电压电池单体代号
            highVoltage: 0,
            lowVoltage: 0,
            collectTime1: null,
            receiveTime1: null
          },
          temperature: {
            number: 0,
            temperatures: ''
          },
          battery: {
            collectTime1: null,
            receiveTime1: null,
            batterySysNumber: 0,
            batteryVoltages: '',
            batteryNumber: 0
          },
          motor: [
            {
              speed: 0,
              collectTime1: null,
              receiveTime1: null,
              motorTemperature: 0,
              controllerTemperature: 0
            }
          ],
          mc: {
            collectTime1: null,
            receiveTime1: null,
            motorRpm: 0,
            motorTemp: 0,
            mcTemp: 0
          },
          vms: {
            speed: '',
            gearStatus: null,
            readyLampState: 1
          },
          msg: {
            collectTime1: null,
            receiveTime1: null,
            geerPositon: null,
            readyLampStatus: 1
          },
          icu: {
            totalMile: ''  // d2 总里程
          },
          // 自定义值
          custom: {
            probeHighest: 0,   // 最高温度探针个数
            probeLowest: 0,    // 最低温度探针个数
            voltageHighest: 0,   // 最高电压个数
            voltageLowest: 0,    // 最低电压个数
            motorTemp: 0,    // 电机平均温度
            motorContTemp: 0,    // 电机控制器平均温度
            temperatureAverage: 0    // 电池平均温度
          },
          noCreated: true    // 是否接收了webSocket数据
        },
        soc_gauge: {echart: null, option: null},                 // SOC
        speed_gauge: {echart: null, option: null},              // 车速
        motor_gauge: {echart: null, option: null},             // 电机转速
        voltage_gauge: {echart: null, option: null},          // 总电压
        current_gauge: {echart: null, option: null},         // 总电流
        probe_cross: {echart: null, option: null},         // 探针信息
        monomer_cross: {echart: null, option: null},         // 单体信息
        voltage: {echart: null, option: null},         // 单体电压
        vol: {echart: null, option: null}         // 单体电压
      };
    },
    methods: {
       _initMap () {
        try {
          this.map = new AMap.Map('detailMap', {
            resizeEnable: true,
            center: [103.916776, 35.950646], // 地图中心点
            zoom: 15  // 地图显示的缩放级别
          });
          this.map.clearMap();
        } catch (e) {
          this.$message({
            message: '地图加载失败, 请稍后再试!',
            type: 'error'
          });
        }
      },
      go () {
         let detailPara = JSON.parse(this._hyTool.getStore('alarmParams'));
         let queSearch = this.$route.query;
         if (detailPara.type === 1) {
            this.$router.push({path: '/main/alarm/nationalStandard', query: queSearch});
         } else if (detailPara.type === 2) {
            this.$router.push({path: '/main/alarm/landMark', query: queSearch});
         } else if (detailPara.type === 3) {
            this.$router.push({path: '/main/alarm/ownFault', query: queSearch});
         } else if (detailPara.type === 4) {
            this.$router.push({path: '/main/alarm/alarmNoRead'});
         }
      },
      getLocal () {
        this.map.setZoomAndCenter(15, [this.currentLocation.lon, this.currentLocation.lat]);
      },
       // 通过经纬度获取详细地址
      getGregeoOne (list, cb) {
        let vals = [];
        amapGregeoOne(list, res => {
          res.forEach(val => {
            if (val.data.regeocodes) {
               val.data.regeocodes.forEach(va => {
                vals.push(va);
              });
            } else {
              vals = [{formatted_address: ''}];
            }
          });
          cb(vals);
        });
      },
      // 获取速度
      getSpeed (data, flag) {
        if (flag === 0) this.vehicleInfo.speed = (data.vehicleSpeed === null || data.vehicleSpeed === undefined) ? 0 : data.vehicleSpeed;
        else this.vehicleInfo.speed = (data.speed === null || data.speed === undefined) ? 0 : data.speed;
      },
      getAddress (position) {
        let str = position.longitude + ',' + position.latitude;
        // this.vehicleInfo.speed = position.speed === null ? '' : position.speed;
        this.vehicleInfo.collectTime = position.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+position.collectTime), 'yyyy-MM-dd hh:mm:ss');
        this.getGregeoOne([str], value => {
          this.vehicleInfo.address = value[0].formatted_address;
        });
      },
      getData (obj) {
        this.loading = false;
        // 车辆定位信息
        // 三期 d3
        if (obj.commProtocolVersion === 0 && obj.matrixVersion === 0) {
          this.$set(this, 'onData', obj);
          if (this.onData.bms) {
            this.batteryTypeCode = this.onData.bms.batteryTypeCode;
          }
          if (this.onData.position && this.hasMap) {
            this.getAddress(this.onData.position); // 获取详细地址
          }
          if (this.onData.overview && this.hasMap) {
            this.getSpeed(this.onData.overview, 0); // 获取速度
          }
        } else {   // d2 d2s
          this.$set(this, 'onData', obj);
          if (this.onData.position && this.hasMap) {
            this.getAddress(this.onData.position); // 获取详细地址
          }
          if (obj.commProtocolVersion === 0) {
              this.getSpeed(this.onData.overview, 0);  // 获取速度
            } else {
              this.getSpeed(this.onData.vms, 1); // 获取速度
            }
        }
        // 初始化
        this.onData.custom = {
          probeHighest: 0,
          probeLowest: 0,
          voltageHighest: 0,
          voltageLowest: 0,
          motorTemp: 0,
          motorContTemp: 0,
          temperatureAverage: 0
        };
        // 地图 ------end-------------------------------
        // 三期
        // if (this.onData.commProtocolVersion === 0 && !(this.onData.overview && this.onData.position)) {
        //   return;
        // }
        // // 二期
        // if (this.onData.commProtocolVersion === 1 && !this.onData.bms) {
        //   return;
        // }
         if (this.onData.commProtocolVersion === 0) {
          // 国标数据 -----------------
          // 整车数据
          if (this.onData.overview) {
            for (let i in this.onData.overview) {
              this.onData.overview[i] = this.onData.overview[i] === -1 ? '异常' : (this.onData.overview[i] === -2 ? '无效' : this.onData.overview[i]);
              this.onData.overview[i] = this.onData.overview[i] === -8000 ? '异常' : (this.onData.overview[i] === -9000 ? '无效' : this.onData.overview[i]);
            }
            this.onData.overview.collectTime1 = this.onData.overview.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.overview.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.overview.receiveTime1 = this.onData.overview.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.overview.receiveTime), 'yyyy-MM-dd hh:mm:ss');
          }
          // 驱动电机数据
          if (this.onData.motor[0]) {
           for (let i in this.onData.motor[0]) {
              this.onData.motor[0][i] = this.onData.motor[0][i] === -1 ? '异常' : (this.onData.motor[0][i] === -2 ? '无效' : this.onData.motor[0][i]);
              this.onData.motor[0][i] = this.onData.motor[0][i] === -8000 ? '异常' : (this.onData.motor[0][i] === -9000 ? '无效' : this.onData.motor[0][i]);
            }
            this.onData.motor[0].collectTime1 = this.onData.motor[0].collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.motor[0].collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.motor[0].receiveTime1 = this.onData.motor[0].receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.motor[0].receiveTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.motor[0].motorTotal = this.onData.motor[0].motorTotal ? this.onData.motor[0].motorTotal : 1;
          }
          // 电池数据
          if (this.onData.battery && this.onData.temperature) {
            let obj = {
              vinCode: '',
              gprsCode: '',
              collectTime1: '',
              receiveTime1: '',
              totalVoltage: 0,
              totalCurrent: 0,
              number: 0,
              temperatures: '',
              batterySysNumber: 0,
              batterySysIndex: 0,
              batteryVoltages: 0,
              batteryNumber: 0,
              batteryStartIndex: 0,
              batteryPacketNumber: 0
            };
            obj.vinCode = this.onData.battery.vinCode;
            obj.gprsCode = this.onData.battery.gprsCode;
            obj.collectTime1 = this.onData.battery.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.battery.collectTime), 'yyyy-MM-dd hh:mm:ss');
            obj.receiveTime = this.onData.battery.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.battery.receiveTime), 'yyyy-MM-dd hh:mm:ss');
            obj.totalVoltage = this.onData.battery.totalVoltage;
            obj.totalCurrent = this.onData.battery.totalCurrent;
            obj.number = this.onData.temperature.number;
            obj.temperatures = this.onData.temperature.temperatures;
            obj.batterySysNumber = this.onData.battery.batterySysNumber;
            obj.batterySysIndex = this.onData.battery.batterySysIndex;
            obj.batteryVoltages = this.onData.battery.batteryVoltages;
            obj.batteryNumber = this.onData.battery.batteryNumber;
            obj.batteryStartIndex = this.onData.battery.batteryStartIndex;
            obj.batteryPacketNumber = this.onData.battery.batteryPacketNumber;
            for (let i in obj) {
              obj[i] = obj[i] === -1 ? '异常' : (obj[i] === -2 ? '无效' : obj[i]);
              obj[i] = obj[i] === -8000 ? '异常' : (obj[i] === -9000 ? '无效' : obj[i]);
            }
          }
          // 车辆位置数据
          if (this.onData.position) {
            for (let i in this.onData.position) {
              this.onData.position[i] = this.onData.position[i] === -1 ? '异常' : (this.onData.position[i] === -2 ? '无效' : this.onData.position[i]);
              this.onData.position[i] = this.onData.position[i] === -8000 ? '异常' : (this.onData.position[i] === -9000 ? '无效' : this.onData.position[i]);
            }
            this.onData.position.collectTime1 = this.onData.position.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.position.receiveTime1 = this.onData.position.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.receiveTime), 'yyyy-MM-dd hh:mm:ss');
          }
          // 极值数据
          if (this.onData.peak) {
            for (let i in this.onData.peak) {
              this.onData.peak[i] = this.onData.peak[i] === -1 ? '异常' : (this.onData.peak[i] === -2 ? '无效' : this.onData.peak[i]);
              this.onData.peak[i] = this.onData.peak[i] === -8000 ? '异常' : (this.onData.peak[i] === -9000 ? '无效' : this.onData.peak[i]);
            }
            this.onData.peak.collectTime1 = this.onData.peak.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.peak.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.peak.receiveTime1 = this.onData.peak.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.peak.receiveTime), 'yyyy-MM-dd hh:mm:ss');
          }
          // 电机温度
          let motorTemp = 0;
          this.onData.motor.forEach(val => {
            motorTemp = motorTemp + val.motorTemperature;
          });
          // 电池温度 D3
          let dataArr = this.onData.temperature ? (this.onData.temperature.temperatures ? this.onData.temperature.temperatures.split(',') : []) : [];
          let temperaturesSum = 0;
          dataArr.forEach(val => {
            temperaturesSum = temperaturesSum + Number(val);
          });
          // 电机控制器温度
          let motorContTemp = 0;
          this.onData.motor.forEach(val => {
            motorContTemp = motorContTemp + val.controllerTemperature;
          });
          // 探针信息， 最高温度，最低温度
          let data = this.onData.temperature ? (this.onData.temperature.temperatures ? this.onData.temperature.temperatures.split(',') : []) : [];
          let highTempArr = [];
          let lowTempArr = [];
          data.forEach((val, index) => {
            val = Number(val);
            if (val === this.onData.peak.highTemperature) {
              highTempArr.push(index + 1);
            }
            if (val === this.onData.peak.lowTemperature) {
              lowTempArr.push(index + 1);
            }
          });
          // 单体信息， 最高电压，最低电压
          let data1 = this.onData.battery ? (this.onData.battery.batteryVoltages ? this.onData.battery.batteryVoltages.split(',') : []) : [];
          let highVolArr = [];
          let lowVolArr = [];
          if (!this.onData.peak.highVoltage) this.onData.peak.highVoltage = 0;
          if (!this.onData.peak.lowVoltage) this.onData.peak.lowVoltage = 0;
          data1.forEach((val, index) => {
            val = Number(val);
            if (val === this.onData.peak.highVoltage) {
              highVolArr.push(index + 1);
            }
            if (val === this.onData.peak.lowVoltage) {
              lowVolArr.push(index + 1);
            }
          });
          this.onData.custom = {
            probeHighest: highTempArr.length,
            probeLowest: lowTempArr.length,
            voltageHighest: highVolArr.length,
            voltageLowest: lowVolArr.length,
            motorTemp: isNaN(motorTemp / this.onData.motor.length) ? 0 : motorTemp / this.onData.motor.length,
            motorContTemp: isNaN(motorContTemp / this.onData.motor.length) ? 0 : motorContTemp / this.onData.motor.length,
            temperatureAverage: isNaN(temperaturesSum / dataArr.length) ? 0 : temperaturesSum / dataArr.length
          };
        }
        if (this.onData.commProtocolVersion === 1) {
          // 国标数据 -----------------
          // 车辆位置数据
          if (this.onData.position) {
             for (let i in this.onData.position) {
              this.onData.position[i] = this.onData.position[i] === -1 ? '异常' : (this.onData.position[i] === -2 ? '无效' : this.onData.position[i]);
              this.onData.position[i] = this.onData.position[i] === -8000 ? '异常' : (this.onData.position[i] === -9000 ? '无效' : this.onData.position[i]);
            }
            this.onData.position.collectTime1 = (this.onData.position.collectTime === null || this.onData.position.collectTime === undefined) ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.position.receiveTime1 = (this.onData.position.receiveTime === null || this.onData.position.receiveTime === undefined) ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.receiveTime), 'yyyy-MM-dd hh:mm:ss');
          }
          // 电池温度 D2
          let dataArr1 = this.onData.bms.temps1 ? this.onData.bms.temps1.split(',') : [];
          let dataArr2 = this.onData.bms.temps2 ? this.onData.bms.temps2.split(',') : [];
          let dataArr = dataArr1.concat(dataArr2);
          let temperaturesSum = 0;
          dataArr.forEach(val => {
            temperaturesSum = temperaturesSum + Number(val);
          });
          this.onData.custom = {
            temperatureAverage: isNaN(temperaturesSum / dataArr.length) ? 0 : temperaturesSum / dataArr.length
          };
        }
        if (this.onData.position && this.hasMap) {
            this.map.clearMap();
            if (this.markerCar) {
              this.map.remove(this.markerCar);
            }
            let lng = {lon: null, lat: null};
            let type = false;
            if (obj.position && obj.position.latitude && obj.position.longitude) {
              lng.lon = obj.position.longitude;
              lng.lat = obj.position.latitude;
              type = false;
            } else {
              type = true;
            }
            let ln = {lon: null, lat: null};
            if (!type) ln = this._hyTool.converAmap(lng.lat, lng.lon);
            else ln = lng;
            let direction = 0;
            if (this.onData.position.direction) direction = this.onData.position.direction;
            this.currentLocation.lon = ln.lon;
            this.currentLocation.lat = ln.lat;
            this.markerCar = new AMap.Marker({
              position: [ln.lon, ln.lat],
              icon: new AMap.Icon({
                size: new AMap.Size(43, 20),  // 图标大小
              image: '../../static/images/car.png'
            //   image: img
              }),
              offset: new AMap.Pixel(-22, -10),
              angle: 90 + Number(direction)
            });
            this.markerCar.setMap(this.map);
            this.map.setFitView();
        }
          this.getList();
      },
      getList () {
        let socGauge = 0;
        let speedGauge = 0;
        let motorGauge = 0;
        let voltageGauge = 0;
        let currentGauge = 0;
        if (this.onData.commProtocolVersion === 0) {  // 0 - D3 1 - D2
          if (this.onData.motor && this.onData.motor.length > 0) {
            motorGauge = this.onData.motor[0].speed;
          }
          if (this.onData.overview) {
            voltageGauge = this.onData.overview.totalVoltage ? (this.onData.overview.totalVoltage === '无效' || this.onData.overview.totalVoltage === '异常') ? 0 : this.onData.overview.totalVoltage : 0;
            currentGauge = this.onData.overview.totalCurrent ? (this.onData.overview.totalCurrent === '无效' || this.onData.overview.totalCurrent === '异常') ? 0 : this.onData.overview.totalCurrent : 0;
            socGauge = this.onData.overview.soc ? (this.onData.overview.soc === '无效' || this.onData.overview.soc === '异常') ? 0 : this.onData.overview.soc : 0;
           speedGauge = this.onData.overview.vehicleSpeed ? (this.onData.overview.vehicleSpeed === '无效' || this.onData.overview.vehicleSpeed === '异常') ? 0 : this.onData.overview.vehicleSpeed : 0;
          }
        }
        if (this.onData.commProtocolVersion === 1) {
          speedGauge = this.onData.vms ? this.onData.vms.speed ? (this.onData.vms.speed === '无效' || this.onData.vms.speed === '异常') ? 0 : this.onData.vms.speed : 0 : 0;
          motorGauge = this.onData.mc ? (this.onData.mc.motorRpm ? (this.onData.mc.motorRpm === '无效' || this.onData.mc.motorRpm === '异常') ? 0 : this.onData.mc.motorRpm : 0) : 0;
          if (this.onData.bms) {
          socGauge = this.onData.bms.soc ? (this.onData.bms.soc === '无效' || this.onData.bms.soc === '异常') ? 0 : this.onData.bms.soc : 0;
          voltageGauge = this.onData.bms.totalVoltage ? (this.onData.bms.totalVoltage === '无效' || this.onData.bms.totalVoltage === '异常') ? 0 : this.onData.bms.totalVoltage : 0;
          currentGauge = this.onData.bms.totalCurrent ? (this.onData.bms.totalCurrent === '无效' || this.onData.bms.totalCurrent === '异常') ? 0 : this.onData.bms.totalCurrent : 0;
          }
        };
        this.soc_gauge.echart = echarts.init(document.getElementById('soc_gauge'));// 初始化soc
        this.speed_gauge.echart = echarts.init(document.getElementById('speed_gauge'));// 初始化车速
        this.motor_gauge.echart = echarts.init(document.getElementById('motor_gauge'));// 初始化电机转速
        this.voltage_gauge.echart = echarts.init(document.getElementById('voltage_gauge'));// 初始化总电压
        this.current_gauge.echart = echarts.init(document.getElementById('current_gauge'));// 初始化总电流
        this.probe_cross.echart = echarts.init(document.getElementById('probe_cross'));// 初始化探针信息
        this.monomer_cross.echart = echarts.init(document.getElementById('monomer_cross'));// 初始化单体信息
        this.voltage.echart = echarts.init(document.getElementById('voltage'));// 初始化单体电压
        this.vol.echart = echarts.init(document.getElementById('vol'));// 初始化单体电压
        // SOC
        this.soc_gauge.option = {
          tooltip: {
            formatter: '{a} : {c}%'
          },
          series: [
            {
              name: '剩余电量',
              center: ['50%', '50%'],
              radius: '95%',
              type: 'gauge',
              detail: {
                formatter: '{value}%',
                offsetCenter: [0, '60%'],
                textStyle: {
                  color: 'gray',
                  fontSize: 22,
                  fontWeight: 'nomal'
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              data: [{value: socGauge, name: 'SOC'}],
              axisLine: {    // 仪表盘轴线相关配置
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[socGauge / 100, '#E62C19'], [1, '#C4C4C4']],
                  width: 5,
                  shadowColor: 'black' // 默认透明
                  // shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线样式
                length: 0         // 属性length控制线长
              },
              //   title: {
              //     offsetCenter: [0, '90%']       // x, y，单位px
              //  },
              pointer: {           // 指针
                shadowColor: 'black', // 默认透明
                //   shadowBlur: 5,
                width: 2
              }
            }
          ],
          animationDuration: 10000,
          animationDurationUpdate: 10000
        };
        this.soc_gauge.echart.clear();
        this.soc_gauge.echart.setOption(this.soc_gauge.option);

        // 车速
        this.speed_gauge.option = {
          tooltip: {
            formatter: '{a} : {c}km/h'
          },
          series: [
            {
              name: '车速',
              center: ['50%', '50%'],
              radius: '95%',
              type: 'gauge',
              min: 0,
              max: 220,
              detail: {
                formatter: '{value}km/h',
                offsetCenter: [0, '60%'],
                textStyle: {
                  color: 'gray',
                  fontSize: 22,
                  fontWeight: 'nomal'
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              data: [{value: speedGauge, name: '车速'}],
              axisLine: {    // 仪表盘轴线相关配置
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[speedGauge / 220, '#E62C19'], [1, '#C4C4C4']],
                  width: 5,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线样式
                length: 0         // 属性length控制线长
              },
              //    title: {
              //     offsetCenter: [0, '90%']       // x, y，单位px
              //  },
              pointer: {           // 指针
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                width: 2
              }
            }
          ],
          animationDuration: 10000,
          animationDurationUpdate: 10000
        };
        this.speed_gauge.echart.clear();
        this.speed_gauge.echart.setOption(this.speed_gauge.option);

        // 电机转速
        this.motor_gauge.option = {
          tooltip: {
            formatter: '{a} : {c}krpm'
          },
          series: [
            {
              name: '电机转速',
              center: ['50%', '50%'],
              radius: '95%',
              type: 'gauge',
              min: -20,
              max: 50,
              splitNumber: 7,
              detail: {
                formatter: '{value}krpm',
                offsetCenter: [0, '60%'],
                textStyle: {
                  color: 'gray',
                  fontSize: 22,
                  fontWeight: 'nomal'
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              data: [{value: motorGauge / 1000, name: '电机转速'}],
              axisLine: {    // 仪表盘轴线相关配置
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[((motorGauge / 1000) + 20) / 70, '#E62C19'], [1, '#C4C4C4']],
                  width: 5,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线样式
                length: 0         // 属性length控制线长
              },
              //    title: {
              //     offsetCenter: [0, '90%']       // x, y，单位px
              //  },
              pointer: {           // 指针
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                width: 2
              }
            }
          ],
          animationDuration: 10000,
          animationDurationUpdate: 10000
        };
        this.motor_gauge.echart.clear();
        this.motor_gauge.echart.setOption(this.motor_gauge.option);

        // 总电压
        this.voltage_gauge.option = {
          tooltip: {
            formatter: '{a} : {c}V'
          },
          series: [
            {
              name: '总电压',
              center: ['50%', '50%'],
              radius: '95%',
              type: 'gauge',
              min: 0,
              max: 1000,
              detail: {
                formatter: '{value}V',
                offsetCenter: [0, '60%'],
                textStyle: {
                  color: 'gray',
                  fontSize: 22,
                  fontWeight: 'nomal'
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              data: [{value: voltageGauge, name: '总电压'}],
              axisLine: {    // 仪表盘轴线相关配置
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[voltageGauge / 1000, '#E62C19'], [1, '#C4C4C4']],
                  width: 5,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线样式
                length: 0         // 属性length控制线长
              },
              //    title: {
              //     offsetCenter: [0, '90%']       // x, y，单位px
              //  },
              pointer: {           // 指针
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                width: 2
              }
            }
          ],
          animationDuration: 10000,
          animationDurationUpdate: 10000
        };
        this.voltage_gauge.echart.clear();
        this.voltage_gauge.echart.setOption(this.voltage_gauge.option);

        // 总电流
        this.current_gauge.option = {
          tooltip: {
            formatter: '{a} : {c}A'
          },
          series: [
            {
              name: '总电流',
              center: ['50%', '50%'],
              radius: '95%',
              type: 'gauge',
              min: -1000,
              max: 1000,
              detail: {
                formatter: '{value}A',
                offsetCenter: [0, '60%'],
                textStyle: {
                  color: 'gray',
                  fontSize: 22,
                  fontWeight: 'nomal'
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              data: [{value: currentGauge, name: '总电流'}],
              axisLine: {    // 仪表盘轴线相关配置
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[(currentGauge + 1000) / 2000, '#E62C19'], [1, '#C4C4C4']],

                  width: 5,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线样式
                length: 0         // 属性length控制线长
              },
              //   title: {
              //     offsetCenter: [0, '90%']       // x, y，单位px
              //  },
              pointer: {           // 指针
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                width: 2
              }
            }
          ],
          animationDuration: 10000,
          animationDurationUpdate: 10000
        };
        this.current_gauge.echart.clear();
        this.current_gauge.echart.setOption(this.current_gauge.option);

        let dataAxis = [];
        let data = [];
        let yMax = 12;
        let maxT = {};  // 最大值
        let minT = {};  // 最小值
        if (this.onData.commProtocolVersion === 0) {
          data = this.onData.temperature ? this.onData.temperature.temperatures ? this.onData.temperature.temperatures.split(',') : [] : [];
          for (let i = 0; i < data.length; i++) {
            if (data[i] === '-8000' || data[i] === '-9000') {
              data[i] = 0;
            }
            dataAxis.push(i + 1);
          }
          maxT = {name: '最大值', value: this.onData.peak.highTemperature, xAxis: this.onData.peak.highProbeCode - 1, yAxis: this.onData.peak.highTemperature};
          minT = {name: '最小值', value: this.onData.peak.lowTemperature, xAxis: this.onData.peak.lowProbeCode - 1, yAxis: this.onData.peak.lowTemperature};
        }
        if (this.onData.commProtocolVersion === 1) {
          if (this.onData.bms && this.onData.bms.temps1) {
            data = (this.onData.bms.temps1 + ',' + this.onData.bms.temps2).split(',');
            for (let i = 0; i < data.length; i++) {
              if (data[i] === '-8000' || data[i] === '-9000') {
                data[i] = 0;
              }
              dataAxis.push(i + 1);
            }
            maxT = {name: '最大值', value: this.onData.bms.tempHighest, xAxis: this.onData.bms.highestTempNo - 1, yAxis: this.onData.bms.tempHighest};
            minT = {name: '最小值', value: this.onData.bms.tempLowest, xAxis: this.onData.bms.templowestSubsyscode - 1, yAxis: this.onData.bms.tempLowest};
          }
        }
        //
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }
        this.probe_cross.option = {
          tooltip: {
            // trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true
              }
            }
          },
          toolbox: {
            show: true,
            right: 50,
            feature: {
              mark: {show: true},
              //    dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']}
            }
          },
          calculable: true,
          grid: {
            top: '12%',
            left: '1%',
            right: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: dataAxis
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '°C',
              axisLabel: {
                // formatter: function (a) {
                //     a = +a;
                //     return isFinite(a)
                //         ? echarts.format.addCommas(+a / 1000)
                //         : '';
                // }
              }
            }
          ],
          dataZoom: [
            {
              show: true,
              start: this.zoomData.zoomStart1,
              end: this.zoomData.zoomEnd1
            },
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'white'}
              },
              barGap: '-100%',
              barCategoryGap: '50%',
              data: dataShadow,
              animation: false
            },
            {
              name: '温度',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#5179DF'
                },
                emphasis: {
                  color: '#5179DF'
                }
              },
              markPoint: {
                data: [
                  maxT,
                  minT
                ]
              },
              data: data
            }
          ],
          animationDuration: 3000,
          animationDurationUpdate: 3000
        };
        this.probe_cross.echart.clear();
        this.probe_cross.echart.setOption(this.probe_cross.option);
        this.probe_cross.echart.on('dataZoom', (param) => {
          this.zoomData.zoomStart1 = param.start;
          this.zoomData.zoomEnd1 = param.end;
        });

       // 单体信息  --------------------------------------------------------------------------------------
        let dataAxis1 = [];
        let data1 = [];
        let yMax1 = 15;
        let maxV = {};  // 最大值
        let minV = {};  // 最小值
        if (this.onData.commProtocolVersion === 0) {   // 0 - 三期 1 - 二期
          data1 = this.onData.battery ? (this.onData.battery.batteryVoltages ? this.onData.battery.batteryVoltages.split(',') : []) : [];
          for (let i = 0; i < data1.length; i++) {
            if (data1[i] === '-8000' || data1[i] === '-9000') {
              data1[i] = 0;
            }
            dataAxis1.push(i + 1);
          }
          yMax1 = Math.ceil(this.onData.peak.highVoltage);
          // 最大值  最小值
          maxV = {name: '最大值', value: this.onData.peak.highVoltage, xAxis: this.onData.peak.highBatteryCode - 1, yAxis: this.onData.peak.highVoltage};
          minV = {name: '最小值', value: this.onData.peak.lowVoltage, xAxis: this.onData.peak.lowBatteryCode - 1, yAxis: this.onData.peak.lowVoltage};
        }
        if (this.onData.commProtocolVersion === 1) {
          if (this.onData.bms && this.onData.bms.voltages1) {
            data1 = [];
            for (let i = 1; i < 13; i++) {
              let name = `voltages${i}`;
             if (this.onData.bms[name]) data1 = data1.concat(this.onData.bms[name].split(','));
            }
            for (let i = 0; i < data1.length; i++) {
              if (data1[i] === '-8000' || data1[i] === '-9000') {
                data1[i] = 0;
              }
              dataAxis1.push(i + 1);
            }
            yMax1 = Math.ceil(this.onData.bms.voltageHighest);
            // 最大值  最小值
            maxV = {name: '最大值', value: this.onData.bms.voltageHighest, xAxis: this.onData.bms.highestVoltageNo - 1, yAxis: this.onData.bms.voltageHighest};
            minV = {name: '最小值', value: this.onData.bms.voltageLowest, xAxis: this.onData.bms.lowestVoltageNo - 1, yAxis: this.onData.bms.voltageLowest};
          }
        }
        //
        let dataShadow1 = [];
        for (let i = 0; i < data1.length; i++) {
          dataShadow1.push(yMax1);
        }
        this.monomer_cross.option = {
          tooltip: {
            // trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true
              }
            }
          },
          toolbox: {
            show: true,
            right: 50,
            feature: {
              mark: {show: true},
              //    dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']}
            }
          },
          calculable: true,
          grid: {
            top: '12%',
            left: '1%',
            right: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: dataAxis1
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'V',
              axisLabel: {
                // formatter: function (a) {
                //     a = +a;
                //     return isFinite(a)
                //         ? echarts.format.addCommas(+a / 1000)
                //         : '';
                // }
              }
            }
          ],
          dataZoom: [
            {
              show: true,
              start: this.zoomData.zoomStart2,
              end: this.zoomData.zoomEnd2
            },
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'white'}
              },
              barGap: '-100%',
              barCategoryGap: '50%',
              data: dataShadow1,
              animation: false
            },
            {
              name: '电压',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: '#5179DF'
                },
                emphasis: {
                  color: '#5179DF'
                }
              },
              markPoint: {
                data: [
                  maxV,
                  minV
                ]
              },
              data: data1
            }
          ],
          animationDuration: 2000,
          animationDurationUpdate: 2000
        };
        this.monomer_cross.echart.clear();
        this.monomer_cross.echart.setOption(this.monomer_cross.option);
        this.monomer_cross.echart.on('dataZoom', (param) => {
          this.zoomData.zoomStart2 = param.start;
          this.zoomData.zoomEnd2 = param.end;
        });
        // 单体信息  end--------------------------------------------------------------------------------------

        // 单体电压 最高 最低---------------------------------
        let highVoltage = 0;
        let lowVoltage = 0;
        if (this.onData.commProtocolVersion === 0) {  // 0 - 三期 1 - 二期
          highVoltage = this.onData.peak.highVoltage ? (this.onData.peak.highVoltage === '无效' || this.onData.peak.highVoltage === '异常') ? 0 : this.onData.peak.highVoltage : 0;
          lowVoltage = this.onData.peak.lowVoltage ? (this.onData.peak.lowVoltage === '无效' || this.onData.peak.lowVoltage === '异常') ? 0 : this.onData.peak.lowVoltage : 0;
        }
        if (this.onData.commProtocolVersion === 1) {
          if (this.onData.bms) {
            highVoltage = this.onData.bms.voltageHighest ? (this.onData.bms.voltageHighest === '无效' || this.onData.bms.voltageHighest === '异常') ? 0 : this.onData.bms.voltageHighest : 0;
            lowVoltage = this.onData.bms.voltageLowest ? (this.onData.bms.voltageLowest === '无效' || this.onData.bms.voltageLowest === '异常') ? 0 : this.onData.bms.voltageLowest : 0;
          } else {
            highVoltage = 0;
            lowVoltage = 0;
          }
        }
        // 单体电压
        this.voltage.option = {
          tooltip: {
            formatter: '{a} : {c}V'
          },
          series: [
            {
              name: '总电压',
              center: ['50%', '50%'],
              radius: '95%',
              type: 'gauge',
              min: 0,
              max: 15,
              startAngle: 180,
              endAngle: 0,
              detail: {
                formatter: '{value}V',
                textStyle: {
                  color: '#2A2A2A',
                  fontSize: 14
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              data: [{value: highVoltage, name: ''}],
              axisLine: {    // 仪表盘轴线相关配置
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.25, '#5178E3'], [0.78, '#CACACA'], [1, '#E73D32']],
                  width: 5,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线样式
                length: 0         // 属性length控制线长
              },
              pointer: {           // 指针
                shadowColor: '#C9C9C9', // 默认透明
                shadowBlur: 5,
                width: 2
              }
            }
          ],
          animationDuration: 10000,
          animationDurationUpdate: 10000
        };
        this.voltage.echart.clear();
        this.voltage.echart.setOption(this.voltage.option);
        this.vol.option = {
          tooltip: {
            formatter: '{a} : {c}V'
          },
          series: [
            {
              name: '总电压',
              center: ['50%', '50%'],
              radius: '95%',
              type: 'gauge',
              min: 0,
              max: 15,
              startAngle: 180,
              endAngle: 0,
              detail: {
                formatter: '{value}V',
                textStyle: {
                  color: '#2A2A2A',
                  fontSize: 14
                }
              },
              axisTick: {            // 坐标轴小标记
                length: 0,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              data: [{value: lowVoltage, name: ''}],
              axisLine: {    // 仪表盘轴线相关配置
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.25, '#5178E3'], [0.78, '#CACACA'], [1, '#E73D32']],
                  width: 5,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线样式
                length: 0         // 属性length控制线长
              },
              pointer: {           // 指针
                shadowColor: '#C9C9C9', // 默认透明
                shadowBlur: 5,
                width: 2
              }
            }
          ],
          animationDuration: 10000,
          animationDurationUpdate: 10000
        };
        this.vol.echart.clear();
        this.vol.echart.setOption(this.vol.option);
      }
    },
    props: {
        data: {
            type: Object,
            default: this.onData
        },
        hasMap: {
          type: Boolean,
          default: false
        },
        vehicleData: {
          type: Object,
          default: () => {
            return {
              vinCode: '',
              carType: '',
              plateNo: ''
              };
          }
        }
    },
    watch: {
        data (curValue) {
        if (curValue) {
          this.getData(curValue);
        } else {
          let data = this.$options.data.call(this).onData;
          this.getData(data);
        }
      }
    },
    mounted () {
        this.getList();
        if (this.hasMap) {
          this._initMap();
        }
    },
    beforeDestroy () {
      this.soc_gauge.echart.clear();
      this.speed_gauge.echart.clear();
      this.motor_gauge.echart.clear();
      this.voltage_gauge.echart.clear();
      this.current_gauge.echart.clear();
      this.probe_cross.echart.clear();
      this.monomer_cross.echart.clear();
      this.voltage.echart.clear();
      this.vol.echart.clear();
    }
  };
</script>
