/**
* 描述：头部
*/
<style lang="scss" scoped>
  @import 'src/styles/vars';
  @import 'src/styles/mixins';
  .hy-header {
    background: #ecf0f8;
    font-size: 20px;
    top:0;
    @include wh(100%, 43px);
    padding-left: 0px;
    user-select: none;
    z-index: 998;
  }
  .map-button {
    float: right;
    margin-top: 6px;
    margin-right: 10px;
    line-height: 50px;
  }
</style>
<template>
  <div class="hy-header clear">
    <div style="background: #ecf0f8;height:100%;" class="clear">
      <Breadcrumb style="height:43px;line-height:43px;padding-left: 2%;font-size:13px;float:left;width:60%" separator=">">
        <span v-for="(item, index) in crumbs" :key="index">
            <BreadcrumbItem>{{item.name}}</BreadcrumbItem>
          </span>
      </Breadcrumb>
      <Button-group shape="circle" class="map-button stationMap" v-show="showHome">
        <i-button type="ghost" style="height:30px;width:38px;" :style="{backgroundColor: homeShow? '#5179DF' : ''}" @click="toggleHOper('position')"><Icon type="ios-location"  style="font-size:16px;" :style="{color: homeShow?'white':'#5179DF'}"></Icon></i-button>
        <i-button type="ghost" style="height:30px;width:38px;" :style="{backgroundColor: !homeShow? '#5179DF' : ''}" @click="toggleHOper('heatClick')"><i class="iconfont icon-relitu" style="font-size:16px;position: absolute;left: 10px;bottom: 2px;" :style="{color: !homeShow?'white':'#5179DF'}"></i></i-button>
      </Button-group>
      <Button-group shape="circle" class="map-button stationMap" v-if="showService">
        <i-button type="ghost" :style="{backgroundColor: !serviceShow? '#5179DF' : ''}" @click="toggleSOper('map')"> <Tooltip placement="top" content="地图"><Icon type="ios-location" style="font-size:14px;padding-top:2px;" :style="{color: !serviceShow?'white':'#5179DF'}"></Icon></Tooltip></i-button>
        <i-button type="ghost" :style="{backgroundColor: serviceShow? '#5179DF' : ''}" @click="toggleSOper('list')"><Tooltip placement="top" content="列表"><Icon type="navicon-round" style="font-size:14px;padding-top:2px;" :style="{color: serviceShow?'white':'#5179DF'}"></Icon></Tooltip></i-button>
      </Button-group>
      <Button-group shape="circle" class="map-button stationMap" v-if="showExceptCar">
        <i-button type="ghost" :style="{backgroundColor: !exceptCarShow? '#5179DF' : ''}" @click="toggleCOper('list')"><span style="font-size:14px;padding-top:2px;" :style="{color: !exceptCarShow?'white':'#5179DF'}">列 表</span></i-button>
        <i-button type="ghost" :style="{backgroundColor: exceptCarShow? '#5179DF' : ''}" @click="toggleCOper('map')"><span style="font-size:14px;padding-top:2px;" :style="{color: exceptCarShow?'white':'#5179DF'}">地 图</span></i-button>
      </Button-group>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import Bus from '@/components/common/bus';

  export default {
    components: {
      Bus
    },
    data () {
      return {
        state: false,                // 展开/收缩状
        crumbs: [],                   // 面包屑
        defaultMenuList: [],          // 默认菜单列表
        showService: false,
        showHome: false,
        showExceptCar: false          // 车辆管理/异常车辆的btn
      };
    },
    computed: {
      ...mapState([
        'sidebar_an',
        'menuTree',
        'defaultMenuTree',
        'serviceShow',
        'homeShow',
        'exceptCarShow'
      ]),
      classes () {
        return {
          'active': this.state
        };
      }
    },
    methods: {
      // 退出登录
      loginOut () {
        this.$confirm('确定注销登录？', '提示', {
          confirmButtonText: '是的',
          cancelButtonText: '点错了',
          type: 'warning'
        }).then(() => {
          this.$message({
            message: '注销成功',
            type: 'success'
          });
        }).catch(() => {});
      },
      getCrumbs () {
        let url = this.$route.path;
        if (url === '/main/serviceStation') {
          this.showHome = false;
          this.showExceptCar = false;
          this.showService = true;
        } else if (url === '/main/home') {
          this.showHome = true;
          this.showService = false;
          this.showExceptCar = false;
        } else if (url === '/main/vehicle/vehicleException') {
          this.showHome = false;
          this.showService = false;
          this.showExceptCar = true;
        } else {
          this.showHome = false;
          this.showService = false;
          this.showExceptCar = false;
        }
        this.crumbs = [];
        this.menuTree.forEach(tree => {
          if (tree.url === this.$route.path) {
            this.crumbs.push({name: tree.name});
          }
          if (tree.childMenu) {
            tree.childMenu.forEach(childTree => {
              if (childTree.url === this.$route.path) {
                let menuObj = this.defaultMenuList.find(val => val.name === childTree.name);
                if (!menuObj) menuObj = {};
                this.crumbs.push({name: menuObj.parentName ? menuObj.parentName : ''});
                this.crumbs.push({name: childTree.name});
              }
            });
          }
        });
        // 特殊路径 特别处理
        if (this.crumbs.length === 0) {
          switch (this.$route.path) {
            case '/main/alarm/alarmDetail':   // 国标，地标，自有报警详情
            if (window.sessionStorage.getItem('alarmParams')) {
              let para = JSON.parse(this._hyTool.getStore('alarmParams'));
              if (para.type === 1) {
                if (para.flag === 1) this.crumbs.push({name: '报警管理'}, {name: '国标报警'}, {name: '实时报警详情'});
                else this.crumbs.push({name: '报警管理'}, {name: '国标报警'}, {name: '历史报警详情'});
              } else if (para.type === 2) {
                if (para.flag === 1) this.crumbs.push({name: '报警管理'}, {name: '地标报警'}, {name: '实时报警详情'});
                else this.crumbs.push({name: '报警管理'}, {name: '地标报警'}, {name: '历史报警详情'});
              } else if (para.type === 3) {
                if (para.flag === 1) this.crumbs.push({name: '报警管理'}, {name: '自有故障报警'}, {name: '实时报警详情'});
                else this.crumbs.push({name: '报警管理'}, {name: '自有故障报警'}, {name: '历史报警详情'});
              } else if (para.type === 4) {
                if (para.flag === 1) this.crumbs.push({name: '实时报警'}, {name: '实时报警详情'});
              }
            }
              break;
            case '/main/alarm/threeAlarmDetail':  // 国标三级报警页面
              if (this.$route.query.flag === 1) this.crumbs.push({name: '报警管理'}, {name: '国标报警'}, {name: '实时报警三级报警详情'});
              else this.crumbs.push({name: '报警管理'}, {name: '国标报警'}, {name: '历史报警详情'});
              break;
            case '/main/alarm/alarmNoRead':  // 报警页面
              this.crumbs.push({name: '实时报警'});
              break;
            case '/main/setting':  // 个人设置
              this.crumbs.push({name: '个人设置'});
              break;
            case '/main/task':   // 任务下载页面
              this.crumbs.push({name: '下载任务'});
              break;
            case '/main/vehicle/wakeUpRecordDetail':   // 唤醒记录详情
              this.crumbs.push({name: '车辆管理'}, {name: '唤醒记录'}, {name: '详情'});
              break;
            case '/main/alarm/batteryDetailAlarm':   // 电池监控详情
              this.crumbs.push({name: '报警管理'}, {name: '电池供应商报警'}, {name: '详情'});
              break;
            case '/main/alarm/insulationAlarmDetail':   // 绝缘报警统计
              this.crumbs.push({name: '报警管理'}, {name: '绝缘报警统计'}, {name: '详情'});
              break;
            case '/main/vehicle/wakeUpRecord':   // 绝缘报警统计
              this.crumbs.push({name: '车辆管理'}, {name: '唤醒记录'});
              break;
            case '/main/alarm/batteryBalanceStatisticsDetail':   // 电池不均衡详情
              this.crumbs.push({name: '报警管理'}, {name: '电池不均衡统计'}, {name: '详情'});
              break;
          }
        }
      },
      getDefaultMenu () {
        this.defaultMenuList = [];
        for (let me of this.defaultMenuTree) {
          this.defaultMenuList.push({name: me.name});
          if (me.childMenu.length > 0) {
            for (let ch of me.childMenu) {
              this.defaultMenuList.push({name: ch.name, parentName: ch.parentName});
            }
          }
        }
        this.getCrumbs();
      },
      toggleSOper (str) {
        Bus.$emit('mapoper', str);
      },
      toggleHOper (str) {
        Bus.$emit('homeoper', str);
      },
      toggleCOper (str) {
        Bus.$emit('caroper', str);
      }
    },
    mounted () {
      this.getDefaultMenu();
    },
    watch: {
      '$route': function () {
        this.getCrumbs();
      }
    }
  };
</script>
