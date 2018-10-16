/**
* 作者：szh
* 时间：2018-03-8
* 描述：电池供应商报警统计
**/
<style lang="scss" scoped>
  @import 'src/styles/mixins';
  .hy_timer {
    display: inherit;
    margin-top: 5px;
    margin-left: -64px;
  }
  .hy_left {
    float: left;
    height: 100%;
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
    .enginerTop:nth-child(5) {
      margin-bottom:35px;
    }
    .enginerTop:nth-child(2) {
      margin-top:5px;
    }
  }
  .hy_right {
    float: left;
    height: 100%;
    width: 80%;
    .col_ceoss {
      min-height: 100px;
      height: inherit;
      min-width: 100px;
      width: 100%;
      margin-bottom: 70px;
    }
    .hy_nodata {
      text-align: center;
      height: 70%;
      width: 100%;
      display: table;
    }
  }
  .x-sidebar-left {
    height: 80px;
    width:1px;
    padding-right: 14.5px;
    border-right: 1.5px solid #abcbff;
    font-size: 0;
    margin-left: -5px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" :label-width="10" inline>
          <FormItem label="">
            <DatePicker type="date" v-model="searchData.timeBegin" :options="reportDate1" placement="bottom-start" placeholder="统计范围开始日期" :editable="false"></DatePicker>
          </FormItem>
          <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
          <FormItem label="">
            <DatePicker type="date" v-model="searchData.timeEnd" :options="reportDate1" placement="bottom-end" placeholder="统计范围结束日期" :editable="false"></DatePicker>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success"   shape="circle" style="margin-left: 10px;margin-top: 1px" class="export" @click="exports">导出
          </i-button>
        </Form>
      </div>
      <div class="hy_left clear">
        <div style="float: left">
          <img src="/static/images/leftlist.png">
          <div style="clear:both;"></div>
          <div class="x-sidebar-left"></div>
        </div>
        <div style="float: left">
          <div style="float:left;margin-top:5px;position:relative;">
            <p style="font-size:16px;color:#A4A4A4">电池供应商统计</p>
            <div class="enginerTop" v-for="(list,index) in navLists" :class="{normal: changeColor === index}" :key="list.value" @click="contrast(index, list)">
              <p >{{list.label}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="hy_right">
        <div class="hy_nodata" v-if="noData" style="border: 1px solid #c5c5c5;">
          <span style="display: table-cell; vertical-align: middle;">
            <img src="/static/images/nodata.png" style="display: inline-block;width: 200px;height: 170px;" draggable="false">
          </span>
        </div>
        <div id="monomer_cross" class="col_ceoss" v-show="!noData"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import { supplierTotalAlarm, avgVehAlarm, supplierTotalAlarmExport, supplierAvgAlarmExport } from '@/service/report/batterySupplierAlarmStatistics';
  import { dapList } from '@/service/alarmService/directAlarmParams';
  import date from '@/js/mixins/date';
  import { mapState, mapMutations } from 'vuex';

  export default {
    mixins: [date],
    data () {
      return {
        noData: true,
        optionsVin: [],          // vin码
        yList: [],
        echartData: [],
        loading: false,
        changeColor: 0,
        showList: [],
        searchData: {
          type: 1
        },
        navLists: [
          {
            label: '报警总数统计',
            subtext: '',
            value: 1
          },
          {
            label: '单车平均报警次数',
            subtext: '',
            value: 2
          }
        ],
        dataDetail: {
          title: '在线统计',
          xData: [],
          yData: []
        },
        monomer_cross: {echart: null, option: null},
        colorList: []
      };
    },
    mounted () {
      this.getAlarmType();
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 搜索
      search () {
        let searchData = {};
        if (!this.searchData.timeBegin || !this.searchData.timeEnd) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '',
            desc: '请选择起止时间',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        if (this.searchData.timeBegin) {
          searchData.start = new Date(this.searchData.timeBegin).setHours(0, 0, 0, 0);
          this.searchData.start = searchData.start;
        } else {
          delete searchData.start;
          delete this.searchData.start;
        }
        if (this.searchData.timeEnd) {
          searchData.end = new Date(this.searchData.timeEnd).setHours(23, 59, 59, 0);
          this.searchData.end = searchData.end;
        } else {
          delete searchData.end;
          delete this.searchData.end;
        }
        if (searchData.end < searchData.start) {
          if (this.message) return;
          this.message = true;
          this.$Notice.warning({
            title: '',
            desc: '开始日期不能大于结束日期',
            onClose: () => {
              this.message = false;
            }
          });
          return;
        }
        // let bol = this.checkDate(searchData.start, searchData.end, 90);
        // if (!bol) {
        //   if (this.isFirst) return;
        //   this.$Notice.warning({
        //     title: '',
        //     desc: '开始日期与结束日期间隔不能超过三个月',
        //     onClose: () => {
        //       this.isFirst = false;
        //     }
        //   });
        //   this.isFirst = true;
        //   return;
        // }
        this.loading = true;
        let _this = this;
        this.noData = false;
        if (this.monomer_cross.echart) {
          this.monomer_cross.echart.clear();
        }
        this.dataDetail.xData = [];
        this.dataDetail.yData = [];
        for (let item of this.showList) {
          item.data = [];
        }
        let searchApi = supplierTotalAlarm;
        if (this.searchData.type === 1) {
          searchApi = supplierTotalAlarm;
        } else if (this.searchData.type === 2) {
          searchApi = avgVehAlarm;
        }
        searchApi(searchData, res => {
          this.loading = false;
          this.excelData = _this._hyTool.extend({}, searchData);
          this.echartData = _this._hyTool.deepCopy(res);
          this.yList = [];
          if (this.echartData.length > 0) {
            if (this.searchData.type === 1) {   // 报警总数统计
              for (let item = 0; item < _this.echartData.length; item++) {
                _this.dataDetail.xData.push(_this.echartData[item].supplier);
                let obj = _this.echartData[item].alarmCounts;
                let max = 0;
                for (let key in obj) { // 超出y轴
                  if (obj[key].alarmContent !== null) max += Number(obj[key].count);
                };
                this.yList.push(max);
                _this.pushData(_this.echartData[item].alarmCounts, item);
              }
            } else {
              for (let item of _this.echartData) {
                _this.dataDetail.xData.push(item.supplier);
                _this.dataDetail.yData.push(item.count);
              }
            }
            if (_this.dataDetail.xData.length === 0) {
              this.noData = true;
              return;
            }
            if (!this.monomer_cross.echart) {
              this.monomer_cross.echart = echarts.init(document.getElementById('monomer_cross'));
            }
            if (this.searchData.type === 1) {
              this.getData1();
            } else {
              this.getData();
            }
          } else {
            this.noData = true;
            this.echartData = [];
            this.monomer_cross.echart.clear();
          }
        }, ret => {
          this.excelData = {};
          this.loading = false;
          this.$Notice.error({
            title: '获取数据失败',
            desc: ret
          });
        });
      },
      // 切换报表
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
      pushData (item, index) {
        for (let i in item) {
          for (let data of this.showList) {
            if (item[i].alarmCode === data.code) {  //  && item[i].alarmContent === data.name
              if (index === 0) {
                data.data.push(item[i].count);
              } else {
                if (data.data.length === 0) {
                  if (index === 1) {
                    data.data.push(null, item[i].count);
                  } else {
                    let len = index - data.data.length;
                    for (let j = 0; j < len; j++) {
                      data.data.push(null);
                    }
                    data.data.push(item[i].count);
                  }
                } else {
                  if (data.data.length < index) {
                    let len = index - data.data.length;
                    for (let j = 0; j < len; j++) {
                      data.data.push(null);
                    }
                    data.data.push(item[i].count);
                  } else {
                    data.data.push(item[i].count);
                  }
                }
              }
              break;
            }
          }
        }
      },
      // 获取表格数据
      getData () {
        this.monomer_cross.option = {
          title: {
            text: this.dataDetail.title,
            subtext: '（次）'
            //  left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            name: '(供应商)',
            nameTextStyle: {
              padding: [20, 0, 0, 5]
            },
            data: this.dataDetail.xData,
            axisLabel: { // 坐标轴刻度标签的相关设置。
              interval: 0,
              rotate: 45,
              formatter: function (params) {
                var newParamsName = '';// 最终拼接成的字符串
                var paramsNameNumber = params.length;// 实际标签的个数
                var provideNumber = 25;// 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = '';// 表示每一次截取的字符串
                    var start = p * provideNumber;// 开始截取的位置
                    var end = start + provideNumber;// 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p === rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber);
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + '\n';
                    }
                    newParamsName += tempStr;// 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params;
                }
                // 将最终的字符串返回
                return newParamsName;
              }
            }
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
              type: 'bar',
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
//          label: {
//            normal: {
//              show: true,
//                position: 'top',
//                formatter: '{c}'
//            }
//          }
        };
        this.monomer_cross.echart.setOption(this.monomer_cross.option);
      },
      // 获取
      getData1 () {
        this.monomer_cross.option = {
          color: this.colorList,
          title: {
            text: this.dataDetail.title,
            subtext: '（次）'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
              let paramString = `${params[0].axisValue}<br />`;
              params.map(item => {
                if (item.value !== undefined) {
                  paramString += `${item.marker}${item.seriesName}:&nbsp${item.value}次<br />`;
                }
              });
              return paramString;
            }
          },
          legend: {
            bottom: '2%',
            selectedMode: false, // 不可点击
            data: this.showList.map(item => {
              return item.name;
            })
          },
          grid: {
            left: '3%',
            right: '6%',
            bottom: '30%',
            containLabel: true
            //  y2: 140
          },
          xAxis: {
            type: 'category',
            name: '(供应商)',
            nameTextStyle: {
              padding: [20, 0, 0, -10]
            },
            data: this.dataDetail.xData,
            axisLabel: {
              interval: 0, // 横轴信息全部显示
              rotate: 45 // -45度角倾斜显示
            }
          },
          yAxis: {
            type: 'value',
            max: (paramss) => {
              if (paramss.max === Math.max(...this.yList)) {
                let a = paramss.max.toString().slice(paramss.max.toString().length - 1);
               if (a > 0) {
                 if (paramss.max.toString().length === 2) paramss.max = paramss.max + (10 - a);
                 else if (paramss.max.toString().length === 3) paramss.max = paramss.max - a + 10;
                 else if (paramss.max.toString().length === 4) paramss.max = paramss.max - a + 100;
                 else if (paramss.max.toString().length > 4) paramss.max = paramss.max - a + 1000;
               }
                return paramss.max;
              } else {
                return Math.max(...this.yList);
              }
            },
            // max: Math.max(...this.yList),
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: this.showList
        };
        this.monomer_cross.echart.setOption(this.monomer_cross.option);
        // console.log(this.monomer_cross.echart.getOption());
      },
      // 报警类型
      getAlarmType () {
        let params = {
          componentCode: 'BMS',
          type: 1
        };
        dapList(params, res => {
          this.showList = this.dedupe(res);
          //   console.log(this.showList);
          // const colors = ['#000000', '#ADFF2F', '#0000FF', '#E0EEE0', '#008B8B', '#00FA9A', '#00FF00', '#00FFFF', '#707070', '#483D8B', '#556B2F', '#D2691E', '#EE82EE', '#FF6347', '#FFE4B5', '#FA8072', '#DCDCDC', '#A52A2A', '#8FBC8F', '#00FA9A', '#2F4F4F', '#4876FF', '#5B5B5B', '#8B2323'];
          const colors = ['#000000', '#696969', '#800000', '#FF0000', '#CD5C5C', '#BC8F8F', '#FF6347', '#FFA07A', '#A0522D', '#FFDAB9', '#FFA500', '#B8860B', '#FFD700', '#F0E68C', '#808000', '#6B8E23', '#7CFC00', '#8FBC8F', '#3CB371', '#9ACD32', '#40E0D0', '#4682B4', '#6495ED', '#000080', '#E6E6FA', '#9932CC', '#EE82EE', '#C71585', '#FFB6C1'];
          for (let i = 0; i < this.showList.length; i++) {
            if (i <= colors.length - 1) this.colorList.push(colors[i]);
            else this.colorList.push(colors[0]);
          }
        });
      },
      // 去重
      dedupe (array) {
        let result = this._hyTool.deleteObject(array, 'alarmCode', 'alarmContent');
        return result.map(item => {
          return {
            name: item.alarmContent.length > 40 ? `${item.alarmContent.substring(0, 40)}......` : item.alarmContent,
            code: item.alarmCode,
            type: 'bar',
            stack: '类型',
            barMaxWidth: 100,
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: []
          };
        });
      },
      exports () {
        if (!this.echartData.length) {
          this.$confirm('无导出数据', '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        }
        let api = null;
        if (this.searchData.type === 1) {
          api = supplierTotalAlarmExport;
        } else {
          api = supplierAvgAlarmExport;
        }
        this.searchData.createTimeBegin = this.searchData.start;
        this.searchData.createTimeEnd = this.searchData.end;
        api(this.searchData, res => {
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
    },
    beforeDestroy () {
      this.searchData.type = 1;
      this.monomer_cross = {echart: null, option: null};
      if (this.monomer_cross.echart) this.monomer_cross.echart.dispose();
    }
  };
</script>
