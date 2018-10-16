/**
* 作者：szh
* 时间：2018-01-15
* 描述：车型管理
**/
<style lang="scss" scoped>
  .hy_input {
    width: 200px;
    margin-left: 5px;
  }
  h2 {
    font-size: 15px;
    font-weight: 700;
  }
  .hy_leftInput {
    width: 100px;
    margin-left: 5px;
  }
  .hy_rightInput {
    width: 100px;
  }
  .hy_span {
    color: #c7cad1;
    margin-left: 20px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline>
          <FormItem label="">
            <Select placeholder="车系" v-model="searchData.vehicleSeries" @on-change="getModels" style="width: 200px;" clearable>
              <Option v-for="item in seriesList" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select placeholder="车型" v-model="searchData.vehicleModle" style="width: 200px;" clearable>
              <Option v-for="item in modelList" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <Button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--工具条部分-->
          <!-- 添加功能 -->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('车系新增')">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#5179DF' size='22' @click="addOrUpdate()">新增</hy-icon>
            <!--<Button type="ghost" class="hy-search-button" :class="delClasses" shape="circle" @click="deleteArea()">删除</Button>-->
          </div>
        </Form>
      </div>
      <!--table部分-->
      <!--<Table border :columns="columnsTitle" :data="list" @on-selection-change="handleSelectionChange"></Table>-->
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="showCheckbox" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText"></hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="_getList"></hy-page>
      <!--新增-->
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd" width="700">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}车型</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95" inline>
            <h2>基本信息</h2>
            <FormItem label="车系" prop="vehicleSeries">
              <i-input class="hy_input" v-model="modalFormData.vehicleSeries" placeholder="由中文、字母、数字组成" :maxlength="20" clearable></i-input>
            </FormItem>
            <FormItem label="车型名称" prop="vehicleModle">
              <i-input class="hy_input" v-model="modalFormData.vehicleModle" placeholder="由中文、字母、数字组成" :maxlength="20" clearable></i-input>
            </FormItem>
            <!--<FormItem label="状态">-->
            <!--<i-select placeholder="" class="hy_input" v-model="modalFormData.status" filterable>-->
            <!--<i-option value="0">可用</i-option>-->
            <!--<i-option value="1">不可用</i-option>-->
            <!--</i-select>-->
            <!--</FormItem>-->
            <FormItem label="描述" prop="describtion">
              <i-input type="textarea" v-model.trim="modalFormData.describtion" placeholder="" :maxlength="250" style="width: 515px;"></i-input>
            </FormItem>
            <h2 style="float: left;">国补数据阀值</h2><h2 style="float: left; padding-left: 24%;">下限</h2><h2 style="float: left; padding-left: 20%;">上限</h2>
            <FormItem label="车辆每天累计行驶里程 (km)" :label-width="215" prop="dailyMileageLower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.dailyMileageLower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="dailyMileageUpper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.dailyMileageUpper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(0<= 合理 <=220)</span>
            </FormItem>
            <FormItem label="充电满一次电可续航里程 (km)"  :label-width="215" prop="rechargeMileageLower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.rechargeMileageLower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="rechargeMileageUpper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.rechargeMileageUpper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(155<= 合理 <=180)</span>
            </FormItem>
            <FormItem label="一次充满电所需最少时间 模式一 (h)" :label-width="215" prop="chargerMidSoc1Lower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.chargerMidSoc1Lower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="chargerMidSoc1Upper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.chargerMidSoc1Upper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(12.8<= 合理 <=15.5)</span>
            </FormItem>
            <FormItem label="一次充满电所需最少时间 模式二 (h)" :label-width="215" prop="chargerMidSoc2Lower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.chargerMidSoc2Lower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="chargerMidSoc2Upper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.chargerMidSoc2Upper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(7.5<= 合理 <=10.5)</span>
            </FormItem>
            <FormItem label="一次充满电所需最少时间 模式三 (h)" :label-width="215" prop="chargerMidSoc3Lower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.chargerMidSoc3Lower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="chargerMidSoc3Upper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.chargerMidSoc3Upper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(6.2<= 合理 <=7.6)</span>
            </FormItem>
            <FormItem label="最大充电功率 (kw)" :label-width="215" prop="maxElePowerLower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.maxElePowerLower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="maxElePowerUpper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.maxElePowerUpper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(1300<= 合理 <=3400)</span>
            </FormItem>
            <FormItem label="平均单日运行时间 (h)" :label-width="215" prop="dailyRunTimeLower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.dailyRunTimeLower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="dailyRunTimeUpper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.dailyRunTimeUpper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(0<= 合理 <=5)</span>
            </FormItem>
            <FormItem label="百公里耗电量 (kWh/100km)" :label-width="215" prop="powerConsumptionLower">
              <i-input class="hy_leftInput" v-model.trim="modalFormData.powerConsumptionLower" placeholder="" :maxlength="5" clearable></i-input>
            </FormItem>
            <FormItem prop="powerConsumptionUpper" :label-width="50">
              <i-input class="hy_rightInput" v-model.trim="modalFormData.powerConsumptionUpper" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(9<= 合理 <=11)</span>
            </FormItem>
            <FormItem label="百分比电能" :label-width="215" prop="powerPercent">
              <i-input class="hy_leftInput" style="width: 264px;" v-model.trim="modalFormData.powerPercent" placeholder="" :maxlength="5" clearable></i-input>
              <span class="hy_span">(17<= 合理 <=19)</span>
            </FormItem>
            <!--<FormItem prop="powerConsumptionUpper" :label-width="50">-->
            <!--<i-input class="hy_rightInput" v-model.trim="modalFormData.powerConsumptionUpper" placeholder="" :maxlength="5" clearable></i-input>-->
            <!--<span class="hy_span">(17<= 合理 <=19)</span>-->
            <!--</FormItem>-->
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import button from '@/js/mixins/button';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { seriesList, seriesSave, seriesDelete, listAllSeries, modelList } from '@/service/vehicleManageService/basicDataService/modelService';
  import { handles } from '@/js/libs/checkValue';

  export default {
    components: {
      HyTable,
      HyFormItem
    },
    mixins: [list, button],
    data () {
      let checkValue = (rule, value, callback) => {
        let min = 0;
        let max = 0;
        let upper = 0;   // 上限
        let lower = 0;   // 下限
        if (rule.fullField === 'dailyMileageLower' || rule.fullField === 'dailyMileageUpper') {
          min = 0;
          max = 220;
          if (rule.fullField === 'dailyMileageLower') {
            upper = this.modalFormData.dailyMileageUpper;
          } else {
            lower = this.modalFormData.dailyMileageLower;
          }
        } else if (rule.fullField === 'rechargeMileageLower' || rule.fullField === 'rechargeMileageUpper') {
          min = 155;
          max = 180;
          if (rule.fullField === 'rechargeMileageLower') {
            upper = this.modalFormData.rechargeMileageUpper;
          } else {
            lower = this.modalFormData.rechargeMileageLower;
          }
        } else if (rule.fullField === 'chargerMidSoc1Lower' || rule.fullField === 'chargerMidSoc1Upper') {
          min = 12.8;
          max = 15.5;
          if (rule.fullField === 'chargerMidSoc1Lower') {
            upper = this.modalFormData.chargerMidSoc1Upper;
          } else {
            lower = this.modalFormData.chargerMidSoc1Lower;
          }
        } else if (rule.fullField === 'chargerMidSoc2Lower' || rule.fullField === 'chargerMidSoc2Upper') {
          min = 7.5;
          max = 10.5;
          if (rule.fullField === 'chargerMidSoc2Lower') {
            upper = this.modalFormData.chargerMidSoc2Upper;
          } else {
            lower = this.modalFormData.chargerMidSoc2Lower;
          }
        } else if (rule.fullField === 'chargerMidSoc3Lower' || rule.fullField === 'chargerMidSoc3Upper') {
          min = 6.2;
          max = 7.6;
          if (rule.fullField === 'chargerMidSoc3Lower') {
            upper = this.modalFormData.chargerMidSoc3Upper;
          } else {
            lower = this.modalFormData.chargerMidSoc3Lower;
          }
        } else if (rule.fullField === 'maxElePowerLower' || rule.fullField === 'maxElePowerUpper') {
          min = 1300;
          max = 3400;
          if (rule.fullField === 'maxElePowerLower') {
            upper = this.modalFormData.maxElePowerUpper;
          } else {
            lower = this.modalFormData.maxElePowerLower;
          }
        } else if (rule.fullField === 'dailyRunTimeLower' || rule.fullField === 'dailyRunTimeUpper') {
          min = 0;
          max = 5;
          if (rule.fullField === 'dailyRunTimeLower') {
            upper = this.modalFormData.dailyRunTimeUpper;
          } else {
            lower = this.modalFormData.dailyRunTimeLower;
          }
        } else if (rule.fullField === 'powerConsumptionLower' || rule.fullField === 'powerConsumptionUpper') {
          min = 9;
          max = 11;
          if (rule.fullField === 'powerConsumptionLower') {
            upper = this.modalFormData.powerConsumptionUpper;
          } else {
            lower = this.modalFormData.powerConsumptionLower;
          }
        }
        if (parseFloat(value) < min || parseFloat(value) > max) {
          callback(new Error('数值不在范围内'));
        } else if (!!upper || !!lower) {
          if (rule.fullField.indexOf('Lower') > -1) {
            if (parseFloat(value) >= parseFloat(upper)) {
              callback(new Error('下限不能>=上限'));
            } else {
              callback();
            }
          } else if (rule.fullField.indexOf('Upper') > -1) {
            if (parseFloat(value) <= parseFloat(lower)) {
              callback(new Error('上限不能<=下限'));
            } else {
              callback();
            }
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      let checkPower = (rule, value, callback) => {
        if (value < 17 || value > 19) {
          callback(new Error('取值不能超过范围'));
        } else {
          callback();
        }
      };
      return {
        searchData: {},
        seriesList: [],
        modelList: [],
        modalAddFormShow: false,  // 新增修改
        modalTitle: '新增',
        modalFormData: {},
        formLoading: false,
        ruleValidate: {
          vehicleModle: [
            {required: true, message: '请输入车型', trigger: 'blur'},
            {validator: handles.call(this, 'vehicleModel', '车型', true), trigger: 'blur'}
          ],
          vehicleSeries: [
            {required: true, message: '请输入车系', trigger: 'blur'},
            {validator: handles.call(this, 'stringNumber', '车系', true), trigger: 'blur'}
          ],
          dailyMileageLower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          dailyMileageUpper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          rechargeMileageLower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          rechargeMileageUpper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          chargerMidSoc1Lower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          chargerMidSoc1Upper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          chargerMidSoc2Lower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          chargerMidSoc2Upper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          chargerMidSoc3Lower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          chargerMidSoc3Upper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          maxElePowerLower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          maxElePowerUpper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          dailyRunTimeLower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          dailyRunTimeUpper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          powerConsumptionLower: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '下限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          powerConsumptionUpper: [
            {validator: handles.call(this, 'positivePointNumber', '上限'), trigger: 'blur'},
            {validator: checkValue}
          ],
          powerPercent: [
            {required: true, validator: handles.call(this, 'floatNumber', '百分比电能'), trigger: 'blur'},
            {validator: checkPower}
          ]
        },
        // 列表展示的数据
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: '车系',
            key: 'vehicleSeries'
          },
          {
            title: '车型名称',
            key: 'vehicleModle'
          },
//          {
//            title: '状态',
//            key: 'status',
//            render: (h, params) => {
//              return params.row.status === 0 ? '可用' : '不可用';
//            }
//          },
          {
            title: '描述',
            key: 'describtion'
          },
          {
            title: '更新人',
            width: 100,
            key: 'updateUser'
          },
          {
            title: '更新时间',
            width: 160,
            key: 'updateTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            width: 120,
            fixed: 'right',
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this.buttonShow('车系修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('车系删除') ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null
              ]);
            }
          }
        ]
      };
    },
    mounted () {
      this.getSeries();
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
        seriesList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车型列表失败',
            desc: ret
          });
        });
      },
      // 添加、修改
      addOrUpdate (row) {
        this.formLoading = false;
        this.$refs['formAdd'].resetFields();
        if (row) {
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.deepCopy(row);
          this.modalFormData.status = this.modalFormData.status.toString();
          this.reData = this._hyTool.extend({}, row);
          this.reData.status = this.reData.status.toString();
        } else {
          this.modalTitle = '新增';
          this.modalFormData = {
            status: '0',
            vehicleSeries: '',
            vehicleModle: '',
            describtion: '',
            dailyMileageLower: '',
            rechargeMileageLower: '',
            rechargeMileageUpper: '',
            chargerMidSoc1Lower: '',
            chargerMidSoc1Upper: '',
            chargerMidSoc2Lower: '',
            chargerMidSoc2Upper: '',
            chargerMidSoc3Lower: '',
            chargerMidSoc3Upper: '',
            maxElePowerLower: '',
            maxElePowerUpper: '',
            dailyRunTimeLower: '',
            dailyRunTimeUpper: '',
            powerConsumptionLower: '',
            powerConsumptionUpper: '',
            powerPercent: ''
          };
        }
        this.modalAddFormShow = true;
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            seriesSave(this.modalFormData, this.modalFormData, res => {
              setTimeout(() => {
                this.$Notice.success({
                  desc: `${this.modalTitle}成功`
                });
              }, 500);
              this.modalAddFormShow = false;
              this.getSeries();
              this.currentChange(1);
            }, ret => {
              this.formLoading = false;
              setTimeout(() => {
                this.$Notice.error({
                  title: `${this.modalTitle}失败`,
                  desc: ret
                });
              }, 500);
            });
          } else {
            this.formLoading = false;
          }
        });
      },
      // 取消新增或修改
      returnAdd () {
        if (this.modalFormData.id) {
          this.modalFormData = this._hyTool.extend({}, this.reData);
        } else {
          this.modalFormData.status = '0';
          this.$refs['formAdd'].resetFields();
        }
      },
      // 删除
      deleteById (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          seriesDelete({ids: params.id}, res => {
            this.getSeries();
            this.currentChange(1);
            setTimeout(() => {
              this.$Notice.success({
                title: '删除成功'
              });
            }, 500);
          }, ret => {
            setTimeout(() => {
              this.$Notice.error({
                title: '删除失败',
                desc: ret
              });
            }, 500);
          });
        }).catch(() => {
        });
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
      getModels (row) {
        if (!row) {
          this.modelList = [];
          return;
        }
        let param = {
          vehicleSeries: row
        };
        modelList(param, res => {
          this.modelList = res;
        });
        this.num = false;
      }
    }
  };
</script>
