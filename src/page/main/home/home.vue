<style lang="scss" scoped>
  @import 'src/styles/mixins';
  .content {
    // margin-left: 0px;
    //  width: 100%;
    position: relative;
    .hy-search-bar {
      position: absolute;
      top: 0;
      width: 100%;
      background: transparent;
      border: none;
    }
    .car-info {
      width: 458px;
      height: 30px;
      background-color: #5cadff;
      text-align: center;
      line-height: 22px;
      float: left;
    }
    .hy-graph{
      margin-top: 10px;
      //   padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom:3px solid #EEF1F8;
      .dataPie {
        width: 730px;
        height:350px;
      }
    }
    .hy-rang {
      padding-bottom:100px;
      .alarmCount {
        margin-left:20px;
        height:210px;
        display:flex;
        flex-direction: column;
        flex-wrap:wrap;
        p {
          width:270px;
          height:40px;
          font-size:14px;
        }
      }
      p {
        height:40px;
        font-size:14px;
        span {
          margin-right:27px;
        }
      }
      .vinRank {
        display:inline-block;
        width:130px;
      }
      .number {
        display:inline-block;
        margin-right:5px;
        width:20px;
        height:20px;
        color:white;
        text-align:center;
      }
      .NumZero {
        .numberNo {
          background:#EC5238;
        }
      }
      .NumOne {
        .numberNo {
          background:#FFA72A;
        }
      }
      .NumTwo {
        .numberNo {
          background:#F0DF84;
        }
      }
      .NumThree {
        .numberNo {
          background:#D0D0D0;
        }
      }
      .numberNo {
        background:#D0D0D0;
      }
    }
  }
  .contentPad {
    padding: 6px 15px 8px 6px;
  }
  .font-title {
    font-size: 16px;
    color: #FFFFFF;
  }

  .autoHeight {
    height: 80%;
  }
  .heatHeight {
    height: 80%;
  }

  .map_card {
    width: 490px;
    position: absolute;
    z-index: 99;
    right: 15px;
    top: 115px;
    .card {
      float: right;
      display: inline-block;
      @include borderRadius(9999px);
      border: 1px solid #5179DF;
      overflow:hidden;
      width: 54%;
      height:30px;
      position:relative;
      input {
        outline: none;
        margin-left:10px;
        width:70%;
        margin-top:5px;
      }
      .sea{
        background-color:#5179DF;
        color:white;
        width:23%;
        position:absolute;
        top:-2px;
        right:-2px;
      }
    }
    .breadButton{
      //  display: inline-block;
      float:right;
      width: 60px;
      height: 30px;
      @include borderRadius(9999px);
      background-color: #5179DF;
      margin-bottom:10px;
      position:relative;
      .buttonIcon {
        @include center();
      }
    }
  }
  .hy-close{
    height: 40px;
    position: absolute;
    top: 125px;
    right:495px;
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
  .clearfix {
    .fixmap {
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      border:1px solid blue;
      @include borderRadius(5px)
    }
  }
  .hy-mainButton{
    position: absolute;
    top: 6px;
    right: 10px;
    z-index: 998;
    float: right;
    line-height: 50px;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content contentPad" >
      <div id="homeMap" :class="{'autoHeight': positionShow, 'heatHeight': !positionShow}"></div>
      <div class="hy-search-bar vehicleinfo" style="padding: 0;width:60%;top:20px;right:25px;">
        <ul class="clearfix pull-right">
          <li  id="total">
            <div class="totalCar" :class="fixTotal">
              <div class="clzs"></div>
              <div class="totalBox" >
                <p class="font-w">{{country.totalCount}}</p>
                <p>车辆总数</p>
              </div>
            </div>
          </li>
          <li >
            <div class="boxOnline" >
              <div class="onlieTop" id="online" :class="fixOn">
                <span style="position:relative"><i class="iconfont icon-yonghuzaixian"></i>在线：</span>
                <span style="font-weight: bold;font-size: 15px;">{{country.onlineCount}}</span>
              </div>
              <div   id="driving" class="drvingBox" :class="fixDrving">
                <p style="font-weight: bold;font-size: 15px;">{{country.drivingCount}}</p>
                <p style="position:relative;display:inline-block;left:10px;"><i class="iconfont icon-zhidingweizhi"></i>行驶</p>
              </div>
              <div  id="charging" class="charingBox" :class="fixCharing">
                <p style="font-weight: bold;font-size: 15px;">{{country.chargingCount}}</p>
                <p style="position:relative;display:inline-block;left:10px;"><i class="iconfont icon-iconset0247"></i>充电</p>
              </div>
              <div  id="standBy" class="standBox" :class="fixStand">
                <p style="font-weight: bold;font-size: 15px;">{{(country.onlineCount - country.drivingCount - country.chargingCount) >= 0 ? (country.onlineCount - country.drivingCount - country.chargingCount) : 0}}</p>
                <p style="position:relative;display:inline-block;left:10px;"><i class="iconfont icon-zhuxiaoguanji"></i>待机</p>
              </div>
            </div>
            <div class="offBox box-text" id="offline" :class="fixOff">
              <p class="font-w">{{country.offlineCount}}</p>
              <p><i class="iconfont icon-drxx15"></i>离线</p>
            </div>
            <div class="errorBox box-text" id="error" :class="fixError">
              <p class="font-w">{{(country.totalCount - country.onlineCount - country.offlineCount) >= 0 ? (country.totalCount - country.onlineCount - country.offlineCount) : 0}}</p>
              <p><i class="iconfont icon-zhixingyichang"></i>异常</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="mapCarShow" class="borderStyle">
        <Card :class="mapCar">
          <RadioGroup v-model="buttonName" type="button" @on-change="buttonChange">
            <Radio label="区域"></Radio>
            <Radio label="经销商"></Radio>
            <Radio label="平台"></Radio>
          </RadioGroup>
          <div class="card" v-show="regionShow">
            <i-input placeholder="请输入行政区域" v-model.trim="searchData.areaName" style="width:200px;top:-1px;left:-1px;" :maxlength='17' clearable></i-input>
            <i-button class="sea" @click="getRegionData">搜索</i-button>
          </div>
          <div class="card" v-show="dealerShow">
            <i-input placeholder="请输入经销商名称" v-model.trim="searchData.dealerName" style="width:200px;top:-1px;left:-1px;" :maxlength='17' clearable></i-input>
            <i-button class="sea" @click="getDealer">搜索</i-button>
          </div>
          <div class="card" v-show="channelShow">
            <i-input placeholder="请输入平台名称" v-model.trim="searchData.channel" style="width:200px;top:-1px;left:-1px;" :maxlength='17' clearable></i-input>
            <i-button class="sea" @click="getChannel">搜索</i-button>
          </div>
          <Table height="250" :columns="columnsRegionTitle" :data="regList" v-show="regionShow" :loading="loading" style="margin-top:20px;"></Table>
          <Table height="250" :columns="columnsDealerTitle" :data="dealerList" v-show="dealerShow" :loading="loading1" style="margin-top:20px;"></Table>
          <Table height="250" :columns="columnsChannelTitle" :data="channelList" v-show="channelShow" :loading="loading2" style="margin-top:20px;"></Table>
          <div style="margin-top:20px;" @click="load">
            <i class="iconfont icon-xiazai2"></i>
          </div>
        </Card>
        <i-button type="ghost" icon="arrow-right-b" :class="close" @click="closeCard"></i-button>
        <Tooltip content="展开右边面板" placement="left" style=" position: absolute;top: 105px;right:12px;" :class="open">
          <i-button type="ghost" icon="arrow-left-b" :class="open" @click="openCard"></i-button>
        </Tooltip>
      </div>
      <div>
        <div class="hy-graph" >
          <Row>
            <i-col span="12" >
              <div style="height:30px;line-height:30px;margin:7px 20px;">
                <span style="color:black;font-size:16px;">近30日国标报警类型统计图 </span>
              </div>
              <div id="dataPie"  class="dataPie"></div>
            </i-col>
            <i-col span="1">
              <div style="height: 360px;margin-top: 20px;width:1px;border-right:1px dashed #DFE8FF"></div>
            </i-col>
            <i-col span="11">
              <div style="height:30px;line-height:30px;margin:7px 0;">
                <span style="color:black;font-size:16px;">近30日国标报警车辆统计 </span>
              </div>
              <div id="barGraph" style="width: 500px;height:350px;margin: 10px auto"></div>
            </i-col>
          </Row>
        </div>
        <div class="hy-rang">
          <Row>
            <i-col span="12" >
              <div style="height:30px;line-height:30px;margin:20px 20px;">
                <span style="color:black;font-size:16px;">今日国标报警次数排名Top10 </span>
              </div>
              <div class="alarmCount">
                <p v-for="(item, index) in alarmTimesRank" :key="index" :class="{'NumZero': index==0, 'NumOne': index==1, 'NumTwo': index==2, 'NumThree': index==3}" style="width:276px">
                  <span class="number numberNo">{{index + 1}}</span>
                  <span class="vinRank">{{item.vin}}</span>
                  <span>{{item.count}}次</span>
                </p>
              </div>
            </i-col>
            <i-col span="6" >
              <div style="height:30px;line-height:30px;margin:20px 0;">
                <span style="color:black;font-size:16px;">今日里程排名Top5 </span>
              </div>
              <div>
                <p v-for="(item, index) in rankToday" :key="index" :class="{'NumZero': index==0, 'NumOne': index==1, 'NumTwo': index==2, 'NumThree': index==3}" style="width:276px">
                  <span class="number numberNo">{{index + 1}}</span>
                  <span class="vinRank">{{item.vinCode}}</span>
                  <span style="position:absolute;left:70%;">{{item.mileage}}km</span>
                </p>
              </div>
            </i-col>
            <i-col span="6">
              <div style="height:30px;line-height:30px;margin:20px 0;">
                <span style="color:black;font-size:16px;">总里程排名Top5 </span>
              </div>
              <div >
                <p v-for="(item, index) in rankList" :key="index" :class="{'NumZero': index==0, 'NumOne': index==1, 'NumTwo': index==2, 'NumThree': index==3}" style="width:276px">
                  <span class="number numberNo">{{index + 1}}</span>
                  <span class="vinRank">{{item.vinCode}}</span>
                  <span style="position:absolute;left:70%;">{{item.mileage}}km</span>
                </p>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <Spin size="large" fix v-if="spinShow">
        <div style="width: 100%;padding: 0 15%">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div><span>Loading</span></div>
          <!--<Progress :percent="percent"></Progress>-->
        </div>
      </Spin>
    </div>
  </div>
</template>

<script>
  import AMap from 'AMap';
  import AMapUI from 'AMapUI';
  import HyTable from '@/components/common/table/table.vue';
  import { alarmTimesRank, regionList, dealerDetail, channelExport, channelDetail, districtExport, channel, dealerExport, dynamicChart, cityList, alarmType, rankList, rankToday, alarmVehicle, dealer, detailOfGbChannel } from '@/service/homeService/administrativeRegion';
  import echarts from 'echarts';
  import { mapState, mapMutations } from 'vuex';
  import Bus from '@/components/common/bus';

  export default {
    components: {
      HyTable,
      Bus
    },
    data () {
      return {
        searchData: {
        },
        buttonName: '区域',
        socketNum: 0,
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
            vehicleSpeed: 0,
            totalVoltage: 0,
            totalCurrent: 0,
            collectTime: null,
            receiveTime: null
          },
          position: {
            mileage: '',
            collectTime: null,
            receiveTime: null
          },

          bms: {
            collectTime: null,
            receiveTime: null,
            batteryTypeCode: '',
            highestTemp: 0,
            tempLowest: 0,  // 无值
            batteryTempCount: 0,  // 无值
            highestVoltage: 0,
            lowestVoltage: 0,
            voltageCount: 0,    // 无值
            voltageTotal: 0,
            currentTotal: 0
          },
          peak: {
            highTemperature: 0,
            lowTemperature: 0,
            highVoltage: 0,
            lowVoltage: 0,
            collectTime: null,
            receiveTime: null
          },
          temperature: {
            number: 0,
            temperatures: '0'
          },
          battery: {
            collectTime: null,
            receiveTime: null,
            batterySysNumber: 0,
            batteryVoltages: '0'
          },
          motor: [
            {
              speed: 0,
              collectTime: null,
              receiveTime: null,
              motorTemperature: 0,
              controllerTemperature: 0
            }
          ],
          mc: {
            collectTime: null,
            receiveTime: null,
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
            collectTime: null,
            receiveTime: null,
            geerPositon: null,
            readyLampStatus: 1
          }
        },   // onMessage 获取的数据
        socGauge: 0,
        speedGauge: 0,
        gprsCode: '',
        collectTime: '',
        socket: null,
        infoWindow: null,
        mass: null,
        fixTotal: 'fixmap',
        fixOn: '',
        fixDrving: '',
        fixCharing: '',
        fixStand: '',
        fixOff: '',
        fixError: '',
        heatData: {
          all: {
            data: [],
            max: 0
          },
          charging: {
            data: [],
            max: 0
          },
          driving: {
            data: [],
            max: 0
          },
          offline: {
            data: [],
            max: 0
          },
          online: {
            data: [],
            max: 0
          },
          standby: {
            data: [],
            max: 0
          }
        },
        standData: [],
        standList: [],
        message: '首页',
        loading: false,
        loading1: false,
        loading2: false,
        //   showBt: false,
        distCluster: null,
        clusterContainer: [],
        heatContainer: [],
        markers: [],
        positionShow: true,
        spinShow: false,
        dealerMarkers: [], // 经销商状态
        dealerPoint: [], // 经销商状态
        regionStore: [],
        regionShow: true,
        dealerShow: false,
        channelShow: false,
        loginInfo: null,
        regList: [],
        dealerList: [],
        channelList: [],
        fixmap: true,
        dealerMap: false,
        regionMap: false,
        columnType: 'index',
        mapCar: 'hide',
        close: 'hide',
        open: 'showOpen',
        columnsRegionTitle: [
          {
            title: '行政区域',
            width: 120,
            key: 'name',
            render: (h, params) => {
              return this._hyTool.createButton(h, params, this.dealerTotal, params.row.name, null);
            }
          },
          {
            title: '行驶',
            key: '行驶',
            width: 87,
            render: (h, params) => {
              return this._hyTool.createButton(h, params, this.drivingTip, params.row.drivingCount, null);
            }
          },
          {
            title: '充电',
            key: '充电',
            width: 87,
            render: (h, params) => {
              return this._hyTool.createButton(h, params, this.charingTip, params.row.chargingCount, null);
            }
          },
          {
            title: '待机',
            key: '待机',
            width: 87,
            render: (h, params) => {
              let standByCount = params.row.onlineCount - params.row.chargingCount - params.row.drivingCount;
              return this._hyTool.createButton(h, params, this.onlineTip, (standByCount >= 0 ? standByCount : 0), null);
            }
          },
          {
            title: '离线',
            key: '离线',
            width: 87,
            render: (h, params) => {
              return this._hyTool.createButton(h, params, this.offlineTip, params.row.offlineCount, null);
            }
          }
          // {
          //   title: '异常',
          //   key: '异常',
          //   render: (h, params) => {
          //       return this._hyTool.createButton(h, params, this.errorTip, params.row.data[4].count, null);
          //   }
          // }
        ],
        columnsDealerTitle: [
          {
            title: '经销商',
            width: 120,
            key: 'dealerName',
            render: (h, params) => {
              return this._hyTool.createButton(h, params, this.totaDealer, params.row.dealerName, null);
            }
          },
          {
            title: '行驶',
            key: '行驶',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:driving') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.drivingDealer, alo.count, null);
            }
          },
          {
            title: '充电',
            key: '充电',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:charging') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.charingDealer, alo.count, null);
            }
          },
          {
            title: '待机',
            key: '待机',
            width: 100,
            render: (h, params) => {
              let [count, onlineCount, chargingCount, drivingCount] = [0, 0, 0, 0];
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:online') {
                  onlineCount = item.count;
                }
                if (item.status === 'tbox:connections:charging') {
                  chargingCount = item.count;
                }
                if (item.status === 'tbox:connections:driving') {
                  drivingCount = item.count;
                }
                count = onlineCount - chargingCount - drivingCount;
              });
              return this._hyTool.createButton(h, params, this.standDealer, count, null);
            }
          },
          {
            title: '离线',
            key: '离线',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:offline') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.offlineDealer, alo.count, null);
            }
          },
          {
            title: '异常',
            key: '异常',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:exception') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.errorDealer, alo.count, null);
            }
          }
        ],
        columnsChannelTitle: [
          {
            title: '平台',
            width: 120,
            key: 'channelName',
            render: (h, params) => {
              return this._hyTool.createButton(h, params, this.totaDealer, params.row.channelName, null);
            }
          },
          {
            title: '上传国家平台',
            width: 120,
            key: 'gbCount',
            render: (h, params) => {
              return this._hyTool.createButton(h, params, this.totalChannel, params.row.gbCount, null);
            }
          },
          {
            title: '行驶',
            key: '行驶',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:driving') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.drivingDealer, alo.count, null);
            }
          },
          {
            title: '充电',
            key: '充电',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:charging') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.charingDealer, alo.count, null);
            }
          },
          {
            title: '待机',
            key: '待机',
            width: 100,
            render: (h, params) => {
              let [count, onlineCount, chargingCount, drivingCount] = [0, 0, 0, 0];
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:online') {
                  onlineCount = item.count;
                }
                if (item.status === 'tbox:connections:charging') {
                  chargingCount = item.count;
                }
                if (item.status === 'tbox:connections:driving') {
                  drivingCount = item.count;
                }
                count = onlineCount - chargingCount - drivingCount;
              });
              return this._hyTool.createButton(h, params, this.standDealer, count, null);
            }
          },
          {
            title: '离线',
            key: '离线',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:offline') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.offlineDealer, alo.count, null);
            }
          },
          {
            title: '异常',
            key: '异常',
            width: 100,
            render: (h, params) => {
              let alo = {};
              params.row.data.map(item => {
                if (item.status === 'tbox:connections:exception') {
                  alo = item;
                }
              });
              return this._hyTool.createButton(h, params, this.errorDealer, alo.count, null);
            }
          }
        ],
        country: {
          chargingCount: 0,
          drivingCount: 0,
          offlineCount: 0,
          onlineCount: 0,
          totalCount: 0,
          standByCount: 0
        },
        dealerMarkerList: [],
        regionMarkerList: [],
        countryList: [],
        provinceList: [],
        cityIconList: [],
        cityData: [],
        provincesData: [],
        typeData: [],
        alarmTypeData: [],
        alarmTimesRank: [],
        rankList: [],
        rankToday: [],
        alarmVehicle: [],
        dataPie: {echart: null, option: null},         // 报警类型统计图
        barGraph: {echart: null, option: null},         // 30日报警车辆统计图
        graphData: [],
        mapCarShow: true,
        heat: null
      };
    },
    created () {
    },
    mounted () {
      // 初始化地图
      this.init();
      this.getDate();
      this.getPieData();
      this.getRankData();
      this.getRegion();
      // this.tenData = setInterval(() => {
      //   this.getRegion();
      // }, 600000);
      this.dynamic();
      // this.getDealer();
      this.HOME_SHOW({status: true});
      Bus.$on('homeoper', this.mapOper);
    },
    beforeDestroy () {
      Bus.$off('homeoper', this.mapOper);
      // clearInterval(this.tenData);
    },
    destroyed () {
      this.HOME_SHOW({status: true});
    },
    computed: {
      ...mapState([
        'latestVehicleSocketUrl',
        'taskNum'
      ])
    },
    beforeRouteLeave (to, from, next) {
      if (this.socket) {
        this.end();
      }
      next();
    },
    methods: {
      ...mapMutations([
        'HOME_SHOW',
        'TASK_NUM'
      ]),
      // radio 切换
      buttonChange (data) {
        if (data === '区域') {
          this.regionShow = true;
          this.dealerShow = false;
          this.channelShow = false;
          this.getRegionData();
          if (this.searchData.dealerName || this.searchData.channel) {
            delete this.searchData.dealerName;
            delete this.searchData.channel;
          }
        } else if (data === '经销商') {
          this.regionShow = false;
          this.dealerShow = true;
          this.channelShow = false;
          this.getDealer();
          if (this.searchData.areaName || this.searchData.channel) {
            delete this.searchData.areaName;
            delete this.searchData.channel;
          }
        } else if (data === '平台') {
          this.regionShow = false;
          this.dealerShow = false;
          this.channelShow = true;
          this.getChannel();
          if (this.searchData.areaName || this.searchData.dealerName) {
            delete this.searchData.areaName;
            delete this.searchData.dealerName;
          }
        }
      },
      // 导出
      load () {
        if (this.regionShow) {
          if (!this.regList.length) {
            this.$confirm('无导出数据', '提示', {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
            return;
          }
          districtExport(this.searchData, res => {
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
              title: '导出行政区域列表失败',
              desc: ret
            });
          });
        } else if (this.dealerShow) {
          if (!this.dealerList.length) {
            this.$confirm('无导出数据', '提示', {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
            return;
          }
          dealerExport(this.searchData, res => {
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
              title: '导出经销商列表失败',
              desc: ret
            });
          });
        } else if (this.channelShow) {
          if (!this.channelList.length) {
            this.$confirm('无导出数据', '提示', {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
            return;
          }
          channelExport(this.searchData, res => {
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
              title: '导出平台列表失败',
              desc: ret
            });
          });
        }
      },
      // 展开面板
      getDealer () {
        this.loading1 = true;
        dealer(this.searchData, res => {
          this.loading1 = false;
          this.dealerList = res;
          // console.log(this.dealerList);
        }, ret => {
          this.loading1 = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询经销商列表失败',
              desc: ret
            });
          }
        });
      },
      // 平台搜索
      getChannel () {
        this.loading2 = true;
        channel(this.searchData, res => {
          this.loading2 = false;
          this.channelList = res;
        }, ret => {
          this.loading2 = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询平台列表失败',
              desc: ret
            });
          }
        });
      },
      // 区域搜索
      getRegionData () {
        this.loading = true;
        regionList(this.searchData, res => {
          this.loading = false;
          this.regList = res.cities;
        }, ret => {
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询车辆失败',
              desc: ret
            });
          }
        });
      },
      getRegion () {
        // this.loading = true;
        regionList(this.searchData, res => {
          //  console.log(res);
          this.$set(this, 'country', res.country);
          this.cityData = res.cities;
          this.regList = res.cities;
          this.provincesData = res.provinces;
          this.toggleEach('total');
        }, ret => {
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询车辆失败',
              desc: ret
            });
          }
        });
      },
      // 生成聚合数字
      createMarker (data, hide, num) {
        let count = 0;
        let standbyCount = data.onlineCount - data.drivingCount - data.chargingCount;
        if (num === 'total') count = data.totalCount;
        else if (num === 'driving') count = data.drivingCount;
        else if (num === 'charging') count = data.chargingCount;
        else if (num === 'standby') count = standbyCount >= 0 ? standbyCount : 0;
        else if (num === 'offline') count = data.offlineCount;
        else if (num === 'online') count = data.onlineCount;
        // else count = data.totalCount;
        let div = document.createElement('div');
        if (count !== 0) {
          if (String(count).length >= 4) div.className = 'circle5';
          else if (String(count).length === 3) div.className = 'circle4';
          else if (String(count).length === 2) div.className = 'circle3';
          else if (String(count).length === 1) div.className = 'circle2';
          div.innerHTML = count || 0;
        }
        let marker = new AMap.Marker({
          content: div,
          // icon: '/static/images/new/main/province.png',
          title: data.name,
          position: data.center,
          offset: new AMap.Pixel(-15, -15),
          zIndex: count,
          status: num
        });
        this.map.setZoomAndCenter(4, [114.30525, 36.59276]);
        //  this.map.setCenter(marker.getPosition());
        if (!hide && count !== 0) {
          marker.setMap(this.map);
        }
        marker.subMarkers = [];
        if (data.areaCode) {
          marker.cityCode = data.areaCode;
        }
        marker.row = data;
        return marker;
      },
      _onZoomEnd () {
        if (this.positionShow === true && this.fixmap === true) {   // 展示聚合并且点击的是总数
          if (this.map.getZoom() < 6) {
            this.map.remove(this.cityIconList);
            this.map.remove(this.countryList);
            this.map.add(this.provinceList);
            this.map.remove(this.markers);
            if (this.mass !== null) {
              this.mass.clear();
              // this.map.clearMap();
            }
          }
          if (this.map.getZoom() < 5) {
            this.map.remove(this.cityIconList);
            this.map.remove(this.provinceList);
            this.map.add(this.countryList);
            this.map.remove(this.markers);
            if (this.mass !== null) {
              this.mass.clear();
              // this.map.clearMap();
            }
          }
          if (this.map.getZoom() > 8 && this.map.getZoom() < 10) {
            this.map.add(this.cityIconList);
            this.map.remove(this.countryList);
            this.map.remove(this.provinceList);
            this.map.remove(this.markers);
            if (this.mass !== null) {
              this.mass.clear();
              // this.map.clearMap();
            }
          }
          if (this.map.getZoom() >= 11 && this.map.getZoom() < 12) {
            this.map.remove(this.cityIconList);
            //  if (this.map.getZoom() >= 13 && this.map.getZoom() < 14) {
            this.markers = [];
            if (this.mass !== null) {
              this.mass.clear();
            }
            //  }
            let pier = document.getElementsByClassName('fixmap')[0].classList[0];
            if (pier === 'totalCar') {
              this.getCity('total');
            }
            if (pier === 'onlieTop') {
              this.getCity('online');
            }
            if (pier === 'drvingBox') {
              this.getCity('driving');
            }
            if (pier === 'charingBox') {
              this.getCity('charging');
            }
            if (pier === 'standBox') {
              this.getCity('standby');
            }
            if (pier === 'offBox') {
              this.getCity('offline');
            }
            if (pier === 'errorBox') {
              this.getCity('error');
            }
            //  this.getCity();
            //  this.markers = [];
          }
        }
        if (this.positionShow === true && this.dealerMap === true) {
          if (this.map.getZoom() < 4) {
            if (this.mass !== null) {
              this.mass.clear();
              // this.map.clearMap();
            }
            this.map.add(this.dealerMarkerList);
          }
        }
        if (this.positionShow === true && this.regionMap === true) {
          if (this.map.getZoom() < 6) {
            if (this.mass !== null) {
              this.mass.clear();
            }
            setTimeout(() => {
              this.map.add(this.regionMarkerList);
            }, 500);
          };
          if (this.map.getZoom() >= 8 && this.map.getZoom() < 9) {
            this.map.remove(this.regionMarkerList);
            if (this.mass !== null) {
              this.mass.clear();
            }
            this.campareCity(this.regionStore[0].data.areaCode, this.regionStore[1].status);
          }
        }
      },
      // 点击聚合数字
      clickProvince (e) {
        //  console.log(e.target);
        if (e.target.subMarkers.length) {
          this.map.add(e.target.subMarkers);
          this.map.setZoomAndCenter(8, e.target.row.center);
          // this.map.setFitView(e.target.subMarkers);
          this.map.remove(this.provinceList);
        }
      },
      clickCountry (e) {
        if (e.target.subMarkers.length) {
          this.map.add(e.target.subMarkers);
          this.map.setZoomAndCenter(5, [114.30525, 36.59276]);
          // this.map.setFitView(e.target.subMarkers);
          this.map.remove(this.countryList);
        }
      },
      clickCity (e) {
        //  this.getCity(e.target.cityCode, e.target.G.status);
        this.markers = [];
        if (!e.target.subMarkers.length) {
          this.map.remove(this.cityIconList);
          // this.map.setZoom(11);
          this.map.setZoomAndCenter(11, e.target.row.center);
        }
      },
      // 每种状态
      toggleEach (status, list, max) {
        this.fixmap = true;
        this.dealerMap = false;
        this.regionMap = false;
        $('td span').css('border', '0px solid white');
        if (this.infoWindow) {
          this.map.clearInfoWindow();
          this.end();
        }
        if (this.mass !== null) {
          this.mass.clear();
        }
        if (this.positionShow === true) {
          // this.map.setZoomAndCenter(4, [114.30525, 36.59276]);
          this.map.clearMap();
          this.countryList = [];
          this.provinceList = [];
          this.cityIconList = [];
          // 添加点标记，并使用自己的icon
          if (!this.countryList.length) {
            let countryMark = this.createMarker(this.country, false, status);
            this.countryList.push(countryMark);
            if (this.cityData && this.cityData.length) {
              this.cityData.map(item => {
                let cityMark = this.createMarker(item, true, status);
                this.cityIconList.push(cityMark);
                AMap.event.addListener(cityMark, 'click', this.clickCity);
              });
            }
            this.provincesData.map(item => {
              let provinceMarker = this.createMarker(item, true, status);
              this.provinceList.push(provinceMarker);
              provinceMarker.subMarkers = this.cityIconList;
              AMap.event.addListener(provinceMarker, 'click', this.clickProvince);
            });
            countryMark.subMarkers = this.provinceList;
            AMap.event.addListener(countryMark, 'click', this.clickCountry);
          }
        }
        if (this.positionShow === false) {
          this.map.setZoomAndCenter(4, [114.30525, 36.59276]);
          this.heat.setMap(null);
          this.heat.setMap(this.map);
          this.heat.setDataSet({
            data: list,
            max: max
          });
        }
      },
      closeCard () {
        this.mapCar = 'hide';
        this.close = 'hide';
        this.open = 'showOpen';
      },
      openCard () {
        this.mapCar = 'map_card';
        this.open = 'hide';
        this.close = 'hy-close';
      },
      // 滚动获取城市
      getCity (status) {
        if (!this.markers.length) {
          //   this.campareCity(target, status);
          this.map.getCity((data) => {
            //  console.log(data);
            if (data['province'] && typeof data['province'] === 'string') {
              //  alert('城市：' + (data['city'] || data['province']));
              if (data['city'].length === 0) {
                this.provincesData.map(item => {
                  if (item.name === data['province']) {
                    this.campareCity(item.areaCode, status);
                  }
                });
              } else {
                this.cityData.map(item => {
                  if (item.name === data['city']) {
                    this.campareCity(item.areaCode, status);
                  }
                });
              }
            }
          });
        }
      },
      campareCity (code, status) {
        this.spinShow = true;
        cityList({cityCode: code}, res => {
          // console.log(res);
          this.totalMarker(res.datas, status);
          this.spinShow = false;
        }, ret => {
          this.spinShow = false;
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询区域车辆失败',
              desc: ret
            });
          }
        });
      },
      dynamic () {
        dynamicChart({}, res => {
          // console.log(res);
          this.$set(this, 'heatData', res);
        }, ret => {
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '展示热力图失败',
              desc: ret
            });
          }
        });
      },
      // 热力图切换
      mapOper (flag) {
        if (flag === 'position') {
          this.positionShow = true;
          this.mapCarShow = true;
          this.HOME_SHOW({status: true});
          this.closeCard();
          $('td span').css('border', '0px solid white');
          if (this.heatContainer.length !== 0) {
            this.heatContainer = [];
            this.heat.setMap(null);
            this.toggleEach('total');
          }
        } else if (flag === 'heatClick') {
          this.positionShow = false;
          this.mapCarShow = false;
          this.HOME_SHOW({status: false});
          $('td span').css('border', '0px solid white');
          if (this.infoWindow) {
            this.map.clearInfoWindow();
          }
          if (this.mass !== null) {
            this.mass.clear();
          }
          this.map.clearMap();
          this.map.remove(this.dealerMarkerList);
          this.map.remove(this.regionMarkerList);
          if (this.countryList.length) {
            this.countryList = [];
            // this.map.clearMap();
            this.map.setZoomAndCenter(4, [114.30525, 36.59276]);
            this.map.plugin(['AMap.Heatmap'], () => {
              this.heat = new AMap.Heatmap(this.map, {
                radius: 25  // 给定半径
              });
              // 设置数据集
              this.heat.setDataSet({
                data: this.heatData.all.data,
                max: this.heatData.all.max
              });
            });
            this.heatContainer.push(this.heat);
          }
        }
        this.fixTotal = 'fixmap'; this.fixOn = ''; this.fixDrving = ''; this.fixCharing = ''; this.fixStand = ''; this.fixOff = ''; this.fixError = '';
        //  this.positionClick();
      },
      // 经销商状态
      totaDealer (row, e) {
        this.clickDealer(row, 'total', 'total', e);
      },
      standDealer (row, e) {
        this.clickDealer(row, 'tbox:connections:standby', 'standby', e);
      },
      offlineDealer (row, e) {
        this.clickDealer(row, 'tbox:connections:offline', 'offline', e);
      },
      errorDealer (row, e) {
        this.clickDealer(row, 'exception', 'error', e);
      },
      drivingDealer (row, e) {
        this.clickDealer(row, 'tbox:connections:driving', 'driving', e);
      },
      charingDealer (row, e) {
        this.clickDealer(row, 'tbox:connections:charging', 'charging', e);
      },
      totalChannel (row, e) {
        this.clickDealer(row, 'totalChannel', 'total', e, true);
      },
      clickDealer (row, status, sta, e, flag) {   // flag点击国标平台车辆
        this.fixmap = false;
        this.regionMap = false;
        this.fixTotal = ''; this.fixOn = ''; this.fixDrving = ''; this.fixCharing = ''; this.fixStand = ''; this.fixOff = ''; this.fixError = '';
        this.map.clearMap();
        if (this.mass !== null) {
          this.mass.clear();
        }
        this.map.remove(this.cityIconList);
        this.map.remove(this.countryList);
        this.map.remove(this.provinceList);
        this.map.remove(this.dealerMarkerList);
        this.map.remove(this.regionMarkerList);
        let event = event || window.event;
        $('td span').css('border', '0px solid white');
        $(e.target).css({'border': '1px solid blue', 'border-radius': '5px'});
        if (this.infoWindow) {
          this.map.clearInfoWindow();
          this.end();
        }
        this.map.setZoomAndCenter(4, [114.30525, 36.59276]);
        this.dealerMarkerList = [];
        // 添加点标记，并使用自己的icon
        if (!this.dealerMarkerList.length) {
          let dealerMark = this.createDealerMarker(row, status, flag);
          this.dealerMarkerList.push(dealerMark);
          AMap.event.addListener(dealerMark, 'click', () => {
            this.dealerMap = true;
            this.map.setZoomAndCenter(6, [114.30525, 30.59276]);
            this.map.remove(this.dealerMarkerList);
            if (!flag) {
              if (row.dealerName) {
                let params = {
                  dealerId: row.dealerId,
                  status: status
                };
                dealerDetail(params, res => {
                  //  console.log(res);
                  this.dealerTotalMarker(res, sta);
                }, ret => {
                  if (this._hyTool.getStore('loginInfo', true)) {
                    this.$Notice.error({
                      title: '获取经销商车辆位置失败',
                      desc: ret
                    });
                  }
                });
              } else if (row.channelName) {
                let params = {
                  channel: row.channelName,
                  status: status
                };
                channelDetail(params, res => {
                   this.dealerTotalMarker(res, sta);
                }, ret => {
                  if (this._hyTool.getStore('loginInfo', true)) {
                    this.$Notice.error({
                      title: '获取平台车辆位置失败',
                      desc: ret
                    });
                  }
                });
              }
            } else {
               detailOfGbChannel({channel: row.channelName}, res => {
                   this.dealerTotalMarker(res, sta);
                }, ret => {
                  if (this._hyTool.getStore('loginInfo', true)) {
                    this.$Notice.error({
                      title: '获取平台车辆位置失败',
                      desc: ret
                    });
                  }
                });
            }
          });
        }
      },
      dealerTotalMarker (locList, status) {
        this.markers = [];
        let sys = [
          {
            url: '/static/images/drivingHome.png',
            anchor: new AMap.Pixel(6, 6),
            size: new AMap.Size(33, 23)
          },
          {
            url: '/static/images/charing2Home.png',
            anchor: new AMap.Pixel(4, 4),
            size: new AMap.Size(33, 23)
          },
          {
            url: '/static/images/offlineHome.png',
            anchor: new AMap.Pixel(4, 4),
            size: new AMap.Size(33, 23)
          },
          {
            url: '/static/images/onlineHome.png',
            anchor: new AMap.Pixel(3, 3),
            size: new AMap.Size(33, 23)
          }
        ];
        let citys = [];
        if (!this.markers.length) {
          if (status === 'total') {
            let style = 0;
            // let icon = null;
            for (let key in locList) {
              if (key === 'tbox:connections:driving') style = 0; // 行驶状态
              if (key === 'tbox:connections:charging') style = 1; // 充电状态
              if (key === 'tbox:connections:offline') style = 2;  // 离线状态
              if (key === 'tbox:connections:standby') style = 3;  // 待机状态
              if (key === 'tbox:connections:online') locList[key] = [];  // 待机状态
              locList[key].map(item => {
                let ln = this._hyTool.converAmap(item.lat, item.lng);
                let obj = {};
                // sys[style].rotation = 90 + Number(item.direction);
                obj.style = style;
                obj.lnglat = [ln.lon, ln.lat];
                obj.code = item.vin;
                citys.push(obj);
              });
            }
            this.mass = new AMap.MassMarks(citys, {
              // map: this.map,
              // opacity: 0.8,
              zIndex: 111,
              alwaysRender: false,
              cursor: 'pointer',
              style: sys
            });
            this.mass.setMap(this.map);
            this.markers.push(this.mass);
            this.mass.on('click', (e) => {
              let code = e.data.code;
              this._created(code, e.data);
            });
          } else if (status === 'offline') {
            for (let key in locList) {
              this.statusMarker(locList[key], '/static/images/offlineHome.png');
            }
          } else if (status === 'driving') {
            for (let key in locList) {
              this.statusMarker(locList[key], '/static/images/drivingHome.png');
            }
          } else if (status === 'charging') {
            for (let key in locList) {
              this.statusMarker(locList[key], '/static/images/charing2Home.png');
            }
          } else if (status === 'standby') {
            for (let key in locList) {
              this.statusMarker(locList[key], '/static/images/onlineHome.png');
            }
          }
        }
      },
      createDealerMarker (row, num, flag) {
        let count = 0;
        if (flag) count = row.gbCount;
        else {
          row.data.map(item => {
            if (num === item.status) {
              count = item.count;
            } else if (num === 'total') {
              if (item.status === 'tbox:connections:online') count += Number(item.count);
              if (item.status === 'tbox:connections:offline') count += Number(item.count);
              if (item.status === 'tbox:connections:exception') count += Number(item.count);
            }
          });
        }
        let div = document.createElement('div');
        if (count !== 0) {
          if (String(count).length >= 4) div.className = 'circle5';
          else if (String(count).length === 3) div.className = 'circle4';
          else if (String(count).length === 2) div.className = 'circle3';
          else if (String(count).length === 1) div.className = 'circle2';
          div.innerHTML = count || 0;
        }
        let marker = new AMap.Marker({
          content: div,
          // icon: '/static/images/new/main/province.png',
          // title: data.name,
          position: [116.407394, 39.904211],
          offset: new AMap.Pixel(-15, -15),
          zIndex: count
          // status: num
        });
        this.map.setCenter(marker.getPosition());
        if (count !== 0) {
          marker.setMap(this.map);
        }
        //  marker.subMarkers = [];
        //  if (data.areaCode) {
        //    marker.cityCode = data.areaCode;
        //  }
        return marker;
      },
      // 行政区域
      dealerTotal (row, e) {
        this.toggleRegion(row, 'total', e);
        let regionKey = [];
        regionKey.push({data: row}, {status: 'total'});
        this.regionStore = regionKey;
      },
      onlineTip (row, e) {
        this.toggleRegion(row, 'standby', e);
        let regionKey = [];
        regionKey.push({data: row}, {status: 'standby'});
        this.regionStore = regionKey;
      },
      offlineTip (row, e) {
        this.toggleRegion(row, 'offline', e);
        let regionKey = [];
        regionKey.push({data: row}, {status: 'offline'});
        this.regionStore = regionKey;
      },
      drivingTip (row, e) {
        this.toggleRegion(row, 'driving', e);
        let regionKey = [];
        regionKey.push({data: row}, {status: 'driving'});
        this.regionStore = regionKey;
      },
      charingTip (row, e) {
        this.toggleRegion(row, 'charging', e);
        let regionKey = [];
        regionKey.push({data: row}, {status: 'charging'});
        this.regionStore = regionKey;
      },
      toggleRegion (row, status, e) {
        this.fixmap = false;
        this.dealerMap = false;
        this.fixTotal = ''; this.fixOn = ''; this.fixDrving = ''; this.fixCharing = ''; this.fixStand = ''; this.fixOff = ''; this.fixError = '';
        this.map.clearMap();
        this.regionMap = true;
        if (this.mass !== null) {
          this.mass.clear();
        }
        this.map.remove(this.cityIconList);
        this.map.remove(this.countryList);
        this.map.remove(this.provinceList);
        this.map.remove(this.regionMarkerList);
        $('td span').css('border', '0px solid white');
        $(e.target).css({'border': '1px solid blue', 'border-radius': '5px'});
        if (this.infoWindow) {
          this.map.clearInfoWindow();
          this.end();
        }
        this.map.setZoomAndCenter(4, [114.30525, 36.59276]);
        this.regionMarkerList = [];
        // 添加点标记，并使用自己的icon
        if (!this.regionMarkerList.length) {
          let regionMark = this.createMarker(row, false, status);
          this.regionMarkerList.push(regionMark);
          AMap.event.addListener(regionMark, 'click', this.clickRegionCity);
          // () => {
          //     this.map.clearMap();
          //     this.regionMap = true;
          //     this.map.setZoomAndCenter(8, row.center);
          //     this.map.remove(this.regionMarkerList);
          //     this.campareCity(row.areaCode, status);
          // }
          // this.clickRegionCity(row, status);
        }
      },
      clickRegionCity (e) {
        let target = e.target;
        // this.markers = [];
        // this.regionMarkerList = [];
        this.map.clearMap();
        this.map.setZoomAndCenter(8, target.row.center);
        this.map.remove(this.regionMarkerList);
      },
      getDate () {
        this.dataPie.echart = echarts.init(document.getElementById('dataPie'));// 初始化报警类型统计图
        this.barGraph.echart = echarts.init(document.getElementById('barGraph'));// 初始化报警类型统计图
        // 报警类型统计
        this.dataPie.option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: [
            '#76F497',
            '#58C4F7',
            '#F0B241',
            '#E65751',
            '#79649C',
            '#00FFB3',
            '#FAFD54'
          ],
          legend: {
            type: 'scroll',
            orient: 'vertical',
            selectedMode: false,
            right: '28%',
            top: 90,
            bottom: 20,
            data: []
          },
          calculable: true,
          series: [
            {
              name: '报警类型',
              type: 'pie',
              center: ['18%', '50%'],
              radius: ['50%', '70%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                    position: 'inner'
                  },
                  labelLine: {
                    show: false
                  }
                }
                // emphasis: {
                //     label: {
                //         show: true,
                //         position: 'center',
                //         textStyle: {
                //             fontSize: '20',
                //             fontWeight: 'bold'
                //         }
                //     }
                // }
              },
              data: []
            }
          ]
        };
        this.dataPie.echart.setOption(this.dataPie.option);
        // 30日报警车辆
        this.barGraph.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: [
            {
              data: [],
              axisLabel: {
                formatter: function (value, idx) {
                  var date = new Date(value);
                  return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
                }
              },
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              axisLabel: {
                formatter: function (val) {
                  return val;
                }
              },
              boundaryGap: [0, '50%'],
              //   splitNumber: 2,
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: '报警车辆',
              type: 'line',
              smooth: true,
              data: [],
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6A8CE3'
                  }, {
                    offset: 1,
                    color: '#D5DFF8'
                  }])
                }
              },
              itemStyle: {
                normal: {
                  color: '#5178DF',
                  barBorderColor: '#5178DF'
                }
              }
            }
          ]
        };
        this.barGraph.echart.setOption(this.barGraph.option);
      },
      // 初始化地图
      init () {
        this.map = new AMap.Map('homeMap', {
          resizeEnable: true,
          center: [114.30525, 36.59276], // 地图中心点
          zoom: 4  // 地图显示的缩放级别
        });
        //  this.map.plugin(['AMap.ToolBar'], () => {
        //     var tool = new AMap.ToolBar({
        //       position: 'LB',
        //       liteStyle: true
        //     });
        //     this.map.addControl(tool);
        // });
        AMap.event.addListener(this.map, 'zoomend', this._onZoomEnd);
        this.positionClick();
      },
      // 获取图形数据
      getPieData () {
        alarmVehicle({}, res => {
          res.map(item => {
            let key = {};
            key.value = item.count;
            key.date = this._hyTool.DateFormat(new Date(+item.statsDate), 'yyyy-MM-dd');
            this.graphData.push(key);
          });
          this.barGraph.echart.setOption({
            xAxis: [{data: this.graphData.map(function (item) {
                return item.date;
              })}],
            series: [{data: this.graphData.map(function (item) {
                return item.value;
              })}]
          });
        }, ret => {
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询报警车辆失败',
              desc: ret
            });
          }
        });
        alarmType({}, res => {
          // console.log(newArray);
          let otherCount = 0;
          if (res.length > 6) {
            // let otherCount = 0;
            let newArray = res.slice(6, res.length);
            newArray.map(item => {
              otherCount += item.count;
            });
          };
          res.slice(0, 7).map(item => {
            let alarm = {};
            alarm.value = item.count;
            if (item.alarmContent.length > 16) {
              alarm.name = item.alarmContent.substring(0, 16) + '...' + ' ' + alarm.value + '次';
            } else {
              alarm.name = item.alarmContent + ' ' + alarm.value + '次';
            }
            this.alarmTypeData.push(alarm);
            this.alarmTypeData.map(item => {
              if (this.alarmTypeData.indexOf(item) === 6) {
                alarm.value = otherCount;
                alarm.name = '其它' + ' ' + alarm.value + '次';
              }
            });
            this.typeData.push(alarm.name);
          });
          // console.log(this.alarmTypeData);
          this.dataPie.echart.setOption({
            legend: [{data: this.typeData}],
            series: [{data: this.alarmTypeData}]
          });
        }, ret => {
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询报警类型统计列表失败',
              desc: ret
            });
          }
        });
      },
      // 获取数据排名
      getRankData () {
        rankList({}, rankRes => {
          rankRes.map(it => {
            it.mileage = Math.floor(it.mileage);
            return rankRes;
          });
          this.rankList = rankRes;
        }, ret => {
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询总里程失败',
              desc: ret
            });
          }
        });
        rankToday({}, res => {
          res.map(ite => {
            ite.todayMileage = Math.floor(ite.todayMileage);
            return res;
          });
          this.rankToday = res;
        }, ret => {
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询今日里程排名失败',
              desc: ret
            });
          }
        });
        alarmTimesRank({}, res => {
          this.alarmTimesRank = res;
        }, ret => {
          this.loading = false;
          if (this._hyTool.getStore('loginInfo', true)) {
            this.$Notice.error({
              title: '查询报警次数统计失败',
              desc: ret
            });
          }
        });
      },
      positionClick () {
        this.fixmap = true;
        AMap.event.addDomListener(document.getElementById('total'), 'click', () => { this.watchPosition('total'); }, false);
        AMap.event.addDomListener(document.getElementById('error'), 'click', () => { this.watchPosition('error'); }, false);
        AMap.event.addDomListener(document.getElementById('driving'), 'click', () => { this.watchPosition('driving'); }, false);
        AMap.event.addDomListener(document.getElementById('standBy'), 'click', () => { this.watchPosition('standBy'); }, false);
        AMap.event.addDomListener(document.getElementById('online'), 'click', () => { this.watchPosition('online'); }, false);
        AMap.event.addDomListener(document.getElementById('offline'), 'click', () => { this.watchPosition('offline'); }, false);
        AMap.event.addDomListener(document.getElementById('charging'), 'click', () => { this.watchPosition('charging'); }, false);
      },
      watchPosition (ev) {
        this.fixTotal = '';
        this.fixOn = '';
        this.fixDrving = '';
        this.fixCharing = '';
        this.fixStand = '';
        this.fixOff = '';
        this.fixError = '';
        if (ev === 'charging') {
           this.fixCharing = 'fixmap';
           this.toggleEach('charging', this.heatData.charging.data, this.heatData.charging.max);
        } else if (ev === 'offline') {
           this.fixOff = 'fixmap';
           this.toggleEach('offline', this.heatData.offline.data, this.heatData.offline.max);
        } else if (ev === 'online') {
           this.fixOn = 'fixmap';
           this.toggleEach('online', this.heatData.online.data, this.heatData.online.max);
        } else if (ev === 'standBy') {
           this.fixStand = 'fixmap';
           this.toggleEach('standby', this.heatData.standby.data, this.heatData.standby.max);
        } else if (ev === 'driving') {
           this.fixDrving = 'fixmap';
           this.toggleEach('driving', this.heatData.driving.data, this.heatData.driving.max);
        } else if (ev === 'error') {
           this.fixError = 'fixmap';
           this.toggleEach('error', this.errorPoints);
        } else if (ev === 'total') {
           this.fixTotal = 'fixmap';
           this.toggleEach('total', this.heatData.all.data, this.heatData.all.max);
        }
      },
      // 信息窗体
      _createdWindow (e) {
        AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
          this.infoWindow = new SimpleInfoWindow({
            infoTitle: `<div class="detailCar">车辆信息</div>`,
            infoBody: `<div class="hy-drivingCar">
                      <div><p>车架号：</p><span>${e.code}</span></div>
                      <div><p>车速：</p><span>${isNaN(this.speedGauge) ? this.speedGauge : (this.speedGauge === '' ? '--' : (this.speedGauge + 'km/h'))}</span></div>
                      <div><p>SOC：</p><span>${isNaN(this.socGauge) ? this.socGauge : (this.socGauge === '' ? '--' : (this.socGauge + '%'))}</span></div>
                      <div><p>GPRS：</p><span>${this.gprsCode}</span></div>
                      <div><p>采集时间：</p><span>${this.collectTime}</span></div>
                      <div class="lastDiv"><a href="#"  onclick="javascript:;">详情 >></a></div>
                    <div>`,
            // 基点指向marker的头部位置
            offset: new AMap.Pixel(10, -15),
            closeWhenClickMap: true,
            showShadow: true
          });
          this.infoWindow.get$InfoBody().on('click', '.lastDiv', (event) => {
            // 阻止冒泡
            event.stopPropagation();
            this.$router.push({path: '/main/monitor/realMonitor', query: {vin: e.code}});
          });
          this.infoWindow.open(this.map, e.lnglat);
          this.map.on('zoomchange', (ev) => {
            if (this.map.getZoom() < 10) {
              this.map.clearInfoWindow();
            }
          });
        });
      },
      // 海量点
      totalMarker (locList, status) {
        this.markers = [];
        let sys = [
          {
            url: '/static/images/drivingHome.png',
            anchor: new AMap.Pixel(6, 6),
            size: new AMap.Size(33, 23)
          },
          {
            url: '/static/images/charing2Home.png',
            anchor: new AMap.Pixel(4, 4),
            size: new AMap.Size(33, 23)
          },
          {
            url: '/static/images/offlineHome.png',
            anchor: new AMap.Pixel(4, 4),
            size: new AMap.Size(33, 23)
          },
          {
            url: '/static/images/onlineHome.png',
            anchor: new AMap.Pixel(3, 3),
            size: new AMap.Size(33, 23)
          }
        ];
        let citys = [];
        if (!this.markers.length) {
          if (status === 'total') {
            let style = 0;
            // let icon = null;
            locList.map(item => {
              if (item.status === 'tbox:connections:driving') style = 0; // 行驶状态
              if (item.status === 'tbox:connections:charging') style = 1; // 充电状态
              if (item.status === 'tbox:connections:offline') style = 2;  // 离线状态
              if (item.status === 'tbox:connections:standby') style = 3;  // 待机状态
              if (item.status === 'tbox:connections:online') {
                item.positions = [];
              };  // 待机状态
              item.positions.map(item => {
                let ln = this._hyTool.converAmap(item.lat, item.lng);
                let obj = {};
                //  sys[style].rotation = 90 + Number(item.direction);
                obj.style = style;
                obj.lnglat = [ln.lon, ln.lat];
                obj.code = item.vin;
                citys.push(obj);
              });
            });
            this.mass = new AMap.MassMarks(citys, {
              // map: this.map,
              // opacity: 0.8,
              zIndex: 111,
              alwaysRender: false,
              cursor: 'pointer',
              style: sys
            });
            this.mass.setMap(this.map);
            this.markers.push(this.mass);
            this.mass.on('click', (e) => {
              let code = e.data.code;
              this._created(code, e.data);
            });
          } else if (status === 'online') {
            locList.map(item => {
              if (item.status === 'tbox:connections:driving') {
                this.statusMarker(item.positions, '/static/images/drivingHome.png');
              }
              if (item.status === 'tbox:connections:charging') {
                this.statusMarker(item.positions, '/static/images/charing2Home.png');
              }
              if (item.status === 'tbox:connections:standby') {
                this.statusMarker(item.positions, '/static/images/onlineHome.png');
              }
            });
          } else if (status === 'offline') {
            locList.map(item => {
              if (item.status === 'tbox:connections:offline') {
                this.statusMarker(item.positions, '/static/images/offlineHome.png');
              }
            });
          } else if (status === 'driving') {
            locList.map(item => {
              if (item.status === 'tbox:connections:driving') {
                this.statusMarker(item.positions, '/static/images/drivingHome.png');
              }
            });
          } else if (status === 'charging') {
            locList.map(item => {
              if (item.status === 'tbox:connections:charging') {
                this.statusMarker(item.positions, '/static/images/charing2Home.png');
              }
            });
          } else if (status === 'standby') {
            locList.map(item => {
              if (item.status === 'tbox:connections:standby') {
                this.statusMarker(item.positions, '/static/images/onlineHome.png');
              }
            });
          }
        }
        if (citys.length < 100) {
          //  console.log(123);
          //   this.map.setZoom(11);
          // this.map.setZoomAndCenter(12, [this.markers[0].G.position.lng, this.markers[0].G.position.lat]);
        }
      },
      statusMarker (positions, stauts) {
        let sy = [
          {
            url: stauts,
            anchor: new AMap.Pixel(6, 6),
            size: new AMap.Size(33, 23)
          }
        ];
        let styl = 0;
        let citys = [];
        positions.map(ite => {
          let ln = this._hyTool.converAmap(ite.lat, ite.lng);
          let ob = {};
          // sy[styl].rotation = 90 + Number(ite.direction);
          ob.styl = styl;
          ob.lnglat = [ln.lon, ln.lat];
          ob.code = ite.vin;
          citys.push(ob);
        });
        this.mass = new AMap.MassMarks(citys, {
          // map: this.map,
          // opacity: 0.8,
          zIndex: 111,
          alwaysRender: false,
          cursor: 'pointer',
          style: sy
        });
        this.mass.setMap(this.map);
        this.markers.push(this.mass);
        this.mass.on('click', (e) => {
          let code = e.data.code;
          this._created(code, e.data);
        });
      },
      _created (vinCode, e) {
        if (this.socket) {
          this.end();
        }
        if ('WebSocket' in window) {
          this.socketNum = 0;
          let loginInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
          this.socket = new WebSocket(`${this.latestVehicleSocketUrl}${vinCode}&userId=${loginInfo.id}&type=${1}&timestamp=${new Date().getTime()}`);
          // console.log(this.socket);
        } else {
          alert('Not support websocket');
        }
        this.socket.onerror = event => {
          this.onError(event);
        };
        this.socket.onopen = event => {
          this.onOpen(event);
        };
        this.socket.onmessage = event => {
          this.onMessage(event, e);
        };
      },
      start () {
        this.socket.send('hello');
        return false;
      },
      onMessage (event, e) {
        let obj = JSON.parse(event.data);
        this.socketNum = this.socketNum + 1;
        // console.log(obj);
        // 车辆定位信息
        // 三期 d3
        if (obj.commProtocolVersion === 0) {
          if (obj.overview) {
           for (let i in obj.overview) {
              obj.overview[i] = obj.overview[i] === -1 ? '异常' : (obj.overview[i] === -2 ? '无效' : obj.overview[i]);
              obj.overview[i] = obj.overview[i] === -8000 ? '异常' : (obj.overview[i] === -9000 ? '无效' : obj.overview[i]);
            }
        }
        }
        if (obj.commProtocolVersion === 0 && obj.matrixVersion === 0) {
          this.$set(this, 'onData', obj);
          this.gprsCode = obj.position.gprsCode;
          this.collectTime = this._hyTool.DateFormat(new Date(+obj.position.collectTime), 'yyyy-MM-dd hh:mm:ss');
          this.socGauge = obj.overview ? this.onData.overview.soc ? (this.onData.overview.soc === '无效' || this.onData.overview.soc === '异常') ? this.onData.overview.soc : this.onData.overview.soc : 0 : 0;
          this.speedGauge = obj.overview ? this.onData.overview.vehicleSpeed ? (this.onData.overview.vehicleSpeed === '无效' || this.onData.overview.vehicleSpeed === '异常') ? this.onData.overview.vehicleSpeed : this.onData.overview.vehicleSpeed : 0 : 0;
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
          if (this.onData.commProtocolVersion === 1) {
              this.socGauge = this.onData.bms ? this.onData.bms.soc : 0;
              this.speedGauge = this.onData.vms ? this.onData.vms.speed : 0;
          } else {
              this.socGauge = this.onData.overview ? this.onData.overview.soc ? (this.onData.overview.soc === '无效' || this.onData.overview.soc === '异常') ? this.onData.overview.soc : this.onData.overview.soc : 0 : 0;
              this.speedGauge = this.onData.overview ? this.onData.overview.vehicleSpeed ? (this.onData.overview.vehicleSpeed === '无效' || this.onData.overview.vehicleSpeed === '异常') ? this.onData.overview.vehicleSpeed : this.onData.overview.vehicleSpeed : 0 : 0;
          }
          if (this.onData.bcm && this.onData.position) {   // 第一次获取
            this.gprsCode = this.onData.position.gprsCode;
            this.collectTime = this._hyTool.DateFormat(new Date(+this.onData.position.collectTime), 'yyyy-MM-dd hh:mm:ss');
          } else if (this.onData.bcm && !this.onData.position) {  // 只推送的can
            this.gprsCode = this.onData.bcm.gprsCode;
            this.collectTime = this._hyTool.DateFormat(new Date(+this.onData.bcm.collectTime), 'yyyy-MM-dd hh:mm:ss');
          } else if (!this.onData.bcm && this.onData.position) {   // 只推送地理位置
            this.gprsCode = this.onData.position.gprsCode;
            this.collectTime = this._hyTool.DateFormat(new Date(+this.onData.position.collectTime), 'yyyy-MM-dd hh:mm:ss');
          }
        }
        // 地图 ------end-------------------------------
        // 三期
        // if (this.onData.commProtocolVersion === 0 && !(this.onData.overview && this.onData.position)) {
        //   return;
        // }
        // // 二期
        // if (this.onData.commProtocolVersion === 1 && !this.onData.bms) {
        //   return;
        // }
        this._createdWindow(e);
      },
      onOpen (event) {
        // console.log('onOpen:' + event);
      },
      end () {
        this.socket.close();
      },
      onError () {
        // this.loading = false;
      }
    }
  };
</script>
