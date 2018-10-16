// 导入baseService
import { baseService } from '@/service/baseService';

const ResultDetailApi = '/api/vehicleTransferResultDetail/list';                // 查询车辆迁移结果记录
const ResultApi = '/api/vehicleTransferResult/list';      // 查询车辆迁移结果记录
const ByConditionApi = '/api/vehicleTransferResult/transferByCondition';    // 根据条件迁移
const ByExcelApi = '/api/vehicleTransferResult/transferByExcel';    // 根据导入excel迁移
const ByIdsApi = '/api/vehicleTransferResult/transferByIds';    // 根据id数组迁移

/**
 * 查询车辆迁移结果记录
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const ResultDetail = (opt, fnSuccess, fnFail) => {
    baseService('get', ResultDetailApi, fnSuccess, fnFail, opt);
  };
/**
 * 查询车辆迁移结果记录
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const Result = (opt, fnSuccess, fnFail) => {
    baseService('get', ResultApi, fnSuccess, fnFail, opt);
  };
/**
 * 根据条件迁移
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const ByCondition = (opt, fnSuccess, fnFail) => {
    baseService('save', ByConditionApi, fnSuccess, fnFail, opt);
  };
/**
 * 根据导入excel迁移
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const ByExcel = (opt, fnSuccess, fnFail) => {
    baseService('save', ByExcelApi, fnSuccess, fnFail, opt);
  };
/**
 * 根据id数组迁移
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const ByIds = (opt, fnSuccess, fnFail) => {
    baseService('save', ByIdsApi, fnSuccess, fnFail, opt);
  };