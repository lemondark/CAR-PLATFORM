// 导入baseService
import { baseService } from '@/service/baseService';

const vehicleExceptionApi = '/api/vehicleException/list';                    // 获取异常车辆列表

/**
 * 获取异常车辆列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleException = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleExceptionApi, fnSuccess, fnFail, opt);
};

