/**
* 描述：头部
*/
<style lang="scss" scoped>
@import 'src/styles/mixins';
 @import 'src/styles/vars';
  .hy-new-head {
    background-color: white;
    color: white;
    a {
      color: #282B34;
      font-size:18px;
      margin: 0 10px 0 28px;
      cursor: default;
    }
    .hy--new-head-height {
      height: 64px;
      line-height: 64px
    }
  }
  .outer{
     height: 64px;
      position:relative;
      //  @include center();
      .inner{
         @include ct();
        width:200px;
        right:0;
        .ivu-tooltip-popper{
          top: -34px
        }
      }
  }
  .outerIcon{
    border:1px solid #E4E5E9;
    position:relative;
    cursor:pointer;
    width: 42px;
    margin-right:3%;
    // @include ct();
    line-height: 50px;
    height: 30px;
    float:right;
    @include borderRadius(9999px);
    background-color:$bgcolor;
    .icon{
     //@include center ();
    position:absolute;
     top: 55%;
    left: 50%;
     transform: translate(-50%, -50%);
    }
    span.hy-header-tips {
      background-color: #FA7252;
      border-radius: 10px;
      color: #fff;
      display: inline-block;
      font-size: 12px;
      height: 14px;
      line-height: 13px;
      padding: 1px 6px;
      text-align: center;
      white-space: nowrap;
      left: 65%;
      position: absolute;
    }
  }
</style>
<template>
  <div class="hy-new-head" :style="{marginLeft: sidebar_an?'105px':'209px'}">
    <Row>
      <i-col span="16">
        <div class="hy--new-head-height">
          <a>知豆车辆监控平台</a>
          <span style="color: black;">{{version}}</span>
        </div>
      </i-col>
      <i-col span="8">
        <div style="height: 64px;line-height: 64px;min-width: 150px;color:black" class="outer">
          <span style="position:absolute;right:220px;">欢迎{{userInfo.userName}} !</span>
          <div class="inner">
            <div class="outerIcon" @click="loginOut">
              <hy-icon class="icon" type='tuichu1' style="line-height: 20px;" content="注销" color='#7C7C7C' size='18' :showTransfer="true"></hy-icon>
            </div>
            <div class="outerIcon" @click="goTask">
              <hy-icon class="icon" type='xiazai11' style="line-height: 20px;"  content="下载" color='#7C7C7C ' size='18' :showTransfer="true"></hy-icon>
              <span class="hy-header-tips" v-show="taskNum > 0">{{taskNum}}</span>
            </div>
            <div class="outerIcon" @click="setting">
              <hy-icon class="icon" type='shezhi1' style="line-height: 20px;" content="设置" color='#A0A1A5' size='18' :showTransfer="true"></hy-icon>
            </div>
            <div class="outerIcon"  @click="alarm">
              <hy-icon class="icon" type='shengguangbaojing' style="line-height: 20px;" content="报警" color='#7C7C7C' size='24' :showTransfer="true"></hy-icon>
              <span class="hy-header-tips" v-show="alarmNum > 0">{{alarmNum}}</span>
            </div>
          </div>
       </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
  import { logout } from '@/service/userService/user';
  import { mapState, mapMutations } from 'vuex';
  import { taskList } from '@/service/task/task';
  import { getVersion } from '@/service/homeService/administrativeRegion';
  import { countNo } from '@/service/alarmService/nationalStandard';

  export default {
    name: 'hyNewHeader',
    data () {
      return {
        userInfo: {},                // 用户信息
        countActive: false,         // 是否渲染
        animateAlarm: 0,
        version: '',
        state: false                // 展开/收缩状态
      };
    },
    computed: {
      ...mapState([
        'taskNum',
        'alarmNum'
      ]),
      sidebar_an: {
        // getter
        get: function () {
          return this.$store.state.sidebar_an;
        },
        // setter
        set: function (newValue) {
          this.$store.state.sidebar_an = newValue;
        }
      },
      classes () {
        return {
          'active': this.state
        };
      }
    },
    mounted () {
      this.userInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
      let params = {
        pageNum: 1,
        pageSize: 6,
        createUserId: this.userInfo.id,
        state: '0,1'
      };
      taskList(params, res => {
        this.TASK_NUM(Number(res.totalElements));
      });
      getVersion({}, res => {
        this.version = res;
      });
      countNo({}, res => {
        this.ALARM_NUM(Number(res));
      });
    },
    methods: {
      ...mapMutations([
        'TASK_NUM',
        'ALARM_NUM'
      ]),
      // 退出登录
      loginOut () {
        this.$confirm('确定注销登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logout({}, null, res => {
            this._hyTool.removeStore('loginInfo', true);
            this._hyTool.removeStore('permission', true);
            this._hyTool.removeStore('menuTree', true);
            this.$router.push('/login');
            this.$Notice.success({
              title: '注销成功!'
            });
          }, ret => {
            this.$Notice.error({
              title: '注销失败',
              desc: ret
            });
          });
        }).catch(() => {});
      },
      setting () {
        this.$router.push({path: '/main/setting'});
      },
      // 下载管理
      goTask () {
        this.$router.push({path: '/main/task'});
      },
      // 报警
      alarm () {
        this.$router.push({path: '/main/alarm/alarmNoRead'});
      }
    }
  };
</script>
