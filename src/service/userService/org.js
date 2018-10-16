// 导入baseService
import { baseService } from '@/service/baseService';

// 组织中心
const orgListApi = '/api/sys/org/list';                    // 获取组织列表
const saveOrgApi = '/api/sys/org/save';                    // 新增组织
const deleteOrgApi = '/api/sys/org/delete';                    // 删除组织

/**
 * 获取组织列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const orgList = (opt, fnSuccess, fnFail) => {
  baseService('get', orgListApi, fnSuccess, fnFail, opt);
};

/**
 * 组织新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const saveOrg = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveOrgApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 组织删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteOrg = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteOrgApi, fnSuccess, fnFail, opt, payload);
};
