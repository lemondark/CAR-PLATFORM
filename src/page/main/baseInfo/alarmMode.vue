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
  .char1 {
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #ed3f14;
    position: absolute;
    top: 10px;
    left: -92px;
  }
  .tips {
    position: absolute;
    display: inline-block;
    top: 20px;
    color: #ed3f14;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2" style="height: auto;margin-left: 0px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <i-select placeholder="报警类型" v-model="searchDataCus.type" @on-change="checkSelect" clearable filterable>
              <Option v-for="item in typeArray" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <FormItem label="">
            <i-select placeholder="报警等级" v-model="searchDataCus.level" clearable filterable>
              <Option v-for="item in selectArray" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <FormItem label="">
            <i-select placeholder="报警方式" v-model="searchDataCus.mode" clearable filterable>
              <Option v-for="item in modeArray" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <!--工具条部分-->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('方式新增')">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate()">新增</hy-icon>
            <!--<Button type="ghost" class="hy-search-button" :class="delClasses" shape="circle" @click="deletes()">删除</Button>-->
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
      <Modal v-model="modalFormShow" :mask-closable="false" width="600">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="text-align:left">
          <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
            <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="95">
              <FormItem label="报警类型" prop="type">
                <i-select placeholder="" v-model="modalFormData.type" clearable filterable>
                  <Option v-for="item in typeArray" :value="item.value" :key="item.value" :label="item.label">
                    {{ item.label }}
                  </Option>
                </i-select>
              </FormItem>
              <FormItem label="报警等级" prop="level">
                <i-select placeholder="" v-model="modalFormData.level" clearable filterable>
                  <!--<Option v-for="item in levelArray" :value="item.value" :key="item.value" :label="item.label">-->
                  <!--{{ item.label }}-->
                  <!--</Option>-->
                  <Option value="1">一级</Option>
                  <Option value="2">二级</Option>
                  <Option value="3">三级</Option>
                  <Option value="4" v-if="modalFormData.type === 3">四级</Option>
                </i-select>
              </FormItem>
              <FormItem label="报警方式">
                <span class="char">*</span>
                <CheckboxGroup v-model="mode" @on-change="checkAllGroupChange">
                  <template v-for="item in modeArray">
                    <Checkbox :label="item.value" >{{item.label}}</Checkbox>
                  </template>
                </CheckboxGroup>
                <span class="tips" v-show="tipShow">报警方式不能为空</span>
              </FormItem>
              <FormItem label="发送短信模板" prop="smsTemplateId" v-if="msgShow">
                <span class="char1">*</span>
                <i-select v-model="modalFormData.smsTemplateId">
                  <i-option v-for="item in smsList" :value="item.id" :key="item.id" :label="item.name"></i-option>
                </i-select>
              </FormItem>
              <FormItem label="发送短信角色" v-if="msgShow">
                <!--<span class="char1">*</span>-->
                <Transfer :data="roleData" :target-keys="roleMsgTargetKeys" filterable :filter-method="filterMethodRoleMsg" @on-change="handleChangeRoleMsg"></Transfer>
                <!--<span class="tips" style="margin-top: 185px;" v-show="tipShow1">发送短信角色不能为空</span>-->
              </FormItem>
              <FormItem label="发送短信用户" v-if="msgShow">
                <!--<span class="char1">*</span>-->
                <Transfer :data="userData" :target-keys="userMsgTargetKeys" filterable :filter-method="filterMethodUserMsg" @on-change="handleChangeUserMsg"></Transfer>
                <span class="tips" style="margin-top: 185px;" v-show="tipShow2">发送短信角色或发送短信用户不能为空</span>
              </FormItem>
              <FormItem label="发送邮件模板" prop="emailTemplateId" v-if="emailShow">
                <span class="char1">*</span>
                <i-select v-model="modalFormData.emailTemplateId">
                  <i-option v-for="item in emailList" :value="item.id" :key="item.id" :label="item.name"></i-option>
                </i-select>
              </FormItem>
              <FormItem label="发送邮件角色" v-if="emailShow">
                <!--<span class="char1">*</span>-->
                <Transfer :data="roleData" :target-keys="roleEmailTargetKeys" filterable :filter-method="filterMethodRoleEmail" @on-change="handleChangeRoleEmail"></Transfer>
                <!--<span class="tips" style="margin-top: 185px;" v-show="tipShow3">发送邮件角色不能为空</span>-->
              </FormItem>
              <FormItem label="发送邮件用户" v-if="emailShow">
                <!--<span class="char1">*</span>-->
                <Transfer :data="userData" :target-keys="userEmailTargetKeys" filterable :filter-method="filterMethodUserEmail" @on-change="handleChangeUserEmail"></Transfer>
                <span class="tips" style="margin-top: 185px;" v-show="tipShow4">发送邮件角色或发送邮件用户不能为空</span>
              </FormItem>
            </Form>
          </div>
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
          <Form ref="formD" :label-width="95" style="margin-left: 75px;margin-top: 20px;">
            <FormItem label="发送短信模板" v-if="msgShow && modalFormData.smsTemplate">
              {{modalFormData.smsTemplate.name}}
            </FormItem>
            <FormItem label="发送短信角色" v-if="msgShow">
              <Transfer :data="roleData" :target-keys="roleMsgTargetKeys" :filter-method="filterMethodRoleMsg" @on-change="handleChangeRoleMsg"></Transfer>
            </FormItem>
            <FormItem label="发送短信用户" v-if="msgShow">
              <Transfer :data="userData" :target-keys="userMsgTargetKeys" :filter-method="filterMethodUserMsg" @on-change="handleChangeUserMsg"></Transfer>
            </FormItem>
            <FormItem label="发送邮件模板" v-if="emailShow && modalFormData.emailTemplate">
              {{modalFormData.emailTemplate.name}}
            </FormItem>
            <FormItem label="发送邮件角色" v-if="emailShow">
              <Transfer :data="roleData" :target-keys="roleEmailTargetKeys" :filter-method="filterMethodRoleEmail" @on-change="handleChangeRoleEmail"></Transfer>
            </FormItem>
            <FormItem label="发送邮件用户" v-if="emailShow">
              <Transfer :data="userData" :target-keys="userEmailTargetKeys" :filter-method="filterMethodUserEmail" @on-change="handleChangeUserEmail"></Transfer>
            </FormItem>
          </Form>
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
  import { alarmModeList, saveAlarmMode, deleteAlarmMode } from '@/service/alarmService/alarmMode';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyTable from '@/components/common/table/table.vue';
  import { templateList } from '@/service/baseInfo/template';
  export default {
    components: {
      HyDetail,
      HyFormItem,
      HyTable
    },
    mixins: [list, dictionary, button],
    data () {
      let checkSms = (rule, value, callback) => {
        if (this.msgShow && !value) {
          callback(new Error('发送短信模板不能为空'));
        } else {
          callback();
        }
      };
      let checkEmail = (rule, value, callback) => {
        if (this.emailShow && !value) {
          callback(new Error('发送邮件模板不能为空'));
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
        modalDetailItem: [],
        smsList: [],
        emailList: [],
        rule: [],
        ruleValidate: {
          type: [
            {required: true, type: 'number', message: '报警类型不能为空', trigger: 'change'}
          ],
          level: [
            {required: true, message: '报警等级不能为空', trigger: 'change'}
          ],
          mode: [
            {required: true, type: 'array', message: '报警方式不能为空', trigger: 'change'}
          ],
          smsTemplateId: [
            {validator: checkSms, trigger: 'change'}
          ],
          emailTemplateId: [
            {validator: checkEmail, trigger: 'change'}
          ]
        },
        detailModalShow: false,
        // 查询条件
        searchData: {},
        searchDataCus: {},
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '报警类型',
            key: '',
            render: (h, params) => {
              if (params.row['gbLevel']) {
                return h('p', null, '国标报警');
              } else if (params.row['dbLevel']) {
                return h('p', null, '地标报警');
              } else if (params.row['selfLevel']) {
                return h('p', null, '自有故障报警');
              }
            }
          },
          {
            title: '报警等级',
            key: '',
            render: (h, params) => {
              if (params.row['gbLevel']) {
                params.row.level = params.row['gbLevel'];
              } else if (params.row['dbLevel']) {
                params.row.level = params.row['dbLevel'];
              } else if (params.row['selfLevel']) {
                params.row.level = params.row['selfLevel'];
              }
              return this.__filters.alarmLevel(h, params, 'level');
            }
          },
          {
            title: '报警方式',
            key: 'warnType',
            render: (h, params) => {
              // 2进制
              params.row.alarmType = params.row['warnType'].toString(2);
              return this.__filters.alarmMode(h, params, 'alarmType');
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
            key: 'action',
            width: 160,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', {
                style: {textAlign: 'center', paddingLeft: '14px'}
              }, [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('方式修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('方式删除') ? this._hyTool.createIcon(h, params, this.deletes, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null
              ]);
            }
          }
        ],
        typeArray: [{value: 1, label: '国标报警'}, {value: 2, label: '地标报警'}, {value: 3, label: '自有故障报警'}],
        levelArray: [{value: 1, label: '一级'}, {value: 2, label: '二级'}, {value: 3, label: '三级'}, {value: 4, label: '四级'}],
        selectArray: [{value: 1, label: '一级'}, {value: 2, label: '二级'}, {value: 3, label: '三级'}, {value: 4, label: '四级'}],
        modeArray: [{value: 1, label: '声音'}, {value: 2, label: '弹框'}, {value: 4, label: '短信'}, {value: 8, label: '邮件'}],
        roleData: [],
        userData: [],
        roleMsgTargetKeys: [],
        userMsgTargetKeys: [],
        roleEmailTargetKeys: [],
        userEmailTargetKeys: [],
        msgShow: false,
        emailShow: false,
        mode: [],
        tipShow: false,        // 组织提示语
        tipShow1: false,        // 组织提示语
        tipShow2: false,        // 组织提示语
        tipShow3: false,        // 组织提示语
        tipShow4: false,        // 组织提示语
        originalData: {}            // 新增，修改的原始数据
      };
    },
    created () {
      this.getSelectRole();
      this.getSelectUser(10000);
    },
    mounted () {
      this.getTemplate();
    },
    methods: {
      _getList (page, flag) {
        this.clearSelecttion();
        this.searchData.type = this.searchDataCus.type;
        this.searchData.gbLevel = null;
        this.searchData.dbLevel = null;
        this.searchData.selfLevel = null;
        if (this.searchDataCus.level) {
          if (!this.searchDataCus.type) {
            this.searchData.gbLevel = this.searchDataCus.level;
            this.searchData.dbLevel = this.searchDataCus.level;
            this.searchData.selfLevel = this.searchDataCus.level;
          } else {
            if (this.searchDataCus.type === 1) this.searchData.gbLevel = this.searchDataCus.level;
            if (this.searchDataCus.type === 2) this.searchData.dbLevel = this.searchDataCus.level;
            if (this.searchDataCus.type === 3) this.searchData.selfLevel = this.searchDataCus.level;
          }
        }
        this.searchData.warnType = this.searchDataCus.mode;
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        alarmModeList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询报警方式设置列表失败',
            desc: ret
          });
        });
      },
      operData () {
        if (this.modalFormData.gbLevel) {
          this.modalFormData.type = 1;
          this.modalFormData.level = this.modalFormData.gbLevel + '';
        } else if (this.modalFormData.dbLevel) {
          this.modalFormData.type = 2;
          this.modalFormData.level = this.modalFormData.dbLevel + '';
        } else if (this.modalFormData.selfLevel) {
          this.modalFormData.type = 3;
          // this.$set(this.modalFormData, 'level', this.modalFormData.selfLevel);
          setTimeout(() => {
            this.modalFormData.level = this.modalFormData.selfLevel + '';
          }, 100);
        }
        this.mode = this.alarmMode(this.modalFormData.warnType, 'num');
        if (this.mode.find(value => value === 4)) {
          this.msgShow = true;
          this.modalFormData.roleMsgTargetKeys = [];
          this.modalFormData.msgRoleBeanSet.forEach(value => {
            this.roleMsgTargetKeys.push(value.id);
          });
          this.modalFormData.userMsgTargetKeys = [];
          this.modalFormData.msgUserBeanSet.forEach(value => {
            this.userMsgTargetKeys.push(value.id);
          });
        }
        if (this.mode.find(value => value === 8)) {
          this.emailShow = true;
          this.modalFormData.roleEmailTargetKeys = [];
          this.modalFormData.emailRoleBeanSet.forEach(value => {
            this.roleEmailTargetKeys.push(value.id);
          });
          this.modalFormData.userEmailTargetKeys = [];
          this.modalFormData.emailUserBeanSet.forEach(value => {
            this.userEmailTargetKeys.push(value.id);
          });
        }
        // console.log(JSON.stringify(this.modalFormData));
      },
      // 点击新增、修改
      addOrUpdate (row) {
        this.tipShow = false; // 提示
        this.tipShow1 = false; // 提示
        this.tipShow2 = false; // 提示
        this.tipShow3 = false; // 提示
        this.tipShow4 = false; // 提示
        // this.$refs.form.resetFields();
        this.roleData = this._hyTool.extend([], this.selectRoleArray);
        this.userData = this._hyTool.extend([], this.selectUserArray);
        this.roleData.forEach(value => {
          value.disabled = false;
        });
        this.userData.forEach(value => {
          value.disabled = false;
        });
        // checkbox
        this.mode = [];
        // transfer
        this.roleMsgTargetKeys = [];
        this.userMsgTargetKeys = [];
        this.roleEmailTargetKeys = [];
        this.userEmailTargetKeys = [];
        this.msgShow = false;
        this.emailShow = false;
        // original
        this.formLoading = false;
        this.originalData = {};
        this.originalData = this._hyTool.extend({}, row);
        if (row) {
          this.modalFormData = {
            type: '',
            level: '',
            warnType: '',
            smsTemplateId: ''
          };
          this.mode = [];
          // this.$refs.form.resetFields();
          this.modalTitle = '修改';
          this.modalFormData = this._hyTool.extend({}, row);
          // 刷新穿梭框
          setTimeout(() => {
            this.operData();
            setTimeout(() => {
              this.modalFormShow = true;
            }, 500);
          }, 100);
          // console.log(JSON.stringify(this.modalFormData));
        } else {
          this.$refs.form.resetFields();
          this.modalTitle = '新增';
          this.modalFormData = {
            type: '',
            level: '',
            warnType: '',
            smsTemplateId: ''
          };
          this.modalFormShow = true;
        }
      },
      // 解析提示方式
      alarmMode (data, flag) {
        let arrayNum = [];
        let arrayStr = [];
        let value = data.toString(2);
        if (Number(value[value.length - 1]) === 1) {
          arrayNum.push(1);
          arrayStr.push('声音');
        }
        if (Number(value[value.length - 2]) === 1) {
          arrayNum.push(2);
          arrayStr.push('弹框');
        }
        if (Number(value[value.length - 3]) === 1) {
          arrayNum.push(4);
          arrayStr.push('短信');
        }
        if (Number(value[value.length - 4]) === 1) {
          arrayNum.push(8);
          arrayStr.push('邮件');
        }
        if (flag === 'num') {
          return arrayNum;
        } else {
          return arrayStr;
        }
      },
      // 提交新增修改
      addOrUpdateSubmit (name) {
        this.$refs[name].validate((valid) => {
          // console.log(JSON.stringify(this.mode));
          if (this.mode.length === 0) {
            this.tipShow = true; // 提示
          }
          // if (this.roleMsgTargetKeys.length === 0 && this._hyTool.oneOf(4, this.mode)) this.tipShow1 = true;
          if (this.roleMsgTargetKeys.length === 0 && this.userMsgTargetKeys.length === 0 && this._hyTool.oneOf(4, this.mode)) this.tipShow2 = true;
          // if (this.roleEmailTargetKeys.length === 0 && this._hyTool.oneOf(8, this.mode)) this.tipShow3 = true;
          if (this.roleEmailTargetKeys.length === 0 && this.userEmailTargetKeys.length === 0 && this._hyTool.oneOf(8, this.mode)) this.tipShow4 = true;
          // console.log(this.tipShow, this.tipShow1, this.tipShow2, this.tipShow3, this.tipShow4);
          if (this.tipShow || this.tipShow1 || this.tipShow2 || this.tipShow3 || this.tipShow4) return;
          if (valid) {
            this.formLoading = true;
            let modalFormData = {};
//            console.log(JSON.stringify(this.modalFormData));
            if (this.modalFormData.type === 1) {
              modalFormData.gbLevel = this.modalFormData.level;
              modalFormData.dbLevel = null;
              modalFormData.selfLevel = null;
            } else if (this.modalFormData.type === 2) {
              modalFormData.gbLevel = null;
              modalFormData.dbLevel = this.modalFormData.level;
              modalFormData.selfLevel = null;
            } else if (this.modalFormData.type === 3) {
              modalFormData.gbLevel = null;
              modalFormData.dbLevel = null;
              modalFormData.selfLevel = this.modalFormData.level;
            }
            modalFormData.warnType = 0;
            this.mode.forEach(value => {
              modalFormData.warnType = modalFormData.warnType + value;
            });
            if (this.msgShow) {
              modalFormData.smsTemplateId = this.modalFormData.smsTemplateId;
              modalFormData.msgRoleBeanSet = [];
              this.roleMsgTargetKeys.forEach(value => {
                modalFormData.msgRoleBeanSet.push({id: value});
              });
              modalFormData.msgUserBeanSet = [];
              this.userMsgTargetKeys.forEach(value => {
                modalFormData.msgUserBeanSet.push({id: value});
              });
            }
            if (this.emailShow) {
              modalFormData.emailTemplateId = this.modalFormData.emailTemplateId;
              modalFormData.emailRoleBeanSet = [];
              this.roleEmailTargetKeys.forEach(value => {
                modalFormData.emailRoleBeanSet.push({id: value});
              });
              modalFormData.emailUserBeanSet = [];
              this.userEmailTargetKeys.forEach(value => {
                modalFormData.emailUserBeanSet.push({id: value});
              });
            }
            if (this.modalFormData.id) modalFormData.id = this.modalFormData.id;
//            console.log(JSON.stringify(modalFormData));
            saveAlarmMode({}, modalFormData, res => {
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
      checkAllGroupChange (data) {
//        console.log(JSON.stringify('2>' + this.mode));
        //       console.log(JSON.stringify('3>' + data));
        if (data.find(val => val === 4)) {
          this.msgShow = true;
        } else {
          this.msgShow = false;
          this.tipShow2 = false;
        }
        if (data.find(val => val === 8)) {
          this.emailShow = true;
        } else {
          this.emailShow = false;
          this.tipShow4 = false;
        }
        if (data.length === 0) this.tipShow = true; // 提示
        else this.tipShow = false; // 提示
      },
      filterMethodRoleMsg (data, query) {
        // console.log(data, query);
        return data.label.indexOf(query) > -1;
      },
      // 发送短信角色
      handleChangeRoleMsg (newTargetKeys) {
        this.roleMsgTargetKeys = newTargetKeys;
        // console.log(this.roleMsgTargetKeys.length, this.userMsgTargetKeys.length);
        if (this.roleMsgTargetKeys.length !== 0 || this.userMsgTargetKeys.length !== 0) this.tipShow2 = false;
        else this.tipShow2 = true;
      },
      filterMethodUserMsg (data, query) {
        return data.label.indexOf(query) > -1;
      },
      // 发送短信用户
      handleChangeUserMsg (newTargetKeys) {
        this.userMsgTargetKeys = newTargetKeys;
        // console.log(this.roleMsgTargetKeys.length, this.userMsgTargetKeys.length);
        if (this.roleMsgTargetKeys.length !== 0 || this.userMsgTargetKeys.length !== 0) this.tipShow2 = false;
        else this.tipShow2 = true;
      },
      filterMethodRoleEmail (data, query) {
        return data.label.indexOf(query) > -1;
      },
      // 发送邮件角色
      handleChangeRoleEmail (newTargetKeys) {
        this.roleEmailTargetKeys = newTargetKeys;
        if (this.roleEmailTargetKeys.length !== 0 || this.userEmailTargetKeys.length !== 0) this.tipShow4 = false;
        else this.tipShow4 = true;
      },
      filterMethodUserEmail (data, query) {
        return data.label.indexOf(query) > -1;
      },
      // 发送邮件用户
      handleChangeUserEmail (newTargetKeys) {
        this.userEmailTargetKeys = newTargetKeys;
        if (this.roleEmailTargetKeys.length !== 0 || this.userEmailTargetKeys.length !== 0) this.tipShow4 = false;
        else this.tipShow4 = true;
      },
      detail (row) {
        this.roleMsgTargetKeys = [];
        this.userMsgTargetKeys = [];
        this.roleEmailTargetKeys = [];
        this.userEmailTargetKeys = [];
        this.msgShow = false;
        this.emailShow = false;
        this.roleData = this._hyTool.extend([], this.selectRoleArray);
        this.userData = this._hyTool.extend([], this.selectUserArray);
        this.roleData.forEach(value => {
          value.disabled = true;
        });
        this.userData.forEach(value => {
          value.disabled = true;
        });
        this.modalFormData = this._hyTool.extend({}, row);
        this.modalFormData.createTime = this._hyTool.DateFormat(new Date(+this.modalFormData.createTime), 'yyyy-MM-dd hh:mm:ss');
        this.modalFormData.updateTime = this._hyTool.DateFormat(new Date(+this.modalFormData.updateTime), 'yyyy-MM-dd hh:mm:ss');
        this.mode = [];
        this.operData();
        this.modalFormData.modeName = this.alarmMode(this.modalFormData.warnType, 'name').join('，');
        this.modalDetailItem = [
          {
            key: 'type',
            title: '报警类型',
            type: 'select',
            array: this.typeArray
          },
          {
            key: 'level',
            title: '报警等级',
            type: 'select',
            array: this.levelArray
          },
          {
            key: 'modeName',
            title: '报警方式'
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
          deleteAlarmMode({ids: this.selectId.join(',')}, null, res => {
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
      cancel () {
        if (this.modalTitle === '新增') {
          this.$refs.form.resetFields();
          this.tipShow = false;
          this.roleMsgTargetKeys = [];
          this.userMsgTargetKeys = [];
          this.roleEmailTargetKeys = [];
          this.userEmailTargetKeys = [];
          this.msgShow = false;
          this.emailShow = false;
          this.mode = [];
        } else if (this.modalTitle === '修改') {
          this.$refs.form.resetFields();
          this.tipShow = false;
          this.roleMsgTargetKeys = [];
          this.userMsgTargetKeys = [];
          this.roleEmailTargetKeys = [];
          this.userEmailTargetKeys = [];
          this.msgShow = false;
          this.emailShow = false;
          this.modalFormData = this._hyTool.extend({}, this.originalData);
          this.mode = [];
          // 刷新穿梭框
          setTimeout(() => {
            this.operData();
          }, 100);
        }
      },
      checkType (row) {
        // if (row === 3) {
        //   this.levelArray = [{value: 1, label: '一级'}, {value: 2, label: '二级'}, {value: 3, label: '三级'}, {value: 4, label: '四级'}];
        // } else {
        //   this.levelArray = [{value: 1, label: '一级'}, {value: 2, label: '二级'}, {value: 3, label: '三级'}];
        // }
      },
      checkSelect (row) {
        if (row === 3) {
          this.selectArray = [{value: 1, label: '一级'}, {value: 2, label: '二级'}, {value: 3, label: '三级'}, {value: 4, label: '四级'}];
        } else if (row === 1 || row === 2) {
          this.selectArray = [{value: 1, label: '一级'}, {value: 2, label: '二级'}, {value: 3, label: '三级'}];
        } else {
          this.selectArray = [{value: 1, label: '一级'}, {value: 2, label: '二级'}, {value: 3, label: '三级'}, {value: 4, label: '四级'}];
        }
      },
      getTemplate () {
        templateList({}, res => {
          if (res.length > 0) {
            for (let item of res) {
              if (item.informationType === 1) {
                this.smsList.push(item);
              } else {
                this.emailList.push(item);
              }
            }
          }
        });
      }
    }
  };
</script>
