/**
* 作者：szh
* 时间：2018-02-08
* 描述：单车远程控制
**/
<style lang="scss" scoped>
  .hy-tool-add {
    border: 2px solid #ecf1ff;
  }
  .ivu-input, .ivu-select-selection {
    width: 200px;
    border: none;
    -webkit-border-radius: 9999px;
    -moz-border-radius: 9999px;
    -ms-border-radius: 9999px;
    -o-border-radius: 9999px;
    border-radius: 9999px;
  }
  .reload {
    margin-right:20px;
    width:25px;
    height:25px;
    background:rgba(90,145,255,1);
    border-radius: 6px;
    float:right;
    padding-left:3px;
    cursor:pointer;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
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
          <i-button type="success" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <!-- 添加功能 -->
          <div class="reload" @click="refresh">
            <hy-icon type="refresh" size="17" :showContent="true" color="white" ></hy-icon>
          </div>
          <!--<div class="hy-tool-bar hy-tool-add">-->
          <!--<hy-icon type="refresh" class="adduser" :showContent="true" color='#4784FF' size='22' @click="refresh"></hy-icon>-->
          <!--</div>-->
        </Form>
      </div>
      <Form label-position="right" :model="addForm" inline :label-width="80" :rules="ruleValidate" >
        <FormItem label="ACC状态:">
          {{controlData.runStatus | runStatus}}
        </FormItem>
        <!--<FormItem label="车系:">-->
          <!--{{controlData.carSeries}}-->
        <!--</FormItem>-->
        <!--<FormItem label="车型:">-->
          <!--{{controlData.carType}}-->
        <!--</FormItem>-->
        <!--<FormItem style="margin-left: -40px" prop="time">-->
        <!--<i-input v-model="addForm.time" placeholder="时间(S)"></i-input>-->
        <!--</FormItem>-->
        <!--<FormItem style="margin-left: -40px" prop="temperature">-->
        <!--<i-input v-model="addForm.temperature" placeholder="温度(°C)"></i-input>-->
        <!--</FormItem>-->
      </Form>
      <Form  inline :label-width="0" style="background-color: #f5f8fd;padding-bottom: 50px;" v-if="showForm">
        <FormItem v-for="item in showData" :key="item.value" style="margin-right: 0;width: 25%;">
          <hy-switch :ref="item.value" :value="addForm.action" @click="operation" :showSwitch="item.showSwitch" :jsonData="item"></hy-switch>
        </FormItem>
      </Form>
      <Spin v-if="showSpin" fix>正在请求远程控制...</Spin>
    </div>
  </div>
</template>
<script>
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { requestVechileInfo, airConditionerCool, airConditionerHot, backDoor, door, engineControl, findCar, vehicleStatus } from '@/service/remoteControlService/vehicleRemoteControl';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { getItems } from '@/service/remoteControlService/vehicleSetting';
  import hySwitch from '@/components/switch/switchMessage';

  export default {
    components: {
      HyTable,
      HyFormItem,
      hySwitch
    },
    name: 'hyRemote',
    mixins: [storeVin],
    data () {
      let checkNum = (rule, value, callback) => {
        const rel = /^[1-9]\d*$/;
        if (value) {
          if (rel.test(value)) {
            callback();
          } else {
            callback(new Error('格式不正确'));
          }
        } else {
          callback();
        }
      };
      return {
        showForm: false,  // switch show form
        notFoundText: '',
        searchData: {},
        warnTip: 'warn',
        showSpin: false,
        loading: false,
        controlData: {},
        showData: [],         // 展示项
        itemsData: [
          {
            value: 'leftFrontDoor',
            label: '左前车窗控制',
            type: 'zuoce',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'rightFrontDoor',
            label: '右前车窗控制',
            type: 'zuoce-copy',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'power',
            label: '动力控制',
            type: 'guangdongliliaofa',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'lights',
            label: '小灯控制',
            type: 'dengpao',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'airAuto',
            label: '空调自动模式控制',
            type: 'zidongfaxian',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'airHeating',
            label: '空调制热控制',
            type: 'icon-',
            prompt: '暖风打开后，15分钟无操作（或拉开车门时）将自动关闭，是否打开？',
            api: airConditionerHot
          },
          {
            value: 'airRefrigeration',
            label: '空调制冷控制',
            type: 'zhileng-',
            prompt: '冷风打开后，15分钟无操作（或拉开车门时）将自动关闭，是否打开？',
            api: airConditionerCool
          },
          {
            value: 'dippedHeadlight',
            label: '近光灯控制',
            type: 'jinguangdeng',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'retain',
            label: '保留',
            type: 'anquan',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'fogLamp',
            label: '雾灯控制',
            type: 'wudeng',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'backDoorLock',
            label: '后背门锁控制',
            type: 'zhinengmensuo',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'readingLamp',
            label: '阅读灯控制',
            type: 'linedesign-14',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'powerOff',
            label: '车辆动力通断控制',
            type: 'kongzhi',
            prompt: '确定执行此操作吗?',
            api: engineControl
          },
          {
            value: 'maxSpeed',
            label: '最高车速设置指令',
            type: 'suduspeed8',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'limp',
            label: '跛行模式控制',
            type: '31xingdongdian',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'payByCard',
            label: '刷卡控制充电',
            type: 'yingyuanxinxishuaqia',
            prompt: '确定执行此操作吗?',
            api: null
          },
          {
            value: 'lock',
            label: '门锁控制',
            type: 'ai241',
            prompt: '门锁打开后，30秒无操作将自动落锁，是否打开？',
            api: door
          },
          {
            value: 'findCar',
            label: '寻车',
            type: 'cheliang',
            showSwitch: false,
            prompt: '寻车打开后，5分钟无操作（或拉开车门时）将自动关闭，是否打开？',
            api: findCar
          },
          {
            value: 'trunk',
            label: '后备箱控制',
            type: 'fuwukongzhi',
            showSwitch: false,
            prompt: '后备箱解锁后，10秒无操作将自动落锁，是否打开？',
            api: backDoor
          }
        ],
        addForm: {
          time: '',
          temperature: ''
        },
        ruleValidate: {
          time: [
            {validator: checkNum, trigger: 'change'}
          ],
          temperature: [
            {validator: checkNum, trigger: 'change'}
          ]
        }
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      search () {
        this.loading = true;
        if (!this.searchData.vinCode) {
          this.loading = false;
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        this.controlData = {
          vinCode: this.searchData.vinCode
        };
        this.showData = [];
        this.showForm = false;
        // 查询车辆状态
        vehicleStatus(this.searchData, res => {
          // tbox:connections:online、tbox:connections:driving、tbox:connections:charging、tbox:connections:exception
          if (res === 'tbox:connections:offline') {
            this.$confirm('车辆处于离线中，是否需要短信唤醒？', '', {
              showConfirmButton: true,
              showCancelButton: true,
              type: 'warning'
            }).then(() => {
              this._search(this.searchData);
            }).catch(() => {
              this.loading = false;
            });
          } else {
            this._search(this.searchData);
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
      // 查询车辆远程数据
      _search (searchData) {
        requestVechileInfo(searchData, res => {
          this.controlData = res;
          this.controlData.vinCode = searchData.vinCode;
          this.loading = false;
          this.getItems(searchData.vinCode);
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
      },
      refresh () {
        if (!this.controlData.vinCode) {
          this.$Notice.warning({
            title: '',
            desc: '请先查询'
          });
          return;
        }
        requestVechileInfo(this.controlData, res => {
          this.controlData.runStatus = res.runStatus;
          this.loading = false;
        }, ret => {
          this.loading = false;
          let text = '获取车辆ACC状态失败';
          if (ret) text = ret;
          this.$confirm(text, '', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
//          this.$Notice.error({
//            title: '获取数据失败',
//            desc: ret
//          });
        });
      },
      // switch 开关
      operation (value, data) {
        vehicleStatus(this.searchData, res => {
          if (res === 'tbox:connections:offline') {
            this.$confirm('车辆处于离线中，是否需要短信唤醒？', '', {
              showConfirmButton: true,
              showCancelButton: true,
              type: 'warning'
            }).then(() => {
              this._operation(value, data);
            }).catch(() => {
              if (value) {
                if (value === 1) {
                  this.$refs[data.value][0].current = 2;
                } else {
                  this.$refs[data.value][0].current = 1;
                }
              }
            });
          } else {
            this._operation(value, data);
          }
        }, ret => {
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
      },
      // 操作开关触发api
      _operation (value, data) {
        if (data.api) {
          let params = {
            vinCode: this.controlData.vinCode,
            action: value
          };
          if (data.value === 'airHeating') {
            params.time = 600;
            params.temperature = 30;
          } else if (data.value === 'airRefrigeration') {
            params.time = 600;
            params.temperature = 27;
          }
          if (!value) {
            params.action = 1;
          }
          this.showSpin = true;
          data.api(params, res => {
            this.showSpin = false;
            this.$Notice.success({
              title: '控制成功',
              desc: res
            });
          }, ret => {
            if (value) {
              if (value === 1) {
                this.$refs[data.value][0].current = 2;
              } else {
                this.$refs[data.value][0].current = 1;
              }
            }
            this.showSpin = false;
//            this.$Notice.error({
//              title: '控制失败',
//              desc: ret
//            });
            this.$confirm(ret, '控制失败', {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
          });
        } else {
          this.$confirm('该车辆暂不支持此控制项', '', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'info'
          }).then(() => {
          }).catch(() => {
          });
          this.$refs[data.value][0].current = 2;
        }
      },
      // 获取控制项列表
      getItems (vin) {
        getItems({vin: vin}, res => {
          this.controlData.carSeries = res.carSeries;
          this.controlData.carType = res.carType;
          if (res.teleControlItemBean.length > 0) {
            for (let item of this.itemsData) {
              for (let item1 of res.teleControlItemBean) {
                if (item1.cnName === item.label) {
                  this.showData.push(item);
                }
              }
            }
          }
          this.showForm = true;
        });
      }
    }
  };
</script>
