/**
 *  描述：Global filters js
 */
import tool from '@/js/core/utils/tool';

// 待安装
const install = Vue => {
  // 时间filter
  Vue.filter('formatTime', function (value) {
    if (!value) return '';
    let val = new Date(+value);
    return tool.DateFormat(val, 'yyyy-MM-dd hh:mm:ss');
  });

  Vue.filter('formatDate', function (value) {
    if (!value) return '';
    let val = new Date(+value);
    return tool.DateFormat(val, 'yyyy-MM-dd');
  });

  Vue.filter('enableFlag', function (value) {
    switch (value) {
      case 1:
        return '启用';
      case 2:
        return '禁用';
    }
  });

  Vue.filter('certificateType', function (value) {
    switch (value) {
      case 0:
        return '身份证';
      case 1:
        return '护照';
      case 2:
        return '驾照';
    }
  });
  Vue.filter('translate', function (value) {
    switch (value) {
      case 'delete':
        return '删除';
      case 'insert':
        return '新增';
      case 'login':
        return '登录';
      case 'logout':
        return '注销';
      case 'update':
        return '修改';
      case 'excel':
        return '导出';
      case 'print':
        return '打印';
      case 'awaken':
        return '唤醒';
      default :
        break;
    }
  });
  Vue.filter('batteryTypeCode', function (value) {
    switch (value) {
      case 0x01:
        return '磷酸铁鲤电池';
      case 0x02:
        return '锰酸锂电池';
      case 0x03:
        return '钴酸锂电池';
      case 0x04:
        return '三元材料电池';
      case 0x05:
        return '聚合物锂离子电池';
      case 0x06:
        return '超级电容';
      case 0x07:
        return '钛酸锂电池';
      case 0xFC:
        return '燃料电池';
      case 0xFF:
        return '其它车载储能装置';
      case '异常':
        return '异常';
      case '无效':
        return '无效';
      default :
        return '--';
    }
  });
  Vue.filter('carStatus', function (value) {
    switch (value) {
      case 0x01:
        return '启动';
      case 0x02:
        return '熄火';
      case 0x03:
        return '其它';
      case -1:
        return '异常';
      case -2:
        return '无效';
      case '异常':
        return '异常';
      case '无效':
        return '无效';
      default :
        return '--';
    }
  });
  // bms
  Vue.filter('carStatusVms', function (value) {
    switch (value) {
      case 0:
        return '熄火';
      case 1:
        return '熄火';
      case 2:
        return '启动';
      case '异常':
        return '异常';
      case '无效':
        return '无效';
      default :
        return '--';
    }
  });
  Vue.filter('driveBrakeStatus', function (value) {
    switch (value) {
      case 0:
        return '制动无效、驱动无效';
      case 1:
        return '制动有效、驱动无效';
      case 2:
        return '制动无效、驱动有效';
      case 3:
        return '制动有效，驱动有效';
      case '异常':
        return '异常';
      case '无效':
        return '无效';
      default :
        return '--';
    }
  });
  Vue.filter('gearStatus', function (value) {
    switch (value) {
      case 0:
        return 'N 档';
      case 1:
        return 'D 档';
      case 2:
        return 'R 档';
      case 3:
        return 'P 档';
      default:
        return '--';
    }
  });
  Vue.filter('chargeStatus', function (value) {
    switch (value) {
      case 0x01:
        return '停车充电';
      case 0x02:
        return '行驶充电';
      case 0x03:
        return '未充电';
      case 0x04:
        return '充电完成';
      case 0:
        return '充电中';
      case 1:
        return '停止充电';
      case 2:
        return '充电异常';
      case -1:
        return '异常';
      case -2:
        return '无效';
      case '异常':
        return '异常';
      case '无效':
        return '无效';
      default :
        return '--';
    }
  });
  Vue.filter('chargeStatusBMS', function (value) {
    switch (value) {
      case 0:
        return '未充电';
      case 1:
        return '未充电';
      case 2:
        return '行驶充电';
      case 3:
        return '停车充电';
      case '异常':
        return '异常';
      case '无效':
        return '无效';
      default:
        return '--';
    }
  });
  // D3档位
  Vue.filter('geerPositon', function (value) {
    switch (value) {
      case 0x0:
        return 'N 挡';
      case 0x1:
        return 'D 挡';
      case 0x2:
        return 'R 挡';
      case 0x3:
        return 'P 挡';
      default:
        return '';
    }
  });

   // 档位最新变动
   Vue.filter('clutchStatus', function (value) {
    switch (value) {
      case 0:
        return 'N 挡';
      case 1:
        return 'D 挡';
      case 2:
        return 'D 挡';
      case 3:
        return 'D 挡';
      case 4:
        return 'D 挡';
      case 5:
        return 'D 挡';
      case 6:
        return 'D 挡';
      case 14:
        return 'D 挡';
      case 15:
        return 'P 挡';
      case 13:
        return 'R 挡';
      default:
        return '';
    }
  });

  // ACC状态
  Vue.filter('runStatus', function (value) {
    switch (value) {
      case 0:
        return 'OFF';
      case 1:
        return 'ON';
      case 2:
        return 'ready';
      default:
        return '';
    }
  });

  // 终端参数查询
  Vue.filter('paramQuery', (value) => {
    switch (value) {
      case '-1':
        return '无效';
      case '-2':
        return '异常';
      case '-3':
        return '无效';
      default:
        return value;
    }
  });
  // 终端参数查询 通讯方式
  Vue.filter('communicationMode', (value) => {
    switch (value) {
      case '0':
        return 'UDP通讯方式';
      case '1':
        return 'TCP通讯方式';
      case '2':
        return '其他通讯方式';
      default:
        return '';
    }
  });
  // 日期过滤
  Vue.filter('dateNaN', (value) => {
    switch (value) {
      case 'NaN-aN-aN aN:aN:aN':
        return '--';
      default:
        return value;
    }
  });
  // 取整数
  Vue.filter('initNumber', (value) => {
    return parseInt(value);
  });
  // 故障等级
  Vue.filter('alarmLevel', function (value) {
    switch (value) {
      case 1:
        return '一级';
      case 2:
        return '二级';
      case 3:
        return '三级';
        case 4:
        return '四级';
      default:
        return '';
    }
  });
  // 处理状态
  Vue.filter('alarmStatus', function (value) {
    switch (value) {
      case 0:
        return '未处理';
      case 1:
        return '处理中';
      case 2:
        return '已处理';
      case 3:
        return '已关闭';
      default:
        return '';
    }
  });
  // 数据过滤
  Vue.filter('dataNaN', (value) => {
    if (isNaN(value)) {
      return '--';
    } else {
      return value;
    }
  });

  // 电池包均衡状态
  Vue.filter('batteryBalanceStatus', function (value) {
    switch (value) {
      case 0:
        return '没有均衡';
      case 1:
        return '均衡过程完成';
      default:
        return '--';
    }
  });

  // DC-DC状态
  Vue.filter('dcdcStatus', function (value) {
    switch (value) {
      case 1:
        return '工作';
      case 2:
        return '断开';
      case -1:
        return '异常';
      case -2:
        return '无效';
      default:
        return '--';
    }
  });

  // 空调启动状态
  Vue.filter('rtStatus', function (value) {
    switch (value) {
      case 0:
        return '加热制冷均关闭';
      case 1:
        return '制冷工作';
      case 2:
        return '制热工作';
      case 3:
        return '保留';
      default:
        return '--';
    }
  });

  // 空调风机档位
  Vue.filter('hvacLevel', function (value) {
    switch (value) {
      case 0:
        return '0档';
      case 1:
        return '1档';
      case 2:
        return '2档';
      case 3:
        return '3档';
      case 4:
        return '4档';
      case 5:
        return '5档';
      case 6:
        return '6档';
      case 7:
        return '7档';
      case 8:
        return '8档';
      default:
        return '--';
    }
  });

  // D3档位
  Vue.filter('bigClutch', function (value) {
    switch (Number.parseInt(value)) {
      case 0:
        return 'N';
      case 1:
        return 'D';
      case 2:
        return 'R';
      case 3:
        return 'P';
      default:
        return '';
    }
  });
  // D3档位
  Vue.filter('APN', function (value) {
    switch (Number.parseInt(value)) {
      case 1:
        return 'CMNET';
      case 2:
        return 'UNINET';
      default:
        return value;
    }
  });
  // D3档位
  Vue.filter('Constellation', function (value) {
    switch (value) {
      case 'Aries':
        return '白羊';
      case 'Taurus':
        return '金牛';
      case 'Gemini':
        return '双子';
      case 'Cancer':
        return '巨蟹';
      case 'Leo':
        return '狮子';
      case 'Virgo':
        return '处女';
      case 'Libra':
        return '天秤';
      case 'Scorpio':
        return '天蝎';
      case 'Sagittarius':
        return '射手';
      case 'Capricornus':
        return '摩羯';
      case 'Aquarius':
        return '水瓶';
      case 'Pisces':
        return '双鱼';
      default:
        return '';
    }
  });
};

export default install;
