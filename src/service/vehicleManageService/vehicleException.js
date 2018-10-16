// 导入baseService
import { baseService } from '@/service/baseService';

const vehicleExceptionApi = '/api/vehicleException/list';                    // 获取异常车辆列表
const vehicleCallApi = '/api/vehicleException/save';                         // 异常车辆唤醒
const refreshApi = '/api/vehicleException/refreshVehicleException';			// 数据刷新接口
/**
 * 获取异常车辆列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleException = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleExceptionApi, fnSuccess, fnFail, opt);
};

/**
 * 异常车辆唤醒
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleCall = (opt, fnSuccess, fnFail) => {
  baseService('save', vehicleCallApi, fnSuccess, fnFail, opt);
};

export const refreshVehicleException = (opt, fnSuccess, fnFail) => {
  baseService('get', refreshApi, fnSuccess, fnFail, opt);
};
