/**
* 作者：szh
* 时间：2018-03-8
* 描述：单车统计
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
    height: 79%;
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
    height: 79%;
    width: 80%;
    .col_ceoss {
      min-height: 100px;
      height: 100%;
      min-width: 100px;
      width: 100%;
    }
    .hy_nodata {
      text-align: center;
      height: 70%;
      width: 100%;
      display: table;
      position: relative;
      bottom: 95%;
      left: 0;
    }
  }
  .x-sidebar-left {
    height: 115px;
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
        <Form label-position="right" inline :label-width="80">
          <FormItem label="VIN码">
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
          <FormItem label="统计粒度">
            <RadioGroup v-model="checkType" type="button" @on-change="changeCheck">
              <Radio v-for="item in granularity" :key="item.value" :label="item.value">{{item.label}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="统计范围">
            <RadioGroup v-model="rangeType" type="button"  v-show="checkType !== 3" @on-change="changeRange">
              <Radio v-for="item in range" :key="item.value" :label="item.value">{{item.label}}</Radio>
              <Radio label="更多"></Radio>
            </RadioGroup>
            <DatePicker v-show="checkType === 3" v-model="checkYear" type="year" placeholder="年" style="width: 200px"></DatePicker>
            <div class="hy_timer" v-show="timeShow">
              <DatePicker type="date" v-model="searchData.timeBegin" :options="reportDate" placeholder="开始日期" style="width: 150px;" :editable="false"></DatePicker>
              -
              <DatePicker type="date" v-model="searchData.timeEnd" placement="bottom-end" :options="reportDate" placeholder="结束日期" style="width: 150px;" :editable="false"></DatePicker>
            </div>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="search" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
        </Form>
      </div>
      <div class="hy_left clearfix">
        <div style="float: left">
          <img src="/static/images/leftlist.png">
          <div style="clear:both;"></div>
          <div class="x-sidebar-left"></div>
          <img src="/static/images/leftlist.png">
          <div style="clear:both;"></div>
          <div class="x-sidebar-left" style="height: 60px;"></div>
        </div>
        <div style="float: left">
          <div style="float:left;margin-top:5px;position:relative;">
            <p style="font-size:16px;color:#A4A4A4">单车统计</p>
            <div class="enginerTop" v-for="(list,index) in navLists" :class="{normal: changeColor === index}" :key="list.value" @click="contrast(index, list)">
              <p >{{list.label}}</p>
            </div>
            <p style="font-size:16px;color:#A4A4A4;margin-top:10px;position:absolute;top:145px;">电池包统计</p>
          </div>
        </div>
      </div>
      <div class="hy_right">
        <div id="monomer_cross" class="col_ceoss"></div>
        <div class="hy_nodata" v-if="noData" style="border: 1px solid #c5c5c5;">
          <span style="display: table-cell; vertical-align: middle;">
            <img src="/static/images/nodata.png" style="display: inline-block;width: 200px;height: 170px;" draggable="false">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import echarts from 'echarts';
  import { vehicleRunningList } from '@/service/report/bicycleStatistics';
  import date from '@/js/mixins/date';
  const onDay = 86400000;

  export default {
    mixins: [date, storeVin],
    data () {
      return {
        noData: true,
        typeShow: false,
        loading: false,
        timeShow: false,
        changeColor: 0,
        checkYear: '',
        searchData: {
        },
        checkType: 1,
        selectType: '',
        granularity: [
          {
            label: '日',
            value: 1
          },
          {
            label: '周',
            value: 2
          },
          {
            label: '月',
            value: 3
          }
        ],
        rangeType: 7,
        range: [
          {
            label: '近7天',
            value: 7
          },
          {
            label: '近半月',
            value: 15
          },
          {
            label: '近1月',
            value: 30
          }
        ],
        navLists: [
          {
            label: '行驶时长',
            subtext: '分钟',
            value: 'runningMinutes'
          },
          {
            label: '里程统计',
            subtext: '公里',
            value: 'runningMileage'
          },
          {
            label: '总里程统计',
            subtext: '公里',
            value: 'totalMileage'
          },
          {
            label: '报警统计',
            subtext: '次',
            value: 'totalAlarmCount'
          },
          {
            label: '充电次数',
            subtext: '次',
            value: 'chargeTimes'
          },
          {
            label: '压差',
            subtext: '压差 V',
            value: 'volDiff'
          }
        ],
        isFirst: true,
        dataDetail: {
          title: '在线统计',
          subtext: '',
          xData: [],
          yData: []
        },
        monomer_cross: {echart: null, option: null}
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
    },
    methods: {
      // 搜索
      search () {
        let searchData = {};
        if (!this.searchData.vin) {
          if (this.isFirsts) return;
          this.$Notice.warning({
            title: '请输入VIN码',
            desc: '',
            onClose: () => {
              this.isFirsts = false;
            }
          });
          this.isFirsts = true;
          return;
        }
        if (this.checkType === 3) {
          if (!this.checkYear) {
            if (this.isFirsts) return;
            this.$Notice.warning({
              title: '请选择年份',
              desc: '',
              onClose: () => {
                this.isFirsts = false;
              }
            });
            this.isFirsts = true;
            return;
          } else {
            searchData.createTimeBegin = this.checkYear.getTime();
            searchData.createTimeEnd = Date.UTC(this.checkYear.getFullYear(), 11, 31, 15, 59, 0);
          }
        } else {
          if (typeof this.rangeType === 'number') {
            searchData.createTimeBegin = new Date().getTime() - onDay * this.rangeType;
            searchData.createTimeEnd = new Date().getTime();
          } else {
            if (this.searchData.timeBegin) {
              searchData.createTimeBegin = new Date(this.searchData.timeBegin).setHours(0, 0, 0, 0);
            } else {
              if (this.isFirsts) return;
              this.$Notice.warning({
                title: '请输入开始日期',
                desc: '',
                onClose: () => {
                  this.isFirsts = false;
                }
              });
              this.isFirsts = true;
              return;
            }
            if (this.searchData.timeEnd) {
              searchData.createTimeEnd = new Date(this.searchData.timeEnd).setHours(23, 59, 59, 0);
            } else {
              if (this.isFirsts) return;
              this.$Notice.warning({
                title: '请输入结束日期',
                desc: '',
                onClose: () => {
                  this.isFirsts = false;
                }
              });
              this.isFirsts = true;
              return;
            }
            if (searchData.createTimeBegin > searchData.createTimeEnd) {
              if (this.isFirsts) return;
              this.$Notice.warning({
                title: '',
                desc: '开始日期不能大于结束日日期',
                onClose: () => {
                  this.isFirsts = false;
                }
              });
              this.isFirsts = true;
              return;
            }
            if (searchData.timeBegin && searchData.timeEnd) {
              let bol = this.checkDate(searchData.createTimeBegin, searchData.createTimeEnd, 90);
              if (!bol) {
                if (this.isFirsts) return;
                this.$Notice.warning({
                  title: '',
                  desc: '开始日期与结束日期间隔不能超过三个月',
                  onClose: () => {
                    this.isFirsts = false;
                  }
                });
                this.isFirsts = true;
                return;
              }
            }
            if (this.searchData.timeBegin > this.searchData.timeEnd) {
              this.$Notice.error({
                title: '',
                desc: '开始日期不得大于结束日期'
              });
              return;
            }
          }
        }
        searchData.vinCode = this.searchData.vin;
        this.loading = true;
        let _this = this;
        if (this.monomer_cross.echart) this.monomer_cross.echart.clear();
        this.dataDetail.xData = [];
        this.dataDetail.yData = [];
        this.noData = false;
        searchData.unit = this.checkType;
        vehicleRunningList(searchData, res => {
          this.loading = false;
          this.excelData = _this._hyTool.extend({}, searchData);
          this.echartData = res;
          if (this.echartData.length > 0) {
            if (this.isFirst) {
              this.monomer_cross.echart = echarts.init(document.getElementById('monomer_cross'));
              this.isFirst = false;
            }
            this.typeShow = true;
            this.contrast(this.changeColor, this.navLists[this.changeColor]);
          } else {
            this.typeShow = false;
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
        this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      // 统计粒度
      changeCheck (value) {
        this.timeShow = false;
        this.searchData.timeBegin = '';
        this.searchData.timeEnd = '';
        this.checkYear = '';
        if (value === 1) {
          this.rangeType = 7;
          this.range = [
            {
              label: '近7天',
              value: 7
            },
            {
              label: '近半月',
              value: 15
            },
            {
              label: '近1月',
              value: 30
            }
          ];
        } else if (value === 2) {
          this.rangeType = 30;
          this.range = [
            {
              label: '近1月',
              value: 30
            },
            {
              label: '近3月',
              value: 90
            },
            {
              label: '近半年',
              value: 180
            }
          ];
        } else {
          let year = new Date().getFullYear();
          this.checkYear = `${year}-01-01 00:00:00`;
          this.rangeType = '';
          this.range = [];
        }
      },
      // 统计范围
      changeRange (value) {
        if (value === '更多') {
          this.timeShow = true;
        } else {
          this.timeShow = false;
        }
      },
      // 切换报表
      contrast (index, data) {
        this.changeColor = index;
        if (!this.typeShow) return;
        this.monomer_cross.echart.clear();
        this.selectType = data.value;
        this.dataDetail = {
          title: data.label,
          subtext: data.subtext,
          xData: [],
          yData: [],
          maxVolDiff: [],
          minVolDiff: [],
          avgVolDiff: []
        };
        for (let item of this.echartData) {
          if (item['date'] || item['week'] || item['mouth']) {
            if (this.checkType === 1) {
              this.dataDetail.xData.push(this._hyTool.DateFormat(new Date(+item['date']), 'yyyy-MM-dd'));
            } else if (this.checkType === 2) {
              this.dataDetail.xData.push(item['week']);
            } else if (this.checkType === 3) {
              this.dataDetail.xData.push(item['mouth']);
            }
            if (this.selectType === 'volDiff') {
              this.dataDetail.maxVolDiff.push(Number.isInteger(item.maxVolDiff) ? item.maxVolDiff : Number.parseFloat(item.maxVolDiff).toFixed(3));
              this.dataDetail.minVolDiff.push(Number.isInteger(item.minVolDiff) ? item.minVolDiff : Number.parseFloat(item.minVolDiff).toFixed(3));
              this.dataDetail.avgVolDiff.push(Number.isInteger(item.avgVolDiff) ? item.avgVolDiff : Number.parseFloat(item.avgVolDiff).toFixed(3));
            } else {
              this.dataDetail.yData.push(Number.isInteger(item[this.selectType]) ? item[this.selectType] : Number.parseFloat(item[this.selectType]).toFixed(2));
            }
          }
        }
        if (this.selectType === 'volDiff') {
          this.getDiff();
        } else {
          this.getData();
        }
      },
      // 获取表格数据
      getData () {
        this.monomer_cross.option = {
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
              end: 100
            }
          ],
          grid: {
            y2: 140,
            top: 100
          },
          xAxis: {
            type: 'category',
            //  boundaryGap: false,
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
//              position: 'top',
//              formatter: '{c}'
//            }
//          }
        };
        this.monomer_cross.echart.setOption(this.monomer_cross.option);
      },
      // 压差
      getDiff () {
        this.monomer_cross.option = {
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
          legend: {
            data: ['最大值', '最小值', '平均值']
          },
          xAxis: {
            type: 'category',
            //  boundaryGap: false,
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
          series: [
            {
              name: '最大值',
              type: 'bar',
              data: this.dataDetail.maxVolDiff
            },
            {
              name: '最小值',
              type: 'bar',
              data: this.dataDetail.minVolDiff
            },
            {
              name: '平均值',
              type: 'bar',
              data: this.dataDetail.avgVolDiff
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100
            },
            {
              show: true,
              start: 0,
              end: 100
            }
          ],
          grid: {
            y2: 140
          }
        };
        this.monomer_cross.echart.setOption(this.monomer_cross.option);
      }
    },
    beforeDestroy () {
      this.searchData.type = 1;
      this.monomer_cross = {echart: null, option: null};
      this.isFirst = true;
      if (this.monomer_cross.echart) this.monomer_cross.echart.dispose();
    }
  };
</script>
