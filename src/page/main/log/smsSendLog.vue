/**
* 作者：szh
* 时间：2018-03-26
* 描述：短信发送记录
*/
<style lang="scss" scoped>
  .hy-sleft {
    width: 90%;
    float: left;
  }
  .hy-sright {
    width: 10%;
    float: right;
  }
  .clearfix{
    clear:both;
    zoom:1;
    overflow: hidden;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <div class="hy-sleft">
          <Form label-position="right" inline :label-width="10">
            <FormItem label="" >
              <Select placeholder="短信供应商" v-model="searchData.vendor" style="width: 200px;" clearable>
                <Option v-for="item in smsType" :value="item.value" :key="item.value" :label="item.label"></Option>
              </Select>
            </FormItem>
            <FormItem>
              <i-input placeholder="手机号" v-model="searchData.phoneNumbers" clearable style="width: 200px;"></i-input>
            </FormItem>
            <FormItem label="">
              <DatePicker type="date" :options="disabledDate" v-model="searchData.timeBegin" placement="bottom" placeholder="开始日期" style="width: 200px;"></DatePicker>
            </FormItem>
            <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
            <FormItem label="">
              <DatePicker type="date" :options="disabledDate" v-model="searchData.timeEnd" placement="bottom" placeholder="结束日期" style="width: 200px;"></DatePicker>
            </FormItem>
            <FormItem>
              <i-input placeholder="短信内容" v-model="searchData.content" clearable style="width: 200px;"></i-input>
            </FormItem>
            <FormItem label="">
              <Select v-model="searchData.state" placeholder="状态" style="width:200px;" clearable>
                <Option value="0">失败</Option>
                <Option value="1">成功</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
        <div class="hy-sright">
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
        </div>
        <div class="clearfix"></div>
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
      <Modal v-model="detailShow" :mask-closable="false" width="800">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left;height: 350px;">
          <hy-detail :form="detailData" :rowData="modalDetailItem" v-if="detailShow"></hy-detail>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px;" @click="detailShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import { smsSendList } from '@/service/baseInfo/smsSendLog';
  import list from '@/js/mixins/list';
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table';
  import HyDetail from '@/components/common/detail/detail';
  export default {
    components: {
      HyTable,
      HyDetail
    },
    mixins: [list, date],
    data () {
      return {
        searchData: {},
        loading: false,
        loading1: false,
        detailShow: false,
        detailData: {},
        optionsVin: [],
        smsType: [
          {
            label: '阿里',
            value: 0
          }
        ],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            title: '序号',
            width: 80,
            type: 'index'
          },
          {
            title: '短信供应商',
            width: 100,
            key: 'vendor',
            render: (h, params) => {
              switch (params.row['vendor']) {
                case 0:
                  return '阿里';
                default:
                  return '';
              }
            }
          },
          {
            title: '手机号',
            width: 130,
            key: 'phoneNumbers',
            render: (h, params) => {
              let text = params.row['phoneNumbers'];
              if (text && text.length > 30) {
                text = `${params.row['phoneNumbers'].substring(0, 30)}......`;
              }
              return text;
            }
          },
          {
            title: '短信内容',
            width: 220,
            key: 'content',
            render: (h, params) => {
              let text = params.row['content'];
              if (text && text.length > 30) {
                text = `${params.row['content'].substring(0, 30)}......`;
              }
              return text;
            }
          },
          {
            title: '发送时间',
            key: 'sendDate',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'sendDate');
            }
          },
          {
            title: '状态',
            key: 'state',
            width: 100,
            render: (h, params) => {
              switch (params.row['state']) {
                case 0:
                  return '失败';
                case 1:
                  return '成功';
                default:
                  return '';
              }
            }
          },
          {
            title: '业务',
            key: 'business',
            width: 120,
            render: (h, params) => {
              switch (params.row['business']) {
                case 0:
                  return '报警通知';
                case 1:
                  return '远程唤醒';
                case 2:
                  return '远程升级';
                case 3:
                  return '参数设置';
                case 4:
                  return '参数查询';
                default:
                  return '';
              }
            }
          },
          {
            title: '错误码',
            width: 250,
            key: 'errorCode',
            render: (h, params) => {
              let text = params.row['errorCode'];
              if (text && text.length > 200) {
                text = `${params.row['errorCode'].substring(0, 200)}......`;
              }
              return text;
            }
          },
          {
            title: '错误信息',
            width: 250,
            key: 'errorMsg',
            render: (h, params) => {
              let text = params.row['errorMsg'];
              if (text && text.length > 200) {
                text = `${params.row['errorMsg'].substring(0, 200)}......`;
              }
              return text;
            }
          },
          {
            title: '发送条数',
            width: 130,
            key: 'batchNum'
          },
          {
            title: '操作',
            fixed: 'right',
            width: 120,
            key: 'action',
            render: (h, params) => {
              return this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true});
            }
          }
        ]
      };
    },
    methods: {
      // 列表
      _getList (page, flag) {
        if (this.searchData.timeBegin) {
          this.searchData.sendDateBegin = new Date(this.searchData.timeBegin).setHours(0, 0, 0, 0);
        } else {
          delete this.searchData.sendDateBegin;
        }
        if (this.searchData.timeEnd) {
          this.searchData.sendDateEnd = new Date(this.searchData.timeEnd).setHours(23, 59, 59, 0);
        } else {
          delete this.searchData.sendDateEnd;
        }
        if (this.searchData.sendDateBegin > this.searchData.sendDateEnd) {
          if (this.isFirst) return;
          this.isFirst = true;
          this.$Notice.warning({
            title: '',
            desc: '开始日期不能大于结束日期',
            onClose: () => {
              this.isFirst = false;
            }
          });
          return;
        }
        let bol = this.checkDate(this.searchData.sendDateBegin, this.searchData.sendDateEnd, 7);
        if (!bol) {
          if (this.isFirst) return;
          this.$Notice.warning({
            title: '',
            desc: '开始日期与结束日期间隔不能超过七天',
            onClose: () => {
              this.isFirst = false;
            }
          });
          this.isFirst = true;
          return;
        }
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        smsSendList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询短信发送记录列表失败',
            desc: ret
          });
        });
      },
      // 详情
      detail (row) {
        this.detailData = this._hyTool.extend({}, row);
        this.detailData.sendDate = this._hyTool.DateFormat(new Date(+this.detailData.sendDate), 'yyyy-MM-dd hh:mm:ss');
        this.modalDetailItem = [
         {
           key: 'vendor',
           title: '短信供应商',
           array: [{value: 0, label: '阿里'}]
         },
         {
           key: 'sendDate',
           title: '发送日期'
         },
         {
           key: 'state',
           title: '状态',
           array: [{value: 0, label: '失败'}, {value: 1, label: '成功'}]
         },
         {
           key: 'business',
           title: '业务',
           array: [{value: 0, label: '报警通知'}, {value: 1, label: '远程唤醒'}, {value: 2, label: '远程升级'}, {value: 3, label: '参数设置'}, {value: 4, label: '参数查询'}]
         },
         {
           key: 'errorCode',
           title: '错误码'
         },
         {
           key: 'errorMsg',
           title: '错误信息'
         },
         {
           key: 'batchNum',
           title: '发送条数'
         },
         {
           key: 'phoneNumbers',
           title: '手机号'
         },
         {
           key: 'content',
           title: '短信内容'
         }
       ];
        if (row.business > 0) {
          this.modalDetailItem.push({key: 'vinCode', title: 'VIN码'});
        }
        this.detailShow = true;
      }
    }
  };
</script>
