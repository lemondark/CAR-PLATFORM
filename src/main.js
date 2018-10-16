import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import 'jquery';
import routes from './router/router';
import store from './store/';
import core from '@/js/core';       // 公共指令及filter
import 'font-awesome/css/font-awesome.min.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import JsEncrypt from 'jsencrypt/bin/jsencrypt';
import './styles/my-theme/index.less';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$jsEncrypt = JsEncrypt;  // rsa加密
Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(Element);
Vue.use(core);

const router = new VueRouter({
  mode: 'history',
  routes,
  strict: process.env.NODE_ENV !== 'production'
});

// 路由未登录拦截
router.beforeEach((to, from, next) => {
  let info = Vue._hyTool.getStore('loginInfo', true);
  let menuTree = JSON.parse(Vue._hyTool.getStore('menuTree', true));
  // 菜单的第一个页面
  let first = '/main/home';
  if (menuTree && menuTree.length > 0) {
    if (menuTree[0].childMenu && menuTree[0].childMenu.length > 0) {
      first = menuTree[0].childMenu[0].url;
    } else {
      first = menuTree[0].url;
    }
  }
  // 菜单列表 补充部分非菜单页面路径
  let menuList = [
    '/login',
    '/404',
    '/main/setting',  // 个人设置
    '/main/task',     // 任务
    '/main/alarm/alarmNoRead'  // 报警
  ];
  if (menuTree) {
    for (let one of menuTree) {
      if (one.childMenu.length > 0) {
        for (let two of one.childMenu) {
          if (two.childMenu.length > 0) {
            for (let three of two.childMenu) {
              menuList.push(three.url);
            }
          } else {
            menuList.push(two.url);
          }
        }
      } else {
        menuList.push(one.url);
      }
    }
    for (let me of menuList) {
      if (me === '/main/alarm/nationalStandard' || me === '/main/alarm/landMark' || me === '/main/alarm/ownFault') {  // 国标 地标 自有
        menuList.push('/main/alarm/alarmDetail');
        if (me === '/main/alarm/nationalStandard') {
          menuList.push('/main/alarm/threeAlarmDetail');      // 国标三级详情
          menuList.push('/tabThreeAlarmDetail');             // 国标三级报警
        }
      } else if (me === '/main/alarm/batteryBalanceStatistics') {  // 电池不均衡统计
        menuList.push('/main/alarm/batteryBalanceStatisticsDetail');
      } else if (me === '/main/alarm/insulationAlarm') {   // 绝缘报警统计
        menuList.push('/main/alarm/insulationAlarmDetail');
      } else if (me === '/main/alarm/batteryMonitor') {   // 电池供应商报警
        menuList.push('/main/alarm/batteryDetailAlarm');
      } else if (me === '/main/vehicle/vehicleException') {   // 车辆异常
        menuList.push('/main/vehicle/wakeUpRecord');
        menuList.push('/main/vehicle/wakeUpRecordDetail');
      } else if (me === '/main/monitor/historicalTrack') {   // 车辆历史轨迹
        menuList.push('/printTrack');  // 打印
      }
    }
  }
  let status = 0;
  // 检测JSESSIONID 是否有效
  $.ajax({
    url: `/api/sys/user/oneself/get?timestamp=` + new Date().getTime(),
    dataType: 'json',
    method: 'GET',
    success: function (data) {
      let flag = false;
      if (data.code === '401') {
        flag = true;
      }
      if ((!info || flag) && to.path.indexOf('/login') === -1) {
        Vue._hyTool.removeStore('loginInfo', true);
        Vue._hyTool.removeStore('menuTree', true);
        Vue._hyTool.removeStore('permission', true);
        next({
          path: '/login'
        });
      } else if (info && !flag && to.path.indexOf('/login') > -1) {  // 已登录 login页面 自动跳转到
        next({
          path: first
        });
      } else {
        status = 1;
      }
    },
    error: function (xhr) {
      status = 1;
      // 导致出错的原因较多，以后再研究
      // alert('error:' + JSON.stringify(xhr));
    }
  });
  let int = setInterval(() => {
    if (status === 1) {
      clearInterval(int);
      if (to.path === '/login' && info) {  // 跳转login页面 并且登录了，跳转到用户菜单的第一个页面
        next({
          path: first
        });
      } else {
        let menu = menuList.filter(value => value === to.path);
        if (menu.length > 0) {
          next();
        } else {
          next({
            path: '/404'
          });
        }
      }
    }
  }, 1000);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
