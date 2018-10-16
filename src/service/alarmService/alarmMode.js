// 导入baseService
import { baseService } from '@/service/baseService';

// 报警设置中心
const alarmModeListApi = '/api/alarmWarnArg/list';                    // 获取报警设置列表
const saveAlarmModeApi = '/api/alarmWarnArg/save';                    // 新增报警设置
const deleteAlarmModeApi = '/api/alarmWarnArg/delete';                    // 保存报警设置

/**
 * 获取报警设置列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const alarmModeList = (opt, fnSuccess, fnFail) => {
  baseService('get', alarmModeListApi, fnSuccess, fnFail, opt);
};

/**
 * 报警设置新增
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const saveAlarmMode = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveAlarmModeApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 报警设置删除
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteAlarmMode = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteAlarmModeApi, fnSuccess, fnFail, opt, payload);
};
