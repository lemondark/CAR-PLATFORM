// 导入baseService
import { baseService } from '@/service/baseService';

// 历史报警详情
const historyDetailApi = '/api/historyAlarmData/detailed';                    // 历史报警详情
const currentDetailApi = '/api/currentAlarmData/detailed';                    // 实时报警详情

/**
 * 历史报警详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const historyDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', historyDetailApi, fnSuccess, fnFail, opt);
};

/**
 * 实时报警详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const currentDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', currentDetailApi, fnSuccess, fnFail, opt);
};
