// 导入baseService
import { baseService } from '@/service/baseService';

const logApi = '/api/sys/log/list';                    // 获取操作日志列表
/**
 * 获取操作日志列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const operatingLog = (opt, fnSuccess, fnFail) => {
  baseService('get', logApi, fnSuccess, fnFail, opt);
};

