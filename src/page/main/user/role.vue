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
  .bind-form-btn {
    position: absolute;
    bottom: 84px;
  }
  .hy_export {
    height: 200px;
    width: 100%;
    text-align: center;
    position: relative;
    margin-top:100px;
    // bottom: 50%;
    .hy_down {
      padding-top: 20px;
      line-height: 30px;
    }
    .hy_pro {
      width: 400px;
      height: 100px;
      margin: auto;
      position: absolute;
      top: 100px;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .hy_button {
      width: 400px;
      height: 40px;
      margin: auto;
      position: absolute;
      top: 100px;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  .hy_success {
    width: 100%;
    span {
      display: block;
    }
    img {
      height:60px;
      width:60px;
    }
  }
  @keyframes fade-in {
    0% {opacity: 0;}
    40% {opacity: 0;}
    100% {opacity: 1;}
  }
  @-webkit-keyframes fade-in { /*针对webkit内核*/
    0% {opacity: 0;}
    40% {opacity: 0;}
    100% {opacity: 1;}
  }
  .wrapper {
    animation: fade-in;
    animation-duration: 1.5s;
    -webkit-animation:fade-in 1.5s;
  }
  .spin {
    position: relative;
    left: 50%;
    top: 50px;
    margin-left: -10px;
  }
  .all-bind {
    height:400px;
    border:1px solid gray;
    width:100%;
    .all-bind-div {
      width: 400px;
      margin: 0 auto;
      margin-top: 110px;
    }
    .bind-vehicle {
      width: 180px;
      height: 180px;
      border: 1px solid #ebeff7;
      cursor: pointer;
    }
    .div-font-size {
      margin-top: 25px;
      font-size: 60px;
      text-align: center;
    }
    .text {
      font-size: 16px;
      text-align: center;
    }
    .left-div {
      float: left;
    }
    .right-div {
      float: right;
    }
    .active {
      border: 2px solid #516AE5;
      background: url("/static/images/tick.png");
      background-size:50px 50px;
      background-repeat:no-repeat;
      background-position: right bottom;
      box-shadow: 1px 1px 5px #516ae5;
    }
  }
  .return-all-bind {
    color: #516AE5;
    float: right;
    cursor: pointer;
    line-height: 32px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content ">
      <div class="hy-search-bar2">
        <Form label-position="right" inline >
          <FormItem label="">
            <i-input placeholder="角色名称" clearable v-model.trim="searchData.roleName"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--start-->
          <FormItem label="" v-show="false">
            <i-input placeholder="角色ID" clearable v-model.trim="searchData.id"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--end-->
          <i-button type="primary" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('角色新增')">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate()">新增</hy-icon>
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

      <!--绑定车辆-->
      <Modal v-model="bindFormShow" :mask-closable="false" width="900">
        <p slot="header" class="hy-modal-title">
          <span style="color:black">{{modalTitle}}</span>
        </p>
        <div style="text-align:left" v-show="changeShow === null">
          <div style="height:400px;width:100%;"></div>
        </div>
        <div style="text-align:left" v-show="changeShow === 0">
            <div class="all-bind">
              <div class="all-bind-div">
                <div class="bind-vehicle left-div" :class="{active: activeShow}" @click="clickDiv(1)">
                  <div class="iconfont icon-cheliang1 div-font-size"></div>
                  <p class="text">全部车辆</p>
                </div>
                <div class="bind-vehicle right-div" :class="{active: !activeShow}" @click="clickDiv(2)">
                  <div class="iconfont icon-cheliang2 div-font-size"></div>
                  <p class="text">绑定部分车辆</p>
                </div>
                <div style="clear: both;"></div>
              </div>
            </div>
        </div>
        <div style="text-align:left" v-show="changeShow === 1">
          <div class="hy-search-bar2">
            <Form label-position="right" inline >
              <i-button @click="bindChange(1)" style="margin-left: 12px">导入</i-button>
              <span class="return-all-bind" @click="returnAllBind">返回全量绑定>></span>
            </Form>
          </div>
          <hy-table :column-type="columnType1" :columnsTitle="columnsTitle1" :list="vehicleList" :on-selection-change="handleSelectionChange1"
                    :show-checkbox="showCheckbox1" :multiple-selection="multipleSelection1" :loading="loading1" :no-data-text="noDataText1"></hy-table>
          <!-- 分页 -->
          <hy-page
            :current-page="vehicleSearchData.pageNum"
            :total-element="totalElement1"
            :total-page="totalPage1"
            @current-change="getVehicleList" style="padding: 15px 15px 10px 15px !important;text-align: right"></hy-page>
          <Form label-position="right" inline class="bind-form-btn">
            <i-button @click="unbindVehicle(null, 1)" style="margin-left: 12px" :disabled="batchBindShow" :loading="loading2">解绑</i-button>
            <i-button @click="unbindVehicle(null, 2)" style="margin-left: 20px" :disabled="batchBindShow1" :loading="loading2">全量解绑</i-button>
          </Form>
        </div>
        <div style="text-align:left" v-show="changeShow === 2">
          <div class="hy-search-bar2">
            <Form label-position="right" inline >
              <i-button @click="bindChange(1)" style="margin-left: 12px">导入</i-button>
              <span class="return-all-bind" @click="returnAllBind">返回全量绑定>></span>
            </Form>
          </div>
          <div style="height:350px;border:1px solid gray;width:100%;">
            <div class="hy_export wrapper"  v-show="!percentShow">
              <Row v-show="isEnd && success === 2">
                <div style="clear:both;"></div>
                <p style="font-size: 24px;"><Icon size= '30' color="green" type="checkmark-circled" style="margin-right: 3px;"></Icon>绑定完成</p>
                <p>绑定总数：{{returnData}}项</p>
                <Button style="margin-top: 10px;" v-show="isEnd && success === 2" @click="bindChange(2)">返回</Button>
              </Row>
              <Row v-show="isEnd && success === 3">
                <div style="clear:both;"></div>
                <p style="font-size: 24px;"><Icon size= '30' color="red" type="close-circled" style="margin-right: 3px;"></Icon>绑定失败</p>
                <p>失败原因：{{returnData}}</p>
                <Button style="margin-top: 10px;" v-show="isEnd && success === 3" @click="bindChange(2)">返回</Button>
              </Row>
              <Row class="hy_down">
                <Row v-show='success === 1' class="hy_success">
                  <p>
                    <img src="../../../../static/images/xsls.png"/>
                    <span>{{fileName}}</span>
                  </p>
                </Row>
                <Button style="" v-show="success === 1" @click="bind">绑定</Button>
                <Upload
                  class="upload-demo"
                  :style="{float: success === 0 && !isEnd? 'left':'', paddingLeft: success === 0 && !isEnd?'45%':''}"
                  ref="upload"
                  :action="importFileUrl()"
                  :before-upload="beforeUpload"
                  :show-upload-list="false"
                  :on-progress="onProgress"
                  :on-error="onError"
                  :on-success="onSuccess"
                  :limit="1">
                  <Button v-show="success === 0 && !isEnd">{{buttonText}}</Button>
                </Upload>
                <a href="javascript:void(0)" v-show='success === 0 && !isEnd' style="float: left;padding-left: 5px;font-size: 12px;" @click="exportDown"><Icon type="ios-download"></Icon>下载模板</a>
                <div style="clear:both;"></div>
              </Row>
            </div>
            <div class="hy_export" v-show="percentShow">
              <Spin class="spin"></Spin>
              <!--<Progress class="hy_pro" :percent="percent" status="active">-->
                <!--<span>{{percent}}%</span>-->
              <!--</Progress>-->
              <!-- <div class="hy_button">
                <Button @click="cancelExport">取消</Button>
              </div> -->
            </div>
          </div>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" :loading="loading3" v-show="changeShow === 0 && activeShow" @click="bindAllVehicle">全量绑定</Button>
          <Button type="ghost" style="margin-left: 8px" @click="bindFormShow = false">关闭</Button>
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
      <!--menu-->
      <Modal v-model="menuModalShow" :mask-closable="false" width="770">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="margin-left: 15%;height: 500px;overflow-y:scroll;">
          <!--<Tree style="width: 70%;" :data="treeArray" :render="renderContent" show-checkbox @on-check-change="treeChange"></Tree>-->
          <!--<Tree :data="treeArray" show-checkbox @on-check-change="treeChange"></Tree>-->
          <el-tree
            v-loading="treeLoading"
            ref="tree"
            :data="treeArray"
            show-checkbox
            node-key="value"
            :default-expanded-keys="['1']"
            :default-checked-keys="defaultCheckedKeys"
            :props="defaultProps"
            :render-content="renderContent">
          </el-tree>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="setMenuToRole()">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="cancel()">重置</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import dictionary from '@/js/mixins/dictionary';
  import button from '@/js/mixins/button';
  import { roleList, saveRole, deleteRole, queryRoleVehicle, unBindRoleVehicle, changeRoleVehicleAuthFlag } from '@/service/userService/role';
  import { resourceTree } from '@/service/userService/resource';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyTable from '@/components/common/table/table.vue';
  import { mapState } from 'vuex';

  export default {
    components: {
      HyDetail,
      HyFormItem,
      HyTable
    },
    mixins: [list, dictionary, button],
    data () {
      return {
        treeLoading: false,
        defaultCheckedKeys: [], // 树形结构默认勾选
        defaultButtonList: [], // 当前全部按钮id数组
        defaultProps: {
          children: 'children',
          label: 'title'
        },
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
            {required: true, message: '请输入角色名称', trigger: 'blur'},
            {pattern: '^[\u4e00-\u9fa5]{1}[0-9a-zA-Z\u4e00-\u9fa5]{0,9}$', message: '由中文开头的1-10个字符组成', trigger: 'blur'}
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
            fixed: 'right',
            width: 270,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {textAlign: 'center'}
              }, [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('角色修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('资源配置') ? this._hyTool.createIcon(h, params, this.menuConfig, '资源配置', {color: '#FAB43A', type: 'jiaoseguanli1', size: '20', content: '资源配置', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('车辆绑定') ? this._hyTool.createIcon(h, params, this.bindVehicle, '车辆绑定', {color: '#19be6b', type: 'bangding', size: '20', content: '车辆绑定', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('角色删除') ? this._hyTool.createIcon(h, params, this.deletes, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
        ],
        menuModalShow: false,
        resourceBeanSet: {},   // 角色下的菜单列表
        treeArray: [],  // 带api的3级资源树
        menuData: [],   // 要设置菜单的角色
        arrayIds: [],    // 配置菜单的数组
        arrayBIds: [],   // 配置按钮的菜单
        buttonProps: {
          type: 'ghost',
          size: 'small'
        },
        treeData: [
          {
            title: '',
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  fontSize: '14px',
                  paddingBottom: '8px',
                  borderBottom: 'solid 1px #e9eaec'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)
                ])
              ]);
            },
            children: []
          }
        ],
        originalData: {},            // 新增，修改的原始数据
        bindFormShow: false,         // 绑定的车辆弹框
        changeShow: null,             // null: 初始化 0: 全量绑定  1：解绑列表 2：导入
        columnType1: 'selection',     // 勾选框
        columnsTitle1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 170,
            key: 'vinCode'
          },
          {
            title: 'GPRS码',
            width: 170,
            key: 'gprsNo'
          },
          {
            title: '车系',
            key: 'carSeries'
          },
          {
            title: '车型',
            width: 130,
            key: 'carType'
          },
          {
            title: '绑定日期',
            key: 'bindDate',
            render: (h, params) => {
              return this.__filters.formatDate(h, params, 'bindDate');
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {textAlign: 'center'}
              }, [
                this._hyTool.createIcon(h, params, this.unbindVehicle, '解绑', {color: '#79878f', type: 'jiebang1', size: '20', content: '解绑', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],        // table 项
        vehicleList: [],         // 绑定的车辆列表
        showCheckbox1: true,     // table 项  动态改变列表样式，解决列表多选框中的bug
        multipleSelection1: [],     // 多选
        loading1: false,
        noDataText1: null,
        vehicleSearchData: {
          pageNum: 1,
          pageSize: 10
        },
        loading2: false,
        returnData: '',   // 返回值
        percent: 0, // 上传百分比
        percentShow: false, // 是否展示上传进度
        isEnd: false,
        success: 0,    // 0: 选择文件 1: 上传前 2：上传成功 3：上传报错
        fileName: '',
        buttonText: '导入',
        batchBindShow: true,     // 解绑按钮禁用
        batchBindShow1: true,     // 解绑按钮禁用
        roleId: null,               // 角色id
        totalElement1: 0,
        totalPage1: 1,
        activeShow: true,       // 全量车辆页面 active css
        loading3: false        // 全量绑定loading
      };
    },
    computed: mapState([
      'exportModel'
    ]),
    methods: {
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        roleList(this.searchPageData, this.callback, ret => {
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
            placeholder: '由中文开头的1-10个字符组成',
            property: {
              maxlength: 10
            }
          },
          {
            key: 'remark',
            title: '备注',
            type: 'textarea',
            placeholder: '可输入0-255个字符',
            property: {
              maxlength: 255
            }
          }
        ];
        this.formLoading = false;
        if (row) {
          this.modalTitle = '修改';
          roleList({id: row.id, pageNum: 1, pageSize: 10}, res => {
            let content = res.content[0];
            //
            this.originalData = {};
            this.originalData = this._hyTool.extend({}, content);
            //
            this.modalFormData = this._hyTool.extend({}, content);
            this.modalFormShow = true;
          }, ret => {
            this.$Notice.error({
              title: '查询角色失败',
              desc: ret
            });
            this.modalFormShow = true;
          });
        } else {
          this.modalTitle = '新增';
          this.modalFormData = {
            roleName: '',
            remark: ''
          };
          this.modalFormShow = true;
        }
      },
      // 提交新增修改
      addOrUpdateSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formLoading = true;
            saveRole({}, this.modalFormData, res => {
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
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '70%',
            fontSize: '14px',
            // paddingBottom: '8px',
            borderBottom: 'solid 1px #e9eaec'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            data.resourceName ? h('span', data.title) : h('Button', {
              props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                type: 'success'
              }),
              style: {
//                marginRight: '8px'
              },
              on: {
//                click: () => { this.append(data); }
              }
            }, data.title)
          ])
        ]);
      },
      // 资源配置
      menuConfig (row) {
        roleList({id: row.id, pageNum: 1, pageSize: 10}, res => {
          let content = res.content[0];
          this.menuData = content;
          this.modalTitle = '资源配置';
          this.formLoading = false;
          this.resourceBeanSet = this._hyTool.extend([], content.resourceBeanSet);
          this.buttonBeanSet = this._hyTool.extend([], content.buttonBeanSet);
          this.getMenuTree(this.resourceBeanSet, this.buttonBeanSet);
        }, ret => {
          setTimeout(() => {
          this.$Notice.error({
            title: '查询角色失败',
            desc: ret
          });
          }, 500);
        });
      },
      // 获取菜单树  menuData: 拥有的菜单 buttonData;拥有的按钮
      getMenuTree (menuData, buttonData) {
        this.defaultButtonList = []; // 当前全部按钮id数组
        let params = {
          id: 1
        };
        resourceTree(params, res => {
          let treeAllArray = [];
          treeAllArray.push(res);
          this.menuModalShow = true;
          this.treeArray = [];
          // 权限树形结构
          treeAllArray[0].value = String(treeAllArray[0].id);
          treeAllArray[0].title = treeAllArray[0].resourceName;
          treeAllArray[0].children = treeAllArray[0].userChildrenList;
          if (treeAllArray[0].userChildrenList.length > 0) {
            this.traversalObject(treeAllArray[0]);
          }
          this.treeArray = treeAllArray;
          let parentIds = [];  // 菜单父节点数组
          let menuDataIds = [];   // 菜单id数组
          menuData.forEach(value => {
            menuDataIds.push(String(value.id));
            if (value.parentId) parentIds.push(String(value.parentId));
          });
          parentIds = this._hyTool.deleteRepeat(parentIds);  // 去重
          menuDataIds = this._hyTool.deleteTwoArrayRepeat(menuDataIds, parentIds);  // 去掉2个数组中的相同元素
          //
          let buttonMenuIds = []; // 按钮的菜单节点数组
          let buttonDataIds = [];  // 按钮id节点
          buttonData.forEach(value => {
            buttonMenuIds.push(String(value.resourceId));
            buttonDataIds.push(String(value.id));
          });
          buttonMenuIds = this._hyTool.deleteRepeat(buttonMenuIds);  // 去重
          menuDataIds = this._hyTool.deleteTwoArrayRepeat(menuDataIds, buttonMenuIds);  // 去掉2个数组中的相同元素
          menuDataIds = menuDataIds.concat(buttonDataIds);  // 菜单id和按钮id合并
          this.defaultCheckedKeys = menuDataIds;
          this.treeLoading = false;
        }, ret => {
          this.treeLoading = false;
          this.$Notice.error({
            title: '查询菜单树失败',
            desc: ret
          });
        });
      },
      // 递归菜单
      traversalObject (obj) {
        let array = obj.children;
        for (let arr of array) {
          arr.value = String(arr.id);
          arr.title = arr.resourceName ? arr.resourceName : arr.buttonName;
          arr.children = [];
          if (arr.userChildrenList && arr.userChildrenList.length > 0) {
            arr.children = arr.userChildrenList;
          } else if (arr.userChildrenList && arr.userButtonList.length > 0) {
            arr.children = arr.userButtonList;
            // 获取所有按钮id集合
            for (let set of arr.userButtonList) {
              this.defaultButtonList.push(String(set.id));
            }
          }
          if (arr.children.length > 0) {
            this.traversalObject(arr);
          }
        }
      },
      // 设置角色菜单
      setMenuToRole () {
        this.arrayIds = [];
        this.arrayBIds = [];
        let resourcesId = this.$refs.tree.getCheckedKeys();  // 目前被选中的节点的 key 所组成的数组
        let halfCheckedId = this.$refs.tree.getHalfCheckedKeys(); // 目前半选中的节点的 key 所组成的数组
        if (resourcesId.length > 0) {
          let arrayIds = [];  // 菜单id集合
          let arrayBIds = [];  // 按钮id集合
          for (let me of resourcesId) {
            for (let bu of this.defaultButtonList) {
              if (me === bu) {
                arrayBIds.push(bu);
              }
            }
          }
          arrayBIds = this._hyTool.deleteRepeat(arrayBIds);
          arrayIds = this._hyTool.deleteTwoArrayRepeat(resourcesId, arrayBIds);  // 去掉2个数组中的相同元素
          arrayIds = arrayIds.concat(halfCheckedId); // 选中和班选中节点的 key 的数组
          this.arrayIds = arrayIds.map(val => { return {id: val}; });
          this.arrayBIds = arrayBIds.map(val => { return {id: val}; });
        }
        // 设置角色菜单
        this.formLoading = true;
        this.menuData.resourceBeanSet = this.arrayIds;
        this.menuData.buttonBeanSet = this.arrayBIds;
        saveRole(null, this.menuData, res => {
          this.formLoading = false;
          setTimeout(() => {
          this.$Notice.success({
            title: '菜单配置成功'
          });
          }, 500);
          this._getList();
          this.menuModalShow = false;
        }, ret => {
          this.formLoading = false;
          setTimeout(() => {
          this.$Notice.error({
            title: '菜单配置失败',
            desc: ret
          });
          }, 500);
        });
      },
      cancel () {
        if (this.modalTitle === '新增') {
          this.$refs.form.resetFields();
          this.modalFormData.remark = '';
        } else if (this.modalTitle === '修改') {
          this.$refs.form.resetFields();
          this.modalFormData = this._hyTool.extend({}, this.originalData);
        } else if (this.modalTitle === '资源配置') {
          this.treeLoading = true;
          this.getMenuTree(this.resourceBeanSet, this.buttonBeanSet);
        }
      },
      // 绑定车辆
      bindVehicle (row) {
        this.modalTitle = '车辆绑定';
        this.bindFormShow = true;
        this.loading1 = true;
        this.batchBindShow1 = true;
        this.vehicleList = [];
        this.roleId = row.id;
        this.changeShow = null;
        this.getVehicleList(1, row.id, row);
      },
      // 获取绑定的车辆列表
      getVehicleList (page, id, row) {
        if (!id) id = this.roleId;
        this.vehicleSearchData.roleId = id;
        if (page) this.vehicleSearchData.pageNum = page;
        queryRoleVehicle(this.vehicleSearchData, res => {
          this.loading1 = false;
          this.vehicleList = res.content ? res.content : [];
          this.totalElement1 = res.totalElements;
          this.totalPage1 = res.totalPages;
          if (this.vehicleList.length) {
              this.batchBindShow1 = false;
          } else {
               this.batchBindShow1 = true;
               this.batchBindShow = true;
          }
          // 未绑定车辆和已全量绑定 进入到 选择页面
          if (row.authFlag === 0) {   // 列表
            if (this.vehicleList.length === 0) {
              this.changeShow = 0;
              this.activeShow = true;  // 默认全部车辆
            } else {
              this.changeShow = 1;
              this.activeShow = false;
            }
          } else {                     // 全量
            this.changeShow = 0;
            this.activeShow = true;  // 默认全部车辆
          }
        }, ret => {
          this.loading1 = false;
          this.$Notice.error({
            title: '获取角色绑定的车辆列表失败',
            desc: ret
          });
        });
      },
      // 获取勾选的数据
      handleSelectionChange1 (val) {
        this.multipleSelection1 = val;
        if (val.length > 0) {
          this.batchBindShow = false;
        } else {
          this.batchBindShow = true;
        }
      },
      // 切换
      bindChange (flag) {
        if (flag === 1) {
          this.changeShow = 2;
          this.$refs.upload.clearFiles();
          this.percentShow = false;
          this.percent = 0;
          this.buttonText = '导入';
          this.isEnd = false;
          this.success = 0;
          this.fileName = '';
        } else if (flag === 2) {
          this.changeShow = 1;
          this.getVehicleList(null, this.roleId);
        }
      },
      // 解绑
      unbindVehicle (row, flag) {
        let params = {};
        if (row) {  // 单个解绑
          params.ids = row.relationId;
          params.roleId = this.roleId;
        } else if (flag === 1) {  // 批量解绑
          let str = [];
          for (let mu of this.multipleSelection1) {
            str.push(mu.relationId);
          }
          params.ids = str.join();
          params.roleId = this.roleId;
        } else if (flag === 2) {  // 全量解绑
          params.roleId = this.roleId;
        }
        this.$confirm('确定解绑车辆？', '提示', {
          showConfirmButton: true,
          showCancelButton: true,
          type: 'warning'
        }).then(() => {
          this.loading2 = true;
          unBindRoleVehicle(params, null, res => {
            this.loading2 = false;
            this.$Notice.success({
              title: '解绑车辆成功'
            });
            this.getVehicleList(null, this.roleId);
            if (flag === 1) this.batchBindShow = true;
          }, ret => {
            this.loading2 = false;
            this.$Notice.error({
              title: '解绑车辆失败',
              desc: ret
            });
          });
        }).catch(() => {
          this.loading2 = false;
        });
      },
      // 绑定
      bind () {
        this.$refs.upload.post(this.file);
      },
      // 导入Excel
      // 模板下载
      exportDown () {
        window.location.href = this.exportModel.bindVehicle;
      },
      // 上传地址
      importFileUrl () {
        return '/api/sys/role/bindVehicleByExcel?roleId=' + this.roleId;
      },
      // 上传之前
      beforeUpload (file) {
        if (!file.name.endsWith('xlsx')) {
          this.$confirm('请使用正确模板', '导入失败', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        } else {
          this.fileName = file.name;
          // this.buttonText = '重新导入';
          this.file = file;
          this.success = 1;
        }
        return false;
      },
      // 上传中
      onProgress (file) {
        this.percentShow = true;
        this.percent = Number.parseInt(file.percent);
      },
      // 上传失败
      onError () {
        this.percentShow = false;
        this.$confirm('导入失败', '提示', {
          showConfirmButton: false,
          showCancelButton: false,
          type: 'error'
        }).then(() => {
        }).catch(() => {
        });
      },
      // 上传成功
      onSuccess (res) {
        if (res.result === true) {
          this.returnData = res.data ? res.data : 0;
          // this.buttonText = '重新导入';
          this.isEnd = true;
          this.success = 2;   // 成功
          this._getList();
        } else {
          this.returnData = res.message;
          this.isEnd = true;
          this.success = 3;   // 失败
        }
        setTimeout(() => {
          this.percentShow = false;
        }, 1000);
      },
      // 取消上传
      cancelExport () {
        this.$refs.upload.clearFiles();
        this.percentShow = false;
        this.percent = 0;
      },
      // 点击全量车辆 选择
      clickDiv (flag) {
        if (flag === 1) {
          this.activeShow = true;
        } else {
          this.activeShow = false;
          this.changeShow = 1;
        }
      },
      // 返回全量绑定
      returnAllBind () {
        this.changeShow = 0;
        this.activeShow = true;
      },
      // 全量绑定
      bindAllVehicle () {
        //
        this.loading3 = true;
        let params = {
          roleId: this.roleId,
          authFlag: 1       // 1： 全部车辆绑定
        };
        changeRoleVehicleAuthFlag(params, null, res => {
          this.loading3 = false;
          this.$Notice.success({
            title: '全量绑定成功'
          });
          this.bindFormShow = false;
          this._getList();
        }, ret => {
          this.loading3 = false;
          this.$Notice.error({
            title: '全量绑定失败',
            desc: ret
          });
        });
      }
    }
  };
</script>
