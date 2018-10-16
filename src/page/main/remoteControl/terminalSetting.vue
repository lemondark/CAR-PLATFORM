/**
* 描述：终端参数设置
**/
<style lang="scss" scoped>
  .hy_top {
    margin-top: 20px;
    height: auto;
    margin-left: 50px;
    margin-bottom: 100px;
  }
  .hy_form {
    width: 100%;
    height: 100%;
    .hy_inputs {
      width: 150px;
    }
    span.hy_span {
      color: #c7cad1;
      text-align: center !important;
      width: 10%;
    }
  }
  .hy_table{
    width: 100%;
    height: 100%;
    margin-bottom:250px;
    margin-top: 20px;
    text-align: center;
    font-size: 13px;
    border-top: 1px solid #f1f1f1;
    line-height:40px;
    .hy_title {
      border-bottom: 1px solid #f1f1f1;
      border-left: 1px solid #f1f1f1;
      float: left;
      width: 50%;
      span{
        width:80%;
        display: block;
        float: left;
        text-align: right;
        i{
          font-style:normal
        }
      }
      .hy_input {
        width: 35%;
        margin-left: 5px;
      }
    }
    .hy_right {
      border-left: 1px solid #f1f1f1;
      border-bottom: 1px solid #f1f1f1;
      border-right: 1px solid #f1f1f1;
    }
    span.hy_span {
      color: #c7cad1;
      text-align: center !important;
      width: 10%;
    }
  }
  .warn-color {
    border:1px solid red;
  }
  .hy_h2 {
    font-size: 18px;
    margin-left: 30px;
  }
  .tips {
    position: absolute;
    display: inline-block;
    color: #ed3f14;
    margin-top: -3px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy_top">
        <Form label-position="right" inline :label-width="110">
          <FormItem>
            <RadioGroup v-model="buttonName" type="button" @on-change="buttonChange">
              <Radio label="三期"></Radio>
              <Radio label="二期"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="VIN码">
            <Select
              placeholder="VIN码"
              style="width: 600px;"
              :class="warnTip"
              v-model.trim="addData.vinCodes"
              filterable
              remote
              transfer
              clearable
              :remote-method="vinMethod"
              ref="select"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="option.value" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          </FormItem>
        </Form>
        <h2 class="hy_h2">设置参数</h2>
        <Form v-show="buttonName === '三期'" :model="addData" :rules="validate" ref="formValidate" class="hy_form" :label-width="280">
          <Row>
            <Col span="12">
              <FormItem label="车载终端本地存储时间周期：" prop="params[1]">
                <i-input v-model.trim="addData.params[1]" placeholder="0～60000" :maxlength="5" clearable class="hy_inputs"></i-input>
                <span class="hy_span">ms</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="延时工作模式下，CAN信息上报时间周期：" prop="params[130]">
                <i-input v-model="addData.params[130]" placeholder="1～600" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">min</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="正常时，CAN信息上报周期：" prop="params[2]">
                <i-input v-model="addData.params[2]" placeholder="1～600" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="报警时，CAN信息上报周期：" prop="params[3]">
                <i-input v-model="addData.params[3]" placeholder="0～60000" :maxlength="5" clearable class="hy_inputs"></i-input>
                <span class="hy_span">ms</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="延时工作模式下，心跳发送周期：" prop="params[131]">
                <i-input v-model="addData.params[131]" placeholder="1～240" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="休眠时，定位信息上报时间周期：" prop="params[132]">
                <i-input v-model="addData.params[132]" placeholder="1～18000" :maxlength="5" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="远程服务与管理平台域名：" prop="params[5]">
                <i-input v-model="addData.params[5]" placeholder="0.0.0.0" :maxlength="15" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="远程服务与管理平台端口：" prop="params[6]">
                <i-input v-model="addData.params[6]" placeholder="0～65531" :maxlength="5" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="充电时，CAN信息上报时间周期：" prop="params[133]">
                <i-input v-model="addData.params[133]" placeholder="1～600" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="延时时间：" prop="params[134]">
                <i-input v-model="addData.params[134]" placeholder="1～7200" :maxlength="4" clearable class="hy_inputs"></i-input>
                <span class="hy_span">min</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="硬件版本，车载终端厂商自行定义：">
                <i-input v-model="addData.params[7]" placeholder="" :maxlength="15" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="正常时，定位信息上报时间周期：" prop="params[135]">
                <i-input v-model="addData.params[135]" placeholder="1～600" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="固件版本，车载终端厂商自行定义：">
                <i-input v-model="addData.params[8]" placeholder="" :maxlength="15" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="出现报警时，定位信息上报时间周期：" prop="params[136]">
                <i-input v-model="addData.params[136]" placeholder="0～60000" :maxlength="5" clearable class="hy_inputs"></i-input>
                <span class="hy_span">ms</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="车载终端心跳发送周期：" prop="params[9]">
                <i-input v-model="addData.params[9]" placeholder="1～240" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="延时工作模式下，定位信息上报时间周期：" prop="params[137]">
                <i-input v-model="addData.params[137]" placeholder="1～18000" :maxlength="5" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="终端应答超时时间：" prop="params[10]">
                <i-input v-model="addData.params[10]" placeholder="1～600" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="充电时，定位信息上报时间周期：" prop="params[138]">
                <i-input v-model="addData.params[138]" placeholder="1～18000" :maxlength="5" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="平台应答超时时间：" prop="params[11]">
                <i-input v-model="addData.params[11]" placeholder="1～600" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="超速报警阀值：" prop="params[139]">
                <i-input v-model="addData.params[139]" placeholder="1~500" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">km/h</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="连续三次登入失败后，到下一次登入的间隔时间：" prop="params[12]">
                <i-input v-model="addData.params[12]" placeholder="1～240" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">min</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="租赁平台域名或IP：" prop="params[141]">
                <i-input v-model="addData.params[141]" placeholder="0.0.0.0" :maxlength="15" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="政府平台域名："  prop="params[14]">
                <i-input v-model="addData.params[14]" placeholder="0.0.0.0" :maxlength="15" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="租赁平台端口：" prop="params[142]">
                <i-input v-model="addData.params[142]" placeholder="0～65532" :maxlength="5" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="政府平台端口：" prop="params[15]">
                <i-input v-model="addData.params[15]" placeholder="0～65532" :maxlength="5" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="APN：">
                <Select v-model="addData.params[143]" class="hy_inputs" clearable>
                  <Option value="1">移动CMNET</Option>
                  <Option value="2">联通UNINET</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="是否处于抽样监测中：">
                <Select v-model="addData.params[16]" class="hy_inputs" clearable>
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="车辆识别码：" prop="params[128]">
                <i-input v-model="addData.params[128]" placeholder="" :maxlength="20" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="短信中心号码：" prop="params[129]">
                <i-input v-model="addData.params[129]" placeholder="" :maxlength="18" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Form v-show="buttonName === '二期'" :model="addData" :rules="validate1" ref="formValidate1" class="hy_form" :label-width="280">
          <Row>
            <Col span="12">
              <FormItem label="UDP IP：" prop="params1[2000]">
                <i-input v-model="addData.params1[2000]" placeholder="不足3位的前面补0" :maxlength="15" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="ACC开时，定时上传信息时间间隔：" prop="params1[8]">
                <i-input v-model="addData.params1[8]" placeholder="0～65535" :maxlength="5" clearable class="hy_inputs"></i-input>
                <span class="hy_span">s</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="UDP IP端口：" prop="params1[2001]">
                <i-input v-model="addData.params1[2001]" placeholder="0～65532" :maxlength="5" clearable class="hy_inputs"></i-input>
                <br/><span class="tips" v-show="show1">IP和端口必须同时填写</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="ACC关时，定时上传信息时间间隔：" prop="params1[9]">
                <i-input v-model="addData.params1[9]" placeholder="0～255" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">min</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="TCP IP：" prop="params1[3000]">
                <i-input v-model="addData.params1[3000]" placeholder="不足3位的前面补0" :maxlength="15" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="TCP心跳时间：" prop="params1[10]">
                <i-input v-model="addData.params1[10]" placeholder="0～255" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">min</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="TCP IP端口：" prop="params1[3001]">
                <i-input v-model="addData.params1[3001]" placeholder="0～65532" :maxlength="5" clearable class="hy_inputs"></i-input>
                <br/><span class="tips" v-show="show2">IP和端口必须同时填写</span>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="超速报警阀值：" prop="params1[11]">
                <i-input v-model="addData.params1[11]" placeholder="0～255" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">km/h</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="通讯类型：">
                <Select v-model="addData.params1[4]" class="hy_inputs" clearable>
                  <Option value="0">UDP通讯方式</Option>
                  <Option value="1">TCP通讯方式</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="停车后终端延时T1进入休眠：" prop="params1[12]">
                <i-input v-model="addData.params1[12]" placeholder="0～255" :maxlength="3" clearable class="hy_inputs"></i-input>
                <span class="hy_span">min</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="APN：">
                <i-input v-model="addData.params1[5]" placeholder="目前新大洋都用CMNET" :maxlength="25" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="车型：" prop="params1[130000]">
                <Select v-model="addData.params1[130000]" class="hy_inputs" clearable>
                  <Option value="1">H车型</Option>
                  <Option value="2">H1车型</Option>
                  <Option value="3">其他车型</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="本机号码：" prop="params1[6]">
                <i-input v-model="addData.params1[6]" placeholder="总长度不大于11" :maxlength="11" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="波特率："  prop="params1[130001]">
                <Select v-model="addData.params1[130001]" class="hy_inputs" clearable>
                  <Option value="1">125kbps</Option>
                  <Option value="2">250kbps</Option>
                  <Option value="3">500kbps</Option>
                  <Option value="3">1Mbps</Option>
                </Select>
                <br/><span class="tips" v-show="show3">车型和波特率必须同时填写</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="主中心号码：" prop="params1[7]">
                <i-input v-model="addData.params1[7]" placeholder="总长度不大于20" :maxlength="20" clearable class="hy_inputs"></i-input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { batchSettingTerminalParam, vehicleStatus } from '@/service/remoteControlService/vehicleRemoteControl';
  import { handles } from '@/js/libs/checkValue';
  export default {
    mixins: [storeVin],
    data () {
      // 检查不同值的 范围
      const checkValue = (rule, value, callback) => {
        if (value && this.buttonName === '三期') {
          let [min, max] = [0, 0];
          if (rule.fullField === 'params[1]' || rule.fullField === 'params[3]' || rule.fullField === 'params[136]') {
            min = 0;
            max = 60000;
          } else if (rule.fullField === 'params[130]' || rule.fullField === 'params[2]' || rule.fullField === 'params[133]' || rule.fullField === 'params[135]' || rule.fullField === 'params[10]' || rule.fullField === 'params[11]') {
            min = 1;
            max = 600;
          } else if (rule.fullField === 'params[131]' || rule.fullField === 'params[9]' || rule.fullField === 'params[12]') {
            min = 1;
            max = 240;
          } else if (rule.fullField === 'params[132]' || rule.fullField === 'params[137]' || rule.fullField === 'params[138]') {
            min = 1;
            max = 18000;
          } else if (rule.fullField === 'params[6]') {
            min = 0;
            max = 65531;
          } else if (rule.fullField === 'params[134]') {
            min = 1;
            max = 7200;
          } else if (rule.fullField === 'params[139]') {
            min = 1;
            max = 500;
          } else if (rule.fullField === 'params[142]' || rule.fullField === 'params[15]') {
            min = 0;
            max = 65532;
          }
          if (Number.parseInt(value) < min || Number.parseInt(value) > max) {
            callback(new Error('数值不在范围内'));
          }
          callback();
        } else if (value && this.buttonName === '二期') {
          // 清除同时存在的提示
          if (rule.fullField === 'params1[2000]' || rule.fullField === 'params1[2001]') {
            this.show1 = false;
          }
          if (rule.fullField === 'params1[3000]' || rule.fullField === 'params1[3001]') {
            this.show2 = false;
          }
          if (rule.fullField === 'params1[130000]' || rule.fullField === 'params1[130001]') {
            this.show3 = false;
          }
          let [min, max] = [0, 0];
          if (rule.fullField === 'params1[8]') {
            min = 0;
            max = 65535;
          } else if (rule.fullField === 'params1[2001]' || rule.fullField === 'params1[3001]') {
            min = 1;
            max = 65532;
          } else if (rule.fullField === 'params1[9]' || rule.fullField === 'params1[10]' || rule.fullField === 'params1[11]' || rule.fullField === 'params1[12]') {
            min = 1;
            max = 255;
          }
          if (rule.fullField === 'params1[8]' || rule.fullField === 'params1[2001]' || rule.fullField === 'params1[3001]' ||
            rule.fullField === 'params1[9]' || rule.fullField === 'params1[10]' || rule.fullField === 'params1[11]' || rule.fullField === 'params1[12]') {
            if (Number.parseInt(value) < min || Number.parseInt(value) > max) {
              callback(new Error('数值不在范围内'));
            }
          }
          callback();
        } else {
          callback();
        }
      };
      return {
        buttonName: '三期',
        warnTip: 'warn',
        addData: {
          vinCodes: '',
          params: {},
          params1: {}
        },
        formLoading: false,
        validate: {
          'params[1]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[130]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[2]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[3]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[131]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[132]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[133]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[6]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[134]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[135]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[136]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[9]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[137]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[10]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[138]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[11]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[139]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[12]': [
            {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[142]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[15]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params[128]': {validator: handles.call(this, 'vin', '', true), trigger: 'blur'},
          'params[5]': {validator: handles.call(this, 'ip', '', true), trigger: 'blur'},
          'params[14]': {validator: handles.call(this, 'ip', '', true), trigger: 'blur'},
          'params[141]': {validator: handles.call(this, 'ip', '', true), trigger: 'blur'},
          'params[129]': {validator: handles.call(this, 'number', '', true), trigger: 'blur'}
        },  // 三期
        validate1: {
          'params1[8]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[2001]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[3001]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[9]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[10]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[11]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[12]': [
            {validator: handles.call(this, 'zeroNumber', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[2000]': [
            {validator: handles.call(this, 'ip3', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[3000]': [
            {validator: handles.call(this, 'ip3', '', true), trigger: 'blur'},
            {validator: checkValue}
          ],
          'params1[130000]': {validator: checkValue},
          'params1[130001]': {validator: checkValue},
          'params1[6]': {validator: handles.call(this, 'number', '', true), trigger: 'blur'},
          'params1[7]': {validator: handles.call(this, 'number', '', true), trigger: 'blur'}
        },  // 二期
        show1: false,
        show2: false,
        show3: false
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 切换 tab
      buttonChange () {
        this.addData = {
          vinCodes: '',
          params: {},
          params1: {}
        };
        this.optionsVin = [];
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.$refs['formValidate'].resetFields();
        this.$refs['formValidate1'].resetFields();
      },
      // 保存
      save () {
        if (!this.addData.vinCodes) {
          this.warnTip = 'warn-color';
          return;
        }
        this.warnTip = 'warn';
        this.hasValue = false;
        let name = '';
        if (this.buttonName === '三期') {
          name = 'formValidate';
          for (let i in this.addData.params) {
            if (this.addData.params[i] || this.addData.params[i] === 0) {
              this.hasValue = true;
            }
          }
        } else {
          name = 'formValidate1';
          for (let i in this.addData.params1) {
            if (this.addData.params1[i] || this.addData.params1[i] === 0) {
              this.hasValue = true;
            }
          }
        }
        if (!this.hasValue) {
          this.$confirm('请至少设置一项', '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formLoading = true;
            vehicleStatus({vinCode: this.addData.vinCodes}, res => {
              // tbox:connections:online、tbox:connections:driving、tbox:connections:charging、tbox:connections:exception
              if (res === 'tbox:connections:offline') {
                this.$confirm('车辆处于离线中，是否需要短信唤醒？', '', {
                  showConfirmButton: true,
                  showCancelButton: true,
                  type: 'warning'
                }).then(() => {
                  this._save();
                }).catch(() => {
                  this.formLoading = false;
                });
              } else {
                this._save();
              }
            }, ret => {
              this.formLoading = false;
              let text = '查询车辆状态失败';
              if (ret) text = ret;
              this.$confirm(text, '', {
                showConfirmButton: false,
                showCancelButton: false,
                type: 'warning'
              }).then(() => {
              }).catch(() => {
              });
            });
          }
        });
        this.storeVin(this.addData.vinCodes);  // 存储搜索的vin
      },
      _save () {
        this.$confirm('确定设置吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let reg = new RegExp('"', 'g');
          let str = '';
          if (this.buttonName === '二期') {
            if (this.addData.params1[2000] && this.addData.params1[2001]) {
              this.addData.params1[2] = this.addData.params1[2000] + ',' + this.addData.params1[2001];
              this.show1 = false;
            } else if (!this.addData.params1[2000] && !this.addData.params1[2001]) {
              this.show1 = false;
            } else {
              this.show1 = true;
              this.formLoading = false;
              return;
            }
            if (this.addData.params1[3000] && this.addData.params1[3001]) {
              this.addData.params1[3] = this.addData.params1[3000] + ',' + this.addData.params1[3001];
              this.show2 = false;
            } else if (!this.addData.params1[3000] && !this.addData.params1[3001]) {
              this.show2 = false;
            } else {
              this.show2 = true;
              this.formLoading = false;
              return;
            }
            if (this.addData.params1[130000] && this.addData.params1[130001]) {
              this.addData.params1[13] = this.addData.params1[130000] + this.addData.params1[130001];
              this.show3 = false;
            } else if (!this.addData.params1[130000] && !this.addData.params1[130001]) {
              this.show3 = false;
            } else {
              this.show3 = true;
              this.formLoading = false;
              return;
            }
            this.formLoading = false;
            for (let key in this.addData.params1) {
              if (this.addData.params1[key] === '') {
                delete this.addData.params1[key];
              }
            }
            for (let key in this.addData.params1) {
              if (str === '') {
                str = key + ':' + this.addData.params1[key];
              } else {
                str = str + ';' + key + ':' + this.addData.params1[key];
              }
            }
            str = str.replace(reg, '');
          } else {
            for (let key in this.addData.params) {
              if (this.addData.params[key] === '') {
                delete this.addData.params[key];
              }
            }
            str = JSON.stringify(this.addData.params).slice(1, -1).replace(reg, '');
          }
          let prams = {
            vinCode: this.addData.vinCodes,
            params: str
          };
          batchSettingTerminalParam(prams, res => {
            this.formLoading = false;
            this.$confirm('终端参数设置成功', '', {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'success'
            }).then(() => {
              this.addData.params = {};
              this.addData.params1 = {};
            }).catch(() => {
            });
          }, ret => {
            this.formLoading = false;
            let text = '终端参数设置失败';
            if (ret) text = ret;
            this.$confirm(text, '提示', {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
          });
        }).catch(() => {
          this.formLoading = false;
        });
      }
    }
  };
</script>
