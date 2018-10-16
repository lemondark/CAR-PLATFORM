/**
* 电池均衡参数
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
          <!--<FormItem label="">-->
          <!--<i-select placeholder="等级" v-model="searchData.parameterLevel" clearable filterable class="inputstyle">-->
          <!--<Option v-for="item in levelArray" :value="item.value" :key="item.value" :label="item.label">-->
          <!--{{ item.label }}-->
          <!--</Option>-->
          <!--</i-select>-->
          <!--</FormItem>-->
          <!--<FormItem label="">-->
          <!--<i-select placeholder="状态" v-model="searchData.status" clearable filterable class="inputstyle">-->
          <!--<Option v-for="item in statusArray" :value="item.value" :key="item.value" :label="item.label">-->
          <!--{{ item.label }}-->
          <!--</Option>-->
          <!--</i-select>-->
          <!--</FormItem>-->
          <!--<i-button type="primary" icon="ios-search" @click="_getList(1)" shape="circle" :loading="loading"-->
          <!--class="search">查询-->
          <!--</i-button>-->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('电参新增')">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate()">新增</hy-icon>
            <!--<Button type="ghost" class="hy-search-button" :class="delClasses" shape="circle" @click="deleteArea()">删除</Button>-->
          </div>
        </Form>

      </div>
      <!--table部分-->
      <!--<Table border :columns="columnsTitle" :data="list" @on-selection-change="handleSelectionChange"></Table>-->
      <hy-table :column-type="columnType" :columnsTitle="columnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="showCheckbox" :multiple-selection="multipleSelection" :loading="loading"></hy-table>
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
  import { batteryList, saveBattery, deleteBattery } from '@/service/vehicleManageService/batteryBalanceParam';
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
      const checkValue = (rule, value, callback) => {
        // console.log(rule);
        if (value) {
          if (rule['field'] === 'maxVoltage') {
            if (parseFloat(value) <= parseFloat(this.modalFormData.minVoltage) && this.modalFormData.minVoltage) {
              callback(new Error('上限值不能小于等于下限值'));
            } else {
              callback();
            }
          } else if (rule['field'] === 'minVoltage') {
            if (parseFloat(value) <= 0) {
              callback(new Error('下限值不能小于等于0'));
            } else if (parseFloat(value) >= parseFloat(this.modalFormData.maxVoltage) && this.modalFormData.maxVoltage) {
              callback(new Error('下限值不能大于等于上限值'));
            } else {
              callback();
            }
          }
        } else {
          callback();
        }
      };
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
          parameterLevel: [
            {required: true, type: 'number', message: '等级不能为空', trigger: 'change'}
          ],
          maxVoltage: [
            // {required: true, message: '压差上限不能为空', trigger: 'blur'},
            {pattern: '^[0-9]+([.]{1}[0-9]{1,2})?$', message: '压差上限格式不正确', trigger: 'blur'},
            {validator: checkValue, trigger: 'blur'}
          ],
          minVoltage: [
            {required: true, message: '压差下限不能为空', trigger: 'blur'},
            {pattern: '^[0-9]+([.]{1}[0-9]{1,2})?$', message: '压差下限格式不正确', trigger: 'blur'},
            {validator: checkValue, trigger: 'blur'}
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
            title: '等级',
            key: 'parameterLevel',
            render: (h, params) => {
              return this.__filters.batteryBalanceLevel(h, params, 'parameterLevel');
            }
          },
          {
            title: '压差上限',
            key: 'maxVoltage'
          },
          {
            title: '压差下限',
            key: 'minVoltage'
          },
//          {
//            title: '状态',
//            key: 'status',
//            render: (h, params) => {
//              return this.__filters.statusFlag(h, params, 'status');
//            }
//          },
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
            width: 180,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {textAlign: 'center'}
              }, [
                //  this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('电参修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('电参删除') ? this._hyTool.createIcon(h, params, this.deletes, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
        ],
        originalData: {},            // 新增，修改的原始数据
        levelArray: [{label: '一级', value: 1}, {label: '二级', value: 2}, {label: '三级', value: 3}],
        statusArray: [{label: '可用', value: 0}, {label: '不可用', value: 1}]
      };
    },
    methods: {
      _getList (page) {
        this.clearSelecttion();
        if (page) this.searchData.pageNum = page;
        this.loading = true;
        batteryList(this.searchData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询电池均衡参数列表失败',
            desc: ret
          });
        });
      },
      // 点击新增、修改
      addOrUpdate (row) {
        this.$refs.form.resetFields();
        this.modalFormItem = [
          {
            key: 'parameterLevel',
            title: '等级',
            type: 'select',
            array: this.levelArray
          },
          {
            key: 'maxVoltage',
            title: '压差上限',
            placeholder: '可带一或二位小数',
            property: {
              maxlength: 8
            }
          },
          {
            key: 'minVoltage',
            title: '压差下限',
            placeholder: '可带一或二位小数',
            property: {
              maxlength: 8
            }
          },
//          {
//            key: 'status',
//            title: '状态',
//            type: 'select',
//            array: this.statusArray
//          },
          {
            key: 'remark',
            title: '备注',
            type: 'textarea',
            property: {
              maxlength: 100
            }
          }
        ];
        this.formLoading = false;
        this.originalData = {};
        // console.log(JSON.stringify(row));
        if (row) {
          if (!row.maxVoltage) row.maxVoltage = '';
          row.maxVoltage = String(row.maxVoltage);
          row.minVoltage = String(row.minVoltage);
        }
        this.originalData = this._hyTool.extend({}, row);
        if (row) {
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.extend({}, row);
        } else {
          this.modalTitle = '新增';
          this.modalFormData = {
            parameterLevel: 1,
            maxVoltage: '',
            minVoltage: '',
            status: 0,
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
            saveBattery(null, this.modalFormData, res => {
              this.modalFormShow = false;
              this.formLoading = false;
              setTimeout(() => {
                this.$Notice.success({
                  title: this.modalTitle + '成功'
                });
              }, 500);
              this._getList();
            }, ret => {
              this.formLoading = false;
              setTimeout(() => {
                this.$Notice.error({
                  title: this.modalTitle + '失败',
                  desc: ret
                });
              }, 500);
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
            title: '等级',
            key: 'parameterLevel',
            array: this.levelArray
          },
          {
            title: '压差上限',
            key: 'maxVoltage'
          },
          {
            title: '压差下限',
            key: 'minVoltage'
          },
//          {
//            title: '状态',
//            key: 'status',
//            array: this.statusArray
//          },
          {
            key: 'remark',
            title: '备注'
          },
//          {
//            key: '',
//            title: ''
//          },
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
          deleteBattery({ids: this.selectId.join(',')}, null, res => {
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
