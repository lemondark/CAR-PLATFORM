// 导入baseService
import { baseService } from '@/service/baseService';

const keyPartMonitorApi = '/api/vehicleKeypartMonitor/list';                    // 关重件监控

/**
 * 关重件监控
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const keyPartMonitor = (opt, fnSuccess, fnFail) => {
  baseService('get', keyPartMonitorApi, fnSuccess, fnFail, opt);
};
