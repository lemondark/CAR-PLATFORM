// 导入baseService
import { baseService } from '@/service/baseService';

// 按钮权限中心
const buttonListApi = '/api/sys/button/list';                    // 获取按钮权限列表
const saveButtonApi = '/api/sys/button/save';                    // 新增按钮权限
const deleteButtonApi = '/api/sys/button/delete';                    // 新增按钮权限

/**
 * 获取按钮权限列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const buttonList = (opt, fnSuccess, fnFail) => {
  baseService('get', buttonListApi, fnSuccess, fnFail, opt);
};

/**
 * 按钮权限新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const saveButton = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveButtonApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 按钮权限删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteButton = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteButtonApi, fnSuccess, fnFail, opt, payload);
};
