<style lang="scss" scoped>
.mainBox{
  padding:10px 20px;
}
.dataTable{
  margin:30px 0 20px;
}
.page{
  float:right;
}
</style>

<template>
  <div class="mainBox">
     <Form ref="gpsForm" :model="gpsForm" :rules="rule" inline>
        <FormItem prop="gps">
            <Input size="large" :clearable="true" v-model="gpsForm.gps" icon="edit" placeholder="请输入17位GPS编号" style="width: 200px"></Input>
        </FormItem>
        <FormItem>
            <Button :disabled="disabled" type="primary" @click="handleSubmit('gpsForm')">执 行</Button>
        </FormItem>
        <FormItem>
            <div>SIM卡号：{{simCard}}</div>
        </FormItem>
        <FormItem style="float:right;margin: 0 10px;"><Button @click="refresh()" type="ghost" shape="circle">刷 新</Button></FormItem>
    </Form>
    <div style="width:90%;margin:0 auto;">
      <!-- <p>当前正在进行第 {{ current + 1 }} 步</p> -->
      <Steps :current="current" :status="status">
          <Step title="新增虚拟车辆"></Step>
          <Step title="发送网关切换信息"></Step>
          <Step title="查询切换短信回执" :content="content1"></Step>
          <Step title="检查是否切换成功" :content="content2"></Step>
          <Step title="删除虚拟车辆"></Step>
      </Steps>
    </div>
    <Table :columns="columns" :data="data" class="dataTable"></Table>
    <Page :total="total" @on-change="getTableData" show-total class="page"></Page>
  </div>
</template>

