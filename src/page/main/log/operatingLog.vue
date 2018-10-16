<style lang="scss" scoped>
  .map {
    min-width: 500px;
    min-height: 400px;
    margin-top: 10px;
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
            <i-input placeholder="用户名" v-model.trim="searchData.userName" clearable  style="width:200px;"></i-input>
          </FormItem>
          <FormItem label="" >
            <i-select placeholder="操作模块" v-model="searchData.whatModule" clearable filterable   :loading="load" style="width:200px;">
              <Option v-for="(item, index) in whatModuleList" :value="item" :key="index" :label="item">
                {{ item }}
              </Option>
            </i-select>
          </FormItem>
          <FormItem label="" >
            <i-select placeholder="操作类型" v-model="searchData.whatMethod" clearable filterable  style="width:200px;" >
              <Option v-for="item in operatType" :value="item.value" :key="item.value">{{ item.value | translate }}</Option>
            </i-select>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
        </Form>
      </div>
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
      </hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="_getList"></hy-page>
      <!--详情-->
      <Modal v-model="detailShow" :mask-closable="false" width="770">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left">
          <hy-detail :form="modalFormData" :rowData="modalDetailItem" v-if="detailShow"></hy-detail>
          <hy-table :column-type="columnType" :columnsTitle="hyTitle" :list="listItem" :on-selection-change="handleSelectionChange"
                    :show-checkbox="false" :multiple-selection="multipleSelection" >
          </hy-table>
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
  import { operatingLog } from '@/service/logService/operatingLog';
  import { mapState } from 'vuex';
  import HyDetail from '@/components/common/detail/detail.vue';
  import { queryParam } from '@/service/logService/queryParam';

  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list],
    data () {
      return {
        operatType: [
        ],
        searchData: {
        },
        paramList: {},  // 存储所有联动数据
        //   keys: [],   // 存储联动数据
        hyTitle: [],
        listItem: [],
        whatModuleList: [],
        loading: false,
        load: false,
        detailShow: false, // 详情
        // 列表展示的数据
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '操作模块',
            key: 'whatModule'
          },
          {
            title: '操作类型',
            key: 'whatMethod',
            render: (h, params) => {
              return this.__filters.translate(h, params, 'whatMethod');
            }
          },
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '姓名',
            key: 'realName'
          },
          {
            title: '操作时间',
            key: 'recordTime',
            width: 180,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'recordTime');
            }
          },
          {
            title: '操作IP',
            key: 'ip',
            render: (h, params) => {
              return h('a', {style: {color: '#495060'}}, params.row['ip']);
            }
          },
          {
            title: '操作',
            fixed: 'right',
            width: 120,
            key: 'action',
            render: (h, params) => {
              return h('div', [
                params.row.data.length !== 0 ? this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
        ],
        columnsAuthTitle: [
          {
            title: '字段',
            key: 'field'
          },
          {
            title: '值',
            key: 'newValue'
          }
        ],
        columnsDeleteTitle: [
          {
            title: '字段',
            key: 'field'
          },
          {
            title: '值',
            key: 'oldValue'
          }
        ],
        columnsUpdateTitle: [
          {
            title: '字段',
            key: 'field'
            //   render: (h, params) => {
            //   if (params.row.newValue && params.row.oldValue) {
            //       return params.row.field;
            //   }
            // }
          },
          {
            title: '旧值',
            key: 'oldValue'
          },
          {
            title: '新值',
            key: 'newValue'
            //   render: (h, params) => {
            //   if (params.row.newValue && params.row.oldValue) {
            //       return params.row.newValue;
            //   }
            // }
          }
        ],
        columnsExportTitle: [
          {
            title: '导出条件',
            key: 'field'
          },
          {
            title: '值',
            key: 'oldValue'
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'level'
      ])
    },
    watch: {                // 监听模块的变化
      searchData: {
        handler (curVal) {
          if (curVal.whatModule === '') {
            delete curVal.whatMethod;
            this.operatType = [];
          } else {
            for (let key in this.paramList) {
              if (key === curVal.whatModule) {
                const valueList = this.paramList[key].map(item => {
                  return {
                    value: item,
                    label: item
                  };
                });
                this.operatType = valueList;
              }
            }
          }
        },
        deep: true
      }
    },
    methods: {
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        operatingLog(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询操作列表失败',
            desc: ret
          });
        });
        this.getWhatModule();
      },
      // 详情
      detail (row) {
        this.modalFormData = this._hyTool.deepCopy(row);
        this.listItem = row.data;
        let item = row.whatMethod;
        if (item === 'update') {
          this.hyTitle = this.columnsUpdateTitle;
          this.modalDetailItem = [
            {
              title: '修改',
              key: ''
            }
          ];
        } else if (item === 'insert') {
          this.hyTitle = this.columnsAuthTitle;
          this.modalDetailItem = [
            {
              title: '新增',
              key: ''
            }
          ];
        } else if (item === 'delete') {
          this.hyTitle = this.columnsDeleteTitle;
          this.modalDetailItem = [
            {
              title: '删除',
              key: ''
            }
          ];
        } else if (item === 'excel') {
          this.hyTitle = this.columnsExportTitle;
          this.modalDetailItem = [
            {
              title: '导出',
              key: ''
            }
          ];
        }
        //  this.modalDetailItem = [
        //   {
        //     title: '新增数据表',
        //     key: ''
        //   }
        // ];
        this.detailShow = true;
      },
      // 获取操作模块
      getWhatModule (query) {
        if (query !== '') {
          this.load = true;
          queryParam(null, res => {
            let keys = [];
            for (let key in res) {
              if (res.hasOwnProperty(key) === true) {
                keys.push(key);
              }
            }
            // const list = this.keys.map(item => {
            //   return {
            //     value: item,
            //     label: item
            //   };
            // });
            this.whatModuleList = keys;
            this.load = false;
            this.paramList = res;
          }, ret => {
            this.whatModuleList = [];
          });
          // } else {
          //   this.whatModuleList = [];
        }
      }
    }
  };
</script>
