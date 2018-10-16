// 导入baseService
import { baseService } from '@/service/baseService';

const airConditionerCoolApi = '/api/dc/airConditionerCool';                    // 远程控制空调制冷
const airConditionerHotApi = '/api/dc/airConditionerHot';                      // 远程控制空调制热
const backDoorApi = '/api/dc/backDoor';                                        // 远程控制后备箱
const doorApi = '/api/dc/door';                                                // 远程控制车门
const engineControlApi = '/api/dc/engineControl';                              // 动力通断
const findCarApi = '/api/dc/findCar';                                          // 远程控制寻车
const requestVechileInfoApi = '/api/dc/requestVechileInfo';                    // 状态查询
const queryTerminalParamApi = '/api/dc/queryTerminalParam';                    // 设置参数查询
const batchSettingTerminalParamApi = '/api/dc/batchSettingTerminalParam';      // 批量终端参数设置
const batchTerminalControlApi = '/api/dc/batchTerminalControl';                // 批量终端控制
const vehicleStatusApi = '/api/position/status/vehicle';                // 通过vinCode查询车辆状态

/**
 * 远程控制空调制冷
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const airConditionerCool = (opt, fnSuccess, fnFail) => {
  baseService('save', airConditionerCoolApi, fnSuccess, fnFail, opt);
};

/**
 * 远程控制空调制热
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const airConditionerHot = (opt, fnSuccess, fnFail) => {
  baseService('save', airConditionerHotApi, fnSuccess, fnFail, opt);
};

/**
 * 远程控制后备箱
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const backDoor = (opt, fnSuccess, fnFail) => {
  baseService('save', backDoorApi, fnSuccess, fnFail, opt);
};

/**
 * 远程控制车门
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const door = (opt, fnSuccess, fnFail) => {
  baseService('save', doorApi, fnSuccess, fnFail, opt);
};

/**
 * 动力通断
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const engineControl = (opt, fnSuccess, fnFail) => {
  baseService('save', engineControlApi, fnSuccess, fnFail, opt);
};

/**
 * 远程控制寻车
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const findCar = (opt, fnSuccess, fnFail) => {
  baseService('save', findCarApi, fnSuccess, fnFail, opt);
};

/**
 * 状态查询
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const requestVechileInfo = (opt, fnSuccess, fnFail) => {
  baseService('save', requestVechileInfoApi, fnSuccess, fnFail, opt);
};

/**
 * 设置参数查询
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const queryTerminalParam = (opt, fnSuccess, fnFail) => {
  baseService('save', queryTerminalParamApi, fnSuccess, fnFail, opt);
};

/**
 * 批量终端参数设置
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batchSettingTerminalParam = (opt, fnSuccess, fnFail) => {
  baseService('save', batchSettingTerminalParamApi, fnSuccess, fnFail, opt);
};

/**
 * 批量终端控制
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const batchTerminalControl = (opt, fnSuccess, fnFail) => {
  baseService('save', batchTerminalControlApi, fnSuccess, fnFail, opt);
};

/**
 * 通过vinCode查询车辆状态
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleStatus = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleStatusApi, fnSuccess, fnFail, opt);
};
