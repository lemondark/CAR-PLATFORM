// 导入baseService
import { baseService } from '@/service/baseService';

const batteryAlarmApi = '/api/batteryAlarmStat/list';                    // 获取电池供应商报警列表
const batteryAlarmDetailApi = '/api/batteryAlarmDetail/list';              // 获取电池报警详情列表
const batteryAlarmExportApi = '/api/batteryAlarmDetail/export';            // 电池报警详情导出
const batteryAlarmexcelApi = '/api/batteryAlarmStat/excel';                    // 获取电池供应商报警导出

/**
 * 获取电池供应商列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batterySupplier = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryAlarmApi, fnSuccess, fnFail, opt);
};

/**
 * 获取电池报警详情列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryAlarmDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryAlarmDetailApi, fnSuccess, fnFail, opt);
};

/**
 * 电池报警详情导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryAlarmExport = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryAlarmExportApi, fnSuccess, fnFail, opt);
};

/**
 * 电池供应商报警导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryAlarmexcel = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryAlarmexcelApi, fnSuccess, fnFail, opt);
};

