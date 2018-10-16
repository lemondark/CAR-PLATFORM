// 导入baseService
import { baseService } from '@/service/baseService';

const listApi = '/api/vehicleChannel/list';                        // 查询车辆多链路配置列表
const saveApi = '/api/vehicleChannel/save';                        // 保存车辆多链路配置
const resetApi = '/api/vehicleChannel/reset';                      // 开启或者禁用链路
const deleteApi = '/api/vehicleChannel/delete';                    // 删除车辆多链路配置
const deleteVehOfChannelApi = '/api/vehicleChannel/deleteVehOfChannel';   // 批量删除链路的车辆

/**
 * 查询车辆多链路配置列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const channelList = (opt, fnSuccess, fnFail) => {
  baseService('get', listApi, fnSuccess, fnFail, opt);
};

/**
 * 保存车辆多链路配置
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const channelSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 开启或者禁用链路
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const resetChannel = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', resetApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 删除车辆多链路配置
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const channelDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', deleteApi, fnSuccess, fnFail, opt);
};

/**
 * 批量删除链路的车辆
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const deleteVehOfChannel = (opt, fnSuccess, fnFail) => {
  baseService('delete', deleteVehOfChannelApi, fnSuccess, fnFail, opt);
};
