<style lang="scss" scoped>
 @import 'src/styles/vars';
  @import 'src/styles/mixins';
  .char {
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
    position: absolute;
    top: 10px;
    left: -69px;
  }
  .tips {
    position: absolute;
    display: inline-block;
    color: #ed3f14;
  }
  .charEllipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
<template>
<div class="bgcolor">
  <div class="content">
    <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
      <Form label-position="right" inline :label-width="10" class="clear">
        <FormItem label="">
          <i-input placeholder="用户名" v-model.trim="searchData.userName" clearable class="inputstyle"></i-input>
        </FormItem>
        <FormItem label="">
          <i-input placeholder="姓名" v-model.trim="searchData.realName"  clearable class="inputstyle"></i-input>
        </FormItem>
        <FormItem label="">
          <i-input placeholder="手机号" v-model.trim="searchData.phoneNumber" clearable class="inputstyle"></i-input>
        </FormItem>
        <!--<FormItem label="">-->
          <!--<i-input placeholder="邮箱" v-model="searchData.email" class="inputstyle"></i-input>-->
        <!--</FormItem>-->
        <FormItem label="" >
          <i-select placeholder="组织" v-model="searchData.orgCode" clearable filterable class="inputstyle">
            <Option v-for="item in selectOrgArray" :value="item.code" :key="item.code" :label="item.label">
              {{ item.label }}
              </Option>
          </i-select>
        </FormItem>
        <FormItem label="" >
          <i-select placeholder="账户类型" v-model="searchData.userType" clearable filterable class="inputstyle">
              <i-option value="0">业务</i-option>
              <i-option value="1">大屏</i-option>
          </i-select>
        </FormItem>
        <!--<FormItem label="">
          <i-input placeholder="角色名称" v-model="searchData.roleName"></i-input>
        </FormItem>-->
        <Button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  class="search">查询
        </Button>
        <!--工具条部分-->
        <!-- 添加功能 -->
        <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('用户新增')">
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
    <!--新增-->
    <Modal v-model="modalAddFormShow" :mask-closable="false">
      <p slot="header" class="hy-modal-title">
        <span style="color:black">{{modalTitle}}</span>
      </p>
      <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
        <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95">
          <FormItem label="账号类型" prop="userType">
            <Select class="hy_input" v-model="modalFormData.userType">
              <Option v-for="item in typeArray" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <i-input v-model="modalFormData.userName" placeholder="由数字、字母或_组成(1-16位)" :maxlength="16" clearable></i-input>
          </FormItem>
          <FormItem label="真实姓名" prop="realName">
            <i-input v-model="modalFormData.realName" placeholder="由中文组成(1-16位)" :maxlength="16" clearable></i-input>
          </FormItem>
          <FormItem label="性别" prop="gender">
            <RadioGroup v-model="modalFormData.gender">
              <template v-for="item in genderArray">
                <Radio :label="item.value">{{item.label}}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否推送报警" prop="alarmFlag">
            <Switch size="large" v-model="witch" @on-change="changeSwitch">
                <span slot="open">是</span>
                <span slot="close">否</span>
            </Switch>
          </FormItem>
          <FormItem label="手机号" prop="phoneNumber">
            <i-input v-model="modalFormData.phoneNumber" placeholder="由11位数字组成" :maxlength="11" clearable></i-input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <i-input v-model="modalFormData.email" placeholder="由数字、字母组成" :maxlength="30" clearable></i-input>
          </FormItem>
          <FormItem label="所属组织">
            <span class="char">*</span>
            <i-select placeholder="" v-model="filterText1" clearable filterable>
              <Option v-for="item in selectOrgArray" :value="item.label" :key="item.code" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
            <div style="height: 150px;overflow-y:scroll;">
              <!--<Tree :data="orgTreeArray" show-checkbox @on-check-change="treeChange"></Tree>-->
              <el-tree
                ref="tree1"
                :filter-node-method="filterNode"
                @check-change="checkChange"
                :data="orgTreeArray"
                show-checkbox
                node-key="value"
                :default-expanded-keys="['1']"
                :default-checked-keys="[]"
                :props="defaultProps">
              </el-tree>
            </div>
            <span class="tips" v-show="tipShow">组织不能为空</span>
          </FormItem>
          <FormItem label="密码" prop="passwordA">
            <i-input type="password" v-model="modalFormData.passwordA" placeholder="数字、字母且必须包含大小写字母(8-16位)" clearable :maxlength="16"></i-input>
          </FormItem>
          <FormItem label="确认密码" prop="confirmPassword">
            <i-input type="password" v-model="modalFormData.confirmPassword" placeholder="数字、字母且必须包含大小写字母(8-16位)" clearable :maxlength="16"></i-input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="addOrUpdateSubmit('formAdd')">保存</Button>
        <Button type="ghost" style="margin-left: 8px" @click="cancel()">重置</Button>
      </div>
    </Modal>
    <!--修改-->
    <Modal v-model="modalModifyFormShow" :mask-closable="false">
      <p slot="header" class="hy-modal-title">
        <span>{{modalTitle}}</span>
      </p>
      <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
        <Form ref="formModify" :model="modalFormData" :rules="ruleValidate" :label-width="95">
          <FormItem label="账号类型" prop="userType">
            <Select class="hy_input" v-model="modalFormData.userType">
              <Option v-for="item in typeArray" :value="item.value" :key="item.value" :label="item.label"></Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="userName">
            <i-input v-model="modalFormData.userName" placeholder="由数字、字母或_组成(1-16位)" :maxlength="16" :disabled="true"></i-input>
          </FormItem>
          <FormItem label="真实姓名" prop="realName">
            <i-input v-model="modalFormData.realName" placeholder="由中文组成(1-16位)" :maxlength="16" clearable></i-input>
          </FormItem>
          <FormItem label="性别" prop="gender">
            <RadioGroup v-model="modalFormData.gender">
              <template v-for="item in genderArray">
                <Radio :label="item.value">{{item.label}}</Radio>
              </template>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否推送报警" prop="alarmFlag">
            <Switch size="large" v-model="witch" @on-change="changeSwitch">
                <span slot="open">是</span>
                <span slot="close">否</span>
            </Switch>
          </FormItem>
          <FormItem label="手机号" prop="phoneNumber">
            <i-input v-model="modalFormData.phoneNumber" placeholder="由11位数字组成" :maxlength="11" clearable></i-input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <i-input v-model="modalFormData.email" placeholder="由数字、字母组成" :maxlength="30" clearable></i-input>
          </FormItem>
          <FormItem label="所属组织">
            <span class="char">*</span>
            <i-select placeholder="" v-model="filterText2" clearable filterable>
              <Option v-for="item in selectOrgArray" :value="item.label" :key="item.code" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
            <!--<el-input-->
              <!--placeholder="输入关键字进行过滤"-->
              <!--v-model="filterText2">-->
            <!--</el-input>-->
            <div style="height: 150px;overflow-y:scroll;">
              <!--<Tree :data="orgTreeArray" show-checkbox @on-check-change="treeChange"></Tree>-->
              <el-tree
                ref="tree2"
                :filter-node-method="filterNode"
                @check-change="checkChange"
                :data="orgTreeArray"
                show-checkbox
                node-key="value"
                :default-expanded-keys="['1']"
                :default-checked-keys="defaultCheckedKeys"
                :props="defaultProps">
              </el-tree>
            </div>
            <span class="tips" v-show="tipShow">组织不能为空</span>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" style="background-color:#4784FF" :loading="formLoading" @click="addOrUpdateSubmit('formModify')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="cancel()">重置</Button>
      </div>
    </Modal>
    <!--重置密码-->
    <Modal v-model="modalFormShowReset" :mask-closable="false">
      <p slot="header" class="hy-modal-title">
        <span>{{modalTitle}}</span>
      </p>
      <div style="text-align:left">
        <Form ref="formReset" :model="modalPwdFormData" :rules="ruleValidatePwd" :label-width="90" >
          <hy-form-item :form="modalPwdFormData" :formRow="modalFormItem"></hy-form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" style="background-color:#4784FF" :loading="formLoading" @click="resetPwdSubmit('formReset')">提交</Button>
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
        <label style="display: inline-block;margin: 10px 0 0 90px;">所属组织：</label>
        <div style="margin-left: 150px;height: 150px;overflow-y:scroll;">
          <Tree :data="orgTreeArrayDis" show-checkbox :empty-text="null"></Tree>
        </div>
        <label style="display: inline-block;margin: 10px 0 0 110px;">角色：</label>
        <RadioGroup v-model="checkAllGroup" style="margin-left: 150px;">
          <template v-for="item in listRole">
            <Radio style="width: 30%;margin-bottom: 10px;" :label="item.id" :title="item.roleName" :disabled="true">{{item.roleName}}</Radio>
          </template>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button type="ghost" style="margin-left: 8px" @click="detailModalShow = false">关闭</Button>
      </div>
    </Modal>
    <!--角色分配-->
    <Modal v-model="modalFormShowRole" :mask-closable="false">
      <p slot="header" class="hy-modal-title">
        <span>{{modalTitle}}</span>
      </p>
      <div style="text-align:left">
        <hy-detail :form="modalFormData" :rowData="modalDetailItem" v-if="modalFormShowRole"></hy-detail>
        <template>
          <label style="display: inline-block;margin: 10px 0 0 60px;">角色：</label>
          <RadioGroup v-model="checkAllGroup" style="margin-left: 120px;">
            <template v-for="item in listRole">
              <Radio style="width: 46%;margin-bottom: 10px;" :label="item.id" :title="item.roleName" >{{item.roleName}}</Radio>
            </template>
          </RadioGroup>
        </template>
        <div style="margin-top: 10px;margin-left: 60px;">
          <Upload :action="uploadAction" ref="upload"
                  :show-upload-list="false"
                  :before-upload="handleBeforeUpload">
            <Button type="ghost" icon="ios-cloud-upload-outline" style="color:blue;">新能源车网络法规保密协议</Button>
          </Upload>
          <div v-if="file !== null" style="margin-top: 10px;">上传的文件名称：<span style="font-weight: bold;">{{file.name}}</span></div>
          <!--<Button style="margin-top: 10px;" type="ghost" v-if="roleDownloadShow" @click="authDownload()">文件下载</Button>-->
          <div v-if="roleUserData.fileName && file === null" style="margin-top: 10px;">文件名称：<span style="font-weight: bold;">{{roleUserData.fileName}}</span></div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" style="background-color:#4784FF" :loading="formLoading" @click="roleConfigSubmit()">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="cancel">重置</Button>
      </div>
    </Modal>
  </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import dictionary from '@/js/mixins/dictionary';
  import orgMixin from '@/js/mixins/special/org';
  import button from '@/js/mixins/button';
  import { userList, userSave, resetPassword, authUser, getPublicKey, reversalUser, userRoleList } from '@/service/userService/user';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyTable from '@/components/common/table/table.vue';
  export default {
    components: {
      HyDetail,
      HyFormItem,
      HyTable
    },
    mixins: [list, dictionary, orgMixin, button],
    data () {
      return {
        filterText1: '',
        filterText2: '',
        defaultCheckedKeys: [], // 树形结构默认勾选
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        formLoading: '',
        loading: true,
        witch: true,
        modalAddFormShow: false,         // 新增
        modalModifyFormShow: false,         // 修改
        modalFormShowReset: false,         // 重置密码
        modalFormShowRole: false,         // 角色分配
        // 查询条件
        searchData: {},
        // 弹出层标题
        modalTitle: '',
        // 弹出层数据
        modalFormData: {
          userName: '',
          password: '',
          passwordA: '',
          confirmPassword: '',
          realName: '',
          updateUser: '',
          updateTime: '',
          gender: 1,
          alarmFlag: 1,
          state: 0,
          orgIdArray: [],
          phoneNumber: '',
          email: ''
        },  // 新增，修改字段
        modalPwdFormData: {},
        modalFormDataAuthorized: {},
        // 弹出层数据项
        modalFormItem: [],
        ruleValidate: {
          userType: [
            {required: true, type: 'number', message: '账号类型不能为空', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {pattern: '^(?!_)(?!.*?_$)[0-9a-zA-Z_]{1,16}$', message: '用户名为字母、数字或者下划线，且下划线不能开头和结尾1-16位字符串', trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '真实姓名不能为空', trigger: 'blur'},
            {pattern: '^[\\u4e00-\\u9fa5]{1,16}$', message: '真实姓名为1-16个中文字', trigger: 'blur'}
          ],
          gender: [
            {required: true}
          ],
          alarmFlag: [
            {required: true}
          ],
          phoneNumber: [
            {required: true, message: '手机号不能为空', trigger: 'blur'},
            {pattern: '^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\\d{8}$', message: '手机号格式不正确', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '邮件不能为空', trigger: 'blur'},
            {pattern: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2})$', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          orgIdArray: [
            {required: true, type: 'array', message: '组织不能为空', trigger: 'change'}
          ],
          passwordA: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$', message: '密码为8-16位数字和字母的组合，且必须包含大小写字母', trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: (rule, val, callback) => {
              if (this.modalFormData.passwordA !== val) {
                callback('两次输入的密码不一致');
              } else {
                callback();
              }
            }}
          ]
        },
        ruleValidatePwd: {
          newPassword: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$', message: '密码为8-16位数字和字母的组合，且必须包含大小写字母', trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: (rule, val, callback) => {
              if (this.modalPwdFormData.newPassword !== val) {
                callback('两次输入的密码不一致');
              } else {
                callback();
              }
            }}
          ]
        },
        detailModalShow: false,
        modalUpdateFormItem: [],  // 修改弹出框中的item
        // 列表展示的数据
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 110,
            align: 'center'
          },
          {
            title: '用户名',
            width: 140,
            key: 'userName'
          },
          {
            title: '真实姓名',
            width: 140,
            key: 'realName'
          },
          {
            title: '性别',
            width: 100,
            key: 'gender',
            render: (h, params) => {
              return this.__filters.sex(h, params, 'gender');
            }
          },
          {
            title: '手机号',
            width: 180,
            key: 'phoneNumber'
          },
          {
            title: '组织名称',
            width: 330,
            key: 'orgs',
            render: (h, params) => {
              let orgArray = params.row['orgs'];
              let orgName = '';
              if (orgArray && orgArray.length > 0) {
                orgArray.forEach(value => {
                  if (orgName === '') {
                    orgName += value.name;
                  } else {
                    orgName += '，' + value.name;
                  }
                });
                if (orgName.length > 50) {
                  orgName = `${orgName.substring(0, 50)}......`;
                }
              }
              return h('p', null, orgName);
            }
          },
          {
            title: '附件下载',
            width: 100,
            key: 'fileName',
            render: (h, params) => {
              return h('div', [
                params.row.fileName ? this._hyTool.createIcon(h, params, this.authDownload, params.row.fileName, {color: '#6599EF', type: 'xiazai1', size: '20', content: '下载保密协议', placement: 'left'}) : null
              ]);
            }
          },
          {
            title: '账户类型',
            width: 100,
            key: 'userType',
            render: (h, params) => {
              if (params.row.userType === 0) {
                return '业务';
              } else if (params.row.userType === 1) {
                return '大屏';
              }
            }
          },
          {
            title: '更新人',
            width: 150,
            key: 'updateUser'
          },
          {
            title: '更新时间',
            width: 180,
            key: 'updateTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 200,
          //  fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                params.row.state === 0 && this.buttonShow('用户修改信息') && params.row.id !== 1 ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                params.row.state === 0 && this.buttonShow('重置用户密码') && params.row.id !== 1 ? this._hyTool.createIcon(h, params, this.resetPasswordFun, '重置密码', {color: '#FAB43A', type: 'suo', size: '20', content: '重置密码', placement: 'top', showTransfer: true}) : null,
                params.row.state === 0 && this.buttonShow('用户配置角色') && params.row.id !== 1 ? this._hyTool.createIcon(h, params, this.roleConfig, '角色', {color: '#F3E957', type: 'icon', size: '20', content: '角色', placement: 'top', showTransfer: true}) : null,
//                params.row.state === 0 ? this._hyTool.createIcon(h, params, this.authFun, '授权') : null,
                this.buttonShow('用户禁启用') && params.row.id !== 1 ? this._hyTool.createIcon(h, params, this.reversal, null, params.row.state === 0 ? {color: '#919191', type: 'jinyong', size: '20', content: '禁用', placement: 'top', showTransfer: true} : {color: '#69BB6B', type: 'qiyong', size: '20', content: '启用', placement: 'top', showTransfer: true}, null,
                  {marginRight: '5px', color: params.row.state === 0 ? 'red' : '#19be6b'}) : null
              ]);
            }
          }
        ],
        menuModalShow: false,
        genderArray: [{value: 1, label: '男'}, {value: 2, label: '女'}],
        typeArray: [{value: 0, label: '业务'}, {value: 1, label: '大屏'}],
        file: null,
        columnAuthType: 'selection',
        columnsAuthTitle: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '权限名称',
            key: 'resourceName'
          },
          {
            title: '权限编码',
            key: 'resourceCode'
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        listAuth: [],
        authUserData: {},               // 授权的用户信息
        uploadAction: '/api/sys/user/deploy',    // 上传路径
        uploadData: {},
        uploadForm: new FormData(),   // 一个formdata
        multipleSelectionAuth: [],        // 多选
        showAuthCheckbox: true,       // table 项  动态改变列表样式，解决列表多选框中的bug
        authTips: false,
        roleDownloadShow: false,      // 有下载文件就显示下载按钮
        downloadUrl: '',    // 授权文件下载路径
        listRole: [],
        roleUserData: {},
        selectOrgIds: [],      // 勾选的组织id数组
        operTreeShow: false,   // 是否勾选过组织树形
        tipShow: false,        // 组织提示语
        orgTreeArray: [],       // 组织树形结构自定义操作
        orgTreeArrayDis: [],       // 组织树形结构自定义操作 dis
        checkAllGroup: null,     // 勾选的角色id
        originalData: {},        //
        orgId: '',                 // 新增，修改中组织删选的条件
        index: null               // 要操作的行数
      };
    },
    watch: {
      filterText1 (val) {
        this.$refs.tree1.filter(val);
      },
      filterText2 (val) {
        this.$refs.tree2.filter(val);
      }
    },
    created () {
      this.getSelectOrg(); // 获取全部组织列表
      this.getSelectRole();   // 获取全部角色列表
    },
    methods: {
      _getList (page, flag) {
        this.loading = true;
        if (this.searchData.phoneNumber === '') this.searchData.phoneNumber = null;
        if (this.searchData.orgCode === '') this.searchData.orgCode = null;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        userList(this.searchPageData, res => {
          this.totalElement = res.totalElements;
          this.totalPage = res.totalPages;
          this.list = res.content ? res.content : [];
          this.loading = false;
          if (this.list.length === 0) {
            this.noDataText = '暂无数据';
            this.showCheckbox = false;
          } else {
            this.noDataText = null;
            this.showCheckbox = true;
          }
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询用户管理失败',
            desc: ret
          });
        });
      },
      changeSwitch (data) {
        if (data) {
          this.modalFormData.alarmFlag = 1;
        } else {
          this.modalFormData.alarmFlag = 0;
        }
      },
      // 点击新增、修改
      addOrUpdate (row, index) {
        this.tipShow = false; // 组织提示
        this.formLoading = false;
        this.orgId = '';
        this.orgTreeArray = [];
        this.getOrgTree(1, (orgArray) => {
          if (row) {
            this.index = index;
            this.$set(this.list, this.index, this._hyTool.extend({}, row));
            this.modalTitle = '修改';
            this.modalFormData = {};
            this.$refs.formModify.resetFields();
            userRoleList({id: row.id}, res => {
              this.$set(row, 'orgBeanSet', row.orgs);
              this.$set(row, 'roleBeanSet', res);
              // 默认勾选
              this.defaultCheckedKeys = [];
              for (let set of row.orgBeanSet) {
                this.defaultCheckedKeys.push(String(set.id));
              }
              this.orgTreeArray = this._hyTool.extend([], orgArray);
              // 原始数据
              this.originalData = {};
              this.originalData = this._hyTool.extend({}, row);
              // 展示数据
              this.modalFormData = this._hyTool.extend({}, row);
              if (this.modalFormData.alarmFlag === 1) this.witch = true;
              else this.witch = false;
              this.modalModifyFormShow = true;
            }, ret => {
              this.modalModifyFormShow = true;
              this.loading = false;
              this.$Notice.error({
                title: '查询用户管理失败',
                desc: ret
              });
            });
          } else {
            // 默认勾选
            this.defaultCheckedKeys = [];
            this.orgTreeArray = this._hyTool.extend([], orgArray);
            this.modalAddFormShow = true;
            this.tipShow = false; // 组织提示
            this.witch = true; // 开启推送
            this.$refs.formAdd.resetFields();
            this.modalTitle = '新增';
            this.modalFormData = {};
            this.modalFormData = {
              userType: 0,   // 默认 业务
              userName: '',
              password: '',
              passwordA: '',
              confirmPassword: '',
              realName: '',
              updateUser: '',
              updateTime: '',
              gender: 1,
              alarmFlag: 1,
              state: 0,
              orgIdArray: [],
              phoneNumber: '',
              email: ''
            };
          }
        });
      },
      // 提交新增修改
      addOrUpdateSubmit (name) {
        this.$refs[name].validate((valid) => {
          // 获取勾选的数组
          let orgArr = [];
          if (this.modalTitle === '新增') orgArr = this.$refs.tree1.getCheckedKeys();
          else if (this.modalTitle === '修改') orgArr = this.$refs.tree2.getCheckedKeys();
          if (orgArr.length === 0) {
            this.tipShow = true;
            return;
          }
          if (valid) {
            this.formLoading = true;
            this.modalFormData.orgBeanSet = [];
            // 匹配组织名称
            orgArr.forEach(value => {
              for (let org of this.selectOrgArray) {
                if (value === String(org.value)) {
                  this.modalFormData.orgBeanSet.push({id: value, orgName: org.label});
                }
              }
            });
            if (this.modalTitle === '新增') {
              // 新增加密密码
              getPublicKey(null, res => {
                let jse = new this.$jsEncrypt.JSEncrypt();
                jse.setPublicKey(res);
                this.modalFormData.password = jse.encrypt(this.modalFormData.passwordA);
                userSave({}, this.modalFormData, res => {
                  this.modalAddFormShow = false;
                  this.modalModifyFormShow = false;
                  this.formLoading = false;
                  delete this.modalFormData.passwordA;
                  delete this.modalFormData.confirmPassword;
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
              }, ret => {
                this.modal_loading = false;
                this.$Notice.error({
                  title: '获取公钥失败',
                  desc: ret
                });
              });
            } else {
              userSave({}, this.modalFormData, res => {
                this.modalAddFormShow = false;
                this.modalModifyFormShow = false;
                this.formLoading = false;
                this.$Notice.success({
                  title: this.modalTitle + '成功'
                });
                this._getList();
                // this.$set(this.list, this.index, this._hyTool.extend({}, this.modalFormData));
              }, ret => {
                this.formLoading = false;
                this.$Notice.error({
                  title: this.modalTitle + '失败',
                  desc: ret
                });
              });
            }
          }
        });
      },
      // 点击重置修改
      resetPasswordFun (row) {
        this.$refs.formReset.resetFields();
        this.modalFormItem = [
          {
            key: 'newPassword',
            title: '新密码',
            type: 'password',
            property: {
              maxlength: 16
            }
          },
          {
            key: 'confirmPassword',
            title: '确认密码',
            type: 'password',
            property: {
              maxlength: 16
            }
          }
        ];
        this.formLoading = false;
        this.modalTitle = '重置密码';
        this.modalPwdFormData = {
          userId: row['id'],
          newPassword: '',
          confirmPassword: ''
        };
        this.modalFormShowReset = true;
      },
      // 提交重置
      resetPwdSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.formLoading = true;
            getPublicKey(null, res => {
              let jse = new this.$jsEncrypt.JSEncrypt();
              jse.setPublicKey(res);
              let newPassword = jse.encrypt(this.modalPwdFormData.newPassword);
              let params = {
                userId: this.modalPwdFormData.userId,
                newPassword: newPassword
              };
              resetPassword(params, null, res => {
                this.modalFormShowReset = false;
                this.formLoading = false;
                this.$Notice.success({
                  title: this.modalTitle + '成功'
                });
                // this._getList();
              }, ret => {
                this.formLoading = false;
                this.$Notice.error({
                  title: this.modalTitle + '失败',
                  desc: ret
                });
              });
            }, ret => {
              this.modal_loading = false;
              this.$Notice.error({
                title: '获取公钥失败',
                desc: ret
              });
            });
          }
        });
      },
      // 详情弹框
      detail (row) {
        this.modalDetailItem = [
          {
            title: '账号类型',
            key: 'userType',
            array: this.typeArray
          },
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '真实姓名',
            key: 'realName'
          },
          {
            title: '性别',
            key: 'gender',
            array: this.genderArray
          },
//          {
//            title: '组织',
//            key: 'orgName'
//          },
          {
            key: 'phoneNumber',
            title: '手机号'
          },
          {
            key: 'email',
            title: '邮箱'
          },
          {
            title: '创建人',
            key: 'createUser'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '更新人',
            key: 'updateUser'
          },
          {
            title: '更新时间',
            key: 'updateTime'
          },
          {
            title: '是否推送报警',
            key: 'alarmFlag',
            array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
          }
        ];
        this.modalFormData = this._hyTool.extend({}, row);
        this.modalFormData.createTime = this._hyTool.DateFormat(new Date(+this.modalFormData.createTime), 'yyyy-MM-dd hh:mm:ss');
        this.modalFormData.updateTime = this._hyTool.DateFormat(new Date(+this.modalFormData.updateTime), 'yyyy-MM-dd hh:mm:ss');
        // 组织
        this.modalFormData.orgIdArray = [];
        this.modalFormData.orgs.forEach(value => {
          this.modalFormData.orgIdArray.push({id: String(value.id), orgName: value.name});
        });
        this.orgTreeArrayDis = [];
        this.getOrgTreeDis((orgArrayDis) => {
          this.orgTreeArrayDis = this._hyTool.extend([], orgArrayDis);
          for (let value of this.modalFormData.orgIdArray) {
            let menuId = String(value.id);
            for (let tree of this.orgTreeArrayDis) {
              if (tree.value === menuId) {
                tree.checked = true;
              } else {
                this.traversalCheckedObject(tree, menuId);
              }
            }
          }
        });
        // 角色分配
        this.listRole = this._hyTool.extend([], this.selectRoleArray);
        userRoleList({id: row.id}, res => {
          this.$set(row, 'roleBeanSet', res);
          this.checkAllGroup = null;
          if (row.roleBeanSet.length > 0) {
            this.checkAllGroup = row.roleBeanSet[0].id;
          }
          // admin拥有所有组织，所有角色
        }, ret => {
          this.modalModifyFormShow = true;
          this.loading = false;
          this.$Notice.error({
            title: '查询用户管理失败',
            desc: ret
          });
        });
        this.detailModalShow = true;
        this.modalTitle = '详情';
      },
      // 递归标记已有的菜单和按钮权限
      traversalCheckedObject (tree, menuId) {
        if (tree.children.length > 0) {
          for (let tr of tree.children) {
            if (tr.value === menuId) {
//              tree.expand = true;
//               tr.expand = true;  // 为true为会出现勾选样式不
//               tr.checked = true;
              this.$set(tr, 'expand', true);
              this.$set(tr, 'checked', true);
            } else {
              this.traversalCheckedObject(tr, menuId);
            }
          }
        }
      },
      // 启用启用
      reversal (row, index) {
        if (!row) return;
        this.$set(this.list, index, this._hyTool.extend({}, row));
        let message = '';
        let params = {
          id: row.id,
          value: ''
        };
        if (row.state === 0) {
          message = '禁用';
          params.value = 1;
        } else {
          message = '启用';
          params.value = 0;
        }
        this.$confirm('确定' + message + '？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reversalUser(params, null, res => {
            // this._getList();
            this.$Notice.success({
              title: message + '成功'
            });
            this.$set(this.list[index], 'state', params.value);
          }, ret => {
            this.$Notice.error({
              title: message + '失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      },
      // 上传
      handleBeforeUpload (file) {
        this.file = file;
        this.uploadForm = new FormData();
        this.uploadForm.append('file', this.file);
        this.authTips = false;
        let format = ['pdf', 'zip'];// 文件格式限制
        let maxSize = 1024; // 文件大小限制  1M
        // 判断文件是否符合上传要求
        let fileName = file.name;
        let fileSize = file.size / 1024;
        let suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);// 后缀名
        if (format.indexOf(suffix) === -1) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 ' + format.toString() + ' 格式的文件。'
          });
          this.authTips = true;
        } else if (maxSize < fileSize) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 ' + maxSize / 1024 + 'M。'
          });
          this.authTips = true;
        }
        return false;
      },
      authDownload (row) {
        this.downloadUrl = '/api/sys/user/deploy/download?id=' + row.id;
        this.downloadFile(this.downloadUrl);
      },
      // 下载授权文件
      downloadFile (url) {
        try {
          let elemIF = document.createElement('iframe');
          elemIF.src = url;
          elemIF.style.display = 'none';
          document.body.appendChild(elemIF);
        } catch (e) {
          alert('下载异常！');
        }
      },
      // 角色配置弹出框
      roleConfig (row, index) {
        this.index = index;
        this.$set(this.list, this.index, this._hyTool.extend({}, row));
        this.formLoading = false;
        this.modalDetailItem = [
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '真实姓名',
            key: 'realName'
          },
          {
            title: '性别',
            key: 'gender',
            array: [{label: '男', value: 1}, {label: '女', value: 2}]
          },
          {
            key: 'phoneNumber',
            title: '手机号'
          },
          {
            key: 'email',
            title: '邮箱'
          }
        ];
        this.file = null;  // 重置file
        userRoleList({id: row.id}, res => {
          this.$set(row, 'orgBeanSet', row.orgs);
          this.$set(row, 'roleBeanSet', res);
          // 原始数据
          this.originalData = {};
          this.originalData = this._hyTool.extend({}, row);
          // 展示数据
          this.modalFormData = [];
          this.modalFormData = this._hyTool.extend({}, row);
          this.listRole = [];
          this.listRole = this._hyTool.extend([], this.selectRoleArray);
          this.roleUserData = {};
          this.roleUserData = this._hyTool.extend({}, row);
          // 文件展示隐藏
          if (this.roleUserData.fileName) {
            this.roleDownloadShow = true;
          } else {
            this.roleDownloadShow = false;
          }
          // 角色勾选
          this.checkAllGroup = null;
          if (row.roleBeanSet.length > 0) {
            this.checkAllGroup = row.roleBeanSet[0].id;
          }
          this.modalFormShowRole = true;
          this.modalTitle = '角色分配';
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询用户管理失败',
            desc: ret
          });
        });
      },
      // 上传提交
      uploadSubmit () {
        this.formLoading = true;
        if (this.authTips) {
          this.formLoading = false;
          this.$Notice.error({
            title: '文件上传错误',
            desc: '文件格式不正确或文件太大'
          });
          return;
        }
//        if (!this.file) {
//          this.$Notice.warning({
//            title: '请上传保密协议'
//          });
//          return;
//        }
        this.uploadData = {
          id: this.roleUserData.id
        };
        authUser(this.uploadData, this.uploadForm, res => {
          this.$Notice.success({
            title: '角色配置和文件上传成功'
          });
          this.file = null;
          this.formLoading = false;
          this.modalFormShowRole = false;
          this._getList();
        }, ret => {
          this.formLoading = false;
          this.$refs.upload.clearFiles();
          this.$Notice.error({
            title: '上传文件失败',
            desc: ret.message
          });
        });
      },
      // 角色配置提交
      roleConfigSubmit () {
        if (!this.checkAllGroup) {
          this.$Notice.warning({
            title: '请选择角色'
          });
          return;
        }
        let ids = [];
        ids.push({id: this.checkAllGroup});
        this.roleUserData.roleBeanSet = ids;
        this.formLoading = true;
        userSave(null, this.roleUserData, res => {
          if (!this.file) {              // 没有文件上传
            this.formLoading = false;
            this.modalFormShowRole = false;
            this.$Notice.success({
              title: this.modalTitle + '成功'
            });
            // this._getList();
            this.$set(this.list, this.index, this._hyTool.extend({}, this.roleUserData));
          } else {
            this.uploadSubmit();
          }
        }, ret => {
          this.formLoading = false;
          this.$Notice.error({
            title: this.modalTitle + '失败',
            desc: ret.message
          });
        });
      },
      // 组织过滤
      filterNode (value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 监控是否勾选了组织
      checkChange (data, flag, childFlag) {
        let orgArr = [];
        if (this.modalTitle === '新增') orgArr = this.$refs.tree1.getCheckedKeys();
        else if (this.modalTitle === '修改') orgArr = this.$refs.tree2.getCheckedKeys();
        if (orgArr.length === 0) {
          this.tipShow = true;
        } else {
          this.tipShow = false;
        }
      },
      // 重置
      cancel () {
        if (this.modalTitle === '新增') {
          this.$refs.formAdd.resetFields();
          this.orgId = '';
          if (this.modalFormData.alarmFlag === 1) this.witch = true;
          else this.witch = false;
          this.getOrgTree(1, (orgArray) => {
            this.orgTreeArray = this._hyTool.extend([], orgArray);
          });
          this.tipShow = false;
        } else if (this.modalTitle === '修改') {
          this.$refs.formModify.resetFields();
          this.modalFormData = this._hyTool.extend({}, this.originalData);
          if (this.modalFormData.alarmFlag === 1) this.witch = true;
          else this.witch = false;
          this.defaultCheckedKeys = [];
          this.modalFormData.orgBeanSet.forEach(value => {
            this.defaultCheckedKeys.push(String(value.id));
          });
          // 获取组织树形结构
          this.orgId = '';
          this.getOrgTree(1, (orgArray) => {
            this.orgTreeArray = this._hyTool.extend([], orgArray);
          });
          this.operTreeShow = false;     // 是否勾选过树形
          this.tipShow = false;     // 组织勾选提示
        } else if (this.modalTitle === '重置密码') {
          this.$refs.formReset.resetFields();
        } else if (this.modalTitle === '角色分配') {
          this.listRole = [];
          this.listRole = this._hyTool.extend([], this.selectRoleArray);
          this.roleUserData = {};
          this.roleUserData = this._hyTool.extend({}, this.originalData);
          this.file = null;  // 重置file
          // 文件展示隐藏
          if (this.roleUserData.fileName) {
            this.roleDownloadShow = true;
          } else {
            this.roleDownloadShow = false;
          }
          // 角色勾选
          this.checkAllGroup = null;
          if (this.roleUserData.roleBeanSet.length > 0) {
            this.checkAllGroup = this.roleUserData.roleBeanSet[0].id;
          }
        }
      }
    }
  };
</script>
