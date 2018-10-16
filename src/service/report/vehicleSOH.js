// 导入baseService
import { baseService } from '@/service/baseService';

const allSOHApi = '/api/soh/static';                    // soh总数统计
const sohViewApi = '/api/soh/view';                     // soh详情 /api/reportVehicleRunning/totalMileage
const sohExportApi = '/api/soh/export';                 // soh导出
const sohSupplierApi = '/api/soh/supplierName';			// soh供应商接口

/**
 * soh总数统计
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const allSOH = (opt, fnSuccess, fnFail) => {
  baseService('get', allSOHApi, fnSuccess, fnFail, opt);
};

/**
 * soh详情
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const sohView = (opt, fnSuccess, fnFail) => {
  baseService('get', sohViewApi, fnSuccess, fnFail, opt);
};

/**
 * soh导出
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const sohExport = (opt, fnSuccess, fnFail) => {
  baseService('get', sohExportApi, fnSuccess, fnFail, opt);
};

export const sohSupplier = (opt, fnSuccess, fnFail) => {
  baseService('get', sohSupplierApi, fnSuccess, fnFail, opt);
};
