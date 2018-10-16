// 导入baseService
import { baseService } from '@/service/baseService';

// 第三方授权管理
const thirdListApi = '/api/supplier/list';                    // 获取第三方授权列表
const saveThirdApi = '/api/supplier/generate';                    // 新增第三方授权
const deleteThirdApi = '/api/supplier/delete';                    // 删除第三方授权
const switchStatusApi = '/api/supplier/switchStatus';                    // 第三方授权起禁用

/**
 * 获取第三方授权列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const thirdList = (opt, fnSuccess, fnFail) => {
  baseService('get', thirdListApi, fnSuccess, fnFail, opt);
};

/**
 * 第三方授权新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const saveThird = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveThirdApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 第三方授权删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteThird = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteThirdApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 第三方授权启用禁用
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const switchStatus = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', switchStatusApi, fnSuccess, fnFail, opt, payload);
};
