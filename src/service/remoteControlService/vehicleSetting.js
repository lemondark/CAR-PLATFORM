// 导入baseService
import { baseService } from '@/service/baseService';

const teleListApi = '/api/teleControlSetting/list';                    // 查询车辆远程控制设置列表
const itemListApi = '/api/teleControlSetting/items';                   // 查询车辆远程控制项表列表
const teleSaveApi = '/api/teleControlSetting/save';                    // 保存车辆远程控制设置
const teleDeleteApi = '/api/teleControlSetting/delete';                // 删除车辆远程控制设置
const getItemsApi = '/api/teleControlSetting/vin/items';               // vin匹配车辆远程控制设置

/**
 * 查询车辆远程控制设置列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const teleList = (opt, fnSuccess, fnFail) => {
  baseService('get', teleListApi, fnSuccess, fnFail, opt);
};

/**
 * 查询车辆远程控制项表列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const itemList = (fnSuccess, fnFail) => {
  baseService('get', itemListApi, fnSuccess, fnFail);
};

/**
 * 删除车辆生产基地
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const teleDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', teleDeleteApi, fnSuccess, fnFail, opt);
};

/**
 * 保存车辆远程控制设置
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const teleSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', teleSaveApi, fnSuccess, fnFail, opt, payload);
};

/**
 * vin匹配车辆远程控制设置
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const getItems = (opt, fnSuccess, fnFail) => {
  baseService('get', getItemsApi, fnSuccess, fnFail, opt);
};
