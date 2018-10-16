/**
* 作者：szh
* 时间：2018-01-29
* 描述：终端参数设置记录日志
*/
<style lang="scss" scoped>
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
              style="width: 200px;"
              v-model="searchData.vin"
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
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
        </Form>
      </div>
      <hy-table :column-type="columnAuthType" :columnsTitle="columnsAuthTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
      </hy-table>
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
  import { batchSettingParamLog } from '@/service/remoteControlService/operationLog';
  import storeVin from '@/js/mixins/storeVin/storeVin';

  export default {
    components: {
      HyTable
    },
    mixins: [list, date, storeVin],
    data () {
      return {
        loading: false,
        searchData: {},
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode',
            width: 180
          },
          {
            title: 'GPRS号',
            width: 165,
            key: 'gprsCode'
          },
          {
            title: '下发时间',
            width: 160,
            key: 'sendTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'sendTime');
            }
          },
          {
            title: '下发参数编码',
            key: 'params',
            render: (h, params) => {
              let json = JSON.parse(params.row['params']);
              let text = '';
              for (let i in json) {
                if (!text) {
                  text = i;
                } else {
                  text = `${text}, ${i}`;
                }
              }
              return h('span', null, text);
            }
          },
          {
            title: '下发参数值',
            key: 'params',
            render: (h, params) => {
              let json = JSON.parse(params.row['params']);
              let text = '';
              for (let i in json) {
                if (!text) {
                  text = json[i];
                } else {
                  text = `${text}, ${json[i]}`;
                }
              }
              return h('span', null, text);
            }
          },
          {
            title: '下发人',
            width: 90,
            key: 'sendUser'
          }
        ]
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 列表
      _getList (page, flag) {
        if (this.searchData.timeBegin) {
          this.searchData.startDate = new Date(this.searchData.timeBegin).getTime();
        } else {
          delete this.searchData.startDate;
        }
        if (this.searchData.timeEnd) {
          this.searchData.endDate = new Date(this.searchData.timeEnd).getTime();
        } else {
          delete this.searchData.endDate;
        }
        if (this.searchData.startDate && this.searchData.endDate) {
          let bol = this.checkDate(this.searchData.startDate, this.searchData.endDate, 7);
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
          if (this.searchData.startDate > this.searchData.endDate) {
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
        }
        this.loading = true;
        if (!this.searchData.vin) delete this.searchData.vin;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        batchSettingParamLog(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '终端参数设置查询失败',
            desc: ret
          });
        });
         if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
      }
    }
  };
</script>
