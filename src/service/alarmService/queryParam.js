// 导入baseService
import { baseService } from '@/service/baseService';

const queryParamApi = '/api/queryParamAuto/alarmArgs';                    // 参数自动匹配

/**
 * 参数自动匹配
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const queryParam = (opt, fnSuccess, fnFail) => {
  baseService('get', queryParamApi, fnSuccess, fnFail, opt);
};
