<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-bar">
      </div>
      <Tabs >
        <TabPane label="个人信息">
          <div class="hy-search-bar2">
          </div>
          <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="90" style="width: 500px">
            <FormItem label="用户名" prop="userName">
              <i-input v-model="modalFormData.userName" placeholder="" :maxlength="16" :disabled="true"></i-input>
            </FormItem>
            <FormItem label="原密码" prop="oldPassword">
              <i-input type="password" v-model="modalFormData.oldPassword"  :maxlength="16" placeholder="请输入原密码"></i-input>
            </FormItem>
            <FormItem label="新密码" prop="passwordA">
              <i-input type="password" v-model="modalFormData.passwordA"  :maxlength="16" placeholder="数字、字母且必须包含大小写字母(8-16位)"></i-input>
            </FormItem>
            <FormItem label="确认新密码" prop="confirmPassword">
              <i-input type="password" v-model="modalFormData.confirmPassword" :maxlength="16" placeholder="数字、字母且必须包含大小写字母(8-16位)"></i-input>
            </FormItem>
            <FormItem label="性别" prop="gender">
              <RadioGroup v-model="modalFormData.gender">
                <template v-for="item in genderArray">
                  <Radio :label="item.value">{{item.label}}</Radio>
                </template>
              </RadioGroup>
            </FormItem>
            <FormItem label="真实姓名" prop="realName">
              <i-input v-model="modalFormData.realName" placeholder="由中文组成(1-16位)" :maxlength="16"></i-input>
            </FormItem>
            <FormItem label="手机号" prop="phoneNumber">
              <i-input v-model="modalFormData.phoneNumber" placeholder="由11位数字组成"></i-input>
            </FormItem>
            <FormItem label="邮箱" prop="email">
              <i-input v-model="modalFormData.email" placeholder="由数字、字母组成"></i-input>
            </FormItem>
            <div style="padding-left: 376px;">
              <Button type="primary"  @click="updateSubmit">提交</Button>
              <Button type="ghost" style="margin-left: 8px" @click="cancel">重置</Button>
            </div>
          </Form>
        </TabPane>
        <TabPane label="操作日志" @click="_getList(1)">
          <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
            <Form label-position="right" inline :label-width="10">
              <FormItem label="" >
                <i-select placeholder="操作模块" v-model="searchData.whatModule" clearable filterable  :loading="load" style="width:200px;">
                  <Option v-for="(item, index) in whatModuleList" :value="item" :key="index" :label="item">
                    {{ item }}
                </Option>
                </i-select>
              </FormItem>
              <!--<FormItem label="">
                <i-select placeholder="操作类型" filterable clearable v-model="searchData.opType">
                  <i-option v-for="item in opTypeArray" :value="item.value" :key="item.value">{{ item.label }}</i-option>
                </i-select>
              </FormItem>-->
              <FormItem label="" >
                <i-select placeholder="操作类型" v-model="searchData.whatMethod" clearable filterable  style="width:200px;" >
                  <Option v-for="item in operatType" :value="item.label" :key="item.label">{{item.value | translate}}</Option>
                </i-select>
              </FormItem>
              <FormItem label="">
                <DatePicker type="datetimerange" placement="bottom-start" placeholder="选择日期和时间"
                            style="width: 300px" v-model="createTimeRange" :options="disabledDate"></DatePicker>
              </FormItem>
              <i-button type="primary" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                        class="search">查询
           </i-button>
            </Form>
          </div>
          <!--table部分-->
          <hy-table :column-type="columnType" :columnsTitle="recordColumnsTitle" :list="list" :on-selection-change="handleSelectionChange"
                    :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
          </hy-table>
          <!-- 分页 -->
          <hy-page
            :current-page="searchData.pageNum"
            :total-element="totalElement"
            :total-page="totalPage"
            @current-change="_getList"></hy-page>
        </TabPane>
      </Tabs>
      <!--详情-->
      <Modal v-model="detailShow" :mask-closable="false" width="770">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left">
          <hy-detail :form="modalFormData" :rowData="modalDetailItem" v-if="detailShow"></hy-detail>
          <hy-table :column-type="columnType" :columnsTitle="hyTitle" :list="listItem" :on-selection-change="handleSelectionChange"
                    :show-checkbox="false" :multiple-selection="multipleSelection" >
          </hy-table>
        </div>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="detailShow = false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import date from '@/js/mixins/date';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { oneselfUpdate, oneself, getPublicKey, updatePassword } from '@/service/userService/user';
  import { operatingLog } from '@/service/logService/operatingLog';
  import HyTable from '@/components/common/table/table.vue';
  import { queryParam } from '@/service/logService/queryParam';
  import HyDetail from '@/components/common/detail/detail.vue';

  export default {
    components: {
      HyFormItem,
      HyTable,
      HyDetail
    },
    mixins: [list, date],
    data () {
      return {
        operatType: [
        ],
        loading: false,
        load: false,
        hyTitle: [],
        listItem: [],
        whatModuleList: [],
        modalFormData: {},           // 个人信息
        detailShow: false,
        genderArray: [{value: 1, label: '男'}, {value: 2, label: '女'}],
        modalFormItem: [
          {
            key: 'userName',
            title: '账号',
            property: {
              disabled: true
            }
          },
          {
            key: 'passwordA',
            title: '密码',
            type: 'password'
          },
          {
            key: 'confirmPassword',
            title: '确认密码',
            type: 'password'
          },
          {
            key: 'gender',
            title: '性别',
            type: 'radio',
            array: [{value: 1, label: '男'}, {value: 2, label: '女'}]
          },
          {
            key: 'realName',
            title: '真实姓名'
          },
          {
            key: 'phoneNumber',
            title: '手机号'
          },
          {
            key: 'email',
            title: '邮箱'
          }
        ],           // 个人信息配置项
        ruleValidate: {
          oldPassword: [
            {pattern: '^\\S{0,16}$', message: '原密码为0-16位', trigger: 'change'}
          ],
          passwordA: {pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$', message: '密码为8-16位数字和字母的组合，且必须包含大小写字母', trigger: 'change'},
          confirmPassword: [
            {validator: (rule, val, callback) => {
              if (this.modalFormData.passwordA !== val) {
                callback('两次输入的密码不一致');
              } else {
                callback();
              }
            }}
          ],
          gender: [
            {required: true}
          ],
          realName: [
            {required: true, message: '真实姓名不能为空', trigger: 'change'},
            {pattern: '^[\\u4e00-\\u9fa5]{1,16}$', message: '真实姓名为1-16个中文字', trigger: 'change'}
          ],
          phoneNumber: [
            {required: true, message: '手机号不能为空', trigger: 'change'},
            {pattern: '^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\\d{8}$', message: '手机号格式不正确', trigger: 'change'}
          ],
          email: [
            {required: true, message: '邮件不能为空', trigger: 'change'},
            {pattern: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2})$', message: '邮箱格式不正确', trigger: 'change'}
          ]
        },            // 验证
        modalBtnLoading: false,
        columnType: 'index',
        recordColumnsTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '操作模块',
            key: 'whatModule'
          },
          {
            title: '操作类型',
            key: 'whatMethod',
            render: (h, params) => {
              return this.__filters.translate(h, params, 'whatMethod');
            }
          },
          {
            title: '用户名',
            key: 'userName'
          },
          {
            title: '姓名',
            key: 'realName'
          },
          {
            title: '操作时间',
            key: 'recordTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'recordTime');
            }
          },
          {
            title: '操作IP',
            key: 'ip'
          }
        ],
        columnsAuthTitle: [
          {
            title: '字段',
            key: 'field'
          },
          {
            title: '值',
            key: 'newValue'
          }
        ],
        columnsDeleteTitle: [
          {
            title: '字段',
            key: 'field'
          },
          {
            title: '值',
            key: 'oldValue'
          }
        ],
        columnsUpdateTitle: [
          {
            title: '字段',
            key: 'field'
          },
          {
            title: '旧值',
            key: 'oldValue'
          },
          {
            title: '新值',
            key: 'newValue'
          }
        ],
        columnsExportTitle: [
          {
            title: '导出条件',
            key: 'field'
          },
          {
            title: '值',
            key: 'oldValue'
          }
        ],
        // 查询条件
        searchData: {},
        paramList: {},  // 存储所有联动数据
        createTimeRange: [],
        modelShow: false,
        btnLoading: false
      };
    },
    mounted () {
      let _this = this;
      _this._getSetting();
    },
    watch: {                // 监听模块的变化
      searchData: {
        handler (curVal) {
          if (curVal.whatModule === '') {
              delete curVal.whatMethod;
              this.operatType = [];
            } else {
                for (let key in this.paramList) {
                if (key === curVal.whatModule) {
                  const valueList = this.paramList[key].map(item => {
                    return {
                      value: item,
                      label: item
                    };
                  });
                  this.operatType = valueList;
                }
              }
            }
        },
        deep: true
      }
    },
    methods: {
      _getSetting () {
        oneself({}, res => {
          this.modalFormData = res;
        }, ret => {
          this.$Notice.error({
            title: '查询当前用户失败',
            desc: ret
          });
        });
      },
      _getList (page, flag) {
        this.clearSelecttion();
        let loginInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
        this.searchData.userName = loginInfo.userName;
        if (this.createTimeRange[0] !== undefined && this.createTimeRange[0] !== null && this.createTimeRange[0] !== '') {
          this.searchData.beginTime = this._hyTool.DateFormat(new Date(+this.createTimeRange[0]), 'yyyy-MM-dd hh:mm:ss');
          this.searchData.endTime = this._hyTool.DateFormat(new Date(+this.createTimeRange[1]), 'yyyy-MM-dd hh:mm:ss');
        } else {
          this.searchData.beginTime = undefined;
          this.searchData.endTime = undefined;
        }
        if (this.searchData.beginTime && this.searchData.endTime) {
          let bol = this.checkDate(new Date(this.searchData.beginTime).getTime(), new Date(this.searchData.endTime).getTime(), 7);
          if (!bol) {
            this.$Notice.error({
              title: '',
              desc: '开始时间与结束时间间隔不能超过7天'
            });
            return;
          }
        }
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        operatingLog(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询操作记录列表失败',
            desc: ret
          });
        });
        this.getWhatModule();
      },
      detail (row) {
        this.modalFormData = this._hyTool.deepCopy(row);
        this.listItem = row.data;
        this.listItem.forEach(val => {
          if (val.field === 'UpdateTime' || val.field === 'CreateTime') val.newValue = this._hyTool.DateFormat(new Date(+val.newValue), 'yyyy-MM-dd hh:mm:ss');
        });
        let item = row.whatMethod;
        if (item === 'update') {
          this.hyTitle = this.columnsUpdateTitle;
        } else if (item === 'insert') {
          this.hyTitle = this.columnsAuthTitle;
        } else if (item === 'export' || 'print') {
          this.hyTitle = this.columnsExportTitle;
        } else if (item === 'delete') {
          this.hyTitle = this.columnsDeleteTitle;
        }
        this.modalDetailItem = [
          {
            title: '新增数据表',
            key: ''
          }
        ];
        this.detailShow = true;
      },
      // 获取操作模块
      getWhatModule (query) {
        if (query !== '') {
          this.load = true;
          queryParam(null, res => {
            let keys = [];
            for (let key in res) {
              if (res.hasOwnProperty(key) === true) {
                keys.push(key);
              }
            }
            this.whatModuleList = keys;
            this.load = false;
            this.paramList = res;
          }, ret => {
            this.whatModuleList = [];
          });
        }
      },
      updateSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确定修改个人信息吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.modalFormData.passwordA) {
                getPublicKey(null, res => {
                  let jse = new this.$jsEncrypt.JSEncrypt();
                  jse.setPublicKey(res);
                  let oldPassword = jse.encrypt(this.modalFormData.oldPassword);
                  let newPassword = jse.encrypt(this.modalFormData.passwordA);
                  delete this.modalFormData.oldPassword;
                  delete this.modalFormData.passwordA;
                  delete this.modalFormData.confirmPassword;
                  let params = {
                    userId: this.modalFormData.id,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                  };
                  updatePassword(params, res => {
                    this.updateUser(true);
                  }, ret => {
                    this.formLoading = false;
                    // 清空密码
                    this.$set(this.modalFormData, 'oldPassword', null);
                    this.$set(this.modalFormData, 'passwordA', null);
                    this.$set(this.modalFormData, 'confirmPassword', null);
                    this.$Notice.error({
                      title: '修改个人密码失败',
                      desc: ret
                    });
                  });
                }, ret => {
                  this.btnLoading = false;
                  this.$Notice.error({
                    title: '获取公钥失败',
                    desc: ret
                  });
                });
              } else {
                delete this.modalFormData.oldPassword;
                this.updateUser();
              }
            }).catch(() => {
            });
          } else {
            this.btnLoading = false;
          }
        });
      },
      updateUser (flag) {
        oneselfUpdate(null, this.modalFormData, res => {
          this.btnLoading = false;
          this.modelShow = false;
          this.$Notice.success({
            title: '修改成功'
          });
          this._getSetting();
        }, ret => {
          this.btnLoading = false;
          this.$Notice.error({
            title: '修改个人信息失败',
            desc: ret
          });
        });
      },
      // 取消按钮，回复初始值
      cancel () {
        this.$refs.form.resetFields();
        this._getSetting();
      }
    }
  };
</script>
