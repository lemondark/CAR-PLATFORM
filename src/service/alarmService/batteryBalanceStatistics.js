// 导入baseService
import { baseService } from '@/service/baseService';

// 电池均衡统计
const batteryBalanceStatApi = '/api/batteryBalanceData/list';                    // 获取电池均衡统计列表
const batteryBalanceDetailsApi = '/api/batteryBalanceDetails/list';              // 获取电池均衡统计详情列表
const batteryBalanceExcelApi = '/api/batteryBalanceDetails/excel';               // 获取电池均衡统计详情导出

/**
 * 电池均衡统计列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryBalanceStat = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryBalanceStatApi, fnSuccess, fnFail, opt);
};

/**
 * 获取电池均衡统计详情列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryBalanceDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryBalanceDetailsApi, fnSuccess, fnFail, opt);
};

/**
 * 获取电池均衡统计详情导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryBalanceDetailExcel = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryBalanceExcelApi, fnSuccess, fnFail, opt);
};
