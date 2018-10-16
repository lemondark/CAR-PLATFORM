/**
 * Created by hao wang on 2018/2/6.
 */
// 导入baseService
import { baseService } from '@/service/baseService';

// 电池均衡
const batteryListApi = '/api/batteryBalanceParameter/list';                    // 获取电池均衡列表
const saveBatteryApi = '/api/batteryBalanceParameter/save';                    // 新增电池均衡
const deleteBatteryApi = '/api/batteryBalanceParameter/delete';                    // 新增电池均衡

/**
 * 获取电池均衡列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batteryList = (opt, fnSuccess, fnFail) => {
  baseService('get', batteryListApi, fnSuccess, fnFail, opt);
};

/**
 * 电池均衡新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const saveBattery = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveBatteryApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 电池均衡删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteBattery = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteBatteryApi, fnSuccess, fnFail, opt, payload);
};
