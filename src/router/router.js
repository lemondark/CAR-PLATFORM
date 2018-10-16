/**
 * 描述：路由文件
 */
import App from '../App';

// 404
const _404 = r => require.ensure([], () => r(require('../page/404/404')), '_404');

// main
const main = r => require.ensure([], () => r(require('../page/main/main')), 'main');

// login
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');

// 首页
const home = r => require.ensure([], () => r(require('../page/main/home/home')), 'home');

// 监控
const realCan = r => require.ensure([], () => r(require('../page/main/monitor/realCan')), 'realCan');  // 实时CAN
const realMonitor = r => require.ensure([], () => r(require('../page/main/monitor/realMonitor')), 'realMonitor');  // 实时监控
const historicalTrack = r => require.ensure([], () => r(require('../page/main/monitor/historicalTrack')), 'historicalTrack');  // 车辆历史轨迹
const historicalCan = r => require.ensure([], () => r(require('../page/main/monitor/historicalCan')), 'historicalCan');  // 历史CAN
const historicalCanList = r => require.ensure([], () => r(require('../page/main/monitor/historicalCanList')), 'historicalCanList');  // 历史CAN列表
const historicalNationalStandard = r => require.ensure([], () => r(require('../page/main/monitor/historicalNationalStandard')), 'historicalNationalStandard');  // 国标历史
const realPosition = r => require.ensure([], () => r(require('../page/main/monitor/realPosition')), 'realPosition');  // 车辆实时定位
const realNationalStandard = r => require.ensure([], () => r(require('../page/main/monitor/realNationalStandard')), 'realNationalStandard');  // 实时国标
const nationalStandardForwarding = r => require.ensure([], () => r(require('../page/main/monitor/nationalStandardForwarding')), 'nationalStandardForwarding');  // 国标转发报文
const landStandardForwarding = r => require.ensure([], () => r(require('../page/main/monitor/landStandardForwarding')), 'landStandardForwarding');  // 地标转发报文

// 用户中心
const user = r => require.ensure([], () => r(require('../page/main/user/user')), 'user');// 用户
const org = r => require.ensure([], () => r(require('../page/main/user/org')), 'org');// 组织
const role = r => require.ensure([], () => r(require('../page/main/user/role')), 'role');// 角色
const resource = r => require.ensure([], () => r(require('../page/main/user/resource')), 'resource');// 资源

// 个人设置
const setting = r => require.ensure([], () => r(require('../page/main/setting/setting')), 'setting'); // 个人设置

// 报警管理
const nationalStandard = r => require.ensure([], () => r(require('../page/main/alarm/nationalStandard/nationalStandard')), 'nationalStandard');  // 国标实时报警
const threeAlarmDetail = r => require.ensure([], () => r(require('../page/main/alarm/nationalStandard/threeAlarmDetail')), 'threeAlarmDetail');  // 三级报警详情
const ownFault = r => require.ensure([], () => r(require('../page/main/alarm/ownFault/ownFault')), 'ownFault');  // 自有故障实时报警
const landMark = r => require.ensure([], () => r(require('../page/main/alarm/landMark/landMark')), 'landMark');  // 地标实时报警
const alarmDetail = r => require.ensure([], () => r(require('../page/main/alarm/alarmDetail')), 'alarmDetail');  // 报警详情
const keyPartMonitor = r => require.ensure([], () => r(require('../page/main/alarm/keyPartMonitor/keyPartMonitor')), 'keyPartMonitor');  // 关重件监控
const batteryBalanceStatistics = r => require.ensure([], () => r(require('../page/main/alarm/batteryBalanceStatistics')), 'batteryBalanceStatistics');  // 电池均衡统计
const batteryBalanceStatisticsDetail = r => require.ensure([], () => r(require('../page/main/alarm/batteryBalanceStatisticsDetail')), 'batteryBalanceStatisticsDetail');  // 电池均衡统计详情
const batteryMonitor = r => require.ensure([], () => r(require('../page/main/alarm/batteryMonitor/batteryMonitor')), 'batteryMonitor');  // 电池监控
const batteryDetailAlarm = r => require.ensure([], () => r(require('../page/main/alarm/batteryMonitor/batteryDetailAlarm')), 'batteryDetailAlarm');  // 电池报警详情
const alarmNoRead = r => require.ensure([], () => r(require('../page/main/alarm/alarmNoRead')), 'alarmNoRead');  // 未读报警
const insulationAlarm = r => require.ensure([], () => r(require('../page/main/alarm/insulationAlarm')), 'insulationAlarm');  // 绝缘报警统计
const insulationAlarmDetail = r => require.ensure([], () => r(require('../page/main/alarm/insulationAlarmDetail')), 'insulationAlarmDetail');  // 绝缘报警统计详情

