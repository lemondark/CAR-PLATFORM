/**
 *  描述：Global filters js
 */
import tool from '@/js/core/utils/tool';

// 待安装
const install = (Vue, options) => {
  Vue.prototype.__filters = {
    // 转换汉字
    translate: (h, params, key) => {
      switch (params.row[key]) {
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
    },
    // 时间
    formatTime: (h, params, key) => {
      if (!params.row[key]) {
        return '';
      }
      let val = new Date(+params.row[key]);
      let time = tool.DateFormat(val, 'yyyy-MM-dd hh:mm:ss');
      return h('p', null, time);
    },
    // 日期
    formatDate: (h, params, key) => {
      if (!params.row[key]) {
        return '';
      }
      let val = new Date(+params.row[key]);
      let date = tool.DateFormat(val, 'yyyy-MM-dd');
      return h('p', null, date);
    },
    // 性别
    sex: (h, params, key) => {
      let strInfo = '';
      let cssType = '';
      if (!params.row[key]) {
        return '';
      }
      switch (params.row[key].toString()) {
        case '1':
          strInfo = '男';
          cssType = '#2b85c4';
          break;
        case '2':
          strInfo = '女';
          cssType = '#2b85c4';
          break;
      }
      return h('p', {
        style: {
          color: cssType,
          marginRight: '5px'
        }
      }, strInfo);
    },
    // 状态
    enableFlag: (h, params, key) => {
      let strInfo = '';
      let cssType = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '正常';
          cssType = '#2b85c4';
          break;
        case 0:
          strInfo = '禁用';
          cssType = '#2b85c4';
          break;
      }
      return h('p', {
        style: {
          color: cssType,
          marginRight: '5px'
        }
      }, strInfo);
    },
    // 状态
    statusFlag: (h, params, key) => {
      let strInfo = '';
      let cssType = '';
      switch (params.row[key]) {
        case 0:
          strInfo = '正常';
          cssType = '#2b85c4';
          break;
        case 1:
          strInfo = '禁用';
          cssType = '#2b85c4';
          break;
      }
      return h('p', {
        style: {
          color: cssType,
          marginRight: '5px'
        }
      }, strInfo);
    },
    // 用户类型
    userType: (h, params, key) => {
      let strInfo = '';
      let cssType = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '正常用户';
          cssType = '#2b85c4';
          break;
        case 2:
          strInfo = '临时用户';
          cssType = '#2b85c4';
          break;
      }
      return h('p', {
        style: {
          color: cssType,
          marginRight: '5px'
        }
      }, strInfo);
    },
    // 国标故障等级
    gbLevel: (h, params, fn, key, isGb, version) => {
      let strInfo = '';
      let textType = 'span';
      let defProps = {
        type: 'text',
        size: 'small'
      };
      let defStyle = {
        marginRight: '5px'
      };
      switch (params.row[key]) {
        case 1:
          strInfo = '一级';
          break;
        case 2:
          strInfo = '二级';
          break;
        case 3:
          strInfo = '三级';
          if (key === 'gbLevel' && isGb && version === 0) {
            defStyle = {
              color: 'white',
              cursor: 'pointer',
              background: 'red'
            };
            textType = 'Button';
          }
          break;
        case 4:
          strInfo = '四级';
          break;
        default:
          strInfo = '无故障';
      }
      return h(textType, {
        props: defProps,
        style: defStyle,
        on: {
          click: () => {
            if (key === 'gbLevel' && isGb) {
              fn(params.row);
            }
          }
        }
      }, strInfo);
    },
    // 字段关系
    fieldRelation: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case -2:
          strInfo = '小于等于';
          break;
        case -1:
          strInfo = '小于';
          break;
        case 0:
          strInfo = '等于';
          break;
        case 1:
          strInfo = '大于';
          break;
        case 2:
          strInfo = '大于等于';
          break;
      }
      return h('p', null, strInfo);
    },
    alarmClazz: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '直接报警';
          break;
        case 2:
          strInfo = '间接报警';
          break;
        case 3:
          strInfo = '组合报警';
          break;
      }
      return h('p', null, strInfo);
    },
    alarmStatus: (h, params, key, fn) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 0:
          strInfo = '未处理';
          break;
        case 1:
          strInfo = '处理中';
          break;
        case 2:
          strInfo = '已处理';
          break;
        case 3:
          strInfo = '已关闭';
          break;
      }
      return h('p', fn ? {
        on: {
          click: () => {
            fn(params.row);
          }
        }
      } : null, strInfo);
    },
    // 报警类型
    alarmType: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '国标报警';
          break;
        case 2:
          strInfo = '地标报警';
          break;
        case 3:
          strInfo = '自有故障报警';
          break;
      }
      return h('p', null, strInfo);
    },
    // 报警等级
    alarmLevel: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '一级';
          break;
        case 2:
          strInfo = '二级';
          break;
        case 3:
          strInfo = '三级';
          break;
        case 4:
          strInfo = '四级';
          break;
      }
      return h('p', null, strInfo);
    },
    // 报警方式 2进制
    alarmMode: (h, params, key) => {
      let strInfo = '';
      let value = params.row[key];
      if (Number(value[value.length - 1]) === 1) {
        strInfo = '声音';
      }
      if (Number(value[value.length - 2]) === 1) {
        if (strInfo === '') strInfo = '弹框';
        else strInfo = strInfo + '，弹框';
      }
      if (Number(value[value.length - 3]) === 1) {
        if (strInfo === '') strInfo = '短信';
        else strInfo = strInfo + '，短信';
      }
      if (Number(value[value.length - 4]) === 1) {
        if (strInfo === '') strInfo = '邮件';
        else strInfo = strInfo + '，邮件';
      }
      return h('p', null, strInfo);
    },
    // 关重件
    keyWordType: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = 'TBOX';
          break;
        case 2:
          strInfo = 'SIM卡';
          break;
        case 3:
          strInfo = '电机';
          break;
        case 4:
          strInfo = '电池';
          break;
      }
      return h('p', null, strInfo);
    },
    // 营业状态
    opratingState: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '待建站';
          break;
        case 2:
          strInfo = '正常营业';
          break;
        case 3:
          strInfo = '暂停营业';
          break;
        case 4:
          strInfo = '退网';
          break;
      }
      return h('p', null, strInfo);
    },
    // 资质
    maintenanceQualification: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '一级';
          break;
        case 2:
          strInfo = '二级';
          break;
        case 3:
          strInfo = '三级';
          break;
        case 4:
          strInfo = '四级';
          break;
        case 5:
          strInfo = '其它';
          break;
      }
      return h('p', null, strInfo);
    },
    // 性质
    nature: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '中心站';
          break;
        case 2:
          strInfo = '二级服务站';
          break;
        case 3:
          strInfo = '快捷站';
          break;
      }
      return h('p', null, strInfo);
    },
    // 用户类型
    wakeUpState: (h, params, key) => {
      let strInfo = '';
      let cssType = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '成功';
          cssType = '#2b85c4';
          break;
        case 0:
          strInfo = '失败';
          cssType = '#c41316';
          break;
        default:
          strInfo = '唤醒中';
          cssType = '#4784ff';
      }
      return h('p', {
        style: {
          color: cssType,
          marginRight: '5px'
        }
      }, strInfo);
    },
    // 任务状态
    taskState: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 0:
          strInfo = '等待中';
          break;
        case 1:
          strInfo = '可下载';
          break;
        case 2:
          strInfo = '下载中';
          break;
        case 3:
          strInfo = '已完成';
          break;
        case 4:
          strInfo = '已取消';
          break;
        case 5:
          strInfo = '已暂停';
          break;
        case 6:
          strInfo = '异常';
          break;
      }
      return h('p', null, strInfo);
    },
    // 电池均衡统计等级
    batteryLevel: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '一级';
          break;
        case 2:
          strInfo = '二级';
          break;
        case 3:
          strInfo = '三级';
          break;
      }
      return h('p', null, strInfo);
    },
    // 邮件类型
    informationType: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '短信模板';
          break;
        case 2:
          strInfo = '邮件模板';
          break;
      }
      return h('p', null, strInfo);
    },
    // 电池均衡参数管理等级
    batteryBalanceLevel: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '一级';
          break;
        case 2:
          strInfo = '二级';
          break;
        case 3:
          strInfo = '三级';
          break;
      }
      return h('p', null, strInfo);
    },
    // 方位
    direction: (h, params, key) => {
      let value = params.row['position'].direction;
      if (!value && value !== 0) return '';
      if (value === 0 || value === 360) return h('p', null, '正北');
      else if (value > 0 && value <= 67.5) return h('p', null, '东北');
      else if (value > 67.5 && value <= 90) return h('p', null, '东');
      else if (value > 90 && value <= 157.5) return h('p', null, '东南');
      else if (value > 157.5 && value <= 180) return h('p', null, '南');
      else if (value > 180 && value <= 247.5) return h('p', null, '西南');
      else if (value > 247.5 && value <= 270) return h('p', null, '西');
      else if (value > 270 && value <= 359) return h('p', null, '西北');
    },
    // 国标转发配置状态
    statusType: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '已开启';
          break;
        case 0:
          strInfo = '已禁用';
          break;
      }
      return h('p', null, strInfo);
    },
    // 国标转发报文
    gbMessageType: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case '01':
          strInfo = '车辆登入';
          break;
        case '02':
          strInfo = '实时数据';
          break;
        case '03':
          strInfo = '补发数据';
          break;
        case '04':
          strInfo = '车辆登出';
          break;
      }
      return h('p', null, strInfo);
    },
    // 国标转发报文
    vehicleStatus: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 0:
          strInfo = '随车卡未录入';
          break;
        case 1:
          strInfo = '审核中';
          break;
        case 3:
          strInfo = '在库未售出';
          break;
        case 4:
          strInfo = '审核未通过';
          break;
        case 5:
          strInfo = '在经销处';
          break;
        case 6:
          strInfo = '在终端客户处';
          break;
        case 7:
          strInfo = '待入库';
          break;
        case 8:
          strInfo = '未记录去向';
          break;
      }
      return h('p', null, strInfo);
    }
  };
};

export default install;
