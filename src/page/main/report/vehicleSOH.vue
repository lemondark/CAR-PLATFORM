/**
* 作者：szh
* 时间：2018-03-22
* 描述：车辆SOH统计
**/
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
            <Select
              placeholder="VIN码"
              style="width: 200px"
              v-model="searchData.vinCode"
              filterable
              remote
              clearable
              :remote-method="vinMethod"
              ref="select"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select placeholder="电池供应商简称" v-model="searchData.batteryDelearName" style="width: 200px;" clearable>
              <Option v-for="item in supplierOptions" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select placeholder="SOH梯度" v-model="searchData.level" style="width: 200px;" clearable>
              <Option v-for="item in sohOptions" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
          class="search">查询
          </i-button>
          <i-button type="success"  shape="circle" style="margin-top: 1px;float: right;" class="export" @click="exports">导出
          </i-button>
          <div class="clearfix"></div>
        </Form>
      </div>
      <hy-table :column-type="columnAuthType" :columnsTitle="columnsAuthTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText" style="margin-top: 10px;">
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
  import { sohView, sohExport, sohSupplier } from '@/service/report/vehicleSOH';
  import list from '@/js/mixins/list';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import HyTable from '@/components/common/table/table.vue';
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: {
      HyTable
    },
    mixins: [list, storeVin],
    data () {
      return {
        searchData: {},
        loading: false,
        sohOptions: [
          {
            value: 1,
            label: '0~10%'
          },
          {
            value: 2,
            label: '10~20%'
          },
          {
            value: 3,
            label: '20~30%'
          },
          {
            value: 4,
            label: '30~40%'
          },
          {
            value: 5,
            label: '40~50%'
          },
          {
            value: 6,
            label: '50~60%'
          },
          {
            value: 7,
            label: '60~70%'
          },
          {
            value: 8,
            label: '70~80%'
          },
          {
            value: 9,
            label: '80~90%'
          },
          {
            value: 10,
            label: '90~100%'
          }
        ],
        supplierOptions: [],
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: 'GPRS号',
            key: 'gprsNo'
          },
          {
            title: '采集时间(最近一次上报时间)',
            key: 'collectTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'collectTime');
            }
          },
          {
            title: '电池包号',
            key: 'batteryPackageNo'
          },
          {
            title: '电池供应商简称',
            key: 'delearSimpleName'
          },
          {
            title: 'SOH (%)',
            key: 'soh',
            render: (h, params) => {
              let num = '';
              if (Number.isInteger(params.row['soh'])) {
                num = params.row['soh'];
              } else {
                num = params.row['soh'].toFixed(1);
              }
              return h('p', null, num);
            }
          },
          {
            title: '车辆下线日期',
            key: 'releaseTime',
            render: (h, params) => {
              return this.__filters.formatDate(h, params, 'releaseTime');
            }
          }
        ]
      };
    },
    mounted () {
      this.supplierMethod();  // 获取供应商
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
      // 列表
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        sohView(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询soh列表失败',
            desc: ret
          });
        });
      },
      supplierMethod () {
          sohSupplier({}, res => {
            this.supplierOptions = res || [];
          }, ret => {
            this.supplierOptions = [];
          });
      },
      exports () {
        this.$confirm('确认导出数据吗？', '提示', {
          showConfirmButton: true,
          showCancelButton: true
        }).then(() => {
          sohExport(this.searchData, res => {
            this.TASK_NUM(this.taskNum + 1);
            this.$Notice.success({
              title: '已添加到下载列表！'
            });
          }, ret => {
            this.$Notice.error({
              title: '加入下载列表失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      }
    }
  };
</script>
