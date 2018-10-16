// 导入baseService
import { baseService } from '@/service/baseService';

// openApi授权管理
const openApiAuthListApi = '/api/openApiUser/list';                    // 列表
const dataListApi = '/api/openApiData/list';                    // openApi数据API列表
const userDataListApi = '/api/openApiData/findUserData';                    // 根据用户id查询有权限的openApi
const openApiAuthSaveApi = '/api/openApiUser/save';                        // 保存
const openApiAuthdeleteApi = '/api/openApiUser/delete';                    // 删除

/**
 * openApi授权列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const openApiAuthList = (opt, fnSuccess, fnFail) => {
  baseService('get', openApiAuthListApi, fnSuccess, fnFail, opt);
};

/**
 * openApi数据API列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dataList = (opt, fnSuccess, fnFail) => {
  baseService('get', dataListApi, fnSuccess, fnFail, opt);
};

/**
 * 根据用户id查询有权限的openApi
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const userDataList = (opt, fnSuccess, fnFail) => {
  baseService('get', userDataListApi, fnSuccess, fnFail, opt);
};

/**
 * 保存
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const openApiAuthSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', openApiAuthSaveApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const openApiAuthdelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', openApiAuthdeleteApi, fnSuccess, fnFail, opt);
};
