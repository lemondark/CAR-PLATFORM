// 导入baseService
import { baseService } from '@/service/baseService';

// 短信邮件模板
const deleteApi = '/api/informationTemplate/delete';                    // 删除短信邮件模板
const listApi = '/api/informationTemplate/list';                        // 短信邮件模板列表
const saveApi = '/api/informationTemplate/save';                        // 邮件模板列表保存

/**
 * 删除短信邮件模板
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const templateDelete = (opt, fnSuccess, fnFail) => {
  baseService('delete', deleteApi, fnSuccess, fnFail, opt);
};

/**
 * 短信邮件模板列表
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const templateList = (opt, fnSuccess, fnFail) => {
  baseService('get', listApi, fnSuccess, fnFail, opt);
};

/**
 * 邮件模板列表保存
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
export const templateSave = (opt, payload, fnSuccess, fnFail) => {
  baseService('save', saveApi, fnSuccess, fnFail, opt, payload);
};
