/**
* 描述：历史CAN列表
**/
<style lang="scss" scoped>
  .button{
    margin-left: 10px;
    background-color:#fff !important;
    border: 1px solid #E6EDFD !important;
    color:#4A79EF !important;
  }
  .button:hover{
    background-color:#E6EDFD !important;
    color:#4A79EF !important;
    border: 1px solid #4A79EF !important;
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
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledTime" v-model="searchData.positionTimeBegin" placement="bottom" placeholder="开始时间" :editable="false" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledTime" v-model="searchData.positionTimeEnd" placement="bottom" placeholder="结束时间" :editable="false" style="width: 200px"></DatePicker>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="primary" @click="search(1)" :loading="loading"
                    style="font-size:10px;" class="button">近6小时查询
          </i-button>
        </Form>
      </div>
      <Table border ref="tables" :columns="d3" :loading="loading" :data="list" style="margin-top: 10px;" v-if="d3Show" :no-data-text="noText"></Table>
      <Table border ref="tables" :columns="d2" :loading="loading" :data="list" style="margin-top: 10px;" :no-data-text="noText" v-if="d2Show"></Table>
      <Table border ref="tables" :columns="d5" :loading="loading" :data="list" style="margin-top: 10px;" :no-data-text="noText" v-if="d5Show"></Table>
      <!-- 分页 -->
      <hy-page
        :current-page="currentPage"
        :total-element="totalElement"
        :total-page="totalPage"
        :show-item="5"
        @current-change="changePage"></hy-page>
      <!--D2详情-->
      <Modal v-model="d2DetailShow" :mask-closable="false" width="1000" :styles="{top: '20px'}" @on-cancel="cancel">
        <p slot="header" class="hy-modal-title">
          <span>历史CAN详情</span>
        </p>
        <div style="text-align:left; height: 500px;overflow: auto;" id="outerDiv1">
          <!--<h2>GPS</h2>-->
          <!--<hy-detail1 :form="vehicleDetail.d2GpsHistoryBean" :rowData="d2GpsHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>-->
          <!--<br>-->
          <h2>HVAC</h2>
          <hy-detail1 :form="vehicleDetail.d2HvacHistoryBean" :rowData="d2HvacHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>BCM</h2>
          <hy-detail1 :form="vehicleDetail.d2BcmHistoryBean" :rowData="d2BcmHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>VMS</h2>
          <hy-detail1 :form="vehicleDetail.d2VmsHistoryBean" :rowData="d2VmsHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>PEPS</h2>
          <hy-detail1 :form="vehicleDetail.d2PepsHistoryBean" :rowData="d2PepsHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>EPS</h2>
          <hy-detail1 :form="vehicleDetail.d2EpsHistoryBean" :rowData="d2EpsHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <!--<h2>ADAS</h2>-->
          <!--<hy-detail1 :form="vehicleDetail.d2AdasHistoryBean" :rowData="d2AdasHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>-->
          <!--<br>-->
          <h2>BMS</h2>
          <hy-detail1 :form="vehicleDetail.d2BmsHistoryBean" :rowData="d2BmsHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>OBC</h2>
          <hy-detail1 :form="vehicleDetail.d2ObcHistoryBean" :rowData="d2ObcHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>MC</h2>
          <hy-detail1 :form="vehicleDetail.d2McHistoryBean" :rowData="d2McHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>ACU</h2>
          <hy-detail1 :form="vehicleDetail.d2AcuHistoryBean" :rowData="d2AcuHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>DCDC</h2>
          <hy-detail1 :form="vehicleDetail.d2DcdcHistoryBean" :rowData="d2DcdcHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>ICU</h2>
          <hy-detail1 :form="vehicleDetail.d2IcuHistoryBean" :rowData="d2IcuHistoryBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
          <br>
          <h2>VERSION</h2>
          <hy-detail1 :form="vehicleDetail.d2VersionBean" :rowData="d2VersionBean" :labelWidth="250" v-if="d2DetailShow"></hy-detail1>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="cancel">关闭</Button>
        </div>
      </Modal>
      <!--D2 模拟双80-->
      <Modal v-model="d2_2DetailShow" :mask-closable="false" width="1000" :styles="{top: '20px'}" @on-cancel="cancel">
        <p slot="header" class="hy-modal-title">
          <span>历史CAN详情</span>
        </p>
        <div style="text-align:left; height: 500px;overflow: auto;" id="outerDiv2_2">
          <h2>BMS</h2>
          <hy-detail1 :form="vehicleDetail.d2D280bmsBean" :rowData="d2_2D280bmsBean" :labelWidth="250" v-if="d2_2DetailShow"></hy-detail1>
          <br>
           <h2>VMS</h2>
          <hy-detail1 :form="vehicleDetail.d2VmsHistoryBean" :rowData="d2_2VmsHistoryBean" :labelWidth="250" v-if="d2_2DetailShow"></hy-detail1>
          <br>
           <h2>OBC</h2>
          <hy-detail1 :form="vehicleDetail.d2ObcHistoryBean" :rowData="d2_2ObcHistoryBean" :labelWidth="250" v-if="d2_2DetailShow"></hy-detail1>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="cancel">关闭</Button>
        </div>
      </Modal>
      <!--D3详情-->
      <Modal v-model="d3DetailShow" :mask-closable="false" width="1000" :styles="{top: '20px'}" @on-cancel="cancel">
        <p slot="header" class="hy-modal-title">
          <span>历史CAN详情</span>
        </p>
        <div style="text-align:left; height: 500px;overflow: auto;" id="outerDiv2">
          <h2>BCM</h2>
          <hy-detail1 :form="vehicleDetail.d3CanVcuBcmHistoryBean" :rowData="d3CanVcuBcmHistoryBean" :labelWidth="250" v-if="d3DetailShow"></hy-detail1>
          <br>
          <h2>ADAS</h2>
          <hy-detail1 :form="vehicleDetail.d3CanAdasHistoryBean" :rowData="d3CanAdasHistoryBean" :labelWidth="250" v-if="d3DetailShow"></hy-detail1>
          <br>
          <h2>BMS</h2>
          <hy-detail1 :form="vehicleDetail.d3CanVcuBmsHistoryBean" :rowData="d3CanVcuBmsHistoryBean" :labelWidth="250" v-if="d3DetailShow"></hy-detail1>
          <br>
          <h2>MC</h2>
          <hy-detail1 :form="vehicleDetail.d3CanVcuMcHistoryBean" :rowData="d3CanVcuMcHistoryBean" :labelWidth="250" v-if="d3DetailShow"></hy-detail1>
          <br>
          <h2>GENERAL</h2>
          <hy-detail1 :form="vehicleDetail.d3CanVcuGeneralHistoryBean" :rowData="d3CanVcuGeneralHistoryBean" :labelWidth="250" v-if="d3DetailShow"></hy-detail1>
          <br>
          <h2>MSG</h2>
          <hy-detail1 :form="vehicleDetail.d3CanVcuMsgHistoryBean" :rowData="d3CanVcuMsgHistoryBean" :labelWidth="250" v-if="d3DetailShow"></hy-detail1>
          <br>
          <h2>TPMS</h2>
          <hy-detail1 :form="vehicleDetail.d3CanVcuTpmsHistoryBean" :rowData="d3CanVcuTpmsHistoryBean" :labelWidth="250" v-if="d3DetailShow"></hy-detail1>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="cancel">关闭</Button>
        </div>
      </Modal>
      <!--D5详情-->
      <Modal v-model="d5DetailShow" :mask-closable="false" width="1000" :styles="{top: '20px'}" @on-cancel="cancel">
        <p slot="header" class="hy-modal-title">
          <span>历史CAN详情</span>
        </p>
        <div style="text-align:left; height: 500px;overflow: auto;" id="outerDiv3">
          <h2>ABS</h2>
          <hy-detail1 :form="vehicleDetail.d5CanAbsBean" :rowData="d5CanAbsBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>ACU</h2>
          <hy-detail1 :form="vehicleDetail.d5CanAcuBean" :rowData="d5CanAcuBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>BCM</h2>
          <hy-detail1 :form="vehicleDetail.d5CanBcmBean" :rowData="d5CanBcmBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>BMS</h2>
          <hy-detail1 :form="vehicleDetail.d5CanBmsBean" :rowData="d5CanBmsBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>EPS</h2>
          <hy-detail1 :form="vehicleDetail.d5CanEpsBean" :rowData="d5CanEpsBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>HVAC</h2>
          <hy-detail1 :form="vehicleDetail.d5CanHvacBean" :rowData="d5CanHvacBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>IPK</h2>
          <hy-detail1 :form="vehicleDetail.d5CanIpkBean" :rowData="d5CanIpkBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>MCU</h2>
          <hy-detail1 :form="vehicleDetail.d5CanMcuBean" :rowData="d5CanMcuBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>OBC</h2>
          <hy-detail1 :form="vehicleDetail.d5CanObcBean" :rowData="d5CanObcBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
          <h2>VCU</h2>
          <hy-detail1 :form="vehicleDetail.d5CanVcuBean" :rowData="d5CanVcuBean" :labelWidth="250" v-if="d5DetailShow"></hy-detail1>
          <br>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="cancel">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import { historyCanList } from '@/service/monitor/historicalCanList';
  import date from '@/js/mixins/date';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import HyDetail1 from '@/components/common/detail/detail1.vue';
  import versionData from '@/js/mixins/versionData';

  export default {
    components: {
      HyDetail1
    },
    mixins: [date, storeVin],
    data () {
      return {
        currentPage: 1, // 当前页
        totalElement: 0, // 总数量
        totalPage: 0,   // 总页数
        d3Show: true,
        d2Show: false,
        d5Show: false,
        warnTip: 'warn',
        searchData: {
          positionTimeBegin: new Date(+new Date() - (6 * 3600 * 1000)),
          positionTimeEnd: new Date()
        },
        loading: false,
        d2DetailShow: false,
        d3DetailShow: false,
        d5DetailShow: false,
        d2_2DetailShow: false,
        noText: '',
        list: [],
        allList: [],
        columnAuthType: 'index',
        d3: [
          {
            type: 'index',
            title: '序号',
            width: 100,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode',
            width: 170,
            render: (h, params) => {
              return params.row['vehicle'] ? h('p', null, params.row['vehicle'].vinCode) : '';
            }
          },
          {
            title: '数据类型',
            width: 150,
            key: 'dataType',
            render: (h, params) => {
              let text = '';
              switch (params.row['d3CanVcuBmsHistoryBean'].dataType) {
                case 1:
                  text = '实时';
                  break;
                case 2:
                  text = '补发';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            width: 160,
            render: (h, params) => {
              if (!params.row['d3CanVcuBmsHistoryBean']) return '';
              let date = params.row['d3CanVcuBmsHistoryBean'].collectTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '接收时间',
            width: 160,
            key: 'receiveTime',
            render: (h, params) => {
              if (!params.row['d3CanVcuBmsHistoryBean']) return '';
              let date = params.row['d3CanVcuBmsHistoryBean'].receiveTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '总电压(V)',
            width: 100,
            key: 'totalVoltage',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].totalVoltage) : '';
            }
          },
          {
            title: '总电流(A)',
            width: 100,
            key: 'totalCurrent',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].totalCurrent) : '';
            }
          },
          {
            title: 'SOC(%)',
            width: 100,
            key: 'soc',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].soc) : '';
            }
          },
          {
            title: 'SOH(%)',
            width: 100,
            key: 'soh',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].soh) : '';
            }
          },
          {
            title: '续航里程(km)',
            width: 120,
            key: 'remainMileage',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].remainMileage ? Number.isInteger(params.row['d3CanVcuBmsHistoryBean'].remainMileage) ? params.row['d3CanVcuBmsHistoryBean'].remainMileage : params.row['d3CanVcuBmsHistoryBean'].remainMileage.toFixed(2) : '') : '';
            }
          },
          {
            title: '最高单体电压(V)',
            width: 160,
            key: 'voltageHighest',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].voltageHighest) : '';
            }
          },
          {
            title: '最高单体电压编号',
            width: 160,
            key: 'cellVoltMaxNum',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellVoltMaxNum) : '';
            }
          },
          {
            title: '单体平均电压(V)',
            width: 160,
            key: 'cellAveVolt',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellAveVolt) : '';
            }
          },
          {
            title: '最低单体电压(V)',
            width: 160,
            key: 'voltageLowest',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].voltageLowest) : '';
            }
          },
          {
            title: '单体最低电压编号',
            width: 160,
            key: 'cellVoltMinNum',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellVoltMinNum) : '';
            }
          },
          {
            title: '最高温度(℃)',
            width: 120,
            key: 'cellTempMax',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellTempMax) : '';
            }
          },
          {
            title: '最高温度点编号',
            width: 160,
            key: 'cellTempMaxNum',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellTempMaxNum) : '';
            }
          },
          {
            title: '平均温度(℃)',
            width: 120,
            key: 'battTempAvg',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].battTempAvg) : '';
            }
          },
          {
            title: '最低温度(℃)',
            width: 120,
            key: 'cellTempMin',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellTempMin) : '';
            }
          },
          {
            title: '最低温度点编号',
            width: 160,
            key: 'cellTempMinNum',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellTempMinNum) : '';
            }
          },
          {
            title: '电池单体总数',
            width: 120,
            key: 'cellTotal',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].cellTotal) : '';
            }
          },
          {
            title: '可充电储能温度探针个数',
            width: 180,
            key: 'tempSensorTotal',
            render: (h, params) => {
              return params.row['d3CanVcuBmsHistoryBean'] ? h('p', null, params.row['d3CanVcuBmsHistoryBean'].tempSensorTotal) : '';
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            // fixed: 'right',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        d5: [
          {
            type: 'index',
            title: '序号',
            width: 100,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode',
            width: 170,
            render: (h, params) => {
              return params.row['vehicle'] ? h('p', null, params.row['vehicle'].vinCode) : '';
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            width: 160,
            render: (h, params) => {
              if (!params.row['d5CanBmsBean']) return '';
              let date = params.row['d5CanBmsBean'].collectTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '接收时间',
            width: 160,
            key: 'receiveTime',
            render: (h, params) => {
              if (!params.row['d5CanBmsBean']) return '';
              let date = params.row['d5CanBmsBean'].receiveTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '总电压(V)',
            width: 100,
            key: 'requestOutputVoltage',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].requestOutputVoltage) : '';
            }
          },
          {
            title: '总电流(A)',
            width: 100,
            key: 'requestOutputCurrent',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].requestOutputCurrent) : '';
            }
          },
          {
            title: 'SOC(%)',
            width: 100,
            key: 'soc',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].soc) : '';
            }
          },
          // {
          //   title: 'SOH(%)',
          //   width: 100,
          //   key: 'soh',
          //   render: (h, params) => {
          //     return params.row['d5CanVcuBmsHistoryBean'] ? h('p', null, params.row['d5CanVcuBmsHistoryBean'].soh) : '';
          //   }
          // },
          {
            title: '续航里程(km)',
            width: 120,
            key: 'mileage',
            render: (h, params) => {
              return params.row['d5CanVcuBean'] ? h('p', null, params.row['d5CanVcuBean'].mileage ? Number.isInteger(params.row['d5CanVcuBean'].mileage) ? params.row['d5CanVcuBean'].mileage : params.row['d5CanVcuBean'].mileage.toFixed(2) : '') : '';
            }
          },
          {
            title: '最高单体电压(V)',
            width: 160,
            key: 'voltageHighest',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].voltageHighest) : '';
            }
          },
          {
            title: '最高单体电压编号',
            width: 160,
            key: 'highestVoltageNo',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].highestVoltageNo) : '';
            }
          },
          // {
          //   title: '单体平均电压(V)',
          //   width: 160,
          //   key: 'cellAveVolt',
          //   render: (h, params) => {
          //     return params.row['d5CanVcuBmsHistoryBean'] ? h('p', null, params.row['d5CanVcuBmsHistoryBean'].cellAveVolt) : '';
          //   }
          // },
          {
            title: '最低单体电压(V)',
            width: 160,
            key: 'voltageLowest',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].voltageLowest) : '';
            }
          },
          {
            title: '单体最低电压编号',
            width: 160,
            key: 'lowestVoltageNo',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].lowestVoltageNo) : '';
            }
          },
          {
            title: '最高温度(℃)',
            width: 120,
            key: 'tempHighest',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].tempHighest) : '';
            }
          },
          {
            title: '最高温度点编号',
            width: 160,
            key: 'highestTempNo',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].highestTempNo) : '';
            }
          },
          {
            title: '平均温度(℃)',
            width: 120,
            key: 'batteryAverageTemp',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].batteryAverageTemp) : '';
            }
          },
          {
            title: '最低温度(℃)',
            width: 120,
            key: 'tempLowest',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].tempLowest) : '';
            }
          },
          {
            title: '最低温度点编号',
            width: 160,
            key: 'lowestTempNo',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].lowestTempNo) : '';
            }
          },
          {
            title: '电池单体总数',
            width: 120,
            key: 'batteryCellTotal',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].batteryCellTotal) : '';
            }
          },
          {
            title: '可充电储能温度探针个数',
            width: 180,
            key: 'tempProbeTotal',
            render: (h, params) => {
              return params.row['d5CanBmsBean'] ? h('p', null, params.row['d5CanBmsBean'].tempProbeTotal) : '';
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            // fixed: 'right',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        d2: [],
        dataTypeD2: [
          {
            type: 'index',
            title: '序号',
            width: 100,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode',
            width: 170,
            render: (h, params) => {
              return params.row['vehicle'] ? h('p', null, params.row['vehicle'].vinCode) : '';
            }
          },
           {
            title: '数据类型',
            width: 150,
            key: 'dataType',
            render: (h, params) => {
              let text = '';
              switch (params.row['d2BmsHistoryBean'].dataType) {
                case 1:
                  text = '实时';
                  break;
                case 2:
                  text = '补发';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let date = params.row['d2BmsHistoryBean'].collectTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '接收时间',
            width: 160,
            key: 'receiveTime',
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let date = params.row['d2BmsHistoryBean'].receiveTime;
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '总电压(V)',
            key: 'totalVoltage',
            width: 100,
            render: (h, params) => {
              return params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].totalVoltage) : '';
            }
          },
          {
            title: '总电流(A)',
            key: 'totalCurrent',
            width: 100,
            render: (h, params) => {
              return params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].totalCurrent) : '';
            }
          },
          {
            title: '外接充电线连接状态',
            key: 'isChargerConnected',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].isChargerConnected) {
                case 0:
                  text = '外接充电线没有连接';
                  break;
                case 1:
                  text = '外接充电线连接';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: 'CP信号',
            key: 'cpSignal',
            width: 80,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].cpSignal) {
                case 0:
                  text = '无';
                  break;
                case 1:
                  text = '有';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '电池包均衡状态',
            key: 'batteryBalanceStatus',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].batteryBalanceStatus) {
                case 0:
                  text = '电池包没有均衡';
                  break;
                case 1:
                  text = '电池包正在均衡';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '冷却风扇状态',
            key: 'coldFanStatus',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].coldFanStatus) {
                case 0:
                  text = '断开';
                  break;
                case 1:
                  text = '闭合';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: 'SOC(%)',
            key: 'soc',
            width: 100,
            render: (h, params) => {
              return params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].soc) : '';
            }
          },
          {
            title: '电池组当前状态',
            key: 'batteryStatus',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].batteryStatus) {
                case 0:
                  text = '搁置';
                  break;
                case 1:
                  text = '放电';
                  break;
                case 2:
                  text = '回馈';
                  break;
                case 3:
                  text = '充电机充电';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '故障等级',
            key: 'errLevel',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].errLevel) {
                case 0:
                  text = '正常';
                  break;
                case 1:
                  text = '1级故障(报警)';
                  break;
                case 2:
                  text = '2级故障(降功率)';
                  break;
                case 3:
                  text = '3级故障(锁定输出)';
                  break;
                case 4:
                  text = '4级故障(动力切断)';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '动力电池报警指示',
            key: 'powerBatteryAlarm',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].powerBatteryAlarm) {
                case 0:
                  text = '正常';
                  break;
                case 1:
                  text = '故障报警';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '降功率等级',
            key: 'descPowerLevel',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].descPowerLevel) {
                case 0:
                  text = '无';
                  break;
                case 1:
                  text = '1级降功率(80%)';
                  break;
                case 2:
                  text = '2级降功率(50%)';
                  break;
                case 3:
                  text = '3级降功率(30%)';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '绝缘超低',
            key: 'isInsuLowest',
            width: 100,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean']) return '';
              let text = '';
              switch (params.row['d2BmsHistoryBean'].isInsuLowest) {
                case 0:
                  text = '正常';
                  break;
                case 1:
                  text = '异常';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '最高单体电压(V)',
            key: 'voltageHighest',
            width: 160,
            render: (h, params) => {
              return params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].voltageHighest) : '';
            }
          },
          {
            title: '最低单体电压(V)',
            key: 'voltageLowest',
            width: 160,
            render: (h, params) => {
              return params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].voltageLowest) : '';
            }
          },
          {
            title: '最高温度点温度(℃)',
            key: 'tempHighest',
            width: 160,
            render: (h, params) => {
              return params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].tempHighest) : '';
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        noDataTypeD2: [
          {
            type: 'index',
            title: '序号',
            width: 100,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode',
            width: 170,
            render: (h, params) => {
              return params.row['vehicle'] ? h('p', null, params.row['vehicle'].vinCode) : '';
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            width: 160,
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean'] && !params.row['d2D280bmsBean']) return '';
              let date = (params.row['d2BmsHistoryBean'] && params.row['d2BmsHistoryBean'].collectTime) || (params.row['d2D280bmsBean'] && params.row['d2D280bmsBean'].collectTime);
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '接收时间',
            width: 160,
            key: 'receiveTime',
            render: (h, params) => {
              if (!params.row['d2BmsHistoryBean'] && !params.row['d2D280bmsBean']) return '';
              let date = (params.row['d2BmsHistoryBean'] && params.row['d2BmsHistoryBean'].receiveTime) || (params.row['d2D280bmsBean'] && params.row['d2D280bmsBean'].receiveTime);
              return date ? h('p', null, this._hyTool.DateFormat(new Date(+date), 'yyyy-MM-dd hh:mm:ss')) : '';
            }
          },
          {
            title: '总电压(V)',
            key: 'totalVoltage',
            width: 100,
            render: (h, params) => {
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                return params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].totalVoltage) : '') : (params.row['d2D280bmsBean'] ? h('p', null, params.row['d2D280bmsBean'].totalVoltage) : '');
              } else {
                return '';
              }
            }
          },
          {
            title: '总电流(A)',
            key: 'totalCurrent',
            width: 100,
            render: (h, params) => {
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                return params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].totalCurrent) : '') : (params.row['d2D280bmsBean'] ? h('p', null, params.row['d2D280bmsBean'].totalCurrent) : '');
              } else {
                return '';
              }
            }
          },
          {
            title: '外接充电线连接状态',
            key: 'isChargerConnected',
            width: 160,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].isChargerConnected : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].isChargerConnected : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '外接充电线没有连接';
                  break;
                case 1:
                  text = '外接充电线连接';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: 'CP信号',
            key: 'cpSignal',
            width: 80,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].cpSignal : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].cpSignal : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '无';
                  break;
                case 1:
                  text = '有';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '电池包均衡状态',
            key: 'batteryBalanceStatus',
            width: 160,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].batteryBalanceStatus : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].batteryBalanceStatus : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '电池包没有均衡';
                  break;
                case 1:
                  text = '电池包正在均衡';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '冷却风扇状态',
            key: 'coldFanStatus',
            width: 160,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].coldFanStatus : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].coldFanStatus : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '断开';
                  break;
                case 1:
                  text = '闭合';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: 'SOC(%)',
            key: 'soc',
            width: 100,
            render: (h, params) => {
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                return params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].soc) : '') : (params.row['d2D280bmsBean'] ? h('p', null, params.row['d2D280bmsBean'].soc) : '');
              } else {
                return '';
              }
            }
          },
          {
            title: '电池组当前状态',
            key: 'batteryStatus',
            width: 160,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].batteryStatus : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].batteryStatus : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '搁置';
                  break;
                case 1:
                  text = '放电';
                  break;
                case 2:
                  text = '回馈';
                  break;
                case 3:
                  text = '充电机充电';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '故障等级',
            key: 'errLevel',
            width: 160,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].errLevel : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].errLevel : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '正常';
                  break;
                case 1:
                  text = '1级故障(报警)';
                  break;
                case 2:
                  text = '2级故障(降功率)';
                  break;
                case 3:
                  text = '3级故障(锁定输出)';
                  break;
                case 4:
                  text = '4级故障(动力切断)';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '动力电池报警指示',
            key: 'powerBatteryAlarm',
            width: 160,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].powerBatteryAlarm : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].powerBatteryAlarm : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '正常';
                  break;
                case 1:
                  text = '故障报警';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '降功率等级',
            key: 'descPowerLevel',
            width: 160,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].descPowerLevel : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].descPowerLevel : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '无';
                  break;
                case 1:
                  text = '1级降功率(80%)';
                  break;
                case 2:
                  text = '2级降功率(50%)';
                  break;
                case 3:
                  text = '3级降功率(30%)';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '绝缘超低',
            key: 'isInsuLowest',
            width: 100,
            render: (h, params) => {
              let text = '';
              let rowData;
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                rowData = params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? params.row['d2BmsHistoryBean'].isInsuLowest : '') : (params.row['d2D280bmsBean'] ? params.row['d2D280bmsBean'].isInsuLowest : '');
              } else {
                rowData = '';
              }
              switch (rowData) {
                case 0:
                  text = '正常';
                  break;
                case 1:
                  text = '异常';
                  break;
                default:
                  text = '';
              }
              return h('p', null, text);
            }
          },
          {
            title: '最高单体电压(V)',
            key: 'voltageHighest',
            width: 160,
            render: (h, params) => {
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                return params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].voltageHighest) : '') : (params.row['d2D280bmsBean'] ? h('p', null, params.row['d2D280bmsBean'].voltageHighest) : '');
              } else {
                return '';
              }
            }
          },
          {
            title: '最低单体电压(V)',
            key: 'voltageLowest',
            width: 160,
            render: (h, params) => {
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                return params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].voltageLowest) : '') : (params.row['d2D280bmsBean'] ? h('p', null, params.row['d2D280bmsBean'].voltageLowest) : '');
              } else {
                return '';
              }
            }
          },
          {
            title: '最高温度点温度(℃)',
            key: 'tempHighest',
            width: 160,
            render: (h, params) => {
              if (params.row['vehicle'] && params.row['vehicle']['matrixVersion']) {
                return params.row['vehicle']['matrixVersion'] === 1 ? (params.row['d2BmsHistoryBean'] ? h('p', null, params.row['d2BmsHistoryBean'].tempHighest) : '') : (params.row['d2D280bmsBean'] ? h('p', null, params.row['d2D280bmsBean'].tempHighest) : '');
              } else {
                return '';
              }
            }
          },
          // {
          //   title: '数据类型',
          //   width: 150,
          //   key: 'dataType',
          //   render: (h, params) => {
          //     let text = '';
          //     switch (params.row['d2BmsHistoryBean'].dataType) {
          //       case 1:
          //         text = '实时';
          //         break;
          //       case 2:
          //         text = '补发';
          //         break;
          //       default:
          //         text = '';
          //     }
          //     return h('p', null, text);
          //   }
          // },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        vehicleDetail: {}
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      let vin = this.$route.query.vin;
      if (vin) {
        this.searchData.vinCode = vin;
        setTimeout(() => {
          this.$refs.select.setQuery(vin);
          this.search();
        }, 1000);
      }
    },
    methods: {
      search (flag) {
        let searchData = {};
        if (!this.searchData.vinCode) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        searchData.vin = this.searchData.vinCode;
        // 近6小时快速查询
        if (flag === 1) {
          this.searchData.positionTimeBegin = new Date(+new Date() - (6 * 3600 * 1000));
          this.searchData.positionTimeEnd = new Date();
        }
        if (this.searchData.positionTimeBegin) {
          searchData.startDate = new Date(this.searchData.positionTimeBegin.setMilliseconds(0)).getTime();
        } else {
          delete searchData.startDate;
        }
        if (this.searchData.positionTimeEnd) {
          searchData.endDate = new Date(this.searchData.positionTimeEnd.setMilliseconds(0)).getTime();
        } else {
          delete searchData.endDate;
        }
        if (!searchData.startDate || !searchData.endDate) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '开始时间与结束时间不能为空',
            desc: '',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        if (searchData.startDate >= searchData.endDate) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '开始时间不能大于或等于结束时间',
            desc: '',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        let bol = this.checkTime(searchData.startDate, searchData.endDate, 6);
        if (!bol) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '',
            desc: '开始时间与结束时间间隔不能超过6个小时',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        this.loading = true;
        this.allList = [];
        this.currentPage = 0;
        this.totalPage = 0;
        this.totalElement = 0;
        historyCanList(searchData, res => {
          this.currentPage = 1; // 每次查询都展示当前页
          this.totalElement = res.length; // 总数量
          this.allList = res;
          this.loading = false;
          this.list = [];
          if (res.length <= 10) {
            this.list = res;
            this.totalPage = 1;
          } else {
            this.totalPage = Math.ceil(res.length / 10); // 总页数
            for (let i = 0; i <= 9; i++) {
              this.list.push(res[i]);
            }
          }
          if (this.list.length) {
            let version = this.list[0].vehicle ? this.list[0].vehicle.matrixVersion : 0;
            let commProtocolVersion = this.list[0].vehicle ? this.list[0].vehicle.commProtocolVersion : 0;
            // console.log(version);
            if (version === 0) {
              this.d3Show = true;
              this.d2Show = false;
              this.d5Show = false;
            } else if (version === 3) {
              this.d5Show = true;
              this.d3Show = false;
              this.d2Show = false;
            } else {
              this.d2Show = true;
              this.d3Show = false;
              this.d5Show = false;
              if (commProtocolVersion === 0) {
                this.d2 = this.dataTypeD2;
              } else {
                this.d2 = this.noDataTypeD2;
              }
            }
          } else {
            this.noText = '暂无数据';
          }
        }, ret => {
          this.list = [];
          this.noText = '';
          this.loading = false;
          this.$Notice.error({
            title: '获取数据失败',
            desc: ret
          });
        });
        this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      // 翻页
      changePage (page) {
        let [start, end] = [0, 0];
        if (page === 1) {
          start = 0;
          end = 9;
        } else if (page > 1 && page < this.totalPage) {
          start = Number.parseInt(`${page - 1}0`);
          end = start + 9;
        } else if (page === this.totalPage) {
          start = Number.parseInt(`${page - 1}0`);
          end = this.allList.length - 1;
        }
        this.loading = true;
        this.list = [];
        for (start; start <= end; start++) {
          this.list.push(this.allList[start]);
        }
        this.loading = false;
      },
      detail (row) {
        // console.log(JSON.stringify(row));
        this.vehicleDetail = this._hyTool.extend({}, row);
        for (let item in this.vehicleDetail) {
          if (item !== 'vehicle' && typeof this.vehicleDetail[item] === 'object') {
            if (this.vehicleDetail[item]) {
              this.vehicleDetail[item].collectTime1 = !this.vehicleDetail[item].collectTime ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail[item].collectTime), 'yyyy-MM-dd hh:mm:ss');
              this.vehicleDetail[item].receiveTime1 = !this.vehicleDetail[item].receiveTime ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail[item].receiveTime), 'yyyy-MM-dd hh:mm:ss');
            }
          }
        }
        if (row.vehicle.matrixVersion === 1 || row.vehicle.matrixVersion === 80) {
          this.d2DetailShow = true;
          this.d3DetailShow = false;
          this.d5DetailShow = false;
          this.d2_2DetailShow = false;
          this.d2AcuHistoryBean = versionData.acu;
          this.d2AdasHistoryBean = versionData.adas_1;
          this.d2BcmHistoryBean = versionData.bcm_1;
          this.d2BmsHistoryBean = row.vehicle.matrixVersion === 1 ? versionData.bms_1 : versionData.bms_80;
          this.d2DcdcHistoryBean = versionData.dcdc;
          this.d2EpsHistoryBean = versionData.eps;
          this.d2GpsHistoryBean = versionData.gps;
          this.d2HvacHistoryBean = versionData.hvac;
          this.d2IcuHistoryBean = versionData.icu;
          this.d2VersionBean = versionData.version;
          this.d2McHistoryBean = versionData.mc_1;
          this.d2ObcHistoryBean = versionData.obc;
          this.d2PepsHistoryBean = versionData.peps;
          this.d2VmsHistoryBean = versionData.vms;
        } else if (row.vehicle.matrixVersion === 2) {
          this.d2_2DetailShow = true;
          this.d2DetailShow = false;
          this.d3DetailShow = false;
          this.d5DetailShow = false;
          this.d2_2D280bmsBean = versionData.bms_80;
          this.d2_2ObcHistoryBean = versionData.obc;
          this.d2_2VmsHistoryBean = versionData.vms;
        } else if (row.vehicle.matrixVersion === 0) {
          if (this.vehicleDetail.d3CanVcuBmsHistoryBean) {
            this.vehicleDetail.d3CanVcuBmsHistoryBean.productionDate = this._hyTool.DateFormat(new Date(+this.vehicleDetail.d3CanVcuBmsHistoryBean.productionDate), 'yyyy-MM-dd');
          }
          if (this.vehicleDetail.d3CanVcuMsgHistoryBean) {
            if (this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature >= 0 && this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature <= 170) {
              this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature = '有效';
            } else if (this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature >= 171 && this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature <= 254) {
              this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature = 'Reserved';
            } else if (this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature === -2) {
              this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature = '无效';
            } else {
              this.vehicleDetail.d3CanVcuMsgHistoryBean.insideTemperature = '异常';
            }
            if (this.vehicleDetail.d3CanVcuMsgHistoryBean.setTemperature >= 36 && this.vehicleDetail.d3CanVcuMsgHistoryBean.setTemperature <= 64) {
              this.vehicleDetail.d3CanVcuMsgHistoryBean.setTemperature = '有效';
            } else if (this.vehicleDetail.d3CanVcuMsgHistoryBean.setTemperature === -2) {
              this.vehicleDetail.d3CanVcuMsgHistoryBean.setTemperature = '无效';
            } else {
              this.vehicleDetail.d3CanVcuMsgHistoryBean.setTemperature = '异常';
            }
          }
          this.d3DetailShow = true;
          this.d2DetailShow = false;
          this.d5DetailShow = false;
          this.d2_2DetailShow = false;
          this.d3CanAdasHistoryBean = versionData.adas_0;
          this.d3CanVcuBcmHistoryBean = versionData.bcm_0;
          this.d3CanVcuBmsHistoryBean = versionData.bms_0;
          this.d3CanVcuGeneralHistoryBean = versionData.general_0;
          this.d3CanVcuMcHistoryBean = versionData.mc_0;
          this.d3CanVcuMsgHistoryBean = versionData.msg_0;
          this.d3CanVcuTpmsHistoryBean = versionData.tpms_0;
        } else if (row.vehicle.matrixVersion === 3) {
          this.d5DetailShow = true;
          this.d3DetailShow = false;
          this.d2DetailShow = false;
          this.d2_2DetailShow = false;
          this.d5CanAbsBean = versionData.abs_3;
          this.d5CanHvacBean = versionData.hvac_3;
          this.d5CanBcmBean = versionData.bcm_3;
          this.d5CanAcuBean = versionData.acu_3;
          this.d5CanBmsBean = versionData.bms_3;
          this.d5CanEpsBean = versionData.eps_3;
          this.d5CanIpkBean = versionData.ipk_3;
          this.d5CanMcuBean = versionData.mc_3;
          this.d5CanObcBean = versionData.obc_3;
          this.d5CanVcuBean = versionData.vcu_3;
        }
      },
      cancel () {
        if (this.d2DetailShow) {
          this.d2DetailShow = false;
          document.getElementById('outerDiv1').scrollTop = 0;
        } else if (this.d3DetailShow) {
          this.d3DetailShow = false;
          document.getElementById('outerDiv2').scrollTop = 0;
        } else if (this.d2_2DetailShow) {
          this.d2_2DetailShow = false;
          document.getElementById('outerDiv2_2').scrollTop = 0;
        } else {
          this.d5DetailShow = false;
          document.getElementById('outerDiv3').scrollTop = 0;
        }
      }
    },
    watch: {
      // 若无数据，则提示居中显示
      list (value) {
        if (!value.length) {
          let divs = document.getElementsByClassName('ivu-table-wrapper');
          let tableWidth = this.$refs.tables.tableWidth;
          let clientWidth = null;
          for (let div of divs) {
            clientWidth = div.clientWidth;
            if (tableWidth > clientWidth) {
              let noData = document.getElementsByClassName('ivu-table-tip');
              for (let tds of noData) {
                let tdStyle = tds.getElementsByTagName('td')[0];
                tdStyle.style.textAlign = 'left';
                tdStyle.style.paddingLeft = `${clientWidth / 2 + tds.scrollLeft}px`;
              }
            }
          }
        }
      }
    }
  };
</script>
