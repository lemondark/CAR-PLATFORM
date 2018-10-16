<style lang="scss" scoped>
  @import 'src/styles/vars';
  @import 'src/styles/mixins';

  .hy-main-box {
    @include wh(100%, 100%);
    position: relative;
    overflow: hidden;
    .hy-content-left {
      @include wh(auto, 95%);
      position: relative;
      transition: all 0.5s;
      margin: 0 0 0 0;
    //  padding-top: 53px;
      .hy-main {
        @include wh(auto, 100%);
     //   overflow: scroll;
        // margin: 10px auto;
      }
      footer{
       width: 100%;
       position:relative;
       height: 40px;
      //  text-align: center;
       background-color: $bgcolor;
       p{
           @include center();
        span{
         color: #A1A1A1;
       }
         span:first-child{
         margin-right: 20px;
       }
       }
     }
      &.hy-content-an {
        margin: 0 0 0 250px;
      }
    }
  }

  // 动画
  .slide-both-enter-active,
  .slide-both-leave-active {
    transition: all 0.3s;
  }

  .slide-both-enter {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }

  .slide-both-leave-to {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }

</style>
<template>
  <div class="hy-main-box">
    <!--导航-->
    <hy-new-header></hy-new-header>
    <!--<hy-new-menu></hy-new-menu>-->
    <hy-sidebar></hy-sidebar>
    <div class="hy-content-left" :style="{paddingLeft: sidebar_an?'105px':'209px'}">
      <!--头部-->
      <hy-header></hy-header>
      <!--内容部分-->
      <div class="hy-main">
        <router-view v-if="isIE"></router-view>
        <transition name="slide-both" mode="out-in" v-else>
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <div>
      <audio id="bgMusic">
        <source src="/static/images/tip2.aac" type="audio/mp3">
      </audio>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import hyHeader from '@/components/header/header';
  import hySidebar from '@/components/sidebar/sidebar';
  import HyNewHeader from '@/components/header/newHeader.vue';

  const prefixCls = 'hy-content';

  export default {
//    name: 'main',
    components: {
      HyNewHeader,
      hyHeader,
      hySidebar
    },
    data () {
      return {
        webSocket: null,
        socketNum: 0,
        isIE: false
      };
    },
    created () {
      // 识别 IE browser
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        this.isIE = true;
      } else {
        this.isIE = false;
      }
      // iview $Notice全局变量
      this.$Notice.config({
        top: 50,
        duration: 2.8
      });
      this.$store.commit('MENU_TREE', JSON.parse(this._hyTool.getStore('menuTree', true)));
      // 连接websocket
      if ('WebSocket' in window) {
        let loginInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
        if (loginInfo.alarmFlag === 1) {
        this.webSocket = new WebSocket(this.socketUrl + loginInfo.id + '&timestamp=' + new Date().getTime());
        // error
        this.webSocket.onerror = event => {
          this.onError(event);
        };
        // open
        this.webSocket.onopen = event => {
          this.onOpen(event);
        };
        // message
        this.webSocket.onmessage = event => {
          this.onMessage(event);
        };
        }
      } else {
        alert('Not support websocket');
      }
    },
    computed: {
      ...mapState([
        'sidebar_an',
        'socketList',
        'socketUrl',
        'alarmNum'
      ]),
      classes () {
        return {
          [`${prefixCls}-an`]: this.sidebar_an
        };
      }
    },
    methods: {
      ...mapMutations([
        'ALARM_NUM'
      ]),
      start () {
        this.webSocket.send('hello');
        return false;
      },
      onMessage (event) {
        // console.log(event.data);
        let obj = JSON.parse(event.data);
        this.$store.commit('SOCKET_LIST', obj);
        this.ALARM_NUM(Number(this.alarmNum) + 1);
        this.tipsOper(obj);
      },
      onOpen (event) {
      //  console.log('onOpen:' + event);
      },
      end () {
        this.websocket.onclose();
      },
      onError (event) {
        this.$Notice.error({
          title: 'websocket连接失败',
          desc: event
        });
      },
      // 提示方式操作
      tipsOper (obj) {
        // 报警弹框 一次最多显示5个
        if (this.socketNum >= 5) {
          this.timeOut();
          return;
        } else {
          this.socketNum = this.socketNum + 1;
        }
        if (obj.selfLevel) {
          obj.level = obj.selfLevel;
          obj.title = '自有故障';
        }
        if (obj.dbLevel) {
          obj.level = obj.dbLevel;
          obj.title = '地标';
        }
        if (obj.gbLevel) {
          obj.level = obj.gbLevel;
          obj.title = '国标';
        }
        obj.levelName = this.levelName(obj.level);
        let modeArray = this.alarmMode(obj.warnType);
        // 声音
        if (modeArray.find(val => val === '声音')) {
          let audio = document.getElementById('bgMusic');
          if (audio) audio.play();  //         播放(继续播放)
        }
        // 弹框
        if (modeArray.find(val => val === '弹框')) {
          let alarmContent = obj.warnData.alarmContent ? obj.warnData.alarmContent : '';
          let vin = obj.warnData.vin ? obj.warnData.vin : '';
          let startTime = obj.warnData.startTime ? this._hyTool.DateFormat(new Date(+obj.warnData.startTime), 'yyyy-MM-dd hh:mm:ss') : '';
          this.$Notice.warning({
            title: obj.title + obj.levelName,
            dangerouslyUseHTMLString: true,
            desc: 'VIN码：' + vin + '</br>' + '报警内容：' + alarmContent + '</br>' + '报警时间：' + startTime
          });
        }
      },
      timeOut () {
        setTimeout(() => {
          this.socketNum = 0;
        }, 3800);
      },
      // 解析提示方式
      alarmMode (data) {
        let array = [];
        let value = data.toString(2);
        if (Number(value[value.length - 1]) === 1) {
          array.push('声音');
        }
        if (Number(value[value.length - 2]) === 1) {
          array.push('弹框');
        }
        if (Number(value[value.length - 3]) === 1) {
          array.push('短信');
        }
        if (Number(value[value.length - 4]) === 1) {
          array.push('邮件');
        }
        return array;
      },
      levelName (data) {
        let str = '';
        if (data === 1) str = '一级报警';
        if (data === 2) str = '二级报警';
        if (data === 3) str = '三级报警';
        if (data === 4) str = '四级报警';
        return str;
      }
    },
    beforeDestroy () {
      if (this.webSocket) {
        this.webSocket.close();  // 关闭 websocket
      }
    }
  };
</script>
