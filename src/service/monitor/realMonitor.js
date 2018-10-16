// 导入baseService
import { baseService } from '@/service/baseService';

const vehicleMonitorApi = '/api/reportVehicleRunning/todayInfo';                    // 实时实时车辆监控

/**
 * 实时车辆监控
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const vehicleMonitor = (opt, fnSuccess, fnFail) => {
  baseService('get', vehicleMonitorApi, fnSuccess, fnFail, opt);
};
