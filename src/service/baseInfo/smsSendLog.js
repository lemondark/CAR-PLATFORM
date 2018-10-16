// 导入baseService
import { baseService } from '@/service/baseService';

const smsSendListApi = '/api/smsSendLog/list';                    // 查询短信发送记录列表

/**
 * 查询短信发送记录列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const smsSendList = (opt, fnSuccess, fnFail) => {
  baseService('get', smsSendListApi, fnSuccess, fnFail, opt);
};
