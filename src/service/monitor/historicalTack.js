// 导入baseService
import { baseService } from '@/service/baseService';

const locationListApi = '/api/positionHistory/list';                    // 历史轨迹回放

/**
 * 历史轨迹回放
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const locationList = (opt, fnSuccess, fnFail) => {
  baseService('get', locationListApi, fnSuccess, fnFail, opt);
};
