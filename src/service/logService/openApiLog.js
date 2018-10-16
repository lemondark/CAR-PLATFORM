// 导入baseService
import { baseService } from '@/service/baseService';

const openApi = '/api/supplierOperationLog/list';                    // 查询远程控制第三方供应商操作记录日志列表
const openApiListApi = '/api/openApiLog/list';                    // 查询openApi日志列表

/**
 * 获取操作日志列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const openLog = (opt, fnSuccess, fnFail) => {
  baseService('get', openApi, fnSuccess, fnFail, opt);
};

/**
 * 查询openApi日志列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const openApiList = (opt, fnSuccess, fnFail) => {
  baseService('get', openApiListApi, fnSuccess, fnFail, opt);
};

