// 根据matrixVersion的版本来获取不同版本的参数字段
// matrixVersion  0-D3, 1-双100, 80-双80, 2-模拟双80(只有bms,vms,obc), 3-D5
// 以[字段_版本号的形式命名],无特殊版本号字段则省略版本号,公用字段也省略版本号

const publicData = [
    {
      key: 'vinCode',
      title: 'VIN码'
    },
    {
      key: 'gprsCode',
      title: 'GPRS号'
    },
    {
      key: 'collectTime1',
      title: '采集时间'
    },
    {
      key: 'receiveTime1',
      title: '接收时间'
    }
];

export default {
	gps: [	// 1,80共用
    ...publicData,
    // {
    //   key: 'hwVPrimary',
    //   title: '硬件主版本号'
    // },
    // {
    //   key: 'hwVSecondary',
    //   title: '硬件次版本号'
    // },
    // {
    //   key: 'swVPrimary',
    //   title: '软件主版本号'
    // },
    {
      key: 'locationTime',
      title: '定位标识'
    },
    // {
    //   key: 'swVSecondary',
    //   title: '软件次版本号'
    // },
    {
      key: 'swMcuVPrimary',
      title: 'MCU软件主版本号'
    },
    {
      key: 'swMcuVSecondary',
      title: 'MCU软件次版本号'
    },
    {
      key: 'swOsVPrimary',
      title: 'OS软件主版本号(HEX)'
    },
    {
      key: 'swOsVSecondary',
      title: 'OS软件次版本号(HEX)'
    },
    {
      key: 'supplierCode',
      title: '供应商代码(HEX)'
    }
  ],
	hvac_3: [
    ...publicData,
    {
      key: 'tripId',
      title: '行程id'
    },
    {
      key: 'rtStatus',
      title: '空调启动状态',
      array: [{value: 0, label: '加热制冷均关闭'}, {value: 1, label: '制冷工作'},
        {value: 2, label: '制热工作'}, {value: 3, label: '保留'}]
    },
    {
      key: 'compressorPPower',
      title: '压缩机功率(KW)'
    },
    {
      key: 'compressorSpeed',
      title: '压缩机转速(RPM)'
    },
    {
      key: 'errCode',
      title: '压缩机错误码',
      array: [{value: 0, label: '正常'}, {value: 1, label: '运行过流'}, {value: 2, label: '运行过压'}, {value: 4, label: '运行欠压'}, {value: 8, label: '待机过压'}, {value: 10, label: '待机欠压'}, {value: 20, label: '数据处理故障'}, {value: 40, label: '过流降频'}, {value: 80, label: '过功率降频'}]
    }
	],
	hvac: [			// 1,80公用
    ...publicData,
    {
      key: 'rtStatus',
      title: '空调启动状态',
      array: [{value: 0, label: '加热制冷均关闭'}, {value: 1, label: '制冷工作'},
        {value: 2, label: '制热工作'}, {value: 3, label: '保留'}]
    },
    {
      key: 'hvacLevel',
      title: '空调风机档位',
      array: [{value: 0, label: '0档'}, {value: 1, label: '1档'},
        {value: 2, label: '2档'}, {value: 3, label: '3档'},
        {value: 4, label: '4档'}, {value: 5, label: '5档'},
        {value: 6, label: '6档'}, {value: 7, label: '7档'},
        {value: 8, label: '8档'}]
    },
    {
      key: 'power',
      title: '空调功率(W)'
    },
    {
      key: 'outerTemp',
      title: '车外温度(℃)'
    },
    {
      key: 'innerTemp',
      title: '车内温度(℃)'
    },
    {
      key: 'windDir',
      title: '空调风向状态',
      array: [{value: 0, label: '吹面'}, {value: 1, label: '吹脚'},
        {value: 2, label: '除霜'}, {value: 3, label: '吹面吹脚'}, {value: 4, label: '除霜吹脚'},
        {value: 5, label: '预留'}, {value: 6, label: '预留'}, {value: 7, label: '预留'}]
    },
    {
      key: 'loopMode',
      title: '空调循环模式状态',
      array: [{value: 0, label: '内循环'}, {value: 1, label: '外循环'}]
    },
    // {
    //   key: 'hwVPrimary',
    //   title: '硬件主版本号'
    // },
    // {
    //   key: 'hwVSecondary',
    //   title: '硬件次版本号'
    // },
    // {
    //   key: 'swVPrimary',
    //   title: '软件主版本号'
    // },
    // {
    //   key: 'swVSecondary',
    //   title: '软件次版本号'
    // },
    {
      key: 'errModel',
      title: '模式电机故障',
      type: 'select',
      array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
    },
    {
      key: 'errTemp',
      title: '温度电机故障',
      array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
    },
    {
      key: 'errEvalSensor',
      title: '蒸发器传感器故障',
      type: 'select',
      array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
    },
    {
      key: 'errTempSensor',
      title: '回风温度传感器故障',
      type: 'select',
      array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
    }
	],
	bcm_0: [
    ...publicData,
    {
      key: 'alarmMode',
      title: '防盗灯状态',
      array: [{value: 0, label: 'Security LED Off (关闭)'}, {value: 1, label: 'Security LED blinking(normal, no alarm occurred) 安全灯故障闪烁（报警发生）'}, {value: 2, label: 'Security LED fault blinking(alrm occurred) 安全灯闪烁（正常，没有报警）'}, {value: 3, label: 'Invalid (无效)'}]
    },
    {
      key: 'parkingLightReminder',
      title: '小灯未关报警',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'turnRightStatus',
      title: '右转向灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'turnLeftStatus',
      title: '左转向灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'hazardSwitchStatus',
      title: '危险报警开关状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'parkingLightStatus',
      title: '小灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'highBeamStatus',
      title: '远光灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'lowBeamStatus',
      title: '近光灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'driverDoorStatus',
      title: '左门状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'passengerDoorStatus',
      title: '右门状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'leftWidthLampStatus',
      title: '左侧角灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'rightWidthLampStatus',
      title: '右侧角灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'backDoorStatus',
      title: '后背门状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'positionLampStatus',
      title: '位置灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'rearFogStatus',
      title: '后雾灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'frontFogStatus',
      title: '前雾灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'rearDefrostStatus',
      title: '后窗加热状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'leftTurnSwitchStatus',
      title: '左转向灯开关状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'rightTurnSwitchStatus',
      title: '右转向灯开关状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'brakeLampStatus',
      title: '制动灯状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
   {
     key: 'driveLampStatus',
     title: '日间行车灯状态',
     array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
   },
   {
     key: 'leftDoorLockStatus',
     title: '左门锁状态',
     array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
   },
   {
     key: 'rightDoorLockStatus',
     title: '右门锁状态',
     array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
   },
    {
      key: 'crashOutStatus',
      title: '碰撞输出状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'trunkLockStatus',
      title: '行李箱锁状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'esclPowerSupply',
      title: '电子转向柱锁电源状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'esclLockFeedback',
      title: '电子转向柱锁反馈状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'trunkUnlockSwitchPress',
      title: '行李箱解锁开关状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'hornStatus',
      title: '喇叭状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'wiperSwitchStatus',
      title: '雨刮开关状态',
      array: [{value: 0, label: 'OFF (无运动)'}, {value: 1, label: 'LOW (低速运动)'}, {value: 2, label: 'HIGH (高速运动)'}, {value: 3, label: 'INT (间歇模式)'}, {value: 4, label: 'AUTO (自动模式)'}]
    },
    {
      key: 'atwsStatus',
      title: '防盗状态',
      array: [{value: 0, label: 'Disarm (未设防)'}, {value: 1, label: 'Prearm (预警)'}, {value: 2, label: 'Armd (已设防)'}, {value: 3, label: 'Alarmed (已设防)'}]
    },
    {
      key: 'vehicleTracking',
      title: '寻车状态',
      array: [{value: 0, label: '关'}, {value: 1, label: '开'}]
    },
    {
      key: 'leftLampFaultStatus',
      title: '左转向灯故障反馈信息',
      array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
    },
    {
      key: 'rightLampFaultStatus',
      title: '右转向灯故障反馈信息',
      array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
    },
    {
      key: 'tmodeAck',
      title: 'tmode_ack',
      array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
    }
    ],
    bcm_1: [  // 1,80公用
      ...publicData,
      {
        key: 'rtStatus',
        title: 'BCM运行状态',
        array: [{value: 1, label: 'Init (初始化)'}, {value: 4, label: 'Normal(初始化后仪表直接进入该阶段)'}, {value: 7, label: 'PowerReadyOff (电源准备关闭)'}, {value: 8, label: 'Reserved (保留)'}]
      },
      {
        key: 'errLevel',
        title: 'BCM故障等级',
        array: [{value: 0, label: 'no error (正常)'}, {value: 1, label: 'Limited Operation (failure，reduce power) (故障)'}, {value: 2, label: 'Fail Silent (disable) (禁用)'}, {value: 3, label: 'Emergency shutdown (紧急关闭)'}]
      },
      {
        key: 'brakeStatus',
        title: '脚刹状态',
        array: [{value: 0, label: 'No Brake (未制动)'}, {value: 1, label: 'Brake (制动)'}]
      },
      {
        key: 'handbrakeStatus',
        title: '手刹是否拉起',
        array: [{value: 0, label: 'No Brake (未制动)'}, {value: 1, label: 'Brake (制动)'}]
      },
      {
        key: 'isCrash',
        title: '碰撞是否发生',
        array: [{value: 0, label: 'No Crash (未碰撞)'}, {value: 1, label: 'Crashed (碰撞)'}]
      },
      {
        key: 'dc12Level',
        title: '12V电压档位',
        array: [{value: 0, label: 'No Insert'}, {value: 1, label: 'OFF'}, {value: 2, label: 'ACC'}, {value: 3, label: 'ON'}, {value: 4, label: 'Start'}]
      },
     {
       key: 'dc12Voltage',
       title: '12V蓄电池电压(V)'
     },
      {
        key: 'errTurnLight',
        title: '转向灯故障状态',
        array: [{value: 0, label: 'all is ok (正常)'}, {value: 1, label: 'Turn right light fault (右转向灯故障)'}, {value: 2, label: 'Turn left light fault (左转向灯故障)'}, {value: 3, label: 'Turn right and left light fault (左右转向灯故障)'}]
      },
      {
        key: 'lfGlassStatus',
        title: '左前玻璃升降输出状态',
        array: [{value: 0, label: '无输出'}, {value: 1, label: '上升'}, {value: 2, label: '下降'}]
      },
      {
        key: 'rfGlassStatus',
        title: '右前玻璃升降输出状态',
        array: [{value: 0, label: '无输出'}, {value: 1, label: '上升'}, {value: 2, label: '下降'}]
      },
//            {
//              key: 'hwVPrimary',
//              title: '硬件主版本号'
//            },
//            {
//              key: 'hwVSecondary',
//              title: '硬件次版本号'
//            },
//            {
//              key: 'swVPrimary',
//              title: '软件主版本号'
//            },
//            {
//              key: 'swVSecondary',
//              title: '软件次版本号'
//            },
      {
        key: 'backGlassHeat',
        title: '后挡风玻璃加热是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'leftWinStatus',
        title: '左玻璃状态',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'rightWinStatus',
        title: '右玻璃状态',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isHighBeamOn',
        title: '远光灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isLowBeamOn',
        title: '近光灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isFfogOn',
        title: '前雾灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isBfogOn',
        title: '后雾灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isDayLightOn',
        title: '昼间行车灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'turnLightStatus',
        title: '转向灯转向方向',
        array: [{value: 0, label: 'OFF (关闭)'}, {value: 1, label: 'Left Turn (左转向)'}, {value: 2, label: 'Right Turn (右转向)'}]
      },
      {
        key: 'isLittleLightOn',
        title: '背光灯（小灯）是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isReadLightOn',
        title: '市内阅读灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isBrakeLightOn',
        title: '制动灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isPosLightOn',
        title: '位置灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isReverseLightOn',
        title: '倒车灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'alarmStatus',
        title: '防盗报警状态指示',
        array: [{value: 0, label: 'Disarmed (未设防)'}, {value: 1, label: 'Pre-armed (预警)'}, {value: 2, label: 'Armed (已设防)'}, {value: 3, label: 'Remind (提醒)'}, {value: 4, label: 'Alarm (报警)'}, {value: 5, label: 'Partially Armed (部分防护)'}, {value: 6, label: 'Not used (未使用)'}, {value: 7, label: 'Not used (未使用)'}]
      },
      {
        key: 'backDoorLockStatus',
        title: '后背门锁状态',
        array: [{value: 0, label: 'Unlock (否)'}, {value: 1, label: 'Locked (是)'}]
      },
      {
        key: 'lfDoorLock',
        title: '左前门锁是否锁止',
        array: [{value: 0, label: 'Unlock (否)'}, {value: 1, label: 'Locked (是)'}]
      },
      {
        key: 'rfDoorLock',
        title: '右前门门锁是否锁止',
        array: [{value: 0, label: 'Unlock (否)'}, {value: 1, label: 'Locked (是)'}]
      },
      {
        key: 'bcmArmStatus',
        title: 'BCM_ARMSTATUS',
        array: [{value: 0, label: 'Disarmed (解除)'}, {value: 1, label: 'Armed (锁定)'}]
      },
      {
        key: 'bcmEsclPowerSupply',
        title: 'BCM_ESCLPOWERSUPPLY',
        array: [{value: 0, label: 'Disable (禁用)'}, {value: 1, label: 'Enable (启用)'}, {value: 2, label: 'Error (故障)'}, {value: 3, label: 'Reserved (其他)'}]
      },
      {
        key: 'safetyBeltStatus',
        title: '安全带是否扣上',
        array: [{value: 0, label: 'No Insert (未扣安全带)'}, {value: 1, label: 'Only Driver Insert (只有驾驶员扣安全带)'}, {value: 2, label: 'Only Passage Insert (只有副驾扣安全带)'}, {value: 3, label: 'All Insert (全都扣安全带)'}]
      },
      {
        key: 'isLfDoorClose',
        title: '左前门是否关上',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isRfDoorClose',
        title: '右前门是否关上',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isEmergecyLightOn',
        title: '紧急灯是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'wiperStatus',
        title: '雨刮状态',
        array: [{value: 0, label: 'No movement (关闭)'}, {value: 1, label: 'Low speed movement (低速模式)'}, {value: 2, label: 'High speed movement (高速模式)'}, {value: 3, label: 'Start&Stop movement (间歇模式)'}]
      },
      {
        key: 'isFwiperOn',
        title: '前雨刮是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isFhoodOn',
        title: '前舱盖是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isTrunkOn',
        title: '后背门是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isHornOn',
        title: '喇叭是否开',
        array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
      },
      {
        key: 'isKeyVoltageLow',
        title: '遥控钥匙电池电量是否低（PEPS指令）',
        array: [{value: 0, label: 'Normal (正常)'}, {value: 1, label: 'Battery Low (电量低)'}]
      },
      {
        key: 'isTrespassingStatus',
        title: '非法入侵状况',
        array: [{value: 0, label: 'No History (正常)'}, {value: 1, label: 'Hood Intrusion (前舱遭入侵)'}, {value: 2, label: ' Trunk Intrusion (后备箱遭入侵)'}, {value: 3, label: ' Front Left Door Intrusion (驾驶员侧门遭入侵)'}, {value: 4, label: 'Front Right Door Intrusion (副驾驶侧门遭入侵)'}, {value: 5, label: 'Reserved (保留)'}, {value: 6, label: 'Reserved (保留)'}, {value: 7, label: 'Reserved (保留)'}]
      }
    ],
    bcm_3: [
        ...publicData,
        {
          key: 'hoodAjarStatus',
          title: '引擎盖开启/关闭',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'trunckAjarStatus',
          title: '后箱盖/后车门开启/关闭',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'driverDoorAjarStatus',
          title: '左前（驾驶员）车门开启/关闭状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'passengerDoorAjarStatus',
          title: '右前车门开启/关闭状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearLeftDoorAjarStatus',
          title: '左后车门开启/关闭状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearRightDoorAjarStatus',
          title: '右后车门开启/关闭状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontDefrosterStatus',
          title: '是否激活前窗除霜器继电器',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'backDefrosterStatus',
          title: '是否激活后窗除霜器继电器',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'lightNotOff',
          title: '小灯未关报警信号',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'keyInwithDrvDoorAjar',
          title: '点火OFF时钥匙未拔，同时驾驶员侧门打开',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'anyDoorAjar',
          title: '任何门未关门',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'doorLockStatusDrv',
          title: '左前门锁状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'threeDoorLockStatus',
          title: '其余三门锁状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'drlStatus',
          title: '指示日间行车灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontFogLightStatus',
          title: '指示前雾灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearFogLightStatus',
          title: '指示后雾灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'reverseGearEngaged',
          title: 'BCM指示倒挡状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'lowBeamtStatus',
          title: '近光灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'highBeamStatus',
          title: '远光灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'positionLightStatus',
          title: 'BCM指示位置灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'ignSwStatus',
          title: 'IGN开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'accSwStatus',
          title: 'ACC开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'keyInsertSwStatus',
          title: '钥匙插入开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'highBeamSwStatus',
          title: '远光灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'autoLampSwStatus',
          title: '自动灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontBeamSwStatus',
          title: '前照灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'positionLampSwStatus',
          title: '位置灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'brakeLampSwStatus',
          title: '制动灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'reverseLampSwStatus',
          title: '倒车灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearFogLampSwStatus',
          title: '后雾灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontFogLampSwStatus',
          title: '前雾灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'turnLeftLampSwStatus',
          title: '左转向灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'turnRightLampSwStatus',
          title: '右转向灯开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'lightSensorStatus',
          title: '环境光传感器信号状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearWiperSWStatus',
          title: '后雨刮开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearWiperIntSWStatus',
          title: '后雨刮间歇开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearWiperWashSWStatus',
          title: '后雨刮洗涤开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperLowSWStatus',
          title: '前雨刮低速开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperHighSWStatus',
          title: '前雨刮高速开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperIntSWStatus',
          title: '前雨刮间歇开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperParkSWStatus',
          title: '前雨刮回味开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperIntRehostatSignal',
          title: '前雨刮间歇调节信号',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperWashSWStatus',
          title: '前雨刮洗涤开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'flTurnLeftLampFault',
          title: '左前转向灯故障输入',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frTurnLeftLampFaultSignal',
          title: '右前转向灯故障输入',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rlTurnLeftLampFaultSignal',
          title: '左后转向灯故障输入',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rrTurnLeftLampFaultSignal',
          title: '右后转向灯故障输入',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'keyUnlockSignal',
          title: '钥匙解锁信号输入',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'keyLockSignal',
          title: '钥匙闭锁信号输入',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'centerLockSignal',
          title: '中控信号锁输入',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontDefrosteerSWStatus',
          title: '前除霜开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearDefrosteerSWStatus',
          title: '后除霜开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'hazardSWStatus',
          title: '危险报警开关',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'atwsStatus',
          title: '车身防盗报警状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'trunkUnlockInsideSWStatus',
          title: '内部行李箱解锁开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'trunkUnlockOutsideSWStatus',
          title: '外部行李箱解锁开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'driveSideDriveWinSWStatus',
          title: '驾驶侧驾驶窗开关状',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'driveSidePassWinSWStatus',
          title: '驾驶侧乘员窗开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'driveSideRLWinSWStatus',
          title: '驾驶侧左后窗开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'driveSideRRWinSWStatus',
          title: '驾驶侧右后窗开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'passWinSWStatus',
          title: '乘员窗开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rlWinSWStatus',
          title: '左后窗开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rrWinSWStatus',
          title: '右后窗开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'childLockWinSWStatus',
          title: '车窗儿童锁开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'startSignalSWStatus',
          title: '启动信号开关状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'startRelayStatus',
          title: '启动继电器状态状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'brakeLampStatus',
          title: '制动灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'highBrakeLampStatus',
          title: '高位制动灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'hazardIndicatorStatus',
          title: '危险报警指示灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'doorIndicatorStatus',
          title: '门指示灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'securityIndicatorStatus',
          title: '防盗指示灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'ecoIndicatorStatus',
          title: 'ECO指示灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'sportIndicatorStatus',
          title: 'Sport指示灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'gearProtectStatus',
          title: '换挡保护状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'powerSaveStatus',
          title: '节电输出状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'domeLampStatus',
          title: '顶灯状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'centerLackDriveStatus',
          title: '中控锁驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'trunkLockDriveStatus',
          title: '背门锁驱动状',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperLowDriveStatus',
          title: '前雨刮低速驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'frontWiperHighDriveStatus',
          title: '前雨刮高速驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rearWiperDriveStatus',
          title: '后雨刮驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'hornDriveSWStatus',
          title: '后喇叭驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'driveSideWinDriveStatus',
          title: '驾驶侧车窗驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'passSideWinDriveStatus',
          title: '乘员侧车窗驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rlWinDriveStatus',
          title: '左后车窗驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        },
        {
          key: 'rrWinDriveStatus',
          title: '右后车窗驱动状态',
          array: [{value: 0, label: 'OFF (否)'}, {value: 1, label: 'ON (是)'}]
        }
    ],
    vms: [	// 1,2,80公用
	    ...publicData,
      {
        key: 'motorStatus',
        title: '电机当前状态',
        array: [{value: 0, label: '停止'}, {value: 1, label: '正转'},
          {value: 3, label: '反转'}]
      },
      {
        key: 'isMotorTempHigh',
        title: '电机温度是否过高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'isMotorControlerTempHigh',
        title: '电机控制器温度是否过高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'isMotorControlerErr',
        title: '电机控制器是否故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      // {
      //   key: 'voltageRange',
      //   title: '电机直流母线电压'
      // },
      {
        key: 'batteryCurrent',
        title: '总电流(A)'
      },
      {
        key: 'batteryVoltage',
        title: '总电压(V)'
      },
      {
        key: 'leftBattery',
        title: '电量低'
      },
      {
        key: 'speed',
        title: '车速(km/h)'
      },
      {
        key: 'motorOwnTemp',
        title: '电机温度(℃)'
      },
      {
        key: 'gearStatus',
        title: '档位状态',
        array: [{value: 0, label: 'N档'}, {value: 1, label: 'D档'},
          {value: 2, label: 'R档'}]
      },
      {
        key: 'keyPosStatus',
        title: '钥匙位置',
        array: [{value: 0, label: 'Default Value'}, {value: 1, label: '钥匙插入'},
          {value: 2, label: '钥匙拔出'}, {value: 3, label: '钥匙插入拔出'},
          {value: 4, label: '未发现钥匙'}]
      },
      // {
      //   key: 'lowPowerStatus',
      //   title: '车辆降功率运行状态',
      //   array: [{value: 0, label: '假'}, {value: 1, label: '真'}]
      // },
      {
        key: 'isAcOn',
        title: '空调使能',
        array: [{value: 0, label: '打开'}, {value: 1, label: '关闭'}]
      },
      {
        key: 'pepsStatus',
        title: 'PEPS认证状态',
        array: [{value: 0, label: 'Default Value'}, {value: 1, label: '通过'},
          {value: 2, label: '失败'}, {value: 3, label: '保留'}]
      },
      {
        key: 'isReady',
        title: '上电准备就绪',
        array: [{value: 0, label: '熄灭'}, {value: 1, label: '点亮'}]
      },
      // {
      //   key: 'totalVol',
      //   title: '总电压'
      // },
      // {
      //   key: 'totalCurr',
      //   title: '总电流'
      // },
      {
        key: 'outchargelineStatus',
        title: '外接充电线连接状态',
        array: [{value: 0, label: '外接充电线没有连接'}, {value: 1, label: '外接充电线连接'}]
      }
      // {
      //   key: 'battSoc',
      //   title: '电池SOC(%)'
      // },
      // {
      //   key: 'battStatus',
      //   title: '电池组状态',
      //   array: [{value: 0, label: '搁置'}, {value: 1, label: '放电'}, {value: 2, label: '充电机充电'}]
      // },
      // {
      //   key: 'descPowerStatus',
      //   title: '降功率状态',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'errAlarm',
      //   title: '故障预警',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'errWarning',
      //   title: '故障报警',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'notErrWarning',
      //   title: '无异常',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'isInsuLowest',
      //   title: '绝缘超低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'highestVol',
      //   title: '最高单体电压'
      // },
      // {
      //   key: 'highestBatt',
      //   title: '最高单体电池号'
      // },
      // {
      //   key: 'lowestVol',
      //   title: '最低单体电压'
      // },
      // {
      //   key: 'lowestBatt',
      //   title: '最低单体电池号'
      // },
      // {
      //   key: 'highestTem',
      //   title: '最高温度点温度'
      // },
      // {
      //   key: 'highestTemBatt',
      //   title: '最高温度点电池号'
      // },
      // {
      //   key: 'battVolHigher',
      //   title: '单体电池电压过高',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'battVolHighest',
      //   title: '单体电池电压超高',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'battVolLower',
      //   title: '单体电池电压过低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'battVolLowest',
      //   title: '单体电池电压超低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'totalVolHigher',
      //   title: '总电压过高',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'totalVolHighest',
      //   title: '总电压超高',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'totalVolLower',
      //   title: '总电压过低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'totalVolLowest',
      //   title: '总电压超低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'volPlusBigger',
      //   title: '单体电池压差过大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'volPlusBiggest',
      //   title: '单体电池压差超大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'leftBatteryLower',
      //   title: '电池组剩余电量过低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'leftBatteryLowest',
      //   title: '电池组剩余电量超低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'dischargeCurrHigher',
      //   title: '电池组放电电流过大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'dischargeCurrHighest',
      //   title: '电池组放电电流超大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'chargeCurrHigher',
      //   title: '电池组充电电流过大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'chargeCurrHighest',
      //   title: '电池组充电电流超大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'tempHigher',
      //   title: '电池组温度过高',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'tempHighest',
      //   title: '电池组温度超高',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'tempLower',
      //   title: '电池组温度过低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'tempLowest',
      //   title: '电池组温度超低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'tempPlusHigher',
      //   title: '电池组温差过大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'tempPlusHighest',
      //   title: '电池组温差超大',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'battInsuLower',
      //   title: '电池组绝缘过低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'battInsuLowest',
      //   title: '电池组绝缘超低',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'heatLongger',
      //   title: '电池组加热时间过长',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'heatLonggest',
      //   title: '电池组加热时间超长',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'chargeLongger',
      //   title: '电池组充电时间过长',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'chargeLonggest',
      //   title: '电池组充电时间超长',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'bmsSysErr',
      //   title: 'BMS系统故障',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'chargerConnErr',
      //   title: '与充电机通讯故障',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'controConnErr',
      //   title: '与整车控制器通讯故障',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'chargeErr',
      //   title: '预充故障',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'heatErr',
      //   title: '加热异常',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'negErrClose',
      //   title: '负极接触器故障：不能闭合',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'negErrPaste',
      //   title: '负极接触器故障：粘连',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'outsideShort',
      //   title: '电池外部短路',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'insideShort',
      //   title: '电池内部短路',
      //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      // },
      // {
      //   key: 'alowableVoltage',
      //   title: '最高允许充电端电压'
      // },
      // {
      //   key: 'alowableCurrent',
      //   title: '最高允许充电电流'
      // },
      // {
      //   key: 'controInstruct',
      //   title: '充电机使能控制指令'
      // },
      // {
      //   key: 'loadType',
      //   title: '负载类型',
      //   array: [{value: 0, label: '电池'}, {value: 1, label: '加热膜'}]
      // },
      // {
      //   key: 'heaterStatus',
      //   title: '加热继电器状态',
      //   array: [{value: 0, label: '断开'}, {value: 1, label: '闭合'}]
      // },
      // {
      //   key: 'chargeCount',
      //   title: '充电次数'
      // }
    ],
    peps: [			// 1,80公用
      ...publicData,
      {
        key: 'rkeLockCmd',
        title: '遥控器状态',
        array: [{value: 0, label: 'Default Value (默认值)'}, {value: 1, label: 'Door Unlock (打开车门有效)'},
          {value: 2, label: 'Door Lock (锁定车门有效)'}, {value: 3, label: 'Comfort Open (一键降窗功能有效)'},
          {value: 4, label: 'Trunk Unlock (后备箱解锁有效)'}, {value: 5, label: 'Car Search (寻车功能有效)'},
          {value: 6, label: 'Reserved (其它)'}, {value: 7, label: 'Reserved (其它)'},
          {value: 8, label: 'Reserved (其它)'}, {value: 9, label: 'Reserved (其它)'},
          {value: 10, label: 'Reserved (其它)'}, {value: 11, label: 'Reserved (其它)'},
          {value: 12, label: 'Reserved (其它)'}, {value: 13, label: 'Reserved (其它)'},
          {value: 14, label: 'Reserved (其它)'}, {value: 15, label: 'Reserved (其它)'}]
      },
      {
        key: 'pkeLockCmd',
        title: '无钥匙进入状态',
        array: [{value: 0, label: 'Default Value (默认值)'}, {value: 1, label: 'DriverDoorUnlock (驾驶员侧车门解锁)'},
          {value: 2, label: 'Driver Door Lock (驾驶员侧车门上锁)'}, {value: 3, label: 'Comfort Open (开放)'},
          {value: 4, label: 'Trunk Unlock (后备箱未锁)'}, {value: 5, label: 'PassengerDoorUnlock(Reserved) (副驾侧车门解锁)'},
          {value: 6, label: 'PassengerDoor Lock(Reserved) (副驾侧车门上锁)'}, {value: 7, label: 'Reserved (其它)'},
          {value: 8, label: 'Reserved (其它)'}, {value: 9, label: 'Reserved (其它)'},
          {value: 10, label: 'Reserved (其它)'}, {value: 11, label: 'Reserved (其它)'},
          {value: 12, label: 'Reserved (其它)'}, {value: 13, label: 'Reserved (其它)'},
          {value: 14, label: 'Reserved (其它)'}, {value: 15, label: 'Reserved (其它)'}]
      },
      {
        key: 'bcmAlarm',
        title: 'BCM报警提示',
        array: [{value: 0, label: 'Default Value (默认值)'}, {value: 1, label: '"OnlevelLock" Alarm (离开未上锁报警)'},
          {value: 2, label: '"KeyInLock" Alarm (未拔钥匙报警)'}, {value: 3, label: 'Reserved (保留)'},
          {value: 4, label: 'Reserved (保留)'}, {value: 5, label: 'Reserved (保留)'},
          {value: 6, label: 'Reserved (保留)'}, {value: 7, label: 'Reserved (保留)'},
          {value: 8, label: 'Reserved (保留)'}, {value: 9, label: 'Reserved (保留)'},
          {value: 10, label: 'Reserved (保留)'}, {value: 11, label: 'Reserved (保留)'},
          {value: 12, label: 'Reserved (保留)'}, {value: 13, label: 'Reserved (保留)'},
          {value: 14, label: 'Reserved (保留)'}, {value: 15, label: 'Reserved (保留)'}]
      },
      {
        key: 'icuAlarm',
        title: '仪表报警提示',
        array: [{value: 0, label: 'Default Value (默认值)'}, {value: 1, label: 'Key Not Found (钥匙未插入)'},
          {value: 2, label: 'Key Battery Low (关键电池低)'}, {value: 3, label: 'P/N Level Start (P/N档启动)'},
          {value: 4, label: 'Press Brake Start (请踩刹车启动车辆)'}, {value: 5, label: 'Backup Key Start (备份键启动)'},
          {value: 6, label: 'ESCL Unlock Failure (ESCL解锁失败 )'}, {value: 7, label: 'Inhibited Key Found'},
          {value: 8, label: 'Reserved (其他)'}, {value: 9, label: 'Reserved (其他)'},
          {value: 10, label: 'Reserved (其他)'}, {value: 11, label: 'Reserved (其他)'},
          {value: 12, label: 'Reserved (其他)'}, {value: 13, label: 'Reserved (其他)'},
          {value: 14, label: 'Reserved (其他)'}, {value: 15, label: 'Reserved (其他)'}]
      },
      {
        key: 'esclPowerStatus',
        title: 'ESCL电源状态(电子转向柱锁)',
        array: [{value: 0, label: 'Default Value (默认值)'}, {value: 1, label: 'Unlock Power Enable (使电源开启)'},
          {value: 2, label: 'Lock Power Enable (使电源关闭)'}, {value: 3, label: 'Power Disable (电力暂停)'}]
      },
      {
        key: 'sysPowerMode',
        title: '整车电源档位',
        array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ACC'}, {value: 2, label: 'ON'}]
      },
      {
        key: 'fobIndex',
        title: '钥匙位',
        array: [{value: 0, label: 'Default Value (默认值)'}, {value: 1, label: 'Fob1智能钥匙'},
          {value: 2, label: 'Fob2'}, {value: 3, label: 'Fob3(Reserved)'},
          {value: 4, label: 'Fob4(Reserved)'}]
      },
      {
        key: 'crankRequest',
        title: '启动请求(高压上电请求)',
        array: [{value: 0, label: '无请求'}, {value: 1, label: '请求'}]
      },
      {
        key: 'esclStatus',
        title: 'ESCL状态',
        array: [{value: 0, label: '默认值'}, {value: 1, label: '解锁'}, {value: 2, label: '未解锁'}, {value: 3, label: '故障'}]
      },
//          {
//            key: 'hwVPrimary',
//            title: '硬件主版本号'
//          },
//          {
//            key: 'hwVSecondary',
//            title: '硬件次版本号'
//          },
//          {
//            key: 'swVPrimary',
//            title: '软件主版本号'
//          },
//          {
//            key: 'swVSecondary',
//            title: '软件次版本号'
//          },
      {
        key: 'fobPosition',
        title: '钥匙位置',
        array: [{value: 0, label: '默认值'}, {value: 1, label: '钥匙插入'},
          {value: 2, label: '钥匙拔出'}, {value: 3, label: '钥匙插入拔出'},
          {value: 4, label: '未发现钥匙'}]
      },
      {
        key: 'authResult',
        title: '认证状态',
        array: [{value: 0, label: 'Not Pass (未通过)'}, {value: 1, label: 'Pass (通过)'}]
      },
      {
        key: 'backupKeyStatus',
        title: '备用钥匙状态',
        array: [{value: 0, label: 'Invalid (无效)'}, {value: 1, label: 'Valid (有效)'}]
      },
      {
        key: 'ssbSw1',
        title: '启动按键状态1',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'ssbSw2',
        title: '启动按键状态2',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'driverDoorSw',
        title: '驾驶门状态',
        array: [{value: 0, label: 'Invalid (无效)'}, {value: 1, label: 'Valid (有效)'}]
      },
      {
        key: 'passerDoorSw',
        title: '副驾门状态',
        array: [{value: 0, label: 'Invalid (无效)'}, {value: 1, label: 'Valid (有效)'}]
      },
      {
        key: 'trunkSw',
        title: '尾门状态',
        array: [{value: 0, label: 'Invalid (无效)'}, {value: 1, label: 'Valid (有效)'}]
      },
      {
        key: 'brakeSw',
        title: '制动踏板状态',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'accFb',
        title: 'ACC电源状态',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'onFb',
        title: 'ON电源状态',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'accCtrl',
        title: 'ACC控制信号',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'onCtrl',
        title: 'ON控制信号',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'esclUnlockFb',
        title: 'ESCL_UNLOCK_FB',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      },
      {
        key: 'esclLockEn',
        title: 'ESCL_LOCK_EN',
        array: [{value: 0, label: 'Invalid (未启动)'}, {value: 1, label: 'Valid (启动)'}]
      }
     // {
     //   key: 'vspeed',
     //   title: '车速'
     // },
     // {
     //   key: 'espeed',
     //   title: '电机转速'
     // },
     // {
     //   key: 'peps_successor',
     //   title: 'pepsSuccessor'
     // },
     // {
     //   key: 'peps_alive',
     //   title: 'pepsAlive'
     // },
     // {
     //   key: 'peps_ring',
     //   title: 'pepsRing'
     // },
     // {
     //   key: 'peps_limp_home',
     //   title: 'pepsLimpHome'
     // },
     // {
     //   key: 'pepsSleepIndication',
     //   title: 'peps_sleep_indication'
     // },
     // {
     //   key: 'pepsSleepAckonwLedge',
     //   title: 'peps_sleep_ackonw_ledge'
     // },
     // {
     //   key: 'pepsBcmDataByte2',
     //   title: 'peps_bcm_data_byte_2'
     // },
     // {
     //   key: 'pepsDataByte3',
     //   title: 'peps_data_byte_3'
     // },
     // {
     //   key: 'pepsDataByte4',
     //   title: 'peps_data_byte_4'
     // },
     // {
     //   key: 'pepsDataByte5',
     //   title: 'peps_data_byte_5'
     // },
     // {
     //   key: 'pepsDataByte6',
     //   title: 'peps_data_byte_6'
     // },
     // {
     //   key: 'pepsDataByte7',
     //   title: 'peps_data_byte_7'
     // }
    ],
    version: [   // 1,80公用
        ...publicData,
        {
          key: 'hvacHardwarePrimary',
          title: 'HVAC硬件主版本号'
        },
        {
          key: 'hvacHardwareSecondary',
          title: 'HVAC硬件次版本号'
        },
        {
          key: 'hvacSoftwarePrimary',
          title: 'HVAC软件主版本号'
        },
        {
          key: 'hvacSoftwareSecondary',
          title: 'HVAC软件次版本号'
        },
        {
          key: 'icuHardwarePrimary',
          title: 'ICU硬件主版本号'
        },
        {
          key: 'icuHardwareSecondary',
          title: 'ICU硬件次版本号'
        },
        {
          key: 'icuSoftwarePrimary',
          title: 'ICU软件主版本号'
        },
        {
          key: 'icuSoftwareSecondary',
          title: 'ICU软件次版本号'
        },
        {
          key: 'bcmHardwarePrimary',
          title: 'BCM硬件主版本号'
        },
        {
          key: 'bcmHardwareSecondary',
          title: 'BCM硬件次版本号'
        },
        {
          key: 'bcmSoftwarePrimary',
          title: 'BCM软件主版本号'
        },
        {
          key: 'bcmSoftwareSecondary',
          title: 'BCM软件次版本号'
        },
        {
          key: 'vmsHardwarePrimary',
          title: 'VMS硬件主版本号'
        },
        {
          key: 'vmsHardwareSecondary',
          title: 'VMS硬件次版本号'
        },
        {
          key: 'vmsSoftwarePrimary',
          title: 'VMS软件主版本号'
        },
        {
          key: 'vmsSoftwareSecondary',
          title: 'VMS软件次版本号'
        },
        {
          key: 'gprsHardwarePrimary',
          title: 'GPRS硬件主版本号'
        },
        {
          key: 'gprsHardwareSecondary',
          title: 'GPRS硬件次版本号'
        },
        {
          key: 'gprsSoftwarePrimary',
          title: 'GPRS软件主版本号'
        },
        {
          key: 'gprsSoftwareSecondary',
          title: 'GPRS软件次版本号'
        },
        {
          key: 'bmsHardwarePrimary',
          title: 'BMS硬件主版本号'
        },
        {
          key: 'bmsHardwareSecondary',
          title: 'BMS硬件次版本号'
        },
        {
          key: 'bmsSoftwarePrimary',
          title: 'BMS软件主版本号'
        },
        {
          key: 'bmsSoftwareSecondary',
          title: 'BMS软件次版本号'
        },
        {
          key: 'mcHardwarePrimary',
          title: 'MC硬件主版本号'
        },
        {
          key: 'mcHardwareSecondary',
          title: 'MC硬件次版本号'
        },
        {
          key: 'mcSoftwarePrimary',
          title: 'MC软件主版本号'
        },
        {
          key: 'mcSoftwareSecondary',
          title: 'MC软件次版本号'
        },
        {
          key: 'pepsHardwarePrimary',
          title: 'PEPS硬件主版本号'
        },
        {
          key: 'pepsHardwareSecondary',
          title: 'PEPS硬件次版本号'
        },
        {
          key: 'pepsSoftwarePrimary',
          title: 'PEPS软件主版本号'
        },
        {
          key: 'pepsSoftwareSecondary',
          title: 'PEPS软件次版本号'
        },
        {
          key: 'gpsHardwarePrimary',
          title: 'GPS硬件主版本号'
        },
        {
          key: 'gpsHardwareSecondary',
          title: 'GPS硬件次版本号'
        },
        {
          key: 'gpsSoftwarePrimary',
          title: 'GPS软件主版本号'
        },
        {
          key: 'gpsSoftwareSecondary',
          title: 'GPS软件次版本号'
        },
        {
          key: 'dcdcHardwarePrimary',
          title: 'DCDC硬件主版本号'
        },
        {
          key: 'dcdcHardwareSecondary',
          title: 'DCDC硬件次版本号'
        },
        {
          key: 'dcdcSoftwarePrimary',
          title: 'DCDC软件主版本号'
        },
        {
          key: 'dcdcSoftwareSecondary',
          title: 'DCDC软件次版本号'
        },
        {
          key: 'adasHardwarePrimary',
          title: 'ADAS硬件主版本号'
        },
        {
          key: 'adasHardwareSecondary',
          title: 'ADAS硬件次版本号'
        },
        {
          key: 'adasSoftwarePrimary',
          title: 'ADAS软件主版本号'
        },
        {
          key: 'adasSoftwareSecondary',
          title: 'ADAS软件次版本号'
        },
        {
          key: 'packManufacturer',
          title: '电池PACK厂家'
        },
        {
          key: 'bmsManufacturer',
          title: 'BMS厂家'
        },
        {
          key: 'cellManufacturer',
          title: '电芯厂家'
        },
        {
          key: 'cellType',
          title: '电芯类型'
        }
    ],
    eps: [	// 1,80公用
      ...publicData,
      {
        key: 'errLevel',
        title: 'EPS故障等级',
        type: 'select',
        array: [{value: 0, label: '无故障'}, {value: 1, label: '一级故障'}, {value: 2, label: '二级故障(严重故障)'}]
      },
      {
        key: 'workStatus',
        title: 'EPS工作状态',
        type: 'select',
        array: [{value: 0, label: '未工作'}, {value: 1, label: '正在工作'}]
      },
      {
        key: 'helpMoment',
        title: 'EPS助力力矩'
      },
      {
        key: 'electricity',
        title: 'EPS电机工作电流(A)'
      },
      {
        key: 'voltage',
        title: '电源电压(V)'
      },
      {
        key: 'isSensorErr',
        title: 'EPS传感器故障',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isCurrentException',
        title: 'EPS电流异常',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isVoltageHigher',
        title: 'EPS电压过高',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isTempHigher',
        title: 'EPS温度过高',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isVoltageLower',
        title: 'EPS电压过低',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isInitException',
        title: 'EPS初始化异常',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isDriverErr',
        title: 'EPS电机驱动器故障',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isMotorInitErr',
        title: '电机初始化及轮询故障',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isAngleSensorErr',
        title: '角度传感器故障',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isCanCtrlErr',
        title: 'CAN控制器故障',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'isKeyInvalid',
        title: '钥匙位置失效',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      }
      // {
      //   key: 'isTempLowerLmt',
      //   title: '温度传感器超下限(℃)'
      // },
      // {
      //   key: 'isTempUpperLmt',
      //   title: '温度传感器超上限(℃)'
      // }
    ],
    eps_3: [
        ...publicData,
        {
          key: 'streeingTorque',
          title: '方向盘扭矩'
        },
        {
          key: 'streeingWheelAngle',
          title: '方向盘转向角'
        },
        {
          key: 'electPowerConsumptionCurrent',
          title: '助力转向电流(A)'
        },
        {
          key: 'epsFailed',
          title: '助力转向故障',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        },
        {
          key: 'sensorFailureState',
          title: '传感器内部错误',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        },
        {
          key: 'sasCalibratedState',
          title: '角度传感器的校准状态',
          array: [{value: 0, label: '未校准'}, {value: 1, label: '校准正常'}]
        }
    ],
    adas_0: [
      ...publicData,
      {
        key: 'systemStatus',
        title: 'ADAS_系统状态',
        array: [{value: 0, label: '系统正在启动'}, {value: 1, label: '系统正在运行'}, {value: 2, label: 'reserved'}, {value: 3, label: 'reserved'}]
      },
      {
        key: 'ldwsRunningStatus',
        title: 'LDW_功能运行状态',
        array: [{value: 0, label: '关闭'}, {value: 1, label: '运行'}]
      },
      {
        key: 'fcwsRunningStatus',
        title: 'FCW_功能运行状态',
        array: [{value: 0, label: '关闭'}, {value: 1, label: '运行'}]
      },
      {
        key: 'pcwsRunningStatus',
        title: 'PCW_功能运行状态',
        array: [{value: 0, label: '关闭'}, {value: 1, label: '运行'}]
      },
      {
        key: 'calibRunningStatus',
        title: '标定功能运行状态',
        array: [{value: 0, label: '关闭'}, {value: 1, label: '运行'}]
      },
      {
        key: 'systemBootFailed',
        title: '系统无法启动',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'cameraError',
        title: '相机错误',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'systemHaltedError',
        title: '系统死机无响应',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
//            {
//              key: 'canReceiveError',
//              title: 'CAN总线接收不到车身状态(车速、转向等)报文',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
//            },
      {
        key: 'needCalibrateError',
        title: '设备需要标定',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dvrRunningStatus',
        title: 'DVR_系统运行状态',
        array: [{value: 0, label: '系统正在启动'}, {value: 1, label: '系统正在运行'}, {value: 2, label: '保留'}, {value: 3, label: '保留'}]
      },
      {
        key: 'dvrRecordingStatus',
        title: 'DVR_录像状态',
        array: [{value: 0, label: '录像停止'}, {value: 1, label: '正在录像'}]
      },
      {
        key: 'dvrEmergencyRecording',
        title: 'DVR_紧急录像',
        array: [{value: 0, label: '未触发紧急录像'}, {value: 1, label: '已触发紧急录像'}]
      },
      {
        key: 'dvrBootFailed',
        title: 'DVR_无法启动',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dvrCameraError',
        title: 'DVR_相机故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dvrSystemHaltedError',
        title: 'DVR_系统死机无响应',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
//            {
//              key: 'dvrNoSdcard',
//              title: 'DVR_无SD卡或SD卡读写错误',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
//            },
//            {
//              key: 'dvrUnsupportedFs',
//              title: 'DVR_SD卡文件系统不支持',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
//            },
      {
        key: 'dvrNoFreeStorage',
        title: 'DVR_SD卡存储空间不足',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'sosKeyStatus',
        title: 'SOS_按键状态',
        array: [{value: 0, label: '未按下'}, {value: 1, label: '按键按下'}]
      },
      {
        key: 'serviceKeyStatus',
        title: 'Service_按键状态',
        array: [{value: 0, label: '未按下'}, {value: 1, label: '按键按下'}]
      }
//            {
//              key: 'hwVPrimary',
//              title: '硬件主版本号'
//            },
//            {
//              key: 'hwVSecondary',
//              title: '硬件_次版本号'
//            },
//            {
//              key: 'swVPrimary',
//              title: '软件_主版本号'
//            },
//            {
//              key: 'swVSecondary',
//              title: '软件_次版本号'
//            }
    ],
    adas_1: [ // 1,80公用
      ...publicData,
      // {
      //   key: 'hwVPrimary',
      //   title: '硬件主版本号'
      // },
      // {
      //   key: 'hwVSecondary',
      //   title: '硬件次版本号'
      // },
      // {
      //   key: 'swVPrimary',
      //   title: '软件主版本号'
      // },
      // {
      //   key: 'swVSecondary',
      //   title: '软件次版本号'
      // },
      {
        key: 'leftLaneDetected',
        title: '左车道检测',
        array: [{value: 0, label: '未检测到左侧车道线'}, {value: 1, label: '检测到左侧车道线'}]
      },
      {
        key: 'laneDepartureLeft',
        title: '左车道偏离',
        array: [{value: 0, label: '左侧未偏离车道线'}, {value: 1, label: '左侧偏离车道线'}]
      },
      {
        key: 'rightLaneDetected',
        title: '右车道检测',
        array: [{value: 0, label: '未检测到右侧车道线'}, {value: 1, label: '检测到右侧车道线'}]
      },
      {
        key: 'laneDepartureRight',
        title: '右车道偏移',
        array: [{value: 0, label: '右侧未偏离车道线'}, {value: 1, label: '右侧偏离车道线'}]
      },
      {
        key: 'vehicleDecectResult',
        title: '车辆的测定结果',
        array: [{value: 0, label: 'Do not detect the front vehicle (前方未检测到车辆)'}, {value: 1, label: 'Detect the front vehicle (前方检测到车辆)'}, {value: 2, label: 'Detect the front vehicle,Warning Level=1 (前方检测到车辆，警告等级1)'}, {value: 3, label: 'Reserved (保留)'}, {value: 4, label: 'Detect the front vehicle,Warning Level=2 (前方检测到车辆，警告等级2)'}]
      },
      {
        key: 'crashTime',
        title: '碰撞时间'
      },
      {
        key: 'errorInfo',
        title: '错误信息',
        array: [{value: 0, label: 'NO Error (无异常)'}, {value: 15, label: 'Reserved (保留)'}, {value: 31, label: 'Calibration Error (校准异常)'}, {value: 47, label: 'Camera Error (摄像机异常)'}, {value: 63, label: 'Controller Error (控制器异常)'}, {value: 79, label: 'CAN Error (can异常)'}]
      },
      {
        key: 'invalidInfo',
        title: '无效信息'
      }
    ],
    bms_0: [
      ...publicData,
//            {
//              key: 'currentTotal',
//              title: '总电流'
//            },
//            {
//              key: 'voltageTotal',
//              title: '总电压'
//            },
      {
        key: 'soc',
        title: 'soc(%)'
      },
      {
        key: 'soh',
        title: 'soh(%)'
      },
      {
        key: 'remainMileage',
        title: '续航里程(km)'
      },
      {
        key: 'cellVoltMax',
        title: '单体最高电压(V)'
      },
      {
        key: 'cellVoltMaxNum',
        title: '单体最高电压编号'
      },
      {
        key: 'cellAveVolt',
        title: '单体平均电压(V)'
      },
      {
        key: 'cellVoltMin',
        title: '单体最低电压(V)'
      },
      {
        key: 'cellVoltMinNum',
        title: '单体最低电压编号'
      },
      {
        key: 'cellTempMax',
        title: '最高温度(℃)'
      },
      {
        key: 'cellTempMaxNum',
        title: '最高温度点编号'
      },
      {
        key: 'battTempAvg',
        title: '平均温度(℃)'
      },
      {
        key: 'cellTempMin',
        title: '最低温度(℃)'
      },
      {
        key: 'cellTempMinNum',
        title: '最低温度点编号'
      },
      {
        key: 'cellTotal',
        title: '电池单体总数'
      },
      {
        key: 'tempSensorTotal',
        title: '可充电储能温度探针个数'
      },
      {
        key: 'maxChargeVoltage',
        title: '动力电池系统最高允许充电电压(V)'
      },
      {
        key: 'maxDischargeVoltage',
        title: '动力电池系统最低允许放电电压(V)'
      },
      {
        key: 'maxDischargeCurrent',
        title: '动力电池系统最大允许放电电流(A)'
      },
      {
        key: 'maxChargeCurrent',
        title: '动力电池系统最大允许充电电流(A)'
      },
      {
        key: 'supplierCode',
        title: '生产厂商代码'
      },
      {
        key: 'batteryTypeCode',
        title: '电池类型代码'
      },
      {
        key: 'ratedEnergy',
        title: '额定能量(kw/h)'
      },
      {
        key: 'ratedVoltage',
        title: '额定电压(V)'
      },
      {
        key: 'productionDate',
        title: '电池生产日期'
      },
      {
        key: 'batteryCode',
        title: '流水号'
      },
      {
        key: 'batterySystemCodeLength',
        title: '可充电储能系统编码长度'
      }
//            {
//              key: 'voltages1',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages2',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages3',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages4',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages5',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages6',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages7',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages8',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages9',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages10',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages11',
//              title: '单体电池电压'
//            },
//            {
//              key: 'voltages12',
//              title: '单体电池电压'
//            },
//            {
//              key: 'temps1',
//              title: '温度采集点温度'
//            },
//            {
//              key: 'temps2',
//              title: '温度采集点温度'
//            },
//            {
//              key: 'tempDiffl2',
//              title: '温度差异报警_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempHigherl2',
//              title: '温度过高_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempHighestl3',
//              title: '温度超高_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempHighestl4',
//              title: '温度超高_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempLowerl2',
//              title: '温度过低_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempLowestl3',
//              title: '温度超低_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'heatMoTempratureHighestl4',
//              title: '加热膜温度超高_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempRiseSpeedBigger',
//              title: '温升速率过高',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempRiseSpeedBiggestl4',
//              title: '温升速率超高_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempDisconnectl2',
//              title: '温度采集断开_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'tempDisconnectl4',
//              title: '温度采集断开_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'heatErrl4',
//              title: '加热故障_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'totalVolHighestl3',
//              title: '总电压超高_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'totalVolHighestl4',
//              title: '总电压超高_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'totalVolLowerl2',
//              title: '总电压过低_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'totalVolLowestl3',
//              title: '总电压超低_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'totalVolLowestl4',
//              title: '总电压超低_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'totalVolLowestChargerl4',
//              title: '总电压超低_充电_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'volPlusBiggerl2',
//              title: '压差过大_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'sellVolHighestL3',
//              title: '单体电压超高_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'sellVolHighestL4',
//              title: '单体电压超高_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'sellVolLowerL2',
//              title: '单体电压过低_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'sellVolLowestL3',
//              title: '单体电压超低_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'sellVolLowestL4',
//              title: '单体电压超低_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'sellVolLowestChargerL4',
//              title: '单体电压超低_充电_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'volDisconnectl2',
//              title: '电压采集断开_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'volDisconnectl4',
//              title: '电压采集断开_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'dischargerCurrentBiggerl2',
//              title: '放电电流过大_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'dischargerCurrentBiggestl3',
//              title: '放电电流超大_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'chargerCurrentBiggestl3',
//              title: '充电电流超大_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'chargerCurrentBiggestl4',
//              title: '充电电流超大_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'packConsistency',
//              title: '动力蓄电池一致性差报警',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'socLowerAlarm',
//              title: 'SOC低报警',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'socHigherAlarm',
//              title: 'SOC过高报警_内部',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'socJumpAlarm',
//              title: 'SOC跳变报警_1级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'insuLowerl2',
//              title: '绝缘过低_2级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'insuLowestl4',
//              title: '绝缘超低_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'chargeTimeLongestl4',
//              title: '充电时间内超长_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'heatTimeLongestl5',
//              title: '加热时间超长_5级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'bmsSysErrl3',
//              title: 'BMS系统故障_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'conChargerErrl3',
//              title: '与充电机通信故障_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'conVcuErrl1',
//              title: '与VCU通信故障_1级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'negErrClosel3',
//              title: '负极接触器故障_不吸合_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'negErrPastel3',
//              title: '负极接触器故障_粘连_3级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'hvilFault',
//              title: 'BMS高压互锁故障',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'crashLevel4',
//              title: '碰撞_4级',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            },
//            {
//              key: 'batterySysDismatch',
//              title: '可充电储能系统不匹配报警',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
//            }
    ],
    bms_1: [ // 双100
      ...publicData,
      {
        key: 'totalVoltage',
        title: '总电压(V)'
      },
      {
        key: 'totalCurrent',
        title: '总电流(A)'
      },
      {
        key: 'isChargerConnected',
        title: '外接充电线连接状态',
        array: [{value: 0, label: '外接充电线没有连接'}, {value: 1, label: '外接充电线连接'}]
      },
      {
        key: 'cpSignal',
        title: 'CP信号',
        array: [{value: 0, label: '无'}, {value: 1, label: '有'}]
      },
      {
        key: 'ksStatus',
        title: '总负接触器KS状态',
        array: [{value: 0, label: 'KS打开'}, {value: 1, label: 'KS闭合'}]
      },
      {
        key: 's2Status',
        title: '开关S2状态',
        array: [{value: 0, label: 'S2打开'}, {value: 1, label: 'S2闭合'}]
      },
      {
        key: 'chargerConnectStatus',
        title: '与充电机通讯状态',
        array: [{value: 0, label: 'BMS与充电机通讯断开'}, {value: 1, label: 'BMS与充电机通讯接通'}]
      },
      {
        key: 'batteryBalanceStatus',
        title: '电池包均衡状态',
        array: [{value: 0, label: '电池包没有均衡'}, {value: 1, label: '电池包均衡过程完成'}]
      },
      {
        key: 'coldFanStatus',
        title: '冷却风扇状态',
        array: [{value: 0, label: '断开'}, {value: 1, label: '闭合'}]
      },
      {
        key: 'soc',
        title: '电池组当前的SOC(%)'
      },
      {
        key: 'batteryStatus',
        title: '电池组当前状态',
        array: [{value: 0, label: '搁置'}, {value: 1, label: '放电'}, {value: 2, label: '回馈'}, {value: 3, label: '充电机充电'}]
      },
      {
        key: 'errLevel',
        title: '故障等级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '1级故障(报警)'}, {value: 2, label: '2级故障(降功率)'}, {value: 3, label: '3级故障(锁定输出)'}, {value: 4, label: '4级故障(动力切断)'}]
      },
      {
        key: 'powerBatteryAlarm',
        title: '动力电池报警指示',
        array: [{value: 0, label: '正常'}, {value: 1, label: '故障报警'}]
      },
      {
        key: 'descPowerLevel',
        title: '降功率等级',
        array: [{value: 0, label: '无'}, {value: 1, label: '1级降功率(80%)'}, {value: 2, label: '2级降功率(50%)'}, {value: 3, label: '3级降功率(30%)'}]
      },
      {
        key: 'isInsuLowest',
        title: '绝缘超低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'voltageHighest',
        title: '最高单体电压(V)'
      },
      {
        key: 'highestVoltageNo',
        title: '最高单体电池号'
      },
      {
        key: 'voltageLowest',
        title: '最低单体电压(V)'
      },
      {
        key: 'lowestVoltageNo',
        title: '最低单体电池号'
      },
      {
        key: 'tempHighest',
        title: '最高温度点温度(℃)'
      },
      {
        key: 'highestTempNo',
        title: '最高温度点电池号'
      },
     // {
     //   key: 'voltages1',
     //   title: '1#-4#单体电池电压'
     // },
     // {
     //   key: 'voltages2',
     //   title: '5#-8#单体电池电压'
     // },
     // {
     //   key: 'voltages3',
     //   title: '9#-12#单体电池电压'
     // },
     // {
     //   key: 'voltages4',
     //   title: '13#-16#单体电池电压'
     // },
     // {
     //   key: 'voltages5',
     //   title: '17#-20#单体电池电压'
     // },
     // {
     //   key: 'voltages6',
     //   title: '21#-24#单体电池电压'
     // },
     // {
     //   key: 'voltages7',
     //   title: '25#-28#单体电池电压'
     // },
     // {
     //   key: 'voltages8',
     //   title: '29#-32#单体电池电压'
     // },
     // {
     //   key: 'voltages9',
     //   title: '33#-36#单体电池电压'
     // },
     // {
     //   key: 'voltages10',
     //   title: '37#-40#单体电池电压'
     // },
     // {
     //   key: 'voltages11',
     //   title: '41#-44#单体电池电压'
     // },
     // {
     //   key: 'voltages12',
     //   title: '45#-48#单体电池电压'
     // },
      {
        key: 'volHighestCharging4',
        title: '单体电压超高-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'sellVolHighestFbl3',
        title: '单体电压超高-回馈-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'volHighest3',
        title: '单体电压超高-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolHighestChargerl4',
        title: '总电压超高-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolHighestFbl3',
        title: '总电压超高-回馈-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolHighest3',
        title: '总电压超高-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'sellVolLowerl1',
        title: '单体电压过低-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'sellVolLowerl2',
        title: '单体电压过低-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'sellVolLowerl3',
        title: '单体电压过低-3级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolLowerl1',
        title: '总电压过低-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolLowerl2',
        title: '总电压过低-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolLowerl3',
        title: '总电压过低-3级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'sellVolLowestl3',
        title: '单体电压超低-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'volLowest4',
        title: '单体电压超低-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'sellVolLowestCharger',
        title: '单体电压超低-充电',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolLowestl3',
        title: '总电压超低-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolLowest4',
        title: '总电压超低-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'totalVolLowestCharger',
        title: '总电压超低-充电',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'volPlusBiggerl1',
        title: '压差过大-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'volPlusBiggerl2',
        title: '压差过大-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'volPlusBigger3',
        title: '压差过大-3级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'socLowerl1',
        title: 'SOC过低-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'socLowerl2',
        title: 'SOC过低-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'socLower3',
        title: 'SOC过低-3级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dischargerCurrentBiggerl1',
        title: '放电电流过大-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
     // {
     //   key: 'dischargeCurrentBigger2',
     //   title: '放电电流过大-2级降功率',
     //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     // },
     // {
     //   key: 'dischargeCurrentBigger3',
     //   title: '放电电流过大-3级降功率',
     //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     // },
     // {
     //   key: 'dischargeCurrentBiggest3',
     //   title: '放电电流超大-3级',
     //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     // },
     // {
     //   key: 'chargeCurrentBiggest3',
     //   title: '充电电流超大-3级',
     //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     // },
     // {
     //   key: 'chargeCurrentBiggest4',
     //   title: '充电电流超大-4级',
     //   array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     // },
      {
        key: 'feedbackCurrentBiggestl3',
        title: '回馈电流超大-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'feedbackCurrentBiggestl4',
        title: '回馈电流超大-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempratureHigherl1',
        title: '温度过高-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempratureHigherl2',
        title: '温度过高-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempratureHigherl3',
        title: '温度过高-3级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempratureHighestl3',
        title: '温度超高-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempratureHighest4',
        title: '温度超高-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'heatMoTempratureHighest',
        title: '温度超高-加热膜温度超高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempLowerl1',
        title: '温度过低-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempLowerl2',
        title: '温度过低-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempLowerl3',
        title: '温度过低-3级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempLowestl3',
        title: '温度超低-3级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempPlusHigherl1',
        title: '温差过高-1级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempPlusHigherl2',
        title: '温差过高-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempPlusHigher3',
        title: '温差过高-3级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempRiseSpeedBiggerl2',
        title: '温升速率过高-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
     {
       key: 'tempRiseSpeedBiggestl4',
       title: '温升速率超高-4级',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
      {
        key: 'insuLowl1',
        title: '绝缘过低-1级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'insuLowl2',
        title: '绝缘过低-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'insuLowl4',
        title: '绝缘超低-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'chargeTimeLong',
        title: '充电时间超长',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'heatTimeLong',
        title: '加热时间超长',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'bmsSysErr',
        title: 'BMS系统故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'conChargerErr',
        title: '与充电机通讯故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'volDisconnectl4',
        title: '电压采集断开-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'volDisconnectl2',
        title: '电压采集断开-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempDisconnectl4',
        title: '温度采集断开-4级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempDisconnectl2',
        title: '温度采集断开-2级降功率',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'heatErr',
        title: '加热故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'negErrClose',
        title: '负极接触器故障：不能闭合',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'negErrPaste',
        title: '负极接触器故障：粘连',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'crashAlarm',
        title: '碰撞报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'vmsAlarmCmd',
        title: 'VMS报警指令'
      },
      // {
      //   key: 'temps1',
      //   title: '1#-8#探头温度(℃)'
      // },
      // {
      //   key: 'temps2',
      //   title: '9#-12#探头温度(℃)'
      // },
      {
        key: 'bmsErrCode',
        title: 'BMS故障码'
      },
//            {
//              key: 'hwVPrimary',
//              title: '硬件主版本号'
//            },
//            {
//              key: 'hwVSecondary',
//              title: '硬件次版本号'
//            },
//            {
//              key: 'swVPrimary',
//              title: '软件主版本号'
//            },
//            {
//              key: 'swVSecondary',
//              title: '软件次版本号'
//            },
//            {
//              key: 'packManufacturer',
//              title: 'PACK厂家'
//            },
//            {
//              key: 'bmsManufacturer',
//              title: 'BMS厂家'
//            },
//            {
//              key: 'battCellsManufacturer',
//              title: '电芯厂家'
//            },
//            {
//              key: 'battCellsType',
//              title: '电芯类型'
//            },
//            {
//              key: 'batterySupplierCode',
//              title: '生产厂商代码'
//            },
//            {
//              key: 'batteryTypeCode',
//              title: '车载储能装置类型代码'
//            },
     {
       key: 'nominalEnergy',
       title: '额定能量'
     },
     {
       key: 'nominalVoltage',
       title: '额定电压'
     },
     // {
     //   key: 'batteryProDate',
     //   title: '日期'
     // },
     // {
     //   key: 'batteryProSn',
     //   title: '流水号'
     // },
     // {
     //   key: 'batteryCodeLength',
     //   title: '可充电储能系统编码长度'
     // },
     // {
     //   key: 'alowableVoltage',
     //   title: '最高允许充电端电压'
     // },
     // {
     //   key: 'alowableCurrent',
     //   title: '最高允许充电电流'
     // },
     // {
     //   key: 'loadType',
     //   title: '负载类型'
     // },
     // {
     //   key: 'heaterStatus',
     //   title: '加热继电器状态'
     // },
     // {
     //   key: 'chargeCount',
     //   title: '充电次数'
     // },
      {
        key: 'dischargePower10s',
        title: '动力电池包10s最大放电功率(kwh)'
      },
      {
        key: 'dischargePower30s',
        title: '动力电池包30s最大放电功率(kwh)'
      },
      {
        key: 'dischargeMaxPower',
        title: '动力电池包持续最大放电功率(kwh)'
      },
      {
        key: 'dischargeMaxCurrent',
        title: '动力电池包最大放电电流限值(A)'
      },
      {
        key: 'chargePower10s',
        title: '动力电池包10s最大充电功率(kwh)'
      },
      {
        key: 'chargePower30s',
        title: '动力电池包30s最大充电功率(kwh)'
      },
      {
        key: 'chargeMaxPower',
        title: '动力电池包持续最大充电功率(kwh)'
      },
      {
        key: 'chargeMaxCurrent',
        title: '动力电池包最大充电电流限值(A)'
      },
     {
       key: 'chargerStatus',
       title: '充电状态',
       array: [{value: 1, label: '停车充电'}, {value: 2, label: '行驶充电'}, {value: 3, label: '未充电状态'}, {value: 4, label: '充电完成'}]
     },
     {
       key: 'runStatus',
       title: '运行状态',
       array: [{value: 1, label: '充电'}, {value: 2, label: '行驶'}, {value: 3, label: '停止状态'}]
     },
     {
       key: 'insulationResistance',
       title: '绝缘电阻'
     },
     {
       key: 'tempLowest',
       title: '最低温度值'
     },
     {
       key: 'templowestSubsyscode',
       title: '最低温度探针子系统代号'
     },
     {
       key: 'voltageCount',
       title: '单体电池总数'
     },
     {
       key: 'batteryTempcount',
       title: '可充电储能温度探针个数'
     },
     {
       key: 'dcdcStatus',
       title: 'DC_DC状态',
       array: [{value: 1, label: '工作'}, {value: 2, label: '断开'}]
     },
     {
       key: 'batteryDeviceVol',
       title: '可充电储能装置电压'
     },
     {
       key: 'socHigherAlarm',
       title: 'SOC过高报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'socJumpAlarm',
       title: 'SOC跳变报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'batterySysDismatch',
       title: '可充电储能系统不匹配报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'dcdcTempAlarm',
       title: 'DC_DC温度报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'dcdcStatusAlarm',
       title: 'DC_DC状态报警',
       array: [{label: '正常', value: 0}, {label: '异常', value: 1}]
     }
    ],
    bms_80: [ // 2,80公用(双80和模拟双80)
      ...publicData,
      {
        key: 'totalVoltage',
        title: '总电压(V)'
      },
      {
        key: 'totalCurrent',
        title: '总电流(A)'
      },
      {
        key: 'isChargerConnected',
        title: '外接充电线连接状态',
        array: [{value: 0, label: '外接充电线没有连接'}, {value: 1, label: '外接充电线连接'}]
      },
      {
        key: 'cpSignal',
        title: 'CP信号',
        array: [{value: 0, label: '无'}, {value: 1, label: '有'}]
      },
      {
        key: 'ksState',
        title: '总负接触器KS状态',
        array: [{value: 0, label: 'KS打开'}, {value: 1, label: 'KS闭合'}]
      },
      {
        key: 'chargerConnectStatus',
        title: '与充电机通讯状态',
        array: [{value: 0, label: 'BMS与充电机通讯断开'}, {value: 1, label: 'BMS与充电机通讯接通'}]
      },
      {
        key: 'batteryBalanceStatus',
        title: '电池包均衡状态',
        array: [{value: 0, label: '电池包没有均衡'}, {value: 1, label: '电池包均衡过程完成'}]
      },
      {
        key: 'soc',
        title: '电池组当前的SOC(%)'
      },
      {
        key: 'batteryStatus',
        title: '电池组当前状态',
        array: [{value: 0, label: '搁置'}, {value: 1, label: '放电'}, {value: 2, label: '充电机充电'}]
      },
      {
        key: 'deratStatus',
        title: '降功率状态',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'errAlarm1',
        title: '故障预警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'errAlarm2',
        title: '故障报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'nonErrAlarm',
        title: '非故障报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'isInsuLowest',
        title: '绝缘超低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'voltageHighest',
        title: '最高单体电压(V)'
      },
      {
        key: 'highestVoltageNo',
        title: '最高单体电池号'
      },
      {
        key: 'voltageLowest',
        title: '最低单体电压(V)'
      },
      {
        key: 'lowestVoltageNo',
        title: '最低单体电池号'
      },
      {
        key: 'tempHighest',
        title: '最高温度点温度(℃)'
      },
      {
        key: 'highestTempNo',
        title: '最高温度点电池号'
      },
     // {
     //   key: 'voltages1',
     //   title: '1#-4#单体电池电压'
     // },
     // {
     //   key: 'voltages2',
     //   title: '5#-8#单体电池电压'
     // },
     // {
     //   key: 'voltages3',
     //   title: '9#-12#单体电池电压'
     // },
     // {
     //   key: 'voltages4',
     //   title: '13#-16#单体电池电压'
     // },
     // {
     //   key: 'voltages5',
     //   title: '17#-20#单体电池电压'
     // },
     // {
     //   key: 'voltages6',
     //   title: '21#-24#单体电池电压'
     // },
      {
        key: 'cellVolHigher',
        title: '单体电池电压过高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'cellVolHighest',
        title: '单体电池电压超高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'cellVolLower',
        title: '单体电池电压过低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'cellVolLowest',
        title: '单体电池电压超低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packVolHigher',
        title: '电池组总电压过高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packVolHighest',
        title: '电池组总电压超高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packVolLower',
        title: '电池组总电压过低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packVolLowest',
        title: '电池组总电压超低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'cellDiffVolBigger',
        title: '单体电池压差过大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'cellDiffVolBiggest',
        title: '单体电池压差超大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packLeftLower',
        title: '电池组剩余电量过低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packLeftLowest',
        title: '电池组剩余电量超低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dischargeCurBigger',
        title: '电池组放电电流过大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dischargeCurBiggest',
        title: '电池组放电电流超大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'chargeCurBigger',
        title: '电池组充电电流过大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'chargeCurBiggest',
        title: '电池组充电电流超大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packTempHigher',
        title: '电池组温度过高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packTempHighest',
        title: '电池组温度超高',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packTempLower',
        title: '电池组温度过低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packTempLowest',
        title: '电池组温度超低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packDiffTempBigger',
        title: '电池组温差过大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packDiffTempBiggest',
        title: '电池组温差超大',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'insuLower',
        title: '绝缘过低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'insuLowest',
        title: '绝缘超低',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'packHeatLonger',
        title: '电池组加热时间过长',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
     {
       key: 'packHeatLongest',
       title: '电池组加热时间超长',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'packChargeLonger',
       title: '电池组充电时间过长',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'packChargeLongest',
       title: '电池组充电时间超长',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'bmsSysErr',
       title: 'BMS系统故障等',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
      {
        key: 'bmsCommunicationErr',
        title: '与充电机通讯故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'ctrlCommunicationErr',
        title: '与整车控制器通讯故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'prechargeErr',
        title: '预充故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'heatErr',
        title: '加热异常',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'negContactorClosed',
        title: '负极接触器故障：不能闭合',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'negContactorPasted',
        title: '负极接触器故障：粘连',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'outsideShort',
        title: '电池外部短路',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'insideShort',
        title: '电池内部短路',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'temps1',
        title: '1#-8#探头温度(℃)'
      },
      {
        key: 'temps2',
        title: '9#-12#探头温度(℃)'
      },
      {
        key: 'bmsErrCode',
        title: 'BMS故障码'
      },
      {
        key: 'chargerCtrlCmd',
        title: '充电机使能控制指令'
      },
      {
        key: 'loadType',
        title: '负载类型',
        array: [{value: 0, label: '电池'}, {value: 1, label: '加热膜'}]
      },
      {
        key: 'heaterStatus',
        title: '加热继电器状态',
        array: [{value: 0, label: '断开'}, {value: 1, label: '闭合'}]
      },
      {
        key: 'chargeCount',
        title: '充电次数'
      },
      {
        key: 'chargeState',
        title: '充电状态',
        array: [{value: 1, label: '停车充电'}, {value: 2, label: '行驶充电'}, {value: 3, label: '未充电状态'}, {value: 4, label: '充电完成'}]
      },
      {
        key: 'runStatus',
        title: '运行状态',
        array: [{value: 1, label: '充电'}, {value: 2, label: '行驶'}, {value: 3, label: '停止状态'}]
      },
      {
        key: 'insuResistance',
        title: '绝缘电阻'
      },
      {
        key: 'tempLowest',
        title: '最低温度值'
      },
      {
        key: 'lowestTempSysCode',
        title: '最低温度探针子系统代号'
      },
      {
        key: 'batteryCount',
        title: '单体电池总数'
      },
      {
        key: 'tempPinCount',
        title: '可充电储能温度探针个数'
      },
     {
       key: 'dcdcStatus',
       title: 'DC_DC状态',
       array: [{value: 1, label: '工作'}, {value: 2, label: '断开'}]
     },
     {
       key: 'socTempAlarm',
       title: 'SOC过高报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'socInterruptAlarm',
       title: 'SOC跳变报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'sysNotMatchAlarm',
       title: '可充电储能系统不匹配报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'dcdcTempAlarm',
       title: 'DC_DC温度报警',
       array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
     },
     {
       key: 'dcdcStatusAlarm',
       title: 'DC_DC状态报警',
       array: [{label: '正常', value: 0}, {label: '异常', value: 1}]
     },
     {
       key: 'supplierCode',
       title: '生产厂商代码'
     },
     {
       key: 'deviceTypeCode',
       title: '车载储能装置类型代码'
     },
     {
       key: 'ratedPower',
       title: '额定能量'
     },
     {
       key: 'ratedVoltage',
       title: '额定电压'
     },
     {
       key: 'productionDate',
       title: '生产日期'
     },
     {
       key: 'deviceCode',
       title: '设备号'
     },
     {
       key: 'sysCodeLength',
       title: '可充电储能系统编码长度'
     },
     {
       key: 'alowableVoltage',
       title: '最高允许充电端电压'
     },
     {
       key: 'alowableCurrent',
       title: '最高允许充电电流'
     }
    ],
    bms_3: [
        ...publicData,
        {
          key: 'isBmsReady',
          title: 'BMS是否准备就绪',
          array: [{value: 0, label: '未就绪'}, {value: 1, label: '就绪'}]
        },
        {
          key: 'workingMode',
          title: '工作模式',
          array: [{value: 0, label: '进入正常模式'}, {value: 1, label: '进入休眠模式'}, {value: 2, label: '保留'}, {value: 3, label: '保留'}]
        },
        {
          key: 'soc',
          title: '电池组当前的SOC'
        },
        {
          key: 'issueValue',
          title: '绝缘电阻(有效范围0KΩ~60000KΩ)'
        },
        {
          key: 'batteryCellTotal',
          title: '电池单体的个数'
        },
        {
          key: 'highestVoltageNo',
          title: '最高电压号'
        },
        {
          key: 'lowestVoltageNo',
          title: '最低单体电池号'
        },
        {
          key: 'voltageHighest',
          title: '最高单体电压(V)'
        },
        {
          key: 'voltageLowest',
          title: '最低单体电压(V)'
        },
        {
          key: 'tempProbeTotal',
          title: '温度探针的个数'
        },
        {
          key: 'batteryAverageTemp',
          title: '电池平均温度(℃)'
        },
        {
          key: 'highestTempNo',
          title: '最高温度号'
        },
        {
          key: 'lowestTempNo',
          title: '最低温度号'
        },
        {
          key: 'tempHighest',
          title: '最高温度点温度(℃)'
        },
        {
          key: 'tempLowest',
          title: '最低温度点温度(℃)'
        },
        {
          key: 'fanInletTemp',
          title: '进风口温度(℃)'
        },
        {
          key: 'fanOutletTemp',
          title: '出风口温度(℃)'
        },
        {
          key: 'batterBusCurrent',
          title: '电池总线电流(A)'
        },
        {
          key: 'batteryPackPower',
          title: '电池包两端电压(V)'
        },
        {
          key: 'highBusVoltage',
          title: '高压总线两端电压(V)'
        },
        {
          key: 'batteryPtcVol',
          title: '电池内部PTC两端电压(V)'
        },
        {
          key: 'dischargeMaxCurrent',
          title: '动力电池包最大放电电流限值(A)'
        },
        {
          key: 'alowMaxChargeCurrent',
          title: '最高允许充电电流(A)'
        },
        {
          key: 'minDischargeVoltage',
          title: '最小允许放电电压(V)'
        },
        {
          key: 'maxChargeVoltage',
          title: '最大允许充电电压(V)'
        },
        {
          key: 'dischargePower',
          title: '10s放电功率(KW)'
        },
        {
          key: 'chargePower',
          title: '10s充电功率(KW)'
        },
        {
          key: 'maxDischargePower',
          title: '最大持续放电功率(KW)'
        },
        {
          key: 'maxChargePower',
          title: '最大持续充电功率(KW)'
        },
        {
          key: 'requestOutputMode',
          title: '请求输出模式',
          array: [{value: 0, label: '禁止输出'}, {value: 1, label: '充电请求'}, {value: 2, label: '加热请求'}]
        },
        {
          key: 'requestOutputCurrent',
          title: 'BMS下发充电电流(A)'
        },
        {
          key: 'requestOutputVoltage',
          title: 'BMS下发充电电压(V)'
        },
        {
          key: 'output12vDisable',
          title: 'BMS请求是否允许12V',
          array: [{value: 0, label: '允许'}, {value: 1, label: '禁止'}]
        },
        {
          key: 'chargeEquitmentMaxAC',
          title: '充电设备允许的最大交流电流(A)'
        },
        {
          key: 'packStatus',
          title: '电池包状态',
          array: [{value: 0, label: '无效'}, {value: 1, label: '未连接'}, {value: 2, label: '预充电'}, {value: 3, label: '行驶'}, {value: 4, label: '慢充'}, {value: 5, label: '快充'}]
        },
        {
          key: 'balanceStatus',
          title: '均衡状态',
          array: [{value: 0, label: '未激活'}, {value: 1, label: '激活'}]
        },
        {
          key: 'preChargeStatus',
          title: '预充状态',
          array: [{value: 0, label: '未充电'}, {value: 1, label: '禁止预充'}, {value: 2, label: '正在预充'}, {value: 3, label: '预充完成'}, {value: 4, label: '预充失败'}, {value: 7, label: '无效'}]
        },
        {
          key: 'chargeStatus',
          title: '充电状态',
          array: [{value: 1, label: '驻车充电，仪表收到此状态，控制SOC条滚动显示，表示正在充电'}, {value: 2, label: '表示制动能量回收'}, {value: 3, label: '充电完成，仪表控制SOC条停止滚动，以表示充电完成'}]
        },
        {
          key: 'rechargeGunStatus',
          title: '充电枪状态',
          array: [{value: 0, label: '未检测到'}, {value: 1, label: '已检测到'}]
        },
        {
          key: 'fastChargingState',
          title: '快充枪状态',
          array: [{value: 0, label: '未检测到'}, {value: 1, label: '已检测到'}]
        },
        {
          key: 'loopInnerLockStatus',
          title: '环路互锁状态',
          array: [{value: 0, label: '互锁断开'}, {value: 1, label: '互锁通过'}, {value: 2, label: '互锁故障'}]
        },
        {
          key: 'insulationState',
          title: '绝缘状态',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般漏电报警（常亮）'}, {value: 2, label: '严重漏电报警（闪烁）'}]
        },
        {
          key: 'wakeUpSignal',
          title: '唤醒信号',
          array: [{value: 0, label: 'OFF(关)'}, {value: 1, label: 'ON(开)'}]
        },
        {
          key: 'sleepStopStatus',
          title: '睡眠截止状态',
          array: [{value: 0, label: '未受控'}, {value: 1, label: '受控'}]
        },
        {
          key: 'chargeErrLevel',
          title: '充电故障等级',
          array: [{value: 0, label: '无故障'}, {value: 1, label: '1级故障'}, {value: 2, label: '2级故障'}, {value: 3, label: '3级故障'}, {value: 4, label: '4级故障'}, {value: 5, label: '5级故障'}, {value: 6, label: '6级故障'}, {value: 7, label: '7级故障'}, {value: 8, label: '8级故障'}]
        },
        {
          key: 'nonChargeErrLevel',
          title: '非充电故障等级',
          array: [{value: 0, label: '无故障'}, {value: 1, label: '1级故障'}, {value: 2, label: '2级故障'}, {value: 3, label: '3级故障'}, {value: 4, label: '4级故障'}, {value: 5, label: '5级故障'}, {value: 6, label: '6级故障'}, {value: 7, label: '7级故障'}, {value: 8, label: '8级故障'}]
        },
        {
          key: 'batteryMaintainReq',
          title: '动力电池维护请求',
          array: [{value: 0, label: '无请求'}, {value: 1, label: '法定请求'}]
        },
        {
          key: 'isOpenPtc',
          title: 'PTC是否开启',
          array: [{value: 0, label: '关闭'}, {value: 1, label: '开启'}, {value: 2, label: '诊断到PTC故障'}, {value: 3, label: '未安装'}]
        },
        {
          key: 'batteryErrorAlarm',
          title: '动力蓄电池故障报警指示灯',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'errorCompent',
          title: '故障部件',
          array: [{value: 0, label: '无故障'}, {value: 1, label: 'BMS OR Harness Fault'}, {value: 2, label: 'Power Battery Fault'}, {value: 3, label: 'Vehicle System Fault'}, {value: 4, label: 'On Board Charger Fault'}, {value: 5, label: 'Fast Charger Fault'}]
        },
        {
          key: 'positiveRelayState',
          title: '正极继电器状态',
          array: [{value: 0, label: '未连接'}, {value: 1, label: '已连接'}]
        },
        {
          key: 'negativeRelayState',
          title: '负极继电器状态',
          array: [{value: 0, label: '未连接'}, {value: 1, label: '已连接'}]
        },
        {
          key: 'prechargeRelayState',
          title: '预充继电器状态',
          array: [{value: 0, label: '未连接'}, {value: 1, label: '已连接'}]
        },
        {
          key: 'isOpenFan',
          title: '风扇是否开启',
          array: [{value: 0, label: '关闭'}, {value: 1, label: '开启'}, {value: 2, label: '诊断到风扇故障'}, {value: 3, label: '未安装'}]
        },
        {
          key: 'batterFatory',
          title: '配置电池厂家',
          array: [{value: 0, label: '初始值'}, {value: 1, label: '舟之航'}, {value: 2, label: '桑顿'}, {value: 3, label: '妙盛'}]
        },
        {
          key: 'controlWorkSignal',
          title: '检测控制器工作信号'
        },
        {
          key: 'cellHighTempAlarm',
          title: '单体高温报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '单体一般高温报警'}, {value: 2, label: '单体严重高温报警'}]
        },
        {
          key: 'cellLowTempAlarm',
          title: '单体低温报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '单体一般低温报警'}, {value: 2, label: '单体严重低温报警'}]
        },
        {
          key: 'cellOverVoltageStatus',
          title: '单体过压警告',
          array: [{value: 0, label: '正常'}, {value: 1, label: '单体一般过压警告'}, {value: 2, label: '单体严重过压警告'}]
        },
        {
          key: 'cellUnderVoltageStatus',
          title: '单体低压报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '单体一般低压报警'}, {value: 2, label: '单体严重低压报警'}]
        },
        {
          key: 'highVoltageAlarm',
          title: '总电压高压报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般高压报警'}, {value: 2, label: '严重高压报警'}]
        },
        {
          key: 'lowVoltageAlarm',
          title: '总电压低压报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般低压报警'}, {value: 2, label: '严重低压报警'}]
        },
        {
          key: 'socLowAlarm',
          title: 'SOC低报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般低压报警'}, {value: 2, label: '严重低压报警'}]
        },
        {
          key: 'overCurrentAlarm',
          title: 'BMS过流报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般过流报警'}, {value: 2, label: '严重过流报警'}]
        },
        {
          key: 'leakageAlarm',
          title: '漏电报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般漏电报警'}, {value: 2, label: '严重漏电报警'}]
        },
        {
          key: 'highTempAlarm',
          title: '高温报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般高温报警'}, {value: 2, label: '严重高温报警'}]
        },
        {
          key: 'humidityAlarm',
          title: '湿度报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般湿度报警'}, {value: 2, label: '严重湿度报警'}]
        },
        {
          key: 'tempDiffAlarm',
          title: '温差报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般温差报警'}, {value: 2, label: '严重温差报警'}]
        },
        {
          key: 'conformanceAlarm',
          title: '单体一致性报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '一般单体一致性报警'}, {value: 2, label: '严重单体一致性报警'}]
        },
        {
          key: 'alarmTotal',
          title: '故障个数'
        }
    ],
    obc: [	// 1,80,2公用
      ...publicData,
      {
        key: 'chargerOutVol',
        title: '充电机输出电压(V)'
      },
      {
        key: 'chargerOutCur',
        title: '充电机输出电流(A)'
      },
      {
        key: 'hardwareErr',
        title: '硬件故障',
        type: 'select',
        array: [{value: 0, label: '正常'}, {value: 1, label: '硬件故障'}]
      },
      {
        key: 'chargerTempStatus',
        title: '充电机温度状态',
        type: 'select',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'inputVolStatus',
        title: '输入电压状态',
        type: 'select',
        array: [{value: 0, label: '输入电压正常'}, {value: 1, label: '输入错误，充电机停止工作'}]
      },
      {
        key: 'startStatus',
        title: '启动状态',
        type: 'select',
        array: [{value: 0, label: '充电器检测到电池电压进入到启动状态'}, {value: 1, label: '处于关闭状态'}]
      },
      {
        key: 'connectionStatus',
        title: '连接状态',
        array: [{value: 0, label: '通信正常'}, {value: 1, label: '通信接收超时'}]
      },
      {
        key: 'isReadyCharge',
        title: '充电准备就绪',
        type: 'select',
        array: [{value: 0, label: '未就绪'}, {value: 1, label: '准备就绪'}]
      },
      {
        key: 'inputVoltage',
        title: '输入电压(V)'
      },
      {
        key: 'inputCurrent',
        title: '输入电流(A)'
      },
      {
        key: 'pfcVoltage',
        title: 'PEC电压(V)'
      },
      {
        key: 'v12Voltage',
        title: '12V电压(V)'
      },
      {
        key: 'v12Current',
        title: '12V电流(v)'
      },
      {
        key: 'hwOutPowerLevel',
        title: '硬件输出功率等级'
      },
      {
        key: 'hwOutCurrentLevel',
        title: '硬件输出电流等级'
      },
      {
        key: 'temprature1',
        title: '温度1(℃)'
      },
      {
        key: 'temprature2',
        title: '温度2(℃)'
      },
      {
        key: 'temprature3',
        title: '温度3(℃)'
      },
      {
        key: 'fanStatus',
        title: '风扇状态',
        type: 'select',
        array: [{value: 0, label: '无风扇'}, {value: 1, label: '待机'}, {value: 2, label: '运行'}, {value: 3, label: '故障'}]
      },
      {
        key: 'chargeStatus',
        title: '充电状态',
        type: 'select',
        array: [{value: 0, label: '充电中'}, {value: 1, label: '停止充电'}, {value: 2, label: '充电异常'}]
      },
      {
        key: 'chargerTempErr',
        title: '充电机温度异常监控',
        array: [{value: 0, label: '无异常'}, {value: 1, label: '过温降功率模式'}, {value: 2, label: '过温保护模式'}]
      },
      {
        key: 'inputOweVoltage1',
        title: '输入欠压1',
        array: [{value: 0, label: '正常'}, {value: 1, label: '交流输入欠压1'}]
      },
      {
        key: 'inputOweVoltage2',
        title: '输入欠压2',
        array: [{value: 0, label: '正常'}, {value: 1, label: '交流输入欠压2'}]
      },
      {
        key: 'inputOverVoltage',
        title: '输入过压',
        array: [{value: 0, label: '正常'}, {value: 1, label: '交流输入欠压'}]
      },
      {
        key: 'highVolOutOwe',
        title: '高压输出欠压',
        array: [{value: 0, label: '正常'}, {value: 1, label: '高压输出欠压'}]
      },
      {
        key: 'highVolOutOver',
        title: '高压输出过压',
        array: [{value: 0, label: '正常'}, {value: 1, label: '高压输出过压'}]
      },
      {
        key: 'outputOverCurrent',
        title: '输出过流',
        array: [{value: 0, label: '正常'}, {value: 1, label: '输出过流'}, {value: 2, label: '输出短路'}]
      },
      {
        key: 'pfcVolErr',
        title: 'PFC电压异常',
        type: 'select',
        array: [{value: 0, label: '正常'}, {value: 1, label: 'PFC电压异常'}]
      },
      {
        key: 'v12OverVolErr',
        title: '充电机12V过压异常',
        array: [{value: 0, label: '正常'}, {value: 1, label: '12V过压异常'}]
      },
      {
        key: 'v12OweVolErr',
        title: '充电机12V欠压异常',
        array: [{value: 0, label: '正常'}, {value: 1, label: '12V欠压异常'}]
      }
//          {
//            key: 'hwVPrimary',
//            title: '硬件主版本号'
//          },
//          {
//            key: 'hwVSecondary',
//            title: '硬件次版本号'
//          },
//          {
//            key: 'swVPrimary',
//            title: '软件主版本号'
//          },
//          {
//            key: 'swVSecondary',
//            title: '软件次版本号'
//          }
    ],
    obc_3: [
        ...publicData,
        {
          key: 'chargeStatus',
          title: '充电状态',
          array: [{value: 0, label: '无效'}, {value: 1, label: 'ready准备就绪'}, {value: 2, label: 'charging正在充电'}, {value: 3, label: 'ChargeAchieve充电结束'}, {value: 4, label: 'ChagerFault充电器故障'}, {value: 5, label: 'Heating正在加热'}]
        },
        {
          key: 'chargerOutCurrent',
          title: '充电机输出电流(A)'
        },
        {
          key: 'chargerOutVol',
          title: '充电机输出电压(V)'
        },
        {
          key: 'highVolOutUnder',
          title: '高压输出欠压',
          array: [{value: 0, label: '正常'}, {value: 1, label: '欠压'}]
        },
        {
          key: 'highVolOutShortCircuit',
          title: '高压输出短路',
          array: [{value: 0, label: '正常'}, {value: 1, label: '短路'}]
        },
        {
          key: 'highVolOutOver',
          title: '高压输出过压',
          array: [{value: 0, label: '正常'}, {value: 1, label: '过压'}]
        },
        {
          key: 'inputUnderVoltage',
          title: '输入欠压',
          array: [{value: 0, label: '正常'}, {value: 1, label: '欠压'}]
        },
        {
          key: 'inputOverVoltage',
          title: '输入过压',
          array: [{value: 0, label: '正常'}, {value: 1, label: '过压'}]
        },
        {
          key: 'v12VolUnder',
          title: '12V电压欠压',
          array: [{value: 0, label: '正常'}, {value: 1, label: '欠压'}]
        },
        {
          key: 'v12VolOver',
          title: '12V电压过压',
          array: [{value: 0, label: '正常'}, {value: 1, label: '过压'}]
        },
        {
          key: 'outputCurrentErr',
          title: '充电机输出电流故障',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        },
        {
          key: 'isBatteryVolLow',
          title: '未检测到电池包电压过低',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        },
        {
          key: 'overTemp',
          title: '充电机过温',
          array: [{value: 0, label: '正常'}, {value: 1, label: '充电机一级过温'}, {value: 2, label: '充电机二级过温'}]
        },
        {
          key: 'chargerTempErr',
          title: '充电机低压温度故障',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        },
        {
          key: 'canErr',
          title: 'CAN故障',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        },
        {
          key: 'fanErr',
          title: '风扇故障',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        },
        {
          key: 'batteryReverseConnectionErr',
          title: '电池包正负极反接',
          array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
        }
    ],
    mc_0: [
      ...publicData,
      {
        key: 'hvilStatus',
        title: '高压连接线HVIL状态',
        array: [{value: 0, label: '正常'}, {value: 1, label: '断开'}]
      },
      {
        key: 'statusTargetRun',
        title: '电机系统当前运行状态',
        array: [{value: 2, label: 'Standby (待机)'}, {value: 3, label: 'Precharge (预充电)'}, {value: 4, label: 'HV_OK'}, {value: 5, label: 'HV_will_Shutdown'}, {value: 6, label: 'HV_Discharge (高压放电)'}, {value: 7, label: 'Ready_Power_off (准备关闭)'}, {value: 9, label: 'HV_Fast_Discharge'}]
      },
     {
       key: 'systemFaultLevel',
       title: '电机系统故障等级',
       array: [{value: 0, label: 'No_error (正常)'}, {value: 1, label: 'Warning (警告)'}, {value: 2, label: 'Power_Reduction (供能降低)'}, {value: 3, label: 'Stop_Run (停止运转)'}, {value: 4, label: 'Emergency_Shutdown (紧急停机)'}]
     },
      {
        key: 'controlMode',
        title: '电机系统当前控制模式',
        array: [{value: 0, label: 'inactive (闲置模式)'}, {value: 1, label: '转矩模式'}, {value: 2, label: '转速模式'}]
      },
     {
       key: 'powerInOrOutStatus',
       title: '驱动电机能量输入输出状态',
       array: [{value: 0, label: 'Power_In_耗电'}, {value: 1, label: 'Power_Out_发电'}, {value: 2, label: '关闭'}, {value: 3, label: '准备状态'}]
     },
      {
        key: 'statusUncover',
        title: '开盖检测状态',
        array: [{value: 0, label: 'disconnection (断开)'}, {value: 1, label: 'OK'}]
      },
      {
        key: 'motorSpeed',
        title: '电机实际转速(r/min)'
      },
      {
        key: 'motorTorque',
        title: '电机实际扭矩(N·m)'
      },
      {
        key: 'busbarCurrent',
        title: '电机系统直流母线端电流(A)'
      },
      {
        key: 'busbarVoltage',
        title: '电机系统直流母线端电压(V)'
      }
    ],
    mc_1: [       // 1
      ...publicData,
      {
        key: 'mcCtrlStatus',
        title: '电机控制器状态',
        array: [{value: 0, label: '电机控制器正常'}, {value: 1, label: 'CCW 方向（反转）'}, {value: 2, label: 'CW 方向(正转)'}, {value: 3, label: ' 电机控制器故障'}]
      },
      {
        key: 'mcRunStatus',
        title: '电机控制器工作状态',
        array: [{value: 0, label: '运行'}, {value: 1, label: '停止'}, {value: 2, label: '电容放电状态'}, {value: 3, label: ' MC准备就绪'}]
      },
      {
        key: 'tempStatus',
        title: '温度状态',
        array: [{value: 0, label: '电机和电机控制器均未过温'}, {value: 1, label: '控制器温度过温'}, {value: 2, label: '电机温度过温'}]
      },
      {
        key: 'voltageStatus',
        title: '母线电压状态',
        array: [{value: 0, label: '母线电压正常'}, {value: 1, label: '母线过压'}, {value: 2, label: '母线欠压'}]
      },
      {
        key: 'voltageRange',
        title: '母线电压(V)'
      },
      {
        key: 'motorTemp',
        title: '电机温度(℃)'
      },
      {
        key: 'mcTemp',
        title: '控制器温度(℃)'
      },
      {
        key: 'motorRpm',
        title: '电机转速(r/min)'
      },
      {
        key: 'motorCurrent',
        title: '电机相电流(A)'
      },
      {
        key: 'aprRate',
        title: '加速踏板开度'
      },
      {
        key: 'mcNm',
        title: '电机控制器当前估计扭矩(负:回馈,正:驱动)'
      },
      {
        key: 'busCurrent',
        title: '母线电流(充电时为负值,放电时为正值)(A)'
      },
      {
        key: 'brakeRate',
        title: '制动踏板开度'
      },
      {
        key: 'vehiType',
        title: '车型类别',
        array: [{value: 0, label: '预留'}, {value: 1, label: '商品车'}, {value: 2, label: '租赁车'}]
      },
      {
        key: 'isCurrentOver',
        title: '任一相电流是否过流',
        array: [{value: 0, label: '正常'}, {value: 1, label: '任一相电流过流'}]
      },
      {
        key: 'isBusCurrentOver',
        title: '直流母线是否过流',
        array: [{value: 0, label: '正常'}, {value: 1, label: '直流母线过流'}]
      },
      {
        key: 'isMotorRpmOver',
        title: '电机转速超过限值',
        array: [{value: 0, label: '正常'}, {value: 1, label: '电机转速超过限值'}]
      },
      {
        key: 'isHolzerErr',
        title: '霍尔故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'isAprErr',
        title: '加速踏板故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'isGeerErr',
        title: '档位输入故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'motorLife',
        title: 'LIFE值'
      },
      {
        key: 'busCurrentSensorErr',
        title: '母线电流传感器故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'phaseCurrentSensorErr',
        title: '相线电流传感器故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'busVolSensorErr',
        title: '母线电压传感器故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'controlTempSensorErr',
        title: '控制器温度传感器故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'tempSensorErr',
        title: '电机温度传感器故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'rotaryTransformerErr',
        title: '旋转变压器故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'controlTempErr',
        title: '控制器温度报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'controlOvertempErr',
        title: '控制器过温故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
//            {
//              key: 'mtempAlarm',
//              title: '电机温度报警',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
//            },
//            {
//              key: 'movertempErr',
//              title: '电机过温故障',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
//            },
      {
        key: 'busOvercurrent',
        title: '母线过流（短路）',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'busOvervolAlarm',
        title: '母线过压报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'busOvervolErr',
        title: '母线过压故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'busUndervolAlarm',
        title: '母线欠压报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'busUndervolErr',
        title: '母线欠压故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'controlUndervolErr',
        title: '控制电欠压故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'controlOvervolErr',
        title: '控制电过压故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'phaseOvercurrent',
        title: '相线过流',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
//            {
//              key: 'moverspeedAlarm',
//              title: '电机超速报警',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
//            },
//            {
//              key: 'moverspeedErr',
//              title: '电机超速故障',
//              array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
//            },
      {
        key: 'perchargeErr',
        title: '预充电故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'pedalPersamplingErr',
        title: '加速踏板预采样故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'canCommunicationErr',
        title: 'CAN总线通讯故障',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'errorLevel',
        title: '故障等级',
        array: [{value: 0, label: '正常'}, {value: 1, label: '1级故障（报警）'}, {value: 2, label: '2级故障（降功率）'}, {value: 3, label: '3级故障（锁定输出）'}, {value: 4, label: '4级故障（动力切断）'}]
      },
      {
        key: 'deratingLevel',
        title: '降额等级'
      },
      {
        key: 'powerOverStatus',
        title: '降功率等级',
        array: [{value: 0, label: '无'}, {value: 1, label: '1级降功率（80%）'}, {value: 2, label: '2级降功率（50%）'}, {value: 3, label: '3级降功率（30%）'}]
      },
      {
        key: 'supplierCode',
        title: '供应商配置代码'
      }
//            {
//              key: 'hwVPrimary',
//              title: '硬件主版本号'
//            },
//            {
//              key: 'hwVSecondary',
//              title: '硬件次版本号'
//            },
//            {
//              key: 'swVPrimary',
//              title: '软件主版本号'
//            },
//            {
//              key: 'swVSecondary',
//              title: '软件次版本号'
//            }
    ],
    mc_3: [
        ...publicData,
        {
          key: 'motorWorkMode',
          title: '电机当前工作模式',
          array: [{value: 0, label: 'IDLE模式'}, {value: 1, label: 'NRF模式'}, {value: 2, label: 'RF模式'}, {value: 3, label: 'Torque模式'}, {value: 4, label: 'Anti Slip模式'}, {value: 5, label: 'Speed模式'}, {value: 6, label: 'Zero torque模式'}]
        },
        {
          key: 'motorRpm',
          title: '电机转速(RPM)'
        },
        {
          key: 'motorTorque',
          title: '电机输出扭矩'
        },
        {
          key: 'motorMaxTorque',
          title: '电机最大可输出扭矩'
        },
        {
          key: 'motorTemp',
          title: '电机温度(℃)'
        },
        {
          key: 'igbtTemp',
          title: 'IGBT温度(℃)'
        },
        {
          key: 'dcLinkVol',
          title: '直流母线电压(V)'
        },
        {
          key: 'aliveCounter',
          title: '检测控制器工作信号'
        },
        {
          key: 'isMotorRpmOverAlarm',
          title: '电机超速告警',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'motorStallAlarm',
          title: '电机堵转报警',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'motorTempAlarm',
          title: '电机温度报警',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'igbtTempAlarm',
          title: 'IGBT温度告警',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'phaseAOvercurrentAlarm',
          title: 'A相电流过载告警',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'phaseCOvercurrentAlarm',
          title: 'C相电流过载告警',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'phaseAOvercurrentSensorErr',
          title: 'A相电流传感器自检故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'phaseCOvercurrentSensorErr',
          title: 'C相电流传感器自检故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'mcuWarn',
          title: 'MCU告警',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'mcuNrfErr',
          title: 'NRF故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'mcuRfErr',
          title: 'RF故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'inverterControlStatus',
          title: '电驱动逆变器控制状态',
          array: [{value: 0, label: '禁用'}, {value: 1, label: '启用'}]
        },
        {
          key: 'lmipFault',
          title: 'Lmip状态',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'mcOverTempLamp',
          title: '电机过热指示灯',
          array: [{value: 0, label: '关'}, {value: 1, label: '灯亮'}, {value: 2, label: '闪烁'}]
        },
        {
          key: 'mcDriverErrLamp',
          title: '电机驱动错误指示灯',
          array: [{value: 0, label: '关'}, {value: 1, label: '灯亮'}, {value: 2, label: '闪烁'}]
        },
        {
          key: 'igbtTempSensorErr',
          title: '逆变器温度传感器故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'motorTempSensorErr',
          title: '电机温度传感器故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'gateDriverVoltageSupplyErr',
          title: '门级电压驱动故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'mcSelfCheckFault',
          title: 'MCU自检故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'highVolInterlockErr',
          title: '高压互锁故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'positionSensorVoltFault',
          title: '旋变传感器故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'overCurrentErr',
          title: '过流故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'inverterErr',
          title: '逆变器故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'supplyVoltage5vErr',
          title: '5V电压供电故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'motorPositionSensorErr',
          title: '旋变故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'dcOverVoltageErr',
          title: '母线过压故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'dcUnderVoltageErr',
          title: '母线欠压故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'motorOverTempErr',
          title: '电机过温故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'inverterOverTempErr',
          title: '逆变器过温故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'motorOverspeedErr',
          title: '电机超速故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'canErr',
          title: 'CAN故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'controlPowerErr',
          title: '控制器供电故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'torqueDeviationErr',
          title: '扭矩偏差故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'reqModeErr',
          title: '请求模式故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'losePhaseFirstFault',
          title: '缺相一级故障',
          array: [{value: 0, label: '无告警'}, {value: 1, label: '告警'}]
        },
        {
          key: 'motorStatus',
          title: '驱动电机状态',
          array: [{value: 1, label: 'drive状态'}, {value: 2, label: 'reg状态'}, {value: 3, label: 'OFF状态'}, {value: 4, label: 'idle状态'}, {value: 5, label: 'fault状态'}, {value: 6, label: 'Invalid状态'}]
        },
        {
          key: 'motorErrTotal',
          title: '驱动电机故障总数'
        },
        {
          key: 'mcuInternalErrNum',
          title: '电驱动内部故障',
          array: [{value: 0, label: '一般故障'}, {value: 1, label: '严重故障'}]
        },
        {
          key: 'motorDiverTempErr',
          title: '电驱动温度故障',
          array: [{value: 0, label: '一般故障'}, {value: 1, label: '严重故障'}]
        },
        {
          key: 'motorDiverCurrentSensorErr',
          title: '电驱动电流传感器故障',
          array: [{value: 0, label: '一般故障'}, {value: 1, label: '严重故障'}]
        },
        {
          key: 'motorDiverCurrentOverErr',
          title: '电驱动过流故障',
          array: [{value: 0, label: '一般故障'}, {value: 1, label: '严重故障'}]
        },
        {
          key: 'motorDiverInverterErr',
          title: '电驱动逆变器故障',
          array: [{value: 0, label: '一般故障'}, {value: 1, label: '严重故障'}]
        },
        {
          key: 'motorDiverBusVolErr',
          title: '电驱动母线电压故障',
          array: [{value: 0, label: '一般故障'}, {value: 1, label: '严重故障'}]
        }
    ],
    acu: [	// 1,80公用
      ...publicData,
      {
        key: 'priBallonetStatus',
        title: '主驾侧气囊状态',
        array: [{value: 0, label: 'NoFire (未弹出)'}, {value: 1, label: 'Fire (已弹出)'}]
      },
      {
        key: 'secBallonetStatus',
        title: '副驾侧气囊状态',
        array: [{value: 0, label: 'NoFire (未弹出)'}, {value: 1, label: 'Fire (已弹出)'}, {value: 2, label: 'No_configuration (未配置)'}, {value: 3, label: 'Reserved (保留)'}]
      },
      {
        key: 'priBeltStatus',
        title: '主驾安全带状态',
        array: [{value: 0, label: '未插入'}, {value: 1, label: '插入'}]
      },
      {
        key: 'secBeltStatus',
        title: '副驾安全带状态',
        array: [{value: 0, label: '未插入'}, {value: 1, label: '插入'}]
      },
      {
        key: 'secRideStatus',
        title: '副驾侧乘员乘坐状态',
        array: [{value: 0, label: '未乘坐'}, {value: 1, label: '乘坐'}]
      },
      {
        key: 'isGasLightErr',
        title: '安全气囊故障灯状态',
        array: [{value: 0, label: 'Fail no present,lamp off (灯灭)'}, {value: 1, label: 'Fail present, lamp on (灯亮)'}, {value: 2, label: 'reserve (保留)'}, {value: 3, label: 'reserve (保留)'}]
      },
      {
        key: 'isCrash',
        title: '碰撞状态',
        array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
      },
      {
        key: 'crashPosition',
        title: '碰撞位置',
        array: [{value: 0, label: '未碰撞'}, {value: 1, label: '前'}, {value: 2, label: '侧面'}, {value: 3, label: '正面和侧面'},
        {value: 4, label: 'reserve'}, {value: 5, label: 'reserve'}, {value: 6, label: 'reserve'}, {value: 7, label: 'reserve'}
        ]
      }
    ],
    acu_3: [
        ...publicData,
        {
          key: 'crashPosition',
          title: '碰撞位置',
          array: [{value: 0, label: '无碰撞'}, {value: 1, label: '前部分'}, {value: 2, label: '左手边'}, {value: 3, label: '右手边'}]
        },
        {
          key: 'priBeltBuckleStatus',
          title: '主驾安全带状态',
          array: [{value: 0, label: '安全带系上'}, {value: 1, label: '安全带未系上'}]
        },
        {
          key: 'secBallonetStatus',
          title: '副驾侧气囊状态',
          array: [{value: 0, label: '安全气囊无作用'}, {value: 1, label: '安全气囊使能'}]
        },
        {
          key: 'secBeltBuckleStatus',
          title: '副驾安全带状态',
          array: [{value: 0, label: '安全带系上'}, {value: 1, label: '安全带未系上'}]
        },
        {
          key: 'secRideStatus',
          title: '副驾侧乘员乘坐状态',
          array: [{value: 0, label: '未乘坐'}, {value: 1, label: '乘坐'}]
        },
        {
          key: 'isGaslightErr',
          title: '安全气囊故障灯状态',
          array: [{value: 0, label: 'OFF (灯灭)'}, {value: 1, label: 'ON (灯亮)'}, {value: 2, label: 'Blink (闪烁)'}, {value: 3, label: 'Unknow Request'}]
        }
    ],
    abs_3: [
	    ...publicData,
	    {
	      key: 'absVaild',
	      title: 'ABS状态',
	      array: [{value: 0, label: '正常'}, {value: 1, label: '系统失败'}]
	    },
	    {
	      key: 'absActive',
	      title: 'ABS是否激活',
	      array: [{value: 0, label: '未激活'}, {value: 1, label: '激活'}]
	    },
	    {
	      key: 'brakePedalStatus',
	      title: '刹车踏板状态',
	      array: [{value: 0, label: '未踩下'}, {value: 1, label: '已踩下'}]
	    },
	    {
	      key: 'ebdVaild',
	      title: 'EBD状态',
	      array: [{value: 0, label: '正常'}, {value: 1, label: '失败'}]
	    },
	    {
	      key: 'vehicleSpeedVaild',
	      title: '车速是否有效',
	      array: [{value: 0, label: '有效'}, {value: 1, label: '无效'}]
	    },
	    {
	      key: 'vehicleSpeed',
	      title: '车速(Km/h)'
	    },
	    {
	      key: 'flWheelSpeedRPM',
	      title: '左前车轮转速(RPM)'
	    },
	    {
	      key: 'flWheelSpeedInvalid',
	      title: '左前车轮是否有效',
	      array: [{value: 0, label: '有效'}, {value: 1, label: '无效'}]
	    },
	    {
	      key: 'frWheelSpeedRPM',
	      title: '右前车轮转速(RPM)'
	    },
	    {
	      key: 'frWheelSpeedInvalid',
	      title: '左前车轮是否有效',
	      array: [{value: 0, label: '有效'}, {value: 1, label: '无效'}]
	    },
	    {
	      key: 'rlWheelSpeedRPM',
	      title: '左后车轮转速(RPM)'
	    },
	    {
	      key: 'rlWheelSpeedInvalid',
	      title: '左后车轮是否有效',
	      array: [{value: 0, label: '有效'}, {value: 1, label: '无效'}]
	    },
	    {
	      key: 'rrWheelSpeedRPM',
	      title: '右后车轮R转速(RPM)'
	    },
	    {
	      key: 'rrWheelSpeedInvalid',
	      title: '右后车轮是否有效',
	      array: [{value: 0, label: '有效'}, {value: 1, label: '无效'}]
	    }
	],
	ipk_3: [
        ...publicData,
        {
          key: 'radarLeftProbe',
          title: '左雷达探测',
          array: [{value: 0, label: '默认值'}, {value: 1, label: 'range1'}, {value: 2, label: 'range2'}, {value: 3, label: 'range3'}, {value: 4, label: '保留'}, {value: 5, label: '保留'}, {value: 6, label: '雷达错误'}, {value: 7, label: '无效'}]
        },
        {
          key: 'radarRightProbe',
          title: '右雷达探测',
          array: [{value: 0, label: '默认值'}, {value: 1, label: 'range1'}, {value: 2, label: 'range2'}, {value: 3, label: 'range3'}, {value: 4, label: '保留'}, {value: 5, label: '保留'}, {value: 6, label: '雷达错误'}, {value: 7, label: '无效'}]
        }
    ],
    vcu_3: [
        ...publicData,
        {
          key: 'clutchStatus',
          title: '档位状态',
          array: [{value: 9, label: 'Drive前进挡'}, {value: 10, label: 'Neutral空挡'}, {value: 11, label: 'Neutral空挡'}, {value: 12, label: 'Neutral空挡'}]
        },
        {
          key: 'vehicleStatus',
          title: '车辆状态',
          array: [{value: 0, label: '启动'}, {value: 1, label: '熄火'}]
        },
        {
          key: 'vehicleSpeed',
          title: '车速(Km/h)'
        },
        {
          key: 'mileage',
          title: '续航里程(Km)'
        },
        {
          key: 'dcdcStatus',
          title: 'dcdc状态',
          array: [{value: 0, label: 'DCDC工作'}, {value: 1, label: '断开'}]
        },
        {
          key: 'readyLamp',
          title: 'READY指示灯',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'acceleratorPedalValue',
          title: '加速踏板行程值(%)'
        },
        {
          key: 'driveStatus',
          title: '驱动力状态',
          array: [{value: 0, label: '无驱动力'}, {value: 1, label: '有驱动力'}]
        },
        {
          key: 'brkStatus',
          title: '制动力状态',
          array: [{value: 0, label: '无制动力'}, {value: 1, label: '有制动力'}]
        },
        {
          key: 'driveBrakeStatus',
          title: '制动状态',
          array: [{value: 0, label: '未踩制动踏板'}, {value: 1, label: '已踩制动踏板'}]
        },
        {
          key: 'highVolAllowStatus',
          title: '高压允许状态',
          array: [{value: 0, label: '不允许'}, {value: 1, label: '允许'}]
        },
        {
          key: 'highVolStatus',
          title: '高压状态',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'instantaneousPower',
          title: '瞬时功率(KW)'
        },
        {
          key: 'vcuControlHighVol',
          title: '高压上电命令',
          array: [{value: 0, label: '断开电压'}, {value: 1, label: '高压上电'}]
        },
        {
          key: 'dclinkCurrent',
          title: '电机控制器直流母线电流(A)'
        },
        {
          key: 'airConditionerWorkStatus',
          title: '空调工作状态',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'ecoStatus',
          title: '经济模式',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'compressorSpeed',
          title: '压缩机转速(RPM)'
        },
        {
          key: 'eacCompressorEnable',
          title: '允许空调压缩机工作的使能信号',
          array: [{value: 0, label: '不允许'}, {value: 1, label: '允许'}]
        },
        {
          key: 'coolEnable',
          title: '制冷使能',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'ptcEnable',
          title: '制热使能',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'sysAlarmLamp',
          title: '系统报警指示灯',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'sysFaultLamp',
          title: '系统故障指示灯',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'driveBrakeAlarm',
          title: '制动系统报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '制动系统报警'}]
        },
        {
          key: 'littleBatteryAlarmLamp',
          title: '12V 蓄电池充放电故障指示',
          array: [{value: 0, label: 'OFF'}, {value: 1, label: 'ON'}]
        },
        {
          key: 'dcdcTempAlarm',
          title: 'DCDC温度告警',
          array: [{value: 0, label: '正常'}, {value: 1, label: '过温报警'}]
        },
        {
          key: 'dcdcStatusAlarm',
          title: 'DCDC状态报警',
          array: [{value: 0, label: '正常'}, {value: 1, label: 'DCDC状态报警'}]
        }
    ],
    dcdc: [		// 1,80公用
      ...publicData,
      {
        key: 'dcdcRunStatus',
        title: 'DCDC当前运行状态',
        array: [{value: 0, label: '工作'}, {value: 1, label: '断开'}]
      },
      {
        key: 'dcdcInputVol',
        title: 'DCDC输入电压(V)'
      },
      {
        key: 'dcdcInputCurr',
        title: 'DCDC输入电流(A)'
      },
      {
        key: 'dcdcOutputVol',
        title: 'DCDC输出电压(V)'
      },
      {
        key: 'dcdcOutputCurr',
        title: 'DCDC输出电流(A)'
      },
      {
        key: 'dcdcTemp',
        title: 'DCDC温度(℃)'
      },
      {
        key: 'dcdcErrorLevel',
        title: 'DCDC故障等级',
        array: [{value: 0, label: 'No error (无故障)'}, {value: 1, label: 'Warning (警告)'}, {value: 2, label: 'Power Reduction (供能降低)'}, {value: 3, label: 'Stop Run (停止运转)'}]
      },
      {
        key: 'dcdcHighVolAlarm',
        title: 'DCDC高压互锁预警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dcdcKgStatus',
        title: 'DCDC开关状态',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        key: 'dcdcOutTempAlarm',
        title: 'DCDC过温报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      }
      // {
      //   key: 'hwVPrimary',
      //   title: '硬件主版本号'
      // },
      // {
      //   key: 'hwVSecondary',
      //   title: '硬件次版本号'
      // },
      // {
      //   key: 'swVPrimary',
      //   title: '软件主版本号'
      // },
      // {
      //   key: 'swVSecondary',
      //   title: '软件次版本号'
      // }
    ],
    icu: [		// 1,80公用
      ...publicData,
      {
        title: '整车行使里程(km)',
        key: 'totalMile'
      },
      {
        title: '制动系统故障报警',
        key: 'brakeSysErr',
        array: [{value: 0, label: '正常'}, {value: 1, label: '异常'}]
      },
      {
        title: '保养信息',
        key: 'maintainStatus'
      },
      {
        title: '剩余保养里程(km)',
        key: 'leftmaintainMile'
      }
//          {
//            title: '硬件版本',
//            key: 'hardwareVersion'
//          },
//          {
//            title: '硬件主版本号',
//            key: 'hwVPrimary'
//          },
//          {
//            title: '硬件次版本号',
//            key: 'hwVSecondary'
//          },
//          {
//            title: '软件版本',
//            key: 'softwareVersion'
//          },
//          {
//            title: '软件主版本号',
//            key: 'swVPrimary'
//          },
//          {
//            title: '软件次版本号',
//            key: 'swVSecondary'
//          }
    ],
    general_0: [
      ...publicData,
      {
        key: 'vehicleStatus',
        title: '整车运行状态',
        array: [{value: 0, label: '--'}, {value: 2, label: 'Standby (待机)'}, {value: 3, label: 'Precharge (预充电)'}, {value: 4, label: 'HV_OK'}, {value: 5, label: 'HV_will_Shutdown'}, {value: 6, label: 'HV_Discharge (高压放电)'}, {value: 7, label: 'LV_will_Poweroff (准备关闭)'}, {value: 8, label: 'Reserved'}, {value: 9, label: 'HV_Fast_Discharge'}]
      },
     {
       key: 'powerSystemError',
       title: '动力系统故障等级',
       array: [{value: 0, label: 'No_error (正常)'}, {value: 1, label: 'Warning (警告)'}, {value: 2, label: 'Power_Reduction (供能降低)'}, {value: 3, label: 'Stop_Run (停止运转)'}, {value: 4, label: 'Emergency_Shutdown (紧急停机)'}]
     },
      {
        key: 'ccAndCpState',
        title: '充电连接线CC_PP状态',
        array: [{value: 0, label: 'No_plugin (未插入)'}, {value: 1, label: 'Plugin (插入)'}]
      },
     {
       key: 'hvBoxState',
       title: '高压分线盒上盖继电器状态',
       array: [{value: 0, label: '上盖闭合'}, {value: 1, label: '上盖打开'}]
     },
      {
        key: 'driveMode',
        title: '驾驶模式',
        array: [{value: 0, label: 'Normal_Mode (正常模式)'}, {value: 1, label: 'ECO_Mode (智能节能模式)'}, {value: 2, label: 'Resevred (保留)'}, {value: 3, label: 'Resevred (保留)'}]
      },
      {
        key: 'brakepumpRelyState',
        title: '真空泵继电器开关状态',
        array: [{value: 0, label: 'relay_open (开启)'}, {value: 1, label: 'relay_closed (关闭)'}]
      },
      {
        key: 'acceleratorPedalPosition',
        title: '加速踏板开度'
      },
      {
        key: 'brakePedalPosition',
        title: '制动踏板开度'
      },
      {
        key: 'vacuumDegree',
        title: '真空泵真空度'
      },
      {
        key: 'maxTemp',
        title: 'MC最高温度(℃)'
      },
      {
        key: 'motorMaxTemp',
        title: '电机最高温度(℃)'
      },
      {
        key: 'overTempAlarm',
        title: '电机控制器过温报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
      },
      {
        key: 'motorOverTempAlarm',
        title: '电机过温报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
      },
      {
        key: 'vehicleState',
        title: '车辆状态',
        array: [{value: 0, label: '--'}, {value: 1, label: '车辆启动状态'}, {value: 2, label: '熄火状态'}, {value: 3, label: '其它状态'}]
      },
      {
        key: 'chargeState',
        title: '充电状态',
        array: [{value: 0, label: '--'}, {value: 1, label: '停车充电'}, {value: 2, label: '行驶充电'}, {value: 3, label: '未充电'}, {value: 4, label: '充电完成'}]
      },
      {
        key: 'vehicleRunMode',
        title: '运行模式',
        array: [{value: 0, label: '--'}, {value: 1, label: '纯电'}, {value: 2, label: '混动'}, {value: 3, label: '燃油'}]
      },
      {
        key: 'dcdcOnOffState',
        title: 'DCDC开关状态',
        array: [{value: 0, label: 'On_工作'}, {value: 1, label: 'Off_断开'}]
      },
      {
        key: 'dcdcFaultLevel',
        title: 'DCDC故障等级',
        array: [{value: 0, label: 'No_error (正常)'}, {value: 1, label: 'Warning (警告)'}, {value: 2, label: 'Power_Reduction (供能降低)'}, {value: 3, label: 'Stop_Run (停止运转)'}, {value: 4, label: 'Emergency_Shutdown (紧急停机)'}]
      },
      {
        key: 'dcdcOverTempAlarm',
        title: 'DCDC过温报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
      },
     {
       key: 'brakeSystemFault',
       title: '制动系统故障状态',
       array: [{value: 0, label: '正常'}, {value: 1, label: '故障'}]
     },
      {
        key: 'vehicleHvilStatus',
        title: '整车高压互锁状态',
        array: [{value: 0, label: '正常'}, {value: 1, label: '断开'}]
      },
      {
        key: 'driveTorqueStatus',
        title: '驱动力状态',
        array: [{value: 0, label: '无驱动力'}, {value: 1, label: '有驱动力'}]
      },
      {
        key: 'brakeTorqueStatus',
        title: '制动力状态',
        array: [{value: 0, label: '无驱动力'}, {value: 1, label: '有驱动力'}]
      }
    ],
    msg_0: [
      ...publicData,
      {
        key: 'strWhAng',
        title: '角度'
      },
      {
        key: 'vehicleSpd',
        title: 'VCU车速(源自ABS车速)(km/h)',
        array: [{value: 255, label: 'Invalid'}]
      },
      {
        key: 'geerPositon',
        title: '档位位置',
        array: [{value: 0, label: 'N'}, {value: 1, label: 'D'}, {value: 2, label: 'R'}, {value: 3, label: 'P'}]
      },
      {
        key: 'crashStatus',
        title: '碰撞状态',
        array: [{value: 0, label: 'No_Crash (未碰撞)'}, {value: 1, label: 'Crash (碰撞过)'}]
      },
      {
        key: 'airbagWarningChime',
        title: '安全气囊故障灯状态',
        array: [{value: 0, label: 'Lamp_off (指示灯灭)'}, {value: 1, label: 'Lamp_on (指示灯亮)'}, {value: 2, label: 'Lamp_Flashing_Reserved (指示灯闪烁)'}, {value: 3, label: 'Lamp_Error_Reserved (指示灯异常)'}]
      },
      {
        key: 'readyLampStatus',
        title: 'Ready灯状态',
        array: [{value: 0, label: 'Inactive (灯灭)'}, {value: 1, label: 'Active (灯亮)'}]
      },
      {
        key: 'pepsPowerMode',
        title: '电源模式',
        array: [{value: 0, label: 'Invalid'}, {value: 1, label: 'OFF'}, {value: 2, label: 'ACC'}, {value: 3, label: 'ON'}, {value: 4, label: 'Reserved'}, {value: 5, label: 'Reserved'}, {value: 6, label: 'Reserved'}, {value: 7, label: 'Reserved'}]
      },
      {
        key: 'sysAlarmLevel',
        title: '自动灭火系统预警级别',
        array: [{value: 0, label: '正常'}, {value: 1, label: '保留'}, {value: 2, label: '二级预警'}, {value: 3, label: '三级预警'}, {value: 4, label: '四级预警_严重度最高'}]
      },
      {
        key: 'tmodeInd',
        title: 'tmode_ind',
        array: [{value: 0, label: 'Inactive'}, {value: 1, label: 'Active'}]
      },
      {
        key: 'insideTemperature',
        title: '内部温度(℃)'
      },
      {
        key: 'setTemperature',
        title: '设定温度(℃)'
      },
      {
        key: 'clmRequestStatus',
        title: 'clmRequestStatus',
        array: [{value: 0, label: '无请求'}, {value: 1, label: 'HeatRequest'}, {value: 2, label: 'ColdRequest'}, {value: 3, label: '关闭'}]
      },
      {
        key: 'compressorRequest',
        title: 'compressorRequest',
        array: [{value: 0, label: '无请求'}, {value: 1, label: '请求关闭'}, {value: 2, label: '请求打开'}, {value: 3, label: '保留'}]
      },
      {
        key: 'heatRequest',
        title: 'heatRequest',
        array: [{value: 0, label: '无请求'}, {value: 1, label: '请求关闭'}, {value: 2, label: '请求打开'}, {value: 3, label: '保留'}]
      },
      {
        key: 'acStateRemote',
        title: '远程空调反馈状态',
        array: [{value: 0, label: 'inactive无动作'}, {value: 1, label: '远程空调运行'}, {value: 2, label: 'Tmode认证失败'}, {value: 3, label: '低压上电条件不满足'},
        {value: 4, label: '高压上电条件不满足'}, {value: 5, label: '低压保持条件不满足'}, {value: 6, label: '高压保持条件不满足'}, {value: 7, label: '远程空调关闭'}
        ]
      },
      {
        key: 'tmodeHighFreqWarning',
        title: '远程控制过于频繁报警',
        array: [{value: 0, label: 'Inactive'}, {value: 1, label: 'Active'}]
      },
      {
        key: 'tmRelease',
        title: 'VCU_TBOX认证成功',
        array: [{value: 0, label: 'Initial_State_or_Releasing'}, {value: 1, label: 'TM_Release_Failed'}, {value: 2, label: 'TM_Release_Success'}, {value: 3, label: 'Reserved'}]
      },
      {
        key: 'icuOdo',
        title: 'ICU_ODO总里程累计(km)'
      },
      {
        key: 'insulationRes',
        title: '绝缘电阻值(KΩ)'
      },
      {
        key: 'icuRemainMaintMileage',
        title: '剩余保养里程(km)'
      },
      {
        key: 'icuMaintenanceInformation',
        title: '保养信息',
        array: [{value: 0, label: '无'}, {value: 1, label: '剩余保养里程数值有效'}, {value: 2, label: '立即保养'}]
      },
      {
        key: 'insulationFault',
        title: '绝缘故障报警',
        array: [{value: 0, label: '正常'}, {value: 1, label: '报警'}]
      },
      {
        key: 'insolationState',
        title: '漏电状态',
        array: [{value: 0, label: 'Insolation_OK (无异常)'}, {value: 1, label: 'Insolation_Warning (漏电警告)'}, {value: 2, label: 'Insolation_Error (异常)'}]
      },
      {
        key: 'powerBatteryState',
        title: '动力电池状态显示',
        array: [{value: 0, label: '放电状态'}, {value: 1, label: '加热状态'}, {value: 2, label: '充电状态'}, {value: 3, label: '保留'}]
      }
    ],
    tpms_0: [
      ...publicData,
      {
        key: 'flTirePres',
        title: '左前轮轮胎压力(kPa)'
      },
      {
        key: 'frTirePres',
        title: '右前轮轮胎压力(kPa)'
      },
      {
        key: 'rlTirePres',
        title: '左后轮轮胎压力(kPa)'
      },
      {
        key: 'rrTirePres',
        title: '右后轮轮胎压力(kPa)'
      },
      {
        key: 'flTireTemp',
        title: '左前轮轮胎温度(℃)'
      },
      {
        key: 'frTireTemp',
        title: '右前轮轮胎温度(℃)'
      },
      {
        key: 'rlTireTemp',
        title: '左后轮轮胎温度(℃)'
      },
      {
        key: 'rrTireTemp',
        title: '右后轮轮胎温度(℃)'
      },
      {
        key: 'flPressureWarning',
        title: '左前轮胎压报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'No Sensor (没有传感器)'}, {value: 2, label: 'Quick leakage (快速泄压报警)'}, {value: 3, label: 'High pressure warning (高压报警)'}, {value: 4, label: 'Low pressure warning (低压报警)'}, {value: 5, label: 'Sensor battery low (传感器电量低)'}, {value: 6, label: 'Sensor failure (传感器故障)'}, {value: 7, label: 'High pressure micro warning (微高压报警)'}, {value: 8, label: 'Low pressure micro warning (微低压报警)'},
        {value: 9, label: '预留'}, {value: 10, label: '预留'}, {value: 11, label: '预留'}, {value: 12, label: '预留'}, {value: 13, label: '预留'}, {value: 14, label: '预留'}, {value: 15, label: '预留'}]
      },
      {
        key: 'frPressureWarning',
        title: '右前轮胎压报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'No Sensor (没有传感器)'}, {value: 2, label: 'Quick leakage (快速泄压报警)'}, {value: 3, label: 'High pressure warning (高压报警)'}, {value: 4, label: 'Low pressure warning (低压报警)'}, {value: 5, label: 'Sensor battery low (传感器电量低)'}, {value: 6, label: 'Sensor failure (传感器故障)'}, {value: 7, label: 'High pressure micro warning (微高压报警)'}, {value: 8, label: 'Low pressure micro warning (微低压报警)'},
        {value: 9, label: '预留'}, {value: 10, label: '预留'}, {value: 11, label: '预留'}, {value: 12, label: '预留'}, {value: 13, label: '预留'}, {value: 14, label: '预留'}, {value: 15, label: '预留'}]
      },
      {
        key: 'rlPressureWarning',
        title: '左后轮胎压报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'No Sensor (没有传感器)'}, {value: 2, label: 'Quick leakage (快速泄压报警)'}, {value: 3, label: 'High pressure warning (高压报警)'}, {value: 4, label: 'Low pressure warning (低压报警)'}, {value: 5, label: 'Sensor battery low (传感器电量低)'}, {value: 6, label: 'Sensor failure (传感器故障)'}, {value: 7, label: 'High pressure micro warning (微高压报警)'}, {value: 8, label: 'Low pressure micro warning (微低压报警)'},
        {value: 9, label: '预留'}, {value: 10, label: '预留'}, {value: 11, label: '预留'}, {value: 12, label: '预留'}, {value: 13, label: '预留'}, {value: 14, label: '预留'}, {value: 15, label: '预留'}]
      },
      {
        key: 'rrPressureWarning',
        title: '右后轮胎压报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'No Sensor (没有传感器)'}, {value: 2, label: 'Quick leakage (快速泄压报警)'}, {value: 3, label: 'High pressure warning (高压报警)'}, {value: 4, label: 'Low pressure warning (低压报警)'}, {value: 5, label: 'Sensor battery low (传感器电量低)'}, {value: 6, label: 'Sensor failure (传感器故障)'}, {value: 7, label: 'High pressure micro warning (微高压报警)'}, {value: 8, label: 'Low pressure micro warning (微低压报警)'},
        {value: 9, label: '预留'}, {value: 10, label: '预留'}, {value: 11, label: '预留'}, {value: 12, label: '预留'}, {value: 13, label: '预留'}, {value: 14, label: '预留'}, {value: 15, label: '预留'}]
      },
      {
        key: 'flTempWarning',
        title: '左前轮胎温报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'High temperature warning (高温报警)'}]
      },
      {
        key: 'frTempWarning',
        title: '右前轮胎温报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'High temperature warning (高温报警)'}]
      },
      {
        key: 'rlTempWarning',
        title: '左后轮胎温报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'High temperature warning (高温报警)'}]
      },
      {
        key: 'rrTempWarning',
        title: '右后轮胎温报警',
        array: [{value: 0, label: 'No warning (无报警)'}, {value: 1, label: 'High temperature warning (高温报警)'}]
      },
      {
        key: 'studyMode',
        title: 'TPMS学习模式',
        array: [{value: 0, label: 'Normal'}, {value: 1, label: 'studying TPMS'}]
      },
      {
        key: 'systemWarning',
        title: 'TPMS故障状态',
        array: [{value: 0, label: 'No error (无异常)'}, {value: 1, label: 'System error (系统异常)'}]
      },
      {
        key: 'studyFailureWarning',
        title: 'TPMS学习状态',
        array: [{value: 0, label: 'No failure'}, {value: 1, label: 'Failure'}]
      }
    ]
};