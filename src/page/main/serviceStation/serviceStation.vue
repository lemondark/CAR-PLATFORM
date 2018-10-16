<style lang="scss" scoped>
  @import 'src/styles/mixins';
  .autoHeight {
    height: 100%;
  }
  .map-content {
    padding: 6px 15px 8px 6px;
  }
  .returnList {
    position: absolute;
    top: 60px;
    left: 60px;
    z-index: 999;
    height: 30px;
    width: 55px;
    background-color: #F1F1F1;
    line-height: 30px;
    font-size: 14px;
    cursor:pointer
  }
  .map-box {
    width:130px;
    height:137px;
    background:rgba(255,255,255,1);
    opacity:0.9;
    z-index: 999;
    border-radius: 10px;
    box-shadow: 1px 1px 8px RGBA(108, 108, 108, 0.27);
    position: absolute;
    top: 22px;
    right: 20px;
  }
  .map-check-group {
    width: 85%;
    margin: 0 auto;
    margin-top: 24px;
    .map-checkbox {
      padding-left: 5px;
      .map-label {
        display: inline-block;
        padding-left: 10px;
        margin-bottom: 14px;
        padding-right: 10px;
      }
      .img {
        width: 15px;
        height: 19px;
        float: right;
      }
      .img1 {
        background-image: url(/static/images/station/center.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: top center;
      }
      .img2 {
        background-image: url(/static/images/station/second.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: top center;
      }
      .img3 {
        background-image: url(/static/images/station/quick.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: top center;
      }
    }
  }
  .map-search {
    height: 36px;
    z-index: 997;
    width: 100%;
    position: absolute;
    top: 22px;
    .map-search-input {
      width: 485px;
      height: 40px;
      margin: 0 auto;
      .map-search-input_1 {
        display: inline-block;
        @include borderRadius(9999px);
        border: 1px solid #5179DF;
        background-color: white;
        overflow:hidden;
        width: 485px;
        height: 30px;
        margin: 0 auto;
        position:relative;
        input {
          outline: none;
          margin-left:10px;
          width:80%;
          margin-top:5px;
        }
        select {
          outline: none;
          margin-left:10px;
          width:80%;
          margin-top:5px;
        }
        .sea{
          cursor: pointer;
          background-color:#5179DF;
          color:white;
          display:inline-block;
          width:20%;
          text-align:center;
          line-height:28px;
          height:100%;
          position:absolute;
          top:0;
          right:0;
        }
      }
    }
  }
  .map-button {
    position: absolute;
    top: 6px;
    right: 10px;
    z-index: 998;
    float: right;
    line-height: 50px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content map-content" v-show="!mapShow">
      <div id="map" class="autoHeight">
        <div class="map-search">
          <div class="map-search-input" v-show="searchShow">
           <div style="width: 80%;float: left">
             <Select v-model="searchStationName" style="" placeholder="请选择服务站" filterable clearable>
               <Option v-for="opt in selectStationArray" :value="opt.label" :key="opt.key">{{ opt.label }}</Option>
             </Select>
           </div>
            <!--<Button class="" @click="searchStation('name')">搜索</Button>-->
            <div style="width: 20%;float: right">
              <i-button type="success" icon="ios-search" @click="searchStation('name')" shape="circle" :loading="loading"
                        class="search">查询
              </i-button>
            </div>
          </div>
        </div>
        <div class="map-box" v-show="searchShow">
          <CheckboxGroup v-model="checkboxGroup" class="map-check-group" @on-change="searchStation('check')">
            <Checkbox class="map-checkbox" label="1" :disabled="checkShow"><span class="map-label">中心站</span><div class="img img1"></div></Checkbox>
            <Checkbox class="map-checkbox" label="2" :disabled="checkShow"><span class="map-label">二级站</span><div class="img img2"></div></Checkbox>
            <Checkbox class="map-checkbox" label="3" :disabled="checkShow"><span class="map-label">快捷站</span><div class="img img3"></div></Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    </div>
    <div class="content" v-show="mapShow">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <Select v-model="searchData.serviceStationName" style="width: 260px" placeholder="请选择服务站" filterable clearable>
              <Option v-for="opt in selectStationArray" :value="opt.label" :key="opt.key">{{ opt.label }}</Option>
            </Select>
            <!--<i-input placeholder="服务站名称" v-model.trim="searchData.serviceStationName" style="width:200px;" clearable></i-input>-->
          </FormItem>
          <FormItem>
            <i-select placeholder="资质" v-model="searchData.maintenanceQualification" style="width:200px;" clearable>
              <i-option v-for="item in maintenanceQualificationArray" :value="item.value" :key="item.value" :label="item.label"></i-option>
            </i-select>
          </FormItem>
          <FormItem>
            <i-select placeholder="性质" v-model="searchData.natureStr" style="width:200px;" clearable>
              <i-option v-for="item in natureArray" :value="item.value" :key="item.value" :label="item.label"></i-option>
            </i-select>
          </FormItem>
          <Button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
        </Form>
      </div>
      <!--table部分-->
      <!--<Table border :columns="columnsTitle" :data="list" @on-selection-change="handleSelectionChange"></Table>-->
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText"></hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="_getList"></hy-page>
      <!--详情-->
      <Modal v-model="detailModalShow" :mask-closable="false" width="770">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="text-align:left">
          <hy-detail :form="modalFormData" :rowData="modalDetailItem" v-if="detailModalShow"></hy-detail>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="detailModalShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import dictionary from '@/js/mixins/dictionary';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import { serviceStationList, amapGeocode } from '@/service/serviceStationService/serviceStation';
  import AMap from 'AMap';
  import AMapUI from 'AMapUI';
  import { mapMutations } from 'vuex';
  import Bus from '@/components/common/bus';

  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail,
      Bus
    },
    mixins: [list, dictionary],
    data () {
      return {
        searchShow: false,
        loading: true,
        mapShow: false, // 展示列表或者地图 默认展示地图
        searchData: {},
        detailModalShow: false,  // 详情
        modalTitle: '',
        modalFormData: {},
        modalDetailItem: [],
        formLoading: false,
        // 列表展示的数据
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '服务站名称',
            key: 'serviceStationName'
          },
          {
            title: '24小时电话',
            key: 'hotline',
            render: (h, params) => {
              return h('a', {style: {color: '#495060'}}, params.row['hotline']);
            }
          },
          {
            title: '资质',
            key: 'maintenanceQualification',
            render: (h, params) => {
              return this.__filters.maintenanceQualification(h, params, 'maintenanceQualification');
            }
          },
          {
            title: '性质',
            key: 'nature',
            render: (h, params) => {
              return this.__filters.nature(h, params, 'nature');
            }
          },
          {
            title: '详细地址',
            key: 'detailedAddress'
          },
          {
            title: '操作',
            width: 200,
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'left'})
              ]);
            }
          }
        ],
        geocoder: null,
        listAll: [],
        markerStationList: [],
        markerProvinceList: [],
        checkboxGroup: ['1', '2', '3'],
        searchStationName: '',    // 地图筛选服务站
        cluster: '',
        districtList: [],     // 高德地图中国省份
        existData: [],        // 存在服务站的省份
        maintenanceQualificationArray: [{label: '一级', value: 1}, {label: '二级', value: 2}, {label: '三级', value: 3}, {label: '四级', value: 4}, {label: '其它', value: 5}],        // 存在服务站的省份
        natureArray: [{label: '中心站', value: 1}, {label: '二级服务站', value: 2}, {label: '快捷站', value: 3}],        // 存在服务站的省份
        checkShow: true
      };
    },
    created () {
      this.getSelectStation();
      // 查询中国所有省份
      AMap.service('AMap.DistrictSearch', () => {    // 回调函数
        // 实例化DistrictSearch
        let districtSearch = new AMap.DistrictSearch({
          level: 'country',
          subdistrict: 1
        });
        districtSearch.search('中国', (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            this.districtList = result.districtList[0].districtList;
//            console.log(JSON.stringify(this.districtList));
          }
        });
      });
    },
    mounted () {
      setTimeout(() => {
        this.searchShow = true;
      }, 1000);
      AMapUI.load(['ui/geo/DistrictCluster'], (DistrictCluster) => {
        // 初始化地图
        this.init();
      });
      this.SERVICE_SHOW({status: false});
      Bus.$on('mapoper', this.mapOper);
    },
    beforeDestroy () {
      Bus.$off('mapoper', this.mapOper);
    },
    destroyed () {
      this.SERVICE_SHOW({status: false});
    },
    methods: {
      ...mapMutations([
        'SERVICE_SHOW'
      ]),
      // 列表
      _getList (page, flag) {
        this.loading = false;
        if (!this.searchData.natureStr) {
          this.searchData.nature = '1,2,3';
        } else {
          this.searchData.nature = this.searchData.natureStr;
        }
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        serviceStationList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询服务站列表失败',
            desc: ret
          });
        });
      },
      detail (row) {
        this.modalFormData = this._hyTool.extend({}, row);
        this.modalFormData.createTime = this.modalFormData.createTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.createTime), 'yyyy-MM-dd hh:mm:ss') : '';
        this.modalFormData.updateTime = this.modalFormData.updateTime ? this._hyTool.DateFormat(new Date(+this.modalFormData.updateTime), 'yyyy-MM-dd hh:mm:ss') : '';
        this.modalDetailItem = [
          {
            title: '服务站名称',
            key: 'serviceStationName'
          },
          {
            title: '服务站简称',
            key: 'serviceStationAbbreviation'
          },
          {
            title: '24小时电话',
            key: 'hotline'
          },
          {
            title: '资质',
            key: 'maintenanceQualification',
            array: this.maintenanceQualificationArray
          },
          {
            title: '性质',
            key: 'nature',
            array: this.natureArray
          },
          {
            title: '详细地址',
            key: 'detailedAddress'
          },
//          {
//            title: '经度',
//            key: 'longitude'
//          },
//          {
//            title: '纬度',
//            key: 'latitude'
//          },
          {
            title: '状态',
            key: 'state',
            array: [{label: '正常营业', value: 1}, {label: '暂停营业', value: 2}, {label: '待建站', value: 3}, {label: '已撤站', value: 4}, {label: '为空', value: 5}]
          },
          // {
          //   key: 'createUser',
          //   title: '创建人'
          // },
          {
            key: 'createTime',
            title: '创建时间'
          },
          // {
          //   key: 'updateUser',
          //   title: '更新人'
          // },
          {
            key: 'updateTime',
            title: '更新时间'
          }
        ];
        this.detailModalShow = true;
        this.modalTitle = '详情';
      },
      mapOper (flag) {
        if (flag === 'map') {
          this.mapShow = false;
          this.SERVICE_SHOW({status: false});
        } else if (flag === 'list') {
          this.mapShow = true;
          this.SERVICE_SHOW({status: true});
        }
      },
      searchStation (str) {
        let searchData = {
          state: 1   //  1:正常营业,2:暂停营业,3:待建站,4:已撤站,5:为空,',
        };
        if (this.checkboxGroup.length > 0) {
          searchData.nature = this.checkboxGroup.join(',');
        }
        if (this.searchStationName) {
          searchData.serviceStationName = this.searchStationName;
        }
        this.getAllList(searchData, str);
      },
      // 所有经销商
      getListAll (searchData, cb) {
        if (!searchData) searchData = {};
        // 地图展示
        this.loading = true;
        serviceStationList(searchData, res => {
          this.loading = false;
          this.listAll = res;
          cb(this.listAll);
        }, ret => {
          cb();
          this.loading = false;
          this.$Notice.error({
            title: '查询经销商列表失败',
            desc: ret
          });
        });
      },
      // 添加marker标记
      addStationMarker (listall) {
        let _this = this;
        if (this.markerStationList.length > 0) {
          this.map.remove(this.markerStationList);
        }
        this.markerStationList = [];
        let flag = false;
        if (listall.length === 1) {
          flag = true;
        } else {
          flag = false;
          // this.map.setZoom(4);  // 20180330
        }
        let positionList = [];
        for (let markData of listall) {
          let icon = '';
          if (markData.nature === 1) {
            icon = '/static/images/station/centerBig.png';
          } else if (markData.nature === 2) {
            icon = '/static/images/station/secondBig.png';
          } else if (markData.nature === 3) {
            icon = '/static/images/station/quickBig.png';
          }
          if (typeof markData.geo.location === 'string') {
            AMapUI.loadUI(['overlay/SimpleInfoWindow'], (SimpleInfoWindow) => {
              let marker = new AMap.Marker({
                map: _this.map,
                icon: icon,
                offset: new AMap.Pixel(-20, -62),
                title: markData.serviceStationName,
                position: markData.geo.location.split(',')
              });
              positionList.push(marker);
              // 设置label标签
              marker.setLabel({                 //  label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(-24, 24), // 修改label相对于maker的位置
                content: markData.serviceStationName
              });
              if (this.map.getZoom() < 8) {
                marker.hide();
              }
              // 如果只有一条数据的，地图定位到这个点上
              if (flag) {
                marker.show();
                _this.map.setFitView();
                _this.map.setCenter(markData.geo.location.split(','));
              }
              _this.markerStationList.push(marker);
              markData.maintenanceQualificationObj = this.maintenanceQualificationArray.find(val => val.value === Number(markData.maintenanceQualification));
              markData.natureObj = this.natureArray.find(val => val.value === Number(markData.nature));
              // console.log('》》》' + JSON.stringify(markData));
              let infoWindow = new SimpleInfoWindow({
                infoTitle: `<strong>${markData.serviceStationName}</strong>`,
                infoBody: `<p class="my-desc">
                            <ul><label>24小时电话：</label><span>${markData.hotline}</span><li>
                            <ul><label>资质：</label><span>${markData.maintenanceQualificationObj.label}</span><li>
                            <ul><label>性质：</label><span>${markData.natureObj.label}</span><li>
                            <ul><label>详细地址：</label><span>${markData.detailedAddress}</span><li>
                            </p>`,
                // 基点指向marker的头部位置
                offset: new AMap.Pixel(-10, -72)
              });
              function openInfoWin () {
                infoWindow.open(_this.map, marker.getPosition());
              }
              // marker 点击时打开
              AMap.event.addListener(marker, 'click', () => {
                // console.log(marker);
                openInfoWin();
              });
              this.map.on('zoomchange', (ev) => {
                if (this.map.getZoom() < 8) {
                  infoWindow.close();
                }
              });
            });
          }
        }
        setTimeout(() => {
           for (let i = positionList.length - 1; i >= 0; i--) {
            for (let j = 0; j < i; j++) {
               if (positionList[i].Ig.position.lat === positionList[j].Ig.position.lat && positionList[i].Ig.position.lng === positionList[j].Ig.position.lng) {
                  positionList[i].Ig.offset.x = -20;
                  positionList[i].Ig.offset.y = -50;
               }
            }
          }
          this.checkShow = false;
        }, 1000);
      },
      // 添加marker标记
      addProvinceMarker (listall) {
        let _this = this;
        if (this.markerProvinceList.length > 0) {
          this.map.remove(this.markerProvinceList);
        }
        this.markerProvinceList = [];
        for (let markData of listall) {
          let marker = new AMap.Marker({
            map: _this.map,
            content: '<div class="amap-ui-district-cluster-marker"><span class="amap-ui-district-cluster-marker-title">' + markData.provinceName + '</span><span class="amap-ui-district-cluster-marker-body">' + markData.station.length + '</span></div>',
            title: markData.provinceName,
            position: [markData.province.center.lng, markData.province.center.lat]
          });
          // 点击后自动显示服务站图标
          let centerSta = markData.station[0].geo.location.split(',');  // 点击省份，服务站的第一个点为基点
          AMap.event.addListener(marker, 'click', () => {
            _this.map.setZoom(8);
            _this.map.setCenter([centerSta[0], centerSta[1]]);
          });
          _this.markerProvinceList.push(marker);
        }
        // 隐藏省份
        if (this.map.getZoom() > 7) {
          if (this.markerProvinceList.length > 0) {
            this.markerProvinceList.forEach(val => {
              val.hide();
            });
          }
        }
      },
      // 初始化地图
      init () {
        this.map = new AMap.Map('map', {
          resizeEnable: true,
          center: [105, 34],
          zoom: 4
        });
        // 监控缩放地图 标志的显示隐藏
        this.map.on('zoomchange', (ev) => {
          if (this.map.getZoom() < 8) {
            if (this.markerProvinceList.length > 0) {
              this.markerProvinceList.forEach(val => {
                val.show();
              });
            }
            if (this.markerStationList.length > 0) {
              this.markerStationList.forEach(val => {
                val.hide();
              });
            }
          } else {
            if (this.markerProvinceList.length > 0) {
              this.markerProvinceList.forEach(val => {
                val.hide();
              });
            }
            if (this.markerStationList.length > 0) {
              this.markerStationList.forEach(val => {
                val.show();
              });
            }
          }
        });
//        this.map.setZoom(4);
        let searchData = {
          state: 1   //  1:正常营业,2:暂停营业,3:待建站,4:已撤站,5:为空,',
        };
        if (this.checkboxGroup.length > 0) {
          searchData.nature = this.checkboxGroup.join(',');
        }
        this.getAllList(searchData);
      },
      getAllList (search, str) {
        this.checkShow = true;
        // 勾选多选框时，恢复到地图统计级别
        // if (str && str === 'check') this.map.setZoom(4);  // 20180330
        let count = 10;   // 一次请求最多10条数据
        this.getListAll(search, (listall) => {
          let content = listall;
          let num = Math.ceil(content.length / count);
          let list = [];
          for (let i = 0; i < num; i++) {
            let start = i === 0 ? i : (i * count);
            let end = start + count;
            let str = content.slice(start, end);
            let strList = [];
            str.forEach(val => {
              if (val.detailedAddress) {
                // 补充精确详细地址
                if (val.detailedAddress.indexOf('区') === -1 && val.detailedAddress.indexOf('市') === -1 && val.detailedAddress.indexOf('省') === -1) {
                  strList.push(val.provinceName + '省' + val.cityName + val.countyName + val.detailedAddress);
                } else if (val.detailedAddress.indexOf('区') > -1 && val.detailedAddress.indexOf('市') === -1 && val.detailedAddress.indexOf('省') === -1) {
                  strList.push(val.provinceName + '省' + val.cityName + val.detailedAddress);
                } else if (val.detailedAddress.indexOf('区') > -1 && val.detailedAddress.indexOf('市') > -1 && val.detailedAddress.indexOf('省') === -1) {
                  strList.push(val.provinceName + '省' + val.detailedAddress);
                } else {
                  strList.push(val.detailedAddress);
                }
              }
            });
            list.push(strList.join('|'));
          }
          this.existData = [];
          // 解析详细地址
          this.getGeo(list, value => {
            if (value.length === content.length) {
              for (let i = 0; i < value.length; i++) {
                content[i].geo = value[i];
              }
              this.addStationMarker(content);  // 添加marker标记
            }
            let districtCode = [];
            let warningList = [];
            // 统计省份中的服务站数量
            this.districtList.forEach(val1 => {  // 全部省份
              content.forEach(val2 => {  // 服务站
                // 省份 === 服务站
                if (val2.geo) {
                  if (val1.name === val2.geo.province) {
                    if (districtCode.length > 0 && districtCode.find(va => va === val1.name)) {
                      this.existData.forEach(val3 => {
                        if (val3.provinceName === val1.name) {
                          val3.station.push(val2);
                        }
                      });
                    } else {
                      districtCode.push(val1.name);
                      let data = {
                        provinceName: val1.name,
                        province: val1,
                        station: []
                      };
                      data.station.push(val2);
                      this.existData.push(data);
                    }
                  }
                } else {
                  if (!warningList.find(val => val === val2)) {
                    warningList.push(val2);
                  }
                }
              });
            });
            for (let i of warningList) {
              this.checkShow = false;
              this.$Notice.warning({
                title: i.serviceStationName + '详细地址解析错误'
              });
            }
            this.addProvinceMarker(this.existData);    // 添加marker标记
          });
        });
      },
      // 通过详细地址获取经纬度
      getGeo (list, cb) {
        let vals = [];
        amapGeocode(list, res => {
          res.forEach(val => {
            val.data.geocodes.forEach(va => {
              vals.push(va);
            });
          });
          cb(vals);
        });
      }
    }
  };
</script>
