/**
* 作者：szh
* 时间：2018-03-24
* 描述：绝缘报警统计
**/
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" :label-width="10" inline>
          <FormItem>
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
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeBegin" placement="bottom" placeholder="开始时间" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeEnd" placement="bottom" placeholder="结束时间" style="width: 200px;"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--工具条部分-->
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
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { insulationAlarmList } from '@/service/alarmService/insulationAlarm';

  export default {
    mixins: [list, date, storeVin],
    components: {
      HyTable
    },
    data () {
      return {
        columnType: 'index',
        loading: true,
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'gprsCode',
            title: 'GPRS号'
          },
          {
            key: 'startTime',
            title: '开始时间',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            key: 'endTime',
            title: '结束时间',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'endTime');
            }
          },
          {
            key: 'statisticsCount',
            title: '绝缘报警次数'
          },
          {
            key: 'action',
            width: 120,
            fixed: 'right',
            title: '操作',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ]
      };
    },
    created () {
      if (this.$route.query.page) {
        this.searchData.pageNum = this.$route.query.page;
      }
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      _getList (page, flag) {
        if (window.sessionStorage.getItem('insulaParams') && this.$route.query.vinCode) {
          let detailPara = JSON.parse(this._hyTool.getStore('insulaParams'));
          this._hyTool.removeStore('insulaParams');
          this.searchData = detailPara.searchData;
          if (detailPara.searchData.startTime && detailPara.searchData.endTime) {
            this.searchData.timeBegin = new Date(detailPara.searchData.startTime);
            this.searchData.timeEnd = new Date(detailPara.searchData.endTime);
          }
          this.searchPageData = this.searchData;
          this._getList(this.searchPageData.pageNum);
          // this._hyTool.removeStore('alarmParams');
        } else {
          this._hyTool.removeStore('insulaParams');
          if (!this.searchData.vinCode) delete this.searchData.vinCode;
          //  this.isFirst = false;
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
            if (this.isFirst1) return;
            this.$Notice.warning({
              title: '',
              desc: '开始时间不能大于结束时间',
              onClose: () => {
                this.isFirst1 = false;
              }
            });
            this.isFirst1 = true;
            return;
          }
          if (this.searchData.startTime && this.searchData.endTime) {
            let bol = this.checkDate(this.searchData.startTime, this.searchData.endTime, 7);
            if (!bol) {
              if (this.isFirst1) return;
              this.$Notice.warning({
                title: '',
                desc: '开始时间与结束时间间隔不能超过7天',
                onClose: () => {
                  this.isFirst1 = false;
                }
              });
              this.isFirst1 = true;
              return;
            }
          }
          if (page) {
            this.searchData.pageNum = page;
            this.searchPageData.pageNum = page;
          }
          this.loading = true;
          // 查询按钮
          if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
          insulationAlarmList(this.searchPageData, this.callback, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '查询绝缘报警失败',
              desc: ret
            });
          });
        };
         if (this.searchData.vinCode) this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      // 跳转详情
      detail (row) {
        let params = {
          startTime: row.startTime,
          endTime: row.endTime,
          searchData: this.searchData
        };
        if (!window.sessionStorage.getItem('insulaParams')) {
          this._hyTool.setStore('insulaParams', params);
          this.$router.push({path: '/main/alarm/insulationAlarmDetail', query: {vinCode: row.vinCode}});
        }
        // this.$router.push({path: '/main/alarm/insulationAlarmDetail'});
      }
    }
  };

</script>