// 基础信息管理
const template = r => require.ensure([], () => r(require('../page/main/baseInfo/template')), 'template');  // 短信邮件模板
const batteryBalanceParam = r => require.ensure([], () => r(require('../page/main/baseInfo/batteryBalanceParam')), 'batteryBalanceParam');  // 电池均衡参数
const model = r => require.ensure([], () => r(require('../page/main/baseInfo/model')), 'model');  // 车型管理
const color = r => require.ensure([], () => r(require('../page/main/baseInfo/color')), 'color');  // 车身颜色管理
const base = r => require.ensure([], () => r(require('../page/main/baseInfo/base')), 'base');  // 生产基地管理
const directAlarmParams = r => require.ensure([], () => r(require('../page/main/baseInfo/directAlarmParams')), 'directAlarmParams');  // 直接报警参数
const alarmMode = r => require.ensure([], () => r(require('../page/main/baseInfo/alarmMode')), 'alarmMode');  // 报警方式设置
const vehicleSetting = r => require.ensure([], () => r(require('../page/main/baseInfo/vehicleSetting')), 'vehicleSetting');  // 远程控制设置
const batterySupplier = r => require.ensure([], () => r(require('../page/main/baseInfo/batterySupplier')), 'batterySupplier');  // 电池供应商
const nationalStandardConfig = r => require.ensure([], () => r(require('../page/main/baseInfo/nationalStandardConfig')), 'nationalStandardConfig');  // 国标转发配置
const landMarkConfig = r => require.ensure([], () => r(require('../page/main/baseInfo/landMarkConfig')), 'landMarkConfig');  // 地标转发配置
const openApiAuth = r => require.ensure([], () => r(require('../page/main/baseInfo/openApiAuth')), 'openApiAuth');  // openApi授权管理
const smsSetting = r => require.ensure([], () => r(require('../page/main/baseInfo/smsSetting')), 'smsSetting');  // 短信设置

// 服务站管理
const serviceStation = r => require.ensure([], () => r(require('../page/main/serviceStation/serviceStation')), 'serviceStation');  // 服务站管理

// 日志
const operatingLog = r => require.ensure([], () => r(require('../page/main/log/operatingLog')), 'operatingLog');  // 操作日志
const scheduleLog = r => require.ensure([], () => r(require('../page/main/log/scheduleLog')), 'scheduleLog');  // 任务执行日志
const openApiLog = r => require.ensure([], () => r(require('../page/main/log/openApi')), 'openApi');  // openApi调用日志
const smsSendLog = r => require.ensure([], () => r(require('../page/main/log/smsSendLog')), 'smsSendLog');  // 短信发送记录

// 车辆信息管理
const vehicle = r => require.ensure([], () => r(require('../page/main/vehicle/vehicle')), 'vehicle');  // 车辆信息管理
const vehicleException = r => require.ensure([], () => r(require('../page/main/vehicle/vehicleException')), 'vehicleException');  // 异常车辆
const travelManagement = r => require.ensure([], () => r(require('../page/main/vehicle/travelManagement')), 'travelManagement');  // 行程管理
const wakeUpRecord = r => require.ensure([], () => r(require('../page/main/vehicle/wakeUpRecord')), 'wakeUpRecord');  // 唤醒记录
// const wakeUpRecordDetail = r => require.ensure([], () => r(require('../page/main/vehicle/wakeUpRecordDetail')), 'wakeUpRecordDetail');  // 唤醒记录详情
const maintenance = r => require.ensure([], () => r(require('../page/main/vehicle/maintenance')), 'maintenance');  // 维修保养
const totalMileage = r => require.ensure([], () => r(require('../page/main/vehicle/totalMileage')), 'totalMileage');  // 车辆总里程
const mileageException = r => require.ensure([], () => r(require('../page/main/vehicle/mileageException')), 'mileageException');

// 下载任务
const task = r => require.ensure([], () => r(require('../page/main/task/task')), 'task');  // 下载任务

