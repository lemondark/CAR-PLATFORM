// 导入baseService
import { baseService } from '@/service/baseService';

const historyCanListApi = '/api/can/history/historyCan/list';                    // 历史CAN列表数据

/**
 * 历史CAN列表数据
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const historyCanList = (opt, fnSuccess, fnFail) => {
  baseService('get', historyCanListApi, fnSuccess, fnFail, opt);
};
