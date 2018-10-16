/**
* 作者：szh
* 时间：2018-01-15
* 描述：生产基地管理
**/
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline>
          <FormItem>
            <i-input placeholder="基地名称" v-model.trim="searchData.baseName" clearable style="width: 200px"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--start-->
          <FormItem v-show="false">
            <i-input placeholder="基地名称" v-model.trim="searchData.baseName" clearable style="width: 200px"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--end-->
          <Button type="primary" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--工具条部分-->
          <!-- 添加功能 -->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('基地新增')">
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
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}生产基地</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95">
            <FormItem label="基地名称" prop="baseName">
              <i-input v-model="modalFormData.baseName" placeholder="由中文、字母、数字组成" :maxlength="50" clearable></i-input>
            </FormItem>
            <!--<FormItem label="状态">-->
            <!--<i-select placeholder="" v-model="modalFormData.status" filterable>-->
            <!--<i-option value="0">可用</i-option>-->
            <!--<i-option value="1">不可用</i-option>-->
            <!--</i-select>-->
            <!--</FormItem>-->
            <FormItem label="描述" prop="description">
              <i-input type="textarea" v-model="modalFormData.description" placeholder="" :maxlength="50"></i-input>
            </FormItem>
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
  import { baseList, baseSave, baseDelete } from '@/service/vehicleManageService/basicDataService/baseService';
  import { handles } from '@/js/libs/checkValue';

  export default {
    components: {
      HyTable,
      HyFormItem
    },
    mixins: [list, button],
    data () {
      return {
        loading: false,
        searchData: {},
        modalAddFormShow: false,  // 新增修改
        modalTitle: '新增',
        modalFormData: {},
        formLoading: false,
        ruleValidate: {
          baseName: [
            {required: true, message: '请输入基地名称', trigger: 'blur'},
            {validator: handles.call(this, 'stringNumber', '基地名称', true), trigger: 'blur'}
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
            title: '基地名称',
            key: 'baseName'
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
            key: 'description'
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
            width: 170,
            fixed: 'right',
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this.buttonShow('基地修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('基地删除') ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null
              ]);
            }
          }
        ]
      };
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
        baseList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询生产基地列表失败',
            desc: ret
          });
        });
      },
      // 添加、修改
      addOrUpdate (row) {
        this.$refs['formAdd'].resetFields();
        this.formLoading = false;
        if (row) {
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.deepCopy(row);
          this.modalFormData.status = this.modalFormData.status.toString();
          this.reData = this._hyTool.extend({}, row);
          this.reData.status = this.reData.status.toString();
        } else {
          this.modalTitle = '新增';
          this.modalFormData = {
            baseName: '',
            status: '0',
            description: ''
          };
        }
        this.modalAddFormShow = true;
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            baseSave({}, this.modalFormData, res => {
              setTimeout(() => {
                this.$Notice.success({
                  desc: `${this.modalTitle}成功`
                });
              }, 500);
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
          baseDelete({ids: params.id}, res => {
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
      }
    }
  };
</script>