// 远程控制
const terminalParam = r => require.ensure([], () => r(require('../page/main/remoteControl/terminalParam')), 'terminalParam');  // 终端参数管理
const vehicleRemote = r => require.ensure([], () => r(require('../page/main/remoteControl/vehicleRemoteControl')), 'vehicleRemote');  // 单车远程控制
const operationLog = r => require.ensure([], () => r(require('../page/main/remoteControl/operationLog')), 'operationLog');  // 操作日志
const terminalParamQuery = r => require.ensure([], () => r(require('../page/main/remoteControl/terminalParamQuery')), 'terminalParamQuery');  // 终端参数查询
const terminalSetting = r => require.ensure([], () => r(require('../page/main/remoteControl/terminalSetting')), 'terminalSetting');  // 终端参数设置
const terminalSettingLog = r => require.ensure([], () => r(require('../page/main/remoteControl/terminalSettingLog')), 'terminalSettingLog');  // 终端参数设置记录
const terminalControl = r => require.ensure([], () => r(require('../page/main/remoteControl/terminalControl')), 'terminalControl');  // 终端远程控制
const terminalControlLog = r => require.ensure([], () => r(require('../page/main/remoteControl/terminalControlLog')), 'terminalControlLog');  // 终端远程控制记录

// ota升级系统
const terminalUpgrade = r => require.ensure([], () => r(require('../page/main/otaUpgrade/terminalUpgrade')), 'terminalUpgrade');    // 终端升级
const upgradeParams = r => require.ensure([], () => r(require('../page/main/otaUpgrade/upgradeParams')), 'upgradeParams');    // 升级参数
const upgradeRecord = r => require.ensure([], () => r(require('../page/main/otaUpgrade/upgradeRecord')), 'upgradeRecord');    // 升级记录

// 报表管理
const nationalSupplementData = r => require.ensure([], () => r(require('../page/main/report/nationalSupplementData')), 'nationalSupplementData');  // 国补数据
const bicycleStatistics = r => require.ensure([], () => r(require('../page/main/report/bicycleStatistics')), 'bicycleStatistics');  // 单车统计
const vehicleOperationStatistics = r => require.ensure([], () => r(require('../page/main/report/vehicleOperationStatistics')), 'vehicleOperationStatistics');  // 车辆运行统计
const nationalStandardAlarmStatistics = r => require.ensure([], () => r(require('../page/main/report/nationalStandardAlarmStatistics')), 'nationalStandardAlarmStatistics');  // 国标报警统计
const batterySupplierAlarmStatistics = r => require.ensure([], () => r(require('../page/main/report/batterySupplierAlarmStatistics')), 'batterySupplierAlarmStatistics');  // 电池供应商报警统计
const operationLogStatistics = r => require.ensure([], () => r(require('../page/main/report/operationLogStatistics')), 'operationLogStatistics');  // 远程控制统计
const vehicleSOH = r => require.ensure([], () => r(require('../page/main/report/vehicleSOH')), 'vehicleSOH');  // 车辆SOH统计

// 历史轨迹打印
const printTrack = r => require.ensure([], () => r(require('../page/print/printTrack')), 'printTrack');

// 车辆迁移管理
const vehicleMigration = r => require.ensure([], () => r(require('../page/main/vehicleMigration/vehicleMigration')), 'vehicleMigration'); // 车辆迁移
const migrationRecord = r => require.ensure([], () => r(require('../page/main/vehicleMigration/migrationRecord')), 'migrationRecord'); // 车辆迁移记录

// gateway
const gateway = r => require.ensure([], () => r(require('../page/gateway/gateway.vue')), 'gateway'); // 网关切换页面

