/**
* 描述：openApi授权管理
**/
<style lang="scss" scoped>
  .heng_class {
    width: 100%;
    height: 1px;
    border-top: 1px solid rgba(186, 186, 186, 0.6);
  }
  .title_class {
    font-size: 15px;
    margin: 10px;
    position: relative;
  }
  .bottom_class {
    float: right;
    padding-right: 10px;
    padding-top: 10px;
    .font_class {
      padding: 5px;
      color: rgba(169, 169, 169, 0.8);
    }
  }
  .char {
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
    position: absolute;
    top: 5px;
    left: -10px;
  }
  .tips {
    position: absolute;
    display: inline-block;
    color: #ed3f14;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline>
          <FormItem label="">
            <i-input placeholder="第三方系统名称" v-model.trim="searchData.userName" clearable style="width: 200px"></i-input>
          </FormItem>
          <Button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--工具条部分-->
          <!-- 添加功能 -->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('授权新增')">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#5179DF' size='22' @click="addOrUpdate()">新增</hy-icon>
            <!--<Button type="ghost" class="hy-search-button" :class="delClasses" shape="circle" @click="deleteArea()">删除</Button>-->
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
        @current-change="_getList"></hy-page>
      <!--新增-->
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd" width="950" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div class="clearfix"></div>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="120">
            <FormItem label="第三方系统名称" prop="userName">
              <i-input v-model="modalFormData.userName" placeholder="由1-20个中文和字母组成" :maxlength="20" style="width: 300px" clearable></i-input>
            </FormItem>
            <FormItem label="编码" prop="userCode">
              <i-input v-model="modalFormData.userCode" placeholder="由不超过20位大小写字母、数字和_组成(数字不可为开头)" :maxlength="20" style="width: 300px" clearable></i-input>
            </FormItem>
            <FormItem label="备注">
              <i-input type="textarea" v-model="modalFormData.remark" placeholder="可输入1-255个字符" :maxlength="255" style="width: 300px" clearable></i-input>
            </FormItem>
          </Form>
          <div class="heng_class"></div>
          <p class="title_class"><span class="char">*</span>授权OpenApi</p>
          <Row>
            <Col>
              <Table v-if="tableShow" border ref="selection" :columns="formColumns" :data="tableData" :loading="loading1" style="margin-left: 5px;" :height="235" @on-selection-change="selectData"></Table>
              <!--<hy-page-->
                <!--:current-page="searchData1.pageNum"-->
                <!--:total-element="searchData1.totalElement"-->
                <!--:total-page="searchData1.totalPage"-->
                <!--@current-change="_getOpenApi"></hy-page>-->
              <span class="tips" v-show="tipShow" style="margin-left: 5px;margin-top: 5px;">请勾选OpenApi</span>
              <div class="bottom_class">
                <span class="font_class">已选{{checkData.length}}项</span>
              </div>
              <div class="clearfix"></div>
            </Col>
          </Row>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
        </div>
      </Modal>
      <!-- 详情 -->
      <Modal v-model="detailShow" :mask-closable="false" width="950" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form :model="detailData"  :label-width="120">
            <FormItem label="第三方系统名称：">
              {{detailData.userName}}
            </FormItem>
            <FormItem label="编码：">
              {{detailData.userCode}}
            </FormItem>
            <FormItem label="备注：" style="width:100%;height:100%;word-wrap: break-word">
              {{detailData.remark}}
            </FormItem>
          </Form>
          <div class="heng_class"></div>
          <p class="title_class">授权OpenApi</p>
          <Table border ref="selection" :columns="detailColumns" :data="detailTable" :loading="loading5" style="margin-left: 5px;" @on-selection-change="selectData"></Table>
          <!--<hy-page-->
            <!--:current-page="searchData2.pageNum"-->
            <!--:total-element="searchData2.totalElement"-->
            <!--:total-page="searchData2.totalPage"-->
            <!--@current-change="_getDetail"></hy-page>-->
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" @click="detailShow = false">关闭</Button>
          <!--<Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>-->
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import button from '@/js/mixins/button';
  import HyTable from '@/components/common/table/table.vue';
  // import { handles } from '@/js/libs/checkValue';
  import { openApiAuthList, dataList, userDataList, openApiAuthSave, openApiAuthdelete } from '@/service/baseInfo/openApiAuth';
  export default {
    components: {
      HyTable
    },
    mixins: [list, button],
    data () {
      return {
        tableShow: true,
        tipShow: false,
        searchData: {},
        searchData1: {
          pageNum: 1    // 当前页
          // totalElement: 0,    // 总数量
          // totalPage: 1,    // 总页数
          // pageSize: 50,  // 每页展示条数
          // channelCodeIsNull: true  // 未绑定车辆
        },
        searchData2: {
          // pageNum: 1,    // 当前页
          // totalElement: 0,    // 总数量
          // totalPage: 1,    // 总页数
          // pageSize: 5  // 每页展示条数
        },
        modalAddFormShow: false,
        formLoading: false,
        loading1: false,
        loading2: false,
        optionsVin: [],
        notFoundText: '',
        modalFormData: {},
        modalTitle: '新增',
        checkData: [],  // 勾选项
        detailShow: false,
        detailData: {},
        loading5: false,
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
            title: '第三方系统名称',
            key: 'userName'
          },
          {
            title: '编码',
            key: 'userCode'
          },
          {
            title: '备注',
            key: 'remark',
            render: (h, params) => {
              let text = '';
              if (params.row['remark']) text = params.row['remark'];
              if (text.length > 100) {
                text = `${text.substring(0, 99)}......`;
              }
              return h('p', null, text);
            }
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
            fixed: 'right',
            width: 160,
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.getDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('授权修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('授权删除') ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null
              ]);
            }
          }
        ],
        ruleValidate: {
          userName: [
            {required: true, message: '请输入第三方系统名称', trigger: 'blur'},
            {pattern: '^[a-zA-Z\u4e00-\u9fa5]{1,20}$', message: '由1-20个中文和字母组成', trigger: 'blur'}
          ],
          userCode: [
            {required: true, message: '请输入编码', trigger: 'blur'},
            {pattern: '^[^0-9]{1}[a-zA-Z0-9_]{0,19}$', message: '由不超过20位大小写字母、数字和_组成(数字不可为开头)', trigger: 'blur'}
          ]
        },
        tableData: [],
        formColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'dataName'
          },
          {
            title: '编码',
            key: 'dataCode'
          },
          {
            title: '访问url',
            key: 'uri'
          },
          // {
          //   title: '参数json',
          //   key: 'paramJson'
          // },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        detailColumns: [
          {
            title: '名称',
            key: 'dataName'
          },
          {
            title: '编码',
            key: 'dataCode'
          },
          {
            title: '访问url',
            key: 'uri'
          },
          // {
          //   title: '参数json',
          //   key: 'paramJson'
          // },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        detailTable: []
      };
    },
    methods: {
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        openApiAuthList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询OpenApi授权列表失败',
            desc: ret
          });
        });
      },
      // 新增，修改弹框
      addOrUpdate (row) {
        this.tableShow = false;
        this.$refs['formAdd'].resetFields();
        this.$refs.selection.selectAll(false);
        this.modalFormData = {};
        this.checkData = [];
        this.rightData = [];
        this._getOpenApi(1, row);
        this.formLoading = false;
        if (row) {
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.deepCopy(row);
          this.reData = this._hyTool.extend({}, row);
        } else {
          this.modalTitle = '新增';
        }
        setTimeout(() => {
          this.modalAddFormShow = true;
        }, 200);
      },
      // 获取授权api列表
      _getOpenApi (num, row) {
        this.checkData = [];
        this.loading1 = true;
        if (num) this.searchData1.pageNum = num;
        dataList(this.searchData1, res => {
          // this.searchData1.totalElement = res.totalElements;
          // this.searchData1.totalPage = res.totalPages;
          this.tableData = res;
          if (row) {
            userDataList({userId: row.id}, res => {
              this.rightData = res;
              for (let item of this.tableData) {
                for (let it of this.rightData) {
                  if (item.dataCode === it.dataCode) {
                    item._checked = true;
                    this.checkData.push(item);
                  }
                }
              }
              if (this.checkData.length === 0) this.tipShow = true;
              else this.tipShow = false;
              this.tableShow = true;
              // console.log(JSON.stringify(this.tableData));
            }, ret => {
              this.tipShow = false;
              this.loading5 = false;
              this.$Notice.error({
                title: '查询授权OpenApi数据列表失败',
                desc: ret
              });
            });
          } else {
            this.tableShow = true;
            this.tipShow = false;
          }
          this.loading1 = false;
        }, ret => {
          this.loading1 = false;
          this.$Notice.error({
            title: '查询OpenApi数据列表失败',
            desc: ret
          });
        });
      },
      _getDetail (num) {
        this.checkData = [];
        this.loading5 = true;
        // if (num) this.searchData2.pageNum = num;
        userDataList(this.searchData2, res => {
          // this.searchData2.totalElement = res.totalElements;
          // this.searchData2.totalPage = res.totalPages;
          this.detailTable = res;
          this.loading5 = false;
        }, ret => {
          this.loading5 = false;
          this.$Notice.error({
            title: '查询授权OpenApi数据列表失败',
            desc: ret
          });
        });
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (this.checkData.length === 0) {
            this.tipShow = true;
            this.formLoading = false;
            return;
          } else {
            this.tipShow = false;
          }
          if (valid) {
            this.modalFormData.openApiDataBeanSet = this.checkData;
            openApiAuthSave(null, this.modalFormData, res => {
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
        this.tableShow = false;
        this.tipShow = false;
        this.$refs['formAdd'].resetFields();
        if (this.modalFormData.id) {
          this._getOpenApi(1, this.reData);
          this.modalFormData = this._hyTool.extend({}, this.reData);
        } else {
          // this.$refs['formAdd'].resetFields();
          // this.$refs.selection.selectAll(false);
          this.modalFormData = {};
          this._getOpenApi(1);
        }
      },
      // 删除
      deleteById (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          openApiAuthdelete({ids: params.id}, res => {
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
      async getDetail (row) {
        try {
          this.searchData2.userId = row.id;
          this._getDetail();
          this.detailData = this._hyTool.deepCopy(row);
          this.detailShow = true;
        } catch (e) {
        }
      },
      // 勾选事件
      selectData (data) {
        // console.log(JSON.stringify(data));
        if (data.length === 0) this.tipShow = true;
        else this.tipShow = false;
        this.checkData = [...data];
      }
    }
  };
</script>
