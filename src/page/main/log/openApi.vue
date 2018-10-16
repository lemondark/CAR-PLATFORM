/**
* 描述：openApi调用日志
**/
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="" >
            <i-input placeholder="用户名称" v-model.trim="searchData.userName" clearable style="width: 200px"></i-input>
          </FormItem>
          <FormItem label="" >
            <i-input placeholder="API名称" v-model.trim="searchData.dataName" clearable style="width: 200px"></i-input>
          </FormItem>
          <FormItem label="">
            <Select v-model="searchData.isSuccess" placeholder="调用状态" style="width:200px;" clearable>
              <Option value="0">失败</Option>
              <Option value="1">成功</Option>
            </Select>
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
  import { openApiList } from '@/service/logService/openApiLog';
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';

  export default {
    components: {
      HyTable
    },
    mixins: [list],
    data () {
      return {
        notFoundText: '',
        searchData: {},
        loading: false,
        loading1: false,
        optionsVin: [],
        operationType: [],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            title: '序号',
            width: 60,
            type: 'index'
          },
          {
            title: '用户名称',
            key: 'userName'
          },
          {
            title: '身份识别码',
            key: 'paramAuthCode'
          },
          {
            title: 'API名称',
            key: 'dataName'
          },
          {
            title: 'APIurl',
            key: 'dataUri'
          },
          {
            title: '调用时间',
            key: 'requestTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'requestTime');
            }
          },
          // {
          //   title: '参数',
          //   key: 'operation'
          // },
          {
            title: '调用状态',
            key: 'isSuccess',
            render: (h, params) => {
              switch (params.row['isSuccess']) {
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
            title: '错误编码',
            key: 'errorCode'
          },
          {
            title: '错误信息',
            key: 'errorMessage'
          }
        ]
      };
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
        openApiList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询openApi调用日志列表失败',
            desc: ret
          });
        });
      }
    }
  };
</script>
