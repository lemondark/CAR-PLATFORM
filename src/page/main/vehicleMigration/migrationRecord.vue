/**
* 作者：szh
* 时间：2018-06-08
* 描述：迁移记录
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
            <Select
              placeholder="VIN码"
              style="width: 200px;"
              v-model="searchData.vin"
              filterable
              remote
              transfer
              clearable
              :remote-method="vinMethod"
              ref="select"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <i-select v-model="searchData.batchNum" clearable placeholder="迁移批次" style="width:200px;" filterable>
              <i-option v-for="item in recordBatch" :value="item.value" :key="item.value" :label="item.label"></i-option>
            </i-select>
          </FormItem>
          <FormItem label="">
            <i-select v-model="searchData.result" clearable placeholder="迁移状态" style="width:200px;">
              <i-option value="0">失败</i-option>
              <i-option value="1">成功</i-option>
              <i-option value="2">进行中</i-option>
            </i-select>
          </FormItem>
          <FormItem label="">
            <i-select v-model="searchData.transferType" clearable placeholder="迁移方式" style="width:200px;">
              <i-option value="1">网关</i-option>
              <i-option value="2">短信</i-option>
            </i-select>
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

      <!--详情-->
      <Modal v-model="detailShow" :mask-closable="false" width="850" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left">
          <hy-detail :form="modalFormData" :rowData="modalDetailItem" v-if="detailShow"></hy-detail>
          <!-- <hy-table :column-type="columnAuthType" :columnsTitle="detailColumns" :list="detailData" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :no-data-text="noDataText" style="margin-top: 30px;height:250px;">
         </hy-table> -->
          <Table  border :columns="detailColumns" :data="detailData" style="margin-top: 30px;"></Table>
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
  import HyDetail from '@/components/common/detail/detail.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { Result, ResultDetail, ByIds } from '@/service/vehicleMigration/vehicleMigration';
  import button from '@/js/mixins/button';

  export default {
    components: {
      HyTable,
      HyDetail
    },
    mixins: [list, button, storeVin],
    data () {
      return {
        searchData: {},
        modalFormData: {},
        detailShow: false,
        modalDetailItem: [
          {
            title: 'vin码',
            key: 'vin'
          },
          {
            title: 'GPRS号',
            key: 'gprs'
          },
          {
            title: '车系',
            key: 'vehicleSerial'
          },
          {
            title: '车型',
            key: 'vehicleModel'
          }
        ],
        // 列表展示的数据
        columnAuthType: 'index',
        recordBatch: [],
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 180,
            key: 'vin'
          },
          {
            title: 'GPRS号',
            width: 180,
            key: 'gprs'
          },
          {
            title: '车系',
            width: 110,
            key: 'vehicleSerial'
          },
          {
            title: '车型',
            width: 160,
            key: 'vehicleModel'
          },
          {
            title: '迁移批次',
            width: 90,
            key: 'batchNum'
          },
          {
            title: '迁移方式',
            key: 'transferType',
            width: 90,
            render: (h, params) => {
              return params.row['transferType'] === 1 ? '网关' : '短信';
            }
          },
          {
            title: '迁移状态',
            key: 'result',
            width: 90,
            render: (h, params) => {
              if (params.row['result'] === 1) return '成功';
              else if (params.row['result'] === 0) return '失败';
              else if (params.row['result'] === 2) return '进行中';
            }
          },
          {
            title: '迁移时间',
            width: 180,
            key: 'transferTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'transferTime');
            }
          },
          {
            title: '数据上报时间',
            key: 'dataReportTime',
            width: 180,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'dataReportTime');
            }
          },
          {
            title: '失败原因',
            key: 'reason',
            width: 190
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.getDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                params.row.result === 0 && this.buttonShow('车辆迁移') ? this._hyTool.createIcon(h, params, this.backMigration, '迁移', {color: '#4885FF', type: 'zhuanyi', size: '20', content: '迁移', placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
        ],
        detailColumns: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '迁移批次',
            width: 90,
            key: 'batchNum'
          },
          {
            title: '迁移方式',
            width: 90,
            key: 'transferType',
            render: (h, params) => {
              return params.row['transferType'] === 1 ? '网关' : '短信';
            }
          },
          {
            title: '迁移状态',
            width: 90,
            key: 'result',
            render: (h, params) => {
              if (params.row['result'] === 1) return '成功';
              else if (params.row['result'] === 0) return '失败';
              else if (params.row['result'] === 2) return '进行中';
            }
          },
          {
            title: '迁移时间',
            key: 'transferTime',
            width: 150,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'transferTime');
            }
          },
          {
            title: '数据上报时间',
            key: 'dataReportTime',
            width: 150,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'dataReportTime');
            }
          },
          {
            title: '失败原因',
            key: 'reason',
            width: 170
          }
        ],
        detailData: []
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      for (let i = 1; i <= 99; i++) {
        this.recordBatch.push({value: i, label: `${i}`});
      }
    },
    methods: {
      // 列表
      _getList (page, flag) {
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        this.loading = true;
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        Result(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询迁移列表失败',
            desc: ret
          });
        });
         if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      // 详情
      getDetail (row) {
        this.detailShow = true;
        this.modalFormData = this._hyTool.deepCopy(row);
        let detailMask = {
          resultId: row.id
        };
        ResultDetail(detailMask, res => {
          this.detailData = res;
        }, ret => {
          this.$Notice.error({
            title: '查询迁移列表详情失败',
            desc: ret
          });
        });
      },
      // 迁移
      backMigration (row) {
        this.$confirm('开始迁移', '提示', {
          showConfirmButton: true,
          showCancelButton: true,
          type: 'warning'
        }).then(() => {
          ByIds({ids: row.id}, res => {
            this.$Notice.success({
              title: '开始迁移完成'
            });
            setTimeout(() => {
              this._getList(1, true);
            }, 1000);
          }, ret => {
            this.$Notice.error({
              title: '开始迁移失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      }
    }
  };
</script>
