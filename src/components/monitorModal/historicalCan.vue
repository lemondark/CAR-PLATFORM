
<style lang="scss" scoped>
  @import 'src/styles/mixins';
  .hy_left {
    float: left;
    height: 400px;
    width: 20%;
    img {
      float:left;
      margin-right:5px;
    }
    .normal{
      background-color: #D8E5FF;
      p{
        color:#4A85FF;
      }
      p:before{
        background-color:#4A85FF !important
      }
    }
    .enginerTop {
      font-size:14px;
      color:black;
      margin-left:20px;
      //  margin-top:3px;
      p {
        line-height:30px;
        cursor:pointer;
        position:relative;
      }
      p:before {
        position:absolute;
        left:-15px;
        top:10px;
        display:block;
        content:'';
        width:10px;
        height:10px;
        @include borderRadius(9999px);
        background-color:black;
      }
    }
    .enginerTop:nth-child(3) {
      margin-bottom:35px;
    }
    .enginerTop:nth-child(2) {
      margin-top:5px;
    }
  }
  .hy_right {
    float: left;
    height: 400px;
    width: 80%;
    .col_ceoss {
      text-align: center;
      min-height: 100px;
      height: 400px;
      width: 740px;
    }
    .hy_nodata {
      text-align: center;
      height: 70%;
      width: 100%;
      display: table;
    }
  }
  .bgcolor{
    background-color: #ffffff;
    height: 100%;
    .content {
      padding: 0 1.7%;
      overflow: hidden;
    }
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-bottom: 20px;">
        <Form label-position="right" inline>
          <FormItem>
            <Select
              placeholder="VIN码"
              style="width: 200px;"
              :class="warnTip"
              v-model="searchData.vin"
              filterable
              remote
              clearable
              :remote-method="vinMethod"
              :not-found-text="notFoundText"
              ref="select"
              :loading="loading1">
              <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeBegin" placement="bottom-end" placeholder="开始时间" :clearable="false" :editable="false" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem label="">
            <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeEnd" placement="bottom-end" placeholder="结束时间" :clearable="false" :editable="false" style="width: 200px;"></DatePicker>
          </FormItem>
          <Button type="primary" icon="ios-search" @click="search" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--<Button type="primary"  @click="exports" shape="circle"-->
                  <!--style="margin-left: 10px;margin-top: 1px;font-size:16px;" class="export">导出-->
          <!--</Button>-->
          <!--工具条部分-->
        </Form>
      </div>
      <div class="hy_left clear">
        <img src="/static/images/can/enginer.png">
        <div style="float:left;margin-top:5px;position:relative;">
          <p style="font-size:16px;color:#A4A4A4">驱动电机</p>
          <div class="enginerTop" v-for="(list,index) in navLists" :class="{normal: changeColor === index}" :key="list.value" @click="contrast(index, list)">
            <p >{{list.label}}</p>
          </div>
          <p style="font-size:16px;color:#A4A4A4;margin-top:10px;position:absolute;top:85px;">动力电池</p>
        </div>
      </div>
      <div class="hy_right">
        <div id="monomer_cross_m" class="col_ceoss" v-show="!noData"></div>
        <div class="hy_nodata" v-show="noData" style="border: 1px solid #c5c5c5;">
          <span style="display: table-cell; vertical-align: middle;">
            <img src="/static/images/nodata.png" style="display: inline-block;width: 200px;height: 170px;" draggable="false">
          </span>
        </div>
      </div>
      <!--导出-->
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd">
        <p slot="header" class="hy-modal-title">
          <span>新增历史can下载任务</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="100">
            <FormItem label="CAN数据类型" prop="canTypes">
              <i-select v-model="modalFormData.canTypes" multiple clearable>
                <i-option v-for="item in typeList" :value="item.value" :key="item.value" :label="item.label"></i-option>
              </i-select>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import { mapState, mapMutations } from 'vuex';
  import { canList, excelCan } from '@/service/monitor/historicalCan';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import date from '@/js/mixins/date';
  let isFirst = true;
  export default {
    name: 'historicalCan',
    mixins: [date, storeVin],
    data () {
      return {
        noData: true,
        navLists: [
          {
            label: '母线电压',
            subtext: '电压 V',
            value: 1
          },
          {
            label: '母线电流',
            subtext: '电流 A',
            value: 2
          },
          {
            label: 'SOC',
            subtext: '百分比 %',
            value: 3
          },
          {
            label: '单体最高电压',
            subtext: '电压 V',
            value: 4
          },
          {
            label: '单体最低电压',
            subtext: '电压 V',
            value: 5
          },
          {
            label: '单体最高温度',
            subtext: '温度 ℃',
            value: 6
          },
          {
            label: '总电压',
            subtext: '电压 V',
            value: 7
          },
          {
            label: '总电流',
            subtext: '电流 A',
            value: 8
          },
          {
            label: '压差',
            subtext: '压差 V',
            value: 9
          }
        ],
        changeColor: 0,
        warnTip: 'warn',
        loading: false,
        echartData: [],
        searchData: {
          timeBegin: new Date(+new Date() - 86400 * 1000),
          timeEnd: new Date(),
          type: 1
        },
        typeList: [],
        modalAddFormShow: false,
        modalFormData: {
          canTypes: []
        },
        formLoading: false,
        monomer_cross_m: {echart: null, option: null},
        dataDetail: {
          title: '母线电压',
          subtext: '电压 V',
          xData: [],
          yData: []
        },
        ruleValidate: {
          canTypes: [
            {required: true, type: 'array', message: '请选择数据类型', trigger: 'change'}
          ]
        }
      };
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      this.$on('bridge', (val) => {
        let vinCode = val;
        // console.log('>>>>' + val);
        if (vinCode) {
          this.searchData.vin = vinCode;
          setTimeout(() => {
            this.$refs.select.setQuery(vinCode);
          }, 1000);
          this.search();
        }
      });
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 获取表格数据
      getData () {
        this.monomer_cross_m.option = {
          title: {
            text: this.dataDetail.title,
            subtext: this.dataDetail.subtext
          },
          tooltip: {
            trigger: 'axis'
          },
          toolbox: {
            right: 100,
            show: true,
            feature: {
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            },
            {
              show: true,
              start: 0,
              end: 100,
              left: '15%',
              right: '15%'
            }
          ],
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dataDetail.xData
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name: this.dataDetail.title,
              type: 'line',
              data: this.dataDetail.yData,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        };
        // this.monomer_cross_m.echart.clear();
        this.monomer_cross_m.echart.setOption(this.monomer_cross_m.option);
      },
      search () {
        let searchData = {};
        if (!this.searchData.vin) {
          // this.$Notice.warning({
          //     title: '请输入VIN码',
          //     desc: ''
          //   });
          this.warnTip = 'warncolor';
          return;
        } else {
          this.warnTip = 'warn';
        }
        searchData.vin = this.searchData.vin;
        searchData.type = this.searchData.type;
        if (this.searchData.timeBegin) {
          searchData.timeBegin = +new Date(this.searchData.timeBegin);
        } else {
          if (this.isFirsts) return;
          this.$Notice.warning({
            title: '',
            desc: '请选择开始时间',
            onClose: () => {
              this.isFirsts = false;
            }
          });
          this.isFirsts = true;
          return;
        }
        if (this.searchData.timeEnd) {
          searchData.timeEnd = +new Date(this.searchData.timeEnd);
        } else {
          if (this.isFirsts) return;
          this.$Notice.warning({
            title: '',
            desc: '请选择结束时间',
            onClose: () => {
              this.isFirsts = false;
            }
          });
          this.isFirsts = true;
          return;
        }
        if (searchData.timeBegin >= searchData.timeEnd) {
          if (this.isFirsts) return;
          this.$Notice.warning({
            title: '',
            desc: '开始时间不能大于或等于结束时间',
            onClose: () => {
              this.isFirsts = false;
            }
          });
          this.isFirsts = true;
          return;
        }
        let bol = this.checkDate(searchData.timeBegin, searchData.timeEnd, 7);
        if (!bol) {
          if (this.isFirsts) return;
          this.$Notice.warning({
            title: '',
            desc: '开始时间与结束时间间隔不能超过七天',
            onClose: () => {
              this.isFirsts = false;
            }
          });
          this.isFirsts = true;
          return;
        }
        let _this = this;
        if (this.monomer_cross_m.echart) this.monomer_cross_m.echart.clear();
        this.dataDetail.xData = [];
        this.dataDetail.yData = [];
        this.loading = true;
        this.noData = false;
        canList(searchData, res => {
          this.loading = false;
          this.excelData = _this._hyTool.extend({}, searchData);
          this.echartData = res;
          if (this.echartData !== null && this.echartData.length > 0) {
            if (isFirst) {
              this.monomer_cross_m.echart = echarts.init(document.getElementById('monomer_cross_m'));
              isFirst = false;
            }
            for (let item of _this.echartData) {
              if (item.time) {
                _this.dataDetail.xData.push(this._hyTool.DateFormat(new Date(+item.time), 'yyyy-MM-dd hh:mm:ss'));
                _this.dataDetail.yData.push(item.data === null ? 0 : item.data);
              }
            }
            if (_this.dataDetail.xData.length === 0) {
              this.noData = true;
              return;
            }
            this.getData();
          } else {
            this.noData = true;
            this.echartData = [];
            this.monomer_cross_m.echart.clear();
          }
        }, ret => {
          this.excelData = {};
          this.loading = false;
          this.$Notice.error({
            title: '获取数据失败',
            desc: ret
          });
        });
        this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      contrast (index, data) {
        this.searchData.type = data.value;
        this.dataDetail = {
          title: data.label,
          subtext: data.subtext,
          xData: [],
          yData: []
        };
        this.changeColor = index;
        this.search();
      },
      // 导出
      // exports () {
      //   if (!this.excelData || !this.excelData.vin) {
      //     this.$confirm('无导出数据', '提示', {
      //       showConfirmButton: false,
      //       showCancelButton: false,
      //       type: 'warning'
      //     }).then(() => {
      //     }).catch(() => {
      //     });
      //     return;
      //   }
      //   for (let item of this.vehicleDatas) {
      //     if (this.excelData.vin === item.vinCode) {
      //       if (item.matrixVersion === 0) {    // d3
      //         this.typeList = [
      //           {
      //             label: '整车、电机',
      //             value: 'OVERVIEW'
      //           },
      //           {
      //             label: '电池',
      //             value: 'BATTERY'
      //           },
      //           {
      //             label: 'BCM',
      //             value: 'D3BCM'
      //           },
      //           {
      //             label: 'ADAS',
      //             value: 'D3ADAS'
      //           },
      //           {
      //             label: 'BMS',
      //             value: 'D3BMS'
      //           },
      //           {
      //             label: 'MC',
      //             value: 'D3MC'
      //           },
      //           {
      //             label: 'GENERAL',
      //             value: 'D3VCUGENERAL'
      //           },
      //           {
      //             label: 'MSG',
      //             value: 'D3VCU'
      //           },
      //           {
      //             label: 'TPMS',
      //             value: 'D3TPMS'
      //           }
      //         ];
      //       } else if (item.matrixVersion === 1) {   // d2
      //         this.typeList = [
      //           {
      //             label: '整车、电机',
      //             value: 'OVERVIEW'
      //           },
      //           {
      //             label: '电池',
      //             value: 'BATTERY'
      //           },
      //           {
      //             label: 'GPS',
      //             value: 'GPS'
      //           },
      //           {
      //             label: 'HVAC',
      //             value: 'HVAC'
      //           },
      //           {
      //             label: 'BCM',
      //             value: 'BCM'
      //           },
      //           {
      //             label: 'VMS',
      //             value: 'VMS'
      //           },
      //           {
      //             label: 'PEPS',
      //             value: 'PEPS'
      //           },
      //           {
      //             label: 'EPS',
      //             value: 'EPS'
      //           },
      //           {
      //             label: 'ADAS',
      //             value: 'ADAS'
      //           },
      //           {
      //             label: 'BMS',
      //             value: 'BMS'
      //           },
      //           {
      //             label: 'OBC',
      //             value: 'OBC'
      //           },
      //           {
      //             label: 'MC',
      //             value: 'MC'
      //           },
      //           {
      //             label: 'ACU',
      //             value: 'ACU'
      //           },
      //           {
      //             label: 'DCDC',
      //             value: 'DCDC'
      //           },
      //           {
      //             label: 'ICU',
      //             value: 'ICU'
      //           }
      //         ];
      //       } else {
      //         this.$confirm('未获取到该车的can矩阵', '提示', {
      //           confirmButtonText: '知道了',
      //           showCancelButton: false,
      //           type: 'warning'
      //         }).then(() => {
      //         }).catch(() => {
      //         });
      //       }
      //       break;
      //     }
      //   }
      //   this.modalAddFormShow = true;
      // },
      returnAdd () {
        this.$refs['formAdd'].resetFields();
        this.modalFormData.canTypes = [];
      },
      save () {
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            if (!this.excelData) {
              this.$Notice.warning({
                title: '请先查询'
              });
              return;
            }
            let params = {
              vin: this.excelData.vin,
              timeBegin: this.excelData.timeBegin,
              timeEnd: this.excelData.timeEnd,
              canTypes: ''
            };
            canList({...params, type: 1}, res => {
              if (!res.length) {
                this.$confirm('无导出数据', '提示', {
                  showConfirmButton: false,
                  showCancelButton: false,
                  type: 'warning'
                }).then(() => {
                }).catch(() => {
                });
              } else {
                for (let i = 0; i < this.modalFormData.canTypes.length; i++) {
                  if (i === 0) {
                    params.canTypes = this.modalFormData.canTypes[0];
                  } else {
                    params.canTypes = params.canTypes + ',' + this.modalFormData.canTypes[i];
                  }
                }
                excelCan(params, res => {
                  this.modalAddFormShow = false;
                  this.TASK_NUM(this.taskNum + 1);
                  this.returnAdd();
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
            });
          }
        });
      }
    },
    beforeDestroy () {
      this.searchData.type = 1;
      this.monomer_cross_m = {echart: null, option: null};
      isFirst = true;
      if (this.monomer_cross_m.echart) this.monomer_cross_m.echart.dispose();
    }
  };
</script>
