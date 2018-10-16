// 导入baseService
import { baseService } from '@/service/baseService';

const capListApi = '/api/alarmGroupArg/list';                         // 组合报警参数列表
const capDeleteApi = '/api/alarmGroupArg/delete';                    // 删除组合报警参数
const capSaveApi = '/api/alarmGroupArg/save';                        // 保存组合报警参数

/**
 * 组合报警参数列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const capList = (opt, fnSuccess, fnFail) => {
  baseService('get', capListApi, fnSuccess, fnFail, opt);
};

/**
 * 删除组合报警参数
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const capDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', capDeleteApi, fnSuccess, fnFail, opt);
};

/**
 * 保存组合报警参数
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const capSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', capSaveApi, fnSuccess, fnFail, opt, payload);
};
