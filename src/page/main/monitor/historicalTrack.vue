/**
* 作者：szh
* 时间：2018-01-11
* 描述：历史轨迹
**/
<style lang="scss" scoped>
  @import 'src/styles/mixins';
  .export{
    background-color:#E6EDFD;
    width:93px;
    height:32px;
    font-size:16px;
    padding:4px 30px 9px 30px;
    border: 1px solid #4A79EF;
    color:#4A79EF ;
  }
  .export:hover{
    background-color:#E6EDFD;
    color:#4A79EF ;
    border: 1px solid #4A79EF;
  }
  .hy_search {
    //  margin-top: 25px;
    //  margin-bottom: -100px;
    //  position: absolute;
    //  z-index: 1000;
    //  width: 100%;
    //  margin-left: 15%;
    .hy_print {
      border:none;
      background: #e9f5f8;
      color: #6486d6;
    }
  }
  .map_card {
    position: absolute;
    z-index: 99;
    right: 2%;
    top: 20%;
    p {
      height: 30px;
      line-height:30px;
    }
  }
  .map {
    margin-top: -50px;
    z-index: 10;
    min-height: 460px;
    height: 75%;
  }
  .RadioGroup {
    height:120px;
    width:100%;
    overflow-y:scroll;
    .circleSpan {
      position:relative;
      &:before {
        content:'';
        display:inline-block;
        width:10px;
        height:10px;
        border-radius:50px;
        border:1px solid gray;
        margin: 0 10px;
      }
      &:after {
        position:absolute;
        content:'';
        height:20px;
        top: 11px;
        left: 15px;
        border-right:1px solid gray;
      }
    }
    .normal{
      .circleSpan:before{
        background-color:#4A85FF !important
      }
    }
  }
  .tool-bar {
    position: absolute;
    z-index: 999;
    left: 40%;
    bottom: 30px;
    // left: 40%;
    // bottom:20%;
    //  margin-top: -128px;
    li {
      width: 32px;
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      text-align: center;
      background: #5FADE3;
      float: left;
      margin-left: 10px;
      box-shadow: 2px 2px 3px #A7B0B6;
      border-radius: 4px;
      position: relative;
      .play {
        display: inline-block;
        position: absolute;
        top: 1px;
        left: 7px;
      }
      .parse {
        display: inline-block;
        position: absolute;
        top: 2px;
        left: 7px;
      }
      &:active{
        box-shadow: inset 2px 2px 3px #A7B0B6;
      }
      &.noClick {
        margin-left: 0;
        background: rgb(253, 249, 249);
        border-radius: 0;
        width: 50px;
        color: #777777;
        cursor: default;
        user-select: none;
      }
      &.noClick:active {
        box-shadow: 2px 2px 3px #A7B0B6;
      }
      &.reduce {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }
      &.add {
        margin-left: 0;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }
  }
  .move_ball {
    position: absolute;
    z-index: 99;
    display: inline-block;
    top: 0;
    right: 0;
    padding: 5px;
    font-size: 12px;
    color: #5FADE3;
  }
  // 动画
  .slide-down-enter-active, .slide-down-leave-active {
    transition: all 0.8s;
  }
  .slide-down-enter, .slide-down-leave-to {
    opacity: 0;
  }
  .slide-down-enter {
    transform: translateY(30px);
  }
  .slide-down-leave-to {
    transform: translateY(-30px);
  }
  .slide-up-enter-active, .slide-up-leave-active {
    transition: all 0.8s;
  }
  .slide-up-enter, .slide-up-leave-to {
    opacity: 0;
  }
  .slide-up-enter {
    transform: translateY(-50px);
  }
  .content {
    padding: 0;
    overflow: auto;
  }
  .userCenter {
    margin-bottom: 0;
    border-bottom: none;
    position: relative;
    left: 14%;
    top: 5%;
    z-index: 1000;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: 50px;margin-left: 10px;padding:0;">
        <Form label-position="right" class="hy_search" inline>
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
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.positionTimeBegin" placement="bottom-end" placeholder="开始时间" :clearable="false" :editable="false"></DatePicker>
          </FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.positionTimeEnd" placement="bottom-end" placeholder="结束时间" :clearable="false" :editable="false"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" @click="search" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <Button type="primary"  @click="openExport" shape="circle"
                  style="margin-left: 10px;margin-top: 1px;font-size:16px" class="export">打印
          </Button>
        </Form>
      </div>
      <div class="map" id="pathMap">
        <Card class="map_card" v-if="vehicleData.vinCode" >
          <p style="font-size:16px;color:#000000;">轨迹信息</p>
          <p>VIN码：{{vehicleData.vinCode}}</p>
          <p>车型：{{vehicleData.carType}}</p>
          <p>车牌：{{vehicleData.plateNo}}</p>
          <p v-show="vehicleData.commProtocolVersion === 0">速度：{{vehicleData.speed}} km/h</p>
          <!--<p>方向：{{vehicleData.direction | direction}}</p>-->
          <p>时间：{{vehicleData.collectTime | formatTime}}</p>
          <div v-if ="showTime">
            <RadioGroup  vertical v-model="timeClick" class="RadioGroup" @on-change="contrast">
              <Radio :label="index"  v-for="(item, index) in timeList" :key="index" :class="{normal: changeColor === index}" >
                <span>{{item.first.split(' ')[0]}}</span>
                <span class="circleSpan" >{{item.first.split(' ')[1]}}</span> -
                <span>{{item.last}}</span>
              </Radio>
            </RadioGroup>
            <span style="margin-top:5px;color:blue;font-size:12px;cursor:pointer" @click="reset">重置</span>
          </div>
        </Card>
        <transition name="slide-up">
          <ul class="tool-bar clearfix" v-show="location.position && location.position.length">
            <el-tooltip class="item" effect="dark" :content="content" placement="bottom">
              <li @click="plays()">
                <transition name="slide-down">
                  <hy-handler type="bofang" v-if="!isPlay" key="play" class="play" color="#FFF" size="20"></hy-handler>
                  <hy-handler type="zanting" v-else key="parse" class="parse" color="#FFF" size="20"></hy-handler>
                </transition>
              </li>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="停止" placement="bottom">
              <li @click="stop()">
                <hy-handler type="yitingzhi" color="#FFF" size="20"></hy-handler>
              </li>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="减少" placement="bottom">
              <li class="reduce" @click="reduce">
                <hy-handler type="houtui" color="#FFF" size="13"></hy-handler>
              </li>
            </el-tooltip>
            <li class="noClick">
              x
              <span>{{speed}}</span>
            </li>
            <el-tooltip class="item" effect="dark" content="增加" placement="bottom">
              <li class="add" @click="add">
                <hy-handler type="qianjin" color="#FFF" size="13"></hy-handler>
              </li>
            </el-tooltip>
          </ul>
        </transition>
      </div>
      <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item, index) in showMove" :key="index">
                  <span class="move_ball" v-if="item">
                      {{speedValue}}
                  </span>
      </transition>
      <alarm-modal v-if="vehicleData.commProtocolVersion !== 1" :data="alarmDetailData"></alarm-modal>
    </div>
  </div>
</template>

<script>
  import AMap from 'AMap';
  import { currentDetail } from '@/service/alarmService/nationalStandard';
  import alarmModal from '@/components/alarmDetail/alarmModal';
  import hyHandler from '@/components/common/icon/handler';
  import { vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  import { locationList } from '@/service/monitor/historicalTack';
  import fixAMAP from '@/js/core/utils/fixAMAP09';
  import { mapMutations } from 'vuex';
  import date from '@/js/mixins/date';
  import storeVin from '@/js/mixins/storeVin/storeVin';

  export default {
    mixins: [date, storeVin],
    components: {
      hyHandler,
      alarmModal
    },
    data () {
      return {
        timeClick: null,  // 点击时间段
        changeColor: null,
        warnTip: 'warn',
        positionData: {},
        vehicleData: {
          commProtocolVersion: 0
        },
        alarmDetailData: {},
        arrayPoint: [],     // 整段数据
        location: [],        // 轨迹数据
        storeHole: [],
        part: [],        // 分段数据
        showTime: false,        // 展示时间
        showMove: [],        // 动画
        timeList: [],
        speed: '1.0',
        searchData: {
          vinCode: '',
          positionTimeBegin: new Date(+new Date() - 86400 * 1000),
          positionTimeEnd: new Date()
        },
        loading: false,
        isPlay: false,       // 是否播放
        isStart: true,       // 是否从开头开始播放
        map: null,
        runLength: 0
      };
    },
    computed: {
      content () {
        if (this.isPlay) {
          return '暂停';
        } else {
          return '开始';
        }
      }
    },
    created () {
      let vin = this.$route.query.vin;
      if (vin) {
        this.searchData.vinCode = vin;
        this.getVehicle(vin, true);
      }
    },
    mounted () {
      this._initMap();
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      ...mapMutations([
        'PRINT_DATA'
      ]),
      _initMap () {
        this.map = new AMap.Map('pathMap', {
          resizeEnable: true
        });
      },
      // 重置
      reset () {
        this.timeClick = null;
        this.changeColor = null;
        this.location = this.storeHole;
        this.vehicleData.collectTime = this.location.data[0].collectTime;
        this.vehicleData.speed = this.location.data[0].speed;
        this.stop();
        this.initPolyline();
        this.map.setFitView();
      },
      contrast (index) {
        this.stop();
        this.changeColor = index;
        this.part.sort((a, b) => {
          return a[0].Num - b[0].Num;
        });
        this.location = this.locationFormat(this.part[index]);
        this.initPolyline(true);
      },
      // 清除地图
      clearMap () {
        this.map.clearMap();
        this.showMove = [];        // 动画
        this.speed = '1.0';        // 速度
        this.isPlay = false;       // 是否播放
        this.isStart = true;       // 是否从开头开始播放
      },
      // 初始化轨迹
      initPolyline (flag) {
        this.refreshShow = false;
        this.clearMap();
        let marker = this.marker = new AMap.Marker({
          map: this.map,
          position: this.location.position[0],
          icon: '/static/images/car.png',
          offset: new AMap.Pixel(-20, -11),
          autoRotation: true,
          angle: 90 + Number(this.location.data[0].direction)
        });

        /* eslint-disable no-new */
        new AMap.Marker({
          map: this.map,
          position: this.location.position[0],
          icon: '/static/images/start.png',
          offset: new AMap.Pixel(-10, -30),
          autoRotation: true
        });

        /* eslint-disable no-new */
        new AMap.Marker({
          map: this.map,
          position: this.location.position[this.location.position.length - 1],
          icon: '/static/images/end.png',
          offset: new AMap.Pixel(-13, -30),
          autoRotation: true
        });

        // 绘制轨迹
        /* eslint-disable no-new */
        new AMap.Polyline({
          map: this.map,
          zIndex: 50,
          path: this.location.position,
          strokeColor: '#6197fb',  // 线颜色
          strokeOpacity: 1,        // 线透明度
          showDir: true,
          strokeWeight: 5          // 线宽
        });
        if (flag) {
          //  fixAMAP.fixAmap(this.arrayPoint, 1, 1, (data) => {
          let path = this.storeHole;
          //   });
          /* eslint-disable no-new */
          new AMap.Polyline({
            map: this.map,
            zIndex: 20,
            path: path.position,
            strokeColor: 'gray',  // 线颜色
            strokeOpacity: 1,        // 线透明度
            showDir: true,
            strokeWeight: 5          // 线宽
          });
        }
        marker.on('moveend', () => {
          this.runLength++;
          if (this.runLength < this.location.position.length) {
            this.$set(this.vehicleData, 'speed', this.location.data[this.runLength - 1].speed ? this.location.data[this.runLength - 1].speed : 0);
            this.$set(this.vehicleData, 'direction', this.location.data[this.runLength - 1].direction ? this.location.data[this.runLength - 1].direction : null);
            this.$set(this.vehicleData, 'collectTime', this.location.data[this.runLength - 1].collectTime ? this.location.data[this.runLength - 1].collectTime : null);
            this.marker.moveTo(this.location.position[this.runLength], +this.speed * 100);
            //  this.map.setCenter(this.location.position[this.runLength]);
          } else if (this.runLength === this.location.position.length) {
            this.$set(this.vehicleData, 'speed', this.location.data[this.runLength - 1].speed ? this.location.data[this.runLength - 1].speed : 0);
            this.$set(this.vehicleData, 'direction', this.location.data[this.runLength - 1].direction ? this.location.data[this.runLength - 1].direction : null);
            this.$set(this.vehicleData, 'collectTime', this.location.data[this.runLength - 1].collectTime ? this.location.data[this.runLength - 1].collectTime : null);
            this.stop();
          } else {
            this.stop();
          }
        });
      },
      // 去除数组相邻的重复数据
      removalDuplicate (arr) {
        let [arrays, data, list] = [[], [], {}];
        let t = 0;
        for (let i = 0; i < arr.position.length; i++) {
          if (i === 0 || (Number.parseFloat(arr.position[i][0]).toFixed(4) !== Number.parseFloat(arr.position[i - 1][0]).toFixed(4) || Number.parseFloat(arr.position[i][1]).toFixed(4) !== Number.parseFloat(arr.position[i - 1][1]).toFixed(4))) {
            arrays[t] = arr.position[i];
            data[t] = arr.data[i];
            t++;
          }
        }
        list = {
          position: arrays,
          data: data
        };
        return list;
      },
      // 轨迹数据格式化
      locationFormat (arr) {
        let temp = [];
        let data = [];
        arr.forEach(item => {
          if (item.longitude && item.latitude) {
            temp.push([Number.parseFloat(item.longitude).toFixed(6), Number.parseFloat(item.latitude).toFixed(6)]);
            data.push({
              vinCode: item.vinCode,
              carSeries: item.carSeries,
              speed: item.speed,
              direction: item.direction,
              collectTime: item.collectTime,
              lng: Number.parseFloat(item.longitude).toFixed(6),
              lat: Number.parseFloat(item.latitude).toFixed(6)
            });
          }
        });
        let tems = {
          position: temp,
          data: data
        };
        let datas = this.removalDuplicate(tems);
        return datas;
      },
      search () {
        this.timeClick = null;
        this.changeColor = null;
        let searchData = {};
        if (!this.searchData.vinCode) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        searchData.vinCode = this.searchData.vinCode;
        if (this.searchData.positionTimeBegin) {
          searchData.positionTimeBegin = new Date(this.searchData.positionTimeBegin.setMilliseconds(0)).getTime();
        } else {
          if (this.isFirst) return;
          this.$Notice.warning({
            title: '请选择开始时间',
            desc: '',
            onClose: () => {
              this.isFirst = false;
            }
          });
          this.isFirst = true;
          return;
        }
        if (this.searchData.positionTimeEnd) {
          searchData.positionTimeEnd = new Date(this.searchData.positionTimeEnd.setMilliseconds(0)).getTime();
        } else {
          if (this.isFirst) return;
          this.$Notice.warning({
            title: '请选择结束时间',
            desc: '',
            onClose: () => {
              this.isFirst = false;
            }
          });
          this.isFirst = true;
          return;
        }
        if (searchData.positionTimeBegin >= searchData.positionTimeEnd) {
          if (this.isFirst) return;
          this.$Notice.warning({
            title: '开始时间不能大于或等于结束时间',
            desc: '',
            onClose: () => {
              this.isFirst = false;
            }
          });
          this.isFirst = true;
          return;
        }
        let bol = this.checkDate(searchData.positionTimeBegin, searchData.positionTimeEnd, 3);
        if (!bol) {
          if (this.isFirst) return;
          this.$Notice.warning({
            title: '',
            desc: '开始时间与结束时间间隔不能超过三天',
            onClose: () => {
              this.isFirst = false;
            }
          });
          this.isFirst = true;
          return;
        }
        this.loading = true;
        this.refreshShow = true;
        if (this.isPlay) {
          this.stop();
        }
        this.clearMap();
        //  if (this.dragend) AMap.event.removeListener(this.dragend);
        //  if (this.zoomend) AMap.event.removeListener(this.zoomend);
        // 搜索轨迹数据
        locationList(searchData, res => {
          this.timeList = [];
          this.part = [];
          this.arrayPoint = res.all;
          if (res.part) {
            this.showTime = true;
            let num = 0;
            res.part.map(item => {
              item[0].Num = num;
              num++;
              let firstTime = this._hyTool.DateFormat(new Date(item[0].collectTime), 'MM-dd hh:mm');
              let lastTime = this._hyTool.DateFormat(new Date(item[item.length - 1].collectTime), 'hh:mm');
              this.timeList.push({first: firstTime, last: lastTime});
              fixAMAP.fixAmap(item, 1, 1, (data) => {
                this.part.push(item);
              });
            });
          } else {
            this.showTime = false;
          }
          this.loading = false;
          if (this.arrayPoint.length) {
            if (this.arrayPoint.length > 20000) {
              this.refreshShow = false;
              this.$confirm('轨迹过多，请缩短查询范围', '提示', {
                showConfirmButton: false,
                showCancelButton: false,
                type: 'warning'
              }).then(() => {
              }).catch(() => {
              });
              return;
            }
            let obj = {};
            if (this.vehicleData.commProtocolVersion) {
              obj = this._hyTool.extend([], this.vehicleData);
            }
            this.vehicleData = this.arrayPoint[0];
            if (obj.commProtocolVersion) this.vehicleData.commProtocolVersion = obj.commProtocolVersion;
            this.getVehicle(this.vehicleData.vinCode);
            // for (let item of this.carList) {
            //   if (item.vinCode === this.vehicleData.vinCode) {
            //     this.vehicleData.plateNo = item.plateNo;
            //     this.vehicleData.carType = item.carType;
            //     break;
            //   }
            // }
            this.printVehicle = {
              vin: searchData.vinCode,
              startTime: searchData.positionTimeBegin,
              endTime: searchData.positionTimeEnd
            };
            fixAMAP.fixAmap(this.arrayPoint, 1, 1, (data) => {
              this.storeHole = this.locationFormat(this.arrayPoint);
              this.location = this.storeHole;
              this.initPolyline();
              this.map.setFitView();
            });
          } else {
            this.refreshShow = false;
            this.location = [];
            this.vehicleData.vinCode = '';
            this.$confirm('该时间段未获取到车辆位置数据', '提示', {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
          }
        }, ret => {
          this.loading = false;
          let text = '查询失败';
          if (ret) text = ret;
          this.$confirm(text, '', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        });
        this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      plays () {
        this.isPlay = !this.isPlay;
        if (this.isPlay) {
          if (this.isStart && this.location.position.length > 1) {
            this.marker.setPosition(this.location.position[0]);
            this.vehicleData.collectTime = this.location.data[0].collectTime;
            this.vehicleData.speed = this.location.data[0].speed;
            this.runLength = 1;
            this.marker.moveTo(this.location.position[1], +this.speed * 100);
            // this.map.setCenter(this.location.position[0]);
            this.isStart = false;
          } else if (this.isStart && this.location.position.length === 1) {
            this.vehicleData.collectTime = this.location.data[0].collectTime;
            this.vehicleData.speed = this.location.data[0].speed;
            setTimeout(() => {
              this.stop();
            }, 2000);
          } else {
            //  this.marker.resumeMove();   // 继续点标记的动画效果
            this.marker.stopMove();
            this.marker.moveTo(this.location.position[this.runLength], +this.speed * 100);
          }
        } else {
          currentDetail({vin: this.searchData.vinCode, collectTime: this.vehicleData.collectTime}, res => {
            this.alarmDetailData = res;
          }, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '查询实时数据失败',
              desc: ret
            });
          });
          this.marker.pauseMove();    // 暂定点标记的动画效果
        }
      },
      // 增加速度
      add (ev) {
        if (this.speed >= 8.0) return;
        this.showMove.push(true);
        this.initMove('-30', '28');
        if (this.speed === '1.0') {
          this.speedValue = '+1.0';
          this.speed = (+this.speed + 1.0).toFixed(1);
        } else if (this.speed === '2.0') {
          this.speedValue = '+2.0';
          this.speed = (+this.speed + 2.0).toFixed(1);
        } else if (this.speed === '4.0') {
          this.speedValue = '+4.0';
          this.speed = (+this.speed + 4.0).toFixed(1);
        }
        //  this.addReduce = true;
      },
      // 减少速度
      reduce () {
        if (this.speed <= 1.0) return;
        this.showMove.push(true);
        this.initMove('-115', '28');
        if (this.speed === '8.0') {
          this.speedValue = '-4.0';
          this.speed = (+this.speed - 4.0).toFixed(1);
        } else if (this.speed === '4.0') {
          this.speedValue = '-2.0';
          this.speed = (+this.speed - 2.0).toFixed(1);
        } else if (this.speed === '2.0') {
          this.speedValue = '-1.0';
          this.speed = (+this.speed - 1.0).toFixed(1);
        }
        //  this.addReduce = true;
      },
      // 停止
      stop () {
        this.isPlay = false;
        this.isStart = true;
        this.marker.stopMove(); // 点标记停止动画
      },
      // 初始化动画
      initMove (elRight, elTop) {
        this.elRight = elRight;
        this.elTop = elTop;
      },
      // 进入开始
      beforeEnter (el) {
        el.style.transform = `translate3d(${this.elRight}px, ${this.elTop}px, 0)`;
        el.style.opacity = 1;
      },
      afterEnter (el) {
        el.style.transform = `translate3d(${this.elRight}px, ${this.elTop - 35}px, 0)`;
        el.style.transition = 'all 1s cubic-bezier(0.06, 0.32, 0.15, 0.69)';
        this.showMove = this.showMove.map(item => false);
        el.style.opacity = 0;
      },
      // 查询车辆
      getVehicle (vin, first) {
        vehicleListAll({vinCode: vin}, res => {
          if (first) {
            this.optionsVin = res.map(item => {
              return {value: item.vinCode, label: `【${item.vinCode}】【${!item.plateNo === true ? '无车主' : item.plateNo}】`};
            });
          }
          if (res.length > 0) {
            this.$set(this.vehicleData, 'plateNo', res[0].plateNo);
            this.$set(this.vehicleData, 'carType', res[0].carType);
            this.$set(this.vehicleData, 'commProtocolVersion', res[0].commProtocolVersion);
            this.printVehicle.placeNo = res[0].plateNo;
            this.printVehicle.carType = res[0].carType;
          } else {
            this.$Notice.warning({
              title: '车辆不存在'
            });
          }
        });
      },
      // 打印
      openExport () {
        if (!this.location.length && !this.location.position) {
          this.$Notice.warning({
            title: '无打印数据',
            desc: ''
          });
          return;
        }
        this.$confirm('确定打印吗？', '提示', {
          confirmButtonText: '打印',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = {
            position: this.location.position,
            vehicle: this.printVehicle
          };
          this.PRINT_DATA(data);
          this.$router.push('/printTrack');
        }).catch(() => {
        });
      }
    },
    filters: {
      direction (value) {
        if (!value) return '';
        if (value === 0 || value === 360) return '正北';
        else if (value > 0 && value <= 67.5) return `东北`;
        else if (value > 67.5 && value <= 90) return `东`;
        else if (value > 90 && value <= 157.5) return `东南`;
        else if (value > 157.5 && value <= 180) return `南`;
        else if (value > 180 && value <= 247.5) return `西南`;
        else if (value > 247.5 && value <= 270) return `西`;
        else if (value > 270 && value <= 359) return `西北`;
      }
    },
    watch: {
      'speed': function () {
        if (!this.isStart && this.isPlay) {
          this.marker.stopMove();
          this.marker.moveTo(this.location.position[this.runLength], +this.speed * 100);
        }
      }
    },
    beforeDestroy () {
      //  if (this.dragend) AMap.event.removeListener(this.dragend);
      //  if (this.zoomend) AMap.event.removeListener(this.zoomend);
    }
  };
</script>
