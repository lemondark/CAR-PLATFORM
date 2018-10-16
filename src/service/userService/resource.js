// 导入baseService
import { baseService } from '@/service/baseService';

// 资源管理
const resourceListApi = '/api/sys/resource/list';                    // 获取资源列表
const resourceTreeApi = '/api/sys/resource/tree';                    // 获取资源树形结构
const saveResourceApi = '/api/sys/resource/save';                    // 新增资源
const deleteResourceApi = '/api/sys/resource/delete';                    // 新增资源
const swopResourceApi = '/api/sys/resource/swop';                    // 移动资源
const resourceByUserIdApi = '/api/sys/resource/myself';                    // 用户资源
const resourceUploadApi = '/api/sys/resource/upload';        // 文件上传
const resourceDownloadApi = '/api/sys/resource/download';        // 文件下载

/**
 * 获取资源列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const resourceList = (opt, fnSuccess, fnFail) => {
  baseService('get', resourceListApi, fnSuccess, fnFail, opt);
};

/**
 * 获取资源树形结构
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const resourceTree = (opt, fnSuccess, fnFail) => {
  baseService('get', resourceTreeApi, fnSuccess, fnFail, opt);
};

/**
 * 资源新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const saveResource = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveResourceApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 资源删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteResource = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteResourceApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 移动资源
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const swopResource = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', swopResourceApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 用户资源列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const userResource = (opt, fnSuccess, fnFail) => {
  baseService('get', resourceByUserIdApi, fnSuccess, fnFail, opt);
};
/**
 * 上传文件
 * @param opt
 * @param payload
 * @param fnSuccess
 * @param fnFail
 */
export const resourceUpload = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', resourceUploadApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 下载文件
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const resourceDownload = (opt, fnSuccess, fnFail) => {
  baseService('get', resourceDownloadApi, fnSuccess, fnFail, opt);
};
