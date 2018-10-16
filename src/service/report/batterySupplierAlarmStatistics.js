// 导入baseService
import { baseService } from '@/service/baseService';

const avgVehAlarmApi = '/api/reportBatterySupplierAlarm/avgVehAlarm';                    // 单车平均报警统计
const supplierTotalAlarmApi = '/api/reportBatterySupplierAlarm/supplierTotalAlarm';      // 报警总数统计
const supplierTotalAlarmExportApi = '/api/reportBatterySupplierAlarm/export';            // 电池供应商报警导出
const supplierAvgAlarmExportApi = '/api/batterySupplierAvgAlarmCount/export';            // 电池供应商报警导出

/**
 *
 单车平均报警统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const avgVehAlarm = (opt, fnSuccess, fnFail) => {
  baseService('get', avgVehAlarmApi, fnSuccess, fnFail, opt);
};

/**
 *
 报警总数统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const supplierTotalAlarm = (opt, fnSuccess, fnFail) => {
  baseService('get', supplierTotalAlarmApi, fnSuccess, fnFail, opt);
};

/**
 *
 电池供应商报警导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const supplierTotalAlarmExport = (opt, fnSuccess, fnFail) => {
  baseService('get', supplierTotalAlarmExportApi, fnSuccess, fnFail, opt);
};

/**
 *
 电池供应商单车平均报警次数统计导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const supplierAvgAlarmExport = (opt, fnSuccess, fnFail) => {
  baseService('get', supplierAvgAlarmExportApi, fnSuccess, fnFail, opt);
};
