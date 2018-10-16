// 导入baseService
import { baseService } from '@/service/baseService';

const vehicleTravelApi = '/api/vehicleTravelManagement/list';                    // 获取行程管理列表
const travelExportApi = '/api/vehicleTravelManagement/export';                    // 获取行程管理列表

/**
 * 获取行程管理列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const travelManagement = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleTravelApi, fnSuccess, fnFail, opt);
};

/**
 * 获取行程管理列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const travelExport = (opt, fnSuccess, fnFail) => {
  baseService('get', travelExportApi, fnSuccess, fnFail, opt);
};

