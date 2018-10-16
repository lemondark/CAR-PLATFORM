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
          <FormItem label="" >
            <i-select placeholder="操作模块" v-model="searchData.module" clearable filterable :loading="load" style="width:200px;">
              <Option v-for="(item, index) in whatModuleList" :value="item" :key="item" :label="item">
                {{ item }}
              </Option>
            </i-select>
          </FormItem>
          <FormItem label="" >
            <i-select placeholder="任务名称" v-model="searchData.operate" clearable filterable :loading="load1" style="width:200px;">
              <Option v-for="(item, index) in paramList" :value="item" :key="item" :label="item">
                {{ item }}
              </Option>
            </i-select>
          </FormItem>
          <FormItem label="">
            <Select v-model="searchData.status" placeholder="执行结果" style="width:200px;" clearable>
              <Option value="0">成功</Option>
              <Option value="1">失败</Option>
            </Select>
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
  import { scheduleLog, scheduleModule, scheduleOperate } from '@/service/logService/scheduleLog';

  export default {
    components: {
      HyTable,
      HyFormItem
    },
    mixins: [list],
    data () {
      return {
        searchData: {
        },
        paramList: [],
        paramAllList: [],
        hyTitle: [],
        listItem: [],
        whatModuleList: [],
        loading: false,
        load: false,
        load1: false,
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
            title: '任务名称',
            key: 'whatOperate'
          },
          {
            title: '执行结果',
            key: 'exeResult',
            render: (h, params) => {
              return params.row.exeResult === 0 ? '成功' : '失败';
            }
          },
          {
            title: '任务执行开始时间',
            key: 'startTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            title: '任务执行结束时间',
            key: 'endTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'endTime');
            }
          },
          {
            title: '操作IP',
            key: 'ip',
            render: (h, params) => {
              return h('a', {style: {color: '#495060'}}, params.row['ip']);
            }
          }
        ]
      };
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
        scheduleLog(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询操作列表失败',
            desc: ret
          });
        });
        this.getWhatModule();
      },
      // 获取操作模块
      getWhatModule (query) {
        if (query !== '') {
          this.load = true;
          scheduleModule(null, res => {
            this.whatModuleList = res;
            this.load = false;
          }, ret => {
            this.load = false;
            this.whatModuleList = [];
          });
          // 任务
          this.load1 = true;
          scheduleOperate(null, res => {
            this.paramAllList = res;
            this.load1 = false;
          }, ret => {
            this.paramAllList = [];
            this.load1 = false;
          });
        }
      }
    },
    watch: {                // 监听模块的变化
      searchData: {
        handler (curVal) {
          if (curVal.module === '') {
            delete curVal.module;
            delete curVal.operate;
            this.paramList = [];
          } else {
            let valueList = [];
            for (let key in this.paramAllList) {
              if (this.paramAllList[key][0] === this.searchData.module) {
                valueList.push(this.paramAllList[key][1]);
              }
            }
            this.paramList = valueList;
          }
        },
        deep: true
      }
    }
  };
</script>
