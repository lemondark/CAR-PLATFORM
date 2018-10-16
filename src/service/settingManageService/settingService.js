// 导入baseService
import { baseService } from '@/service/baseService';

// 个人设置
// const saveApi = '/api/user/updateSettings';                           // 个人设置                  method 'POST'
const saveApi = '/api/sys/user/save';                           // 个人设置                  method 'POST'

/**
 * 个人设置
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const settingSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('post', saveApi, fnSuccess, fnFail, opt, payload);
};
