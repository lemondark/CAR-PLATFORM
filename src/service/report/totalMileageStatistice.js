// 导入baseService
import { baseService } from '@/service/baseService';

const totalMileageApi = '/api/reportVehicleRunning/totalMileage';                       // 查询车辆里程列表
const totalMileageExportApi = '/api/reportVehicleRunning/totalMileage/export';         // 车辆里程导出

/**
 * 查询车辆里程列表
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const totalMileage = (opt, fnSuccess, fnFail) => {
  baseService('get', totalMileageApi, fnSuccess, fnFail, opt);
};

/**
 * 车辆里程导出
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const totalMileageExport = (opt, fnSuccess, fnFail) => {
  baseService('get', totalMileageExportApi, fnSuccess, fnFail, opt);
};
