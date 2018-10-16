// 导入baseService
import { baseService } from '@/service/baseService';
// import axios from 'axios';

const regionListApi = '/api/position/status/distribute';        // 获取行政区域列表
const dynamicChartApi = '/api/position/dynamicChart';        // heatMap
const cityListApi = '/api/position/status/city';        // 根据城市获取其对应车辆经纬度列表
const positionListApi = '/api/position/list';        // 获取车辆位置列表
const positionRankApi = '/api/position/rank';        // 总里程统计
const positionStatusApi = '/api/position/status/count';        // 统计车辆状态
const alarmTypeApi = '/api/alarm/stats/alarmType';        // 报警类型统计
const alarmVehicleCountApi = '/api/alarmVehicleCount/rank';        // 报警车辆统计
const vinApi = '/api/alarm/stats/vin';        // 报警次数统计
const rankTodayMileApi = '/api/positionHistory/rankTodayMile';        // 今日里程排名TOP5
const getVersionApi = '/api/version';      // 获取发布版本
const dealerApi = '/api/position/status/dealer';      // 经销商列表
const dealerExportApi = '/api/position/status/dealer/export';      // 导出经销商列表
const districtExportApi = '/api/position/status/district/export';      // 导出行政区域列表
const dealerDetailApi = '/api/position/status/dealer/detail';      // 经销商位置信息
const channelApi = '/api/position/status/channel';      // 平台车辆状态
const channelDetailApi = '/api/position/status/channel/detail';      // 平台车辆状态详情
const channelExportApi = '/api/position/status/channel/export';      // 平台车辆导出
const detailOfGbChannelApi = '/api/position/status/channel/detailOfGbChannel';      // 国家平台总数详情

/**
 * 导出行政区域列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const districtExport = (opt, fnSuccess, fnFail) => {
  baseService('get', districtExportApi, fnSuccess, fnFail, opt);
};
/**
 * 国家平台总数详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const detailOfGbChannel = (opt, fnSuccess, fnFail) => {
  baseService('get', detailOfGbChannelApi, fnSuccess, fnFail, opt);
};
/**
 * 平台车辆导出
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const channelExport = (opt, fnSuccess, fnFail) => {
  baseService('get', channelExportApi, fnSuccess, fnFail, opt);
};
/**
 * 平台车辆状态
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const channel = (opt, fnSuccess, fnFail) => {
  baseService('get', channelApi, fnSuccess, fnFail, opt);
};
/**
 * 平台车辆状态详情
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const channelDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', channelDetailApi, fnSuccess, fnFail, opt);
};

/**
 * 经销商位置信息
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dealerDetail = (opt, fnSuccess, fnFail) => {
  baseService('get', dealerDetailApi, fnSuccess, fnFail, opt);
};
/**
 * 获取行政区域列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const regionList = (opt, fnSuccess, fnFail) => {
  baseService('get', regionListApi, fnSuccess, fnFail, opt);
};
/**
 * 导出经销商列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dealerExport = (opt, fnSuccess, fnFail) => {
  baseService('get', dealerExportApi, fnSuccess, fnFail, opt);
};
/**
 * 根据城市获取其对应车辆经纬度列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const cityList = (opt, fnSuccess, fnFail) => {
  baseService('get', cityListApi, fnSuccess, fnFail, opt);
};
/**
 * 获取车辆位置列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const positionList = (opt, fnSuccess, fnFail) => {
  baseService('get', positionListApi, fnSuccess, fnFail, opt);
};
/**
 * 总里程统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const rankList = (opt, fnSuccess, fnFail) => {
  baseService('get', positionRankApi, fnSuccess, fnFail, opt);
};
/**
 * 车辆状态统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const statusList = (opt, fnSuccess, fnFail) => {
  baseService('get', positionStatusApi, fnSuccess, fnFail, opt);
};
/**
 * 报警类型统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const alarmType = (opt, fnSuccess, fnFail) => {
  baseService('get', alarmTypeApi, fnSuccess, fnFail, opt);
};
/**
 * 报警车辆统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const alarmVehicle = (opt, fnSuccess, fnFail) => {
  baseService('get', alarmVehicleCountApi, fnSuccess, fnFail, opt);
};
/**
 * 报警次数统计
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const alarmTimesRank = (opt, fnSuccess, fnFail) => {
  baseService('get', vinApi, fnSuccess, fnFail, opt);
};
/**
 * 今日里程排名TOP5
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const rankToday = (opt, fnSuccess, fnFail) => {
  baseService('get', rankTodayMileApi, fnSuccess, fnFail, opt);
};

/**
 * 获取发布版本
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const getVersion = (opt, fnSuccess, fnFail) => {
  baseService('get', getVersionApi, fnSuccess, fnFail, opt);
};
/**
 * 经销商列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dealer = (opt, fnSuccess, fnFail) => {
  baseService('get', dealerApi, fnSuccess, fnFail, opt);
};
/**
 * 测试
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const dynamicChart = (opt, fnSuccess, fnFail) => {
  baseService('get', dynamicChartApi, fnSuccess, fnFail, opt);
};
