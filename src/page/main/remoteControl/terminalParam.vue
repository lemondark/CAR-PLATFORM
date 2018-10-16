/**
* 终端参数管理
**/
<style lang="scss" scoped>
  .hy-right-btn {
    float: right;
    background: rgba(0, 0, 0, 0.125);
    border: 0;
    color: #777777;
  }
  .mg-t20 {
    margin-top: 20px;
  }

  .hy-search-bar2{
    margin-bottom:20px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content ">
      <div class="hy-search-bar2">
        <Form label-position="right" inline >
          <FormItem label="">
            <i-input placeholder="角色名称" v-model.trim="searchData.roleName"></i-input>
          </FormItem>
          <i-button type="primary" icon="ios-search" @click="_getList(1)" shape="circle" :loading="loading"
                    class="search">搜索
          </i-button>
          <div class="hy-tool-bar hy-tool-add">
            <hy-icon v-if="buttonShow('角色新增')" type="tianjia" content="添加" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate()">新增</hy-icon>
          </div>
        </Form>

      </div>
      <!--table部分-->
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="showCheckbox" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText"></hy-table>
      <!-- 分页 -->
      <hy-page
        :current-page="searchData.pageNum"
        :total-element="totalElement"
        :total-page="totalPage"
        @current-change="currentChange"></hy-page>
      <!--新增、修改-->
      <Modal v-model="modalFormShow" :mask-closable="false">
        <p slot="header" class="hy-modal-title">
          <span style="color:black">{{modalTitle}}</span>
        </p>
        <div style="text-align:left">
          <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="120">
            <hy-form-item :form="modalFormData" :formRow="modalFormItem"></hy-form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="addOrUpdateSubmit('form')">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="cancel()">重置</Button>
        </div>
      </Modal>

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
  import button from '@/js/mixins/button';
  import { roleList, saveRole, deleteRole } from '@/service/userService/role';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyTable from '@/components/common/table/table.vue';
  export default {
    components: {
      HyDetail,
      HyFormItem,
      HyTable
    },
    mixins: [list, dictionary, button],
    data () {
      return {
        modalFormShow: false,
        modalTitle: '',
        formLoading: false,
        selectId: [],
        modalFormData: {},
        modalFormItem: [],
        modalDetailItem: [],
        rule: [],
        ruleValidate: {
          roleName: [
            {required: true, message: '角色名称不能为空', trigger: 'change'}
          ]
        },
        detailModalShow: false,
        // 查询条件
        searchData: {},
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '角色名称',
            key: 'roleName'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '更新人',
            key: 'updateUser'
          },
          {
            title: '更新时间',
            key: 'updateTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 270,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {textAlign: 'center'}
              }, [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top'}),
                this.buttonShow('角色修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top'}) : null,
                this.buttonShow('角色删除') ? this._hyTool.createIcon(h, params, this.deletes, '删除', {color: '#F31A3E', type: 'jinyong', size: '20', content: '删除', placement: 'top'}) : null
              ]);
            }
          }
        ],
        originalData: {}            // 新增，修改的原始数据
      };
    },
    methods: {
      _getList (page) {
        this.clearSelecttion();
        if (page) this.searchData.pageNum = page;
        this.loading = true;
        roleList(this.searchData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询角色列表失败',
            desc: ret
          });
        });
      },
      // 点击新增、修改
      addOrUpdate (row) {
        this.$refs.form.resetFields();
        this.modalFormItem = [
          {
            key: 'roleName',
            title: '角色名称',
            property: {
              maxlength: 50
            }
          },
          {
            key: 'remark',
            title: '备注',
            type: 'textarea',
            property: {
              maxlength: 255
            }
          }
        ];
        this.formLoading = false;
        this.originalData = {};
        this.originalData = this._hyTool.extend({}, row);
        if (row) {
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.extend({}, row);
        } else {
          this.modalTitle = '新增';
          this.modalFormData = {
            roleName: '',
            remark: ''
          };
        }
        this.modalFormShow = true;
      },
      // 提交新增修改
      addOrUpdateSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formLoading = true;
            saveRole(null, this.modalFormData, res => {
              this.modalFormShow = false;
              this.formLoading = false;
              this.$Notice.success({
                title: this.modalTitle + '成功'
              });
              this._getList();
            }, ret => {
              this.formLoading = false;
              this.$Notice.error({
                title: this.modalTitle + '失败',
                desc: ret
              });
            });
          }
        });
      },
      // 详情
      detail (row) {
        this.modalFormData = this._hyTool.extend({}, row);
        this.modalFormData.createTime = this._hyTool.DateFormat(new Date(+this.modalFormData.createTime), 'yyyy-MM-dd hh:mm:ss');
        this.modalFormData.updateTime = this._hyTool.DateFormat(new Date(+this.modalFormData.updateTime), 'yyyy-MM-dd hh:mm:ss');
        this.modalDetailItem = [
          {
            key: 'roleName',
            title: '角色名称'
          },
          {
            key: 'remark',
            title: '备注',
            type: 'textarea'
          },
          {
            key: 'createUser',
            title: '创建人'
          },
          {
            key: 'createTime',
            title: '创建时间'
          },
          {
            key: 'updateUser',
            title: '更新人'
          },
          {
            key: 'updateTime',
            title: '更新时间'
          }
        ];
        this.detailModalShow = true;
        this.modalTitle = '详情';
      },
      // 删除
      deletes (data) {
        this.selectId = [];
        if (data) {
          this.selectId.push(data.id);
        } else if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach((row, index) => {
            this.selectId.push(row.id);
          });
        } else {
          return;
        }
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole({roleIdArr: this.selectId.join(',')}, null, res => {
            this._getList();
            this.$Notice.success({
              title: '删除成功'
            });
          }, ret => {
            this.$Notice.error({
              title: '删除失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      },
      // 重置
      cancel () {
        if (this.modalTitle === '新增') {
          this.$refs.form.resetFields();
          this.modalFormData.remark = '';
        } else if (this.modalTitle === '修改') {
          this.$refs.form.resetFields();
          this.modalFormData = this._hyTool.extend({}, this.originalData);
        }
      }
    }
  };
</script>
