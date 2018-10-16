// 导入baseService
import { baseService } from '@/service/baseService';

const insulationAlarmListApi = '/api/insulationAlarmCount/list';                    // 查询绝缘报警统计列表
const insulationAlarmDetailApi = '/api/insulationAlarmDetail/list';                 // 查询绝缘报警详情列表
const detailExcelApi = '/api/insulationAlarmDetail/excel';                // 报警详情导出

/**
 * 获取电池供应商列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const insulationAlarmList = (opt, fnSuccess, fnFail) => {
  baseService('get', insulationAlarmListApi, fnSuccess, fnFail, opt);
};

/**
 * 查询绝缘报警详情列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const insulationAlarmDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', insulationAlarmDetailApi, fnSuccess, fnFail, opt);
};

/**
 * 查询绝缘报警详情列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const detailExcel = (opt, fnSuccess, fnFail) => {
  baseService('get', detailExcelApi, fnSuccess, fnFail, opt);
};

