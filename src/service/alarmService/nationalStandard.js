// 导入baseService
import { baseService } from '@/service/baseService';

const realTimeAlarmApi = '/api/currentAlarmData/list';                    // 获取实时报警列表
const currentExportApi = '/api/currentAlarmData/excel';                   // 实时报警导出
const currentDetailApi = '/api/currentAlarmData/detailed';                // 实时报警详情
const historyAlarmApi = '/api/historyAlarmData/list';                     // 获取历史报警列表
const historyDetailApi = '/api/historyAlarmData/detailed';                // 历史报警详情
const historyThreeDetailApi = '/api/historyAlarmData/gb3/detailed';       // 历史报警国标三级详情
const countNoApi = '/api/currentAlarmData/countNoRead';                   // 未读报警统计
const listNoReadApi = '/api/currentAlarmData/listNoRead';                 // 查询未读报警列表
const gbCloseApi = '/api/historyAlarmData/gb/close';                      // 国标报警关闭
const gbHandleApi = '/api/historyAlarmData/gb/handle';                    // 国标报警处理
const historyExportApi = '/api/historyAlarmData/excel';                   // 历史报警导出
const currentHandleApi = '/api/currentAlarmData/gb/handle';               // 实时报警处理
const excelBatteryApi = '/api/historyAlarmData/excelBattery';             // 电池供应商报警列表导出
const importHandleApi = '/api/alarmImportHandle/gb/import';               // 国标报警导入

/**
 * 获取实时报警列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const realTimeAlarm = (opt, fnSuccess, fnFail) => {
  baseService('get', realTimeAlarmApi, fnSuccess, fnFail, opt);
};

/**
 * 实时报警导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const currentExport = (opt, fnSuccess, fnFail) => {
  baseService('get', currentExportApi, fnSuccess, fnFail, opt);
};

/**
 * 历史报警导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const historyExport = (opt, fnSuccess, fnFail) => {
  baseService('get', historyExportApi, fnSuccess, fnFail, opt);
};

/**
 * 获取实时报警详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const currentDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', currentDetailApi, fnSuccess, fnFail, opt);
};

/**
 * 获取实历史报警列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const historyAlarm = (opt, fnSuccess, fnFail) => {
  baseService('get', historyAlarmApi, fnSuccess, fnFail, opt);
};

/**
 * 获取实历史报警详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const historyDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', historyDetailApi, fnSuccess, fnFail, opt);
};

/**
 * 获取实历史报警国标3级详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const historyThreeDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', historyThreeDetailApi, fnSuccess, fnFail, opt);
};

/**
 * 未读报警统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const countNo = (opt, fnSuccess, fnFail) => {
  baseService('get', countNoApi, fnSuccess, fnFail, opt);
};

/**
 * 查询未读报警列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const listNoRead = (opt, fnSuccess, fnFail) => {
  baseService('get', listNoReadApi, fnSuccess, fnFail, opt);
};

/**
 * 国标报警关闭
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const gbClose = (opt, fnSuccess, fnFail) => {
  baseService('update', gbCloseApi, fnSuccess, fnFail, opt);
};

/**
 * 国标报警处理
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const gbHandle = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', gbHandleApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 实时报警处理
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const currentHandle = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', currentHandleApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 查询未读报警列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const excelBattery = (opt, fnSuccess, fnFail) => {
  baseService('get', excelBatteryApi, fnSuccess, fnFail, opt);
};

export const importHandle = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', importHandleApi, fnSuccess, fnFail, opt, payload);
};
