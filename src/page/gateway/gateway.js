// 导入baseService
import { baseService } from '@/service/baseService';

const addVirtualVehicleApi = '/api/gatewayChange/addVirtualVehicle';      // 新增虚拟车辆
const deleteVirtualVehicleApi = '/api/gatewayChange/deleteVirtualVehicle';      // 删除虚拟车辆
const getListApi = '/api/gatewayChange/list';      // 查询切换网关记录
const queryDataReportResultApi = '/api/gatewayChange/queryDataReportResult';      // 查询数据上报
const queryGatewayChangeSmsResultApi = '/api/gatewayChange/queryGatewayChangeSmsResult';      // 查询切换网关结果
const sendGatewayChangeSmsApi = '/api/gatewayChange/sendGatewayChangeSms';      // 发送切换网关短信

/* 新增虚拟车辆 */
export const addVirtualVehicle = (opt, fnSuccess, fnFail) => {
  baseService('save', addVirtualVehicleApi, fnSuccess, fnFail, opt);
};

/* 删除虚拟车辆 */
export const deleteVirtualVehicle = (opt, fnSuccess, fnFail) => {
  baseService('save', deleteVirtualVehicleApi, fnSuccess, fnFail, opt);
};

/* 查询切换网关记录 */
export const getList = (opt, fnSuccess, fnFail) => {
  baseService('get', getListApi, fnSuccess, fnFail, opt);
};

/* 查询数据上报 */
export const queryDataReportResult = (opt, fnSuccess, fnFail) => {
  baseService('save', queryDataReportResultApi, fnSuccess, fnFail, opt);
};

/* 查询切换网关结果 */
export const queryGatewayChangeSmsResult = (opt, fnSuccess, fnFail) => {
  baseService('save', queryGatewayChangeSmsResultApi, fnSuccess, fnFail, opt);
};

/* 发送切换网关短信 */
export const sendGatewayChangeSms = (opt, fnSuccess, fnFail) => {
  baseService('save', sendGatewayChangeSmsApi, fnSuccess, fnFail, opt);
};