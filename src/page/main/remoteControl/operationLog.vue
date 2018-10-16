/**
* 作者：szh
* 时间：2018-01-29
* 描述：操作日志
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
          <FormItem label="">
            <Select placeholder="远程控制项" v-model="searchData.operation" style="width: 200px;" clearable>
              <Option v-for="item in operationType" :value="item.value" :key="item.value" :label="item.label"></Option>
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
  import { operationLogList } from '@/service/remoteControlService/operationLog';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { queryOperations } from '@/service/report/operationLogStatistics';

  export default {
    components: {
      HyTable
    },
    mixins: [list, storeVin],
    data () {
      return {
        loading: false,
        searchData: {},
        operationType: [],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            fixed: 'left',
            align: 'center'
          },
          {
            title: 'vin码',
            key: 'vin',
            width: 180,
            fixed: 'left'
          },
          {
            title: '车型',
            width: 100,
            key: 'vehicleType'
          },
          {
            title: '车系',
            width: 90,
            key: 'vehicleSerial'
          },
          {
            title: '操作',
            width: 150,
            key: 'operationCN'
          },
          {
            title: '是否成功',
            width: 90,
            key: 'flag',
            render: (h, params) => {
              return params.row.flag === 0 ? '失败' : '成功';
            }
          },
          {
            title: '错误信息',
            width: 200,
            key: 'errorMsg'
          },
          {
            title: '错误编码',
            width: 90,
            key: 'errorCode'
          },
          {
            title: '执行时间',
            width: 150,
            key: 'createDate',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'createDate');
            }
          },
          {
            title: '时间(完成签名、车辆存在、频繁操作验证)',
            width: 300,
            key: 'finishValidate'
          },
          {
            title: '时间(获取车身数据指令下发)',
            width: 190,
            key: 'sendCmd1'
          },
          {
            title: '时间(接收到车身数据)',
            width: 160,
            key: 'receiveResult1'
          },
          {
            title: '时间(完成车身数据验证)',
            width: 165,
            key: 'finishVechileValidate'
          },
          {
            title: '时间(下发下行指令)',
            width: 150,
            key: 'sendCmd2'
          },
          {
            title: '时间(接收到下行指令反馈)',
            width: 180,
            key: 'receiveResult2'
          },
          {
            title: '时间(操作完成)',
            width: 150,
            key: 'endTime'
          },
          {
            title: '时间(总耗时)',
            width: 150,
            fixed: 'right',
            key: 'sumTime'
          }
        ]
      };
    },
    mounted () {
      this.getItem();
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 列表
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        operationLogList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询操作日志列表失败',
            desc: ret
          });
        });
        if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      // 查询远程控制项
      getItem () {
        queryOperations(null, res => {
          for (let i in res) {
            this.operationType.push({value: i, label: res[i]});
          }
        });
      }
    }
  };
</script>
