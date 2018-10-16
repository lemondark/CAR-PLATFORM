/**
* 作者：szh
* 时间：2018-01-08
* 描述：直接报警参数
**/
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10" class="clear">
          <FormItem label="" >
            <i-select placeholder="部件编码" v-model="searchData.componentCode" filterable clearable>
              <i-option value="BMS">BMS</i-option>
              <i-option value="HAVC">HAVC</i-option>
              <i-option value="MC">MC</i-option>
              <i-option value="EPS">EPS</i-option>
              <i-option value="VMS">VMS</i-option>
              <i-option value="ICU">ICU</i-option>
            </i-select>
          </FormItem>
          <FormItem>
            <i-input placeholder="报警编码" v-model.trim="searchData.alarmCode" clearable style="width:200px;"></i-input>
          </FormItem>
          <FormItem>
            <i-input placeholder="报警内容" v-model.trim="searchData.alarmContent" clearable style="width:200px;"></i-input>
          </FormItem>
          <FormItem>
            <i-select placeholder="国标故障等级" v-model="searchData.gbLevel" clearable filterable style="width:200px;" :key="2">
              <Option v-for="item in level" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <FormItem>
            <i-select placeholder="地标故障等级" v-model="searchData.dbLevel" clearable filterable style="width:200px;" :key="3">
              <Option v-for="item in level" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <FormItem>
            <i-select placeholder="自有故障等级" v-model="searchData.selfLevel" clearable filterable :key="4">
              <Option v-for="item in zyLevel" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
          <!--工具条部分-->
          <!-- 添加功能 -->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('直参新增')">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#4784FF' size='22' @click="addOrUpdate()">添加</hy-icon>

            <!--&lt;!&ndash;<Button type="ghost" class="hy-search-button" :class="delClasses" shape="circle" @click="deleteArea()">删除</Button>&ndash;&gt;-->
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
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd" :styles="{top: '15px'}">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95">
            <FormItem label="部件编码" prop="componentCode">
              <i-select placeholder="部件编码" v-model="modalFormData.componentCode" filterable @on-change="changeAlarmCode">
                <i-option value="BMS">BMS</i-option>
                <i-option value="HAVC">HAVC</i-option>
                <i-option value="MC">MC</i-option>
                <i-option value="EPS">EPS</i-option>
                <i-option value="VMS">VMS</i-option>
                <i-option value="ICU">ICU</i-option>
              </i-select>
            </FormItem>
            <FormItem label="计算关系">
              <i-select v-model="modalFormData.fieldsRelation" placeholder="计算关系" clearable>
                <Option v-for="item in fieldsRelation" :value="item.value" :key="item.value" :label="item.label"></Option>
              </i-select>
            </FormItem>
            <FormItem label="字段编码" prop="fieldCode">
              <i-select v-model="modalFormData.fieldCode" placeholder="字段编码" filterable @on-change="changeFieldCode">
                <Option v-for="item in optionList" :value="item.value" :key="item.value" :label="item.value"></Option>
              </i-select>
            </FormItem>
            <FormItem label="字段编码1" prop="fieldCode1" v-if="modalFormData.fieldsRelation" required>
              <i-select v-model="modalFormData.fieldCode1" placeholder="字段编码1" filterable>
                <Option v-for="item in optionList" :value="item.value" :key="item.value" :label="item.value"></Option>
              </i-select>
            </FormItem>
            <FormItem label="报警编码" prop="alarmCode">
              <i-input v-model="modalFormData.alarmCode" placeholder="由数字、字母或_组合" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="字段名称" prop="fieldName">
              <i-input v-model="modalFormData.fieldName" placeholder="" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="字段名称1" prop="fieldName1" v-if="modalFormData.fieldsRelation" required>
              <i-input v-model="modalFormData.fieldName1" placeholder="" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="字段关系" prop="fieldRelation">
              <i-select placeholder="" v-model="modalFormData.fieldRelation" filterable>
                <Option v-for="item in relation" :value="item.value" :key="item.value" :label="item.label">
                  {{ item.label }}
                </Option>
              </i-select>
            </FormItem>
            <FormItem label="字段值" prop="fieldValue">
              <i-input v-model="modalFormData.fieldValue" placeholder="可带3位小数" :maxlength="8" clearable></i-input>
            </FormItem>
            <FormItem label="国标故障等级" prop="gbLevel">
              <i-select placeholder="" v-model="modalFormData.gbLevel" clearable filterable>
                <Option v-for="item in level" :value="item.value" :key="item.value" :label="item.label">
                  {{ item.label }}
                </Option>
              </i-select>
            </FormItem>
            <FormItem label="国标字段编码" prop="gbCode" v-if="modalFormData.gbLevel">
              <i-input v-model="modalFormData.gbCode" placeholder="由数字、字母或_组合" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="地标故障等级" prop="dbLevel">
              <i-select placeholder="" v-model="modalFormData.dbLevel" clearable filterable>
                <Option v-for="item in level" :value="item.value" :key="item.value" :label="item.label">
                  {{ item.label }}
                </Option>
              </i-select>
            </FormItem>
            <FormItem label="自有故障等级" prop="selfLevel">
              <i-select placeholder="" v-model="modalFormData.selfLevel" clearable filterable>
                <Option v-for="item in zyLevel" :value="item.value" :key="item.value" :label="item.label">
                  {{ item.label }}
                </Option>
              </i-select>
            </FormItem>
            <FormItem label="报警内容" prop="alarmContent">
              <i-input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="modalFormData.alarmContent" placeholder="" :maxlength="250" clearable></i-input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
        </div>
      </Modal>
      <!--详情-->
      <Modal v-model="detailShow" :mask-closable="false" width="770">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left">
          <hy-detail :form="modalFormData" :rowData="modalDetailItem" v-if="detailShow"></hy-detail>
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
  import button from '@/js/mixins/button';
  import HyTable from '@/components/common/table/table.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { dapList, dapSave, dapDelete } from '@/service/alarmService/directAlarmParams';
  import { mapState } from 'vuex';
  import { handles } from '@/js/libs/checkValue';

  let num = 1;
  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list, button],
    data () {
      let check = (rule, value, callback) => {
        if (!this.modalFormData.gbLevel && !this.modalFormData.dbLevel && !this.modalFormData.selfLevel) {
          num = 1;
          callback(new Error('请至少选择一项故障等级'));
        } else {
          if (num === 1) {
            num = 2;
            if (rule.field === 'gbLevel') {
              this.$refs.formAdd.validateField('dbLevel');
              this.$refs.formAdd.validateField('selfLevel');
            } else if (rule.field === 'dbLevel') {
              this.$refs.formAdd.validateField('gbLevel');
              this.$refs.formAdd.validateField('selfLevel');
            } else {
              this.$refs.formAdd.validateField('gbLevel');
              this.$refs.formAdd.validateField('dbLevel');
            }
          }
          callback();
        }
      };
      let checkValue = (rule, value, callback) => {
        if (this.modalFormData.fieldsRelation) {
          if (value) {
            callback();
          } else {
            if (rule.fullField === 'fieldName1') callback(new Error('请输入字段编码1'));
            else callback(new Error('请输入字段名称1'));
          }
        } else {
          callback();
        }
      };
      let gbCodeValue = (rule, value, callback) => {
        if (!value) {
          callback();
        } else {
          const valid = /^\w+$/;
         if (!valid.test(value)) {
            callback(new Error('国标字段编码格式不正确'));
          } else {
            callback();
          }
        }
      };
      return {
        searchData: {},
        modalAddFormShow: false,  // 新增修改
        modalTitle: '新增',
        modalFormData: {},
        formLoading: false,
        relation: [               // 字段关系
          {
            value: -2,
            label: '小于等于'
          },
          {
            value: -1,
            label: '小于'
          },
          {
            value: 0,
            label: '等于'
          },
          {
            value: 1,
            label: '大于'
          },
          {
            value: 2,
            label: '大于等于'
          }
        ],
        fieldsRelation: [
          {
            value: 1,
            label: '加'
          },
          {
            value: 2,
            label: '减'
          },
          {
            value: 3,
            label: '乘'
          },
          {
            value: 4,
            label: '除'
          }
        ],
        ruleValidate: {
          alarmCode: [
            {required: true, validator: handles.call(this, 'noChinese', '报警编码'), trigger: 'blur, change'}
          ],
          fieldCode: [
            {required: true, validator: handles.call(this, 'noChinese', '字段编码'), trigger: 'blur, change'}
          ],
          fieldCode1: {validator: checkValue, trigger: 'change'},
          fieldName: [
            {required: true, message: '请输入字段名称', trigger: 'blur, change'}
          ],
          fieldName1: [
            {validator: checkValue, trigger: 'change'}
          ],
          fieldValue: [
            {required: true, validator: handles.call(this, 'positivePointNumber', '字段值'), trigger: 'blur, change'}
          ],
          componentCode: [
            {required: true, message: '请选择部件编码', trigger: 'blur, change'}
          ],
          alarmContent: [
            {required: true, message: '请输入报警内容', trigger: 'blur, change'}
          ],
          gbLevel: [
            {validator: check, trigger: 'blur, change'}
          ],
          gbCode: [
            {validator: gbCodeValue, trigger: 'blur'}
          ],
          dbLevel: [
            {validator: check, trigger: 'blur, change'}
          ],
          selfLevel: [
            {validator: check, trigger: 'blur, change'}
          ]
        },
        loading: true,
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
            title: '报警编码',
            width: 250,
            key: 'alarmCode'
          },
          {
            title: '报警内容',
            width: 300,
            key: 'alarmContent'
          },
          {
            title: '字段编码',
            width: 240,
            key: 'fieldCode'
          },
          {
            title: '字段名称',
            width: 180,
            key: 'fieldName'
          },
          {
            title: '字段关系',
            width: 120,
            key: 'fieldRelation',
            render: (h, params) => {
              return this.__filters.fieldRelation(h, params, 'fieldRelation');
            }
          },
          {
            title: '字段值',
            width: 120,
            key: 'fieldValue'
          },
          {
            title: '部件编码',
            width: 120,
            key: 'componentCode'
          },
          {
            title: '国标故障等级',
            width: 180,
            key: 'gbLevel',
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, null, 'gbLevel')
              ]);
            }
          },
          {
            title: '地标故障等级',
            width: 120,
            key: 'dbLevel',
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, null, 'dbLevel')
              ]);
            }
          },
          {
            title: '自有故障等级',
            width: 120,
            key: 'selfLevel',
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, null, 'selfLevel')
              ]);
            }
          },
          {
            title: '操作',
            width: 180,
            fixed: 'right',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('直参修改') && params.row.status === 0 ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('直参删除') && params.row.status === 0 ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null,
                this.buttonShow('直参禁启用') && this._hyTool.createIcon(h, params, this.reversal, null, params.row.status === 0 ? {color: '#919191', type: 'jinyong', size: '20', content: '禁用', placement: 'top', showTransfer: true} : {color: '#69BB6B', type: 'qiyong', size: '20', content: '启用', placement: 'top', showTransfer: true}, null,
                  {marginRight: '5px', color: params.row.status === 0 ? 'red' : '#19be6b'})
              ]);
            }
          }
        ],
        detailShow: false,     // 详情弹框
        optionList: []
      };
    },
    computed: {
      ...mapState([
        'level',
        'zyLevel'
      ])
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
        dapList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询直接报警参数列表失败',
            desc: ret
          });
        });
      },
      // 添加、修改
      addOrUpdate (row) {
        this.modalFormData = {
          fieldRelation: -1,
          gbLevel: '',
          dbLevel: '',
          selfLevel: '',
          status: 0,
          fieldsRelation: ''
        };
        this.formLoading = false;
        num = 1;
        if (row) {
          this.modalTitle = '修改';
          this.reData = this._hyTool.extend({}, row);
          this.modalFormData = this._hyTool.deepCopy(row);
          if (!this.modalFormData.fieldsRelation) {
            delete this.modalFormData.fieldsRelation;
          }
          setTimeout(() => {
            this.modalFormData.alarmCode = row.alarmCode;
          }, 100);
        } else {
          this.$refs['formAdd'].resetFields();
          this.modalTitle = '新增';
        }
        this.modalAddFormShow = true;
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
//            this.modalFormData.alarmCode = this.modalFormData.componentCode + '_' + this.modalFormData.fieldCode;
            if (!this.modalFormData.gbLevel) this.modalFormData.gbCode = '';
            if (!this.modalFormData.fieldsRelation) {
              delete this.modalFormData.fieldCode1;
              delete this.modalFormData.fieldName1;
            } else {
              this.modalFormData.fieldsRelation = Number.parseInt(this.modalFormData.fieldsRelation);
            }
            dapSave({}, this.modalFormData, res => {
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
          setTimeout(() => {
            this.modalFormData.alarmCode = this.reData.alarmCode;
          }, 100);
        } else {
          this.$refs['formAdd'].resetFields();
          delete this.modalFormData.fieldsRelation;
        }
      },
      // 删除
      deleteById (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          dapDelete({ids: params.id}, res => {
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
      // 启用启用
      reversal (row) {
        let rowData = this._hyTool.extend({}, row);
        if (!rowData) return;
        let message = '';
        if (rowData.status === 0) {
          message = '禁用';
          rowData.status = 1;
        } else {
          message = '启用';
          rowData.status = 0;
        }
        this.$confirm('确定' + message + '？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          dapSave(null, rowData, res => {
            setTimeout(() => {
            this.$Notice.success({
              desc: `${message}成功`
            });
            }, 500);
            this._getList();
          }, ret => {
            this.formLoading = false;
            setTimeout(() => {
            this.$Notice.error({
              title: `${message}失败`,
              desc: ret
            });
            }, 500);
          });
        }).catch(() => {
        });
      },
      // 详情弹框
      detail (row) {
        this.modalDetailItem = [
          {
            title: '报警编码',
            key: 'alarmCode'
          },
          {
            title: '计算关系',
            key: 'fieldsRelation',
            array: [{value: 0, label: '无'}, {value: 1, label: '加'}, {value: 2, label: '减'}, {value: 3, label: '乘'}, {value: 4, label: '除'}]
          },
          {
            title: '部件编码',
            key: 'componentCode'
          },
          {
            title: '字段编码',
            key: 'fieldCode'
          },
          {
            title: '字段编码1',
            key: 'fieldCode1'
          },
          {
            title: '字段名称',
            key: 'fieldName'
          },
          {
            title: '字段名称1',
            key: 'fieldName1'
          },
          {
            title: '字段关系',
            key: 'fieldRelation',
            array: this.relation
          },
          {
            title: '字段值',
            key: 'fieldValue'
          },
          {
            title: '国标故障等级',
            key: 'gbLevel',
            array: this.level
          },
          {
            title: '国标字段编码',
            key: 'gbCode'
          },
          {
            title: '地标故障等级',
            key: 'dbLevel',
            array: this.level
          },
          {
            title: '自有故障等级',
            key: 'selfLevel',
            array: this.zyLevel
          },
          {
            title: '报警内容',
            key: 'alarmContent'
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
          }
        ];
        this.modalFormData = this._hyTool.deepCopy(row);
        this.modalFormData.createTime = this._hyTool.DateFormat(new Date(+this.modalFormData.createTime), 'yyyy-MM-dd hh:mm:ss');
        this.modalFormData.updateTime = this._hyTool.DateFormat(new Date(+this.modalFormData.updateTime), 'yyyy-MM-dd hh:mm:ss');
        this.detailShow = true;
      },
      changeType (row) {
        if (row === 1) {
          this.searchData.dbLevel = '';
          this.searchData.selfLevel = '';
        } else if (row === 2) {
          this.searchData.gbLevel = '';
          this.searchData.selfLevel = '';
        } else if (row === 3) {
          this.searchData.gbLevel = '';
          this.searchData.dbLevel = '';
        } else {
          this.searchData.gbLevel = '';
          this.searchData.dbLevel = '';
          this.searchData.selfLevel = '';
        }
      },
      // 部件编码
      changeAlarmCode (row) {
        if (row === 'BMS') {
          this.optionList = [
            {
              value: 'totalVoltage',
              label: '总电压'
            },
            {
              value: 'totalCurrent',
              label: '总电流'
            },
            {
              value: 'isChargerConnected',
              label: '外接充电线连接状态'
            },
            {
              value: 'cpSignal',
              label: 'CP信号'
            },
            {
              value: 'ksStatus',
              label: '总负接触器KS状态'
            },
            {
              value: 's2Status',
              label: '开关S2状态'
            },
            {
              value: 'chargerConnectStatus',
              label: '与充电机通讯状态'
            },
            {
              value: 'batteryBalanceStatus',
              label: '电池包均衡状态'
            },
            {
              value: 'coldFanStatus',
              label: '冷却风扇状态'
            },
            {
              value: 'soc',
              label: '电池组当前的SOC'
            },
            {
              value: 'batteryStatus',
              label: '电池组当前状态'
            },
            {
              value: 'errLevel',
              label: '故障等级'
            },
            {
              value: 'powerBatteryAlarm',
              label: '动力电池报警指示'
            },
            {
              value: 'descPowerLevel',
              label: '降功率等级'
            },
            {
              value: 'isInsuLowest',
              label: '绝缘超低'
            },
            {
              value: 'voltageHighest',
              label: '最高单体电压'
            },
            {
              value: 'highestVoltageNo',
              label: '最高单体电池号'
            },
            {
              value: 'voltageLowest',
              label: '最低单体电压'
            },
            {
              value: 'lowestVoltageNo',
              label: '最低单体电池号'
            },
            {
              value: 'tempHighest',
              label: '最高温度点温度'
            },
            {
              value: 'highestTempNo',
              label: '最高温度点电池号'
            },
            {
              value: 'voltages1',
              label: '1#-4#单体电池电压'
            },
            {
              value: 'voltages2',
              label: '5#-8#单体电池电压'
            },
            {
              value: 'voltages3',
              label: '9#-12#单体电池电压'
            },
            {
              value: 'voltages4',
              label: '13#-16#单体电池电压'
            },
            {
              value: 'voltages5',
              label: '17#-20#单体电池电压'
            },
            {
              value: 'voltages6',
              label: '21#-24#单体电池电压'
            },
            {
              value: 'voltages7',
              label: '25#-28#单体电池电压'
            },
            {
              value: 'voltages8',
              label: '29#-32#单体电池电压'
            },
            {
              value: 'voltages9',
              label: '33#-36#单体电池电压'
            },
            {
              value: 'voltages10',
              label: '37#-40#单体电池电压'
            },
            {
              value: 'voltages11',
              label: '41#-44#单体电池电压'
            },
            {
              value: 'voltages12',
              label: '45#-48#单体电池电压'
            },
            {
              value: 'volHighestCharging4',
              label: '单体电压超高-4级'
            },
            {
              value: 'sellVolHighestFbl3',
              label: '单体电压超高-回馈-3级'
            },
            {
              value: 'volHighest3',
              label: '单体电压超高-3级'
            },
            {
              value: 'totalVolHighestChargerl4',
              label: '总电压超高-4级'
            },
            {
              value: 'totalVolHighestFbl3',
              label: '总电压超高-回馈-3级'
            },
            {
              value: 'totalVolHighest3',
              label: '总电压超高-3级'
            },
            {
              value: 'sellVolLowerl1',
              label: '单体电压过低-1级降功率'
            },
            {
              value: 'sellVolLowerl2',
              label: '单体电压过低-2级降功率'
            },
            {
              value: 'sellVolLowerl3',
              label: '单体电压过低-3级降功率'
            },
            {
              value: 'totalVolLowerl1',
              label: '总电压过低-1级降功率'
            },
            {
              value: 'totalVolLowerl2',
              label: '总电压过低-2级降功率'
            },
            {
              value: 'totalVolLowerl3',
              label: '总电压过低-3级降功率'
            },
            {
              value: 'sellVolLowestl3',
              label: '单体电压超低-3级'
            },
            {
              value: 'volLowest4',
              label: '单体电压超低-4级'
            },
            {
              value: 'sellVolLowestCharger',
              label: '单体电压超低-充电'
            },
            {
              value: 'totalVolLowestl3',
              label: '总电压超低-3级'
            },
            {
              value: 'totalVolLowest4',
              label: '总电压超低-4级'
            },
            {
              value: 'totalVolLowestCharger',
              label: '总电压超低-充电'
            },
            {
              value: 'volPlusBiggerl1',
              label: '压差过大-1级降功率'
            },
            {
              value: 'volPlusBiggerl2',
              label: '压差过大-2级降功率'
            },
            {
              value: 'volPlusBigger3',
              label: '压差过大-3级降功率'
            },
            {
              value: 'socLowerl1',
              label: 'SOC过低-1级降功率'
            },
            {
              value: 'socLowerl2',
              label: 'SOC过低-2级降功率'
            },
            {
              value: 'socLower3',
              label: 'SOC过低-3级降功率'
            },
            {
              value: 'dischargerCurrentBiggerl1',
              label: '放电电流过大-1级降功率'
            },
            {
              value: 'dischargerCurrentBiggerl2',
              label: '放电电流过大-2级降功率'
            },
            {
              value: 'dischargerCurrentBiggerl3',
              label: '放电电流过大-3级降功率'
            },
            {
              value: 'dischargerCurrentBiggestl3',
              label: '放电电流超大-3级'
            },
            {
              value: 'chargerCurrentBiggestl3',
              label: '充电电流超大-3级'
            },
            {
              value: 'chargerCurrentBiggestl4',
              label: '充电电流超大-4级'
            },
            {
              value: 'feedbackCurrentBiggestl3',
              label: '回馈电流超大-3级'
            },
            {
              value: 'feedbackCurrentBiggestl4',
              label: '回馈电流超大-4级'
            },
            {
              value: 'tempratureHigherl1',
              label: '温度过高-1级降功率'
            },
            {
              value: 'tempratureHigherl2',
              label: '温度过高-2级降功率'
            },
            {
              value: 'tempratureHigherl3',
              label: '温度过高-3级降功率'
            },
            {
              value: 'tempratureHighestl3',
              label: '温度超高-3级'
            },
            {
              value: 'tempratureHighest4',
              label: '温度超高-4级'
            },
            {
              value: 'heatMoTempratureHighest',
              label: '加热膜温度超高'
            },
            {
              value: 'tempLowerl1',
              label: '温度过低-1级降功率'
            },
            {
              value: 'tempLowerl2',
              label: '温度过低-2级降功率'
            },
            {
              value: 'tempLowerl3',
              label: '温度过低-3级降功率'
            },
            {
              value: 'tempLowestl3',
              label: '温度超低-3级'
            },
            {
              value: 'tempPlusHigherl1',
              label: '温差过高-1级降功率'
            },
            {
              value: 'tempPlusHigherl2',
              label: '温差过高-2级降功率'
            },
            {
              value: 'tempPlusHigher3',
              label: '温差过高-3级降功率'
            },
            {
              value: 'tempRiseSpeedBiggerl2',
              label: '温升速率过高-2级降功率'
            },
            {
              value: 'tempRiseSpeedBiggestl4',
              label: '温升速率超高-4级'
            },
            {
              value: 'insuLowl1',
              label: '绝缘过低-1级'
            },
            {
              value: 'insuLowl2',
              label: '绝缘过低-2级降功率'
            },
            {
              value: 'insuLowl4',
              label: '绝缘超低-4级'
            },
            {
              value: 'chargeTimeLong',
              label: '充电时间超长'
            },
            {
              value: 'heatTimeLong',
              label: '加热时间超长'
            },
            {
              value: 'bmsSysErr',
              label: 'BMS系统故障'
            },
            {
              value: 'conChargerErr',
              label: '与充电机通讯故障'
            },
            {
              value: 'volDisconnectl4',
              label: '电压采集断开-4级'
            },
            {
              value: 'volDisconnectl2',
              label: '电压采集断开-2级降功率'
            },
            {
              value: 'tempDisconnectl4',
              label: '温度采集断开-4级'
            },
            {
              value: 'tempDisconnectl2',
              label: '温度采集断开-2级降功率'
            },
            {
              value: 'heatErr',
              label: '加热故障'
            },
            {
              value: 'negErrClose',
              label: '负极接触器故障：不能闭合'
            },
            {
              value: 'negErrPaste',
              label: '负极接触器故障：粘连'
            },
            {
              value: 'crashAlarm',
              label: '碰撞报警'
            },
            {
              value: 'vmsAlarmCmd',
              label: 'VMS报警指令'
            },
            {
              value: 'temps1',
              label: '1#-8#探头温度'
            },
            {
              value: 'temps2',
              label: '9#-12#探头温度'
            },
            {
              value: 'bmsErrCode',
              label: 'BMS故障码'
            },
            {
              value: 'packManufacturer',
              label: 'PACK厂家'
            },
            {
              value: 'bmsManufacturer',
              label: 'BMS厂家'
            },
            {
              value: 'battcellsManufacturer',
              label: '电芯厂家'
            },
            {
              value: 'battcellsType',
              label: '电芯类型'
            },
            {
              value: 'batterysupplierCode',
              label: '生产厂商代码'
            },
            {
              value: 'batterytypeCode',
              label: '车载储能装置类型代码'
            },
            {
              value: 'nominalEnergy',
              label: '额定能量'
            },
            {
              value: 'nominalVoltage',
              label: '额定电压'
            },
            {
              value: 'batteryProdate',
              label: '日期'
            },
            {
              value: 'batteryProsn',
              label: '流水号'
            },
            {
              value: 'batterycodeLength',
              label: '可充电储能系统编码长度'
            },
            {
              value: 'alowableVoltage',
              label: '最高允许充电端电压'
            },
            {
              value: 'alowableCurrent',
              label: '最高允许充电电流'
            },
            {
              value: 'loadType',
              label: '负载类型'
            },
            {
              value: 'heaterStatus',
              label: '加热继电器状态'
            },
            {
              value: 'chargeCount',
              label: '充电次数'
            },
            {
              value: 'dischargePower10s',
              label: '动力电池包10s最大放电功率'
            },
            {
              value: 'dischargePower30s',
              label: '动力电池包30s最大放电功率'
            },
            {
              value: 'dischargeMaxPower',
              label: '动力电池包持续最大放电功率'
            },
            {
              value: 'dischargeMaxCurrent',
              label: '动力电池包最大放电电流限值'
            },
            {
              value: 'chargePower10s',
              label: '动力电池包10s最大充电功率'
            },
            {
              value: 'chargePower30s',
              label: '动力电池包30s最大充电功率'
            },
            {
              value: 'chargeMaxPower',
              label: '动力电池包持续最大充电功率'
            },
            {
              value: 'chargeMaxCurrent',
              label: '动力电池包最大充电电流限值'
            },
            {
              value: 'chargerStatus',
              label: '充电状态'
            },
            {
              value: 'runStatus',
              label: '运行状态'
            },
            {
              value: 'insulationResistance',
              label: '绝缘电阻'
            },
            {
              value: 'tempLowest',
              label: '最低温度值'
            },
            {
              value: 'templowestSubsyscode',
              label: '最低温度探针子系统代号'
            },
            {
              value: 'voltageCount',
              label: '单体电池总数'
            },
            {
              value: 'batteryTempcount',
              label: '可充电储能温度探针个数'
            },
            {
              value: 'dcdcStatus',
              label: 'DC_DC状态'
            },
            {
              value: 'batteryDeviceVol',
              label: '可充电储能装置电压'
            },
            {
              value: 'socHigherAlarm',
              label: 'SOC过高报警'
            },
            {
              value: 'socJumpAlarm',
              label: 'SOC跳变报警'
            },
            {
              value: 'batterySysDismatch',
              label: '可充电储能系统不匹配报警'
            },
            {
              value: 'dcdcTempAlarm',
              label: 'DC_DC温度报警'
            },
            {
              value: 'dcdcStatusAlarm',
              label: 'DC_DC状态报警'
            }
          ];
        } else if (row === 'HAVC') {
          this.optionList = [
            {
              value: 'rtStatus',
              label: '空调启动状态'
            },
            {
              value: 'hvacLevel',
              label: '空调风机档位'
            },
            {
              value: 'power',
              label: '空调功率'
            },
            {
              value: 'outerTemp',
              label: '车外温度'
            },
            {
              value: 'innerTemp',
              label: '车内温度'
            },
            {
              value: 'windDir',
              label: '空调风向状态'
            },
            {
              value: 'loopMode',
              label: '空调循环模式状态'
            },
            {
              value: 'errModel',
              label: '模式电机故障'
            },
            {
              value: 'errTemp',
              label: '温度电机故障'
            },
            {
              value: 'errEvalSensor',
              label: '蒸发器传感器故障'
            },
            {
              value: 'errTempSensor',
              label: '回风温度传感器故障'
            }
          ];
        } else if (row === 'MC') {
          this.optionList = [
            {
              value: 'mcCtrlStatus',
              label: '电机控制器状态'
            },
            {
              value: 'mcRunStatus',
              label: '电机控制器工作状态'
            },
            {
              value: 'tempStatus',
              label: '温度状态'
            },
            {
              value: 'voltageStatus',
              label: '母线电压状态'
            },
            {
              value: 'voltageRange',
              label: '母线电压'
            },
            {
              value: 'motorTemp',
              label: '电机温度'
            },
            {
              value: 'mcTemp',
              label: '控制器温度'
            },
            {
              value: 'motorRpm',
              label: '电机转速'
            },
            {
              value: 'motorCurrent',
              label: '电机相电流'
            },
            {
              value: 'aprRate',
              label: '加速踏板开度'
            },
            {
              value: 'mcNm',
              label: '电机控制器当前估计扭矩'
            },
            {
              value: 'busCurrent',
              label: '母线电流'
            },
            {
              value: 'brakeRate',
              label: '制动踏板开度'
            },
            {
              value: 'vehiType',
              label: '车型类别'
            },
            {
              value: 'isCurrentOver',
              label: '任一相电流是否过流'
            },
            {
              value: 'isBusCurrentOver',
              label: '直流母线是否过流'
            },
            {
              value: 'isMotorRpmOver',
              label: '电机转速超过限值'
            },
            {
              value: 'isHolzerErr',
              label: '霍尔故障'
            },
            {
              value: 'isAprErr',
              label: '加速踏板故障'
            },
            {
              value: 'isGeerErr',
              label: '档位输入故障'
            },
            {
              value: 'motorLife',
              label: 'LIFE值'
            },
            {
              value: 'busCurrentSensorErr',
              label: '母线电流传感器故障'
            },
            {
              value: 'phaseCurrentSensorErr',
              label: '相线电流传感器故障'
            },
            {
              value: 'busVolSensorErr',
              label: '母线电压传感器故障'
            },
            {
              value: 'controlTempSensorErr',
              label: '控制器温度传感器故障'
            },
            {
              value: 'tempSensorErr',
              label: '电机温度传感器故障'
            },
            {
              value: 'rotaryTransformerErr',
              label: '旋转变压器故障'
            },
            {
              value: 'controlTempErr',
              label: '控制器温度报警'
            },
            {
              value: 'controlOvertempErr',
              label: '控制器过温故障'
            },
            {
              value: 'mTempAlarm',
              label: '电机温度报警'
            },
            {
              value: 'mOvertempErr',
              label: '电机过温故障'
            },
            {
              value: 'busOvercurrent',
              label: '母线过流（短路）'
            },
            {
              value: 'busOvervolAlarm',
              label: '母线过压报警'
            },
            {
              value: 'busOvervolErr',
              label: '母线过压故障'
            },
            {
              value: 'busUndervolAlarm',
              label: '母线欠压报警'
            },
            {
              value: 'busUndervolErr',
              label: '母线欠压故障'
            },
            {
              value: 'controlUndervolErr',
              label: '控制电欠压故障'
            },
            {
              value: 'controlOvervolErr',
              label: '控制电过压故障'
            },
            {
              value: 'phaseOvercurrent',
              label: '相线过流'
            },
            {
              value: 'mOverspeedAlarm',
              label: '电机超速报警'
            },
            {
              value: 'mOverspeedErr',
              label: '电机超速故障'
            },
            {
              value: 'perchargeErr',
              label: '预充电故障'
            },
            {
              value: 'pedalPersamplingErr',
              label: '加速踏板预采样故障'
            },
            {
              value: 'canCommunicationErr',
              label: 'CAN总线通讯故障'
            },
            {
              value: 'errorLevel',
              label: '故障等级'
            },
            {
              value: 'deratingLevel',
              label: '降额等级'
            },
            {
              value: 'powerOverStatus',
              label: '降功率等级'
            },
            {
              value: 'supplierCode',
              label: '供应商配置代码'
            }
          ];
        } else if (row === 'EPS') {
          this.optionList = [
            {
              value: 'errLevel',
              label: 'EPS故障等级'
            },
            {
              value: 'workStatus',
              label: 'EPS工作状态'
            },
            {
              value: 'helpMoment',
              label: 'EPS助力力矩'
            },
            {
              value: 'electricity',
              label: 'EPS电机工作电流'
            },
            {
              value: 'voltage',
              label: '电源电压'
            },
            {
              value: 'isSensorErr',
              label: 'EPS传感器故障'
            },
            {
              value: 'isCurrentException',
              label: 'EPS电流异常'
            },
            {
              value: 'isVoltageHigher',
              label: 'EPS电压过高'
            },
            {
              value: 'isTempHigher',
              label: 'EPS温度过高'
            },
            {
              value: 'isVoltageLower',
              label: 'EPS电压过低'
            },
            {
              value: 'isInitException',
              label: 'EPS初始化异常'
            },
            {
              value: 'isDriverErr',
              label: 'EPS电机驱动器故障/EPS控制器内部故障'
            },
            {
              value: 'isMotorInitErr',
              label: '电机初始化及轮询故障'
            },
            {
              value: 'isAngleSensorErr',
              label: '角度传感器故障'
            },
            {
              value: 'isCanCtrlErr',
              label: 'CAN控制器故障'
            },
            {
              value: 'isKeyInvalid',
              label: '钥匙位置失效'
            },
            {
              value: 'isTempLowerLmt',
              label: '温度传感器超下限'
            },
            {
              value: 'isTempUpperLmt',
              label: '温度传感器超上限'
            }
          ];
        } else if (row === 'VMS') {
          this.optionList = [
            {
              value: 'motorStatus',
              label: '电机当前状态'
            },
            {
              value: 'isMotorTempHigh',
              label: '电机温度是否过高'
            },
            {
              value: 'isMotorControlerTempHigh',
              label: '电机控制器温度是否过高'
            },
            {
              value: 'isMotorControlerErr',
              label: '电机控制器是否故障'
            },
            {
              value: 'batteryCurrent',
              label: '电池组电流'
            },
            {
              value: 'batteryVoltage',
              label: '电池组电压'
            },
            {
              value: 'leftBattery',
              label: '电量低'
            },
            {
              value: 'speed',
              label: '车速'
            },
            {
              value: 'motorOwnTemp',
              label: '电机温度'
            },
            {
              value: 'gearStatus',
              label: '档位状态'
            },
            {
              value: 'keyPosStatus',
              label: '钥匙位置'
            },
            {
              value: 'lowPowerStatus',
              label: '车辆降功率运行状态'
            },
            {
              value: 'isAcOn',
              label: '空调使能'
            },
            {
              value: 'pepsStatus',
              label: 'PEPS认证状态'
            },
            {
              value: 'isReady',
              label: '充电准备就绪'
            },
            {
              value: 'totalVol',
              label: '总电压'
            },
            {
              value: 'totalCurr',
              label: '总电流'
            },
            {
              value: 'outchargelineStatus',
              label: '外接充电线连接状态'
            },
            {
              value: 'battSoc',
              label: '电池soc'
            },
            {
              value: 'battStatus',
              label: '电池组状态'
            },
            {
              value: 'descPowerStatus',
              label: '降功率状态'
            },
            {
              value: 'errAlarm',
              label: '故障预警'
            },
            {
              value: 'errWarning',
              label: '故障报警'
            },
            {
              value: 'notErrWarning',
              label: '非故障报警'
            },
            {
              value: 'isInsuLowest',
              label: '绝缘超低'
            },
            {
              value: 'highestVol',
              label: '最高单体电压'
            },
            {
              value: 'highestBatt',
              label: '最高单体电池号'
            },
            {
              value: 'lowestVol',
              label: '最低单体电压'
            },
            {
              value: 'lowestBatt',
              label: '最低单体电池号'
            },
            {
              value: 'highestTem',
              label: '最高温度点温度'
            },
            {
              value: 'highestTemBatt',
              label: '最高温度点电池号'
            },
            {
              value: 'battVolHigher',
              label: '单体电池电压过高'
            },
            {
              value: 'battVolHighest',
              label: '单体电池电压超高'
            },
            {
              value: 'battVolLower',
              label: '单体电池电压过低'
            },
            {
              value: 'battVolLowest',
              label: '单体电池电压超低'
            },
            {
              value: 'totalVolHigher',
              label: '总电压过高'
            },
            {
              value: 'totalVolHighest',
              label: '总电压超高'
            },
            {
              value: 'totalVolLower',
              label: '总电压过低'
            },
            {
              value: 'totalVolLowest',
              label: '总电压超低'
            },
            {
              value: 'volPlusBigger',
              label: '单体电池压差过大'
            },
            {
              value: 'volPlusBiggest',
              label: '单体电池压差超大'
            },
            {
              value: 'leftBatteryLower',
              label: '电池组剩余电量过低'
            },
            {
              value: 'leftBatteryLowest',
              label: '电池组剩余电量超低'
            },
            {
              value: 'dischargeCurrHigher',
              label: '电池组放电电流过大'
            },
            {
              value: 'dischargeCurrHighest',
              label: '电池组放电电流超大'
            },
            {
              value: 'chargeCurrHigher',
              label: '电池组充电电流过大'
            },
            {
              value: 'chargeCurrHighest',
              label: '电池组充电电流超大'
            },
            {
              value: 'tempHigher',
              label: '电池组温度过高'
            },
            {
              value: 'tempHighest',
              label: '电池组温度超高'
            },
            {
              value: 'tempLower',
              label: '电池组温度过低'
            },
            {
              value: 'tempLowest',
              label: '电池组温度超低'
            },
            {
              value: 'tempPlusHigher',
              label: '电池组温差过大'
            },
            {
              value: 'tempPlusHighest',
              label: '电池组温差超大'
            },
            {
              value: 'battInsuLower',
              label: '电池组绝缘过低'
            },
            {
              value: 'battInsuLowest',
              label: '电池组绝缘超低'
            },
            {
              value: 'heatLongger',
              label: '电池组加热时间过长'
            },
            {
              value: 'heatLonggest',
              label: '电池组加热时间超长'
            },
            {
              value: 'chargeLongger',
              label: '电池组充电时间过长'
            },
            {
              value: 'chargeLonggest',
              label: '电池组充电时间超长'
            },
            {
              value: 'bmsSysErr',
              label: 'BMS系统故障等'
            },
            {
              value: 'chargerConnErr',
              label: '与充电机通讯故障'
            },
            {
              value: 'controConnErr',
              label: '与整车控制器通讯故障'
            },
            {
              value: 'chargeErr',
              label: '预充故障'
            },
            {
              value: 'heatErr',
              label: '加热异常'
            },
            {
              value: 'negErrClose',
              label: '负极接触器故障：不能闭合'
            },
            {
              value: 'negErrPaste',
              label: '负极接触器故障：粘连'
            },
            {
              value: 'outsideShort',
              label: '电池外部短路'
            },
            {
              value: 'insideShort',
              label: '电池内部短路'
            },
            {
              value: 'alowableVoltage',
              label: '最高允许充电端电压'
            },
            {
              value: 'alowableCurrent',
              label: '最高允许充电电流'
            },
            {
              value: 'controInstruct',
              label: '充电机使能控制指令'
            },
            {
              value: 'loadType',
              label: '负载类型'
            },
            {
              value: 'heaterStatus',
              label: '加热继电器状态'
            },
            {
              value: 'chargeCount',
              label: '充电次数'
            }
          ];
        } else if (row === 'ICU') {
          this.optionList = [
            {
              value: 'totalMile',
              label: '整车行使里程'
            },
            {
              value: 'brakeSysErr',
              label: '制动系统故障报警'
            },
            {
              value: 'maintainStatus',
              label: '保养信息'
            },
            {
              value: 'leftmaintainMile',
              label: '剩余保养里程'
            }
          ];
        } else {
          this.optionList = [];
        }
        if (row) {
          this.modalFormData.alarmCode = `${row}_`;
        }
      },
      // 字段编码
      changeFieldCode (row) {
        if (this.modalFormData.componentCode && this.modalFormData.fieldCode) {
          this.modalFormData.alarmCode = this.modalFormData.componentCode + '_' + row;
        }
      }
    }
  };
</script>
