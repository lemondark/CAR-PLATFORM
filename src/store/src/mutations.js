/**
 *  作者：yeshengqiang
 *  时间：2017-06-04
 *  描述：common Mutations
 */

// 导入 types
import {
	SIDEBAR_AN,
	MENU_TREE,
	COUNT_ALARM,
	SOCKET_LIST,
  HOME_SHOW,
  SERVICE_SHOW,
  EXCEPTCAR_SHOW,
  TASK_NUM,
  PRINT_DATA,
  ALARM_NUM
} from './mutation-types';

export default {
	// 控制导航
	[SIDEBAR_AN] (state, info) {
		state.sidebar_an = info.state;
	},
	// 菜单tree
	[MENU_TREE] (state, info) {
		state.menuTree = info;
	},
	// 报警数量
	[COUNT_ALARM] (state, info) {
		state.countAlarm = info.count;
	},
	// 头部热力图按钮显隐
	[HOME_SHOW] (state, info) {
		state.homeShow = info.status;
	},
  	// 服务站-头部显示隐藏
	[SERVICE_SHOW] (state, info) {
		state.serviceShow = info.status;
	},
	// 异常车辆-头部显示隐藏
	[EXCEPTCAR_SHOW] (state, info) {
		state.exceptCarShow = info.status;
	},
	// 首页websocket
	[SOCKET_LIST] (state, info) {
    state.socketList.unshift(info);
    if (state.socketList.length > 5) {
      state.socketList.length = 5;
    }
	},
  // 下载数量
  [TASK_NUM] (state, info) {
	  state.taskNum = info;
  },
  // 打印位置数据
  [PRINT_DATA] (state, info) {
	  state.printData = info;
  },
  // 报警数量
  [ALARM_NUM] (state, info) {
	  state.alarmNum = info;
  }
};
