// 导入baseService
import { baseService } from '@/service/baseService';

// 短信设置
const smsSearchApi = '/api/smsSend/searchSms';                        // 查询短信回执
const sendSmsApi = '/api/smsSend/sendSms';                        // 下发短信

/**
 * 查询短信回执
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const smsSearch = (opt, fnSuccess, fnFail) => {
  baseService('get', smsSearchApi, fnSuccess, fnFail, opt);
};

/**
 * 下发短信
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const sendSms = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', sendSmsApi, fnSuccess, fnFail, opt, payload);
};
