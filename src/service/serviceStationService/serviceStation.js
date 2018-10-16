// 导入baseService
import { baseService } from '@/service/baseService';
import axios from 'axios';

const serviceStationListApi = '/api/serviceStation/list';        // 获取服务站列表
const amapGeocodeApi = 'http://restapi.amap.com/v3/geocode/geo';        // 获取服务站列表
const amapGregeoOneApi = 'http://restapi.amap.com/v3/geocode/regeo';        // 获取服务站列表

/**
 * 获取服务站列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const serviceStationList = (opt, fnSuccess, fnFail) => {
  baseService('get', serviceStationListApi, fnSuccess, fnFail, opt);
};

export const amapGeocode = (opt, fnSuccess, fnFail) => {
  let array = [];
  opt.forEach(val => {
    let codeData = {
      key: '0e7672ae9b3d631611e4d2000802d7f0',
      batch: true,
      address: val
    };
    array.push(axios.get(amapGeocodeApi, {params: codeData}));
  });
  let p = Promise.all(array);
  p.then(function (val) {
    fnSuccess && fnSuccess(val);
  }, function (fail) {
    fnFail && fnFail(fail);
  });
};

// 最多支持传入 20 对坐标点
export const amapGregeoOne = (opt, fnSuccess, fnFail) => {
  let array = [];
  opt.forEach(val => {
    let codeData = {
      key: '0e7672ae9b3d631611e4d2000802d7f0',
      batch: true,
      location: val
    };
    array.push(axios.get(amapGregeoOneApi, {params: codeData}));
  });
  let p = Promise.all(array);
  p.then(function (val) {
    fnSuccess && fnSuccess(val);
  }, function (fail) {
    fnFail && fnFail(fail);
  });
};

