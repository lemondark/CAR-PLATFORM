// 导入baseService
import { baseService } from '@/service/baseService';

const vehicleSerialApi = '/api/operationLog/countByVehicleSerial';    // 根据车系查询（默认）
const vehicleTypeApi = '/api/operationLog/countByVehicleType';        // 根据车系车型查询
const vehicleVinApi = '/api/operationLog/countByVehicle';             // 根据VIN查询
const queryOperationsApi = '/api/operationLog/queryOperations';       // 远程控制项
const exportByVehicleSerialApi = '/api/operationLog/exportByVehicleSerial';   // 导出 （根据车系）
const exportByVehicleTypeApi = '/api/operationLog/exportByVehicleType';       // 导出 （根据车型）
const exportByVehicleApi = '/api/operationLog/exportByVehicle';               // 导出 （根据车）

/**
 * 根据车系查询（默认）
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleSerial = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleSerialApi, fnSuccess, fnFail, opt);
};

/**
 * 根据车系车型查询
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleType = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleTypeApi, fnSuccess, fnFail, opt);
};

/**
 * 根据VIN查询
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleVin = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleVinApi, fnSuccess, fnFail, opt);
};

/**
 * 远程控制项
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const queryOperations = (opt, fnSuccess, fnFail) => {
  baseService('get', queryOperationsApi, fnSuccess, fnFail, opt);
};

/**
 * 导出 （根据车系）
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const exportByVehicleSerial = (opt, fnSuccess, fnFail) => {
  baseService('get', exportByVehicleSerialApi, fnSuccess, fnFail, opt);
};

/**
 * 导出 （根据车型）
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const exportByVehicleType = (opt, fnSuccess, fnFail) => {
  baseService('get', exportByVehicleTypeApi, fnSuccess, fnFail, opt);
};

/**
 * 导出 （根据车）
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const exportByVehicle = (opt, fnSuccess, fnFail) => {
  baseService('get', exportByVehicleApi, fnSuccess, fnFail, opt);
};
