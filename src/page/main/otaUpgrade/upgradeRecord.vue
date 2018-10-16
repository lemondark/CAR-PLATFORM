<!-- 
author:zhangxiahui
time:20180913
desc:升级记录
-->
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
              v-model="searchData.vinCode"
              filterable
              remote
              transfer
              clearable
              ref="select"
              :remote-method="vinMethod"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Input placeholder="GPRS号" v-model.trim="searchData.gprs" style="width:200px;" clearable></Input>
          </FormItem>
          <FormItem label="">
            <DatePicker type="datetime" v-model="searchData.callTimeBegin" placement="bottom" placeholder="开始日期" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
          <FormItem label="">
            <DatePicker type="datetime" v-model="searchData.callTimeEnd" placement="bottom" placeholder="结束日期" style="width: 200px;"></DatePicker>
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
      <!-- 详情 -->
      <Modal v-model="detailShow" :mask-closable="false" :width="800" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>升级记录详情</span>
        </p>
        <div style="text-align:left">
          <hy-detail :form="detailData" :rowData="detailList" v-if="detailShow"></hy-detail>
          <!--<hr v-if="data.value !== fourList.length" class="hy_solid"/>-->
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="detailShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { getRecordList } from '@/service/otaUpgrade/otaUpgradeRecord';
  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list, storeVin],
    data () {
      return {
        loading: false,
        detailShow: false,
        searchData: {},
        detailData: {},
        optionsCar: [],       // 车辆列表
        detailList: [
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: '服务器名称',
            key: 'serverName'
          },
          {
            title: 'GPRS号',
            key: 'gprs'
          },
          {
            title: '车载终端制造商ID',
            key: 'terminalManufacturerId'
          },
          {
            title: '升级前版本',
            key: 'oldVersion'
          },
          {
            title: '升级后版本',
            key: 'newVersion'
          },
          {
            title: '升级URL',
            key: 'url'
          },
          {
            title: '时限',
            key: 'timeLimit'
          },
          {
            title: '升级状态',
            key: 'status'
          },
          {
            title: '错误信息',
            key: 'errorMsg'
          }
        ],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 200,
            key: 'vinCode'
          },
          {
            title: 'GPRS号',
            width: 200,
            key: 'gprs'
          },
          {
            title: '升级前版本',
            key: 'oldVersion'
          },
          {
            title: '升级后版本',
            key: 'newVersion'
          },
          {
            title: '发送时间',
            key: 'callTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'callTime');
            }
          },
          {
            title: '升级状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status === 0) {
                return '升级中';
              } else if (params.row.status === 1) {
                return '升级成功';
              } else {
                return '升级失败';
              }
            }
          },
          {
            title: '错误信息',
            key: 'errorMsg',
            width: 200
          },
          {
            title: '状态更新时间',
            key: 'updateTime',
            render: (h, params) => {
              if (params.row.status !== 0) {
                return this.__filters.formatTime(h, params, 'updateTime');
              } else {
                return '';
              }
            }
          },
          {
            title: '操作',
            width: 80,
            fixed: 'right',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
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
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        this.searchPageData.callTimeBegin && (this.searchPageData.callTimeBegin = new Date(this.searchPageData.callTimeBegin).getTime());
        this.searchPageData.callTimeBegin === '' && (this.searchPageData.callTimeBegin = null);
        this.searchPageData.callTimeEnd && (this.searchPageData.callTimeEnd = new Date(this.searchPageData.callTimeEnd).getTime());
        this.searchPageData.callTimeEnd === '' && (this.searchPageData.callTimeEnd = null);
        getRecordList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          let text = '查询失败！';
          if (ret) text = ret;
          this.$confirm(text, {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'error'
          }).then(() => {
          }).catch(() => {
          });
        });
        this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      detail (row) {
        this.detailData = this._hyTool.deepCopy(row);
        this.detailData.serverName = row.serverBean && row.serverBean.serverName ? row.serverBean.serverName : '';
        if (this.detailData.status === 0) {
          this.detailData.status = '升级中';
        } else if (this.detailData.status === 1) {
          this.detailData.status = '升级成功';
        } else {
          this.detailData.status = '升级失败';
        }
        this.detailShow = true;
      },
      close () {
        this.modalShow = false;
      },
      // 车辆搜索
      remoteMethod (query) {
        if (query !== '') {
          this.loading1 = true;
          setTimeout(() => {
            this.loading1 = false;
            this.optionsCar = this.carList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.optionsCar = [];
        }
      }
    }
  };
</script>