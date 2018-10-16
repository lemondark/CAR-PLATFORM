<style lang="scss" scoped>
  .hy-tool-add {
    width: 370px;
    float: right;
    position: relative;
    cursor: default;
    text-align: center;
    border: 0;
  }
  .alarm {
    background: url(/static/images/can/alarm.png) no-repeat;
    width: 90px;
    height: 30px;
    float: left;
  }
  .normal {
    background: url(/static/images/can/normal.png) no-repeat;
    width: 90px;
    height: 30px;
    float: left;
  }
  .nodata {
    background: url(/static/images/can/nodata.png) no-repeat;
    width: 90px;
    height: 30px;
    float: left;
  }
  .nono {
    background: url(/static/images/can/nono.png) no-repeat;
    width: 90px;
    height: 30px;
    float: left;
  }
  h1 {
    font-size: 1rem;
    margin-bottom: 10px;
    margin-left: 20px;
  }
  .hy_tabs {
    margin-right: 20px;
  }
  .popper_class {
    color: red
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;padding:0;margin-bottom: 10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <Select
              placeholder="VIN码"
              style="width: 200px"
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
          <i-button type="primary" icon="ios-search" @click="search" shape="circle" :loading="loading"
                 style="font-size:16px"   class="search">查询
          </i-button>
          <!-- 添加功能 -->
          <div class="hy-tool-add">
            <!-- <div class="alarm">
              <span style="line-height: 27px;">报警</span>
            </div> -->
            <div class="normal">
              <span style="line-height: 27px;">正常</span>
            </div>
            <div class="nodata">
              <span style="line-height: 27px;padding-left: 10px;">无数据</span>
            </div>
            <div class="nono">
              <span style="line-height: 27px;padding-left: 10px;">无配置</span>
            </div>
          </div>
        </Form>
      </div>
      <!-- 国标实时can -->
      <h1>实时国标</h1>
      <hy-table :column-type="columnType" :columnsTitle="gbTitle" :list="gbList" :on-selection-change="handleSelectionChange" class="canTable"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading2" :no-data-text="noDataText">
      </hy-table>
      <hy-page
        style="padding-bottom: 50px;margin-top: 10px;"
        :current-page="gbSearch.pageNum"
        :total-element="gbTotalElement"
        :total-page="gbTotalPage"
        @current-change="gbChange"></hy-page>

      <!-- 实时can -->
      <h1>实时CAN</h1>
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange" class="canTable"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
      </hy-table>
      <!-- 分页 -->
      <hy-page
        style="margin-top: 10px;"
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="_getList"></hy-page>
      <!--详情-->
      <Modal v-model="detailModalShow" :mask-closable="false" width="980" :styles="{top: '20px'}">
        <Tabs class="hy_tabs" @on-click="changeTab" :value="currentName">
          <template v-for="tab in titles">
            <TabPane :key="tab.value" :label="tab.label" :name="tab.value">
              <!--<div style="text-align:left">-->
              <hy-detail1 :form="modalFormData" :rowData="modalFormItem" v-if="currentName === tab.value && detailModalShow" :labelWidth="250"></hy-detail1>
              <!--</div>-->
            </TabPane>
          </template>
        </Tabs>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="detailModalShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import HyTable from '@/components/common/table/table';
  import HyFormItem from '@/components/common/formItem/formItem';
  import { canList, currentList } from '@/service/monitor/realCan';
  import HyDetail1 from '@/components/common/detail/detail1';
  import versionData from '@/js/mixins/versionData';

  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail1
    },
    mixins: [list, storeVin],
    data () {
      return {
        currentName: null,
        titles: [],
        searchData: {},
        gbSearch: {},
        gbList: [],
        loading2: false,
        detailModalShow: false,
        modalTitle: '',
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
            key: 'vinCode',
            fixed: 'left',
            width: 170,
            render: (h, params) => {
              return h('a', {
                on: {
                click: () => {
                  this.goMonitor(params.row.position.vinCode);
                }
              }
              }, params.row.position.vinCode);
            }
          },
          // {
          //   title: 'GPS',
          //   key: 'gps',
          //   width: 90,
          //   render: (h, params) => {     // 0-D3, 1-双100, 2-双80
          //     if (params.row.matrixVersion === 0) {
          //       return h('div', [
          //         this._hyTool.configure(h)
          //       ]);
          //     } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 2) {
          //       const trigger = (params.row.gps === null || params.row.gps === undefined) ? null : 'hover';
          //       return h('Poptip', {
          //         props: {
          //           trigger: trigger
          //         }
          //       }, this._hyTool.tagStatus(h, params, this._getGps));
          //     }
          //   }
          // },
          {
            title: 'HVAC',
            key: 'hvac',
            width: 90,
            render: (h, params) => {     // 0-D3, 1-双100, 2-模拟双80, 80-双80，3-d5
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 2) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 3 || params.row.matrixVersion === 80) {
                const trigger = (params.row.hvac === null || params.row.hvac === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getHvac));
              }
            }
          },
          {
            title: 'BCM',
            key: 'bcm',
            width: 90,
            render: (h, params) => {     // 0-D3, 1-双100, 2-模拟双80, 80-双80，3-d5
              if (params.row.matrixVersion === 2) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else {
                const trigger = (params.row.bcm === null || params.row.bcm === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getBcm));
              }
            }
          },
          {
            title: 'VMS',
            key: 'vms',
            width: 90,
            render: (h, params) => {     // 0-D3, 1-双100, 2-模拟双80, 80-双80，3-d5
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 3) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 2 || params.row.matrixVersion === 80) {
                const trigger = (params.row.vms === null || params.row.vms === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getVms));
              }
            }
          },
          {
            title: 'PEPS',
            key: 'peps',
            width: 90,
            render: (h, params) => {     // 0-D3, 1-双100, 2-模拟双80, 80-双80，3-d5
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 80) {
                const trigger = (params.row.peps === null || params.row.peps === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getPeps));
              }
            }
          },
          {
            title: 'EPS',
            key: 'eps',
            width: 90,
            render: (h, params) => {     // 0-D3, 1-双100, 2-模拟双80, 80-双80，3-d5
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 2) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 3 || params.row.matrixVersion === 80) {
                const trigger = (params.row.eps === null || params.row.eps === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getEps));
              }
            }
          },
          {
            title: 'ADAS',
            key: 'adas',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 3 || params.row.matrixVersion === 2) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else {
                const trigger = (params.row.adas === null || params.row.adas === undefined) ? null : 'hover';
              return h('Poptip', {
                props: {
                  trigger: trigger
                }
              }, this._hyTool.tagStatus(h, params, this._getAdas));
              }
            }
          },
          {
            title: 'BMS',
            key: 'bms',
            width: 90,
            render: (h, params) => {
              const trigger = (params.row.bms === null || params.row.bms === undefined) ? null : 'hover';
              return h('Poptip', {
                props: {
                  trigger: trigger
                }
              }, this._hyTool.tagStatus(h, params, this._getBms));
            }
          },
          {
            title: 'OBC',
            key: 'obc',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 0) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3 || params.row.matrixVersion === 80) {
                const trigger = (params.row.obc === null || params.row.obc === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getObc));
              }
            }
          },
          {
            title: 'MC',
            key: 'mc',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 2 || params.row.matrixVersion === 80) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else {
                const trigger = (params.row.mc === null || params.row.mc === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getMc));
              }
            }
          },
          {
            title: 'ACU',
            key: 'acu',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 2) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 3 || params.row.matrixVersion === 80) {
                const trigger = (params.row.acu === null || params.row.acu === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getAcu));
              }
            }
          },
          {
            title: 'DCDC',
            key: 'dcdc',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 80) {
                const trigger = (params.row.dcdc === null || params.row.dcdc === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getDcdc));
              }
            }
          },
          {
            title: 'ICU',
            key: 'icu',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 80) {
                const trigger = (params.row.icu === null || params.row.icu === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getIcu));
              }
            }
          },
          {
            title: 'VERSION',
            key: 'version',
            width: 95,
            render: (h, params) => {
              if (params.row.matrixVersion === 0 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 80) {
                const trigger = (params.row.version === null || params.row.version === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getVersion));
              }
            }
          },
          {
            title: 'GENERAL',
            key: 'general',
            width: 95,
            render: (h, params) => {
              if (params.row.matrixVersion === 0) {
                const trigger = (params.row.general === null || params.row.general === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getGeneral));
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3 || params.row.matrixVersion === 80) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              }
            }
          },
          {
            title: 'MSG',
            key: 'msg',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 0) {
                const trigger = (params.row.msg === null || params.row.msg === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getMsg));
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3 || params.row.matrixVersion === 80) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              }
            }
          },
          {
            title: 'TPMS',
            key: 'tpms',
            width: 90,
            render: (h, params) => {
              if (params.row.matrixVersion === 0) {
                const trigger = (params.row.tpms === null || params.row.tpms === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getTpms));
              } else if (params.row.matrixVersion === 1 || params.row.matrixVersion === 2 || params.row.matrixVersion === 3 || params.row.matrixVersion === 80) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              }
            }
          },
          {
            title: 'ABS',
            key: 'abs',
            width: 90,
            render: (h, params) => {     // 3-D5
              if (params.row.matrixVersion === 3) {
                const trigger = (params.row.abs === null || params.row.abs === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getAbs));
              } else {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              }
            }
          },
          {
            title: 'IPK',
            key: 'ipk',
            width: 90,
            render: (h, params) => {     // 3-D5
              if (params.row.matrixVersion === 3) {
                const trigger = (params.row.ipk === null || params.row.ipk === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getIpk));
              } else {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              }
            }
          },
           {
            title: 'VCU',
            key: 'vcu',
            width: 90,
            render: (h, params) => {     // 3-D5
              if (params.row.matrixVersion === 3) {
                const trigger = (params.row.vcu === null || params.row.vcu === undefined) ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getVcu));
              } else {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              }
            }
          },
          {
            title: '最后上传数据时间',
            key: 'collectTime',
            width: 150,
            render: (h, params) => {
              params.row.collectTime = params.row.position.collectTime;
              return this.__filters.formatTime(h, params, 'collectTime');
            }
          },
          {
            title: '历史记录',
            key: 'action',
            width: 95,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        gbTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vin',
            width: 170,
            render: (h, params) => {
              return params.row['vehicle'] ? h('a', {
                on: {
                  click: () => {
                    this.goMonitor(params.row['vehicle'].vinCode);
                  }
                }
              }, params.row['vehicle'].vinCode) : h('a', {
                on: {
                  click: () => {
                    this.goMonitor(params.row['position'].vinCode);
                  }
                }
              }, params.row['position'].vinCode);
            }
          },
          {
            title: '车辆位置数据',
            key: 'position',
            render: (h, params) => {     // 0-三期, 1-二期
              const trigger = !params.row['position'] ? null : 'hover';
              return h('Poptip', {
                props: {
                  trigger: trigger
                }
              }, this._hyTool.tagStatus(h, params, this._getPosition, true));
            }
          },
          {
            title: '整车数据',
            key: 'overview',
            render: (h, params) => {     // 0-三期, 1-二期
              if ((params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 1 || params.row['vehicle'].commProtocolVersion === 2) || !params.row['vehicle']) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 0) {
                const trigger = !params.row['overview'] ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getVehicle, true));
              }
            }
          },
          {
            title: '驱动电机数据',
            key: 'motor',
            render: (h, params) => {     // 0-三期, 1-二期
              if ((params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 1 || params.row['vehicle'].commProtocolVersion === 2) || !params.row['vehicle']) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 0) {
                const trigger = !params.row['motor'] ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getMotor, true));
              }
            }
          },
          {
            title: '电池数据',
            key: 'battery',
            render: (h, params) => {     // 0-三期, 1-二期
              if ((params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 1 || params.row['vehicle'].commProtocolVersion === 2) || !params.row['vehicle']) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 0) {
                const trigger = !params.row['battery'] ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getBattery, true));
              }
            }
          },
          {
            title: '极值数据',
            key: 'peak',
            render: (h, params) => {     // 0-三期, 1-二期
              if ((params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 1 || params.row['vehicle'].commProtocolVersion === 2) || !params.row['vehicle']) {
                return h('div', [
                  this._hyTool.configure(h)
                ]);
              } else if (params.row['vehicle'] && params.row['vehicle'].commProtocolVersion === 0) {
                const trigger = !params.row['peak'] ? null : 'hover';
                return h('Poptip', {
                  props: {
                    trigger: trigger
                  }
                }, this._hyTool.tagStatus(h, params, this._getPeak, true));
              }
            }
          },
          {
            title: '最后里程(km)',
            key: 'mileage',
            width: 110
          },
          {
            title: '历史记录',
            key: 'action',
            fixed: 'right',
            width: 95,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.gbDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        gbTotalElement: 0, // 总数量
        gbTotalPage: 1     // 总页数
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      let vin = this.$route.query.vin;
      if (vin) {
        this.searchData.vinCode = vin;
        setTimeout(() => {
          this.$refs.select.setQuery(vin);
        }, 1000);
      }
      this._getCurrent(1);
    },
    methods: {
      // 实时can
      _getList (page, flag) {
        this.loading = true;
        this.searchData.pageSize = 5;
        this.searchPageData.pageSize = 5;
        if (this.searchData.vin === '' || this.searchData.vin === null) {
          delete this.searchData.vin;
        }
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        canList(this.searchPageData, res => {
          this.loading = false;
          if (res === null) {
             this.list = [];
             this.totalElement = 0;
             this.totalPage = 0;
             this.noDataText = '暂无数据';
             return;
          };
          this.totalElement = Number(res.totalElements);
          this.totalPage = Number(res.totalPages);
          // console.log(JSON.stringify(res));
          if (res.position.length === 0) {
            this.noDataText = '暂无数据';
            this.showCheckbox = false;
          } else {
            this.noDataText = null;
            this.showCheckbox = true;
          }
          let list = [];
          let str = ['d1280Bms', 'd1Obc', 'd1Vms', 'd2Acu', 'd2Adas', 'd2Bcm', 'd2Bms', 'd2Dcdc', 'd2Eps', 'd2Gps', 'd2Hvac', 'd2ICu',
            'd2Mc', 'd2Obc', 'd2Peps', 'd2Version', 'd2Vms', 'd3Bms', 'd3CanAdas', 'd3CanVcuBcm', 'd3General',
            'd3Mc', 'd3Msg', 'd3Tpms', 'd2280Bms', 'd2280Obc', 'd2280Vms', 'overView', 'matrixVersions', 'commProtocolVersions', 'd5CanAbs', 'd5CanAcu', 'd5CanBcm', 'd5CanBms', 'd5CanEps', 'd5CanHvac', 'd5CanIpk', 'd5CanMc', 'd5CanObc', 'd5CanVcu'];
          for (let po of res.position) {
            let obj = {position: po};
            // console.log(po);
            for (let st of str) {
              // console.log(st);
              if (st === 'matrixVersions' || st === 'commProtocolVersions') {
                let stl = st.slice(0, -1);
                obj[stl] = res[st][po.vinCode];
              } else {
                if (!res[st]) res[st] = [];
                for (let rr of res[st]) {
                  if (po.vinCode === rr.vinCode) {
                    if (st === 'overView') {
                      obj['overview'] = rr;
                    } else if (st.indexOf('d2280') > -1 || st.indexOf('d1280') > -1) {
                      let stl = st.substring(5).toLowerCase();
                      obj[stl] = rr;
                    } else if (st.indexOf('d3CanVcu') > -1) {
                      let stl = st.substring(8).toLowerCase();
                      obj[stl] = rr;
                    } else if (st.indexOf('d3Can') > -1 || st.indexOf('d5Can') > -1) {
                      let stl = st.substring(5).toLowerCase();
                      obj[stl] = rr;
                    } else {
                      let stl = st.substring(2).toLowerCase();
                      obj[stl] = rr;
                    }
                  }
                }
              }
            }
            // console.log(JSON.stringify(obj));
            list.push(obj);
          }
          this.list = list;
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询实时CAN列表失败',
            desc: ret
          });
        });
      },
      // 国标实时数据
      _getCurrent (num) {
        if (num) this.gbSearch.pageNum = num;
        this.gbSearch.pageSize = 5;
        this.loading2 = true;
        if (this.gbSearch.vin === '' || this.gbSearch.vin === null) {
          delete this.gbSearch.vin;
        }
        currentList(this.gbSearch, res => {
         //  console.log(res);
          this.loading2 = false;
          if (res === null) {
             this.gbList = [];
             this.gbTotalPage = 0;
             this.gbTotalElement = 0;
             this.noDataText = '暂无数据';
             return;
          };
          // this.gbList = res.content;
          // 分页会调到没有数据的一页去的bug
          if (res.position.length === 0 && this.gbSearch.pageNum !== 1) {
            this.gbSearch.pageNum = 1;
            this._getCurrent();
            return;
          }
          if (res.position.length === 0) {
            this.noDataText = '暂无数据';
          } else {
            this.noDataText = null;
          }
          let gbList = [];
          let str = ['vehicle', 'overview', 'motor', 'battery', 'temperature', 'peak', 'map'];
          for (let po of res.position) {
            let obj = {position: po};
            for (let st of str) {
              if (st === 'map') {
                  obj['mileage'] = res[st][po.vinCode];
              } else {
                for (let rr of res[st]) {
                  if (po.vinCode === rr.vinCode) {
                    obj[st] = rr;
                  }
                }
              }
            }
            gbList.push(obj);
          }
          this.gbList = gbList;
          for (let item of this.gbList) {
            for (let i in item) {
              if (i !== 'vehicle' && i !== 'mileage' && item[i]) {
                for (let j in item[i]) {
                  item[i][j] = item[i][j] === -1 ? '异常' : (item[i][j] === -2 ? '无效' : item[i][j]);
                  item[i][j] = item[i][j] === -8000 ? '异常' : (item[i][j] === -9000 ? '无效' : item[i][j]);
                }
                item[i].collectTime1 = !item[i].collectTime ? null : this._hyTool.DateFormat(new Date(+item[i].collectTime), 'yyyy-MM-dd hh:mm:ss');
                item[i].receiveTime1 = !item[i].receiveTime ? null : this._hyTool.DateFormat(new Date(+item[i].receiveTime), 'yyyy-MM-dd hh:mm:ss');
              }
            }
          }
          this.gbTotalElement = Number(res.totalElements);
          this.gbTotalPage = Number(res.totalPages);
        }, ret => {
          this.loading2 = false;
          this.$Notice.error({
            title: '查询实时国标列表失败',
            desc: ret
          });
        });
      },
      // 翻页
      gbChange (val) {
        this.loading1 = true;
        this.gbSearch.pageNum = val;
        // 获取列表
        this._getCurrent();
      },
      search () {
        this.gbSearch.vin = this.searchData.vin;
        this._getCurrent(1);
        this._getList(1, true);
        if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      _getGps (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.gps) return;
          this.getType(row, 'can');
          this.currentName = 'Gprs';
        }
        this.modalFormData = row.gps;
        this.modalTitle = 'GPRS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.gps;
        this.detailModalShow = true;
      },
      _getHvac (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.hvac) return;
          this.getType(row, 'can');
          this.currentName = 'Hvac';
        }
        this.modalFormData = row.hvac;
        this.modalTitle = 'HVAC详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.hvac_3;
        } else {
          this.modalFormItem = versionData.hvac;
        }
        this.detailModalShow = true;
      },
      _getBcm (row, type) {
        // console.log(row);
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.bcm) return;
          this.getType(row, 'can');
          this.currentName = 'Bcm';
        }
        this.modalFormData = row.bcm;
        this.modalTitle = 'BCM详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 0) {
          this.modalFormItem = versionData.bcm_0;
        } else if (row.matrixVersion === 1 || row.matrixVersion === 80) {
          this.modalFormItem = versionData.bcm_1;
        } else if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.bcm_3;
        }
        this.detailModalShow = true;
      },
      _getVms (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.vms) return;
          this.getType(row, 'can');
          this.currentName = 'Vms';
        }
        this.modalFormData = row.vms;
        this.modalTitle = 'VMS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.vms;
        this.detailModalShow = true;
      },
      _getPeps (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.peps) return;
          this.getType(row, 'can');
          this.currentName = 'Peps';
        }
        this.modalFormData = row.peps;
        this.modalTitle = 'PEPS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.peps;
        this.detailModalShow = true;
      },
      _getVersion (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.version) return;
          this.getType(row, 'can', true);
          this.currentName = 'Version';
        }
        this.modalFormData = row.version;
        this.modalTitle = 'VERSION详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.version;
        this.detailModalShow = true;
      },
      _getEps (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.eps) return;
          this.getType(row, 'can');
          this.currentName = 'Eps';
        }
        this.modalFormData = row.eps;
        this.modalTitle = 'EPS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.eps_3;
        } else {
          this.modalFormItem = versionData.eps;
        }
        this.detailModalShow = true;
      },
      _getAdas (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.adas) return;
          this.getType(row, 'can');
          this.currentName = 'Adas';
        }
        this.modalFormData = row.adas;
      //  if (!this.modalFormData) return;
        this.modalTitle = 'ADAS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
          if (row.matrixVersion === 1) {
            if (this.modalFormData.crashTime >= 0 && this.modalFormData.crashTime <= 26) {
              this.modalFormData.crashTime = 'The crash time for the two vehicles';
            } else {
              this.modalFormData.crashTime = 'Reserved';
            }
          }
        }
        if (row.matrixVersion === 0) {
          this.modalFormItem = versionData.adas_0;
        } else if (row.matrixVersion === 1 || row.matrixVersion === 80) {
          this.modalFormItem = versionData.adas_1;
        }
        this.detailModalShow = true;
      },
      _getBms (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.bms) return;
          this.getType(row, 'can');
          this.currentName = 'Bms';
        }
        this.modalFormData = row.bms;
        this.modalTitle = 'BMS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
          if (this.modalFormData.productionDate && !isNaN(this.modalFormData.productionDate)) {
            this.modalFormData.productionDate = this._hyTool.DateFormat(new Date(+this.modalFormData.productionDate), 'yyyy-MM-dd');
          } else {
             this.modalFormData.productionDate = this.modalFormData.productionDate;
          }
          if (this.modalFormData.batteryProDate && !isNaN(this.modalFormData.batteryProDate)) {
            this.modalFormData.batteryProDate = this._hyTool.DateFormat(new Date(+this.modalFormData.batteryProDate), 'yyyy-MM-dd');
          } else {
             this.modalFormData.batteryProDate = this.modalFormData.batteryProDate;
          }
        }
        if (row.matrixVersion === 0) {
          this.modalFormItem = versionData.bms_0;
        } else if (row.matrixVersion === 1) {
          this.modalFormItem = versionData.bms_1;
        } else if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.bms_3;
        } else if (row.matrixVersion === 2 || row.matrixVersion === 80) {
          this.modalFormItem = versionData.bms_80;
        }
        this.detailModalShow = true;
      },
      _getObc (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.obc) return;
          this.getType(row, 'can', true);
          this.currentName = 'Obc';
        }
        this.modalFormData = row.obc;
        this.modalTitle = 'OBC详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.obc_3;
        } else {
          this.modalFormItem = versionData.obc;
        }
        this.detailModalShow = true;
      },
      _getMc (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.mc) return;
          this.getType(row, 'can', true);
          this.currentName = 'Mc';
        }
        this.modalFormData = row.mc;
        this.modalTitle = 'MC详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 0) {
          this.modalFormItem = versionData.mc_0;
        } else if (row.matrixVersion === 1) {
          this.modalFormItem = versionData.mc_1;
        } else if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.mc_3;
        }
        this.detailModalShow = true;
      },
      _getAcu (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.acu) return;
          this.getType(row, 'can', true);
          this.currentName = 'Acu';
        }
        this.modalFormData = row.acu;
        this.modalTitle = 'ACU详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.acu_3;
        } else {
          this.modalFormItem = versionData.acu;
        }
        this.detailModalShow = true;
      },
      _getAbs (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.abs) return;
          this.getType(row, 'can', true);
          this.currentName = 'Abs';
        }
        this.modalFormData = row.abs;
        this.modalTitle = 'ABS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.abs_3;
        }
        this.detailModalShow = true;
      },
      _getIpk (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.ipk) return;
          this.getType(row, 'can', true);
          this.currentName = 'Ipk';
        }
        this.modalFormData = row.ipk;
        this.modalTitle = 'IPK详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.ipk_3;
        }
        this.detailModalShow = true;
      },
      _getVcu (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.vcu) return;
          this.getType(row, 'can', true);
          this.currentName = 'Vcu';
        }
        this.modalFormData = row.vcu;
        this.modalTitle = 'Vcu详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        if (row.matrixVersion === 3) {
          this.modalFormItem = versionData.vcu_3;
        }
        this.detailModalShow = true;
      },
      _getDcdc (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.dcdc) return;
          this.getType(row, 'can', true);
          this.currentName = 'Dcdc';
        }
        this.modalFormData = row.dcdc;
        this.modalTitle = 'DCDC详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.dcdc;
        this.detailModalShow = true;
      },
      _getIcu (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.icu) return;
          this.getType(row, 'can', true);
          this.currentName = 'Icu';
        }
        this.modalFormData = row.icu;
        this.modalTitle = 'ICU详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.icu;
        this.detailModalShow = true;
      },
      _getGeneral (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.general) return;
          this.getType(row, 'can');
          this.currentName = 'General';
        }
        this.modalFormData = row.general;
        this.modalTitle = 'GENERAL详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.general_0;
        this.detailModalShow = true;
      },
      _getMsg (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.msg) return;
          this.getType(row, 'can');
          this.currentName = 'Msg';
        }
        this.modalFormData = row.msg;
        this.modalTitle = 'MSG详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
          if (this.modalFormData.insideTemperature >= 0 && this.modalFormData.insideTemperature <= 170) {
            this.modalFormData.insideTemperature = '有效';
          } else if (this.modalFormData.insideTemperature >= 171 && this.modalFormData.insideTemperature <= 254) {
            this.modalFormData.insideTemperature = 'Reserved';
          } else if (this.modalFormData.insideTemperature === -2) {
            this.modalFormData.insideTemperature = '无效';
          } else {
            this.modalFormData.insideTemperature = '异常';
          }
          if (this.modalFormData.setTemperature >= 36 && this.modalFormData.setTemperature <= 64) {
            this.modalFormData.setTemperature = '有效';
          } else if (this.modalFormData.setTemperature === -2) {
            this.modalFormData.setTemperature = '无效';
          } else {
            this.modalFormData.setTemperature = '异常';
          }
        }
        this.modalFormItem = versionData.msg_0;
        this.detailModalShow = true;
      },
      _getTpms (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row.tpms) return;
          this.getType(row, 'can');
          this.currentName = 'Tpms';
        }
        this.modalFormData = row.tpms;
        this.modalTitle = 'TPMS详情';
        if (this.modalFormData) {
          this.modalFormData.collectTime1 = this.modalFormData.collectTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.collectTime), 'yyyy-MM-dd hh:mm:ss') : null;
          this.modalFormData.receiveTime1 = this.modalFormData.receiveTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.receiveTime), 'yyyy-MM-dd hh:mm:ss') : null;
        }
        this.modalFormItem = versionData.tpms_0;
        this.detailModalShow = true;
      },
      // 整车数据
      _getVehicle (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row['overview']) return;
          this.getType(row, 'vehicle');
          this.currentName = 'Vehicle';
        }
        this.modalFormData = row['overview'] ? row['overview'] : {};
        this.modalTitle = '整车数据';
        this.modalFormItem = [
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'gprsCode',
            title: 'GPRS号'
          },
          {
            key: 'collectTime1',
            title: '采集时间'
          },
          {
            key: 'receiveTime1',
            title: '接收时间'
          },
          {
            key: 'carStatus',
            title: '车辆状态',
            array: [{value: 1, label: '启动'}, {value: 2, label: '熄火'}, {value: 3, label: '其它'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]
          },
          {
            key: 'chargeStatus',
            title: '充电状态',
            array: [{value: 1, label: '停车充电'}, {value: 2, label: '行驶充电'}, {value: 3, label: '未充电'}, {value: 4, label: '充电完成'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]
          },
          {
            key: 'runStatus',
            title: '运行模式',
            array: [{value: 1, label: '纯电'}, {value: 2, label: '混动'}, {value: 3, label: '燃油'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]
          },
          {
            key: 'vehicleSpeed',
            title: '车速(km/h)'
          },
          {
            key: 'mileage',
            title: '累计里程(km)'
          },
          {
            key: 'totalVoltage',
            title: '总电压(V)'
          },
          {
            key: 'totalCurrent',
            title: '总电流(A)'
          },
          {
            key: 'soc',
            title: 'SOC(%)'
          },
          {
            key: 'dcdcStatus',
            title: 'DC-DC状态',
            array: [{value: 1, label: '工作'}, {value: 2, label: '断开'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]
          },
          {
            key: 'clutchStatus',
            title: '档位',
            array: [{value: 0, label: 'N 挡'}, {value: 1, label: 'D 挡'}, {value: 2, label: 'D 挡'}, {value: 3, label: 'D 挡'}, {value: 4, label: 'D 挡'}, {value: 5, label: 'D 挡'}, {value: 6, label: 'D 挡'}, {value: 13, label: 'R 挡'}, {value: 14, label: 'D 挡'}, {value: 15, label: 'P 挡'}]
          },
          {
            key: 'issueValue',
            title: '绝缘电阻(KΩ)'
          }
        ];
        this.detailModalShow = true;
      },
      // 驱动电机数据
      _getMotor (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row['motor']) return;
          this.getType(row, 'vehicle');
          this.currentName = 'Motor';
        }
        this.modalFormData = row['motor'] ? row['motor'] : {};
        this.modalFormData.motorTotal = this.modalFormData.motorTotal ? this.modalFormData.motorTotal : 1;
        this.modalTitle = '驱动电机数据';
        this.modalFormItem = [
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'gprsCode',
            title: 'GPRS号'
          },
          {
            key: 'collectTime1',
            title: '采集时间'
          },
          {
            key: 'receiveTime1',
            title: '接收时间'
          },
          {
            key: 'motorTotal',
            title: '驱动电机个数'
          },
          {
            key: 'motorSeq',
            title: '驱动电机序号'
          },
          {
            key: 'motorStatus',
            title: '驱动电机状态',
            array: [{value: 1, label: '耗电'}, {value: 2, label: '发电'}, {value: 3, label: '关闭状态'}, {value: 4, label: '准备状态'}, {value: -1, label: '异常'}, {value: -2, label: '无效'}]
          },
          {
            key: 'controllerTemperature',
            title: '驱动电机控制器温度(℃)'
          },
          {
            key: 'speed',
            title: '驱动电机转速(r/min)'
          },
          {
            key: 'torque',
            title: '驱动电机转矩(N·m)'
          },
          {
            key: 'motorTemperature',
            title: '驱动电机温度(℃)'
          },
          {
            key: 'controllerInputVoltage',
            title: '电机控制器输入电压(V)'
          },
          {
            key: 'controllerDirectCurrent',
            title: '电机控制器直流母线电流(A)'
          }
        ];
        this.detailModalShow = true;
      },
      // 燃料电池数据
      _getBattery (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row['battery']) return;
          this.getType(row, 'vehicle');
          this.currentName = 'Battery';
        }
        this.modalFormData = row['battery'] ? row['battery'] : {};
        this.modalFormData.temperatures = row.temperature ? row.temperature.temperatures : '';
        this.modalFormData.number = row.temperature ? row.temperature.number : '';
        this.modalTitle = '电池数据';
        this.modalFormItem = [
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'gprsCode',
            title: 'GPRS号'
          },
          {
            key: 'collectTime1',
            title: '采集时间'
          },
          {
            key: 'receiveTime1',
            title: '接收时间'
          },
          {
            key: 'totalVoltage',
            title: '电池电压(V)'
          },
          {
            key: 'totalCurrent',
            title: '电池电流(A)'
          },
          {
            key: 'number',
            title: '电池温度探针总数'
          },
          {
            key: 'temperatures',
            title: '探针温度值(℃)'
          },
          {
            key: 'batterySysNumber',
            title: '动力蓄电池子系统个数'
          },
          {
            key: 'batterySysIndex',
            title: '电池子系统号'
          },
          {
            key: 'batteryVoltages',
            title: '单体蓄电池电压值'
          },
          {
            key: 'batteryNumber',
            title: '单体蓄电池总数'
          },
          {
            key: 'batteryStartIndex',
            title: '本帧起始电池序号'
          },
          {
            key: 'batteryPacketNumber',
            title: '本帧单体电池总数'
          }
        ];
        this.detailModalShow = true;
      },
      // 车辆位置数据
      _getPosition (row, type) {
        // console.log(row);
        // console.log(type);
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row['position']) return;
          this.getType(row, 'vehicle');
          this.currentName = 'Position';
        }
        this.modalFormData = row['position'] ? row['position'] : {};
        this.modalFormData.positionMode = this.modalFormData.positionMode === 0 ? '无效定位' : (this.modalFormData.positionMode === 6 ? '有效定位' : this.modalFormData.positionMode);
        this.modalTitle = '车辆位置数据';
        this.modalFormItem = [
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'gprsCode',
            title: 'GPRS号'
          },
          {
            key: 'collectTime1',
            title: '采集时间'
          },
          {
            key: 'receiveTime1',
            title: '接收时间'
          },
          {
            key: 'positionMode',
            title: '定位状态'
          },
          {
            key: 'longitude',
            title: '经度'
          },
          {
            key: 'latitude',
            title: '纬度'
          }
        ];
        this.detailModalShow = true;
      },
      // 极值数据
      _getPeak (row, type) {
        if (!type) {
          this.currentData = this._hyTool.extend({}, row);
          if (!row['peak']) return;
          this.getType(row, 'vehicle');
          this.currentName = 'Peak';
        }
        this.modalFormData = row['peak'] ? row['peak'] : {};
        this.modalTitle = '极值数据';
        this.modalFormItem = [
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'gprsCode',
            title: 'GPRS号'
          },
          {
            key: 'collectTime1',
            title: '采集时间'
          },
          {
            key: 'receiveTime1',
            title: '接收时间'
          },
          {
            key: 'highBatteryId',
            title: '最高电压电池子系统号'
          },
          {
            key: 'highBatteryCode',
            title: '最高电压电池单体代号'
          },
          {
            key: 'highVoltage',
            title: '电池单体电压最高值(V)'
          },
          {
            key: 'lowBatteryId',
            title: '最低电压电池子系统号'
          },
          {
            key: 'lowBatteryCode',
            title: '最低电压电池单体代号'
          },
          {
            key: 'lowVoltage',
            title: '电池单体电压最低值(V)'
          },
          {
            key: 'highTemperatureId',
            title: '最高温度子系统号'
          },
          {
            key: 'highProbeCode',
            title: '最高温度探针序号'
          },
          {
            key: 'highTemperature',
            title: '最高温度值(℃)'
          },
          {
            key: 'lowTemperatureId',
            title: '最低温度子系统号'
          },
          {
            key: 'lowProbeCode',
            title: '最低温度探针序号'
          },
          {
            key: 'lowTemperature',
            title: '最低温度值(℃)'
          }
        ];
        this.detailModalShow = true;
      },
      // 车辆实时监控
      goMonitor (row) {
        this.$router.push({path: '/main/monitor/realMonitor', query: {vin: row}});
      },
      // 历史can
      detail (row) {
        this.$router.push({path: '/main/monitor/historicalCan', query: {vin: row.position.vinCode}});
      },
      // 国标历史
      gbDetail (row) {
        let vin = '';
        if (row.vehicle) {
          vin = row.vehicle.vinCode;
        } else {
          vin = row.position.vinCode;
        }
        this.$router.push({path: '/main/monitor/historicalNationalStandard', query: {vin: vin}});
      },
      // 切换Tab
      changeTab (row) {
        this.currentName = row;
        this.modalFormData = {};
        this.modalFormItem = [];
        let val = `_get${row}`;
        this[val](this.currentData, true);
      },
      // 根据车辆协议或类型展示tabs  obc
      getType (row, type, swap) {
        if (type === 'can') {
          if (row.matrixVersion === 0) {  // D3
            this.titles = [
              {
                label: 'BCM',
                value: 'Bcm'
              },
              {
                label: 'ADAS',
                value: 'Adas'
              },
              {
                label: 'BMS',
                value: 'Bms'
              },
              {
                label: 'MC',
                value: 'Mc'
              },
              {
                label: 'GENERAL',
                value: 'General'
              },
              {
                label: 'MSG',
                value: 'Msg'
              },
              {
                label: 'TPMS',
                value: 'Tpms'
              }
            ];
          } else if (row.matrixVersion === 1) { // 1-双100, 80-双80
            if (swap) { // swap是为了修复一个bug，让展示顺序不一样
              this.titles = [
                {
                  label: 'OBC',
                  value: 'Obc'
                },
                {
                  label: 'MC',
                  value: 'Mc'
                },
                {
                  label: 'ACU',
                  value: 'Acu'
                },
                {
                  label: 'DCDC',
                  value: 'Dcdc'
                },
                {
                  label: 'ICU',
                  value: 'Icu'
                },
                {
                  label: 'VERSION',
                  value: 'Version'
                },
                // {
                //   label: 'GPS',
                //   value: 'Gps'
                // },
                {
                  label: 'HVAC',
                  value: 'Hvac'
                },
                {
                  label: 'BCM',
                  value: 'Bcm'
                },
                {
                  label: 'VMS',
                  value: 'Vms'
                },
                {
                  label: 'PEPS',
                  value: 'Peps'
                },
                {
                  label: 'EPS',
                  value: 'Eps'
                },
                // {
                //   label: 'ADAS',
                //   value: 'Adas'
                // },
                {
                  label: 'BMS',
                  value: 'Bms'
                }
              ];
            } else {
              this.titles = [
                // {
                //   label: 'GPS',
                //   value: 'Gps'
                // },
                {
                  label: 'HVAC',
                  value: 'Hvac'
                },
                {
                  label: 'BCM',
                  value: 'Bcm'
                },
                {
                  label: 'VMS',
                  value: 'Vms'
                },
                {
                  label: 'PEPS',
                  value: 'Peps'
                },
                {
                  label: 'EPS',
                  value: 'Eps'
                },
                // {
                //   label: 'ADAS',
                //   value: 'Adas'
                // },
                {
                  label: 'BMS',
                  value: 'Bms'
                },
                {
                  label: 'OBC',
                  value: 'Obc'
                },
                {
                  label: 'MC',
                  value: 'Mc'
                },
                {
                  label: 'ACU',
                  value: 'Acu'
                },
                {
                  label: 'DCDC',
                  value: 'Dcdc'
                },
                {
                  label: 'ICU',
                  value: 'Icu'
                },
                {
                  label: 'VERSION',
                  value: 'Version'
                }
              ];
            }
          } else if (row.matrixVersion === 80) { // 1-双100, 80-双80
            if (swap) { // swap是为了修复一个bug，让展示顺序不一样
              this.titles = [
                {
                  label: 'OBC',
                  value: 'Obc'
                },
                {
                  label: 'ACU',
                  value: 'Acu'
                },
                {
                  label: 'DCDC',
                  value: 'Dcdc'
                },
                {
                  label: 'ICU',
                  value: 'Icu'
                },
                {
                  label: 'VERSION',
                  value: 'Version'
                },
                // {
                //   label: 'GPS',
                //   value: 'Gps'
                // },
                {
                  label: 'HVAC',
                  value: 'Hvac'
                },
                {
                  label: 'BCM',
                  value: 'Bcm'
                },
                {
                  label: 'VMS',
                  value: 'Vms'
                },
                {
                  label: 'PEPS',
                  value: 'Peps'
                },
                {
                  label: 'EPS',
                  value: 'Eps'
                },
                // {
                //   label: 'ADAS',
                //   value: 'Adas'
                // },
                {
                  label: 'BMS',
                  value: 'Bms'
                }
              ];
            } else {
              this.titles = [
                // {
                //   label: 'GPS',
                //   value: 'Gps'
                // },
                {
                  label: 'HVAC',
                  value: 'Hvac'
                },
                {
                  label: 'BCM',
                  value: 'Bcm'
                },
                {
                  label: 'VMS',
                  value: 'Vms'
                },
                {
                  label: 'PEPS',
                  value: 'Peps'
                },
                {
                  label: 'EPS',
                  value: 'Eps'
                },
                // {
                //   label: 'ADAS',
                //   value: 'Adas'
                // },
                {
                  label: 'BMS',
                  value: 'Bms'
                },
                {
                  label: 'OBC',
                  value: 'Obc'
                },
                {
                  label: 'ACU',
                  value: 'Acu'
                },
                {
                  label: 'DCDC',
                  value: 'Dcdc'
                },
                {
                  label: 'ICU',
                  value: 'Icu'
                },
                {
                  label: 'VERSION',
                  value: 'Version'
                }
              ];
            }
          } else if (row.matrixVersion === 2) {  // 模拟双80
              this.titles = [
                {
                  label: 'BMS',
                  value: 'Bms'
                },
                {
                  label: 'VMS',
                  value: 'Vms'
                },
                {
                  label: 'OBC',
                  value: 'Obc'
                }
              ];
            } else if (row.matrixVersion === 3) {  // D5
              this.titles = [
                {
                  label: 'ABS',
                  value: 'Abs'
                },
                {
                  label: 'BCM',
                  value: 'Bcm'
                },
                 {
                  label: 'ACU',
                  value: 'Acu'
                },
                {
                  label: 'EPS',
                  value: 'Eps'
                },
                {
                  label: 'BMS',
                  value: 'Bms'
                },
                {
                  label: 'MC',
                  value: 'Mc'
                },
                {
                  label: 'HVAC',
                  value: 'Hvac'
                },
                {
                  label: 'IPK',
                  value: 'Ipk'
                },
                {
                  label: 'OBC',
                  value: 'Obc'
                },
                {
                  label: 'VCU',
                  value: 'Vcu'
                }
              ];
            }
        } else {
          if (row.vehicle && row.vehicle.commProtocolVersion === 0) {    // 三期
            this.titles = [
              {
                label: '车辆位置数据',
                value: 'Position'
              },
              {
                label: '整车数据',
                value: 'Vehicle'
              },
              {
                label: '驱动电机数据',
                value: 'Motor'
              },
              {
                label: '电池数据',
                value: 'Battery'
              },
              {
                label: '极值数据',
                value: 'Peak'
              }
            ];
          } else if (row.vehicle && row.vehicle.commProtocolVersion === 1 || row.vehicle.commProtocolVersion === 2) {    // 1-二期,2-一期
            this.titles = [
              {
                label: '车辆位置数据',
                value: 'Position'
              }
            ];
          }
        }
      }
    },
    watch: {
      detailModalShow (value) {
        if (value) {
          let _this = this;
          document.onkeydown = function (event) {
            if (event.keyCode === 37) {
              for (let i = 0; i < _this.titles.length; i++) {
                if (_this.currentName === _this.titles[i].value && i > 0) {
                  _this.changeTab(_this.titles[i - 1].value);
                  break;
                }
              }
            } else if (event.keyCode === 39) {
              for (let i = 0; i < _this.titles.length; i++) {
                if (_this.currentName === _this.titles[i].value && i < _this.titles.length - 1) {
                  _this.changeTab(_this.titles[i + 1].value);
                  break;
                }
              }
            }
          };
        } else {
          document.onkeydown = null;
          this.titles = [];
        }
      }
    }
  };
</script>
