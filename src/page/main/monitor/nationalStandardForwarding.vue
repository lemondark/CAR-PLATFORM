/**
* 描述：国标转发报文
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
            <DatePicker type="datetime" :options="disabledTime" v-model="searchData.positionTimeBegin" placement="bottom" placeholder="开始时间" :editable="false" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledTime" v-model="searchData.positionTimeEnd" placement="bottom" placeholder="结束时间" :editable="false" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="" >
            <i-select placeholder="数据类型" v-model="searchData.type" clearable filterable class="inputstyle">
              <Option v-for="item in selectTypeArray" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="primary" @click="search(1)" :loading="loading"
                    style="font-size:10px;" class="button">近6小时查询
          </i-button>
        </Form>
      </div>
      <hy-table ref="tables" :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="showCheckbox" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText"></hy-table>
      <!--<Table border ref="tables" :columns="columnsTitle" :loading="loading" :data="list" style="margin-top: 10px;margin-bottom: 20px;" :no-data-text="noDataText"></Table>-->
      <!-- 分页 -->
      <hy-page
        :current-page="currentPage"
        :total-element="totalElement"
        :total-page="totalPage"
        :show-item="5"
        @current-change="changePage"></hy-page>
      <!--<p style="float: right;padding-right: 10px;font-size: 15px;">共：{{list.length}}条</p>-->
      <!--<div class="clearfix"></div>-->
    </div>
    <!--详情-->
    <Modal v-model="detailModalShow" :mask-closable="false" width="770">
      <p slot="header" class="hy-modal-title">
        <span>{{modalTitle}}</span>
      </p>
      <div style="text-align:left">
        <hy-detail :form="modalFormData" :rowData="modalDetailItem" v-if="detailModalShow"></hy-detail>
      </div>
      <div slot="footer">
        <Button type="ghost" style="margin-left: 8px" @click="detailModalShow = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import { gbMessageList } from '@/service/monitor/nationalStandardForwarding';
  import date from '@/js/mixins/date';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyTable from '@/components/common/table/table.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';

  export default {
    components: {
      HyDetail,
      HyTable
    },
    mixins: [date, storeVin],
    data () {
      return {
        currentPage: 1, // 当前页
        totalElement: 0, // 总数量
        totalPage: 1,   // 总页数
        warnTip: 'warn',
        searchData: {
          positionTimeBegin: new Date(+new Date() - (6 * 3600 * 1000)),
          positionTimeEnd: new Date()
        },
        selectTypeArray: [{label: '车辆登入', value: '01'}, {label: '实时数据', value: '02'}, {label: '补发数据', value: '03'}, {label: '车辆登出', value: '04'}],
        loading: false,
        loading1: false,
        modalDetailShow: false,
        noDataText: '',
        showCheckbox: true,
        multipleSelection: [],
        list: [],
        allList: [],
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
            key: 'vin',
            width: 170
          },
          {
            title: '数据类型',
            key: 'type',
            width: 100,
            render: (h, params) => {
              return this.__filters.gbMessageType(h, params, 'type');
            }
          },
          {
            title: '采集时间',
            key: 'collectTime',
            width: 160
          },
          {
            title: '转发时间',
            key: 'receiveTime',
            width: 160
          },
          {
            title: '报文内容',
            // width: 1000,
            key: 'content'
            // render: (h, params) => {
            //   let content = params.row['content'];
            //   let str = '';
            //   if (content && content.length > 50) {
            //     str = `${content.substring(0, 50)}......`;
            //   }
            //   return h('p', null, str);
            // }
          }
          // {
          //   title: '操作',
          //   width: 100,
          //   key: 'action',
          //   fixed: 'right',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', {
          //       style: {textAlign: 'center'}
          //     }, [
          //       this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
          //     ]);
          //   }
          // }
        ],
        detailModalShow: false,
        modalTitle: '',
        modalFormData: {},
        modalDetailItem: []
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      search (flag) {
        let searchData = {};
        if (!this.searchData.vin) {
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        searchData.vin = this.searchData.vin;
        searchData.type = this.searchData.type;
        // 近6小时快速查询
        if (flag === 1) {
          this.searchData.positionTimeBegin = new Date(+new Date() - (6 * 3600 * 1000));
          this.searchData.positionTimeEnd = new Date();
        }
        if (searchData.type === '' || searchData.type === null) {
          delete searchData.type;
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
        this.allList = [];
        this.loading = true;
        this.currentPage = 0;
        this.totalPage = 0;
        this.totalElement = 0;
        gbMessageList(searchData, res => {
          if (!res) res = [];
          this.currentPage = 1; // 每次查询都展示当前页
          this.totalElement = res.length; // 总数量
          this.allList = res;
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
          this.loading = false;
          if (!this.list.length) {
            this.noDataText = '暂无数据';
          }
        }, ret => {
          this.list = [];
          this.noDataText = '';
          this.loading = false;
          this.$Notice.error({
            title: '获取数据失败',
            desc: ret
          });
        });
        this.storeVin(this.searchData.vin);  // 存储搜索的vin
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
      // 详情
      detail (row) {
        this.detailModalShow = true;
        this.modalTitle = '详情';
        this.modalFormData = this._hyTool.extend({}, row);
        this.modalFormData.collectTime = this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss');
        this.modalFormData.receiveTime = this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss');
        this.modalDetailItem = [
          {
            key: 'vin',
            title: 'VIN码'
          },
          {
            key: 'type',
            title: '数据类型',
            array: this.selectTypeArray
          },
          {
            key: 'collectTime',
            title: '采集时间'
          },
          {
            key: 'receiveTime',
            title: '转发时间'
          },
          {
            key: 'content',
            title: '报文内容'
          }
        ];
      },
      // table select
      handleSelectionChange (val) {
        this.multipleSelection = val;
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
