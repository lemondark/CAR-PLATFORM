/**
* 作者：szh
* 时间：2018-03-13
* 描述：历史轨迹打印
*/
<style type="text/css" media="print">
@page { size: landscape; }
</style>
<style lang="scss" scoped>
  .hy-main {
    position: relative;
    width: 100%;
    height: 100%;
    .hy-map {
      height: 100%;
      min-height: 500px;
      width: 100%;
      min-width: 500px;
    }
    .export, .search {
      position: absolute;
      z-index: 999;
      left: 5%;
      top: 5%;
    }
    .map_card {
      position: absolute;
      z-index: 99;
      right: 2%;
      top: 5%;
      p {
        height: 30px;
        line-height:30px;
      }
    }
  }
</style>
<template>
  <div class="hy-main" :style="styles">
    <Button type="info" shape="circle" v-go-back v-show="buttonShow"
            style="margin-left: 10px;margin-top: 1px;font-size:16px;background-color: #516AE5;" class="search">返回
    </Button>
    <Button type="primary" shape="circle" @click="openExport" v-show="buttonShow"
            style="margin-left: 130px;margin-top: 1px;font-size:16px" class="export">打印
    </Button>
    <Card class="map_card">
      <p style="font-size:16px;color:#000000;">轨迹信息</p>
      <p>VIN码：{{this.printData.vehicle.vin}}</p>
      <p>车型：{{this.printData.vehicle.carType}}</p>
      <p>车牌：{{this.printData.vehicle.placeNo}}</p>
      <p>开始时间：{{this.printData.vehicle.startTime | formatTime}}</p>
      <p>结束时间：{{this.printData.vehicle.endTime | formatTime}}</p>
    </Card>
    <div id="map" class="hy-map"></div>
  </div>
</template>
<script>
  import AMap from 'AMap';
  import { mapState, mapMutations } from 'vuex';

  export default {
    data () {
      return {
        buttonShow: true
      };
    },
    mounted () {
      this._initMap();
    },
    computed: {
      ...mapState([
        'printData'
      ]),
      styles () {
        return {
          width: `${document.body.offsetWidth}px`,
          height: `${document.body.offsetHeight}px`
        };
      }
    },
    methods: {
      ...mapMutations([
        'PRINT_DATA'
      ]),
      _initMap () {
        this.map = new AMap.Map('map', {
          resizeEnable: true
        });
      //  console.log(this.printData);
        if (this.printData.position.length > 0) {
          this.initPolyline();
        }
      },
      // 初始化轨迹
      initPolyline () {
        this.map.clearMap();

        /* eslint-disable no-new */
        new AMap.Marker({
          map: this.map,
          position: this.printData.position[0],
          icon: '/static/images/start.png',
          offset: new AMap.Pixel(-13, -30),
          autoRotation: true
        });

        /* eslint-disable no-new */
        new AMap.Marker({
          map: this.map,
          position: this.printData.position[this.printData.position.length - 1],
          icon: '/static/images/end.png',
          offset: new AMap.Pixel(-13, -30),
          autoRotation: true
        });

        // 绘制轨迹
        /* eslint-disable no-new */
        new AMap.Polyline({
          map: this.map,
          path: this.printData.position,
          strokeColor: '#6197fb',  // 线颜色
          strokeOpacity: 1,        // 线透明度
          strokeWeight: 5          // 线宽
        });
        this.map.setFitView();
      //  this.map.setZoom(12);
      },
      openExport () {
        this.buttonShow = false;
        setTimeout(() => {
             $('body')[0].style.zoom = 0.7;
            window.print();
        }, 500);
        setTimeout(() => {
          $('body')[0].style.zoom = 1;
          this.buttonShow = true;
        }, 1000);
      }
    },
    beforeDestroy () {
      this.PRINT_DATA({
        position: [],
        vehicle: {}
      });
    }
  };
</script>
