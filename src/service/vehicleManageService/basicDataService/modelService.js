// 导入baseService
import { baseService } from '@/service/baseService';

const seriesListApi = '/api/vehicleSeries/list';                        // 查询车系
const modelListApi = '/api/vehicleSeries/list/findByVeshicleSeries';    // 查询车型
const seriesSaveApi = '/api/vehicleSeries/save';                        // 保存车系
const seriesDeleteApi = '/api/vehicleSeries/delete';                    // 删除车系
const seriesUpdateApi = '/api/vehicleSeries/updateVehicleSeries';       // 修改车系
const listAllSeriesApi = '/api/vehicleSeries/listAllSeries';            // 查询所有车系
const listUseApi = '/api/vehicleSeries/listUse';                        // 查询可用车系

/**
 * 查询车系列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const seriesList = (opt, fnSuccess, fnFail) => {
  baseService('get', seriesListApi, fnSuccess, fnFail, opt);
};

/**
 * 查询车型列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const modelList = (opt, fnSuccess, fnFail) => {
  baseService('get', modelListApi, fnSuccess, fnFail, opt);
};

/**
 * 查询车型列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const listAllSeries = (opt, fnSuccess, fnFail) => {
  baseService('get', listAllSeriesApi, fnSuccess, fnFail, opt);
};

/**
 * 删除车系
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const seriesDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', seriesDeleteApi, fnSuccess, fnFail, opt);
};

/**
 * 保存车系
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const seriesSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', seriesSaveApi, fnSuccess, fnFail, opt, payload);
};

/**
 * 修改车系
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const seriesUpdate = (opt, fnSuccess, fnFail) => {
  baseService('get', seriesUpdateApi, fnSuccess, fnFail, opt);
};

/**
 * 查询车型列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const listUse = (opt, fnSuccess, fnFail) => {
  baseService('get', listUseApi, fnSuccess, fnFail, opt);
};
