// 导入baseService
import { baseService } from '@/service/baseService';

const wakeUpListApi = '/api/vechicleCallRecord/list';                    // 唤醒记录
const wakeUpDetailListApi = '/api/vehicleCallDetails/list';              // 唤醒记录详情

/**
 * 获取唤醒记录列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const wakeUpList = (opt, fnSuccess, fnFail) => {
  baseService('get', wakeUpListApi, fnSuccess, fnFail, opt);
};

/**
 * 获取唤醒记录列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const wakeUpDetailList = (opt, fnSuccess, fnFail) => {
  baseService('get', wakeUpDetailListApi, fnSuccess, fnFail, opt);
};
