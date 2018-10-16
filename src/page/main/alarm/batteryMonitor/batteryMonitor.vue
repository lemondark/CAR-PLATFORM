
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
            <i-input placeholder="供应商" clearable v-model.trim="searchData.name" style="width:200px;"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--start-->
          <FormItem label="" v-show="false">
            <i-input placeholder="供应商" clearable v-model.trim="searchData.name" style="width:200px;"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--end-->
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success"  @click="exports" shape="circle"
                    style="margin-left: 10px;margin-top: 1px;font-size: 16px;" class="export">导出
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
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { batterySupplier, batteryAlarmexcel } from '@/service/alarmService/batteryAlarm';
  import { mapState, mapMutations } from 'vuex';

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
        loading: false,
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
            title: '供应商名称',
            key: 'name',
            render: (h, params) => {
              let text = !params.row.batterySupplierBean ? '' : params.row.batterySupplierBean.name;
              return h('p', null, text);
            }
          },
          {
            title: '供应商简称',
            key: 'shortName',
            width: 110,
            render: (h, params) => {
              let text = !params.row.batterySupplierBean ? '' : params.row.batterySupplierBean.shortName;
              return h('p', null, text);
            }
          },
          {
            title: '供应商代码',
            width: 120,
            key: 'code',
            render: (h, params) => {
              let text = !params.row.batterySupplierBean ? '' : params.row.batterySupplierBean.code;
              return h('p', null, text);
            }
          },
          {
            title: '安装车辆数',
            width: 100,
            key: 'vehicleCount'
          },
          // {
          //   title: '账户组',
          //   key: 'account'
          // },
          // {
          //   title: '检索项',
          //   key: 'shortName'
          // },
          {
            title: '报警次数',
            width: 120,
            key: 'alarmCount'
          },
          {
            title: '更新时间',
            key: 'updateTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            fixed: 'right',
            width: 120,
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
      if (this.$route.query.current) {
        this.currentChange(Number.parseInt(this.$route.query.current));
      }
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        batterySupplier(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.list = [];
          this.$confirm(ret, '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        });
      },
      // 详情跳转
      detail (row) {
        this.$router.push({path: '/main/alarm/batteryDetailAlarm', query: {code: row.batterySupplierBean.code, currentPage: this.searchData.pageNum}});
      },
      // 导出
      exports () {
        if (!this.list.length) {
          this.$confirm('无导出数据', '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        }
        batteryAlarmexcel(this.searchData, res => {
          this.TASK_NUM(this.taskNum + 1);
          this.$confirm('已加入下载任务', '提示', {
            confirmButtonText: '知道了',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        }, ret => {
          this.$Notice.error({
            title: '加入下载列表失败',
            desc: ret
          });
        });
      }
    }
  };
</script>
