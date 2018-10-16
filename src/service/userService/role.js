// 导入baseService
import { baseService } from '@/service/baseService';

// 角色中心
const roleListApi = '/api/sys/role/list';                    // 获取角色列表
const saveRoleApi = '/api/sys/role/save';                    // 新增角色
const deleteRoleApi = '/api/sys/role/delete';                    // 新增角色
const unBindRoleVehicleApi = '/api/sys/role/unBindRoleVehicle';                    // 解绑车辆
const queryRoleVehicleApi = '/api/sys/role/queryRoleVehicle';                    // 查询角色绑定车辆
const changeRoleVehicleAuthFlagApi = '/api/sys/role/changeRoleVehicleAuthFlag';       // 改变角色车辆权限标识符

/**
 * 获取角色列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const roleList = (opt, fnSuccess, fnFail) => {
  baseService('get', roleListApi, fnSuccess, fnFail, opt);
};

/**
 * 角色新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const saveRole = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveRoleApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 角色删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteRole = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteRoleApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 解绑车辆
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const unBindRoleVehicle = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', unBindRoleVehicleApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 查询角色绑定车辆
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const queryRoleVehicle = (opt, fnSuccess, fnFail) => {
  baseService('get', queryRoleVehicleApi, fnSuccess, fnFail, opt);
};

/**
 * 改变角色车辆权限标识符
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const changeRoleVehicleAuthFlag = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', changeRoleVehicleAuthFlagApi, fnSuccess, fnFail, opt, payload);
};
