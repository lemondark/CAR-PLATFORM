/**
* 电池均衡统计
**/
<style lang="scss" scoped>
  .hy-right-btn {
    float: right;
    background: rgba(0, 0, 0, 0.125);
    border: 0;
    color: #777777;
  }
  .mg-t20 {
    margin-top: 20px;
  }
  .hy-search-bar2{
    margin-bottom:20px;
  }
  .title {
    padding-top: 20px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content ">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <Select
              placeholder="VIN码"
              style="width: 200px"
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
          <!--<FormItem label="">-->
          <!--<i-input placeholder="GPRS号" v-model.trim="searchData.gprsCode" clearable class="inputstyle" style="width: 200px"></i-input>-->
          <!--</FormItem>-->
          <!--<FormItem label="" >-->
          <!--<Date-picker type="datetimerange" placement="bottom" placeholder="起止时间" :options="disabledDate" v-model="startEndTime" style="width:300px;">-->
          <!--</Date-picker>-->
          <!--</FormItem>-->
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeBegin" placement="bottom" placeholder="开始时间" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeEnd" placement="bottom" placeholder="结束时间" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="">
            <i-select placeholder="等级" v-model="searchData.dataLevel" clearable filterable class="inputstyle" style="width: 200px">
              <Option v-for="item in levelArray" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <i-button type="primary" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <!--<div class="hy-tool-bar hy-tool-add">-->
          <!--<hy-icon type="tianjia" content="添加" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate()">新增</hy-icon>-->
          <!--<Button type="ghost" class="hy-search-button" :class="delClasses" shape="circle" @click="deleteArea()">删除</Button>-->
          <!--</div>-->
        </Form>

      </div>
      <!--table部分-->
      <!--<Table border :columns="columnsTitle" :data="list" @on-selection-change="handleSelectionChange"></Table>-->
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="showCheckbox" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText"></hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="_getList"></hy-page>
      <!--详情-->
      <Modal v-model="detailModalShow" :mask-closable="false" width="770">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="text-align:left">
          <div>基本信息</div>
          <hy-detail :form="modalFormData1" :rowData="modalDetailItem1" v-if="detailModalShow"></hy-detail>
          <div class="title">客户信息</div>
          <hy-detail :form="modalFormData2" :rowData="modalDetailItem2" v-if="detailModalShow"></hy-detail>
          <div class="title">统计信息</div>
          <hy-detail :form="modalFormData3" :rowData="modalDetailItem3" v-if="detailModalShow"></hy-detail>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="detailModalShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import date from '@/js/mixins/date';
  import dictionary from '@/js/mixins/dictionary';
  import button from '@/js/mixins/button';
  import { batteryBalanceStat } from '@/service/alarmService/batteryBalanceStatistics';
  import { vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyTable from '@/components/common/table/table.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  export default {
    components: {
      HyDetail,
      HyFormItem,
      HyTable
    },
    mixins: [list, dictionary, button, date, storeVin],
    data () {
      return {
        notFoundText: '',
        modalFormShow: false,
        modalTitle: '',
        formLoading: false,
        selectId: [],
        modalFormData1: {},
        modalFormData2: {},
        modalFormData3: {},
        modalFormItem: [],
        modalDetailItem1: [],
        modalDetailItem2: [],
        modalDetailItem3: [],
        detailModalShow: false,
        // 查询条件
        searchData: {},
        //  startEndTime: '',
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 220,
            key: 'vinCode'
          },
          {
            title: 'GPRS码',
            width: 220,
            key: 'gprsCode'
          },
          {
            title: '等级',
            width: 220,
            key: 'dataLevel',
            render: (h, params) => {
              return this.__filters.batteryLevel(h, params, 'dataLevel');
            }
          },
          {
            title: '开始时间',
            width: 220,
            key: 'startTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            title: '结束时间',
            key: 'endTime',
            width: 220,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'endTime');
            }
          },
          {
            title: '统计时间',
            width: 220,
            key: 'statisticsTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'statisticsTime');
            }
          },
          {
            title: '不均衡报文条数',
            width: 150,
            key: 'statisticsCount'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {textAlign: 'center'}
              }, [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        levelArray: [{label: '一级', value: 1}, {label: '二级', value: 2}, {label: '三级', value: 3}]
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      _getList (page, flag) {
        if (window.sessionStorage.getItem('batteryParams') && this.$route.query.id) {
          let detailPara = JSON.parse(this._hyTool.getStore('batteryParams'));
          this._hyTool.removeStore('batteryParams');
          this.searchData = detailPara.searchData;
          if (detailPara.searchData.startTime && detailPara.searchData.endTime) {
            this.searchData.timeBegin = new Date(detailPara.searchData.startTime);
            this.searchData.timeEnd = new Date(detailPara.searchData.endTime);
          }
          this.searchPageData = this.searchData;
          this._getList(this.searchPageData.pageNum);
          // this._hyTool.removeStore('alarmParams');
        } else {
          this._hyTool.removeStore('batteryParams');
          // this.clearSelecttion();
          // if (page) this.searchData.pageNum = page;
//        if (this.startEndTime instanceof Array && this.startEndTime[0] !== undefined && this.startEndTime[0] !== null) {
//          this.searchData.startTime = this._hyTool.DateFormat(this.startEndTime[0], 'yyyy-MM-dd hh:mm:ss');
//          this.searchData.endTime = this._hyTool.DateFormat(this.startEndTime[1], 'yyyy-MM-dd hh:mm:ss');
//        } else {
//          delete this.searchData.startTime;
//          delete this.searchData.endTime;
//        }
          if (this.searchData.timeBegin) {
            this.searchData.startTime = new Date(this.searchData.timeBegin).getTime();
          } else {
            delete this.searchData.startTime;
          }
          if (this.searchData.timeEnd) {
            this.searchData.endTime = new Date(this.searchData.timeEnd).getTime();
          } else {
            delete this.searchData.endTime;
          }
          if (this.searchData.startTime > this.searchData.endTime) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '开始时间不能大于结束时间',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
          if (this.searchData.startTime && this.searchData.endTime) {
            let bol = this.checkDate(this.searchData.startTime, this.searchData.endTime, 7);
            if (!bol) {
              if (this.isFirst) return;
              this.$Notice.warning({
                title: '',
                desc: '开始时间与结束时间间隔不能超过7天',
                onClose: () => {
                  this.isFirst = false;
                }
              });
              this.isFirst = true;
              return;
            }
          }
          this.loading = true;
          if (page) {
            this.searchData.pageNum = page;
            this.searchPageData.pageNum = page;
          }
          // 查询按钮
          if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
          batteryBalanceStat(this.searchPageData, this.callback, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '查询电池不均衡统计失败',
              desc: ret
            });
          });
        }
        if (this.searchData.vinCode) this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      detail (row) {
        let params = {
          searchData: this.searchData
        };
        if (!window.sessionStorage.getItem('batteryParams')) {
          this._hyTool.setStore('batteryParams', params);
          this.$router.push({path: '/main/alarm/batteryBalanceStatisticsDetail', query: {vinCode: row.vinCode, dataLevel: row.dataLevel, startTime: row.startTime, endTime: row.endTime}});
        }
        // this.$router.push({path: '/main/alarm/batteryBalanceStatisticsDetail'});
//        this.modalFormData3 = this._hyTool.extend({}, row);
//        this.modalFormData3.startTime = this._hyTool.DateFormat(new Date(+this.modalFormData3.startTime), 'yyyy-MM-dd hh:mm:ss');
//        this.modalFormData3.endTime = this._hyTool.DateFormat(new Date(+this.modalFormData3.endTime), 'yyyy-MM-dd hh:mm:ss');
//        this.modalFormData3.statisticsTime = this._hyTool.DateFormat(new Date(+this.modalFormData3.statisticsTime), 'yyyy-MM-dd hh:mm:ss');
//        this.modalDetailItem3 = [
//          {
//            title: '开始时间',
//            key: 'startTime'
//          },
//          {
//            title: '结束时间',
//            key: 'endTime'
//          },
//          {
//            title: '统计时间',
//            key: 'statisticsTime'
//          },
//          {
//            title: '不均衡报文条数',
//            key: 'statisticsCount'
//          },
//          {
//            title: '等级(分布)',
//            key: 'dataLevel',
//            array: [{label: '一级(0.05-0.1)', value: 1}, {label: '二级(0.1-0.2)', value: 2}, {label: '三级(>0.2)', value: 3}]
//          }
//        ];
//        this.modalTitle = '详情';
//        this.getVehicle(row.vinCode);
      },
      getVehicle (vinCode) {
        vehicleListAll({vinCode: vinCode}, res => {
          let detail = res[0];
          this.modalFormData1 = this._hyTool.extend({}, detail);
          this.modalFormData2 = this._hyTool.extend({}, detail);
          this.modalDetailItem1 = [
            {
              title: 'VIN码',
              key: 'vinCode'
            },
            {
              title: 'GPRS号',
              key: 'gprsNo'
            },
            {
              title: '车牌号',
              key: 'plateNo'
            },
            {
              title: '车系',
              key: 'carSeries'
            },
            {
              title: '车型',
              key: 'carType'
            },
            {
              title: 'BMS供应商',
              key: ''
            },
            {
              title: '电池组编号',
              key: 'batteryPackNumber'
            }
          ];
          this.modalDetailItem2 = [
            {
              title: '客户名称',
              key: 'customerName'
            },
            {
              title: '手机号码',
              key: 'customerPhone'
            }
          ];
          this.detailModalShow = true;
        }, ret => {
          this.$Notice.error({
            title: '查询车辆失败',
            desc: ret
          });
        });
      }
    }
  };
</script>
