/**
 * 描述：定义states
 */
export default {
  // 全局公共部分
  pageNum: 1, // 当前页
  totalElement: 0, // 总数
  totalPage: 1, // 总页数
  pageSize: 10, // 分页数
  homeShow: false, // 首页-头部右侧显隐
  serviceShow: false, // 服务站-头部显示隐藏
  exceptCarShow: false, // 异常车辆头部显隐
  sidebar_an: false, // 控制导航
  socketList: [],   // websocket
  exportModel: {    // excel模板
    'vehicleMigration': '/static/model/vehicleMigration.xlsx',  // 车辆迁移模板
    'bindVehicle': '/static/model/vehicleImport.xlsx',           // 角色管理 车辆绑定模板
    'nationalConfig': '/static/model/国标导入.xlsx',           // 国标转发配置 车辆绑定模板
    'landConfig': '/static/model/地标导入.xlsx'           // 地标转发配置 车辆绑定模板
  },
  socketUrl: 'ws://39.108.14.114:8788/alarmWebSocket?id=',
 // socketUrl: 'ws://127.0.0.1:8787/alarmWebSocket?id=',  // home报警
   latestVehicleSocketUrl: 'ws://47.97.240.193:8787/latestVehicleSocket?vin=',
 //  latestVehicleSocketUrl: 'ws://127.0.0.1:8787/latestVehicleSocket?vin=',  // 车辆实时监控
  taskNum: 0,       // 下载数量
  alarmNum: 0,      // 报警数量
  printData: [],    // 打印位置数组
  defaultMenuTree: [
    {
      icon: '',
      id: 1,
      name: '首页',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '/main/home',
      childMenu: []
    },
    {
      icon: '',
      id: 1,
      name: '车辆监控',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '车辆实时监控',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/realMonitor',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆实时定位',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/realPosition',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '实时数据',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/realCan',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '实时国标',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/realNationalStandard',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '历史CAN图表',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/historicalCan',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '历史CAN列表',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/historicalCanList',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '历史国标列表',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/historicalNationalStandard',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆历史轨迹',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/historicalTrack',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '国标转发报文',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/nationalStandardForwarding',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '地标转发报文',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆监控',
          url: '/main/monitor/landStandardForwarding',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '报警管理',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '国标报警',
          orderNum: 1,
          parentId: 1,
          parentName: '报警管理',
          url: '/main/alarm/nationalStandard',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '地标报警',
          orderNum: 1,
          parentId: 1,
          parentName: '报警管理',
          url: '/main/alarm/landMark',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '自有故障报警',
          orderNum: 1,
          parentId: 1,
          parentName: '报警管理',
          url: '/main/alarm/ownFault',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '关重件监控',
          orderNum: 1,
          parentId: 1,
          parentName: '报警管理',
          url: '/main/alarm/keyPartAlarm',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '电池不均衡统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报警管理',
          url: '/main/alarm/batteryBalanceStatistics',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '绝缘报警统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报警管理',
          url: '/main/alarm/insulationAlarm',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '电池供应商报警',
          orderNum: 1,
          parentId: 1,
          parentName: '报警管理',
          url: '/main/alarm/batteryMonitor',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '远程控制',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '/main/remoteControl',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '单车远程控制',
          orderNum: 1,
          parentId: 1,
          parentName: '远程控制',
          url: '/main/remoteControl/vehicle',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '终端参数设置',
          orderNum: 1,
          parentId: 1,
          parentName: '远程控制',
          url: '/main/remoteControl/terminalSetting',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '终端参数查询',
          orderNum: 1,
          parentId: 1,
          parentName: '远程控制',
          url: '/main/remoteControl/terminalParamQuery',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '终端远程控制',
          orderNum: 1,
          parentId: 1,
          parentName: '远程控制',
          url: '/main/remoteControl/terminalControl',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '单车远程控制日志',
          orderNum: 1,
          parentId: 1,
          parentName: '远程控制',
          url: '/main/remoteControl/operationLog',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '终端参数设置日志',
          orderNum: 5,
          parentId: 1,
          parentName: '远程控制',
          url: '/main/remoteControl/terminalSettingLog',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '终端远程控制日志',
          orderNum: 5,
          parentId: 1,
          parentName: '远程控制',
          url: '/main/remoteControl/terminalControlLog',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '服务站',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '/main/serviceStation',
      childMenu: []
    },
    {
      icon: '',
      id: 1,
      name: '车辆管理',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '车辆档案管理',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆管理',
          url: '/main/vehicle/vehicle',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '异常车辆',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆管理',
          url: '/main/vehicle/vehicleException',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '维修保养',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆管理',
          url: '/main/vehicle/maintenance',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '行程管理',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆管理',
          url: '/main/vehicle/travelManagement',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆总里程',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆管理',
          url: '/main/vehicle/totalMileage',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '车辆迁移管理',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '车辆迁移',
          orderNum: 1,
          parentId: 1,
          parentName: '车辆迁移管理',
          url: '/main/migration/vehicleMigration',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆迁移记录',
          orderNum: 2,
          parentId: 1,
          parentName: '车辆迁移管理',
          url: '/main/migration/migrationRecord',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '用户中心',
      orderNum: 1,
      parentId: 1,
      url: '/main/userCenter',
      parentName: '知豆车辆监控平台',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '用户管理',
          orderNum: 1,
          parentId: 1,
          parentName: '用户中心',
          url: '/main/userCenter/user',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '组织管理',
          orderNum: 1,
          parentId: 1,
          parentName: '用户中心',
          url: '/main/userCenter/org',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '角色管理',
          orderNum: 1,
          parentId: 1,
          parentName: '用户中心',
          url: '/main/userCenter/role',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '资源管理',
          orderNum: 1,
          parentId: 1,
          parentName: '用户中心',
          url: '/main/userCenter/resource',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '报表管理',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '/main/report',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '国补数据',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/nationalSupplementData',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '单车统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/bicycleStatistics',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆运行统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/vehicleOperationStatistics',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '国标报警统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/nationalStandardAlarmStatistics',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '单车远程控制统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/operationLogStatistics',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆总里程统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/totalMileageStatistice',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆SOH统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/vehicleSOH',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '电池供应商报警统计',
          orderNum: 1,
          parentId: 1,
          parentName: '报表管理',
          url: '/main/report/batterySupplierAlarmStatistics',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '基础信息管理',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '短信邮件模板管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/template',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '电池均衡参数管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/batteryBalanceParam',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '直接报警参数管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/directAlarmParams',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '报警方式管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/alarmMode',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车辆远程控制管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/vehicleSetting',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车型管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/model',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '车身颜色管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/color',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '生产基地管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/base',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '电池供应商管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/batterySupplier',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '国标转发配置',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/nationalStandardConfig',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '地标转发配置',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/landMarkConfig',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: 'OpenApi授权管理',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/openApiAuth',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '短信设置',
          orderNum: 1,
          parentId: 1,
          parentName: '基础信息管理',
          url: '/main/baseInfo/smsSetting',
          childMenu: []
        }
      ]
    },
    {
      icon: '',
      id: 1,
      name: '日志',
      orderNum: 1,
      parentId: 1,
      parentName: '知豆车辆监控平台',
      url: '',
      childMenu: [
        {
          icon: '',
          id: 1,
          name: '操作日志',
          orderNum: 1,
          parentId: 1,
          parentName: '日志',
          url: '/main/log/operatingLog',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '短信发送日志',
          orderNum: 1,
          parentId: 1,
          parentName: '日志',
          url: '/main/log/smsSendLog',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: '任务执行日志',
          orderNum: 1,
          parentId: 1,
          parentName: '日志',
          url: '/main/log/scheduleLog',
          childMenu: []
        },
        {
          icon: '',
          id: 1,
          name: 'OpenApi调用日志',
          orderNum: 1,
          parentId: 1,
          parentName: '日志',
          url: '/main/log/openApiLog',
          childMenu: []
        }
      ]
    }
  ],
  menuTree: [], // 菜单Tree
  // 按钮权限列表
  defaultButtonList: {
    // 用户
    '用户查询': 'JZDN6KSHDA6E205948',
    '用户新增': 'QTYP9YA7D1A9808083',
    '用户修改信息': 'X6LWZN8691Z3RT4Q28',
    '用户配置角色': 'MWVU4I0DW6HHT0V659',
    '重置用户密码': 'RVQDA9H87C3R1PX357',
    '用户禁启用':	'QRX0DVRYWDTKEY3518',
    '用户删除': 'HEHQQ1P5134J2A7173',
    // 组织
    '组织查询': 'G0EPD8OY031S15S168',
    '组织新增': 'GZIR6FQ51I92671K57',
    '组织修改': 'AVJI3ZI3IAW4608980',
    '组织删除': 'OVKTG6B5OJH68Q1587',
    // 角色
    '角色查询': 'FP721WG0J821948480',
    '角色新增': 'NVWIKWA379C78L24C3',
    '角色修改': 'JAFMKYLT52Q68E8V28',
    '资源配置': 'QMDVXUGVT394857763',
    '角色删除': 'HWKY8408V59PEK2380',
    '车辆绑定': 'ZMXJG3802777359203',
    // 资源
    '资源查询': 'XBOJP7GJ23GCC86114',
    '资源菜单新增': 'AF66AC7RKHFJ68893E',
    '资源菜单修改': 'BH5FNEAR875D303656',
    '资源菜单位置交换': 'US06GOJ692P1E2U833',
    '资源菜单删除': 'PAGFAMBMW50015Q215',
    '资源按钮修改': 'BYC3M8BW8LC028W77X',
    '资源按钮新增': 'YXCDH51GB888357188',
    '资源按钮删除': 'EJYRJSVC23B7VV2380',
    // 车辆
    '车辆查询': 'LVUSKH865742692382',      // 车辆管理
    '车辆新增': 'CKPMXWPBDQN56S2359',      // 车辆管理
    '车辆修改': 'RTVC04Z1I6NZV25082',     // 车辆管理
    '车辆删除': 'OVUGHQ050O2I335F3H',     // 车辆管理
    // 车辆迁移
    '车辆迁移查询': 'KPV4NP2F8AD6S138A8',      // 车辆迁移
    '车辆迁移': 'JI3HXZ6V5388YI3M40',      // 车辆迁移
    // 异常车辆
    '异常车辆查询': 'VFJBGH8E587245675R',     // 车辆唤醒
    '车辆唤醒': 'SRN5ZEW9PKM5512019',     // 车辆唤醒
    // 国标历史报警
    '国标查询': 'QEWSJLCZ4994H8X115',     // 国标历史报警
    '国标开始': 'CJEC1FN3A6Y9152220',     // 国标历史报警
    '国标处理': 'HWIAQ9BXJ6LDY34112',        // 国标历史报警
    '国标关闭': 'BUCWSZAGQ514SE6689',        // 国标历史报警
    // 地标历史报警
    '地标查询': 'PGXIOMURV4A9232908',     // 地标报警
    '地标开始': 'WKBPJKABWOC79VE3B0',     // 地标报警
    '地标处理': 'GBDKZ97LCFDC8HU297',     // 地标报警
    '地标关闭': 'JTQU7CI86373N79398',     // 地标报警
    // 自有历史报警
    '自有查询': 'VHLRBGDQ22R97C7956',     // 自有报警
    '自有开始': 'XBFZYIAB9B80S10715',     // 自有报警
    '自有处理': 'HSDCKKXMCSIRM00216',     // 自有报警
    '自有关闭': 'JBTIOLFG534W32N592',     // 自有报警
    // 直接报警参数
    '直参查询': 'AYXJTCL25QD4H43183',        // 直接报警参数
    '直参新增': 'CDFOKXFJCM6ZSR4X16',        // 直接报警参数
    '直参修改': 'JIBFB5S0152555Y810',        // 直接报警参数
    '直参删除': 'PY7V7MCG2FF8H07209',        // 直接报警参数
    '直参禁启用': 'THGKJAU1KNHJ758245',      // 直接报警参数
    // 报警方式设置
    '方式查询': 'NMFMSQW9L085F2Y671',     // 报警方式设置
    '方式新增': 'DWJZCC5X2154H9Y302',     // 报警方式设置
    '方式修改': 'SY612W0SNAX2689431',     // 报警方式设置
    '方式删除': 'WEFAEAN13MTA7LM775',     // 报警方式设置
    // 车辆远程控制设置
    '车辆远程控制查询': 'OOCY8D6C52RKW86D81',     // 车辆远程控制设置
    '车型新增': 'QLEQK02751X9637634',     // 车辆远程控制设置
    '车型修改': 'VSKGL0VS7E925065D2',     // 车辆远程控制设置
    '车型删除': 'PI1QEL90305X6Z6AK9',     // 车辆远程控制设置
    '单车新增': 'JLGWPMN14490L34358',     // 车辆远程控制设置
    '单车修改': 'OTVALBBF9035509924',     // 车辆远程控制设置
    '单车删除': 'IODJDYB2H004Z49667',     // 车辆远程控制设置
    // 短信邮件模板
    '短邮查询': 'TKJUY8BGJNR6G542K7',     // 短信邮件模板
    '短邮新增': 'KOKCAJVR447W713724',     // 短信邮件模板
    '短邮修改': 'EMKBGA8173E3Q7YM12',     // 短信邮件模板
    '短邮删除': 'ASND6EUR4K6S2769LL',     // 短信邮件模板
    // 电池均衡参数
    '电参查询': 'SKKRVT37T5CJE065G9',     // 电池均衡参数
    '电参新增': 'XOEB1UI04PSN707635',     // 电池均衡参数
    '电参修改': 'SRD9U51SJ2A3G25703',     // 电池均衡参数
    '电参删除': 'SZ494AV11E1X025757',     // 电池均衡参数
    // 车型管理
    '车系查询': 'DQJRXM42RHP1438467',     // 车型管理
    '车系新增': 'XWXJRRJ69C4W7R6567',     // 车型管理
    '车系修改': 'PXRG5HQ3FV1ZB79239',     // 车型管理
    '车系删除': 'EQQANR0DG34573W436',     // 车型管理
    // 车身颜色管理
    '颜色查询': 'VULO0BY58Y61RPO462',     // 车身颜色管理
    '颜色新增': 'QL89RSP7692O7775D7',     // 车身颜色管理
    '颜色修改': 'F9KXYB7YH31W129357',     // 车身颜色管理
    '颜色删除': 'WZD7PFAVN471522B41',     // 车身颜色管理
    // 生产基地管理
    '基地查询': 'KKFBNIW94263726170',     // 生产基地管理
    '基地新增': 'HUTA62G4580Q6C8643',     // 生产基地管理
    '基地修改': 'EXSP4MQW81526A1R76',     // 生产基地管理
    '基地删除': 'TV1VFXY4HAE4C70743',     // 生产基地管理
    // 电池供应商管理修改
    '电供查询': 'EREIT88453236172R4',     // 电池供应商管理修改
    '电供修改': 'DIPVB5KVDXB6R64I63',     // 电池供应商管理修改
    // 国标转发配置
    '国标配置查询': 'JZRVN60J7US4E365E0',     // 国标转发配置
    '国标配置新增': 'JJHDFRBGJJ3X779153',     // 国标转发配置
    '国标配置修改': 'BCI1NAM6RP59YE3639',     // 国标转发配置
    '国标配置删除': 'NMWTIJ4F569HO21502',     // 国标转发配置
    '国标配置禁启用': 'WN8UPJDE85374Q7754',      // 国标转发配置
    '国标解绑车辆': 'TUP5LR17P0W11Y8939',         // 国标转发配置
    // 地标转发配置
    '地标配置查询': 'KTYI2VG4H124VI8242',     // 地标转发配置
    '地标配置新增': 'LTPU6AE3VHO13A1683',     // 地标转发配置
    '地标配置修改': 'U61GWE65R15B20145O',     // 地标转发配置
    '地标配置删除': 'R1LMSIVQ3D2R748004',     // 地标转发配置
    '地标配置禁启用': 'SNAFYVDYXQLV595050',      // 地标转发配置
    '地标解绑车辆': 'NC7GRI5NY351391118',      // 地标转发配置
    // OpenApi授权管理
    '授权查询': 'PG7LD2KG67DPY96599',     // OpenApi授权管理
    '授权新增': 'JJHDFRBGJJ3X779153',     // OpenApi授权管理
    '授权修改': 'BCI1NAM6RP59YE3639',     // OpenApi授权管理
    '授权删除': 'NMWTIJ4F569HO21502',     // OpenApi授权管理
    // 短信设置
    '短信设置查询': 'QRCVYM7F61UW2R8205',     // 短信设置
    '远程升级': 'AICTRL3I54QDRFM916',     // 短信设置
    '远程唤醒': 'RKRUW86XQ88FV0Q463',     // 短信设置
    '查询回执': 'IVG1D9DRH77B73N9L1',     // 短信设置
    '参数查询': 'SCWSW7DR8ZFFHB5580',     // 短信设置
    '参数设置': 'BGGEWISN46741UZ644'     // 短信设置
  },
  level: [
    {
      value: 1,
      label: '一级'
    },
    {
      value: 2,
      label: '二级'
    },
    {
      value: 3,
      label: '三级'
    }
  ],
  zyLevel: [
    {
      value: 1,
      label: '一级'
    },
    {
      value: 2,
      label: '二级'
    },
    {
      value: 3,
      label: '三级'
    },
    {
      value: 4,
      label: '四级'
    }
  ],
  operatType: [
    {
      value: 'insert',
      label: '新增'
    },
    {
      value: 'update',
      label: '修改'
    },
    {
      value: 'delete',
      label: '删除'
    },
    {
      value: 'export',
      label: '导出'
    },
    {
      value: 'print',
      label: '打印'
    }
  ],
  keyWordType: [
    {
      value: '1',
      label: 'TBOX'
    },
    {
      value: '2',
      label: 'SIM卡'
    },
    {
      value: '3',
      label: '电机'
    },
    {
      value: '4',
      label: '电池'
    }
  ]
};
