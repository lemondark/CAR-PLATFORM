
<style lang="scss" scoped>
  .bgcolor{
    background-color: #ffffff;
    height: 100%;
    .content {
      padding: 0 1.5%;
      overflow: hidden;
    }
  }
</style>

<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
      </div>
      <!--table部分-->
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="showCheckbox" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText"></hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="currentChange"></hy-page>
    </div>
  </div>
</template>
<script>
  import HyTable from '@/components/common/table/table.vue';
  import { listNoRead } from '@/service/alarmService/nationalStandard';
  import { mapState, mapMutations } from 'vuex';
  export default {
    name: 'realAlarm',
    components: {
      HyTable
    },
    data () {
      return {
        list: [],                                           // 列表展示
        loading: false,                                     // loading 动画
        loadingText: this.$store.state.loadingText,         // loading 文字
        searchData: {                                       // 搜索条件
          pageNum: this.$store.state.pageNum,             // 当前页码
          pageSize: this.$store.state.pageSize            // 分页大小
        },
        searchPageData: {
          pageNum: this.$store.state.pageNum,             // 当前页码
          pageSize: this.$store.state.pageSize            // 分页大小
        },                              // 分页筛选
        multipleSelection: [],                              // 多选
        totalElement: this.$store.state.totalElement,        // 总数量
        totalPage: this.$store.state.totalPage,        // 总页数
        showCheckbox: true,                            // table 项  动态改变列表样式，解决列表多选框中的bug
        noDataText: null,
        contentList: [],          // 报警内容
        // 列表展示的数据
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            fixed: 'left',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 170,
            fixed: 'left',
            key: 'vin'
          },
          {
            title: 'GPRS号',
            width: 170,
            key: 'gprs'
          },
          {
            title: '采集时间',
            width: 160,
            key: 'startTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            title: '接收时间',
            width: 160,
            key: 'createTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'createTime');
            }
          },
          {
            title: '报警来源',
            width: 110,
            key: 'alarmSource'
          },
          {
            title: '国标故障等级',
            key: 'gbLevel',
            width: 110,
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, this.threeAlarm, 'gbLevel', false)
              ]);
            }
          },
          {
            title: '地标故障等级',
            key: 'dbLevel',
            width: 110,
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, this.threeAlarm, 'dbLevel', false)
              ]);
            }
          },
          {
            title: '自有故障等级',
            key: 'selfLevel',
            width: 110,
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, this.threeAlarm, 'selfLevel', false)
              ]);
            }
          },
          {
            title: '报警编码',
            width: 150,
            key: 'alarmCode'
          },
          {
            title: '报警内容',
            width: 160,
            key: 'alarmContent',
            render: (h, params) => {
              let alarmContent = params.row['alarmContent'];
              if (alarmContent && alarmContent.length > 50) {
                alarmContent = `${alarmContent.substring(0, 50)}......`;
              }
              return h('p', null, alarmContent);
            }
          },
          {
            title: '类别',
            width: 100,
            key: 'alarmClazz',
            render: (h, params) => {
              return h('div', [
                this.__filters.alarmClazz(h, params, 'alarmClazz')
              ]);
            }
          },
          {
            title: '状态',
            width: 100,
            key: 'alarmStatus',
            render: (h, params) => {
              return h('div', [
                this.__filters.alarmStatus(h, params, 'alarmStatus', this.noState)
              ]);
            }
          }
          // {
          //   title: '操作',
          //   width: 100,
          //   fixed: 'right',
          //   key: 'action',
          //   render: (h, params) => {
          //     return h('div', [
          //       this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
          //     ]);
          //   }
          // }
        ]
      };
    },
    computed: {
      ...mapState([
        'taskNum',
        'alarmNum'
      ])
    },
    mounted () {
      this.$on('bridge', (val) => {
        let vinCode = val;
        // console.log('>>>>' + val);
        if (vinCode) {
          this.searchData.vin = vinCode;
          this._getList(1, true);
        }
      });
      this._getList(1, true);
    },
    methods: {
      ...mapMutations([
        'TASK_NUM',
        'ALARM_NUM'
      ]),
      // 实时报警
      _getList () {
        listNoRead(this.searchData, res => {
          this.loading = false;
          this.totalElement = res.totalElements;
          this.totalPage = res.totalPages;
          this.list = res.content ? res.content : [];
          if (this.list.length === 0) {
            this.noDataText = '暂无数据';
            this.showCheckbox = false;
          } else {
            this.noDataText = null;
            this.showCheckbox = true;
          }
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询实时报警失败',
            desc: ret
          });
        });
      },
      currentChange (val) {
        this.loading = true;
        this.searchData.pageNum = val;
        // 获取列表
        this._getList();
      },
      handleSelectionChange (val) {},
      detail (row) {
        let params = {};
        params = {
          vin: row.vin,
          type: 4,   // 区分报警详情类型
          flag: 1,   // 实时
          collectTime: row.startTime
        };
        this.$router.push({path: '/main/alarm/alarmDetail', query: params});
      },
      noState () {}
    }
  };
</script>
