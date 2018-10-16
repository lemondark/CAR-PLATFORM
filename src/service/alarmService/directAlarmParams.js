// 导入baseService
import { baseService } from '@/service/baseService';

const dapListApi = '/api/alarmDirectArg/list';                         // 直接报警参数列表
const dapDeleteApi = '/api/alarmDirectArg/delete';                    // 删除直接报警参数
const dapSaveApi = '/api/alarmDirectArg/save';                        // 保存直接报警参数

/**
 * 直接报警参数列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dapList = (opt, fnSuccess, fnFail) => {
  baseService('get', dapListApi, fnSuccess, fnFail, opt);
};

/**
 * 删除直接报警参数
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dapDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', dapDeleteApi, fnSuccess, fnFail, opt);
};

/**
 * 保存直接报警参数
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dapSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', dapSaveApi, fnSuccess, fnFail, opt, payload);
};
