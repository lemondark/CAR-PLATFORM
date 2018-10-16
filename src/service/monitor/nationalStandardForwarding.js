// 导入baseService
import { baseService } from '@/service/baseService';

const gbMessageListApi = '/api/gbMessage/list';                    // 国标转发报文
const dbMessageListApi = '/api/dbMessage/list';                    // 地标转发报文

/**
 * 国标转发报文
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const gbMessageList = (opt, fnSuccess, fnFail) => {
  baseService('get', gbMessageListApi, fnSuccess, fnFail, opt);
};
/**
 * 地标转发报文
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dbMessageList = (opt, fnSuccess, fnFail) => {
  baseService('get', dbMessageListApi, fnSuccess, fnFail, opt);
};
