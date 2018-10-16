
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
              placeholder="VIN码"
              style="width: 200px"
              v-model="searchData.vinCode"
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
          <!--<FormItem label="">
            <i-input placeholder="车系" clearable v-model="searchData.carSeries" style="width:200px;"></i-input>
          </FormItem>-->
          <FormItem label="">
            <Select v-model="searchData.carSeries" placeholder="车系" filterable clearable style="width: 200px">
              <Option v-for="item in seriesType" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <!--<FormItem label="">
            <i-input placeholder="GPRS号" clearable v-model="searchData.gprsNo" style="width:200px;"></i-input>
          </FormItem>-->
          <!--<FormItem label="">
            <i-input placeholder="关重件" v-model="searchData.keyPart" style="width:200px;"></i-input>
          </FormItem>-->
          <FormItem label="" >
            <Select placeholder="关重件" v-model="searchData.keyPart" clearable filterable  style="width:200px;">
              <Option v-for="item in keyWordType" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </Select>
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
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { keyPartMonitor } from '@/service/alarmService/keyPartMonitor';
  import { listAllSeries } from '@/service/vehicleManageService/basicDataService/modelService';
  import { mapState } from 'vuex';
  import storeVin from '@/js/mixins/storeVin/storeVin';

  export default {
    components: {
      HyTable,
      HyFormItem
    },
    mixins: [list, storeVin],
    data () {
      return {
        searchData: {
        },
        seriesType: [],             // 车系
        loading: false,
        loading1: false,
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
            key: 'vinCode'
          },
          {
            title: '车系',
            key: 'carSeries'
          },
          {
            title: '关重件',
            key: 'keyPart',
            render: (h, params) => {
              return h('div', [
                this.__filters.keyWordType(h, params, 'keyPart')
              ]);
            }
          },
          {
            title: '问题',
            key: 'problem'
          },
          {
            title: '上报时间',
            key: 'reportingTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'reportingTime');
            }
          },
          {
            title: '持续时间',
            key: 'duration',
            render: (h, params) => {
              return `${params.row.duration}s`;
            }
          },
          {
            title: '状态',
            key: 'status'
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'keyWordType'
      ])
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      this.getAllSeries();
    },
    methods: {
      _getList (page, flag) {
        if (page) this.searchData.pageNum = page;
        this.loading = true;
        if (!this.searchData.vinCode) {
          delete this.searchData.vinCode;
        }
        if (!this.searchData.carSeries) {
          delete this.searchData.carSeries;
        }
        if (!this.searchData.gprsNo) {
          delete this.searchData.gprsNo;
        }
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        keyPartMonitor(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询关重件监控失败',
            desc: ret
          });
        });
        if (this.searchData.vinCode) this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      // 获取所有车系
      getAllSeries () {
        let params = {
          pageNum: 1,
          size: 1000
        };
        listAllSeries(params, res => {
          this.seriesType = res.content;
        }, ret => {
          this.$Notice.error({
            title: '查询所有车系失败',
            desc: ret
          });
        });
      }
    }
  };
</script>
