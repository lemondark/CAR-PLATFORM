// 导入baseService
import { baseService } from '@/service/baseService';

const vehicleRunningListApi = '/api/reportVehicleRunning/list';                    // 查询车辆运行统计列表
const vehicleRunningExportApi = '/api/reportVehicleRunning/excel';                // 车辆运行统计列表导出

/**
 * 查询车辆运行统计列表
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleRunningList = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleRunningListApi, fnSuccess, fnFail, opt);
};

/**
 * 车辆运行统计列表导出
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleRunningExport = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleRunningExportApi, fnSuccess, fnFail, opt);
};
