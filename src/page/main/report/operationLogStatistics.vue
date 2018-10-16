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
            <Select placeholder="车系" v-model="searchData.vehicleSerial" @on-change="getModels" style="width: 200px;" clearable>
              <Option v-for="item in seriesList" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select placeholder="车型" v-model="searchData.vehicleType" style="width: 200px;" clearable>
              <Option v-for="item in modelList" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select placeholder="远程控制项" v-model="searchData.operation" style="width: 200px;" clearable>
              <Option v-for="item in operationType" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success" shape="circle" style="margin-left: 10px;margin-top: 1px" class="export" @click="exports">导出
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
  import date from '@/js/mixins/date';
  import HyTable from '@/components/common/table/table.vue';
  import { vehicleSerial, queryOperations, vehicleType, vehicleVin, exportByVehicleSerial, exportByVehicleType, exportByVehicle } from '@/service/report/operationLogStatistics';
  import { listAllSeries, modelList } from '@/service/vehicleManageService/basicDataService/modelService';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: {
      HyTable
    },
    mixins: [list, date, storeVin],
    data () {
      return {
        loading: false,
        modalShow: false,
        seriesList: [],
        modelList: [],
        operationType: [],
        searchData: {},
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: []
      };
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      this.getSeries();
      this.getItem();
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 列表
      _getList (page, flag) {
        if (this.searchData.operation === '') this.searchData.operation = null;
        if (this.searchData.vehicleSerial === '') this.searchData.vehicleSerial = null;
        if (this.searchData.vehicleType === '') this.searchData.vehicleType = null;
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        let apiType = null;
        this.exportType = null;
        this.columnsAuthTitle = [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: '车系',
            key: 'vehicleSerial'
          },
          {
            title: '操作名称',
            key: 'operationcn'
          },
          {
            title: '成功数量',
            key: 'successNum'
          },
          {
            title: '失败数量',
            key: 'failedNum'
          },
          {
            title: '总数',
            key: 'totalNum'
          },
          {
            title: '成功率(%)',
            key: 'successPercent',
            render: (h, params) => {
              let num = params.row['successPercent'] * 100;
              if (!Number.isInteger(num)) {
                num = num.toFixed(1);
              }
              return h('p', null, num);
            }
          }
        ];
        if (this.searchData.vin) {
          this.columnsAuthTitle = [
            {
              type: 'index',
              title: '序号',
              width: 80,
              align: 'center'
            },
            {
              title: 'VIN码',
              width: 165,
              key: 'vin'
            },
            {
              title: '车系',
              key: 'vehicleSerial'
            },
            {
              title: '车型',
              key: 'vehicleType'
            },
            {
              title: '操作名称',
              key: 'operationcn'
            },
            {
              title: '成功数量',
              key: 'successNum'
            },
            {
              title: '失败数量',
              key: 'failedNum'
            },
            {
              title: '总数',
              key: 'totalNum'
            },
            {
              title: '成功率(%)',
              key: 'successPercent',
              render: (h, params) => {
                let num = params.row['successPercent'] * 100;
                if (!Number.isInteger(num)) {
                  num = num.toFixed(1);
                }
                return h('p', null, num);
              }
            }
          ];
          apiType = vehicleVin;
          this.exportType = exportByVehicle;
        } else if (this.searchData.vehicleSerial && this.searchData.vehicleType) {
          this.columnsAuthTitle = [
            {
              type: 'index',
              title: '序号',
              width: 80,
              align: 'center'
            },
            {
              title: '车系',
              key: 'vehicleSerial'
            },
            {
              title: '车型',
              key: 'vehicleType'
            },
            {
              title: '操作名称',
              key: 'operationcn'
            },
            {
              title: '成功数量',
              key: 'successNum'
            },
            {
              title: '失败数量',
              key: 'failedNum'
            },
            {
              title: '总数',
              key: 'totalNum'
            },
            {
              title: '成功率(%)',
              key: 'successPercent',
              render: (h, params) => {
                let num = params.row['successPercent'] * 100;
                if (!Number.isInteger(num)) {
                  num = num.toFixed(1);
                }
                return h('p', null, num);
              }
            }
          ];
          apiType = vehicleType;
          this.exportType = exportByVehicleType;
        } else {
          apiType = vehicleSerial;
          this.exportType = exportByVehicleSerial;
        }
        apiType(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询远程控制统计失败',
            desc: ret
          });
        });
        if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      // 获取车系
      getSeries () {
        let params = {
          pageNum: 1,
          size: 1000
        };
        listAllSeries(params, res => {
          this.seriesList = res.content;
        });
      },
      // 获取车系对应车型
      getModels (row) {
        if (!row) {
          this.modelList = [];
          return;
        }
        let param = {
          vehicleSeries: row
        };
        modelList(param, res => {
          this.modelList = res;
        });
        this.num = false;
      },
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
        this.exportType(this.searchPageData, res => {
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
      },
      // 查询远程控制项
      getItem () {
        queryOperations(null, res => {
          for (let i in res) {
            if (i !== 'requestVehicleInfo') this.operationType.push({value: i, label: res[i]});
          }
        });
      }
    }
  };
</script>
