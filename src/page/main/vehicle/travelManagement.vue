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
            <Select
              style="width: 200px;"
              placeholder="VIN码"
              v-model="searchData.vinCode"
              filterable
              remote
              clearable
              transfer
              ref="select"
              :remote-method="vinMethod"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <i-input placeholder="车牌号" v-model="searchData.plateNo" style="width: 200px;" clearable></i-input>
            <!--<Select-->
            <!--placeholder="车牌号"-->
            <!--v-model="searchData.plateNo"-->
            <!--filterable-->
            <!--remote-->
            <!--clearable-->
            <!--:remote-method="remoteMethod"-->
            <!--:loading="loading1">-->
            <!--<Option v-for="(option, index) in optionsCar" :value="option.value" :key="index" :label="option.label"></Option>-->
            <!--</Select>-->
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success"  @click="exports" shape="circle"
                    style="margin-left: 10px;margin-top: 1px" class="export">导出
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
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { travelManagement, travelExport } from '@/service/vehicleManageService/travelManagement';
  import { vehicleList } from '@/service/vehicleManageService/vehicleService';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import HyDetail from '@/components/common/detail/detail.vue';
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list, storeVin],
    data () {
      return {
        searchData: {
        },
        optionsCar: [],       // 车辆列表
        loading: false,
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
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: '车牌号',
            key: 'plateNo'
          },
          {
            title: '本次行驶里程(km)',
            key: 'travelMileage'
          },
          {
            title: '最高车速(km/h)',
            key: 'maxSpeed'
          },
          {
            title: '行驶开始时间',
            key: 'startTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            title: '行驶结束时间',
            key: 'endTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'endTime');
            }
          },
          {
            title: '急加速次数',
            key: 'rapidAcceleration'
          },
          {
            title: '急减速次数',
            key: 'rapidDeceleration'
          },
          {
            title: '急转弯次数',
            key: 'sharpTurn'
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      this.getVehicleList();
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      _getList (page, flag) {
        this.loading = true;
        if (!this.searchData.vinCode) {
          delete this.searchData.vinCode;
        }
        if (!this.searchData.plateNo) {
          delete this.searchData.plateNo;
        }
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        travelManagement(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询操作列表失败',
            desc: ret
          });
        });
        if (this.searchData.vinCode) this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      // 车辆搜索
      // remoteMethod (query) {
      //   if (query !== '') {
      //     this.loading1 = true;
      //     let params = {
      //       pageSize: 10,
      //       pageNum: 1,
      //       plateNo: query
      //     };
      //     vehicleList(params, res => {
      //       const vinList = res.map(item => {
      //         return {value: item.vinCode, label: `【${item.vinCode}】【${!item.plateNo === true ? '无车主' : item.plateNo}】`};
      //       });
      //       setTimeout(() => {
      //         this.loading1 = false;
      //         this.optionsVin = vinList.filter(item => {
      //           return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
      //         });
      //       }, 200);
      //     });
      //   } else {
      //     this.optionsCar = [];
      //   }
      // },
      // 获取车辆列表
      getVehicleList () {
        vehicleList({}, res => {
          this.vinList = res.map(item => {
            return {value: item.vinCode, label: item.vinCode};
          });
          this.carList = res.map(item => {
            return {value: item.plateNo, label: item.plateNo};
          });
          for (let i = this.carList.length - 1; i < this.carList.length; i--) {
            if (!this.carList[i].value) {
              this.carList.splice(i, 1);
            }
          }
        });
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
        travelExport(this.searchData, res => {
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
