/**
* 作者：szh
* 时间：2018-01-29
* 描述：终端参数控制
*/
<style lang="scss" scoped>
  .hy_top {
    margin-top: 20px;
    height: auto;
    margin-left: 50px;
  }
  .warn-color {
    border:1px solid red;
  }
</style>
<template>
  <div  class="bgcolor">
    <div class="content">
      <div class="hy_top">
        <Form ref="terminalControl" :model="addData" label-position="right" :label-width="110">
          <FormItem label="VIN码">
            <Select
              placeholder="VIN码"
              style="width: 600px;"
              :class="warnTip"
              v-model="addData.vinCode"
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
          <FormItem>
            <CheckboxGroup v-model="addData.names">
              <Checkbox label="车载终端关机" value="shutdown"></Checkbox>
              <Checkbox label="车载终端复位" value="reset"></Checkbox>
              <Checkbox label="恢复出厂设置" value="recovery"></Checkbox>
              <Checkbox label="断开数据通信链路" value="disconnect"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <!--<FormItem label="车载终端关机">-->
          <!--<Checkbox v-model="addData.shutdown"></Checkbox>-->
          <!--</FormItem>-->
          <!--<FormItem label="车载终端复位">-->
          <!--<Checkbox v-model="addData.reset"></Checkbox>-->
          <!--</FormItem>-->
          <!--<FormItem label="恢复出厂设置">-->
          <!--<Checkbox v-model="addData.recovery"></Checkbox>-->
          <!--</FormItem>-->
          <!--<FormItem label="断开数据通信链路">-->
          <!--<Checkbox v-model="addData.disconnect"></Checkbox>-->
          <!--</FormItem>-->
          <FormItem>
            <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { batchTerminalControl, vehicleStatus } from '@/service/remoteControlService/vehicleRemoteControl';

  export default {
    mixins: [storeVin],
    data () {
      return {
        notFoundText: '',
        addData: {
          vinCode: '',
          names: []
        },
        warnTip: 'warn',
        optionsVin: [],
        loading1: false,
        formLoading: false
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      save () {
        if (!this.addData.vinCode) {
          this.warnTip = 'warn-color';
          return;
        }
        if (!this.addData.names.length) {
          this.$confirm('请至少勾选一项', '', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        }
        this.warnTip = 'warn';
        this.formLoading = true;
         // 查询车辆状态
        vehicleStatus({vinCode: this.addData.vinCode}, res => {
          // tbox:connections:online、tbox:connections:driving、tbox:connections:charging、tbox:connections:exception
          if (res === 'tbox:connections:offline') {
            this.$confirm('车辆处于离线中，是否需要短信唤醒？', '', {
              showConfirmButton: true,
              showCancelButton: true,
              type: 'warning'
            }).then(() => {
              this.clickSave();
            }).catch(() => {
              this.formLoading = false;
            });
          } else {
            this.clickSave();
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
      this.storeVin(this.addData.vinCode);  // 存储搜索的vin
      },
      clickSave () {
        let params = {
          vinCodes: this.addData.vinCode,
          names: this.addData.names.toString()
        };
        batchTerminalControl(params, res => {
          this.formLoading = false;
          this.$confirm('终端远程控制设置成功', '', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'success'
          }).then(() => {
          }).catch(() => {
          });
        }, ret => {
          this.formLoading = false;
          this.$confirm(ret, '', {
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
