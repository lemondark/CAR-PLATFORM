/**
* 作者：szh
* 时间：2018-01-25
* 描述：维修保养
**/
<style lang="scss" scoped>
  h2 {
    font-size: 15px;
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
              placeholder="VIN码"
              style="width: 200px"
              :class="warnTip"
              v-model="searchData.vin"
              filterable
              remote
              transfer
              clearable
              ref="select"
              :remote-method="vinMethod"
              :not-found-text="notFoundText"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <i-input placeholder="车牌号" v-model.trim="searchData.plateNo" style="width:200px;" clearable></i-input>
          </FormItem>
          <FormItem label="">
            <i-input placeholder="车主姓名" v-model.trim="searchData.ownerName" style="width:200px;" clearable></i-input>
          </FormItem>
          <FormItem>
            <i-select placeholder="维修类型" v-model="searchData.serviceType" style="width:200px;" clearable>
              <i-option v-for="item in mType" :value="item.value" :key="item.value" :label="item.label"></i-option>
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
      <!-- 详情 -->
      <Modal v-model="modalShow" :mask-closable="false" :width="800" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>维修保养信息详情</span>
        </p>
        <div style="text-align:left" v-for="data in fourList">
          <h2>{{data.label}}</h2>
          <hy-detail :key="data.value" :form="detailData" :rowData="data.list" v-if="modalShow"></hy-detail>
          <!--<hr v-if="data.value !== fourList.length" class="hy_solid"/>-->
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="modalShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { maintenance, vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  let isFirst = true;
  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list, storeVin],
    data () {
      return {
        warnTip: 'warn',
        loading: false,
        modalShow: false,
        searchData: {},
        detailData: {},
        optionsCar: [],       // 车辆列表
        mType: [
          {
            value: 12170005,
            label: '索赔'
          },
          {
            value: 12170010,
            label: '免保'
          },
          {
            value: 12170015,
            label: '小修'
          }
        ],
        fourList: [
          {
            value: 1,
            label: '基本信息',
            list: [
              {
                title: 'VIN码',
                key: 'vin'
              },
              {
                title: '车牌号',
                key: 'plateNo'
              },
              {
                title: '车系',
                key: 'seriesCode'
              },
              {
                title: '车型',
                key: 'modelName'
              },
              {
                title: '车主姓名',
                key: 'ownerName'
              },
              {
                title: '行驶里程',
                key: 'mileageSum'
              },
              {
                title: '电池包编号',
                key: 'batteryPackNo'
              }
            ]
          },
          {
            value: 2,
            label: '服务站信息',
            list: [
              {
                title: '委托书编号',
                key: 'soNo'
              },
              {
                title: '进场时间',
                key: 'comingTime'
              },
              {
                title: '服务站名称',
                key: 'stationName'
              }
            ]
          },
          {
            value: 3,
            label: '项目信息',
            list: [
              {
                title: '付款方式',
                key: 'payMode'
              },
              {
                title: '付款方式详情',
                key: 'payModeDetail'
              },
              {
                title: '维修材料详情',
                key: 'spDetail'
              },
              {
                title: '维修项目详情',
                key: 'siDetail'
              },
              {
                title: '维修工时',
                key: 'actManHours'
              },
              {
                title: '索赔工时',
                key: 'stdManHours'
              }
            ]
          },
          {
            value: 4,
            label: '故障信息',
            list: [
              {
                title: '故障描述',
                key: 'soFaultDesc'
              },
              {
                title: '维修类型',
                key: 'serviceType',
                array: [
                  {
                    value: 12170005,
                    label: '索赔'
                  },
                  {
                    value: 12170010,
                    label: '免保'
                  },
                  {
                    value: 12170015,
                    label: '小修'
                  }
                ]
              },
              {
                title: '故障原因',
                key: 'soFaultCause'
              }
            ]
          }
        ],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 165,
            key: 'vin'
          },
          {
            title: '车牌号',
            key: 'plateNo'
          },
          {
            title: '车主姓名',
            key: 'ownerName'
          },
          {
            title: '进场日期',
            key: 'comingTime',
            render: (h, params) => {
              let text = '';
              if (params.row.comingTime) {
                text = params.row.comingTime.substring(0, 10);
              }
              return h('span', text);
              //  return this.__filters.formatDate(h, params, 'comingTime');
            }
          },
          {
            title: '服务站名称',
            key: 'stationName'
          },
          {
            title: '维修类型',
            key: 'serviceType',
            render: (h, params) => {
              let name = '';
              for (let i = 0; i < this.mType.length; i++) {
                if (parseInt(params.row.serviceType) === this.mType[i].value) {
                  name = this.mType[i].label;
                }
              }
              return h('span', {}, name);
            }
          },
          {
            title: '故障说明',
            key: 'fpDetail'
          },
          {
            title: '操作',
            width: 80,
            fixed: 'right',
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
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 列表
      _getList (page, flag) {
        this.loading = true;
        if (!this.searchData.vin && !this.searchData.plateNo) {
          this.loading = false;
          if (!isFirst) {
            this.warnTip = 'warncolor';
            return;
          }
          isFirst = false;
          return;
        } else {
          this.warnTip = 'warn';
        }
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        maintenance(this.searchPageData, this.callback, ret => {
          this.loading = false;
          let text = '查询维修保养失败';
          if (ret) {
            text = ret;
          }
          this.$confirm(text, '', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        });
        this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      detail (row) {
        this.detailData = this._hyTool.deepCopy(row);
        this.modalShow = true;
      },
      close () {
        this.modalShow = false;
      },
      // 车辆搜索
      remoteMethod (query) {
        if (query !== '') {
          this.loading1 = true;
          setTimeout(() => {
            this.loading1 = false;
            this.optionsCar = this.carList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.optionsCar = [];
        }
      },
      // 获取车辆列表
      getVehicleList () {
        vehicleListAll(null, res => {
          this.vinList = res.map(item => {
            return {value: item.vinCode, label: `【${item.vinCode}】【${!item.plateNo === true ? '无车主' : item.plateNo}】`};
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
      }
    },
    beforeDestroy () {
      isFirst = true;
    }
  };
</script>
