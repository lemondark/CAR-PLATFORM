// 导入baseService
import { baseService } from '@/service/baseService';

const iapListApi = '/api/alarmIndirectArg/list';                         // 间接报警参数列表
const iapDeleteApi = '/api/alarmIndirectArg/delete';                    // 删除间接报警参数
const iapSaveApi = '/api/alarmIndirectArg/save';                        // 保存间接报警参数

/**
 * 直接报警参数列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const iapList = (opt, fnSuccess, fnFail) => {
  baseService('get', iapListApi, fnSuccess, fnFail, opt);
};

/**
 * 删除直接报警参数
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const iapDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', iapDeleteApi, fnSuccess, fnFail, opt);
};

/**
 * 保存直接报警参数
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const iapSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', iapSaveApi, fnSuccess, fnFail, opt, payload);
};
