/**
* 描述：地标配置转发
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
  .hy_export {
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
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline>
          <FormItem label="">
            <i-input placeholder="账号" v-model.trim="searchData.username" clearable style="width: 200px"></i-input>
          </FormItem>
          <Button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--工具条部分-->
          <!-- 添加功能 -->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('地标配置新增')">
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
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd" width="950" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95" inline style="margin-bottom:15px;">
            <Row>
              <i-col span="12">
                <FormItem label="城市" prop="cityName">
                  <i-input v-model="modalFormData.cityName" autocomplete="off" placeholder="请输入城市名" :maxlength="12" style="width: 200px" clearable></i-input>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="城市首字母" prop="cityCode">
                  <i-input v-model="modalFormData.cityCode" placeholder="城市首字母大写" :maxlength="5" :disabled="this.forbid" style="width: 200px" clearable></i-input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="12">
                <FormItem label="IP" prop="ip">
                  <i-input v-model="modalFormData.ip" placeholder="请输入ip或域名" :maxlength="20" style="width: 200px" clearable></i-input>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="端口" prop="port">
                  <i-input v-model="modalFormData.port" placeholder="请输入端口号" :maxlength="5" style="width: 200px" clearable></i-input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="12">
                <FormItem label="账号" prop="username">
                  <i-input v-model="modalFormData.username" placeholder="请输入账户" :maxlength="12" style="width: 200px" clearable></i-input>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="密码" prop="password1" class="word" style="display:none;">
                  <i-input  type="password" v-model="modalFormData.password1"  placeholder="请输入密码" style="width: 200px;" :readonly='readonly' :maxlength="20" clearable></i-input>
                </FormItem>
                <FormItem label="密码" prop="password1" class="wordPass">
                  <i-input @on-focus="changeType" placeholder="请输入密码" style="width: 200px" :maxlength="20" clearable></i-input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="13">
                <FormItem label="企业接入标识" prop="companySign">
                  <i-input type="text" autocomplete="off" v-model="modalFormData.companySign" placeholder="请输入标志符号" :maxlength="17" style="width: 200px" clearable></i-input>
                </FormItem>
              </i-col>
              <i-col span="11">
                <FormItem label="是否转发报警" prop="alarmFlag" style="padding-left: 8px;">
                  <Switch size="large" v-model="witch" @on-change="changeSwitch">
                      <span slot="open">是</span>
                      <span slot="close">否</span>
                  </Switch>
                 </FormItem>
              </i-col>
            </Row>
          </Form>
          <div class="heng_class"></div>
          <p class="title_class">绑定车辆</p>
          <Row>
            <i-col span="15">
              <Form label-position="right" :label-width="95" inline>
                <FormItem label="VIN码">
                  <Select
                    placeholder="VIN码"
                    style="width: 180px"
                    v-model="searchData1.vinCode"
                    filterable
                    remote
                    clearable
                    :remote-method="vinMethod"
                    ref="select"
                    :not-found-text="notFoundText"
                    :loading="loading2">
                    <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="车系">
                  <Select placeholder="车系" v-model="searchData1.carSeries" @on-change="getModels" style="width: 180px" clearable>
                    <Option v-for="item in seriesType" :value="item.vehicleSeries" :key="item.id" :label="item.vehicleSeries"></Option>
                  </Select>
                </FormItem>
                <FormItem label="车型">
                  <Select placeholder="车型" v-model="searchData1.carType" style="width: 180px" clearable>
                    <Option v-for="item in modelList" :value="item" :key="item" :label="item"></Option>
                  </Select>
                </FormItem>
                <FormItem style="margin-left: -45px;">
                  <Button type="success" icon="ios-search" @click="_getCar(1)" shape="circle" :loading="loading1"
                          style="width:93px;font-size:16px" class="search">查询
                  </Button>
                </FormItem>
                <!--工具条部分-->
              </Form>
              <Table border ref="selection" :columns="formColumns" :data="tableData" :loading="loading1" style="margin-left: 5px;" :height="235" @on-selection-change="selectData"></Table>
              <hy-page
                style="padding: 8px !important;text-align: center;"
                :current-page="searchData1.pageNum"
                :total-element="searchData1.totalElement"
                :total-page="searchData1.totalPage"
                :showItem="3"
                @current-change="_getCar"></hy-page>
              <div class="bottom_class">
                <span class="font_class">已选{{checkData.length}}项</span>
                <Button @click="addVehicle" :disabled="!this.checkData.length">添加</Button>
              </div>
              <div class="clearfix"></div>
            </i-col>
            <i-col span="1" style="height: 430px; width: 1px;border-left: 1px solid rgba(186, 186, 186, 0.4);"></i-col>
            <i-col span="8" style="padding-top: 72px;">
              <p class="title_class">已添加车辆</p>
              <Table border :columns="rightColumns" :data="rightData" :height="235"></Table>
              <div class="bottom_class">
                <span class="font_class">已添加{{rightData.length}}项</span>
                <Button @click="clearAll" :disabled="!rightData.length">清空</Button>
              </div>
              <div class="clearfix"></div>
            </i-col>
          </Row>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save" :disabled="!modalFormData.cityCode || !modalFormData.cityName || !modalFormData.ip || !modalFormData.port || !modalFormData.username || (modalFormData.id ? false : !modalFormData.password1)">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
        </div>
      </Modal>
      <!-- 车辆解绑 -->
      <Modal v-model="untieShow" :mask-closable="false" @on-cancel="closeUntiel" width="950" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>车辆解绑</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form :model="detailData"  :label-width="97" inline>
            <Row>
              <i-col span="6">
                <FormItem label="城市：">
                  {{detailData.cityName}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="企业接入标识：">
                  {{detailData.companySign}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="IP：">
                  {{detailData.ip}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="端口：">
                  {{detailData.port}}
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="6">
                <FormItem label="账号：">
                  {{detailData.username}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="code：">
                  {{detailData.channelCode}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="状态：">
                  {{detailData.state === 1 ? '已开启' : detailData.state === 0 ?'已禁用' : '--'}}
                </FormItem>
              </i-col>
            </Row>
          </Form>
          <div class="heng_class"></div>
          <Form label-position="right" :label-width="95" inline style="padding-top: 10px;">
            <FormItem label="VIN码">
              <Select
                placeholder="VIN码"
                style="width: 200px"
                v-model="searchData2.vinCode"
                filterable
                remote
                clearable
                :remote-method="vinMethod"
                ref="addSelect"
                :not-found-text="notFoundText"
                :loading="loading2">
                <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label="车系">
              <Select placeholder="车系" v-model="searchData2.carSeries" @on-change="getModels" style="width: 200px" clearable>
                <Option v-for="item in seriesType" :value="item.vehicleSeries" :key="item.id" :label="item.vehicleSeries"></Option>
              </Select>
            </FormItem>
            <FormItem label="车型">
              <Select placeholder="车型" v-model="searchData2.carType" style="width: 200px" clearable>
                <Option v-for="item in modelList" :value="item" :key="item" :label="item"></Option>
              </Select>
            </FormItem>
            <FormItem style="margin-left: -45px;">
              <Button type="success" icon="ios-search" @click="_getDetail(1)" shape="circle" :loading="loading5"
                      style="width:93px;font-size:16px" class="search">查询
              </Button>
            </FormItem>
            <!--工具条部分-->
          </Form>
          <Table border ref="selection1" :columns="untielColumns" :data="detailTable" :loading="loading5" style="margin-left: 5px;" @on-selection-change="selectUntiel"></Table>
          <hy-page
            style="padding-bottom: 10px !important;"
            :current-page="searchData2.pageNum"
            :total-element="searchData2.totalElement"
            :total-page="searchData2.totalPage"
            @current-change="_getDetail"></hy-page>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="loading5" @click="untieSave" :disabled="untielData.length === 0">解绑</Button>
          <Button @click="closeUntiel">关闭</Button>
        </div>
      </Modal>
      <!-- 详情 -->
      <Modal v-model="detailShow" :mask-closable="false" width="950" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>详情</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form :model="detailData"  :label-width="97" inline>
            <Row>
              <i-col span="6">
                <FormItem label="城市：">
                  {{detailData.cityName}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="企业接入标识：">
                  {{detailData.companySign}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="IP：">
                  {{detailData.ip}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="端口：">
                  {{detailData.port}}
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="6">
                <FormItem label="账号：">
                  {{detailData.username}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="code：">
                  {{detailData.channelCode}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="状态：">
                  {{detailData.state === 1 ? '已开启' : detailData.state === 0 ?'已禁用' : '--'}}
                </FormItem>
              </i-col>
              <i-col span="6">
                <FormItem label="是否转发报警：">
                  {{detailData.alarmFlag === 0 ? '否' : detailData.alarmFlag === 1 ? '是' : '--'}}
                </FormItem>
              </i-col>
            </Row>
          </Form>
          <div class="heng_class"></div>
          <p class="title_class">绑定车辆{{detailData.vehicleCount}}辆</p>
          <Table border ref="selection" :columns="detailColumns" :data="detailTable" :loading="loading5" style="margin-left: 5px;" @on-selection-change="selectData"></Table>
          <hy-page
            style="padding-bottom: 10px !important;"
            :current-page="searchData2.pageNum"
            :total-element="searchData2.totalElement"
            :total-page="searchData2.totalPage"
            @current-change="_getDetail"></hy-page>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" @click="detailShow = false">关闭</Button>
        </div>
      </Modal>
      <!-- 导入绑定 -->
      <Modal v-model="excelShow" :mask-closable="false" width="950" @on-visible-change="closeDetail">
        <p slot="header" class="hy-modal-title">
          <span>导入绑定车辆</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <div>
            <div class="hy_export wrapper" >
              <Row v-show="tieSuccess">
                <div style="clear:both;"></div>
                <p style="font-size: 24px;"><Icon size= '30' color="green" type="checkmark-circled" style="margin-right: 3px;"></Icon>绑定完成</p>
                <p>绑定总数：{{dataNum}}项</p>
              </Row>
              <Row class="hy_down">
                <!--<Upload ref="upload" action="//jsonplaceholder.typicode.com/posts/" style="float: left;padding-left: 45%;" :show-upload-list="false" :before-upload="beforeUpload" :on-progress="onProgress" :on-error="onError" :on-success="onSuccess">-->
                <!--<Button type="ghost" icon="ios-cloud-upload-outline">{{buttonText}}</Button>-->
                <!--</Upload>-->
                <Row class="hy_success" v-show="showName && !tieSuccess">
                  <p>
                    <img src="../../../../static/images/xsls.png"/>
                    <span>{{fileName}}</span>
                  </p>
                </Row>
                <Upload
                  class="upload-demo"
                  style="display: inline-block;"
                  ref="upload"
                  :action="importFileUrl()"
                  :before-upload="beforeUpload"
                  :show-upload-list="false"
                  :on-progress="onProgress"
                  :on-error="onError"
                  :on-success="onSuccess"
                  :limit="1">
                  <Button>{{buttonText}}</Button>
                </Upload>
                <Button v-show="showName && !tieSuccess" @click="startTie">绑定</Button>
                <a href="javascript:void(0)" v-show="!showName && !tieSuccess" style="padding-left: 5px;font-size: 12px;" @click="exportDown"><Icon type="ios-download"></Icon>下载模板</a>
                <div style="clear:both;"></div>
              </Row>
            </div>
            <div class="hy_export">
            </div>
          </div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" @click="closeDetail">关闭</Button>
        </div>
      </Modal>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import button from '@/js/mixins/button';
  import { mapState } from 'vuex';
  import HyTable from '@/components/common/table/table.vue';
  import { listUse, modelList } from '@/service/vehicleManageService/basicDataService/modelService';
  import { handles } from '@/js/libs/checkValue';
  import storeVin from '@/js/mixins/storeVin/storeVin';
  import { vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  import { channelList, channelDelete, channelSave, resetChannel, deleteVehOfChannel } from '@/service/baseInfo/landMarkConfig';
  export default {
    components: {
      HyTable
    },
    mixins: [list, button, storeVin],
    data () {
      const validatePass = (rule, value, callback) => {
        if (!value && !this.modalFormData.id) {
          callback(new Error('请输入密码'));
        } else {
          if (value === '******') {
            callback();
          } else {
            const valid = /[\w+-]/;
            if (!valid.test(value)) {
              callback(new Error('密码格式不正确'));
            } else if (value) {
              // if (value.length !== 20) {
              //   callback(new Error('密码长度为20字符'));
              // } else {
              callback();
              //  }
            }
            callback();
          }
        }
      };
      const validateCityName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入城市名'));
        } else {
          const valid = /^[\u4E00-\u9FA5]+$/g;
          if (!valid.test(value)) {
            callback(new Error('请输入中文字地名'));
          } else {
            if (value.length > 12) {
              callback(new Error('中文字符请不要超过12位'));
            } else {
              callback();
            }
          }
        }
      };
      const validateCityCode = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入城市首字母'));
        } else {
          const valid = /^[A-Z]+$/;
          if (!valid.test(value)) {
            callback(new Error('请输入城市首字母大写'));
          } else {
            callback();
          }
        }
      };
      const validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入账号'));
        } else {
          const valid = /[\u4E00-\u9FA5]/g;
          if (valid.test(value)) {
            callback(new Error('字母、数字、符号任意组合的字符串'));
          } else {
            callback();
            // if (value.length !== 12) {
            //   callback(new Error('账号长度为12字符'));
            // } else {
            //   callback();
            // }
          }
        }
      };
      const validateCompanySign = (rule, value, callback) => {
        if (!value) {
          callback();
          // callback(new Error('请输入企业接入标志'));
        } else {
          const valid = /[\u4E00-\u9FA5]/g;
          if (valid.test(value)) {
            callback(new Error('标志为字母、数字、符号任意组合的字符串'));
          } else {
            callback();
          }
        }
      };
      const validateIp = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入ip'));
        } else {
          const valid = /[\u4E00-\u9FA5]/g;
          //   const validIp = /^\d+\.\d+\.\d+\.\d+$/;
          const validIp = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
          const validUrl = /([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/;
          if (valid.test(value)) {
            callback(new Error('格式不正确'));
          } else {
            if (validIp.test(value) || validUrl.test(value)) {
              callback();
            } else {
              callback(new Error('格式不正确'));
            }
          }
        }
      };
      return {
        searchData: {},
        searchData1: {
          pageNum: 1,    // 当前页
          totalElement: 0,    // 总数量
          totalPage: 1,    // 总页数
          pageSize: 200,  // 每页展示条数
          dbChannelCodeIsNull: true  // 未绑定车辆
        },
        searchData2: {
          pageNum: 1,    // 当前页
          totalElement: 0,    // 总数量
          totalPage: 1,    // 总页数
          pageSize: 10  // 每页展示条数
        },
        witch: true,
        modalAddFormShow: false,
        formLoading: false,
        forbid: false,
        seriesType: {},   // 车系
        modelList: {},   // 车型
        loading1: false,
        loading2: false,
        readonly: true,
        modalFormData: {
          alarmFlag: 1
        },
        modalTitle: '新增',
        checkData: [],  // 勾选项
        detailShow: false,
        excelShow: false,   // excecl
        tieSuccess: false,
        showName: false,
        spinShow: false,
        id: '',
        buttonText: '导入',
        fileName: '',
        file: null,
        dataNum: 0,
        detailData: {},
        loading5: false,
        untieShow: false,  // 解绑页面
        untielData: [],    // 解绑勾选项
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
            title: '城市',
            key: 'cityName'
          },
          {
            title: 'IP',
            key: 'ip'
          },
          {
            title: '端口',
            key: 'port'
          },
          {
            title: '账号',
            key: 'username'
          },
          {
            title: 'code',
            key: 'channelCode'
          },
          {
            title: '绑定车辆总数',
            key: 'vehicleCount'
          },
          {
            title: '状态',
            key: 'state',
            render: (h, params) => {
              return this.__filters.statusType(h, params, 'state');
            }
          },
          {
            title: '操作',
            fixed: 'right',
            width: 220,
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.getDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                params.row.state === 1 ? this._hyTool.createIcon(h, params, this.getExcel, '导入绑定', {color: '#9BE298', type: 'bangding', size: '20', content: '导入绑定', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('地标配置修改') && params.row.state === 1 ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('地标解绑车辆') && params.row.state === 1 ? this._hyTool.createIcon(h, params, this.untie, '解绑车辆', {color: '#79878f', type: 'jiebang1', size: '20', content: '解绑车辆', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('地标配置删除') && params.row.state === 1 ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null,
                this.buttonShow('地标配置禁启用') && params.row.id !== 1 ? this._hyTool.createIcon(h, params, this.reversal, null, params.row.state === 1 ? {color: '#919191', type: 'jinyong', size: '20', content: '禁用', placement: 'top', showTransfer: true} : {color: '#69BB6B', type: 'qiyong', size: '20', content: '启用', placement: 'top', showTransfer: true}, null,
                  {marginRight: '5px', color: params.row.state === 1 ? 'red' : '#19be6b'}) : null
              ]);
            }
          }
        ],
        ruleValidate: {
          cityName: {required: true, validator: validateCityName, trigger: 'blur'},
          cityCode: {required: true, validator: validateCityCode, trigger: 'blur'},
          alarmFlag: {required: true},
          companySign: {required: false, validator: validateCompanySign, trigger: 'blur'},
          ip: {required: true, validator: validateIp, trigger: 'blur'},
          port: {required: true, validator: handles.call(this, 'zeroNumber', '端口'), trigger: 'blur'},
          username: {required: true, validator: validateName, trigger: 'blur'},
          password1: {required: true, validator: validatePass, trigger: 'blur'}
        },
        tableData: [],
        formColumns: [
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: '车系',
            key: 'carSeries'
          },
          {
            title: '车型',
            key: 'carType'
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          }
        ],
        rightData: [],
        rightColumns: [
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: '操作',
            align: 'center',
            width: 80,
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.deleteByVin, '移除', {color: '#F31A3E', type: 'cuowu', size: '20', content: '移除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'})
              ]);
            }
          }
        ],
        untielColumns: [    // 解绑列表
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: 'GPRS号',
            key: 'gprsNo'
          },
          {
            title: '车系',
            key: 'carSeries'
          },
          {
            title: '车型',
            key: 'carType'
          },
          {
            title: '操作',
            align: 'center',
            width: 80,
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.untieSave, '解绑', {color: '#F31A3E', type: 'cuowu', size: '20', content: '移除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'})
              ]);
            }
          }
        ],
        detailColumns: [
          {
            title: 'VIN码',
            key: 'vinCode'
          },
          {
            title: 'GPRS号',
            key: 'gprsNo'
          },
          {
            title: '车系',
            key: 'carSeries'
          },
          {
            title: '车型',
            key: 'carType'
          }
        ],
        detailTable: []
      };
    },
    mounted () {
      this.getSeries();
      this.watchVin('select'); // 搜过的vin码
      this.watchVin('addSelect'); // 搜过的vin码
    },
    computed: mapState([
      'exportModel'
    ]),
    methods: {
      // 密码控制
      changeType (dom) {
        let $ = document.querySelector.bind(document);
        $('.word').style.display = 'block';
        $('.wordPass').style.display = 'none';
        this.readonly = false;
        // this.passwordInput = dom;
        // dom.target.type = 'password';
      },
      changeSwitch (data) {
        if (data) {
          this.modalFormData.alarmFlag = 1;
        } else {
          this.modalFormData.alarmFlag = 0;
        }
      },
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        channelList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询地标转发配置列表失败',
            desc: ret
          });
        });
      },
      // 新增，修改弹框
      async addOrUpdate (row) {
        try {
          this._getCar(1);
          this.cleanValue();
          this.formLoading = false;
          let $ = document.querySelector.bind(document);
          if (row) {
            $('.word').style.display = 'block';
            $('.wordPass').style.display = 'none';
            this.readonly = false;
            this.ruleValidate.password1.required = false;
            this.modalTitle = '修改';
            this.forbid = true;
            //  this.rightData = await this._getAllCar(row.channelCode);
            //  this.reRightData = this._hyTool.deepCopy(this.rightData);
            this.modalFormData = this._hyTool.deepCopy(row);
            this.reData = this._hyTool.extend({}, row);
            this.modalFormData.password1 = '******';
          } else {
            this.ruleValidate.password1.required = true;
            this.modalTitle = '新增';
            this.forbid = false;
            $('.word').style.display = 'none';
            $('.wordPass').style.display = 'block';
            this.readonly = true;
            this.modalFormData.alarmFlag = 1;
          }
          if (this.modalFormData.alarmFlag === 1) this.witch = true;
          else this.witch = false;
          this.modalAddFormShow = true;
        } catch (e) {
        }
      },
      // 获取未和账号绑定的车辆列表
      _getCar (num) {
        this.checkData = [];
        this.loading1 = true;
        this.searchData1.ignoreVehiclePerm = 1; // 用作车辆权限
        if (num) this.searchData1.pageNum = num;
        vehicleListAll(this.searchData1, res => {
          this.searchData1.totalElement = res.totalElements;
          this.searchData1.totalPage = res.totalPages;
          this.tableData = res.content;
          for (let item of this.tableData) {
            for (let it of this.rightData) {
              if (item.vinCode === it.vinCode) {
                item._checked = true;
                this.checkData.push(item);
                break;
              }
            }
          }
          this.loading1 = false;
        }, ret => {
          this.loading1 = false;
          this.$Notice.error({
            title: '查询绑定车辆列表失败',
            desc: ret
          });
        });
        if (this.searchData1.vinCode) this.storeVin(this.searchData1.vinCode);  // 存储搜索的vin
      },
      _getDetail (num) {
        this.checkData = [];
        this.loading5 = true;
        this.searchData2.ignoreVehiclePerm = 1; // 用作车辆权限
        if (num) this.searchData2.pageNum = num;
        vehicleListAll(this.searchData2, res => {
          this.searchData2.totalElement = res.totalElements;
          this.searchData2.totalPage = res.totalPages;
          this.detailTable = res.content;
          this.loading5 = false;
        }, ret => {
          this.loading5 = false;
          this.$Notice.error({
            title: '查询绑定车辆列表失败',
            desc: ret
          });
        });
      if (this.searchData2.vinCode) this.storeVin(this.searchData2.vinCode);  // 存储搜索的vin
      },
      _getAllCar (code) {
        return new Promise((resolve, reject) => {
          try {
            let params = {channelCode: code};
            vehicleListAll(params, res => {
              resolve(res);
            }, ret => {
              reject([]);
            });
          } catch (e) {
            reject([]);
          }
        });
      },
      // 添加车辆
      addVehicle () {
        if (this.rightData.length) {
          for (let it of this.checkData) {
            let has = false;
            for (let item of this.rightData) {
              if (it.vinCode === item.vinCode) {
                has = true;
                break;
              }
            }
            if (!has) {
              this.rightData.unshift({vinCode: it.vinCode});
            }
          }
        } else {
          for (let item of this.checkData) {
            this.rightData.push({vinCode: item.vinCode});
          }
        }
      },
      // 删除已添加车辆
      deleteByVin (row) {
        for (let i = 0; i < this.rightData.length; i++) {
          if (row.vinCode === this.rightData[i].vinCode) {
            this.rightData.splice(i, 1);
            break;
          }
        }
      },
      // 清空已选中车辆
      clearAll () {
        this.rightData = [];
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            this.modalFormData.vinCodes = this.rightData.map((item) => {
              return item.vinCode;
            });
            this.modalFormData.password = this.modalFormData.password1;
            if (this.modalFormData.id && this.modalFormData.password === '******') {
              delete this.modalFormData.password;
            }
            channelSave({}, this.modalFormData, res => {
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
          this.modalFormData.password1 = '******';
        } else {
          this.$refs['formAdd'].resetFields();
        }
        if (this.modalFormData.alarmFlag === 1) this.witch = true;
        else this.witch = false;
        this.rightData = [];
        // if (this.passwordInput) {
        //   this.passwordInput.target.type = 'text';
        // }
      },
      // 清空值
      cleanValue () {
        this.$refs['formAdd'].resetFields();
        this.$refs.selection.selectAll(false);
        this.modalFormData = {};
        delete this.searchData1.vinCode;
        delete this.searchData1.carSeries;
        delete this.searchData1.carType;
        this.checkData = [];
        this.rightData = [];
      },
      // 删除
      deleteById (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.spinShow = true;
          channelDelete({ids: params.id}, res => {
            this.spinShow = false;
            this._getList();
            setTimeout(() => {
              this.$Notice.success({
                title: '删除成功'
              });
            }, 500);
          }, ret => {
            this.spinShow = false;
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
          this.searchData2.dbChannelCode = row.channelCode;
          this._getDetail(1);
          this.detailData = this._hyTool.deepCopy(row);
          this.detailShow = true;
        } catch (e) {
        }
      },
      getExcel (row) {
        this.id = row.id;
        this.excelShow = true;
      },
      // 模板下载
      exportDown () {
        window.location.href = this.exportModel.landConfig;
      },
      // 开始绑定
      startTie () {
        this.$refs.upload.post(this.file);
      },
      closeDetail (param) {
        if (param === true) {
          this.excelShow = true;
        } else {
          this.excelShow = false;
        }
        this.tieSuccess = false;
        this.showName = false;
        this.buttonText = '导入';
      },
      importFileUrl () {
        return '/api/vehicleDBChannel/addByExcel?id=' + this.id;
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
          this.buttonText = '重新导入';
          this.file = file;
          this.showName = true;
          this.tieSuccess = false;
        }
        return false;
        // this.file = file;
        // if (file.name.endsWith('xlsx')) {
        //   return true;
        // } else {
        // return false;
        // }
      },
      // 上传中
      onProgress (file) {
        this.spinShow = true;
      },
      // 上传失败
      onError () {
        this.spinShow = false;
        this.$confirm('绑定失败', '提示', {
          showConfirmButton: false,
          showCancelButton: false,
          type: 'error'
        }).then(() => {
        }).catch(() => {
        });
      },
      // 上传成功
      onSuccess (res) {
        this.spinShow = false;
        if (res.code === '200') {
          this.dataNum = res.data;
          this.buttonText = '继续导入';
          this.tieSuccess = true;
          this._getList(this.searchData.pageNum);
        } else {
          this.$confirm(res.message, '绑定失败', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          });
          // this.$Modal.info({
          //       title: '开始迁移失败',
          //        content: res.message
          //   });
        }
      },
      // 解绑
      async untie (row) {
        this.searchData2.dbChannelCode = row.channelCode;
        this._getDetail(1);
        this.detailData = this._hyTool.deepCopy(row);
        this.untieShow = true;
      },
      // 禁启用
      reversal (row) {
        let text = '';
        if (row.state === 1) {
          text = '禁用';
        } else {
          text = '启用';
        }
        this.$confirm(`确定${text}？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = this._hyTool.deepCopy(row);
          if (data.state) {
            data.state = 0;
          } else {
            data.state = 1;
          }
          resetChannel(null, data, res => {
            this._getList();
            setTimeout(() => {
              this.$Notice.success({
                title: `${text}成功`
              });
            }, 500);
          }, ret => {
            setTimeout(() => {
              this.$Notice.error({
                title: `${text}失败`,
                desc: ret
              });
            }, 500);
          });
        }).catch(() => {
        });
      },
      // 获取所有车系
      getSeries () {
        listUse(null, res => {
          this.seriesType = this._hyTool.deleteObject(res, 'vehicleSeries');
        });
      },
      // 获取车系对应车型
      getModels (row) {
        if (!row) {
          this.modelList = [];
          return;
        }
        let param = {
          vehicleSeries: row
        };
        modelList(param, res => {
          this.modelList = res;
        });
      },
      // 勾选事件
      selectData (data) {
        this.checkData = [...data];
      },
      // 解绑勾选
      selectUntiel (data) {
        this.untielData = data.map(item => item.vinCode);
      },
      // 保存解绑
      untieSave (row) {
        let params = {
          channelCode: this.searchData2.dbChannelCode,
          vinCodes: ''
        };
        if (row.vinCode) {
          params.vinCodes = row.vinCode;
        } else {
          params.vinCodes = this.untielData.toString();
        }
        deleteVehOfChannel(params, res => {
          this.isUntie = true;
          this._getDetail();
        }, ret => {
          this.$Notice.error({
            title: '解绑失败',
            desc: ret
          });
        });
      },
      // 关闭解绑页面
      closeUntiel () {
        this.untieShow = false;
        this.untielData = [];
        this.$refs.selection1.selectAll(false);
        delete this.searchData2.vinCode;
        delete this.searchData2.carSeries;
        delete this.searchData2.carType;
        if (this.isUntie) this._getList();
        this.isUntie = false;
      }
    }
  };
</script>
