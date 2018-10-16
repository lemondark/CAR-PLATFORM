// 导入baseService
import { baseService, formateUrl } from '@/service/baseService';

const taskListApi = '/api/task/list';                    // 下载任务列表
const cancelApi = '/api/task/cancel/{key}';              // 取消下载
const progressApi = '/api/task/progress/{key}';          // 获取任务进度
const startApi = '/api/task/start/{tid}';                // 开始或继续下载任务
const stopApi = '/api/task/stop/{key}';                  // 暂停下载

/**
 * 获取下载任务列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const taskList = (opt, fnSuccess, fnFail) => {
  baseService('get', taskListApi, fnSuccess, fnFail, opt);
};

/**
 * 取消下载
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return ws
 */
export const cancel = (opt, fnSuccess, fnFail) => {
  return baseService('get', formateUrl(cancelApi, opt), fnSuccess, fnFail);
};

/**
 * 获取任务进度
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return ws
 */
export const progress = (opt, fnSuccess, fnFail) => {
  return baseService('get', formateUrl(progressApi, opt), fnSuccess, fnFail);
};

/**
 * 开始或继续下载任务
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return ws
 */
export const start = (opt, fnSuccess, fnFail) => {
  return baseService('get', formateUrl(startApi, opt), fnSuccess, fnFail);
};

/**
 * 暂停下载
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return ws
 */
export const stop = (opt, fnSuccess, fnFail) => {
  return baseService('get', formateUrl(stopApi, opt), fnSuccess, fnFail, opt);
};
