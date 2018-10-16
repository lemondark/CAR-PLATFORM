// 导入baseService
import { baseService } from '@/service/baseService';

const nationalListApi = '/api/hisCountDataL2/list';                    // 查询国补数据列表
const nationalExportApi = '/api/hisCountDataL2/export';                // 国补数据列表导出

/**
 * 查询国补数据列表
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const nationalList = (opt, fnSuccess, fnFail) => {
  baseService('get', nationalListApi, fnSuccess, fnFail, opt);
};

/**
 * 国补数据列表导出
 *
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const nationalExport = (opt, fnSuccess, fnFail) => {
  baseService('get', nationalExportApi, fnSuccess, fnFail, opt);
};
