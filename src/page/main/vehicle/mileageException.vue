<style lang="scss" scoped>
  .carInfo{
  	margin:0 10px 10px;
	  div{
	  	width:46%;
	  	line-height:35px;
	  	display:inline-block;
	  }
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
            <FormItem label="">
              <Select v-model="searchData.carSeries" placeholder="车系" filterable clearable style="width: 200px">
                <Option v-for="item in seriesType" :value="item" :key="item" :label="item"></Option>
              </Select>
            </FormItem>
            <FormItem label="">
              <i-input placeholder="GPRS号" clearable v-model.trim="searchData.gprsNo" style="width: 200px"></i-input>
            </FormItem>
            <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                      class="search">查询
            </i-button>
            <i-button type="success" shape="circle" @click="vehicleCall" class="search">批量修复
            </i-button>
          </Form>
        </div>
        <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange" :show-checkbox="true" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
        </hy-table>
        <!-- 修复 -->
        <Modal v-model="fixModal" scrollable title="修 复" width="45">
	        <div>
	        	<!-- <span>修复过程：</span> -->
	        	<Input v-model="fixInfo" type="textarea" :rows="4" placeholder="填写修复过程" />
	        </div>
	        <div slot="footer">
	        	<Button type="ghost" @click="fixModal = false">取 消</Button>
		        <Button type="ghost" style="margin-left: 8px" @click="submitFix">确 定</Button>
		    </div>
	    </Modal>
        <!-- 详情 -->
        <Modal v-model="detailModal" scrollable title="详 情" width="45">
	        <div>
	        	<div class="carInfo">
		        	<div>VIN码：{{showVehicle.vinCode}}</div>
		        	<div>GPRS码：{{showVehicle.gprsNo}}</div>
		        	<div>车系：{{showVehicle.carSeries}}</div>
		        	<div>车型：{{showVehicle.carType}}</div>
	        	</div>
            <hy-table :column-type="columnType" :columnsTitle="detailTitle" :list="detailData" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :no-data-text="noDataText">
            </hy-table>
            <hy-page :current-page="detailPageNum" :total-element="detailTotalElement" :total-page="detailTotalPage" @current-change="val => getDetail(this.showVehicle,undefined,val)"></hy-page>
	        </div>
	        <div slot="footer">
		        <Button type="ghost" style="margin-left: 8px" @click="detailModal = false">关 闭</Button>
		    </div>
	    </Modal>
        <!-- 分页 -->
        <hy-page :current-page="searchData.pageNum" :total-element="totalElement" :total-page="totalPage" @current-change="_getList"></hy-page>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import button from '@/js/mixins/button';
  import HyTable from '@/components/common/table/table.vue';
  import { mileageException, modifyVehicle, vehicleDetailInfo } from '@/service/vehicleManageService/mileageException';
  import HyDetail from '@/components/common/detail/detail.vue';
  import { vehicleList } from '@/service/vehicleManageService/vehicleService';
  import { listAllSeries } from '@/service/vehicleManageService/basicDataService/modelService';

  export default {
    components: {
      HyTable,
      HyDetail
    },
    mixins: [list, button],
    data () {
      return {
        notFoundText: '',
        searchData: {},
        loading1: false,
        detailShow: false, // 详情
        optionsVin: [],
        seriesType: [],
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
            width: 70,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 230,
            key: 'vinCode'
          },
          {
            title: 'GPRS号',
            width: 210,
            key: 'gprsNo'
          },
          {
            title: '车系',
            width: 150,
            key: 'carSeries'
          },
          {
            title: '车型',
            width: 150,
            key: 'carType'
          },
          {
            title: '异常原因',
            width: 295,
            key: 'exceptionType',
            render: (h, params) => {
				if (params.row.exceptionType === '1') {
             		return '里程跳变';
             	} else if (params.row.exceptionType === '2') {
             		return '数据丢失';
             	} else {
             		return '-';
             	}
            }
          },
          {
            title: '当时状态',
            width: 160,
            key: 'status',
            render: (h, params) => {
             	if (params.row.currentState === 0) {
             		return '行驶中';
             	} else if (params.row.currentState === 1) {
             		return '充电中';
             	} else {
             		return '-';
             	}
            }
          },
          {
            title: '数据更新时间',
            key: 'updateTime',
            width: 200
          },
          {
            title: '操作',
            key: 'history',
            fixed: 'right',
            width: 100,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.vehicleCall, '修复', {color: '#f31a3e', type: 'xiugai', size: '20', content: '修复', placement: 'top', showTransfer: true}),
                this._hyTool.createIcon(h, params, this.getDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        fixModal: false,
        detailModal: false,
        fixInfo: '',
        fixData: {},
        showVehicle: {},
        detailPageNum: 1,
        detailTotalElement: 0,
        detailTotalPage: 0,
        detailTitle: [
        	{
                title: '总里程(km)',
                key: 'mileage'
            },
            {
                title: '车辆状态',
                key: 'vehicleStatus',
                render: (h, params) => {
                 	if (params.row.vehicleStatus === 0) {
                 		return '行驶中';
                 	} else if (params.row.vehicleStatus === 1) {
                 		return '充电中';
                 	} else {
                 		return '-';
                 	}
                }
            },
            {
                title: '状态',
                key: 'state',
                render: (h, params) => {
                  if (params.row.state === 0) {
                    return '里程跳变';
                  } else if (params.row.state === 1) {
                    return '数据丢失';
                  } else {
                    return '-';
                  }
                }
            },
            {
                title: '上一次采集时间',
                key: 'lastCollectTime'
            },
            {
                title: '采集时间',
                key: 'collectTime'
            }
        ],
        detailData: []
      };
    },
    mounted () {
      this.getAllSeries();
    },
    methods: {
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
        mileageException(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询操作列表失败',
            desc: ret
          });
        });
      },
      // VIN搜索
      vinMethod (query) {
        query = query.trim();
        if (query !== '') {
          this.loading1 = true;
          let params = {
            pageSize: 10,
            pageNum: 1,
            vinCode: query
          };
          vehicleList(params, res => {
            const vinList = res.map(item => {
              return {value: item.vinCode, label: `【${item.vinCode}】【${!item.plateNo === true ? '无车主' : item.plateNo}】`};
            });
            this.notFoundText = '';
            if (vinList.length > 0) this.notFoundText = '';
            else this.notFoundText = '无匹配数据';
            setTimeout(() => {
              this.loading1 = false;
              this.optionsVin = vinList.filter(item => {
                return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          });
        } else {
          this.optionsVin = [];
        }
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
      // 修复
      vehicleCall (row) {
      	this.fixData = {};
      	this.fixInfo = '';
      	if (row.id) {	// 如果是单条操作，记录下当前id
      		this.fixModal = true;
      		this.fixData = {ids: row.id, record: this.fixInfo};
      	} else {
      		if (this.multipleSelection.length === 0) {
      			this.$Notice.warning({
	              title: '请选择要修复的车辆'
	            });
	            return;
      		}
      		this.fixModal = true;
      		this.fixData.ids = this.multipleSelection.map(item => item.id).toString();
	        this.fixData.record = this.fixInfo;
      	}
      },
      submitFix () {
      	if (this.fixInfo) {
	      	modifyVehicle(this.fixData, res => {
	      		this.fixModal = false;
	      		this.$Notice.success({
		            title: '修复成功'
		        });
		        if (this.multipleSelection.length === this.list.length) {
	              this._getList(1);
	            } else {
	              this._getList();
	            }
	            this.multipleSelection = [];
	      	}, ret => {
	          this.$Notice.error({
	            title: '修复失败',
	            desc: ret
	          });
	        });
      	} else {
      		this.$Notice.warning({
              title: '请填写修复记录！'
            });
      	}
      },
      getDetail (row, index, page) {
      	this.showVehicle = row;
      	vehicleDetailInfo({vinCode: this.showVehicle.vinCode, pageNum: page}, res => {
      		this.detailModal = true;
      		this.detailData = res.content;
          this.detailTotalPage = res.totalPages;
          this.detailTotalElement = res.totalElements;
      	});
      }
    }
  };
</script>
