// 导入baseService
import { baseService } from '@/service/baseService';

const upgradeSaveApi = '/api/upgradeRecord/upgrade';           // 终端升级保存接口
const getRecordListApi = '/api/upgradeRecord/list';            // 查询升级记录列表
const getServerListApi = '/api/upgradeParam/list';		       // 查询服务器，升级参数列表
const saveUpgradeParamApi = '/api/upgradeParam/save';          // 编辑/保存升级参数
const deleteListApi = '/api/upgradeParam/delete';              // 删除参数信息

export const upgradeSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', upgradeSaveApi, fnSuccess, fnFail, opt, payload);
};

export const getRecordList = (opt, fnSuccess, fnFail) => {
  baseService('get', getRecordListApi, fnSuccess, fnFail, opt);
};

export const getServerList = (opt, fnSuccess, fnFail) => {
  baseService('get', getServerListApi, fnSuccess, fnFail, opt);
};

export const saveUpgradeParam = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveUpgradeParamApi, fnSuccess, fnFail, opt, payload);
};

export const deleteList = (opt, payload, fnSuccess, fnFail) => {
  baseService('delete', deleteListApi, fnSuccess, fnFail, opt, payload);
};