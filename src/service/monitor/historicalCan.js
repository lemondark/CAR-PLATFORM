// 导入baseService
import { baseService } from '@/service/baseService';

const canListApi = '/api/can/history/list';                    // 历史CAN数据
const excelCanApi = '/api/can/history/excel';                  // 历史CAN导出

/**
 * 历史CAN数据
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const canList = (opt, fnSuccess, fnFail) => {
  baseService('get', canListApi, fnSuccess, fnFail, opt);
};

/**
 * 历史CAN导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const excelCan = (opt, fnSuccess, fnFail) => {
  baseService('get', excelCanApi, fnSuccess, fnFail, opt);
};
