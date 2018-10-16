// 导入baseService
import { baseService } from '@/service/baseService';

const baseListApi = '/api/vehicleProductionBase/list';                    // 查询车辆生产基地列表
const baseListUseApi = '/api/vehicleProductionBase/listUse';              // 查询可用车辆生产基地列表
const baseSaveApi = '/api/vehicleProductionBase/save';                    // 保存车辆生产基地
const baseDeleteApi = '/api/vehicleProductionBase/delete';                // 删除车辆生产基地

/**
 * 查询车辆生产基地列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const baseList = (opt, fnSuccess, fnFail) => {
  baseService('get', baseListApi, fnSuccess, fnFail, opt);
};

/**
 * 查询车辆生产基地列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const baseListUse = (opt, fnSuccess, fnFail) => {
  baseService('get', baseListUseApi, fnSuccess, fnFail, opt);
};

/**
 * 删除车辆生产基地
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const baseDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', baseDeleteApi, fnSuccess, fnFail, opt);
};

/**
 * 保存车辆生产基地
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const baseSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', baseSaveApi, fnSuccess, fnFail, opt, payload);
};
