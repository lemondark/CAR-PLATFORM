/**
* 作者：szh
* 时间：2018-02-6
* 描述：短信邮件模板管理
**/
<style lang="scss" scoped>
  .hy_label {
    cursor: pointer;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline>
          <FormItem>
            <i-input placeholder="名称" v-model.trim="searchData.name" style="width: 200px;" clearable></i-input>
          </FormItem>
          <FormItem>
            <i-select placeholder="模板类型" v-model="searchData.informationType" style="width: 200px;" clearable>
              <i-option v-for="item in types" :value="item.value" :key="item.value" :label="item.label"></i-option>
            </i-select>
          </FormItem>
          <Button type="primary" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--工具条部分-->
          <!-- 添加功能 -->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('短邮新增')">
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
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd" width="800" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95">
            <FormItem label="名称" prop="name">
              <i-input v-model="modalFormData.name" placeholder="由中文、数字、字母组成(最多50字符)" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="模板类型">
              <i-select placeholder="" v-model="modalFormData.informationType" @on-change="changeType" filterable>
                <i-option v-for="item in type" :value="item.value" :key="item.value" :label="item.label"></i-option>
              </i-select>
            </FormItem>
            <FormItem label="关键字">
              <i-col span="4" v-for="(item, index) in labelList" :key="index">
                <span class="hy_label" @click="getLabel(item.value)">{{item.label}}</span>
              </i-col>
            </FormItem>
            <FormItem label="短信内容" prop="templateContent" v-show="modalFormData.informationType === 1">
              <i-input type="textarea" :rows="5" v-model="modalFormData.templateContent" placeholder="" :maxlength="250"></i-input>
            </FormItem>
            <FormItem label="邮件标题" prop="title" v-show="modalFormData.informationType === 2">
              <i-input v-model="modalFormData.title" placeholder="由中文、数字、字母组成(最多50字符)" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="邮件内容" v-show="modalFormData.informationType === 2" required>
              <div id="editor"></div>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
        </div>
      </Modal>
      <!--详情-->
      <Modal v-model="detailShow" :mask-closable="false" width="800" :styles="{top: '20px'}" @on-cancel="cancel">
        <p slot="header" class="hy-modal-title">
          <span>短信邮件模板详情</span>
        </p>
        <div style="text-align:left; height: 500px;overflow: auto;" id="outerDiv">
          <hy-detail :form="detailData" :rowData="detailRow" v-if="detailShow"></hy-detail>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="cancel">关闭</Button>
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
  import { templateDelete, templateList, templateSave } from '@/service/baseInfo/template';
  import WangEditor from 'wangeditor';
  import HyDetail from '@/components/common/detail/detail';
  import { handles } from '@/js/libs/checkValue';

  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list, button],
    data () {
//      let checkTitle = (rule, value, callback) => {
//        if (this.modalFormData.informationType === 2 && !value) {
//          callback(new Error('请输入标题'));
//        } else {
//          callback();
//        }
//      };
      let checkContent = (rule, value, callback) => {
        if (this.modalFormData.informationType === 1 && !value) {
          callback(new Error('请输入内容'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        searchData: {},
        modalAddFormShow: false,  // 新增修改
        modalTitle: '新增',
        editor: null,
        reData: null,
        modalFormData: {
          informationType: 2
        },
        type: [
//          {
//            value: 1,
//            label: '短信模板'
//          },
          {
            value: 2,
            label: '邮件模板'
          }
        ],
        types: [
          {
            value: 1,
            label: '短信模板'
          },
          {
            value: 2,
            label: '邮件模板'
          }
        ],
        labelList: [
          {
            label: '车架号',
            value: '{vin}'
          },
          {
            label: 'GPRS号',
            value: '{gprs}'
          },
          {
            label: '报警类别',
            value: '{alarmClazz}'
          },
          {
            label: '国标等级',
            value: '{gbLevel}'
          },
          {
            label: '地标等级',
            value: '{dbLevel}'
          },
          {
            label: '自有故障等级',
            value: '{selfLevel}'
          },
          {
            label: '报警采集时间',
            value: '{startTime}'
          },
          {
            label: '报警来源',
            value: '{componentCode}'
          },
          {
            label: '报警编码',
            value: '{alarmCode}'
          },
          {
            label: '报警描述',
            value: '{alarmContent}'
          }
        ],
        formLoading: false,
        detailData: {},
        detailShow: false,
        detailRow: [],
        ruleValidate: {
          name: [
            {required: true, validator: handles.call(this, 'stringNumber', '名称'), trigger: 'blur'}
          ],
          title: [
            {required: true, validator: handles.call(this, 'stringNumber', '标题'), trigger: 'blur'}
          ],
          templateContent: [
            {validator: checkContent, message: '请输入内容', trigger: 'blur'}
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
            title: '名称',
            key: 'name',
            width: 150
          },
          {
            title: '类型',
            key: 'informationType',
            width: 150,
            render: (h, params) => {
              return this.__filters.informationType(h, params, 'informationType');
            }
          },
          {
            title: '内容描述',
            key: 'templateDesc',
            render: (h, params) => {
              let text = params.row['templateDesc'];
              if (params.row['templateDesc'].length > 100) {
                text = `${text.substring(0, 99)}......`;
              }
              return h('p', null, text);
            }
          },
          {
            title: '更新人',
            key: 'updateUser',
            width: 90
          },
          {
            title: '更新时间',
            key: 'updateTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            width: 150,
            fixed: 'right',
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                params.row['informationType'] === 2 && this.buttonShow('短邮修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                params.row['informationType'] === 2 && this.buttonShow('短邮删除') ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null
              ]);
            }
          }
        ]
      };
    },
    mounted () {
      this.$nextTick(() => {
        this.editor = new WangEditor('#editor');
        this.editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'list',  // 列表
          'justify',  // 对齐方式
          'table',  // 表格
          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];
        this.editor.customConfig.pasteIgnoreImg = true;
        this.editor.customConfig.onchange = function (html) {
          // html 即变化之后的内容
          // console.log(html);
        };
        // 自定义处理粘贴的文本内容
        this.editor.customConfig.pasteTextHandle = function (content) {
          //  console.log(content);
          // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
          return content + '<p>在粘贴内容后面追加一行</p>';
        };
        this.editor.create();     // 生成修改器
      });
    },
    methods: {
      // 列表
      _getList (page, flag) {
        this.clearSelecttion();
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        templateList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询短信邮件模板列表失败',
            desc: ret
          });
        });
      },
      // 添加、修改
      addOrUpdate (row) {
        this.$refs['formAdd'].resetFields();
        this.editor.txt.clear();
        this.formLoading = false;
        if (row) {
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.deepCopy(row);
          this.reData = this._hyTool.deepCopy(row);
          if (this.modalFormData.informationType === 2) this.editor.txt.html(this.modalFormData.templateContent);
        } else {
          this.modalTitle = '新增';
          this.modalFormData = {
            informationType: 2
          };
        }
        this.modalAddFormShow = true;
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            if (this.modalFormData.informationType === 2) {
              if (!this.editor.txt.text()) {
                this.$Notice.warning({
                  title: '请输入邮件内容',
                  desc: '邮件内容不能为空'
                });
                this.formLoading = false;
                return;
              }
              this.modalFormData.templateContent = this.editor.txt.html();
              this.modalFormData.templateDesc = (this.editor.txt.text()).replace(/&nbsp;/ig, ' ');
              // console.log(this.modalFormData.templateDesc);
              if (this.modalFormData.templateDesc.length > 500) {
                this.$Notice.warning({
                  title: '邮件内容长度不能超过500'
                });
                this.formLoading = false;
                return;
              }
            } else {
              this.modalFormData.templateDesc = this.modalFormData.templateContent;
            }
            templateSave(null, this.modalFormData, res => {
              this.returnAdd();
              setTimeout(() => {
                this.$Notice.success({
                  desc: `${this.modalTitle}成功`
                });
              }, 500);
              this.modalAddFormShow = false;
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
          if (this.modalFormData.informationType === 2) this.editor.txt.html(this.modalFormData.templateContent);
        } else {
          this.$refs['formAdd'].resetFields();
          this.editor.txt.clear();
          this.modalFormData.informationType = 2;
          delete this.modalFormData.templateContent;
        }
      },
      // 删除
      deleteById (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          templateDelete({ids: params.id}, res => {
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
      // 模板类型
      changeType (row) {
        if (row === 2) {
          delete this.modalFormData.templateContent;
        } else {
          this.modalFormData.title = '';
          this.editor.txt.clear();
        }
      },
      // 关键字
      getLabel (label) {
        if (this.modalFormData.informationType === 1) {
          let labelContent = '';
          if (!this.modalFormData.templateContent) {
            labelContent = label;
          } else {
            labelContent = this.modalFormData.templateContent + label;
          }
          this.$set(this.modalFormData, 'templateContent', labelContent);
        } else {
          let p = this.editor.selection.getSelectionContainerElem()[0];
          p.innerHTML += label;
          //  this.editor.txt.append('<span>' + label + '</span>');
        }
      },
      // 详情
      detail (row) {
        this.detailData = this._hyTool.extend({}, row);
        this.detailData.updateTime = this._hyTool.DateFormat(new Date(+this.detailData.updateTime), 'yyyy-MM-dd hh:mm:ss');
        this.detailRow = [
          {
            key: 'name',
            title: '名称'
          },
          {
            key: 'informationType',
            title: '类型',
            array: [{label: '短信模板', value: 1}, {label: '邮件模板', value: 2}]
          },
          {
            key: 'templateDesc',
            title: '内容描述'
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
        this.detailShow = true;
      },
      // 关闭
      cancel () {
        this.detailShow = false;
      }
    },
    beforeDestroy () {
      this.editor = null;
    }
  };
</script>
