// 导入baseService
import { baseService } from '@/service/baseService';

const colorListApi = '/api/vehicleColor/list';                    // 查询车身颜色表列表
const colorListUseApi = '/api/vehicleColor/listUse';                    // 查询车身颜色表列表
const colorSaveApi = '/api/vehicleColor/save';                    // 保存车身颜色表
const colorDeleteApi = '/api/vehicleColor/delete';                // 删除车身颜色表

/**
 * 查询车身颜色表列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const colorList = (opt, fnSuccess, fnFail) => {
  baseService('get', colorListApi, fnSuccess, fnFail, opt);
};

/**
 * 查询车身颜色表列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const colorListUse = (opt, fnSuccess, fnFail) => {
  baseService('get', colorListUseApi, fnSuccess, fnFail, opt);
};

/**
 * 删除车身颜色表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const colorDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', colorDeleteApi, fnSuccess, fnFail, opt);
};

/**
 * 保存车身颜色表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const colorSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', colorSaveApi, fnSuccess, fnFail, opt, payload);
};

