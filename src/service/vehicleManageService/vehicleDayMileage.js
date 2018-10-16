// 导入baseService
import { baseService } from '@/service/baseService';

// 车辆总里程
const vehicleDayMileageListApi = '/api/vehicleDayMileage/list';                           // 车辆列表
const vehicleDayMileageExportApi = '/api/vehicleDayMileage/excel';         // 车辆里程导出
const summaryDayMileageApi = '/api/vehicleDayMileage/summaryDayMileage';         // 汇总车辆每日总里程

/**
 * 车辆列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleDayMileageList = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleDayMileageListApi, fnSuccess, fnFail, opt);
};

/**
 * 车辆里程导出
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleDayMileageExport = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleDayMileageExportApi, fnSuccess, fnFail, opt);
};

/**
 * 汇总车辆每日总里程
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const summaryDayMileage = (opt, fnSuccess, fnFail) => {
  baseService('get', summaryDayMileageApi, fnSuccess, fnFail, opt);
};
