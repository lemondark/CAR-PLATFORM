/**
* 描述：sidebar部分
*/
<style lang="scss" scoped>
  @import 'src/styles/vars';
  @import 'src/styles/mixins';

  .hy-sidebar-nav {
    @include wh(209px, 100%);
    position: absolute;
    top: 0;
    transition: all 0.5s;
    color: #FFFFFF;
    background: $sidebar_bg;
    z-index: 999;
    user-select: none;
    .hy-sidebar-scroll {
      overflow: hidden;
      @include wh(100%, calc(100% - 55px));
      overflow-y: auto;
    }
    .el-menu--dark {
      background: $sidebar_bg;
      border-bottom: 1px solid rgba(204, 204, 204, 0.1);
    }
    &.hy-sidebar-zoom {
      width: 60px;
    }
    .hy-sidebar-title {
      position: relative;
      line-height: 55px;
      color: $sidebar_color;
      white-space: nowrap;
      font-size: 16px;
      text-align: center;
      .hy-sidebar-logo-new {
        background: #5179DF;
        overflow:hidden;
        .hy-sidebar-logo-tab{
          line-height: 80px;
          height: 80px;
        }
      }
      .hy-sidebar-list {
        position: absolute;
        top: 50%;
        left: 100%;
        line-height: 1;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: left 0.5s;
        cursor: pointer;
        &.hy-sidebar-icon {
          left: 50%;
        }
      }
    }
    .hy-sidebar-iconList {
      li {
        height: 50%;
        line-height: 50px;
        padding: 8% 25%;
      //  text-align: center;
        cursor: pointer;
        &:hover,
        &.active {
          color: $sidebar_active;
        }
      }
      .hy-smallBar{
        text-align: center;
        margin: auto;
        width: 46px;
        height: 46px;
        @include borderRadius(100%);
        background-color: #31333F;
        img {
          margin-top: 25%;
        }
      }
      .hy-smallBar:hover {
        @include gradient();
      }
    }
    .hy-sidebar-img{
      position: relative;
      img{
        @include ct();
        margin-right:6%;
      }
      span {
           margin-left:19%;
      }
    }
  }
  .mr15 {
    margin-right: 15px;
  }
  // 动画
  .fade-enter-active{
    transition: all 0.5s ease-in-out;
  }
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .fade-menu-enter-active {
    transition: all 0.5s ease-in-out;
  }
  .fade-menu-leave-active {
    transition: all 0.3s;
  }
  .fade-menu-enter, .fade-menu-leave-to {
    opacity: 0
  }
  .user{
     text-align: center;
  }
  .userSmall {
    text-align: center;
  }
  .imgBig{
     float:left;
    margin-left: 21px;
    margin-top: 10px;
     }
  .imgBread{
    right: 10px;
    // float:right;
    @include ct();

  }
.imgSmall{
  margin-top: 10px;
}
</style>
<template>
  <div class="hy-sidebar-nav" :class="classes" :style="{width: sidebar_an?'105px':''}">
    <div class="hy-sidebar-title" :style="{height: sidebar_an?'64px':'64px'}">
      <transition name="fade">
        <div class="hy-sidebar-logo-new" :style="{height: sidebar_an?'64px':'64px'}">
          <!--<div class="kong" :style="{height: sidebar_an?'4px':'16px'}"></div>-->
          <div class="hy-sidebar-logo-tab">
          <img v-show="!sidebar_an" class="imgBig" width="50" height="46" src="../../../static/images/new/main/logo.png"/>
          <img v-show="sidebar_an" class="imgSmall" width="50" height="46" src="../../../static/images/new/main/logo.png" @click="toggleClick"/>
          <!--<div class="hy-new-head" :style="{marginLeft: sidebar_an?'60px':'250px'}">-->
            <!--:style="{transform: 'rotateZ(' + (this.sidebar_an ? '-90' : '0') + 'deg)'}"-->
            <Button v-show="!sidebar_an" class="imgBread"  type="text" @click="toggleClick">
            <Icon type="navicon" size="40" color='white'></Icon>
          </Button>
          </div>
        </div>
      </transition>
    </div>
    <div class="hy-sidebar-scroll">
      <div class="user" v-show="!sidebar_an">
      </div>
      <div class="userSmall" v-show="sidebar_an">
      </div>
      <transition name="fade-menu" mode="out-in">
        <div v-if="!sidebar_an" key="!sidebar_an" class="hy-sidebar-img">
          <el-menu :default-active="isActive" style="background: #393943;" :default-openeds="sidebar_openeds" router theme="dark" :key="index" v-for="(item, index) in menuTree">
            <el-menu-item :index="item.url" v-if="item.childMenu.length === 0">
               <img :src="item.icon" width="20" height="20" />
              <span>{{item.name}}</span></el-menu-item>
            <el-submenu :index="index + ''" v-else>
              <template slot="title">
                <img :src="item.icon" width="20" height="20" />
               <span>{{item.name}}</span>
              </template>
              <template v-for="(itm, i) in item.childMenu">
                <el-menu-item :index="itm.url" v-if="itm.childMenu.length === 0">
                  <img :src="itm.icon" width="18" height="18" />
                  <span style="font-size: 13px;">{{itm.name}}</span>
                </el-menu-item>
                <el-submenu :index="i + '-'" v-else>
                  <template slot="title">
                    <img :src="itm.icon" width="18" height="18" />
                    <span style="font-size: 13px;margin-left: 17%;">{{itm.name}}</span>
                  </template>
                  <el-menu-item :index="itmu.url" :key="ind" v-for="(itmu, ind) in itm.childMenu" >
                    <img :src="itmu.icon" width="18" height="18" />
                    <span style="font-size: 13px;margin-left: 24%;">{{itmu.name}}</span>
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-submenu>
          </el-menu>
        </div>
        <ul v-else key="sidebar_an" class="hy-sidebar-iconList">
          <li :class="{'active': isActive === item.url}" v-for="(item, index) in menuTree" :key="index" @click="openMenu(item.nme || index)">
            <div class="hy-smallBar">
               <img :src="item.icon" width="22" height="22" />
            </div>
          </li>
        </ul>
      </transition>
      <!--</div>
      </div>-->
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  const prefixCls = 'hy-sidebar';

  export default {
    data () {
      return {
        userInfo: {},
        sidebar_openeds: [],
        state: false
      };
    },
    components: {},
    computed: {
      ...mapState([
        'sidebar_an',
        'menuTree'
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
          [`${prefixCls}-zoom`]: this.sidebar_an,
          'active': this.state
        };
      },
      classStyle () {
        return {
          [`${prefixCls}-icon`]: this.sidebar_an
        };
      },
      isActive: function () {
        return this.$route.path;
      }
    },
    mounted () {
      this.userInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
    },
    methods: {
      ...mapActions([
        'getMenuTree'
      ]),
      ...mapMutations([
        'SIDEBAR_AN'
      ]),
      zoom () {
        let state = !this.sidebar_an;
        this.SIDEBAR_AN({state: state});
      },
      openMenu (opt) {
        if (typeof opt === 'string') {
          this.$router.push(opt);
          this.sidebar_openeds = [];
        } else {
          this.sidebar_openeds = [`${opt}`];
          this.SIDEBAR_AN({state: false});
        }
      },
       toggleClick () {
        if (this.sidebar_an) {
          this.$store.commit('SIDEBAR_AN', {state: false});
        } else {
          this.$store.commit('SIDEBAR_AN', {state: true});
        }
      }
    }
  };
</script>