<script>
  import { addVirtualVehicle, sendGatewayChangeSms, queryGatewayChangeSmsResult, queryDataReportResult, deleteVirtualVehicle, getList } from './gateway';
  export default {
    name: 'gpsTest',
    data () {
      return {
        gpsForm: {
          gps: ''
        },
        simCard: '-',
        rule: {
          gps: [
            { required: true, message: 'GPS编码不能为空', trigger: 'blur' }
          ]
        },
        disabled: false,
        current: -1,
        status: undefined,
        content1: '',
        content2: '',
        timer1: true,
        timer2: true,
        columns: [
          {
            title: 'GPS',
            key: 'gprsNo'
          },
          {
            title: 'SIM号',
            key: 'simNo'
          },
          {
            title: '短信发送时间',
            key: 'sendTime',
            render: (h, params) => {
              return params.row.sendTime ? this._hyTool.DateFormat(new Date(+params.row.sendTime), 'yyyy-MM-dd hh:mm:ss') : '';
            }
          },
          {
            title: '切换成功时间',
            key: 'receiveTime',
            render: (h, params) => {
              return params.row.receiveTime ? this._hyTool.DateFormat(new Date(+params.row.receiveTime), 'yyyy-MM-dd hh:mm:ss') : '';
            }
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              if (params.row.status === 1) {
                return '1-新增虚拟车辆';
              } else if (params.row.status === 2) {
                return '2-发送网关切换信息';
              } else if (params.row.status === 3) {
                return '3-查询切换短信回执';
              } else if (params.row.status === 4) {
                return '4-检查是否切换成功';
              } else if (params.row.status === 5) {
                return '5-删除虚拟车辆';
              } else {
                return '-';
              }
            }
          },
          {
            title: '操作',
            key: 'action',
          //  width: 150,
            align: 'center',
            render: (h, params) => {
              if (params.row.status !== 5) {
                if (params.row.status === 2) {
                  return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.resume(params.row);
                            }
                        }
                    }, '继续执行'),
                    h('Button', {
                        props: {
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.resume(params.row, 'send');
                            }
                        }
                    }, '重发短信')
                  ]);
                } else {
                  return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.resume(params.row);
                            }
                        }
                    }, '继续执行')
                  ]);
                }
              }
            }
          }
        ],
        data: [],
        total: 30
      };
    },
    mounted () {
      // 查询表格数据
      this.getTableData(undefined, 1);
    },
    methods: {
      handleSubmit (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.disabled = true;
            this.current = -1;
            this.getTableData(this.gpsForm.gps.trim(), 1);
          }
        });
      },
      resume (row, status) {
        this.gpsForm.gps = row.gprsNo.trim();
        this.simCard = row.simNo;
        this.disabled = true;
        if (!status) {
          if (row.status === 1) {
            this.sendGatewayChangeSmsFun();
          } else if (row.status === 2) {
            this.queryGatewayChangeSmsResultFun();
          } else if (row.status === 3) {
            this.queryDataReportResultFun();
          } else if (row.status === 4) {
            this.deleteVirtualVehicleFun();
          } else if (row.status === 5) {
            this.disabled = false;
            this.addVirtualVehicleFun();
          } else {
            this.disabled = false;
            return;
          }
        } else {
          // 重发短信
          this.sendGatewayChangeSmsFun();
        }
      },
      errorFun (ret) {
        this.status = 'error';
        this.disabled = false;
        this.$Message.error(ret);
      },
      // 新增虚拟车辆
      addVirtualVehicleFun () {
        this.current = 0;
        addVirtualVehicle({gprsNo: this.gpsForm.gps.trim()}, res => {
          this.status = undefined;
          this.getTableData(undefined, 1);
          this.sendGatewayChangeSmsFun();
        }, this.errorFun);
      },
      // 发送网关切换信息
      sendGatewayChangeSmsFun () {
        this.current = 1;
        sendGatewayChangeSms({gprsNo: this.gpsForm.gps.trim()}, res => {
          this.status = undefined;
          this.getTableData(undefined, 1);
          this.queryGatewayChangeSmsResultFun();
        }, this.errorFun);
      },
      // 查询切换短信回执
      queryGatewayChangeSmsResultFun () {
        var t = null;
        var _this = this;
        this.current = 2;
        var getSmsResult = function () {
          if (_this.timer1) {
            queryGatewayChangeSmsResult({gprsNo: _this.gpsForm.gps.trim()}, res => {
              _this.status = 'process';
              if (res) {
                clearTimeout(t);
                _this.content1 = '';
                _this.getTableData(undefined, 1);
                _this.queryDataReportResultFun();
              } else {
                _this.content1 = '正在查询中...';
                t = setTimeout(getSmsResult, 10000);
              }
            }, _this.errorFun);
          } else {
            clearTimeout(t);
          }
        };
        getSmsResult();
      },
      // 检查是否切换成功
      queryDataReportResultFun () {
        var t = null;
        var _this = this;
        this.current = 3;
        var getReportResult = function () {
          if (_this.timer2) {
            queryDataReportResult({gprsNo: _this.gpsForm.gps.trim()}, res => {
             _this.status = 'process';
              if (res) {
                clearTimeout(t);
                _this.content2 = '';
                _this.getTableData(undefined, 1);
                _this.deleteVirtualVehicleFun();
              } else {
                _this.content2 = '正在检查中...';
                t = setTimeout(getReportResult, 30000);
              }
            }, _this.errorFun);
          } else {
            clearTimeout(t);
          }
        };
        getReportResult();
      },
      // 删除虚拟车辆
      deleteVirtualVehicleFun () {
        this.current = 4;
        deleteVirtualVehicle({gprsNo: this.gpsForm.gps.trim()}, res => {
          this.status = undefined;
          this.disabled = false;
          this.getTableData(undefined, 1);
        }, this.errorFun);
      },
      getTableData (gprsno, index) {
        getList({gprsNo: gprsno, pageNum: index, pageSize: 15}, res => {
          if (gprsno) {
            if (res.content[0]) { // 数据存在时，从已有的状态开始执行
              this.resume(res.content[0]);
            } else {  // 数据不存在时，从新增开始
              this.simCard = '-';
              this.addVirtualVehicleFun();
            }
          } else {
            this.total = res.totalPages;
            this.data = res.content;
          }
        });
      },
      refresh () {
        location.reload();
      }
    },
    beforeDestroy () {
      this.timer1 = false;
      this.timer2 = false;
    }
  };
</script>