export default [
  // 未匹配到则404页面
  {
    path: '*',
    component: _404
  },
  {
    path: '/404',
    component: _404
  },
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: 'main/home'
      },
      {
        path: '/tabThreeAlarmDetail',
        component: threeAlarmDetail
      },
      {
        name: '登录',
        path: 'login',
        component: login
      },
      {
        name: '404',
        path: '404',
        component: _404
      },
      {
        name: '历史轨迹打印',
        path: '/printTrack',
        component: printTrack
      },
      // 主文件
      {
        path: 'main',
        component: main,
        children: [
          {
            path: '',
            redirect: 'home'
          },
          {
            name: '首页',
            path: 'home',
            component: home,
            meta: {
              keepAlive: false
            }
          },
          // 网关切换
          {
            name: '网关切换',
            path: 'gateway',
            component: gateway
          },
          // 用户中心 -------------------------------------------------
          {
            name: '用户管理',
            path: 'userCenter/user',
            component: user
          },
          {
            name: '组织管理',
            path: 'userCenter/org',
            component: org
          },
          {
            name: '角色管理',
            path: 'userCenter/role',
            component: role
          },
          {
            name: '资源管理',
            path: 'userCenter/resource',
            component: resource
          },
          // 个人设置 -------------------------------------------------
          {
            name: '个人设置',
            path: 'setting',
            component: setting
          },
          // 报警管理 -------------------------------------------------
          {
            name: '国标实时报警',
            path: 'alarm/nationalStandard',
            component: nationalStandard,
            meta: {
              keepAlive: false
            }
          },
          {
            name: '三级实时报警详情',
            path: 'alarm/threeAlarmDetail',
            component: threeAlarmDetail
          },
          {
            name: '地标故障实时报警',
            path: 'alarm/landMark',
            component: landMark,
            meta: {
              keepAlive: false
            }
          },
          {
            name: '自有故障实时报警',
            path: 'alarm/ownFault',
            component: ownFault,
            meta: {
              keepAlive: false
            }
          },
          {
            name: '报警详情',
            path: 'alarm/alarmDetail',
            component: alarmDetail
          },
          {
            name: '关重件监控',
            path: 'alarm/keyPartMonitor',
            component: keyPartMonitor
          },
          {
            name: '电池均衡统计',
            path: 'alarm/batteryBalanceStatistics',
            component: batteryBalanceStatistics
          },
          {
            name: '电池均衡统计详情',
            path: 'alarm/batteryBalanceStatisticsDetail',
            component: batteryBalanceStatisticsDetail
          },
          {
            name: '电池监控',
            path: 'alarm/batteryMonitor',
            component: batteryMonitor
          },
          {
            name: '电池监控详情',
            path: 'alarm/batteryDetailAlarm',
            component: batteryDetailAlarm
          },
          {
            name: '未读报警',
            path: 'alarm/alarmNoRead',
            component: alarmNoRead
          },
          {
            name: '绝缘报警统计',
            path: 'alarm/insulationAlarm',
            component: insulationAlarm
          },
          {
            name: '绝缘报警统计详情',
            path: 'alarm/insulationAlarmDetail',
            component: insulationAlarmDetail
          },
          // 车辆管理 -------------------------------------------------
           {
            name: '档案管理',
            path: 'vehicle/vehicle',
            component: vehicle
          },
          {
            name: '异常车辆',
            path: 'vehicle/vehicleException',
            component: vehicleException
          },
          {
            name: '行程管理',
            path: 'vehicle/travelManagement',
            component: travelManagement
          },
          {
            name: '唤醒记录',
            path: 'vehicle/wakeUpRecord',
            component: wakeUpRecord
          },
          // {
          //   name: '唤醒记录详情',
          //   path: 'vehicle/wakeUpRecordDetail',
          //   component: wakeUpRecordDetail
          // },
          {
            name: '维修保养信息',
            path: 'vehicle/maintenance',
            component: maintenance
          },
          {
            name: '车辆总里程',
            path: 'vehicle/totalMileage',
            component: totalMileage
          },
          {
            name: '里程异常车辆',
            path: 'vehicle/mileageException',
            component: mileageException
          },
          // 基础信息管理 -------------------------------------------------
          {
            name: '短信邮件模板管理',
            path: 'baseInfo/template',
            component: template
          },
          {
            name: '电池均衡参数',
            path: 'baseInfo/batteryBalanceParam',
            component: batteryBalanceParam
          },
          {
            name: '直接报警参数',
            path: 'baseInfo/directAlarmParams',
            component: directAlarmParams
          },
          {
            name: '报警方式设置',
            path: 'baseInfo/alarmMode',
            component: alarmMode
          },
          {
            name: '车辆远程控制设置',
            path: 'baseInfo/vehicleSetting',
            component: vehicleSetting
          },
          {
            name: '车型管理',
            path: 'baseInfo/model',
            component: model
          },
          {
            name: '车身颜色管理',
            path: 'baseInfo/color',
            component: color
          },
          {
            name: '生产基地管理',
            path: 'baseInfo/base',
            component: base
          },
          {
            name: '电池供应商管理',
            path: 'baseInfo/batterySupplier',
            component: batterySupplier
          },
          {
            name: '国标转发配置',
            path: 'baseInfo/nationalStandardConfig',
            component: nationalStandardConfig
          },
          {
            name: '地标转发配置',
            path: 'baseInfo/landMarkConfig',
            component: landMarkConfig
          },
          {
            name: 'OpenApi授权管理',
            path: 'baseInfo/openApiAuth',
            component: openApiAuth
          },
          {
            name: '短信设置',
            path: 'baseInfo/smsSetting',
            component: smsSetting
          },
          // 操作日志 -------------------------------------------------
          {
            name: '操作日志',
            path: 'log/operatingLog',
            component: operatingLog
          },
          {
            name: '短信发送记录',
            path: 'log/smsSendLog',
            component: smsSendLog
          },
          {
            name: '任务执行日志',
            path: 'log/scheduleLog',
            component: scheduleLog
          },
          {
            name: 'openApi调用日志',
            path: 'log/openApiLog',
            component: openApiLog
          },
          // 实时监控 -------------------------------------------------
          {
            name: '实时数据',
            path: 'monitor/realCan',
            component: realCan
          },
          {
            name: '历史CAN图表',
            path: 'monitor/historicalCan',
            component: historicalCan
          },
          {
            name: '历史CAN列表',
            path: 'monitor/historicalCanList',
            component: historicalCanList
          },
          {
            name: '车辆实时监控',
            path: 'monitor/realMonitor',
            component: realMonitor
          },
          {
            name: '车辆历史轨迹',
            path: 'monitor/historicalTrack',
            component: historicalTrack
          },
          {
            name: '历史国标列表',
            path: 'monitor/historicalNationalStandard',
            component: historicalNationalStandard
          },
          {
            name: '车辆实时定位',
            path: 'monitor/realPosition',
            component: realPosition
          },
          {
            name: '实时国标',
            path: 'monitor/realNationalStandard',
            component: realNationalStandard
          },
          {
            name: '国标转发报文',
            path: 'monitor/nationalStandardForwarding',
            component: nationalStandardForwarding
          },
          {
            name: '地标转发报文',
            path: 'monitor/landStandardForwarding',
            component: landStandardForwarding
          },
          // 服务站管理 -------------------------------------------------
          {
            name: '服务站管理',
            path: 'serviceStation',
            component: serviceStation
          },
          // 下载任务 ---------------------------------------------------
          {
            name: '',
            path: 'task',
            component: task
          },
          // 远程控制 ---------------------------------------------------
          {
            name: '终端参数管理',
            path: 'remoteControl/terminalParam',
            component: terminalParam
          },
          {
            name: '单车远程控制',
            path: 'remoteControl/vehicle',
            component: vehicleRemote
          },
          {
            name: '单车远程控制日志',
            path: 'remoteControl/operationLog',
            component: operationLog
          },
          {
            name: '终端参数查询',
            path: 'remoteControl/terminalParamQuery',
            component: terminalParamQuery
          },
          {
            name: '终端参数设置',
            path: 'remoteControl/terminalSetting',
            component: terminalSetting
          },
          {
            name: '终端参数设置记录',
            path: 'remoteControl/terminalSettingLog',
            component: terminalSettingLog
          },
          {
            name: '终端远程控制',
            path: 'remoteControl/terminalControl',
            component: terminalControl
          },
          {
            name: '终端远程控制记录',
            path: 'remoteControl/terminalControlLog',
            component: terminalControlLog
          },
          // ota升级
          {
            name: '终端升级',
            path: 'otaUpgrade/terminalUpgrade',
            component: terminalUpgrade
          },
          {
            name: '升级参数',
            path: 'otaUpgrade/upgradeParams',
            component: upgradeParams
          },
          {
            name: '升级记录',
            path: 'otaUpgrade/upgradeRecord',
            component: upgradeRecord
          },
          // ------------报表管理------------------
          {
            name: '国补数据',
            path: 'report/nationalSupplementData',
            component: nationalSupplementData
          },
          {
            name: '单车统计',
            path: 'report/bicycleStatistics',
            component: bicycleStatistics
          },
          {
            name: '车辆运行统计',
            path: 'report/vehicleOperationStatistics',
            component: vehicleOperationStatistics
          },
          {
            name: '国标报警统计',
            path: 'report/nationalStandardAlarmStatistics',
            component: nationalStandardAlarmStatistics
          },
          {
            name: '电池供应商报警统计',
            path: 'report/batterySupplierAlarmStatistics',
            component: batterySupplierAlarmStatistics
          },
          {
            name: '单车远程控制统计',
            path: 'report/operationLogStatistics',
            component: operationLogStatistics
          },
          {
            name: '车辆SOH统计',
            path: 'report/vehicleSOH',
            component: vehicleSOH
          },
          // 车辆迁移管理
          {
            name: '车辆迁移',
            path: 'migration/vehicleMigration',
            component: vehicleMigration
          },
          {
            name: '车辆迁移记录',
            path: 'migration/migrationRecord',
            component: migrationRecord
          }
        ]
      }
    ]
  }
];
