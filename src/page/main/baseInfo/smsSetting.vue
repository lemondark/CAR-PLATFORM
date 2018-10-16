/**
* 描述：短信设置
**/
<style lang="scss" scoped>
  //导出按钮
  .button{
    margin-left: 10px;
    background-color:#fff !important;
    border: 1px solid #E6EDFD !important;
    color: #4A79EF !important;
  }
  .button:hover{
    background-color:#E6EDFD !important;
    color:#4A79EF !important;
    border: 1px solid #4A79EF !important;
  }
  .unit {
    color: gray;
  }
  .selectContent {
    .selectParam {
      width: 40%;
      float: left;
      .list {
        height: 270px;
        overflow-y: auto;
        overflow-x: hidden;
        border: 1px solid #EEEEEE;
      }
    }
    .smsContent {
      width: 58%;
      float: right;
      .textarea {
        height: 230px;
        border: 1px solid #EEEEEE;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
        p {
          display: block;
          font-size: 13px;
          padding: 5px 10px;
        }
      }
    }
    .smsContent1 {
      width: 100%;
      .textarea {
        min-height: 250px;
        border: 1px solid #EEEEEE;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
        p {
          display: block;
          font-size: 13px;
          padding: 5px 10px;
        }
      }
    }
  }
  .checkboxList {
    width: 100%;
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid #EEEEEE;
  }
  .smsTitle {
    font-size: 14px;
    display: inline-block;
    padding-bottom: 10px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <Select
              placeholder="VIN码"
              style="width: 260px"
              :class="warnTip"
              v-model="searchData.vinCode"
              filterable
              remote
              transfer
              clearable
              :remote-method="vinMethod"
              ref="select"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <i-button type="primary" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    style="font-size:16px"   class="search">查询
          </i-button>
          <!--工具条部分-->
        </Form>
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="80">
          <FormItem label="GRPS号：">{{vehicleData.gprsNo}}</FormItem>
          <FormItem label="SIM卡号：">{{vehicleData.simNumber}}</FormItem>
          <div style="float: right;margin-top: -3px;">
            <i-button type="primary" @click="operShow(3)" shape="circle"
                      style="font-size:16px;" class="button" :loading="buttonLoading" :disabled="!vehicleData.simNumber" v-if="buttonShow('查询回执')">查询回执
            </i-button>
            <FormItem style="margin-left: -15px;" label="类型：">
              <i-select placeholder="类型" v-model="receiptData.type" style="width: 100px;">
                <i-option v-for="item in types" :value="item.value" :key="item.value" :label="item.label"></i-option>
              </i-select>
            </FormItem>
          </div>
          <div style="float: right;border-right: 1px solid #EEEEEE;padding-right: 10px;margin-top: -3px;">
            <i-button type="primary" @click="operShow(1)" shape="circle"
                      style="font-size:16px;" class="button" :disabled="!vehicleData.simNumber" v-if="buttonShow('远程升级')">远程升级
            </i-button>
            <i-button type="primary" @click="operShow(2)" shape="circle"
                      style="font-size:16px;" class="button" :disabled="!vehicleData.simNumber" v-if="buttonShow('远程唤醒')">远程唤醒
            </i-button>
          </div>
          <!--工具条部分-->
        </Form>
      </div>
      <div class="hy-search-bar2 userCenter" style="height: 60px;margin-left: -10px;">
        <Form label-position="right" inline :label-width="80">
          <div style="margin-top: -5px;">
            <i-button type="primary" @click="operShow(4)" shape="circle"
                      style="font-size:16px;" class="button" :disabled="!vehicleData.simNumber" v-if="buttonShow('参数查询')">参数查询
            </i-button>
            <i-button type="primary" @click="operShow(5)" shape="circle"
                      style="font-size:16px;" class="button" :disabled="!vehicleData.simNumber" v-if="buttonShow('参数设置')">参数设置
            </i-button>
          </div>
          <!--工具条部分-->
        </Form>
      </div>
      <!--modalUpgrade-->
      <Modal v-model="modalUpgradeShow" :mask-closable="false" @on-cancel="returnShow(1)">
        <p slot="header" class="hy-modal-title">
          <span>远程升级</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formUpgrade" :model="modalFormData" :rules="ruleValidate1" :label-width="100">
            <FormItem label="升级URL地址" prop="str">
              <i-input placeholder="" v-model.trim="modalFormData.str" style="width: 300px;" :maxlength="50" clearable></i-input>
            </FormItem>
            <span style="margin-left: 100px;">&lt;S082,{{modalFormData.str}}&gt;</span>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save(1, 'formUpgrade')">发送短信</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnShow(1)">取消</Button>
        </div>
      </Modal>
      <!--modalAwaken-->
      <Modal v-model="modalAwakenShow" :mask-closable="false" @on-cancel="returnShow(2)">
        <p slot="header" class="hy-modal-title">
          <span>远程唤醒</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAwaken" :model="modalFormData" :rules="ruleValidate2" :label-width="100">
            <FormItem label="唤醒时长" prop="str">
              <i-input placeholder="" v-model.trim="modalFormData.str" style="width: 300px;" :maxlength="5" clearable></i-input>
              <span class="unit">min</span>
            </FormItem>
          </Form>
          <span style="margin-left: 100px;">&lt;S090,{{modalFormData.str}}&gt;如果{{modalFormData.str}}分钟后没有上电操作，再次进入休眠</span>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save(2, 'formAwaken')">发送短信</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnShow(2)">取消</Button>
        </div>
      </Modal>
      <!--回执内容-->
      <div class="selectContent" v-show="show1" v-if="buttonShow('查询回执')">
        <div class="smsContent1">
          <label class="smsTitle">回执内容</label>
          <div class="textarea">
            <p v-if="msg_3">[</p>
            <p v-for="item in msg_3">&nbsp;&nbsp;&nbsp;&nbsp;{{item}}</p>
            <p v-if="msg_3">]</p>
          </div>
        </div>
      </div>
      <!--参数查询-->
      <div class="selectContent" v-show="show2" v-if="buttonShow('参数查询')">
        <div class="selectParam">
          <label class="smsTitle">选择参数</label>
          <div class="list">
            <CheckboxGroup v-model="paramsArray" @on-change="paramsChange">
              <template v-for="item in paramsList">
                <Checkbox class="checkboxList" :label="item.value">
                  <span style="margin-left: 5px;">{{item.label}}</span>
                </Checkbox>
              </template>
            </CheckboxGroup>
          </div>
        </div>
        <div class="smsContent">
          <label class="smsTitle">短信内容</label>
          <div class="textarea">
            <p>{{msg_4}}</p>
          </div>
          <Button type="success" style="background-color:#4784FF;margin-top: 10px;" :loading="formLoading" :disabled="paramsArray.length == 0 || !vehicleData.simNumber" @click="save(4)">发送短信</Button>
        </div>
      </div>
      <!--参数设置-->
      <div class="selectContent" v-show="show3" v-if="buttonShow('参数设置')">
        <div class="selectParam">
          <label class="smsTitle">填写参数</label>
          <div class="list">
            <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate3" :label-width="200">
              <FormItem label="车载终端本地存储时间周期：" prop="params[1]" style="margin-top: 10px;">
                <i-input placeholder="0～60000" v-model.trim="modalFormData.params[1]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">ms</span>
              </FormItem>
              <FormItem label="正常时，CAN信息上报时间周期：" prop="params[2]">
                <i-input placeholder="1～600" v-model.trim="modalFormData.params[2]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="报警时，CAN信息上报时间周期'：" prop="params[3]">
                <i-input placeholder="0～60000" v-model.trim="modalFormData.params[3]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">ms</span>
              </FormItem>
              <FormItem label="远程服务与管理平台域名：" prop="params[5]">
                <i-input placeholder="" v-model.trim="modalFormData.params[5]" style="width: 170px;" :maxlength="50" @on-change="settingChange" clearable></i-input>

              </FormItem>
              <FormItem label="远程服务与管理平台端口：" prop="params[6]">
                <i-input placeholder="0～65531" v-model.trim="modalFormData.params[6]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="车载终端心跳发送周期：" prop="params[9]">
                <i-input placeholder="1～240" v-model.trim="modalFormData.params[9]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="终端应答超时时间：" prop="params[10]">
                <i-input placeholder="1～600" v-model.trim="modalFormData.params[10]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="平台应答超时时间：" prop="params[11]">
                <i-input placeholder="1～600" v-model.trim="modalFormData.params[11]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="连续三次登入失败后，到下一次登入的间隔时间：" prop="params[12]">
                <i-input placeholder="1～240" v-model.trim="modalFormData.params[12]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">min</span>
              </FormItem>
              <FormItem label="政府平台域名：" prop="params[14]">
                <i-input placeholder="" v-model.trim="modalFormData.params[14]" style="width: 170px;" :maxlength="50" @on-change="settingChange" clearable></i-input>
              </FormItem>
              <FormItem label="政府平台端口：" prop="params[15]">
                <i-input placeholder="0～65532" v-model.trim="modalFormData.params[15]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">ms</span>
              </FormItem>
              <FormItem label="是否处于抽样监测中：" prop="params[16]">
                <i-select placeholder="是否处于抽样监测中" v-model="modalFormData.params[16]" style="width: 170px;" @on-change="settingChange" clearable>
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </i-select>
              </FormItem>
              <FormItem label="VIN码：" prop="params[128]">
                <i-input placeholder="17位数字、字母组合" v-model.trim="modalFormData.params[128]" style="width: 170px;" :maxlength="17" @on-change="settingChange" clearable></i-input>
              </FormItem>
              <FormItem label="短信中心号码：" prop="params[129]">
                <i-input placeholder="13位数字" v-model.trim="modalFormData.params[129]" style="width: 170px;" :maxlength="13" @on-change="settingChange" clearable></i-input>
              </FormItem>
              <FormItem label="延时工作模式下，CAN信息上报时间周期：" prop="params[130]">
                <i-input placeholder="1～6000" v-model.trim="modalFormData.params[130]" style="width: 170px;" :maxlength="4" @on-change="settingChange" clearable></i-input>
                <span class="unit">min</span>
              </FormItem>
              <FormItem label="延时工作模式下，心跳发送周期：" prop="params[131]">
                <i-input placeholder="1～240" v-model.trim="modalFormData.params[131]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="休眠时，定位信息上报时间周期：" prop="params[132]">
                <i-input placeholder="1～18000" v-model.trim="modalFormData.params[132]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="充电时，CAN信息上报时间周期：" prop="params[133]">
                <i-input placeholder="1～600" v-model.trim="modalFormData.params[133]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="延时时间：" prop="params[134]">
                <i-input placeholder="1～7200" v-model.trim="modalFormData.params[134]" style="width: 170px;" :maxlength="4" @on-change="settingChange" clearable></i-input>
                <span class="unit">min</span>
              </FormItem>
              <FormItem label="正常时，定位信息上报时间周期：" prop="params[135]">
                <i-input placeholder="1～600" v-model.trim="modalFormData.params[135]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="报警时，定位信息上报时间周期：" prop="params[136]">
                <i-input placeholder="0～60000" v-model.trim="modalFormData.params[136]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">ms</span>
              </FormItem>
              <FormItem label="延时工作模式下，定位信息上报时间周期：" prop="params[137]">
                <i-input placeholder="1～18000" v-model.trim="modalFormData.params[137]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="充电时，定位信息上报时间周期：" prop="params[138]">
                <i-input placeholder="1～18000" v-model.trim="modalFormData.params[138]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
                <span class="unit">s</span>
              </FormItem>
              <FormItem label="超速报警阀值：" prop="params[139]">
                <i-input placeholder="1～500" v-model.trim="modalFormData.params[139]" style="width: 170px;" :maxlength="3" @on-change="settingChange" clearable></i-input>
                <span class="unit">km/h</span>
              </FormItem>
              <FormItem label="租赁平台域名：" prop="params[140]">
                <i-input placeholder="" v-model.trim="modalFormData.params[140]" style="width: 170px;" :maxlength="50" @on-change="settingChange" clearable></i-input>
              </FormItem>
              <FormItem label="租赁平台端口：" prop="params[141]">
                <i-input placeholder="0～65532" v-model.trim="modalFormData.params[141]" style="width: 170px;" :maxlength="5" @on-change="settingChange" clearable></i-input>
              </FormItem>
              <FormItem label="APN：" prop="params[143]">
                <i-select placeholder="APN" v-model="modalFormData.params[142]" style="width: 170px;" @on-change="settingChange" clearable>
                  <Option value="1">移动CMNET</Option>
                  <Option value="2">联通UNINET</Option>
                </i-select>
              </FormItem>
            </Form>
          </div>
        </div>
        <div class="smsContent">
          <label class="smsTitle">短信内容</label>
          <div class="textarea">
            <p>{{msg_5}}</p>
          </div>
          <Button type="success" style="background-color:#4784FF;margin-top: 10px;" :loading="formLoading" :disabled="msg5 == '' || !vehicleData.simNumber" @click="save(5, 'formAdd')">发送短信</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import button from '@/js/mixins/button';
  import { vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { smsSearch, sendSms } from '@/service/baseInfo/smsSetting';
  import { handles } from '@/js/libs/checkValue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';

  export default {
    components: {
      HyFormItem
    },
    mixins: [button, storeVin],
    data () {
      let checkNumber = (rule, value, callback) => {
        let flag = false;
        if (value === '' || value === undefined) callback();
        if (value && value.indexOf('.') > -1) flag = true; // 排除小数
        value = Number(value);
        if (rule.fullField === 'params[1]' || rule.fullField === 'params[3]' || rule.fullField === 'params[136]') {
          if (!Number.isInteger(value) || value < 0 || value > 60000 || flag) {  // 是否位正整数
            callback(new Error('输入范围为0～60000的整数'));
          }
        } else if (rule.fullField === 'params[2]' || rule.fullField === 'params[10]' || rule.fullField === 'params[11]' ||
          rule.fullField === 'params[133]' || rule.fullField === 'params[135]') {
          if (!Number.isInteger(value) || value < 1 || value > 600 || flag) {  // 是否位正整数
            callback(new Error('输入范围为1～600的整数'));
          }
        }
        if (rule.fullField === 'params[6]') {
          if (!Number.isInteger(value) || value < 0 || value > 65531 || flag) {  // 是否位正整数
            callback(new Error('输入范围为0～65531的整数'));
          }
        }
        if (rule.fullField === 'params[130]') {
          if (!Number.isInteger(value) || value < 1 || value > 6000 || flag) {  // 是否位正整数
            callback(new Error('输入范围为1～6000整数'));
          }
        }
        if (rule.fullField === 'params[15]' || rule.fullField === 'params[141]') {
          if (!Number.isInteger(value) || value < 0 || value > 65532 || flag) {  // 是否位正整数
            callback(new Error('输入范围为0～65532的整数'));
          }
        }
        if (rule.fullField === 'params[9]' || rule.fullField === 'params[12]' || rule.fullField === 'params[131]') {
          if (!Number.isInteger(value) || value < 1 || value > 240 || flag) {  // 是否位正整数
            callback(new Error('输入范围为1～240的整数'));
          }
        }
        if (rule.fullField === 'params[132]' || rule.fullField === 'params[137]' || rule.fullField === 'params[138]') {
          if (!Number.isInteger(value) || value < 1 || value > 18000 || flag) {  // 是否位正整数
            callback(new Error('输入范围为1～18000的整数'));
          }
        }
        if (rule.fullField === 'params[134]') {
          if (!Number.isInteger(value) || value < 1 || value > 7200 || flag) {  // 是否位正整数
            callback(new Error('输入范围为1～7200整数'));
          }
        }
        if (rule.fullField === 'params[139]') {
          if (!Number.isInteger(value) || value < 1 || value > 500 || flag) {  // 是否位正整数
            callback(new Error('输入范围为1～500整数'));
          }
        }
        callback();
      };
      return {
        loading: false,
        buttonLoading: false,
        formLoading: false,
        modalUpgradeShow: false,
        modalAwakenShow: false,
        warnTip: 'warn',
        searchData: {},
        receiptData: {type: 1},
        types: [{label: '平台接收', value: 1}, {label: '平台发送', value: 0}],
        ruleValidate1: {
          str: [
            {required: true, message: '请输入升级URL地址', trigger: 'blur'}
          ]
        },
        ruleValidate2: {
          str: [
            {required: true, validator: handles.call(this, 'number', '唤醒时长'), trigger: 'blur'}
          ]
        },
        ruleValidate3: {
          'params[1]': [{validator: checkNumber, trigger: 'blur'}],
          'params[2]': [{validator: checkNumber, trigger: 'blur'}],
          'params[3]': [{validator: checkNumber, trigger: 'blur'}],
          // 'params[5]': {validator: handles.call(this, 'vin', '', true), trigger: 'blur'},
          'params[6]': [{validator: checkNumber, trigger: 'blur'}],
          'params[9]': [{validator: checkNumber, trigger: 'blur'}],
          'params[10]': [{validator: checkNumber, trigger: 'blur'}],
          'params[11]': [{validator: checkNumber, trigger: 'blur'}],
          'params[12]': [{validator: checkNumber, trigger: 'blur'}],
          // 'params[14]': {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
          'params[15]': [{validator: checkNumber, trigger: 'blur'}],
          // 'params[16]': [{required: true, message: '请选择是否处于抽样监测中', trigger: 'change'}],
          'params[128]': {validator: handles.call(this, 'vin', 'VIN码', true), trigger: 'blur'},
          'params[129]': {validator: handles.call(this, 'number13', '短信中心号码', true), trigger: 'blur'},
          'params[130]': [{validator: checkNumber, trigger: 'blur'}],
          'params[131]': [{validator: checkNumber, trigger: 'blur'}],
          'params[132]': [{validator: checkNumber, trigger: 'blur'}],
          'params[133]': [{validator: checkNumber, trigger: 'blur'}],
          'params[134]': [{validator: checkNumber, trigger: 'blur'}],
          'params[135]': [{validator: checkNumber, trigger: 'blur'}],
          'params[136]': [{validator: checkNumber, trigger: 'blur'}],
          'params[137]': [{validator: checkNumber, trigger: 'blur'}],
          'params[138]': [{validator: checkNumber, trigger: 'blur'}],
          'params[139]': [{validator: checkNumber, trigger: 'blur'}],
          'params[140]': [{validator: checkNumber, trigger: 'blur'}],
          // 'params[141]': {validator: handles.call(this, 'vin', '', true), trigger: 'blur'},
          'params[141]': [{validator: checkNumber, trigger: 'blur'}]
         // 'params[143]': [{required: true, message: '请选择APN', trigger: 'change'}]
        },
        modalFormData: {
          params: {}
        },
        modalFormItem: [],
        vehicleData: {},
        show1: false,
        show2: true,
        show3: false,
        paramsArray: [],
        paramsList: [
          {label: '车载终端本地存储时间周期', value: 1},
          {label: '正常时，CAN信息上报时间周期', value: 2},
          {label: '报警时，CAN信息上报时间周期', value: 3},
          {label: '远程服务与管理平台域名', value: 5},
          {label: '远程服务与管理平台端口', value: 6},
          {label: '车载终端心跳发送周期', value: 9},
          {label: '终端应答超时时间', value: 10},
          {label: '平台应答超时时间', value: 11},
          {label: '连续三次登入失败后，到下一次登入的间隔时间', value: 12},
          {label: '政府平台域名', value: 14},
          {label: '政府平台端口', value: 15},
          {label: '是否处于抽样监测中', value: 16},
          {label: 'VIN码', value: 128},
          {label: '短信中心号码', value: 129},
          {label: '延时工作模式下，CAN信息上报时间周期', value: 130},
          {label: '延时工作模式下，心跳发送周期', value: 131},
          {label: '休眠时，定位信息上报时间周期', value: 132},
          {label: '充电时，CAN信息上报时间周期', value: 133},
          {label: '延时时间', value: 134},
          {label: '正常时，定位信息上报时间周期', value: 135},
          {label: '报警时，定位信息上报时间周期', value: 136},
          {label: '延时工作模式下，定位信息上报时间周期', value: 137},
          {label: '充电时，定位信息上报时间周期', value: 138},
          {label: '超速报警阀值', value: 139},
          {label: '租赁平台域名', value: 140},
          {label: '租赁平台端口', value: 142},
          {label: 'APN', value: 143}
        ],
        modalTitle: '参数查询',
        msg_1: '<S082,',    // 远程升级
        msg_2: '<S090,',    // 远程唤醒
        msg_3: '',         // 查询回执
        msg_4: '<S080,',    // 参数查询
        msg_5: '<S081,',     // 参数设置
        msg5: ''
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 查询
      search () {
        this.loading = true;
        if (!this.searchData.vinCode) {
          this.loading = false;
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        vehicleListAll(this.searchData, res => {
          this.loading = false;
          if (res.length > 0) {
            this.vehicleData = res[0];
            // console.log(JSON.stringify(this.vehicleData));
            this.init();
          } else {
            this.$Notice.warning({
              title: '车辆不存在'
            });
          }
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车辆信息失败',
            desc: ret
          });
        });
        this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      init () {
        this.receiptData = {type: 1};
        this.modalFormData = {params: {}};
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.paramsArray = [];
        this.modalTitle = '参数查询';
        this.msg_1 = '<S082,';    // 远程升级
        this.msg_2 = '<S090,';    // 远程唤醒
        this.msg_3 = '';         // 查询回执
        this.msg_4 = '<S080,';    // 参数查询
        this.msg_5 = '<S081,';     // 参数设置
        this.msg5 = '';
        this.$refs['formAdd'].resetFields();
      },
      // 远程升级 远程唤醒
      operShow (flag) {
        this.modalFormData = {
          params: {}
        };
        this.paramsArray = [];
        if (flag === 1) {  // 远程升级
          this.modalUpgradeShow = true;
          this.modalTitle = '远程升级';
        } else if (flag === 2) {  // 远程唤醒
          this.modalAwakenShow = true;
          this.modalTitle = '远程唤醒';
        } else if (flag === 3) {  // 查询回执
          this.buttonLoading = true;
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.getSms();
          this.modalTitle = '查询回执';
        } else if (flag === 4) {  // 参数查询
          this.msg_4 = '<S080,';
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          this.modalTitle = '参数查询';
        } else if (flag === 5) {  // 参数设置
          this.msg_5 = '<S081,';
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.modalTitle = '参数设置';
        }
      },
      // 查询回执
      getSms () {
        this.msg_3 = '';
        let params = {
          vinCode: this.vehicleData.vinCode.trim(),
          phone: this.vehicleData.simNumber.trim(),
          searchFlag: this.receiptData.type
        };
        smsSearch(params, res => {
          this.buttonLoading = false;
          // console.log(JSON.stringify(res));
          if (res) {
            this.msg_3 = res;
          } else {
            this.$Notice.warning({
              title: '查询回执无数据'
            });
          }
        }, ret => {
          this.buttonLoading = false;
          this.$Notice.error({
            title: '查询回执失败',
            desc: ret
          });
        });
      },
      // 参数查询
      paramsChange () {
        this.msg_4 = '<S080,';
        if (this.paramsArray.length > 0) {
          this.msg_4 = this.msg_4 + '[' + this.paramsArray.join(',') + ']' + '>';
        }
      },
      // 参数设置
      settingChange () {
        this.msg_5 = '<S081,';
        this.msg5 = '';
        // console.log(JSON.stringify(this.modalFormData.params));
        for (let key in this.modalFormData.params) {
          if (this.modalFormData.params[key]) {
            if (this.msg5 === '') {
              this.msg5 = key + ':' + this.modalFormData.params[key];
            } else {
              this.msg5 = this.msg5 + ',' + key + ':' + this.modalFormData.params[key];
            }
          }
        }
        if (this.msg5 !== '') {
          this.msg_5 = this.msg_5 + '[' + this.msg5 + ']' + '>';
        }
      },
      // 发送短信
      save (flag, form) {
        this.formLoading = true;
        if (flag === 1 || flag === 2) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              let msg = '';
              if (flag === 1 || flag === 2) {
                msg = this[`msg_${flag}`] + this.modalFormData.str + '>';
              }
              let params = {
                vinCode: this.vehicleData.vinCode.trim(),
                phone: this.vehicleData.simNumber.trim(),
                msg: msg
              };
              // console.log(JSON.stringify(params));
              this.saveSms(params, flag);
            } else {
              this.formLoading = false;
            }
          });
        } else if (flag === 4) {
          let params = {
            vinCode: this.vehicleData.vinCode.trim(),
            phone: this.vehicleData.simNumber.trim(),
            msg: this[`msg_${flag}`]
          };
          this.saveSms(params, flag);
        } else if (flag === 5) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              let params = {
                vinCode: this.vehicleData.vinCode.trim(),
                phone: this.vehicleData.simNumber.trim(),
                msg: this[`msg_${flag}`]
              };
              this.saveSms(params, flag);
            } else {
              this.formLoading = false;
            }
          });
        }
      },
      saveSms (params, flag) {
        if (flag === 1) {
          this.modalTitle = '远程升级';
          params.type = 2;
        } else if (flag === 2) {
          this.modalTitle = '远程唤醒';
          params.type = 1;
        } else if (flag === 3) this.modalTitle = '查询回执';
        else if (flag === 4) {
          this.modalTitle = '参数查询';
          params.type = 4;
        } else if (flag === 5) {
          this.modalTitle = '参数设置';
          params.type = 3;
        }
        sendSms({}, params, res => {
          // console.log(JSON.stringify(res));
          this.$Notice.success({
            desc: `${this.modalTitle}短信发送成功`
          });
          if (flag === 1) {  // 远程升级
            this.modalUpgradeShow = false;
          } else if (flag === 2) {  // 远程唤醒
            this.modalAwakenShow = false;
          }
          this.formLoading = false;
        }, ret => {
          this.formLoading = false;
          this.$Notice.error({
            title: `${this.modalTitle}短信发送失败`,
            desc: ret
          });
        });
      },
      // 取消新增或修改
      returnShow (flag) {
        if (flag === 1) {
          this.modalUpgradeShow = false;
          this.$refs['formUpgrade'].resetFields();
        } else {
          this.modalAwakenShow = false;
          this.$refs['formAwaken'].resetFields();
        }
      }
    }
  };
</script>
