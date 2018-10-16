// 导入baseService
import { baseService } from '@/service/baseService';

const canListApi = '/api/can/list';                                        // 实时can
const currentListApi = '/api/countryStandard/current/list';                // 实时国标数据
const historyListApi = '/api/countryStandard/history/list';                // 历史国标数据
const currentListAloneApi = '/api/countryStandard/currentCountry/list';                // 单独实时国标数据

/**
 * 实时can
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const canList = (opt, fnSuccess, fnFail) => {
  baseService('get', canListApi, fnSuccess, fnFail, opt);
};

/**
 * 实时国标数据
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const currentList = (opt, fnSuccess, fnFail) => {
  baseService('get', currentListApi, fnSuccess, fnFail, opt);
};
/**
 * 单独实时国标数据
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const currentListAlone = (opt, fnSuccess, fnFail) => {
  baseService('get', currentListAloneApi, fnSuccess, fnFail, opt);
};

/**
 * 历史国标数据
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const historyList = (opt, fnSuccess, fnFail) => {
  baseService('get', historyListApi, fnSuccess, fnFail, opt);
};
