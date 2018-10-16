// 导入baseService
import { baseService } from '@/service/baseService';

const scheduleLogApi = '/api/scheduleLog/list';                    // 获取定时任务操作日志列表
const moduleApi = '/api/scheduleLog/module/arr';                    // 获取任务执行日志操作模块
const operateApi = '/api/scheduleLog/operate/arr';                    // 获取任务名称
/**
 * 获取定时任务操作日志列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const scheduleLog = (opt, fnSuccess, fnFail) => {
  baseService('get', scheduleLogApi, fnSuccess, fnFail, opt);
};
/**
 * 获取任务执行日志操作模块
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const scheduleModule = (opt, fnSuccess, fnFail) => {
  baseService('get', moduleApi, fnSuccess, fnFail, opt);
};
/**
 * 获取任务执行日志操作模块
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const scheduleOperate = (opt, fnSuccess, fnFail) => {
  baseService('get', operateApi, fnSuccess, fnFail, opt);
};

