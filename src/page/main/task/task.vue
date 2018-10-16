/**
* 作者：szh
* 时间：2018-01-29
* 描述：任务管理
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
            <i-input placeholder="任务名称" v-model.trim="searchData.name" style="width:200px;" clearable></i-input>
          </FormItem>
          <!--<FormItem label="">-->
          <!--<i-select v-model="searchData.state" clearable placeholder="任务状态" style="width:200px;">-->
          <!--<i-option v-for="item in taskState" :value="item.value" :key="item.value" :label="item.label"></i-option>-->
          <!--</i-select>-->
          <!--</FormItem>-->
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <div style="float:right">
            <i-button type="primary" v-go-back>返回</i-button>
          </div>
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
  import { taskList, cancel } from '@/service/task/task';
  import { mapMutations, mapState } from 'vuex';

  export default {
    components: {
      HyTable
    },
    mixins: [list],
    data () {
      return {
        intervalid: null,
        wakeUpDate: '',
        searchData: {},
        userInfo: {},
        // 列表展示的数据
        columnAuthType: 'index',
        taskState: [
          {
            value: 0,
            label: '等待中'
          },
          {
            value: 1,
            label: '可下载'
          },
          {
            value: 2,
            label: '下载中'
          },
          {
            value: 3,
            label: '已完成'
          },
          {
            value: 4,
            label: '已取消'
          },
          {
            value: 5,
            label: '已暂停'
          },
          {
            value: 6,
            label: '异常'
          }
        ],
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '任务名称',
            key: 'name'
          },
          {
            title: '开始任务时间',
            key: 'createTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'createTime');
            }
          },
          {
            title: '操作用户',
            key: 'createUser'
          },
          {
            title: '状态',
            key: 'state',
            render: (h, params) => {
              return this.__filters.taskState(h, params, 'state');
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                params.row.state === 1 ? this._hyTool.createIcon(h, params, this.down, '下载', {
                  color: '#6599EF',
                  type: 'xiazai1',
                  size: '21',
                  content: '下载',
                  placement: 'top',
                  showTransfer: true
                }) : null, // 取消
                params.row.state === 1 || params.row.state === 6 ? this._hyTool.createIcon(h, params, this.cancel, '删除', {
                  color: '#F31A3E',
                  type: 'qunfengshanchuchong',
                  size: '20',
                  content: '删除',
                  placement: 'top',
                  showTransfer: true
                }) : null // 取消
              ]);
            }
          }
        ]
      };
    },
    mounted () {
      let userInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
      this.searchData.createUserId = userInfo.id;
      this._getList(1, true);
    },
    computed: {
      ...mapState([
        'taskNum'
      ]),
      listLength () {
        return this.totalElement;
      }
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 列表
      _getList (page, flag) {
        this.searchData.state = '0,1,6';
        if (!this.searchData.createUserId) return;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        this.loading = true;
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        taskList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询下载任务列表失败',
            desc: ret
          });
        });
      },
      // 下载
      down (row) {
        this.loading = true;
        window.location.href = `/api/task/start/${row.id}`;
        //  window.open(`/api/task/start/${row.id}`);
        let params = {
          id: row.id
        };
        this.intervalid = setInterval(() => {
          taskList(params, res => {
            if (res[0].state !== 1) {
              this.currentChange(1);
              clearInterval(this.intervalid);
            }
          });
        }, 1000);
//        setTimeout(() => {
//          this.currentChange(1);
//        }, 2000);
      },
      // 取消下载
      cancel (row) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cancel({key: row.taskKey}, res => {
            this.$Notice.success({
              title: '删除成功',
              desc: ''
            });
            this.currentChange(1);
          }, ret => {
            this.$Notice.error({
              title: '删除失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      },
      tackLists (row) {
        let params = {
          id: row.id
        };
        taskList(params, res => {
          if (res[0].state !== 1) {
            return true;
          } else {
            return false;
          }
        }, ret => {
          return false;
        });
      }
    },
    watch: {
      listLength (val) {
        this.TASK_NUM(val);
      }
    },
    beforeDestroy () {
      clearInterval(this.intervalid);
    }
  };
</script>
