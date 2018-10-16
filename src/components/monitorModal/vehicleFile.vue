<template>
  <Tabs style="width:99%;" value="vehicle" :style="tabsHeight" @on-click="changeTabs" ref="tabs">
    <Tab-pane label="车辆详情" name="vehicle">
      <div style="text-align:left">
        <hy-detail :form="vehicleDetail" :rowData="modalFormItem" v-if="modalDetailShow"></hy-detail>
      </div>
    </Tab-pane>
    <Tab-pane label="关重件信息" name="key">
      <Table stripe border :columns="keyPartTitle" :data="keyPartList" style="margin-top:20px;"></Table>
    </Tab-pane>
  </Tabs>
</template>

<script>
  import HyDetail from '@/components/common/detail/detail.vue';
  import { vehicleListAll, keyPart } from '@/service/vehicleManageService/vehicleService';
  export default {
    name: 'vehicleFile',
    components: {
      HyDetail
    },
    data () {
      return {
        vehicleDetail: {},
        modalFormItem: [
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'carSeries',
            title: '车系'
          },
          {
            key: 'carType',
            title: '车型'
          },
          {
            key: 'carColor',
            title: '车辆颜色'
          },
          {
            key: 'configuration',
            title: '配置',
            array: [            // 配置
              {value: 1, label: '标配'},
              {value: 2, label: '高配'},
              {value: 3, label: '低配'},
              {value: 4, label: '智享版'},
              {value: 5, label: '乐享版'},
              {value: 6, label: '租凭A版'}
            ]
          },
          {
            key: 'batteryType',
            title: '电池类型',
            array: [              // 电池类型
              {value: 1, label: '锂电池'},
              {value: 2, label: '铅酸电池'}
            ]
          },
          {
            key: 'machineNo',
            title: '电机号'
          },
          {
            key: 'controlNo',
            title: '控制器号'
          },
          {
            key: 'gearBoxNo',
            title: '变速箱号'
          },
          {
            key: 'batteryPackNumber',
            title: '电池组编号'
          },
          {
            key: 'gprsNo',
            title: 'GPRS号'
          },
          {
            key: 'factoryName',
            title: '生产基地'
          },
          {
            key: 'produceTime',
            title: '生产日期'
          },
          {
            key: 'releaseTime',
            title: '出厂日期'
          },
          {
            key: 'storageTime',
            title: '入库日期'
          },
          {
            key: 'sendTo',
            title: '销往地',
            array: [                   // 销往地
              {value: 0, label: '国内'},
              {value: 1, label: '国外'}
            ]
          },
          {
            key: 'status',
            title: '车辆状态',
            array: [                   // 状态
              {value: 0, label: '随车卡未录入'},
              {value: 1, label: '审核中'},
              {value: 3, label: '在库未售出'},
              {value: 4, label: '审核未通过'},
              {value: 5, label: '在经销处'},
              {value: 6, label: '在终端客户处'},
              {value: 7, label: '待入库'},
              {value: 8, label: '未记录去向'}
            ]
          },
          // {
          //   key: 'areaCode',
          //   title: '所属地区'
          // },
          {
            key: 'commProtocolVersion',
            title: '协议版本',
            array: [
              {value: 0, label: '三期'},
              {value: 1, label: '二期'},
              {value: 2, label: '一期'}
            ]
          },
          {
            key: 'matrixVersion',
            title: '矩阵版本',
            array: [
              {value: 0, label: 'd3'},
              {value: 1, label: '双100'},
              {value: 2, label: '模拟双80'},
              {value: 80, label: '双80'},
              {value: 3, label: 'd5'}
            ]
          },
          {
            key: 'deviceType',
            title: '设备型号'
          },
          {
            key: 'pseudoIp',
            title: '伪IP'
          },
          {
            key: 'simNumber',
            title: 'SIM卡号'
          },
          {
            key: 'iccid',
            title: 'ICCID'
          },
          {
            key: 'customerName',
            title: '客户名称'
          },
          {
            key: 'customerPhone',
            title: '手机号码'
          },
          {
            key: 'dealerName',
            title: '经销商名称'
          },
          {
            key: 'plateNo',
            title: '车牌号'
          },
          // {
          //   key: 'certificateDate',
          //   title: '合格证日期'
          // },
          {
            key: 'certificateNo',
            title: '合格证号'
          },
          {
            key: 'soldDate',
            title: '销售日期'
          },
          {
            key: 'vehicleSource',
            title: '车辆来源',
            array: [{value: 0, label: '页面添加'}, {value: 1, label: '一车一档同步'}]
          },
          {
            key: 'isActivation',
            title: '是否激活',
            array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
          },
          {
            key: 'channelCode',
            title: '链路编码'
          },
          {
            key: 'remark',
            title: '备注'
          }
        ],
        keyPartList: [],
        keyPartTitle: [
          {
            title: '条码',
            width: 240,
            key: 'partsBarcode'
          },
          {
            title: '物料编码',
            maxWidth: 130,
            key: 'materialCode'
          },
          {
            title: '零件部件名称',
            // width: 130,
            key: 'part'
          },
          {
            title: '类型/规格号',
            maxWidth: 220,
            key: 'type'
          },
          {
            title: '供应商',
            // width: 220,
            key: 'supplier'
          },
          {
            title: '批次号',
            maxWidth: 120,
            key: 'batchCode'
          },
          {
            title: '操作员',
            maxWidth: 100,
            key: 'operator'
          },
          {
            title: '安装时间',
            maxWidth: 120,
            key: 'proDate',
            render: (h, params) => {
              if (params.row.proDate) {
                return this._hyTool.DateFormat(new Date(+params.row.proDate), 'yyyy-MM-dd');
              }
            }
          },
          {
            title: '备注',
            maxWidth: 100,
            key: 'remarks'
          }
        ],
        tabsHeight: {
          height: '850px'
        },
        modalDetailShow: false,     // 详情
        show: false
      };
    },
    mounted () {
      this.$on('bridge', (val) => {
        let vinCode = val;
        if (vinCode) {
          this.show = false;
          this.$refs['tabs'].activeKey = 'vehicle';
          this._getVehicle(vinCode);
        }
      });
    },
    methods: {
      // 列表
      _getVehicle (vinCode) {
        let searchData = {
          pageNum: 1,
          pageSize: 10,
          vinCode: vinCode
        };
        vehicleListAll(searchData, res => {
          let vehicleData = res.content ? res.content : [];
          this.getDetail(vehicleData[0]);
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车辆列表失败',
            desc: ret
          });
        });
      },
      changeTabs (index) {
        if (index === 'key') {
          this.tabsHeight.height = '100%';
        } else {
          this.tabsHeight.height = '850px';
        }
      },
      // 详情
      getDetail (row) {
        this.show = true;
        this.vehicleDetail = this._hyTool.deepCopy(row);
        if (this.vehicleDetail.dealerId === 0) {
          this.vehicleDetail.dealerId = '';
        }
        this.vehicleDetail.produceTime = this.vehicleDetail.produceTime === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.produceTime), 'yyyy-MM-dd');
        this.vehicleDetail.releaseTime = this.vehicleDetail.releaseTime === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.releaseTime), 'yyyy-MM-dd');
        this.vehicleDetail.storageTime = this.vehicleDetail.storageTime === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.storageTime), 'yyyy-MM-dd');
        // this.vehicleDetail.certificateDate = this.vehicleDetail.certificateDate === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.certificateDate), 'yyyy-MM-dd');
        this.vehicleDetail.soldDate = (this.vehicleDetail.soldDate === undefined || this.vehicleDetail.soldDate < 0) ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.soldDate), 'yyyy-MM-dd');
        // 关重件
        keyPart({vinCode: row.vinCode}, res => {
          this.keyPartList = res;
        }, ret => {
          this.keyPartList = [];
          this.$Notice.error({
            title: '查询关重件信息失败',
            desc: ret
          });
        });
        this.modalDetailShow = true;
      }
    }
  };
</script>
