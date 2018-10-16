/**
* 作者：szh
* 时间：2018-02-07
* 描述：车辆远程控制设置
**/
<style lang="scss" scoped>
  .hy_input {
    width: 200px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <Tabs @on-click="getTab">
        <Tab-pane label="车型设置">
          <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
            <Form label-position="right" inline :label-width="20">
              <FormItem label="">
                <i-select v-model="searchData.carSeries" @on-change="getModels(searchData.carSeries, 'select')" placeholder="车系" class="hy_input" clearable>
                  <i-option v-for="item in seriesList" :value="item" :key="item" :label="item">{{item}}</i-option>
                  <slot v-if="seriesList.length === 0"><span class="ivu-select-not-found">无数据</span></slot>
                </i-select>
              </FormItem>
              <FormItem label="">
                <i-select placeholder="车型" v-model="searchData.carType" class="hy_input" clearable>
                  <i-option v-for="item in modelList" :value="item" :key="item" :label="item"></i-option>
                  <slot v-if="modelList.length === 0"><span class="ivu-select-not-found">无数据</span></slot>
                </i-select>
              </FormItem>
              <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                        class="search" >查询
              </i-button>
              <!-- 添加功能 -->
              <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('车型新增')">
                <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate">添加</hy-icon>
              </div>
            </Form>
          </div>
          <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                    :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
          </hy-table>
          <!-- 分页 -->
          <hy-page
            :current-page="searchData.pageNum"
            :total-element="totalElement"
            :total-page="totalPage"
            @current-change="_getList"></hy-page>
        </Tab-pane>

        <Tab-pane label="单车设置">
          <div class="hy-search-bar2 userCenter addSetting" style="height: auto;margin-left: -10px;">
            <Form label-position="right" inline :label-width="20">
              <FormItem label="">
                <Select
                  placeholder="VIN码"
                  style="width: 250px;"
                  v-model="searchData.vinCode"
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
              <i-button type="success" icon="ios-search" @click="_getList(1, true);" shape="circle" :loading="loading"
                        class="search" >查询
              </i-button>
              <!-- 添加功能 -->
              <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('单车新增')">
                <hy-icon type="tianjia" content="添加" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate">添加</hy-icon>
              </div>
            </Form>
          </div>
          <hy-table :column-type="columnType" :columnsTitle="vehicleTitle" :list="list" :on-selection-change="handleSelectionChange"
                    :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
          </hy-table>
          <!-- 分页 -->
          <hy-page
            :current-page="searchData.pageNum"
            :total-element="totalElement"
            :total-page="totalPage"
            @current-change="_getList"></hy-page>
        </Tab-pane>
      </Tabs>
      <!--新增-->
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd" width="500" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);" class="addSetting">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95" >
            <FormItem label="车系" prop="carSeries" v-if="type === 0">
              <i-select v-model="modalFormData.carSeries" @on-change="getModels(modalFormData.carSeries, 'add')" placeholder="">
                <i-option v-for="item in seriesUse" :value="item.vehicleSeries" :key="item.id" :label="item.vehicleSeries"></i-option>
              </i-select>
            </FormItem>
            <FormItem label="车型" prop="carType" v-if="type === 0">
              <i-select v-model="modalFormData.carType" placeholder="">
                <i-option v-for="item in modelAddList" :value="item" :key="item" :label="item"></i-option>
              </i-select>
            </FormItem>
            <FormItem label="车辆VIN码" prop="vinCode" v-show="type === 1 && addBicyle" >
              <Select
                placeholder=""
                style="width: 280px"
                :transfer="true"
                v-model="modalFormData.vinCode"
                filterable
                remote
                clearable
                :remote-method="vinMethod"
                :not-found-text="notFoundText"
                ref="addSelect"
                :loading="loading1">
                <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label="VIN码：" prop="vinCode" v-show="type === 1 && !addBicyle" >
              <span>{{modalFormData.vinCode}}</span>
            </FormItem>
            <FormItem prop="items">
              <CheckboxGroup v-model="items">
                <Checkbox v-for="item in settingList" :key="item.id" :label="item.id">{{item.cnName}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="备注" prop="remark">
              <i-input v-model="modalFormData.remark" type="textarea" placeholder="" :rows="5" :maxlength="250"></i-input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
        </div>
      </Modal>
      <!--详情-->
      <Modal v-model="detailShow" :mask-closable="false" width="500" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form :model="detailData" :label-width="95">
            <FormItem label="车系" v-if="type === 0">
              <span>{{detailData.carSeries}}</span>
            </FormItem>
            <FormItem label="车型" v-if="type === 0">
              <span>{{detailData.carType}}</span>
            </FormItem>
            <FormItem label="VIN码：" v-if="type === 1">
              <span>{{detailData.vinCode}}</span>
            </FormItem>
            <FormItem prop="items">
              <CheckboxGroup v-model="detailData.items">
                <Checkbox v-for="item in settingList" :key="item.id" :label="item.id" disabled>{{item.cnName}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem label="备注" style="word-break: break-all; word-wrap:break-word;">
              <span>{{detailData.remark}}</span>
            </FormItem>
          </Form>
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import button from '@/js/mixins/button';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { teleList, itemList, teleDelete, teleSave } from '@/service/remoteControlService/vehicleSetting';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { listAllSeries, modelList, listUse } from '@/service/vehicleManageService/basicDataService/modelService';

  export default {
    components: {
      HyTable,
      HyFormItem
    },
    mixins: [list, button, storeVin],
    data () {
      let checkSeries = (rule, value, callback) => {
        if (!value && this.type === 0) {
          callback(new Error('请选择车系'));
        } else {
          callback();
        }
      };
      let checkModel = (rule, value, callback) => {
        if (!value && this.type === 0) {
          callback(new Error('请选择车型'));
        } else {
          callback();
        }
      };
      let checkVin = (rule, value, callback) => {
        if (!value && this.type === 1) {
          callback(new Error('请输入VIN码'));
        } else {
          callback();
        }
      };
      let checkItem = (rule, value, callback) => {
        if (!this.items || this.items.length === 0) {
          callback(new Error('请至少勾选一项'));
        } else {
          callback();
        }
      };
      return {
        items: [],
        searchData: {
          type: 1
        },
        type: 0,  // 车型设置
        loading: false,
        addBicyle: true,
        modalFormItem: [],
        seriesList: [],
        seriesUse: [],
        modelList: [],
        modelAddList: [],
        vinList: [],          // vin码
        settingList: [],
        modalTitle: '',
        modalFormData: {
          items: []
        },
        refData: {},
        modalAddFormShow: false,
        formLoading: false,
        detailData: {},
        detailShow: false,
        ruleValidate: {
          carSeries: [
            {validator: checkSeries, trigger: 'change'}
          ],
          carType: [
            {validator: checkModel, trigger: 'change'}
          ],
          vinCode: [
            {validator: checkVin, trigger: 'change'}
          ],
          items: [
            {type: Array, validator: checkItem, trigger: 'change'}
          ]
        },
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
            title: '车系',
            width: 120,
            key: 'carSeries'
          },
          {
            title: '车型',
            width: 120,
            key: 'carType'
          },
          {
            title: '控制内容',
            key: 'teleControlItemBean',
            render: (h, params) => {
              let text = '';
              for (let item of params.row['teleControlItemBean']) {
                if (!text) {
                  text = item.cnName;
                } else {
                  text = text + '， ' + item.cnName;
                }
              }
              return h('p', null, text);
            }
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.getDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('车型修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('车型删除') ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null
              ]);
            }
          }
        ],
        vehicleTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 170,
            key: 'vinCode'
          },
          {
            title: '控制内容',
            key: 'teleControlItemBean',
            render: (h, params) => {
              let text = '';
              for (let item of params.row['teleControlItemBean']) {
                if (!text) {
                  text = item.cnName;
                } else {
                  text = text + '， ' + item.cnName;
                }
              }
              return h('p', null, text);
            }
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.getDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('单车修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('单车删除') ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null
              ]);
            }
          }
        ]
      };
    },
    mounted () {
      this.watchVin('select'); // 搜过的vin码
      this.getItems();
      this.getSeries();
      this.getUseSeries();
    },
    methods: {
      // 实时报警
      _getList (page, flag) {
        this.loading = true;
        if (this.type === 0) {
          this.searchData.type = 1;
          if (!this.searchData.carSeries) delete this.searchData.carSeries;
          if (!this.searchData.carType) delete this.searchData.carType;
        } else {
          this.searchData.type = 2;
          if (!this.searchData.vinCode) delete this.searchData.vinCode;
        }
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        teleList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询列表失败',
            desc: ret
          });
        });
        if (this.searchData.vinCode) this.storeVin(this.searchData.vinCode);  // 存储搜索的vin
      },
      // 切换点击
      getTab (key) {
        this.list = [];
        this.searchData = {
          pageSize: 10,
          pageNum: 1
        };
        this.searchPageData = {
          pageSize: 10,
          pageNum: 1
        };
        this.type = key;
        this._getList(1, true);
      },
      // 新增修改弹框
      addOrUpdate (row) {
        this.modalAddFormShow = true;
        if (row.id) {
          this.addBicyle = false;
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.deepCopy(row);
          this.refData = this._hyTool.extend({}, row);
          // if (this.modalFormData.vinCode) {
          //   this.$refs.addSelect.setQuery(this.modalFormData.vinCode);
          // }
          this.items = [];
          this.refData.items = [];
          for (let item of this.modalFormData.teleControlItemBean) {
            this.items.push(item.id);
            this.refData.items.push(item.id);
          }
        } else {
          this.addBicyle = true;
          this.modalTitle = '新增';
          this.modalFormData = {};
          this.items = [];
          if (this.type === 1) {
          this.watchVin('addSelect'); // 搜过的vin码
        }
        }
      },
      // 取消新增或修改
      returnAdd () {
        if (this.modalTitle === '修改') {
          this.modalFormData = this._hyTool.extend({}, this.refData);
          // if (this.modalFormData.vinCode) {
          //   setTimeout(() => {
          //     this.$refs.addSelect.setQuery(this.modalFormData.vinCode);
          //   }, 1000);
          // }
          this.items = this._hyTool.extend([], this.refData.items);
       //   this.$refs.addSelect.setQuery('');
        } else {
          this.$refs['formAdd'].resetFields();
          this.items = [];
        }
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            let setItem = [];
            for (let item of this.items) {
              for (let list of this.settingList) {
                if (item === list.id) {
                  setItem.push(list);
                }
              }
            }
            this.modalFormData.teleControlItemBean = setItem;
            teleSave(null, this.modalFormData, res => {
              setTimeout(() => {
                this.$Notice.success({
                  desc: `${this.modalTitle}成功`
                });
              }, 500);
              this.formLoading = false;
              this.modalAddFormShow = false;
              this._getList();
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
         if (this.modalFormData.vinCode) this.storeVin(this.modalFormData.vinCode);  // 存储搜索的vin
      },
      // 删除
      deleteById (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          teleDelete({ids: params.id}, res => {
            this._getList();
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
      // 详情
      getDetail (row) {
        this.detailData = this._hyTool.extend({}, row);
        this.detailData.items = [];
        for (let item of this.detailData.teleControlItemBean) {
          this.detailData.items.push(item.id);
        }
        this.detailShow = true;
      },
      // 获取设置项
      getItems () {
        itemList(res => {
          this.settingList = res;
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
      // 获取可用车系
      getUseSeries () {
        listUse(null, res => {
          this.seriesUse = this._hyTool.deleteObject(res, 'vehicleSeries');
        });
      },
      // 获取车系对应车型
      getModels (row, type) {
        if (!row) {
          if (type === 'select') {
            this.modelList = [];
          } else if (type === 'add') {
            this.modelAddList = [];
          }
          return;
        }
        let param = {
          vehicleSeries: row
        };
        modelList(param, res => {
          if (type === 'select') {
            this.modelList = res;
          } else if (type === 'add') {
            this.modelAddList = res;
          }
        });
        this.num = false;
      }
    }
  };
</script>
