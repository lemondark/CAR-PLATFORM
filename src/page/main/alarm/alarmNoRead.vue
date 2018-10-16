/**
* 作者：szh
* 时间：2018-01-31
* 描述：未读报警
**/
<style lang="scss" scoped>
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
        @current-change="_getList"></hy-page>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import { listNoRead, countNo } from '@/service/alarmService/nationalStandard';
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: {
      HyTable
    },
    mixins: [list],
    data () {
      return {
        loading: false,
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
            title: '报警时间',
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
          },
          {
            title: '操作',
            width: 100,
            fixed: 'right',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                params.row.commProtocolVersion === 0 ? this._hyTool.createIcon(h, params, this.detail, '报警详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '报警详情', placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
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
      countNo({}, res => {
        this.ALARM_NUM(res);
      });
      if (this.$route.query.current) {
        if (this.$route.query.current.flag === 4) {
          this.currentChange(this.$route.query.current.currentPage);
        }
      }
    },
    methods: {
      ...mapMutations([
        'TASK_NUM',
        'ALARM_NUM'
      ]),
      // 实时报警
      _getList (page, flag) {
        if (window.sessionStorage.getItem('alarmParams')) {
          let detailPara = JSON.parse(this._hyTool.getStore('alarmParams'));
          this._hyTool.removeStore('alarmParams');
          //  setTimeout(() => {
          this._getList(detailPara.pageNum);
          //  }, 500);
          // this._hyTool.removeStore('alarmParams');
        } else {
          this._hyTool.removeStore('alarmParams');
          if (page) {
            this.searchData.pageNum = page;
            this.searchPageData.pageNum = page;
          }
          // 查询按钮
          if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
          listNoRead(this.searchPageData, this.callback, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '查询实时报警失败',
              desc: ret
            });
          });
        }
      },
      detail (row) {
        let params = {};
        params = {
          vin: row.vin,
          type: 4,   // 区分报警详情类型
          flag: 1,   // 实时
          pageNum: this.searchData.pageNum,
          collectTime: row.startTime
        };
        if (!window.sessionStorage.getItem('alarmParams')) {
          this._hyTool.setStore('alarmParams', params);
          this.$router.push({path: '/main/alarm/alarmDetail'});
        }
      },
      noState () {}
    }
  };
</script>
