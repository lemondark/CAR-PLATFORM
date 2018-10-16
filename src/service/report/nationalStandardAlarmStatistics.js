// 导入baseService
import { baseService } from '@/service/baseService';

const gbAlramApi = '/api/reportGbAlarm/list';                    // 查询国标报警统计列表
const gbAlramExportApi = '/api/reportGbAlarm/export';            // 国标报警统计导出

/**
 * 查询国标报警统计列表
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const gbAlram = (opt, fnSuccess, fnFail) => {
  baseService('get', gbAlramApi, fnSuccess, fnFail, opt);
};

/**
 * 查询国标报警统计列表
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const gbAlramExport = (opt, fnSuccess, fnFail) => {
  baseService('get', gbAlramExportApi, fnSuccess, fnFail, opt);
};
