// 导入baseService
import { baseService } from '@/service/baseService';

const operationLogListApi = '/api/operationLog/list';                               // 查询远程控制操作日志
const batchSettingParamLogApi = '/api/tboxControl/log/batchSettingParam/list';      // 批量终端参数设置操作日志
const batchRemoteControlLogApi = '/api/tboxControl/log/batchRemoteControl/list';    // 批量终端远程控制操作日志

/**
 * 查询远程控制操作日志
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const operationLogList = (opt, fnSuccess, fnFail) => {
  baseService('get', operationLogListApi, fnSuccess, fnFail, opt);
};

/**
 * 批量终端参数设置操作日志
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batchSettingParamLog = (opt, fnSuccess, fnFail) => {
  baseService('get', batchSettingParamLogApi, fnSuccess, fnFail, opt);
};

/**
 * 批量终端远程控制操作日志
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batchRemoteControlLog = (opt, fnSuccess, fnFail) => {
  baseService('get', batchRemoteControlLogApi, fnSuccess, fnFail, opt);
};
