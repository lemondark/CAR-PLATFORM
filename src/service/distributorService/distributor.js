// 导入baseService
import { baseService } from '@/service/baseService';

const distributorListApi = '/api/vehicleDistributorInformation/list';        // 获取车辆经销商列表

/**
 * 获取车辆经销商列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const distributorList = (opt, fnSuccess, fnFail) => {
  baseService('get', distributorListApi, fnSuccess, fnFail, opt);
};

