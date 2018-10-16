<style lang="scss" scoped>
  .map {
    min-width: 500px;
    min-height: 400px;
    margin-top: 10px;
  }
  #excptMap{
    width:100%;
    min-height:600px;
    background:#ddd;
  }
  .selectItem{
    position:absolute;
    right:15%;
    top:0;
  }
  .selectItem .list_item{
    display:inline-block;
    width:80px;
    margin:0 10px;
    text-align:center;
    vertical-align:middle;
    border-radius:10px;
    border:1px solid #ddd;
    padding:5px 15px;
    cursor:pointer;
    .value{
      font-size:18px;
      font-weight:bold;
    }
  }
  .selectItem .list_item.active{
    border-color:#4784ff;
  }
  .exportBtn{
    position:absolute;
    right:10px;
    top:10px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div v-show="!mapShow">
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
            <FormItem label="">
              <Select v-model="searchData.carSeries" placeholder="车系" filterable clearable style="width: 200px">
                <Option v-for="item in seriesType" :value="item" :key="item" :label="item"></Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <i-input placeholder="GPRS号" clearable v-model.trim="searchData.gprsNo" style="width: 200px"></i-input>
            </FormItem>
            <FormItem label="">
              <Select v-model="searchData.state" placeholder="状态" filterable clearable style="width: 200px">
                <Option v-for="item in stateOptions" :value="item.value" :key="item.value" :label="item.label"></Option>
              </Select>
            </FormItem>
            <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                      class="search">查询
            </i-button>
            <i-button type="success" shape="circle" @click="vehicleCall" v-if="buttonShow('车辆唤醒')"
                      class="search">批量唤醒
            </i-button>
            <i-button type="success" shape="circle" @click="goRecord"
                      class="search">唤醒记录
            </i-button>
            <FormItem style="float:right;margin: 0 10px;"><Button @click="refresh()" type="ghost" shape="circle">刷 新</Button></FormItem>
          </Form>
        </div>
        <Spin fix v-if="spinShow">刷新耗时较长，请稍候...</Spin>
        <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                  :show-checkbox="true" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
        </hy-table>
        <!-- 分页 -->
        <hy-page :current-page="searchData.pageNum" :total-element="totalElement" :total-page="totalPage" @current-change="_getList"></hy-page>
      </div>
      <div v-show="mapShow" style="position: relative;">
        <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
          <Form label-position="right" inline :label-width="10">
            <FormItem label="">
              <Select
                placeholder="VIN码"
                style="width: 200px"
                v-model="mapVincode"
                filterable
                remote
                transfer
                clearable
                :remote-method="vinMethod"
                ref="mapSelect"
                :not-found-text="notFoundText"
                :loading="loading1">
                <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
              </Select>
            </FormItem>
            <i-button type="success" icon="ios-search" @click="getSingleExceptCar" shape="circle" class="search">查询
            </i-button>
          </Form>
          <div class="selectItem">
            <span>未上报天数：</span>
            <div class="list_item" :class="chooseItem === 1 ? 'active' : ''" @click="getExceptCar(1)"><p class="value">{{exceptCount['1']||0}}</p><p>≥7 天</p></div>
            <div class="list_item" :class="chooseItem === 2 ? 'active' : ''" @click="getExceptCar(2)"><p class="value">{{exceptCount['2']||0}}</p><p>≥15 天</p></div>
            <div class="list_item" :class="chooseItem === 3 ? 'active' : ''" @click="getExceptCar(3)"><p class="value">{{exceptCount['3']||0}}</p><p>≥1个月</p></div>
            <div class="list_item" :class="chooseItem === 4 ? 'active' : ''" @click="getExceptCar(4)"><p class="value">{{exceptCount['4']||0}}</p><p>≥3个月</p></div>
            <div class="list_item" :class="chooseItem === 5 ? 'active' : ''" @click="getExceptCar(5)"><p class="value">{{exceptCount['5']||0}}</p><p>≥半 年</p></div>
          </div>
          <i-button @click="exportData" :disabled="!chooseItem" class="exportBtn">导 出</i-button>
        </div>
        <div id="excptMap"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import button from '@/js/mixins/button';
  import AMap from 'AMap';
  import HyTable from '@/components/common/table/table.vue';
  import { vehicleException, vehicleCall, refreshVehicleException } from '@/service/vehicleManageService/vehicleException';
  import HyDetail from '@/components/common/detail/detail.vue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { getVehicleExceptionCount, getVehiclePosition, getSingleCarPosition, exportData } from '@/service/vehicleManageService/vehicleService';
  import { listAllSeries } from '@/service/vehicleManageService/basicDataService/modelService';
  import { mapMutations } from 'vuex';
  import Bus from '@/components/common/bus';

  export default {
    components: {
      HyTable,
      HyDetail
    },
    mixins: [list, button, storeVin],
    data () {
      return {
        searchData: {},
        detailShow: false, // 详情
        seriesType: [],
        spinShow: false, // 刷新遮罩层
        stateOptions: [{
          value: 0,
          label: '离线中'
        }, {
          value: 1,
          label: '唤醒中'
        }, {
          value: 2,
          label: '唤醒失败'
        }],
        mapShow: false,
        // 列表展示的数据
        columnType: 'index',
        columnsTitle: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '序号',
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 200,
            key: 'vinCode'
          },
          {
            title: '车系',
            width: 120,
            key: 'carSeries'
          },
          {
            title: '车辆颜色',
            width: 120,
            key: 'carColor'
          },
          {
            title: 'GPRS号',
            width: 200,
            key: 'gprsNo'
          },
          {
            title: '下线日期',
            width: 155,
            key: 'outTime',
            render: (h, params) => {
              return this.__filters.formatDate(h, params, 'outTime');
            }
          },
          {
            title: '异常原因',
            width: 280,
            key: 'exceptionInformation'
          },
          {
            title: '状态',
            width: 160,
            key: 'state',
            render: (h, params) => {
              if (params.row.state === 0) {
                return '离线中';
              } else if (params.row.state === 1) {
                return '唤醒中';
              } else {
                return '唤醒失败';
              }
            }
          },
          {
            title: '数据更新时间',
            key: 'updateTime',
            width: 190,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            key: 'history',
            fixed: 'right',
            width: 80,
            render: (h, params) => {
             if (params.row.gprsNo.length !== 17) {
              return '';
             } else {
              return h('div', [
                this.buttonShow('车辆唤醒') ? this._hyTool.createIcon(h, params, this.vehicleCall, '唤醒', {color: '#9BE298', type: 'huanxingfuwu', size: '25', content: '唤醒', placement: 'top', showTransfer: true}) : null
              ]);
             }
            }
          }
        ],
        mapVincode: '',
        exceptCount: {},
        chooseItem: 1
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      this.watchVin('mapSelect');
      this.getAllSeries();
      this.map_Init();
      this.getVehicleExceptionCount();
      this.getExceptCar(1);
      if (this.$route.query.current) {
        this._getList(this.$route.query.current);
      }
      this.EXCEPTCAR_SHOW({status: false});
      Bus.$on('caroper', this.caroper);
    },
    methods: {
      ...mapMutations([
        'EXCEPTCAR_SHOW'
      ]),
      caroper (flag) {
        if (flag === 'list') {
          this.mapShow = false;
          this.EXCEPTCAR_SHOW({status: false});
        } else if (flag === 'map') {
          this.mapShow = true;
          this.EXCEPTCAR_SHOW({status: true});
        }
      },
      _getList (page, flag) {
        this.loading = true;
        if (!this.searchData.carSeries) {
          delete this.searchData.carSeries;
        }
        if (!this.searchData.gprsNo) {
          delete this.searchData.gprsNo;
        }
        if (!this.searchData.vinCode) {
          delete this.searchData.vinCode;
        }
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        vehicleException(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询操作列表失败',
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
        });
      },
      // 跳转唤醒记录
      goRecord () {
        this.$router.push({path: '/main/vehicle/wakeUpRecord', query: {recode: this.searchData.pageNum}});
      },
      // 车辆唤醒
      vehicleCall (row) {
        let params = '';
        if (row.id) {
          params = row.id;
        } else {
          if (this.multipleSelection.length === 0) {
            this.$Notice.warning({
              title: '请选择要唤醒的车辆'
            });
            return;
          }
          params = this.multipleSelection.map(item => item.id).toString();
        }
        this.$confirm('即将唤醒异常车辆?', '批量唤醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vehicleCall({ids: params}, res => {
            if (this.multipleSelection.length === this.list.length) {
              this._getList(1);
            } else {
              this._getList();
            }
          }, ret => {
            this.$Notice.error({
              title: '唤醒失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      },
      refresh () {
        this.$confirm('数据刷新耗时较长，是否继续操作?', '刷新', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.spinShow = true;
          refreshVehicleException({}, res => {
            this.$Notice.success({
              title: '刷新成功'
            });
            this._getList(1);
          }, ret => {
            this.spinShow = false;
            this.$Notice.error({
              title: '刷新失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      },
      // 初始化地图
      map_Init () {
        this.map = new AMap.Map('excptMap', {
          resizeEnable: true,
          center: [114.30525, 36.59276], // 地图中心点
          zoom: 4  // 地图显示的缩放级别
        });
        AMap.event.addListener(this.map, 'zoomend', () => {
          // 地图滚动时，关闭信息框
          this.map.clearInfoWindow();
        });
      },
      getVehicleExceptionCount () {
        getVehicleExceptionCount({}, res => {
          this.exceptCount = res;
        });
      },
      getExceptCar (type) {
        this.chooseItem = type;
        this.mapVincode = '';
        getVehiclePosition({type: type}, res => {
          this.carPositon(res);
        });
      },
      getSingleExceptCar () {
        if (this.mapVincode) {
          getSingleCarPosition({vinCode: this.mapVincode}, res => {
            this.chooseItem = undefined;
            if (Object.keys(res).length > 0) {
              res.vinCode = this.mapVincode;
              this.carPositon([res]);
            } else {
              this.carPositon([]);
              this.$Notice.error({
                title: this.mapVincode + '无异常记录！'
              });
            }
          });
        this.storeVin(this.mapVincode);
        } else {
          this.getExceptCar(1);
        }
      },
      carPositon (data) {
        var markersArr = [];
        this.map.clearInfoWindow();
        this.map.setZoom(4);
        var icon = new AMap.Icon({
          size: new AMap.Size(33, 23),
          image: '/static/images/offlineHome.png',
          imageSize: new AMap.Size(33, 23)
        });
        data.map(item => {
          let marker = new AMap.Marker({
            position: [item.longitude, item.latitude],
            icon: icon,
            offset: new AMap.Pixel(-10, -10)
          });
          // 信息窗口
          var infoWindow = new AMap.InfoWindow({
              content: '<div style="text-align:center;"><p style="margin-bottom:5px;">VIN码:' + item.vinCode + '</p><p>最后一次上报时间：' + this._hyTool.DateFormat(new Date(+item.collectTime), 'yyyy-MM-dd hh:mm:ss') + '</p></div>',
              offset: new AMap.Pixel(16, -25)
          });
          var _this = this;
          AMap.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker.getPosition());
          });
          // marker.setMap(this.map);
          markersArr.push(marker);
        });
        var count = markersArr.length;
        var _renderCluserMarker = function (context) {
          var factor = Math.pow(context.count / count, 1 / 18);
          var div = document.createElement('div');
          var Hue = 180 - factor * 180;
          var bgColor = 'hsla(' + Hue + ',100%,50%,0.8)';
          var fontColor = '#fff';
          var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
          var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
          div.style.backgroundColor = bgColor;
          var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
          div.style.width = div.style.height = size + 'px';
          div.style.border = 'solid 1px ' + borderColor;
          div.style.borderRadius = size / 2 + 'px';
          div.style.boxShadow = '0 0 1px ' + shadowColor;
          div.innerHTML = context.count;
          div.style.lineHeight = size + 'px';
          div.style.color = fontColor;
          div.style.fontSize = '14px';
          div.style.textAlign = 'center';
          context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
          context.marker.setContent(div);
        };
        /* eslint-disable no-new */
        if (this.cluster) {
          this.cluster.setMap(null);
        }
        this.cluster = new AMap.MarkerClusterer(this.map, markersArr, {
          gridSize: 100,
          maxZoom: 17,
          renderCluserMarker: _renderCluserMarker
        });
      },
      exportData () {
        exportData({type: this.chooseItem}, res => {
          this.$Notice.success({
            title: '已添加到下载列表！'
          });
        }, ret => {
          this.$Notice.error({
            title: ret
          });
        });
      }
    },
    beforeDestroy () {
      Bus.$off('caroper', this.caroper);
    },
    destroyed () {
      this.EXCEPTCAR_SHOW({status: false});
    }
  };
</script>
