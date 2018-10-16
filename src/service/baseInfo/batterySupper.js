// 导入baseService
import { baseService } from '@/service/baseService';

const listApi = '/api/batterySupplier/list';                        // 电池供应商列表
const saveApi = '/api/batterySupplier/update';                        // 电池供应商保存

/**
 * 电池供应商列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryList = (opt, fnSuccess, fnFail) => {
  baseService('get', listApi, fnSuccess, fnFail, opt);
};

/**
 * 电池供应商保存
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batterySave = (opt, fnSuccess, fnFail) => {
  baseService('get', saveApi, fnSuccess, fnFail, opt);
};
