/**
* 作者：szh
* 时间：2018-03-8
* 描述：国标报警统计
**/
<style lang="scss" scoped>
  .col_ceoss {
    min-height: 100px;
    height: 70%;
    width: 100%;
  }
  .hy-sleft {
    width: 70%;
    float: left;
  }
  .hy-sright {
    // width: 20%;
    float: right;
  }
  .clearfix{
    clear:both;
    zoom:1;
    overflow: hidden;
  }
  .hy_nodata {
    text-align: center;
    height: 50%;
    width: 80%;
    display: table;
    position: absolute;
    top: 30%;
    left: 17%;
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
            <DatePicker type="date" v-model="timeBegin" placement="bottom-start" :options="reportDate" placeholder="统计范围开始日期" :editable="false" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem label="">
            <DatePicker type="date" v-model="timeEnd" placement="bottom-end" :options="reportDate" placeholder="统计范围结束日期" :editable="false" style="width: 200px;"></DatePicker>
          </FormItem>
          <FormItem label="">
            <Select placeholder="车系" v-model="searchData.serial" style="width: 200px;" clearable>
              <Option v-for="item in seriesList" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <!--<FormItem label="">-->
          <!--<Select placeholder="车型" v-model="searchData.model" style="width: 200px;" clearable>-->
          <!--<Option v-for="item in modelList" :value="item" :key="item" :label="item"></Option>-->
          <!--</Select>-->
          <!--</FormItem>-->
          <FormItem label="">
            <Select placeholder="故障等级" v-model="searchData.alarmLevel" style="width: 200px;" clearable>
              <Option v-for="item in alarmGrade" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select placeholder="报警类型" v-model="searchData.alarmCode" style="width: 200px;" filterable clearable>
              <Option v-for="(item, index) in alarmType" :value="item.value" :key="item.index" :label="item.label"></Option>
            </Select>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <i-button type="success"  shape="circle" style="margin-left: 10px;margin-top: 1px" class="export" @click="exports">导出
          </i-button>
        </Form>
      </div>
      <div id="monomer_cross" class="col_ceoss"></div>
      <div class="hy_nodata" v-if="noData" style="border: 1px solid #c5c5c5;">
          <span style="display: table-cell; vertical-align: middle;">
            <img src="/static/images/nodata.png" style="display: inline-block;width: 200px;height: 170px;" draggable="false">
          </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { listAllSeries } from '@/service/vehicleManageService/basicDataService/modelService';
  import { dapList } from '@/service/alarmService/directAlarmParams';
  import { gbAlram, gbAlramExport } from '@/service/report/nationalStandardAlarmStatistics';
  import date from '@/js/mixins/date';
  import echarts from 'echarts';
  import { mapState, mapMutations } from 'vuex';

  export default {
    mixins: [date],
    data () {
      return {
        loading: false,
        searchData: {},
        seriesList: [],
        timeBegin: new Date(+new Date() - 86400 * 1000 * 6),
        timeEnd: new Date(),
        modelList: [],
        alarmType: [],
        alarmGrade: [
          {
            label: '一级',
            value: 1
          },
          {
            label: '二级',
            value: 2
          },
          {
            label: '三级',
            value: 3
          }
        ],
        monomer_cross: {echart: null, option: null},
        dataDetail: {
          xData: [],
          yData: []
        },
        noData: true
      };
    },
    mounted () {
      this.getSeries();
      this.getAlarmType();
      this.search();
      this.monomer_cross.echart = echarts.init(document.getElementById('monomer_cross'));
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
        if (this.timeBegin) {
          this.searchData.createTimeBegin = new Date(this.timeBegin).setHours(0, 0, 0, 0);
        } else {
          delete this.searchData.createTimeBegin;
        }
        if (this.timeEnd) {
          this.searchData.createTimeEnd = new Date(this.timeEnd).setHours(23, 59, 59, 0);
        } else {
          delete this.searchData.createTimeEnd;
        }
        if (this.searchData.createTimeBegin > this.searchData.createTimeEnd) {
          if (this.isFirst) return;
          this.$Notice.warning({
            title: '',
            desc: '开始日期不能大于结束日期',
            onClose: () => {
              this.isFirst = false;
            }
          });
          this.isFirst = true;
          return;
        }
        if (this.searchData.createTimeBegin && this.searchData.createTimeEnd) {
          let bol = this.checkDate(this.searchData.createTimeBegin, this.searchData.createTimeEnd, 365);
          if (!bol) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '开始日期与结束日期间隔不能超过一年',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
        }
        // if (this.searchData.createTimeBegin > this.searchData.createTimeEnd) {
        //      this.$Notice.error({
        //       title: '',
        //       desc: '开始日期不能大于结束日期'
        //     });
        //     return;
        //   }
        this.loading = true;
        if (this.monomer_cross.echart) this.monomer_cross.echart.clear();
        this.dataDetail.xData = [];
        this.dataDetail.yData = [];
        this.ax = [];
        this.showList = {
          0: [],
          1: [],
          2: []
        };
        if (!this.searchData.serial) delete this.searchData.serial;
        if (!this.searchData.alarmLevel) delete this.searchData.alarmLevel;
        if (!this.searchData.alarmCode) delete this.searchData.alarmCode;
        this.noData = true;
        gbAlram(this.searchData, res => {
          this.loading = false;
          this.echartData = res;
          for (let i in this.echartData) {
            this.dataDetail.xData.push(`${i}`);
            this.reckon(this.echartData[i]);
            this.noData = false;
          }
          if (this.noData) return;
          for (let j in this.showList) {
            this.dataDetail.yData.push({
              name: Number.parseInt(j) === 0 ? '一级报警' : (Number.parseInt(j) === 1 ? '二级报警' : '三级报警'),
              type: 'bar',
              stack: '总量',
              barMinHeight: 15,
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: this.showList[j]
            });
          }
          this.getData();
        }, ret => {
          if (this.monomer_cross.echart) this.monomer_cross.echart.clear();
          this.loading = false;
          this.$Notice.error({
            title: '获取数据失败',
            desc: ret
          });
        });
      },
      // 拼接数据
      reckon (row) {
        let [data] = [];
        if (row.length) {
          data = row[0];
        }
        for (let i in data) {
          if (Number.parseInt(i)) {
            this.showList[i - 1].push(data[i] ? data[i] : null);
          } else {
            this.ax.push(data[i]);
          }
        }
      },
      // 获取表格数据
      getData () {
        this.monomer_cross.option = {
          title: {
            text: '报警统计',
            subtext: '（次）',
            left: '50'
          },
          grid: {
            bottom: 100
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: (params) => {
              let text = '';
              for (let item of params) {
                if (!text && item.value) {
                  text = `${item.seriesName}：${item.value}</br>`;
                } else if (item.value) {
                  text += `${item.seriesName}：${item.value}</br>`;
                }
              }
              return text;
            }
          },
          legend: {
            selectedMode: false, // 不可点击
            data: this.dataDetail.yData.map(item => {
              return item.name;
            })
          },
          xAxis: {
            type: 'category',
            data: this.dataDetail.xData,
            axisLabel: {
              interval: 0, // 横轴信息全部显示
              rotate: -45 // -45度角倾斜显示
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: this.dataDetail.yData
          // series: [
          //   {
          //     name: this.dataDetail.title,
          //     type: 'bar',
          //     data: this.dataDetail.yData,
          //     markPoint: {
          //       data: [
          //         {type: 'max', name: '最大值'},
          //         {type: 'min', name: '最小值'}
          //       ]
          //     },
          //     markLine: {
          //       data: [
          //         {type: 'average', name: '平均值'}
          //       ]
          //     }
          //   }
          // ]
        };
        this.monomer_cross.echart.setOption(this.monomer_cross.option);
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
      // getModels (row) {
      //   if (!row) {
      //     this.modelList = [];
      //     return;
      //   }
      //   let param = {
      //     vehicleSeries: row
      //   };
      //   modelList(param, res => {
      //     this.modelList = res;
      //   });
      //   this.num = false;
      // },
      // 获取报警类型
      getAlarmType () {
        let params = {
          type: '1'
        };
        dapList(params, res => {
          let data = this._hyTool.deleteObject(res, 'alarmCode');
          this.alarmType = data.map(item => {
            return {
              label: item.alarmContent,
              value: item.alarmCode
            };
          });
        });
      },
      exports () {
        if (!this.dataDetail.xData.length) {
          this.$confirm('无导出数据', '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        }
        gbAlramExport(this.searchData, res => {
          this.TASK_NUM(this.taskNum + 1);
          this.$confirm('已加入下载任务', '提示', {
            confirmButtonText: '知道了',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {}).catch(() => {});
        }, ret => {
          this.$Notice.error({
            title: '加入下载列表失败',
            desc: ret
          });
        });
      }
    },
    beforeDestroy () {
      if (this.monomer_cross.echart) this.monomer_cross.echart.dispose();
    }
  };
</script>
