// 导入baseService
import { baseService } from '@/service/baseService';

// 用户中心
const getPublicKeyApi = '/api/security/getPublicKey';       // 获取公钥
const loginApi = '/api/sys/user/login';                    // 登录
const logoutApi = '/api/sys/user/logout';                    // 退出
const userListApi = '/api/sys/user/list';                    // 获取用户列表
const oneselfApi = '/api/sys/user/oneself/get';                    // 获取当前用户信息
const oneselfUpdateApi = '/api/sys/user/oneself/update';                    // 用户修改自己的信息
const addUserApi = '/api/sys/user/save';                    // 新增用户
const deleteUserApi = '/api/sys/user/delete';                    // 删除用户
const resetPasswordApi = '/api/sys/user/resetPassword';        // 重置密码
const updatePasswordApi = '/api/sys/user/updatePassword';        // 修改密码
const reversalUserApi = '/api/sys/user/reversal';        // 启用禁用
const authUserApi = '/api/sys/user/deploy';        // 授权
const authDownloadUserApi = '/api/sys/user/deploy/download';        // 授权文件下载
const userPermissionsApi = '/api/sys/user/permissions';        // 当前用户的按钮权限
const userRoleListApi = '/api/sys/user/roleList';        // 查询单个用户角色

/**
 * 获取公钥
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const getPublicKey = (opt, fnSuccess, fnFail) => {
  baseService('get', getPublicKeyApi, fnSuccess, fnFail, opt);
};

/**
 * 用户登录
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const login = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', loginApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 用户登录
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const logout = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', logoutApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 获取用户列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const userList = (opt, fnSuccess, fnFail) => {
  baseService('get', userListApi, fnSuccess, fnFail, opt);
};

/**
 * 用户修改自己的信息
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const oneselfUpdate = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', oneselfUpdateApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 用户新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const userSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', addUserApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 用户删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const userDelete = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteUserApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 密码重置
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */

export const resetPassword = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', resetPasswordApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 启用禁用
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const reversalUser = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', reversalUserApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 授权权限
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */

export const authUser = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', authUserApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 下载授权文件
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const authDownloadUser = (opt, fnSuccess, fnFail) => {
  baseService('get', authDownloadUserApi, fnSuccess, fnFail, opt);
};

/**
 * 当前用户拥有的按钮权限
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const userPermissions = (opt, fnSuccess, fnFail) => {
  baseService('get', userPermissionsApi, fnSuccess, fnFail, opt);
};
/**
 * 修改密码
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const updatePassword = (opt, fnSuccess, fnFail) => {
  baseService('save', updatePasswordApi, fnSuccess, fnFail, opt);
};
/**
 * 获取当前用户信息
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const oneself = (opt, fnSuccess, fnFail) => {
  baseService('get', oneselfApi, fnSuccess, fnFail, opt);
};

/**
 * 查询单个用户角色
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const userRoleList = (opt, fnSuccess, fnFail) => {
  baseService('get', userRoleListApi, fnSuccess, fnFail, opt);
};
