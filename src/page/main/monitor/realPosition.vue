<style lang="scss" scoped>
  @import 'src/styles/mixins';
  .hy-tool-bar {
    height: 150px;
    padding: 0;
    .hy_card {
      padding: 16px;
    }
  }
  .hy-search-bar2{
    border-bottom:1px solid #EEEEEE;
    //    margin-bottom:20px;
  }
  .map {
    min-width: 100px;
    height: 100%;
    .button-group {
      background: #4784ff;
      z-index: 99;
      position: absolute;
      left: 2%;
      top: 4%;
    }
    .button-history {
      background: #4784ff;
      z-index: 99;
      position: absolute;
      left: 120px;
      top: 4%;
    }
    .cardTop {
      position: absolute;
      z-index: 99;
      right: 2%;
      top: 2%;
    }
  }
  .vehicle_card {
    /*width: 200px;*/
    padding:5% 0 0 5%;
    p {
      height: 30px;
      line-height:30px;
    }
  }
  hr {
    background: #46a5f0;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 16px;
    margin: 20px 0;
  }
  .openDetail {
    width:30px;
    height:30px;
    border:1px solid #EEEEEE;
    float:right;
    text-align:center;
    cursor: pointer;
    padding-top: 3px;
  }
  .bottomLine {
    border-bottom:1px solid #EEEEEE;
  }
  .hideData {
    display:none;
  }
  .showData {
    display:block;
  }
  .todayInfo{
    display:inline-block;
    // padding:10px 50px;
    position:relative;
    margin-left: 20%;
    // &:after{
    //   content:'';
    //   height:20px;
    //   border-right:1px solid #D2D2D2;
    //   position:absolute;
    //   right:0;
    //   top:18px;
    // }
  }
  .traval{
    display:inline-block;
    margin-left:3px;
    font-size:16px;
    p {
      font-size:18px;
      font-weight:bold;
    }
  }
  .today{
    display:inline-block;
    padding:5px 40px;
    position:relative;
  }
  .reload {
    margin-right:20px;
    width:25px;
    height:25px;
    background:rgba(90,145,255,1);
    border-radius: 6px;
    float:right;
    margin-top:10px;
    padding-left:3px;
    // padding-top:3px;
    cursor:pointer;
  }
  .map_card {
    width: 490px;
    position: absolute;
    z-index: 99;
    right: 1px;
    top: 15px;
  }
  .hy-close{
    height: 40px;
    position: absolute;
    top: 25px;
    right:490px;
    background-color:white;
    color:#757573;
  }
  .showOpen {
    height: 40px;
    width: 30px;
    background-color:white;
    color:#757573;
    border-right: none;
  }
  .hide {
    display: none;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content alarmPageStyle">
      <div class="hy-search-bar2 realMonitor" style="height: auto;margin-left: -10px;margin-bottom:10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <Select
              v-if="!vinShow"
              placeholder="VIN码"
              style="width: 260px"
              :class="warnTip"
              v-model="vinCode"
              filterable
              remote
              clearable
              :remote-method="vinMethod"
              ref="select"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
            <i-input v-if="vinShow" :class="warnTip" placeholder="VIN码" v-model.trim="vinCode" style="width:260px;" :maxlength="17" clearable @on-change="autoSelect"></i-input>
          </FormItem>
          <i-button type="primary" icon="ios-search" @click="_created(1)" shape="circle" :loading="loading"
                    style="font-size:16px"   class="search">查询
          </i-button>
          <Checkbox @on-change="allSelect" style="margin-left: 10px;">自动查询</Checkbox>
        </Form>
      </div>
      <Row style="height: 70%;">
        <i-col span="19" style="height: 100%;">
          <div class="map" id="detailMap">
            <i-button type="primary" class="button-group" @click.stop="getLocal">当前位置</i-button>
            <i-button type="primary" class="button-history" @click="historyTrack">历史轨迹</i-button>
          </div>
        </i-col>
        <i-col span="5" style="height: 100%;">
          <div class="vehicle_card">
            <p style="font-size:16px;color:#000000;">车辆信息</p>
            <p>VIN码：{{vehicleData.vinCode}}</p>
            <p>车型：{{vehicleData.carType}}</p>
            <p>车牌：{{vehicleData.plateNo ? vehicleData.plateNo : '--'}}</p>
            <p>速度：{{isNaN(vehicleInfo.speed) ? vehicleInfo.speed : (vehicleInfo.speed === '' ? '--' : (vehicleInfo.speed + ' km/h'))}}</p>
            <p>总里程：{{isNaN(vehicleInfo.mileage) ? vehicleInfo.mileage : (vehicleInfo.mileage === '' ? '--' : (vehicleInfo.mileage + 'km'))}}</p>
            <p>位置采集时间：{{vehicleInfo.collectTime1 ? vehicleInfo.collectTime1 : '--' | dateNaN}}</p>
            <p style="height:60px">位置：{{vehicleInfo.address ? vehicleInfo.address : '--'}}</p>
          </div>
        </i-col>
      </Row >
      <div style="padding:5px 0;border-bottom:1px dashed #EEEEEE">
        <div style="position:relative;height:40px;">
          <span style="font-size:16px;position:absolute;top:10px;;">今日信息</span>
          <!--<div class="reloadTime">-->
            <!--<span>{{reloadTime}}</span>-->
          <!--</div>-->
          <!--<div class="reload" @click="getVehicleMonitor()">-->
            <!--<hy-icon type="refresh" size="17" :showContent="true" color="white" ></hy-icon>-->
          <!--</div>-->
        </div>
        <row>
          <i-col span="4">
            <div class="todayInfo ">
              <hy-icon type="youbiao_" :showContent="true" size="32" color="#F6B77A"></hy-icon>
              <div class="traval">
                <p>{{String(todayInfo.mileage).indexOf('.') > -1 ? todayInfo.mileage.toFixed(2) : todayInfo.mileage}}km</p>
                <span>里程</span>
              </div>
            </div>
          </i-col>
          <i-col span="5">
            <div class="todayInfo ">
              <hy-icon type="dianchi" :showContent="true" size="32" color="#01910D"></hy-icon>
              <div class="traval">
                <p>{{todayInfo.chargePower ? (todayInfo.chargePower > 0 ? todayInfo.chargePower : 0) : 0}}kW·h</p>
                <span>充电量</span>
              </div>
            </div>
          </i-col>
          <i-col span="5">
            <div class="todayInfo ">
              <hy-icon type="shijianzhongbiao" :showContent="true" size="32" color="#F58F73"></hy-icon>
              <div class="traval">
                <p>{{parseInt(todayInfo.userCarMinites / 60) === 0 ? '' : (parseInt(todayInfo.userCarMinites / 60) + 'h')}}{{todayInfo.userCarMinites % 60}}min</p>
                <span>用车时长</span>
              </div>
            </div>
          </i-col>
          <i-col span="5">
            <div class="todayInfo ">
              <hy-icon type="dianlianghaojinnew" :showContent="true" size="32" color="#01910D"></hy-icon>
              <div class="traval">
                <p>{{todayInfo.powerConsumption}}kW·h</p>
                <span>耗电量</span>
              </div>
            </div>
          </i-col>
          <i-col span="5">
            <div class="todayInfo " style="width:200px;margin-left: 12%;">
              <hy-icon type="baojing" size="32" :showContent="true" color="#FF473D"></hy-icon>
              <div class="traval" >
                <p>{{todayInfo.alarmCount}}次</p>
                <span>新增国标报警次数</span>
              </div>
            </div>
          </i-col>
        </row>
      </div>
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
          <i-col span="4" class="card" v-if="onData.matrixVersion !== 2 && onData.matrixVersion !== 80">
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
        <div class="templateData">
          <Row>
            <i-col span="14" >
              <div class="hy_vehicle">
                <div class="l-info wth14">
                  <span class="title">总里程</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? (onData.overview.mileage ? ((String(onData.overview.mileage).indexOf('.') > -1 ? (onData.overview.mileage.toFixed(2) + 'km') : (isNaN(onData.overview.mileage) ? onData.overview.mileage : (onData.overview.mileage + 'km')))) : '--') : '--'}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1"><i>{{(onData.icu && onData.icu.totalMile) ? ((String(onData.icu.totalMile).indexOf('.') > -1 ? onData.icu.totalMile.toFixed(2) : onData.icu.totalMile) + 'km') : '--'}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 2"><i>{{(onData.position && onData.position.mileage) ? ((String(onData.position.mileage).indexOf('.') > -1 ? onData.position.mileage.toFixed(2) : onData.position.mileage) + 'km') : '--'}}</i></span>
                </div>
                <!--<div class="l-info wth14" >-->
                  <!--<span class="title">小计里程</span>-->
                  <!--<span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? (onData.overview.currentMileage ? (onData.overview.currentMileage + 'km') : '&#45;&#45;') : '&#45;&#45;'}}</i></span>-->
                  <!--<span class="fonts" v-if="onData.commProtocolVersion === 1"><i>&#45;&#45;</i></span>-->
                <!--</div>-->
                <div class="l-info wth14">
                  <span class="title">充电状态</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? onData.overview.chargeStatus : null | chargeStatus}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2"><i>{{onData.bms ? onData.bms.batteryStatus : null | chargeStatusBMS}}</i></span>
                </div>
                <!--<div class="l-info wth14" v-if="onData.commProtocolVersion === 1">-->
                <!--<span class="title">充电次数</span>-->
                <!--<span class="fonts"><i>&#45;&#45;</i>次</span>-->
                <!--</div>-->
                <div class="l-info wth14">
                  <span class="title">电池类型</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0 && onData.matrixVersion === 0"><i>{{batteryTypeCode | batteryTypeCode}}</i></span>
                  <span class="fonts" v-else-if="onData.matrixVersion === 3"><i>{{batteryTypeCode === 1 ? '锂电池' : (batteryTypeCode === 2 ? '铅酸电池' : '--')}}</i></span>
                  <span class="fonts" v-else><i>{{onData.bms ? onData.bms.batterytypeCode : null | batteryTypeCode}}</i></span>
                </div>
                <div class="l-info wth14">
                  <span class="title">整车状态</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? onData.overview.carStatus : null | carStatus}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2"><i>{{onData.vms ? onData.vms.keyPosStatus : null | carStatusVms}}</i></span>
                </div>
                <div class="l-info wth14" style=" width:20%;">
                  <span class="title">制动状态</span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 0"><i>{{onData.overview ? onData.overview.driveBrakeStatus : null | driveBrakeStatus}}</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 1"><i>--</i></span>
                  <span class="fonts" v-if="onData.commProtocolVersion === 2"><i>{{onData.vms ? onData.vms.brakStatus : null | driveBrakeStatus}}</i></span>
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
                  <span class="title">其它故障码</span>
                  <span class="fonts"><i>--</i></span>
                </div>
              </div> -->
            </i-col>
            <i-col span="4" class="mt51">
              <div class="ready">
                <i class="iconfont icon-qiyong" v-if="(onData.commProtocolVersion === 0 && onData.overview && onData.overview.carStatus === 1) || ((onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2 )&& onData.vms && onData.vms.isReady === 1)"></i>
                <i class="iconfont icon-cuowu" v-if="(onData.commProtocolVersion === 0 && onData.overview && (onData.overview.carStatus === 2 || onData.overview.carStatus === 3 || onData.overview.carStatus === '异常' || onData.overview.carStatus === '无效')) || ((onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2)&& onData.vms && onData.vms.isReady === 0)"></i>
                <img src="/static/images/new/main/detail.png"/>
                <span v-if="onData.commProtocolVersion === 0">{{(onData.overview ? onData.overview.clutchStatus : '') | clutchStatus}}</span>
                <span v-if="onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2">{{onData.vms ? onData.vms.gearStatus : '' | gearStatus}}</span>
              </div>
            </i-col>
            <i-col span="6" >
              <i-col span="8" style="padding-left: 40px;padding-top: 15px;text-align: center;">
                <thermometer :degrees="onData.commProtocolVersion === 0 ? (onData.custom ? onData.custom.motorTemp : 0) : (onData.commProtocolVersion === 1 && onData.matrixVersion === 1 ? (onData.mc&&onData.mc.motorTemp ? onData.mc.motorTemp : 0) : (onData.vms && onData.vms.motorOwnTemp ? onData.vms.motorOwnTemp : 0))" :height="180" :width="8"></thermometer>
                <p style="position:absolute;left:5px;top:220px;width:80px;">电机温度</p>
              </i-col>
              <i-col span="8" style="padding-left: 40px;padding-top: 15px;text-align: center;">
                <thermometer :degrees="onData.custom ? onData.custom.temperatureAverage : 0" :height="180" :width="8"></thermometer>
                <p style="position:absolute;left:5px;top:220px;width:80px;">电池温度</p>
              </i-col>
              <i-col span="8" style="padding-left: 40px;padding-top: 15px;text-align: center;">
                <thermometer :degrees="onData.commProtocolVersion === 0 ? (onData.custom ? onData.custom.motorContTemp : 0) : (onData.mc ? onData.mc.mcTemp : 0)" :height="180" :width="8"></thermometer>
                <p style="position:absolute;left:5px;top:220px;width:100px;">电机控制器温度</p>
              </i-col>
            </i-col>
          </Row>
        </div>
      </div>
      <div >
        <div class="foot ">
          <row style="border-bottom:1px dashed #EDF1F8" v-show="onData.commProtocolVersion === 0 || ((onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2) && onData.bms && onData.bms.temps1)">
            <i-col span="11">
              <div style="height:30px;line-height:30px;margin:20px 0 0 10px;">
                <span style="color:black;font-size:16px;">探针信息 </span>
                <span style="color:#808080;" v-if="onData.commProtocolVersion === 0">探针{{onData.temperature ? onData.temperature.number : 0}}个</span>
                <!-- <span style="color:#808080;" v-else-if="onData.commProtocolVersion === 1&&onData.matrixVersion === 1">探针{{onData.bms ? onData.bms.batteryTempcount : 0}}个</span> -->
                <span style="color:#808080;" v-else>探针{{onData.bms&&onData.bms.batteryTempcount ? onData.bms.batteryTempcount : (onData.custom ? onData.custom.probeCount : 0)}}个</span>
              </div>
              <div style="height:400px;position:relative;">
                <span style="position: absolute;font-size: 35px;color: #ff3c15;left: 19%;top: 25%;" v-if="onData.commProtocolVersion === 0">{{onData.peak ? (onData.peak.highTemperature === '无效' || onData.peak.highTemperature === '异常') ?  '--' : onData.peak.highTemperature : 0}}°C</span>
                <span style="position: absolute;font-size: 35px;color: #ff3c15;left: 19%;top: 25%;" v-else-if="onData.commProtocolVersion === 1&&onData.matrixVersion === 1">{{onData.bms ? (onData.bms.tempHighest === '无效' || onData.bms.tempHighest === '异常') ?  '--' : onData.bms.tempHighest : 0}}°C</span>
                <span style="position: absolute;font-size: 35px;color: #ff3c15;left: 19%;top: 25%;" v-else>{{onData.custom ? onData.custom.HighTemp : 0}}°C</span>
                <img src="/static/images/1.png" class="hy_img"/>
                <span style="position: absolute;left: 20%;top: 39%;">最高温度</span>
                <span style="position: absolute;left: 21%;top: 43%;" v-if="onData.commProtocolVersion === 0">探针: {{onData.peak ? onData.peak.highProbeCode : '--'}}</span>
                <span style="position: absolute;left: 21%;top: 43%;" v-else-if="onData.commProtocolVersion === 1&&onData.matrixVersion === 1">探针: {{onData.bms ? onData.bms.highestTempNo : '--'}}</span>
                <span style="position: absolute;left: 21%;top: 43%;" v-else>探针: {{onData.custom ? onData.custom.probeHighestNo : '--'}}</span>
                <div class="hy_wendu">
                  <span v-if="onData.commProtocolVersion === 0">
                    {{((onData.peak ? onData.peak.highTemperature : 0) - (onData.peak ? onData.peak.lowTemperature : 0)) | dataNaN}}°C
                  </span>
                  <span v-else-if="onData.commProtocolVersion === 1&&onData.matrixVersion === 1">{{((onData.bms ? onData.bms.tempHighest : 0) - (onData.bms ? (onData.bms.tempLowest ? onData.bms.tempLowest : '--') : 0)) | dataNaN}}°C
                  </span>
                  <span v-else>{{((onData.custom ? onData.custom.HighTemp : 0) - (onData.custom ? onData.custom.lowTemp : 0)) | dataNaN}}°C
                  </span>
                  <hr/>
                  <span>温差</span>
                </div>
                <span class="" style="position: absolute;font-size: 35px;color: #356fff;left: 57%;top: 25%;" v-if="onData.commProtocolVersion === 0">{{onData.peak ? (onData.peak.lowTemperature === '无效' || onData.peak.lowTemperature === '异常') ? '--' : onData.peak.lowTemperature : 0}}°C</span>
                <span class="" style="position: absolute;font-size: 35px;color: #356fff;left: 57%;top: 25%;" v-else-if="onData.commProtocolVersion === 1&&onData.matrixVersion === 1">{{onData.bms ? (onData.bms.tempLowest === '无效' || onData.bms.tempLowest === '异常') ? '--' : (onData.bms.tempLowest ? onData.bms.tempLowest : '--') : 0}}°C</span>
                 <span style="position: absolute;font-size: 35px;color: #ff3c15;left: 19%;top: 25%;" v-else>{{onData.custom ? onData.custom.lowTemp : 0}}°C</span>
                <img src="/static/images/1-05.png" class="hy_img1"/>
                <span style="position: absolute;left: 58%;top: 39%;">最低温度</span>
                <span style="position: absolute;left: 59%;top: 43%;" v-if="onData.commProtocolVersion === 0">探针: {{onData.peak ? onData.peak.lowProbeCode : '--'}}</span>
                <span style="position: absolute;left: 59%;top: 43%;" v-else-if="onData.commProtocolVersion === 1&&onData.matrixVersion === 1">探针: {{onData.bms ? (onData.bms.templowestSubsyscode ? onData.bms.templowestSubsyscode : '--') : '--'}}</span>
                <span style="position: absolute;left: 21%;top: 43%;" v-else>探针: {{onData.custom ? onData.custom.probeLowestNo : '--'}}</span>
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
          <row v-show="onData.commProtocolVersion === 0 || ((onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2) && onData.bms && onData.bms.voltages1)">
            <i-col span="11">
              <div style="height:30px;line-height:30px;margin:20px 0 0 10px;">
                <span style="color:black;font-size:16px;">单体信息 </span>
                <span style="color:#808080;" v-if="onData.commProtocolVersion === 0">单体{{onData.battery ? onData.battery.batteryNumber : 0}}个</span>
                <!-- <span style="color:#808080;" v-else-if="onData.commProtocolVersion === 1 && onData.matrixVersion === 1">单体{{(onData.bms && onData.bms.voltageCount) ? onData.bms.voltageCount : 0}}个</span> -->
                <span style="color:#808080;" v-else>单体{{onData.bms && onData.bms.voltageCount ? onData.bms.voltageCount : (onData.custom ? onData.custom.voltageCount: 0)}}个</span>
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
                  <span v-if="onData.commProtocolVersion === 1 || onData.commProtocolVersion === 2">{{((onData.bms ? onData.bms.voltageHighest : 0) - (onData.bms ? onData.bms.voltageLowest : 0)).toFixed(3) | dataNaN}}V</span>
                  <hr/>
                  <span>压差</span>
                </div>
                </i-col>
                <i-col span="11">
                  <div id="vol" style="" class="lowerVol"></div>
                  <div class="lowVolSize">
                    <p style="" >最低电压</p>
                    <p style="" >电池: {{onData.commProtocolVersion === 0 ? (onData.peak ? onData.peak.lowBatteryCode : '--') : (onData.bms ? onData.bms.lowestVoltageNo  : '--')}}</p>
                  </div>
                </i-col>
              </div>
            </i-col>
            <i-col span="1">
            </i-col>
            <i-col span="12">
              <div id="monomer_cross" class="col_ceoss"></div>
            </i-col>
          </row>
        </div>
        <Tabs v-model="tabsName" :style="tabsHeight" @on-click="changeHeight">
          <Tab-pane label="国标视图" name="national">
            <h3>整车数据
              <div class="openDetail" @click="showData()"><Icon type="chevron-down" v-if="!isShow"></Icon><Icon type="chevron-up" v-if="isShow"></Icon></div>
            </h3>
            <hy-detail1 :form="formDataD31" :rowData="modalFormItemD31" v-if="isShow" :labelWidth="250"></hy-detail1>
            <div :class="{'bottomLine': !isShow, 'hideData': isShow}"></div>
            <h3>驱动电机数据
              <div class="openDetail" @click="motor()"><Icon type="chevron-down" v-if="!showMotor"></Icon><Icon type="chevron-up" v-if="showMotor"></Icon></div>
            </h3>
            <hy-detail1 :form="formDataD32" :rowData="modalFormItemD32" v-if="showMotor" :labelWidth="250"></hy-detail1>
            <div :class="{'bottomLine': !showMotor, 'hideData': showMotor}"></div>
            <h3 v-if="onData.commProtocolVersion === 0">电池数据
              <div class="openDetail" @click="battery()"><Icon type="chevron-down" v-if="!showBattery && onData.commProtocolVersion === 0"></Icon><Icon type="chevron-up" v-if="showBattery"></Icon></div>
            </h3>
            <hy-detail1 :form="formDataD35" :rowData="modalFormItemD35" v-if="showBattery && onData.commProtocolVersion === 0" :labelWidth="250"></hy-detail1>
            <div :class="{'bottomLine': !showBattery, 'hideData': showBattery}"></div>
            <h3>车辆位置数据
              <div class="openDetail" @click="position()"><Icon type="chevron-down" v-if="!showPosition"></Icon><Icon type="chevron-up" v-if="showPosition"></Icon></div>
            </h3>
            <hy-detail1 :form="formDataD33" :rowData="modalFormItemD33" v-if="showPosition" :labelWidth="250"></hy-detail1>
            <div :class="{'bottomLine': !showPosition, 'hideData': showPosition}"></div>
            <h3>极值数据
              <div class="openDetail" @click="max()"><Icon type="chevron-down" v-if="!maxData"></Icon><Icon type="chevron-up" v-if="maxData"></Icon></div>
            </h3>
            <hy-detail1 :form="formDataD34" :rowData="modalFormItemD34" v-if="maxData" :labelWidth="250"></hy-detail1>
            <div :class="{'bottomLine': !maxData, 'hideData': maxData}"></div>
          </Tab-pane>
        </Tabs>
      </div>
      <!--历史CAN-->
      <Modal v-model="historicalCanShow" :mask-closable="false" width="1000" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>历史CAN</span>
        </p>
        <div style="text-align:left">
          <historical-can ref="historicalCan" v-show="historicalCanShow"></historical-can>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="historicalCanShow = false">关闭</Button>
        </div>
      </Modal>
      <!--历史轨迹-->
      <Modal v-model="historicalTrackShow" :mask-closable="false" width="1200" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>历史轨迹</span>
        </p>
        <div style="text-align:left">
          <historical-track ref="historicalTrack" v-show="historicalTrackShow"></historical-track>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="historicalTrackShow = false">关闭</Button>
        </div>
      </Modal>
      <!--报警信息-->
      <Modal v-model="realAlarmShow" :mask-closable="false" width="1200" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>报警信息</span>
        </p>
        <div style="text-align:left">
          <real-alarm ref="realAlarm" v-show="realAlarmShow"></real-alarm>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="realAlarmShow = false">关闭</Button>
        </div>
      </Modal>
      <!--车辆档案-->
      <Modal v-model="vehicleFileShow" :mask-closable="false" width='90%' :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>车辆档案</span>
        </p>
        <div style="text-align:left">
          <vehicle-file ref="vehicleFile" ></vehicle-file>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="vehicleFileShow = false">关闭</Button>
        </div>
      </Modal>
      <!--CAN详情-->
      <Modal v-model="canDetailShow" :mask-closable="false" width="980" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>实时数据详情</span>
        </p>
        <div style="text-align:left">
          <can-detail1 ref="canDetail" v-show="canDetailShow"></can-detail1>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="canDetailShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import AMap from 'AMap';
  import AMapUI from 'AMapUI';
  import echarts from 'echarts';
  import HyDetail1 from '@/components/common/detail/detail1.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import historicalCan from '@/components/monitorModal/historicalCan.vue';
  import historicalTrack from '@/components/monitorModal/historicalTrack.vue';
  import realAlarm from '@/components/monitorModal/realAlarm.vue';
  import vehicleFile from '@/components/monitorModal/vehicleFile.vue';
  import canDetail1 from '@/components/monitorModal/canDetail1.vue';
  import thermometer from '@/components/thermometer/thermometer';
  import { vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  import { vehicleMonitor } from '@/service/monitor/realMonitor';
  import { amapGregeoOne } from '@/service/serviceStationService/serviceStation';
  export default {
    components: {
      thermometer,
      HyDetail1,
      historicalCan,
      historicalTrack,
      realAlarm,
      vehicleFile,
      canDetail1
    },
    mixins: [storeVin],
    data () {
      return {
        historicalCanShow: false,
        historicalTrackShow: false,
        realAlarmShow: false,
        vehicleFileShow: false,
        canDetailShow: false,
        vinShow: false,  // 筛选显示/隐藏
        warnTip: 'warn',
        tabsHeight: {
          height: null
        },
        // tabsName: 'real',
        tabsName: 'national',
        formDataD31: {},
        formDataD32: {},
        formDataD33: {},
        formDataD34: {},
        formDataD35: {},
        modalFormItemD31: [
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
        modalFormItemD32: [
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
        modalFormItemD33: [
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'positionMode', title: '定位状态', array: [{value: 0, label: '无效定位'}, {value: 6, label: '有效定位'}]},
          {key: 'longitude', title: '经度'},
          {key: 'latitude', title: '纬度'}
        ],
        modalFormItemD34: [
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
        ],
        modalFormItemD35: [
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'totalVoltage', title: '电池电压(V)'},
          {key: 'totalCurrent', title: '电池电流(A)'},
          {key: 'number', title: '电池温度探针总数'},
          {key: 'temperatures', title: '探针温度值(℃)'},
          {key: 'batterySysNumber', title: '动力蓄电池子系统个数'},
          {key: 'batterySysIndex', title: '电池子系统号'},
          {key: 'batteryVoltages', title: '单体蓄电池电压值'},
          {key: 'batteryNumber', title: '单体蓄电池总数'},
          {key: 'batteryStartIndex', title: '本帧起始电池序号'},
          {key: 'batteryPacketNumber', title: '本帧单体电池总数'}
        ],
        loading: false,
        map: null,
        // bottom: 'bottomLine',
        // full: 'hideData',
        isShow: false,
        showMotor: false,
        showBattery: false,
        showPosition: false,
        maxData: false,
        soc_gauge: {echart: null, option: null},                 // SOC
        speed_gauge: {echart: null, option: null},              // 车速
        motor_gauge: {echart: null, option: null},             // 电机转速
        voltage_gauge: {echart: null, option: null},          // 总电压
        current_gauge: {echart: null, option: null},         // 总电流
        probe_cross: {echart: null, option: null},         // 探针信息
        monomer_cross: {echart: null, option: null},         // 单体信息
        voltage: {echart: null, option: null},         // 单体电压
        vol: {echart: null, option: null},         // 单体电压
        webSocket: null,
        vinCode: this.$route.query.vin,
        onData: {
          commProtocolVersion: 0,       // 0: 三期, 1: 二期, 2: 一期
          matrixVersion: 0,       // 0 : D3, 1 : D2_100, 80 : D2_80, 2:模拟双80, 3:d5
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
//          obc: {
//            chargeStatus: null
//          },
          bms: {
            collectTime1: null,
            receiveTime1: null,
            temps1: '',
            temps2: '',
            batteryTypeCode: undefined,
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
            readyLampStatus: null
          },
          icu: {
            totalMile: ''  // d2 总里程
          },
          // 自定义值
          custom: {
            probeCount: 0,  // 探针总个数
            HighTemp: 0,  // 最高温度
            lowTemp: 0,   // 最低温度
            probeHighestNo: 0,   // 最高温度探针编号
            probeLowestNo: 0,    // 最低温度探针编号
            voltageCount: 0,     // 单体总个数
            voltageHighest: 0,   // 最高电压个数
            voltageLowest: 0,    // 最低电压个数
            motorTemp: 0,    // 电机平均温度
            motorContTemp: 0,    // 电机控制器平均温度
            temperatureAverage: 0    // 电池平均温度
          },
          noCreated: true    // 是否接收了webSocket数据
        },   // onMessage 获取的数据
        drivingLine: [{name: '', path: []}],   // 行驶的线路
        vehicleData: {},
        pathSimplifierIns: null,
        direction: 0,
        mileage: 0,
        todayInfo: {
          mileage: 0,
          chargePower: 0,
          userCarMinites: 0,
          powerConsumption: 0,
          alarmCount: 0
        },
        vehicleInfo: {     // 车辆信息的位置，采集时间
          mileage: '',
          address: '',
          collectTime1: '',
          speed: ''
        },
        batteryTypeCode: undefined,
        positionData: {},
        zoomData: {   // 柱状图dataZoom
          zoomStart1: 0,
          zoomEnd1: 100,
          zoomStart2: 0,
          zoomEnd2: 100
        },
        markerCar: null,   // 车辆标记
        currentLocation: {      // 当前位置
          lon: 103.916776,
          lat: 36.950676
        },
        jumpUrl: null, // 跳转方法
        socketNum: 0,  // websocket推送次数
        mapCar: 'hide',
        close: 'hide',
        open: 'showOpen',
        vehicleList: [],
        loadingV: false,
        columnsVehicle: [
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: '车牌号',
            key: 'plateNo'
          },
          {
            title: 'GPRS号',
            key: 'gprsNo'
          },
          {
            title: '所属地区',
            key: 'gprsNo'
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'latestVehicleSocketUrl'
      ])
    },
    mounted () {
      this._initMap();
      this.getList();
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 初始化
      defaultShow () {
        this.formDataD31 = {};
        this.formDataD32 = {};
        this.formDataD33 = {};
        this.formDataD34 = {};
        this.formDataD35 = {};
        this.isShow = false;
        this.showMotor = false;
        this.showBattery = false;
        this.showPosition = false;
        this.maxData = false;
        this.batteryTypeCode = undefined;
      },
      // 清理数据
      clearData () {
        this.vehicleInfo = {     // 车辆信息的位置，采集时间
          mileage: '',
          address: '',
          collectTime1: '',
          speed: ''
        };
        this.soc_gauge = {echart: null, option: null};                 // SOC
        this.speed_gauge = {echart: null, option: null};              // 车速
        this.motor_gauge = {echart: null, option: null};             // 电机转速
        this.voltage_gauge = {echart: null, option: null};          // 总电压
        this.current_gauge = {echart: null, option: null};         // 总电流
        this.probe_cross = {echart: null, option: null};         // 探针信息
        this.monomer_cross = {echart: null, option: null};         // 单体信息
        this.voltage = {echart: null, option: null};         // 单体电压
        this.vol = {echart: null, option: null};         // 单体电压
        this.onData = {
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
            batteryTypeCode: undefined,
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
            readyLampStatus: null
          },
          icu: {
            totalMile: ''  // d2 总里程
          },
          // 自定义值
          custom: {
            probeCount: 0,  // 探针总个数
            HighTemp: 0,  // 最高温度
            lowTemp: 0,   // 最低温度
            probeHighestNo: 0,   // 最高温度探针编号
            probeLowestNo: 0,    // 最低温度探针编号
            voltageCount: 0,     // 单体总个数
            voltageHighest: 0,   // 最高电压个数
            voltageLowest: 0,    // 最低电压个数
            motorTemp: 0,    // 电机平均温度
            motorContTemp: 0,    // 电机控制器平均温度
            temperatureAverage: 0    // 电池平均温度
          },
          noCreated: true    // 是否接收了webSocket数据
        };   // onMessage 获取的数据
        this.onData.custom = {
          probeCount: 0,
          HighTemp: 0,  // 最高温度
          lowTemp: 0,   // 最低温度
          probeHighestNo: 0,   // 最高温度探针编号
          probeLowestNo: 0,    // 最低温度探针编号
          voltageCount: 0,     // 单体总个数
          voltageHighest: 0,
          voltageLowest: 0,
          motorTemp: 0,
          motorContTemp: 0,
          temperatureAverage: 0
        };
        this.getList();
        // 清理
        this.map.clearMap();
        if (this.markerCar) {
          this.map.remove(this.markerCar);
          this.pathSimplifierIns.setData();
        }
      },
      // 今日信息
      getVehicleMonitor () {
        if (!this.vinCode) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        vehicleMonitor({vinCode: this.vinCode}, res => {
          this.todayInfo = res;
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车辆信息失败',
            desc: ret
          });
        });
      },
      // 列表 车辆
      getVehicle () {
        return new Promise((resolve, reject) => {
          try {
            vehicleListAll({vinCode: this.vinCode}, res => {
              if (res.length > 0) {
                this.getVehicleMonitor();
                resolve(res[0]);
              } else {
                this.loading = false;
                this.$Notice.warning({
                  title: '无车辆操作权限'
                });
              }
            }, ret => {
              this.loading = false;
              this.$Notice.error({
                title: '查询车辆信息失败',
                desc: ret
              });
              reject({});
            });
          } catch (e) {
            reject({});
          }
        });
      },
      async _created () {
        if (!this.vinCode) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        this.drivingLine = [{name: '', path: []}];   // 初始化 行驶的线路
        this.loading = true;
        this.vehicleData = await this.getVehicle();
        // await this.getVehicleMonitor();
        await this.defaultShow();
        // this.tabsName = 'real';
        // this.$set(this, 'tabsName', 'real');
        this.$set(this, 'tabsName', 'national');
        this.tabsHeight.height = null;
        this.vehicleInfo = {     // 车辆信息的位置，采集时间
          mileage: '',
          address: '',
          collectTime1: '',
          speed: ''
        };
        this.socketNum = 0;  //
        this.zoomData = {   // 柱状图dataZoom
          zoomStart1: 0,
          zoomEnd1: 100,
          zoomStart2: 0,
          zoomEnd2: 100
        };
        // webSocket连接
        if (this.webSocket) {
          this.webSocket.close();
        }
        if ('WebSocket' in window) {
          let loginInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
          this.webSocket = new WebSocket(`${this.latestVehicleSocketUrl}${this.vinCode}&userId=${loginInfo.id}&timestamp=${new Date().getTime()}`);
        } else {
          alert('Not support websocket');
        }
        this.webSocket.onerror = event => {
          this.onError(event);
        };
        this.webSocket.onopen = event => {
          this.onOpen(event);
        };
        this.webSocket.onmessage = event => {
          this.onMessage(event);
        };
        this.storeVin(this.vinCode); // 存储搜索的vin
      },
      start () {
        this.webSocket.send('hello');
        return false;
      },
      async onMessage (event) {
        let obj = JSON.parse(event.data);
        let _this = this;
        this.socketNum = this.socketNum + 1;
        this.loading = false;
        // 三期
        // if (obj.commProtocolVersion === 0 && !(obj.overview && obj.position)) {
        //   // 清理数据
        //   return;
        // }
        // 车辆定位信息
        // 三期 d3
        if (obj.commProtocolVersion === 0 && obj.matrixVersion === 0) {
          this.$set(this, 'onData', obj);
          if (this.onData.position) {
            let objAddress = await this.getAddress(this.onData.position); // 获取详细地址
            this.vehicleInfo.collectTime1 = objAddress.collectTime1;
            this.vehicleInfo.address = objAddress.address;
          }
          if (this.onData.bms) {
            // bms 两分钟发一次
            this.batteryTypeCode = this.onData.bms.batteryTypeCode;
          }
        } else {   // d2 d2s
        if (this.socketNum === 1) {
            this.$set(this, 'onData', obj);
          } else {
            for (let key in this.onData) {
               for (let item in obj) {
                 if (key === item) {
                   this.onData[key] = obj[item];
                 }
               }
            }
          }
          // d5电池
          if (obj.matrixVersion === 3) {
            this.batteryTypeCode = this.onData.vehicle ? this.onData.vehicle.batteryType : 0;
          }
          if (obj.commProtocolVersion === 0) {
              this.getSpeed(this.onData.overview, 0);  // 获取速度
              this.getMileage(this.onData.overview, 0); // 获取总里程
          } else if (obj.commProtocolVersion === 1) {
            this.getSpeed(this.onData.vms, 1); // 获取速度
            this.getMileage(this.onData.icu, 1); // 获取总里程
          } else {
            this.getSpeed(this.onData.vms, 1); // 获取速度
            this.getMileage(this.onData.position, 2); // 获取总里程
          }
          if (obj.bcm && obj.position) {   // 第一次获取
            // this.$set(this, 'onData', obj);
            this.$set(this, 'direction', Number(obj.position.direction));
            // this.$set(this, 'positionData', obj.position);
            let objAddress = await this.getAddress(this.onData.position); // 获取详细地址
            this.vehicleInfo.collectTime1 = objAddress.collectTime1;
            this.vehicleInfo.address = objAddress.address;
          } else if (obj.bcm && !obj.position) {  // 只推送的can
            // this.$set(this, 'onData', obj);
            this.onData.position = {
              mileage: 0,
              direction: 0
            };
            // if (this.positionData) {
            //   this.$set(this.onData, 'position', this.positionData);
            //   // this.onData.position = this.positionData;
            // }
          } else if (!obj.bcm && obj.position) {   // 只推送地理位置
            // this.$set(this.onData, 'position', obj.position);
            // this.$set(this.onData, 'status', obj.status);
            // this.$set(this.onData, 'commProtocolVersion', obj.commProtocolVersion);
            // this.$set(this.onData, 'matrixVersion', obj.matrixVersion);
            // this.$set(this, 'positionData', obj.position);
            let objAddress = await this.getAddress(this.onData.position); // 获取详细地址
            this.vehicleInfo.collectTime1 = objAddress.collectTime1;
            this.vehicleInfo.address = objAddress.address;
          }
        }
        // 初始化
        this.onData.custom = {
          probeCount: 0,  // 探针总个数
          HighTemp: 0,  // 最高温度
          lowTemp: 0,   // 最低温度
          probeHighestNo: 0,   // 最高温度探针编号
          probeLowestNo: 0,    // 最低温度探针编号
          voltageCount: 0,     // 单体总个数
          voltageHighest: 0,
          voltageLowest: 0,
          motorTemp: 0,
          motorContTemp: 0,
          temperatureAverage: 0
        };
        if (this.onData.status.indexOf('tbox:connections:online') > -1 ||
          this.onData.status.indexOf('tbox:connections:driving') > -1 ||
          this.onData.status.indexOf('tbox:connections:charging') > -1 || this.socketNum === 1) {
          this.map.clearMap();
          if (this.markerCar) {
            this.map.remove(this.markerCar);
            this.pathSimplifierIns.setData();
          }
        }
        // 地图 ------start-------------------------------
        if (this.onData.position) {
          // this.map.clearMap();
          let img = null;
          if (this.onData.status.indexOf('tbox:connections:online') > -1) img = '../../static/images/online.png';  // 在线状态
          else if (this.onData.status.indexOf('tbox:connections:driving') > -1) img = '../../static/images/driving.png'; // 行驶状态
          else if (this.onData.status.indexOf('tbox:connections:charging') > -1) img = '../../static/images/charing2.png'; // 充电状态
          else if (this.onData.status.indexOf('tbox:connections:offline') > -1) img = '../../static/images/offline.png';  // 离线状态
          else if (this.onData.status.indexOf('tbox:connections:exception') > -1) img = '../../static/images/error.png';  // 异常
          // 非行驶状态和非第一次获取数据
          if (this.onData.status.indexOf('tbox:connections:offline') > -1 && this.socketNum > 1) {
          } else if (this.onData.status.indexOf('tbox:connections:exception') > -1 && this.socketNum > 1) {
          } else {
            let lng = {lon: null, lat: null};
            let type = false;
            if (obj.position && obj.position.latitude && obj.position.longitude) {
              if (obj.position.longitude >= 0.0 && obj.position.longitude < 180.0 && obj.position.latitude >= 0.0 && obj.position.latitude < 90.0) {
                lng.lon = obj.position.longitude;
                lng.lat = obj.position.latitude;
                type = false;
              }
            } else {
              let pos = this.drivingLine[0].path[this.drivingLine[0].path.length - 1];
              if (pos) {
                lng.lon = pos[0];
                lng.lat = pos[1];
              }
              type = true;
            }
            let ln = {lon: null, lat: null};
            if (!type) ln = this._hyTool.converAmap(lng.lat, lng.lon);
            else ln = lng;
            let direction = 0;
            if (this.onData.position.direction) direction = this.onData.position.direction;
            if (ln.lon !== null && ln.lat !== null) {
              this.currentLocation.lon = ln.lon;
              this.currentLocation.lat = ln.lat;
              this.markerCar = new AMap.Marker({
                position: [ln.lon, ln.lat],
                icon: new AMap.Icon({
                  size: new AMap.Size(43, 20),  // 图标大小
                  image: img
                }),
                offset: new AMap.Pixel(-22, -10),
                angle: 90 + Number(direction)
              });
              this.markerCar.setMap(this.map);
              this.drivingLine[0].name = this.vehicleData.vinCode;
              if (!type) this.drivingLine[0].path.push([ln.lon, ln.lat]);
              this.pathSimplifierIns.setData();
              this.pathSimplifierIns.setData(this.drivingLine);
              this.pathSimplifierIns.setSelectedPathIndex(0);

              // 弹框
              this.jumpUrl = (flag) => {
                if (!this.vinCode) {
                  this.warnTip = 'warncolor';
                  return;
                } else {
                  this.warnTip = 'warn';
                }
                switch (flag) {
                  case 1:
                    this.historicalTrackShow = true;
                    this.$refs.historicalTrack.$emit('bridge', this.vehicleData.vinCode);
                    break;
                  case 2:
                    this.canDetailShow = true;
                    this.$refs.canDetail.$emit('bridge', this.vehicleData.vinCode);
                    break;
                  case 3:
                    this.historicalCanShow = true;
                    this.$refs.historicalCan.$emit('bridge', this.vehicleData.vinCode);
                    break;
                  case 4:
                    this.realAlarmShow = true;
                    this.$refs.realAlarm.$emit('bridge', this.vehicleData.vinCode);
                    break;
                  case 5:
                    this.$refs.vehicleFile.$emit('bridge', this.vehicleData.vinCode);
                    setTimeout(() => {
                      this.vehicleFileShow = true;
                    }, 300);
                    break;
                }
              };
              // 信息框
              AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
                let colorStr = '';
                if (_this.vehicleData.carColor) {
                  colorStr = ' [' + _this.vehicleData.carColor + ']';
                }
                let infoWindow = new SimpleInfoWindow({
                  infoTitle: `<strong>${_this.vehicleData.vinCode + colorStr}</strong>`,
                  infoBody: `<p class="my-desc">
                              <ul>
                                <li><label>采集时间：</label><span>${_this.vehicleInfo.collectTime1 ? _this.vehicleInfo.collectTime1 : '--'}</span></li>
                                <li><label>车牌：</label><span>${_this.vehicleData.plateNo ? _this.vehicleData.plateNo : '--'}</span></li>
                                <!--<li><label>车主：</label><span>${_this.vehicleData.vinCode}</span></li>-->
                                <li><label>车速：</label><span>${isNaN(_this.vehicleInfo.speed) ? _this.vehicleInfo.speed : (_this.vehicleInfo.speed === '' ? '--' : (_this.vehicleInfo.speed + ' km/h'))}</span></li>
                                <li><label>总里程：</label><span>${isNaN(_this.vehicleInfo.mileage) ? _this.vehicleInfo.mileage : (_this.vehicleInfo.mileage === '' ? '--' : (_this.vehicleInfo.mileage + 'km'))}</span></li>
                                <!--<li><label>方向：</label><span>${_this.vehicleData.direction | direction}</span></li>-->
                                <li><label>位置：</label><span>${_this.vehicleInfo.address ? _this.vehicleInfo.address : '--'}</span></li>
                                <div style="height: 45px;padding: 5px;">
                                  <li style="float: left;width: 33%;text-align: center"><a href="#" class="url1">历史轨迹</a></li>
                                  <li style="float: left;width: 33%;text-align: center"><a href="#" class="url2">实时数据详情</a></li>
                                  <li style="float: left;width: 33%;text-align: center"><a href="#" class="url3">历史CAN图表</a></li>
                                  <li style="float: left;width: 33%;text-align: center"><a href="#" class="url4">实时报警</a></li>
                                  <li style="float: left;width: 33%;text-align: center"><a href="#" class="url5">车辆档案</a></li>
                                </div>
                              </ul>
                              </p>`,
                  // 基点指向marker的头部位置
                  offset: new AMap.Pixel(0, -37)
                });
                // 历史轨迹
                infoWindow.get$InfoBody().on('click', '.url1', (event) => {
                  event.stopPropagation();   // 阻止冒泡
                  this.jumpUrl(1);
                });
                // 实时数据详情
                infoWindow.get$InfoBody().on('click', '.url2', (event) => {
                  event.stopPropagation();  // 阻止冒泡
                  this.jumpUrl(2);
                });
                // 历史CAN图表
                infoWindow.get$InfoBody().on('click', '.url3', (event) => {
                  event.stopPropagation();  // 阻止冒泡
                  this.jumpUrl(3);
                });
                // 实时报警
                infoWindow.get$InfoBody().on('click', '.url4', (event) => {
                  event.stopPropagation();    // 阻止冒泡
                  this.jumpUrl(4);
                });
                // 车辆档案
                infoWindow.get$InfoBody().on('click', '.url5', (event) => {
                  event.stopPropagation();   // 阻止冒泡
                  this.jumpUrl(5);
                });
                function openInfoWin () {
                  infoWindow.open(_this.map, _this.markerCar.getPosition());
                }
                // marker 点击时打开
                AMap.event.addListener(_this.markerCar, 'click', () => {
                  openInfoWin();
                });
              });
            }
          }
        }

        // 地图 ------end-------------------------------
        // 三期 必须包含  overview position
        // if (this.onData.commProtocolVersion === 0 && !(this.onData.overview && this.onData.position)) {
        //   // 清理数据
        //   this.clearData();
        //   return;
        // }
        // // 二期 必须包含 bms
        // if (this.onData.commProtocolVersion === 1 && !this.onData.bms) {
        //   // 清理数据
        //   this.clearData();
        //   return;
        // }
        // ------默认展开数据-------------------------------------
        // 国标
        this.showData(1);
        this.motor(1);
        this.battery(1);
        this.position(1);
        this.max(1);

        if (this.onData.commProtocolVersion === 0) {
          // 国标数据 -----------------
          // 整车数据
          if (this.onData.overview) {
            this.isShow = false;
            for (let i in this.onData.overview) {
              this.onData.overview[i] = this.onData.overview[i] === -1 ? '异常' : (this.onData.overview[i] === -2 ? '无效' : this.onData.overview[i]);
              this.onData.overview[i] = this.onData.overview[i] === -8000 ? '异常' : (this.onData.overview[i] === -9000 ? '无效' : this.onData.overview[i]);
            }
            this.onData.overview.collectTime1 = this.onData.overview.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.overview.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.overview.receiveTime1 = this.onData.overview.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.overview.receiveTime), 'yyyy-MM-dd hh:mm:ss');
            this.$set(this, 'formDataD31', this.onData.overview);
            setTimeout(() => {
              this.isShow = true;
            }, 100);
          }
          // 驱动电机数据
          if (this.onData.motor && this.onData.motor[0]) {
            this.showMotor = false;
            for (let i in this.onData.motor[0]) {
              this.onData.motor[0][i] = this.onData.motor[0][i] === -1 ? '异常' : (this.onData.motor[0][i] === -2 ? '无效' : this.onData.motor[0][i]);
              this.onData.motor[0][i] = this.onData.motor[0][i] === -8000 ? '异常' : (this.onData.motor[0][i] === -9000 ? '无效' : this.onData.motor[0][i]);
            }
            this.onData.motor[0].collectTime1 = this.onData.motor[0].collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.motor[0].collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.motor[0].receiveTime1 = this.onData.motor[0].receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.motor[0].receiveTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.motor[0].motorTotal = this.onData.motor[0].motorTotal ? this.onData.motor[0].motorTotal : 1;
          } else {
            // 电机个数默认为1，和实时数据页面保持一致
            this.onData.motor.push({motorTotal: 1});
          }
          this.$set(this, 'formDataD32', this.onData.motor[0]);
          setTimeout(() => {
            this.showMotor = true;
          }, 100);
          // 电池数据
          if (this.onData.battery && this.onData.temperature) {
            this.showBattery = false;
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
            obj.receiveTime1 = this.onData.battery.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.battery.receiveTime), 'yyyy-MM-dd hh:mm:ss');
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
            this.$set(this, 'formDataD35', obj);
            setTimeout(() => {
              this.showBattery = true;
            }, 100);
          }
          // 车辆位置数据
          if (this.onData.position) {
            this.showPosition = false;
            for (let i in this.onData.position) {
              this.onData.position[i] = this.onData.position[i] === -1 ? '异常' : (this.onData.position[i] === -2 ? '无效' : this.onData.position[i]);
              this.onData.position[i] = this.onData.position[i] === -8000 ? '异常' : (this.onData.position[i] === -9000 ? '无效' : this.onData.position[i]);
            }
            this.onData.position.collectTime1 = this.onData.position.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.position.receiveTime1 = this.onData.position.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.receiveTime), 'yyyy-MM-dd hh:mm:ss');
            this.$set(this, 'formDataD33', this.onData.position);
            setTimeout(() => {
              this.showPosition = true;
            }, 100);
          }
          // 极值数据
          if (this.onData.peak) {
            this.maxData = false;
            for (let i in this.onData.peak) {
              this.onData.peak[i] = this.onData.peak[i] === -1 ? '异常' : (this.onData.peak[i] === -2 ? '无效' : this.onData.peak[i]);
              this.onData.peak[i] = this.onData.peak[i] === -8000 ? '异常' : (this.onData.peak[i] === -9000 ? '无效' : this.onData.peak[i]);
            }
            this.onData.peak.collectTime1 = this.onData.peak.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.peak.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.peak.receiveTime1 = this.onData.peak.receiveTime === null ? '' : this._hyTool.DateFormat(new Date(+this.onData.peak.receiveTime), 'yyyy-MM-dd hh:mm:ss');
            this.$set(this, 'formDataD34', this.onData.peak);
            setTimeout(() => {
              this.maxData = true;
            }, 100);
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
          /* if (this.onData.peak) {
             if (!this.onData.peak.highVoltage) this.onData.peak.highVoltage = 0;
             if (!this.onData.peak.lowVoltage) this.onData.peak.lowVoltage = 0;
          } */
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
          this.modalFormItemD31 = [
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
          ];
          this.modalFormItemD32 = [
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
          ];
          this.modalFormItemD34 = [
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
          ];
        }
        if (this.onData.commProtocolVersion === 1 || this.onData.commProtocolVersion === 2) {
          // 国标数据 -----------------
          // 车辆位置数据
          if (this.onData.position) {
            this.showPosition = false;
            for (let i in this.onData.position) {
              this.onData.position[i] = this.onData.position[i] === -1 ? '异常' : (this.onData.position[i] === -2 ? '无效' : this.onData.position[i]);
              this.onData.position[i] = this.onData.position[i] === -8000 ? '异常' : (this.onData.position[i] === -9000 ? '无效' : this.onData.position[i]);
            }
            this.onData.position.collectTime1 = (this.onData.position.collectTime === null || this.onData.position.collectTime === undefined) ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.position.receiveTime1 = (this.onData.position.receiveTime === null || this.onData.position.receiveTime === undefined) ? '' : this._hyTool.DateFormat(new Date(+this.onData.position.receiveTime), 'yyyy-MM-dd hh:mm:ss');
            this.$set(this, 'formDataD33', this.onData.position);
          }
          setTimeout(() => {
            this.showPosition = true;
          }, 100);
          // 电池温度 D2
          let dataArr1 = this.onData.bms ? this.onData.bms.temps1 ? this.onData.bms.temps1.split(',') : [] : [];
          let dataArr2 = this.onData.bms ? this.onData.bms.temps2 ? this.onData.bms.temps2.split(',') : [] : [];
          let tempDataArr = dataArr1.concat(dataArr2);
          let dataArr = [];
          let temperaturesSum = 0;
          let probeCount = 0;
          for (let i = 0; i < tempDataArr.length; i++) {
            if (tempDataArr[i] !== '-40') {
              dataArr.push(tempDataArr[i]);
              probeCount++;
              temperaturesSum += Number(tempDataArr[i]);
            }
          }
          // 单体总个数
          let voltagesArr = [];
          if (this.onData.bms && this.onData.bms.voltages1) {
            for (let i = 1; i < 13; i++) {
              let name = `voltages${i}`;
              if (this.onData.bms[name]) voltagesArr = voltagesArr.concat(this.onData.bms[name].split(','));
            }
          }
          this.onData.custom = {
            temperatureAverage: isNaN(temperaturesSum / dataArr.length) ? 0 : temperaturesSum / dataArr.length,
            probeCount: probeCount,
            HighTemp: Math.max(...dataArr),  // 最高温度
            lowTemp: Math.min(...dataArr),
            probeHighestNo: dataArr.indexOf(Math.max(...dataArr)) + 1,   // 最高温度探针编号
            probeLowestNo: dataArr.indexOf(Math.min(...dataArr)) + 1,    // 最低温度探针编号
            voltageCount: voltagesArr.length     // 单体总个数
          };
          let sources = {
            bms: {
              ownMode: '1',
              ownLowTem: '1',
              ownTem: '1',
              ownLowVol: '1',
              ownVol: '1'
            },
            vms: {},
            position: {}
          };
           if (this.onData.bms) {
            for (let i in this.onData.bms) {
              this.onData.bms[i] = this.onData.bms[i] === -1 ? '异常' : (this.onData.bms[i] === -2 ? '无效' : this.onData.bms[i]);
              this.onData.bms[i] = this.onData.bms[i] === -8000 ? '异常' : (this.onData.bms[i] === -9000 ? '无效' : this.onData.bms[i]);
            }
            this.$set(this, 'formDataD34', this.onData.bms);
            sources.bms = this.onData.bms;
          }
          if (this.onData.vms) {
            for (let i in this.onData.vms) {
              this.onData.vms[i] = this.onData.vms[i] === -1 ? '异常' : (this.onData.vms[i] === -2 ? '无效' : this.onData.vms[i]);
              this.onData.vms[i] = this.onData.vms[i] === -8000 ? '异常' : (this.onData.vms[i] === -9000 ? '无效' : this.onData.vms[i]);
            }
            this.onData.vms.collectTime1 = (this.onData.vms.collectTime === null || this.onData.vms.collectTime === undefined) ? '' : this._hyTool.DateFormat(new Date(+this.onData.vms.collectTime), 'yyyy-MM-dd hh:mm:ss');
            this.onData.vms.receiveTime1 = (this.onData.vms.receiveTime === null || this.onData.vms.receiveTime === undefined) ? '' : this._hyTool.DateFormat(new Date(+this.onData.vms.receiveTime), 'yyyy-MM-dd hh:mm:ss');
            sources.vms = this.onData.vms;
          }
          if (this.onData.position) {
            for (let i in this.onData.position) {
              this.onData.position[i] = this.onData.position[i] === -1 ? '异常' : (this.onData.position[i] === -2 ? '无效' : this.onData.position[i]);
              this.onData.position[i] = this.onData.position[i] === -8000 ? '异常' : (this.onData.position[i] === -9000 ? '无效' : this.onData.position[i]);
            }
            sources.position = this.onData.position;
          }
          let overviewMerge = Object.assign({}, sources.position, sources.bms, sources.vms);
          this.$set(this, 'formDataD31', overviewMerge);
          if (this.onData.mc) {
            for (let i in this.onData.mc) {
              this.onData.mc[i] = this.onData.mc[i] === -1 ? '异常' : (this.onData.mc[i] === -2 ? '无效' : this.onData.mc[i]);
              this.onData.mc[i] = this.onData.mc[i] === -8000 ? '异常' : (this.onData.mc[i] === -9000 ? '无效' : this.onData.mc[i]);
            }
            this.onData.mc.ownMotor = '1';
            this.onData.mc.ownNum = '1';
            this.$set(this, 'formDataD32', this.onData.mc);
          }
          this.modalFormItemD31 = [
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'keyPosStatus', title: '车辆状态', array: [{value: 0, label: '熄火'}, {value: 1, label: '熄火'}, {value: 2, label: '启动'}]},
          {key: 'batteryStatus', title: '充电状态', array: [{value: 0, label: '未充电'}, {value: 1, label: '未充电'}, {value: 2, label: '行驶充电'}, {value: 3, label: '停车充电'}]},
          {key: 'ownMode', title: '运行模式'},
          {key: 'speed', title: '车速(km/h)'},
          {key: 'mileage', title: '累计里程(km)'},
          {key: 'batteryVoltage', title: '总电压(V)'},
          {key: 'batteryCurrent', title: '总电流(A)'},
          {key: 'soc', title: 'SOC(%)'},
          {key: '', title: 'DC-DC状态'},
          {key: 'gearStatus', title: '档位', array: [{value: 0, label: 'N 挡'}, {value: 1, label: 'D 挡'}, {value: 2, label: 'D 挡'}]},
          {key: '', title: '绝缘电阻(KΩ)'}
          ];
          this.modalFormItemD32 = [
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'ownMotor', title: '驱动电机个数'},
          {key: 'ownNum', title: '驱动电机序号'},
          {key: '', title: '驱动电机状态'},
          {key: 'mcTemp', title: '驱动电机控制器温度(℃)'},
          {key: 'motorRpm', title: '驱动电机转速(r/min)'},
          {key: '', title: '驱动电机转矩(N·m)'},
          {key: 'motorTemp', title: '驱动电机温度(℃)'},
          {key: 'voltageRange', title: '电机控制器输入电压(V)'},
          {key: 'busCurrent', title: '电机控制器直流母线电流(A)'}
          ];
          this.modalFormItemD34 = [
          {key: 'vinCode', title: 'VIN码'},
          {key: 'gprsCode', title: 'GPRS号'},
          {key: 'collectTime1', title: '采集时间'},
          {key: 'receiveTime1', title: '接收时间'},
          {key: 'ownVol', title: '最高电压电池子系统号'},
          {key: 'highestVoltageNo', title: '最高电压电池单体代号'},
          {key: 'voltageHighest', title: '电池单体电压最高值(V)'},
          {key: 'ownLowVol', title: '最低电压电池子系统号'},
          {key: 'lowestVoltageNo', title: '最低电压电池单体代号'},
          {key: 'voltageLowest', title: '电池单体电压最低值(V)'},
          {key: 'ownTem', title: '最高温度子系统号'},
          {key: 'highestTempNo', title: '最高温度点探针序号'},
          {key: 'tempHighest', title: '最高温度值(℃)'},
          {key: 'ownLowTem', title: '最低温度子系统号'},
          {key: 'templowestSubsyscode', title: '最低温度点探针序号'},
          {key: 'tempLowest', title: '最低温度值(℃)'}
          ];
        }
        this.getList();
      },
      onOpen (event) {
        this.loading = false;
        this.clearData();  // 初始化数据
        // console.log('onOpen:' + event);
      },
      end () {
        this.webSocket.close();
      },
      onError (event) {
        this.loading = false;
      },
      _initMap () {
        try {
          this.map = new AMap.Map('detailMap', {
            resizeEnable: true,
            center: [103.916776, 36.950676], // 地图中心点
            zoom: 15  // 地图显示的缩放级别
          });
          this.map.clearMap();
          AMapUI.load(['ui/misc/PathSimplifier', 'lib/$', 'lib/utils'], (PathSimplifier, $, utils) => {
            if (!PathSimplifier.supportCanvas) {
              alert('当前环境不支持 Canvas！');
              return;
            }
            let defaultRenderOptions = {
              renderAllPointsIfNumberBelow: -1,
              pathTolerance: 2,
              keyPointTolerance: 0,
              pathLineSelectedStyle: {
                lineWidth: 6,
                strokeStyle: '#F7B538',
                borderWidth: 1,
                borderStyle: '#cccccc',
                dirArrowStyle: true
              }
            };
            let pathSimplifierIns = new PathSimplifier({
              zIndex: 100,
              map: this.map,
              getPath: (pathData, pathIndex) => {
                return pathData.path;
              },
              getHoverTitle: (pathData, pathIndex, pointIndex) => {
                if (pointIndex >= 0) {
                  // point
                  return pathData.name;
                }
                return pathData.name;
              },
              renderOptions: defaultRenderOptions
            });
            this.pathSimplifierIns = pathSimplifierIns;
            let route = this.$route.query;
            if (route.vin) {
              this.vinCode = route.vin;
              this._created();
            }
          });
        } catch (e) {
          this.$message({
            message: '地图加载失败, 请稍后再试!',
            type: 'error'
          });
        }
      },
      showData (num) {
        if (num) this.isShow = true;
        else this.isShow = !this.isShow;
      },
      motor (num) {
        if (num) this.showMotor = true;
        else this.showMotor = !this.showMotor;
      },
      battery (num) {
        if (num) this.showBattery = true;
        else this.showBattery = !this.showBattery;
      },
      position (num) {
        if (num) this.showPosition = true;
        else this.showPosition = !this.showPosition;
      },
      max (num) {
        if (num) this.maxData = true;
        else this.maxData = !this.maxData;
      },
      getList () {
        this.soc_gauge.echart = echarts.init(document.getElementById('soc_gauge'));// 初始化soc
        this.speed_gauge.echart = echarts.init(document.getElementById('speed_gauge'));// 初始化车速
        this.motor_gauge.echart = echarts.init(document.getElementById('motor_gauge'));// 初始化电机转速
        this.voltage_gauge.echart = echarts.init(document.getElementById('voltage_gauge'));// 初始化总电压
        this.current_gauge.echart = echarts.init(document.getElementById('current_gauge'));// 初始化总电流
        this.probe_cross.echart = echarts.init(document.getElementById('probe_cross'));// 初始化探针信息
        this.monomer_cross.echart = echarts.init(document.getElementById('monomer_cross'));// 初始化单体信息
        this.voltage.echart = echarts.init(document.getElementById('voltage'));// 初始化单体电压
        this.vol.echart = echarts.init(document.getElementById('vol'));// 初始化单体电压
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
        if (this.onData.commProtocolVersion === 1 || this.onData.commProtocolVersion === 2) {
          speedGauge = this.onData.vms ? this.onData.vms.speed ? (this.onData.vms.speed === '无效' || this.onData.vms.speed === '异常') ? 0 : this.onData.vms.speed : 0 : 0;
          if (this.onData.commProtocolVersion === 1) {
            motorGauge = (this.onData.mc && this.onData.mc.motorRpm) ? ((this.onData.mc.motorRpm === '无效' || this.onData.mc.motorRpm === '异常') ? 0 : this.onData.mc.motorRpm) : 0;
          }
          if (this.onData.bms) {
          socGauge = this.onData.bms.soc ? (this.onData.bms.soc === '无效' || this.onData.bms.soc === '异常') ? 0 : this.onData.bms.soc : 0;
          voltageGauge = this.onData.bms.totalVoltage ? (this.onData.bms.totalVoltage === '无效' || this.onData.bms.totalVoltage === '异常') ? 0 : this.onData.bms.totalVoltage : 0;
          currentGauge = this.onData.bms.totalCurrent ? (this.onData.bms.totalCurrent === '无效' || this.onData.bms.totalCurrent === '异常') ? 0 : this.onData.bms.totalCurrent : 0;
          }
        }
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
                  //  color: [[380 / 600, '#5179DF'], [1, '#C4C4C4']],
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

        // 探针信息  --------------------------------------------------------------------------------------
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
         if (this.onData.peak) {
            maxT = {name: '最大值', value: this.onData.peak.highTemperature, xAxis: this.onData.peak.highProbeCode - 1, yAxis: this.onData.peak.highTemperature};
            minT = {name: '最小值', value: this.onData.peak.lowTemperature, xAxis: this.onData.peak.lowProbeCode - 1, yAxis: this.onData.peak.lowTemperature};
          } else {
            maxT = {name: '最大值', value: 0, xAxis: 0, yAxis: 0};
            minT = {name: '最小值', value: 0, xAxis: 0, yAxis: 0};
          }
        }
        if (this.onData.commProtocolVersion === 1 || this.onData.commProtocolVersion === 2) {
          if (this.onData.bms && this.onData.bms.temps1) {
            let tempData = (this.onData.bms.temps1 + ',' + this.onData.bms.temps2).split(',');
            for (let k = 0; k < tempData.length; k++) {
              if (tempData[k] !== '-40') {
                data.push(tempData[k]);
              }
            }
            for (let i = 0; i < data.length; i++) {
              if (data[i] === '-8000' || data[i] === '-9000') {
                data[i] = 0;
              }
              dataAxis.push(i + 1);
            }
            if (this.onData.commProtocolVersion === 1 && this.onData.matrixVersion === 1) {
              maxT = {name: '最大值', value: this.onData.bms.tempHighest, xAxis: this.onData.bms.highestTempNo - 1, yAxis: this.onData.bms.tempHighest};
              minT = {name: '最小值', value: this.onData.bms.tempLowest, xAxis: this.onData.bms.templowestSubsyscode - 1, yAxis: this.onData.bms.tempLowest};
            } else {
              maxT = {name: '最大值', value: this.onData.custom.HighTemp, xAxis: this.onData.custom.probeHighestNo, yAxis: this.onData.custom.HighTemp};
              minT = {name: '最小值', value: this.onData.custom.lowTemp, xAxis: this.onData.custom.probeLowestNo, yAxis: this.onData.custom.lowTemp};
            }
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
        // 探针信息  end--------------------------------------------------------------------------------------

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
          yMax1 = Math.ceil(this.onData.peak ? this.onData.peak.highVoltage : 0);
          // 最大值  最小值
          if (this.onData.peak) {
             maxV = {name: '最大值', value: this.onData.peak.highVoltage, xAxis: this.onData.peak.highBatteryCode - 1, yAxis: this.onData.peak.highVoltage};
             minV = {name: '最小值', value: this.onData.peak.lowVoltage, xAxis: this.onData.peak.lowBatteryCode - 1, yAxis: this.onData.peak.lowVoltage};
          } else {
            maxV = {name: '最大值', value: 0, xAxis: 0, yAxis: 0};
            minV = {name: '最小值', value: 0, xAxis: 0, yAxis: 0};
          }
        }
        if (this.onData.commProtocolVersion === 1 || this.onData.commProtocolVersion === 2) {
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
        if (this.onData.commProtocolVersion === 0 && this.onData.peak) {  // 0 - 三期 1 - 二期
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
        // 单体电压 最高 最低 end---------------------------------
      },
      // 当前位置
      getLocal () {
        this.map.setZoomAndCenter(18, [this.currentLocation.lon, this.currentLocation.lat]);
      },
      // 历史轨迹
      historyTrack () {
        if (!this.vinCode) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        this.$router.push({path: '/main/monitor/historicalTrack', query: {vin: this.vinCode}});
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
      // 获取总里程
      getMileage (data, flag) {
        if (flag === 0) {
          this.vehicleInfo.mileage = data ? (data.mileage ? ((String(data.mileage).indexOf('.') > -1 ? data.mileage.toFixed(2) : data.mileage)) : '') : '';
        } else if (flag === 1) {
          this.vehicleInfo.mileage = (data && data.totalMile) ? ((String(data.totalMile).indexOf('.') > -1 ? data.totalMile.toFixed(2) : data.totalMile)) : '';
        } else {
          this.vehicleInfo.mileage = (data && data.mileage) ? ((String(data.mileage).indexOf('.') > -1 ? data.mileage.toFixed(2) : data.mileage)) : '';
        }
        this.vehicleInfo.mileage = this.vehicleInfo.mileage === -1 ? '异常' : (this.vehicleInfo.mileage === -2 ? '无效' : this.vehicleInfo.mileage);
        this.vehicleInfo.mileage = this.vehicleInfo.mileage === -8000 ? '异常' : (this.vehicleInfo.mileage === -9000 ? '无效' : this.vehicleInfo.mileage);
      },
      // 获取速度
      getSpeed (data, flag) {
        if (flag === 0) this.vehicleInfo.speed = data ? (data.vehicleSpeed === null || data.vehicleSpeed === undefined) ? 0 : data.vehicleSpeed : 0;
        else this.vehicleInfo.speed = data ? (data.speed === null || data.speed === undefined) ? 0 : data.speed : 0;
        this.vehicleInfo.speed = this.vehicleInfo.speed === -1 ? '异常' : (this.vehicleInfo.speed === -2 ? '无效' : this.vehicleInfo.speed);
        this.vehicleInfo.speed = this.vehicleInfo.speed === -8000 ? '异常' : (this.vehicleInfo.speed === -9000 ? '无效' : this.vehicleInfo.speed);
      },
      // 获取地址
      getAddress (position) {
        return new Promise((resolve, reject) => {
          let obj = {collectTime1: '', address: ''};
          try {
            let str = position.longitude + ',' + position.latitude;
            obj.collectTime1 = position.collectTime === null ? '' : this._hyTool.DateFormat(new Date(+position.collectTime), 'yyyy-MM-dd hh:mm:ss');
            if (position.longitude >= 0.0 && position.longitude < 180.0 && position.latitude >= 0.0 && position.latitude < 90.0) {
              this.getGregeoOne([str], value => {
                obj.address = value[0].formatted_address;
                resolve(obj);
              });
            } else {
              resolve(obj);
            }
          } catch (e) {
            reject(obj);
          }
        });
      },
      // tab 切换控制高度
      changeHeight (key) {
        if (this.onData.noCreated) return;
        if (key === 'real') {
          if (this.onData.commProtocolVersion === 0 && this.onData.matrixVersion === 0) {
            this.tabsHeight.height = '4240px';
          } else {
            this.tabsHeight.height = '8680px';
          }
        } else if (key === 'national') {
          if (this.onData.commProtocolVersion === 0) {
            this.tabsHeight.height = '2015px';
          } else {
            this.tabsHeight.height = '330px';
          }
        }
      },
      // 全量查询
      allSelect (flag) {
        this.vinShow = flag;
        this.vinCode = '';
      },
      // 自动查询
      autoSelect (event) {
        if (this.vinCode.length === 17) {
          this._created(1);
        }
      }
    },
    beforeDestroy () {
      if (this.webSocket) {
        this.webSocket.close();
      }
      if (this.soc_gauge.echart) this.soc_gauge.echart.dispose();
      if (this.speed_gauge.echart) this.speed_gauge.echart.dispose();
      if (this.motor_gauge.echart) this.motor_gauge.echart.dispose();
      if (this.voltage_gauge.echart) this.voltage_gauge.echart.dispose();
      if (this.current_gauge.echart) this.current_gauge.echart.dispose();
      if (this.probe_cross.echart) this.probe_cross.echart.dispose();
      if (this.monomer_cross.echart) this.monomer_cross.echart.dispose();
      if (this.voltage.echart) this.voltage.echart.dispose();
      if (this.vol.echart) this.vol.echart.dispose();
    }
  };
</script>
