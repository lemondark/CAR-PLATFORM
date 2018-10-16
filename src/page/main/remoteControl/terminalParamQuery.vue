/**
* 作者：szh
* 时间：2018-03-07
* 描述：终端参数查询
**/
<style lang="scss" scoped>
  .hy_table{
    width: 100%;
    height: 100%;
    margin-right: 10px;
    margin-bottom:250px;
    margin-top: 20px;
    text-align: center;
    font-size: 13px;
    border-top: 1px solid #f1f1f1;
    line-height:40px;
    .hy_title {
      height: 40px;
      border-bottom: 1px solid #f1f1f1;
      border-left: 1px solid #f1f1f1;
      float: left;
      width: 50%;
      .hy_value {
        width:60%;
        display: block;
        float: left;
        text-align: right;
        padding-right: 5px;
        border-right: 1px solid #f1f1f1;
        i{
          font-style:normal
        }
      }
    }
    .hy_right {
      height: 40px;
      border-left: 1px solid #f1f1f1;
      border-bottom: 1px solid #f1f1f1;
      border-right: 1px solid #f1f1f1;
    }
    span.hy_span {
      width:40%;
      display: block;
      float: left;
      text-align: right;
      i{
        font-style:normal
      }
      color: #c7cad1;
      text-align: center !important;
    }
  }
  span.hy_span1 {
    width:40%;
    display: block;
    float: left;
    text-align: right;
    i{
      font-style:normal
    }
    /*color: #c7cad1;*/
    text-align: center !important;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2">
        <Form label-position="right" inline >
          <FormItem>
            <RadioGroup v-model="buttonName" type="button" @on-change="buttonChange">
              <Radio label="三期"></Radio>
              <Radio label="二期"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="">
            <Select
              placeholder="VIN码"
              style="width: 200px"
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
          <i-button type="primary" icon="ios-search" @click="getList" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
        </Form>
      </div>
      <div class="hy_table" v-show="buttonName === '三期'">
        <div class="hy_title">
          <span class="hy_value"><i>车载终端本地存储时间周期: </i></span>
          <span class="hy_span1" v-if="addForm[1]">{{addForm[1] | paramQuery}}</span>
          <span class="hy_span" v-else>(0ms～60000ms)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>正常时，CAN信息上报周期: </i></span>
          <span class="hy_span1" v-if="addForm[2]">{{addForm[2] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s～600s)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>报警时，CAN信息上报周期: </i></span>
          <span class="hy_span1" v-if="addForm[3]">{{addForm[3] | paramQuery}}</span>
          <span class="hy_span" v-else>(0ms～60000ms)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>远程服务与管理平台域名: </i></span>
          <span class="hy_span1" v-if="addForm[5]">{{addForm[5]}}</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>远程服务与管理平台端口: </i></span>
          <span class="hy_span1" v-if="addForm[6]">{{addForm[6] | paramQuery}}</span>
          <span class="hy_span" v-else>(0~65531)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>硬件版本: </i></span>
          <span class="hy_span1" v-if="addForm[7]">{{addForm[7]}}</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>固件版本: </i></span>
          <span class="hy_span1" v-if="addForm[8]">{{addForm[8]}}</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>车载终端心跳发送周期: </i></span>
          <span class="hy_span1" v-if="addForm[9]">{{addForm[9] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~240s)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>终端应答超时时间: </i></span>
          <span class="hy_span1" v-if="addForm[10]">{{addForm[10] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s～600s)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>平台应答超时时间: </i></span>
          <span class="hy_span1" v-if="addForm[11]">{{addForm[11] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~600s)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>连续三次登入失败后，到下一次登入的间隔时间: </i></span>
          <span class="hy_span1" v-if="addForm[12]">{{addForm[12] | paramQuery}}</span>
          <span class="hy_span" v-else>(1min～240min)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>政府平台端口: </i></span>
          <span class="hy_span1" v-if="addForm[15]">{{addForm[15] | paramQuery}}</span>
          <span class="hy_span" v-else>(0~65532)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>是否处于抽样监测中: </i></span>
          <span class="hy_span1" v-if="addForm[16]">{{addForm[16] == 1 ? '是' : (addForm[16] == 2 ? '否' : (addForm[16] == -2 ? '异常' : '无效'))}}</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>车辆识别码: </i></span>
          <span class="hy_span1" v-if="addForm[128]">{{addForm[128]}}</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>短信中心号码: </i></span>
            <span class="hy_span1" v-if="addForm[129]">
              <Tooltip :content="tooltipForm" placement="top" class="terminalParamQuery">
              {{addForm[129]}}
              </Tooltip>
              </span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>延时工作模式下，CAN信息上报时间周期: </i></span>
          <span class="hy_span1" v-if="addForm[130]">{{addForm[130] | paramQuery}}</span>
          <span class="hy_span" v-else>(1min~6000min)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>延时工作模式下，心跳发送周期: </i></span>
          <span class="hy_span1" v-if="addForm[131]">{{addForm[131] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~240s)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>休眠时，定位信息上报时间周期: </i></span>
          <span class="hy_span1" v-if="addForm[132]">{{addForm[132] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~18000s)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>充电时，CAN信息上报时间周期: </i></span>
          <span class="hy_span1" v-if="addForm[133]">{{addForm[133] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~600s)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>延时时间: </i></span>
          <span class="hy_span1" v-if="addForm[134]">{{addForm[134] | paramQuery}}</span>
          <span class="hy_span" v-else>(1min~7200min)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>正常时，定位信息上报时间周期: </i></span>
          <span class="hy_span1" v-if="addForm[135]">{{addForm[135] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~600s)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>出现报警时，定位信息上报时间周期:</i></span>
          <span class="hy_span1" v-if="addForm[136]">{{addForm[136] | paramQuery}}</span>
          <span class="hy_span" v-else>(0ms~60000ms)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>延时工作模式下，定位信息上报时间周期: </i></span>
          <span class="hy_span1" v-if="addForm[137]">{{addForm[137] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~18000s)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>充电时，定位信息上报时间周期: </i></span>
          <span class="hy_span1" v-if="addForm[138]">{{addForm[138] | paramQuery}}</span>
          <span class="hy_span" v-else>(1s~18000s)</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>超速报警阀值: </i></span>
          <span class="hy_span1" v-if="addForm[139]">{{addForm[139] | paramQuery}}</span>
          <span class="hy_span" v-else>(1 公里/小时～500 公里/小时)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>租赁平台域名或IP: </i></span>
          <span class="hy_span1" v-if="addForm[141]">{{addForm[141]}}</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>租赁平台端口: </i></span>
          <span class="hy_span1" v-if="addForm[142]">{{addForm[142] | paramQuery}}</span>
          <span class="hy_span" v-else>(0～65532)</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>APN: </i></span>
          <span class="hy_span1" v-if="addForm[143]">{{addForm[143] | APN}}</span>
          <span class="hy_span" v-else>(1 移动 CMNET, 2 联通 UNINET)</span>
        </div>
      </div>
      <div class="hy_table" v-show="buttonName === '二期'">
        <div class="hy_title">
          <span class="hy_value"><i>UDP IP: </i></span>
          <span class="hy_span1" v-if="addForm[2]">{{addForm[2].split(',')[0]}}</span>
          <span class="hy_span" v-else></span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>ACC开时，定时上传信息时间间隔: </i></span>
          <span class="hy_span1" v-if="addForm[8]">{{addForm[8] | paramQuery}}</span>
          <span class="hy_span" v-else></span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>UDP IP端口: </i></span>
          <span class="hy_span1" v-if="addForm[2]">{{addForm[2].split(',')[1]}}</span>
          <span class="hy_span" v-else></span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>ACC关时，定时上传信息时间间隔: </i></span>
          <span class="hy_span1" v-if="addForm[9]">{{addForm[9] | paramQuery}}</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>TCP IP: </i></span>
          <span class="hy_span1" v-if="addForm[3]">{{addForm[3].split(',')[0]}}</span>
          <span class="hy_span"></span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>TCP心跳时间: </i></span>
          <span class="hy_span1" v-if="addForm[10]">{{addForm[10] | paramQuery}}</span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>TCP IP端口: </i></span>
          <span class="hy_span1" v-if="addForm[3]">{{addForm[3].split(',')[1]}}</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>超速报警阀值: </i></span>
          <span class="hy_span1" v-if="addForm[11]">{{addForm[11] | paramQuery}}</span>
          <span class="hy_span" v-else></span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>通讯类型: </i></span>
          <span class="hy_span1" v-if="addForm[4]">{{addForm[4] | communicationMode}}</span>
          <span class="hy_span" v-else></span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>停车后终端延时T1进入休眠: </i></span>
          <span class="hy_span1" v-if="addForm[12]">{{addForm[12] | paramQuery}}</span>
          <span class="hy_span" v-else></span>
        </div>
        <div class="hy_title">
          <span class="hy_value"><i>APN: </i></span>
          <span class="hy_span1" v-if="addForm[5]">{{addForm[5] | paramQuery}}</span>
          <span class="hy_span" v-else></span>
        </div>
        <!--<div class="hy_title hy_right">-->
        <!--<span class="hy_value"><i>车型: </i></span>-->
        <!--<span class="hy_span1" v-if="addForm[13]">{{addForm[13]}}</span>-->
        <!--<span class="hy_span" v-else></span>-->
        <!--</div>-->
        <div class="hy_title hy_right">
          <span class="hy_value"><i>本机号码: </i></span>
          <span class="hy_span1" v-if="addForm[6]">{{addForm[6]}}</span>
        </div>
        <!--<div class="hy_title hy_right">-->
        <!--<span class="hy_value"><i>波特率: </i></span>-->
        <!--<span class="hy_span1" v-if="addForm[13]">{{addForm[13]}}</span>-->
        <!--</div>-->
        <div class="hy_title">
          <span class="hy_value"><i>主中心号码: </i></span>
          <span class="hy_span1" v-if="addForm[7]">{{addForm[7]}}</span>
        </div>
        <div class="hy_title hy_right">
          <span class="hy_value"><i>{{'  '}}</i></span>
          <span class="hy_span1"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { queryTerminalParam, vehicleStatus } from '@/service/remoteControlService/vehicleRemoteControl';

  export default {
    mixins: [storeVin],
    data () {
      return {
        buttonName: '三期',
        warnTip: 'warn',
        loading: false,
        tooltipForm: '',
        searchData: {},
        addForm: {}
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 切换 tab
      buttonChange () {
        this.searchData.vinCode = '';
        this.optionsVin = [];
        this.addForm = {};
      },
      getList () {
        if (!this.searchData.vinCode) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        this.loading = true;
        vehicleStatus({vinCode: this.searchData.vinCode}, res => {
          // tbox:connections:online、tbox:connections:driving、tbox:connections:charging、tbox:connections:exception
          if (res === 'tbox:connections:offline') {
            this.$confirm('车辆处于离线中，是否需要短信唤醒？', '', {
              showConfirmButton: true,
              showCancelButton: true,
              type: 'warning'
            }).then(() => {
              this._getList();
            }).catch(() => {
              this.loading = false;
            });
          } else {
            this._getList();
          }
        }, ret => {
          this.loading = false;
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
        this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      _getList () {
        queryTerminalParam(this.searchData, res => {
          this.loading = false;
          this.addForm = res.data;
          if (this.addForm[129]) {
            this.tooltipForm = this.addForm[129];
            if (this.addForm[129].length > 27) {
              this.addForm[129] = this.addForm[129].substring(0, 27) + '...';
            }
          }
        }, ret => {
          this.addForm = {};
          this.loading = false;
          let text = '终端参数查询失败';
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
    }
  };
</script>
