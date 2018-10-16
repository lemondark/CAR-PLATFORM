// 导入baseService
import { baseService } from '@/service/baseService';

const mileageExceptionApi = '/api/vehicleMileageException/list';             // 获取里程异常车辆列表
const modifyVehicleApi = '/api/vehicleMileageException/update';              // 修复&批量修复
const vehicleDetailInfoApi = '/api/vehicleMileageException/vehicleMileageExceptionInfo';  // 详情            // 修复&批量修复

/**
 * 获取里程异常车辆列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const mileageException = (opt, fnSuccess, fnFail) => {
  baseService('get', mileageExceptionApi, fnSuccess, fnFail, opt);
};

/**
 * 修复&批量修复
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const modifyVehicle = (opt, fnSuccess, fnFail) => {
  baseService('save', modifyVehicleApi, fnSuccess, fnFail, opt);
};

/**
 * 详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleDetailInfo = (opt, fnSuccess, fnFail) => {
  baseService('save', vehicleDetailInfoApi, fnSuccess, fnFail, opt);
};