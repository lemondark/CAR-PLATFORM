/**
* 作者：szh
* 时间：2018-01-17
* 描述：车辆信息管理
**/
<style lang="scss" scoped>
  .hy_input {
    width: 250px;
  }
  .hy-sleft {
    width: 100%;
    float: left;
  }
  .hy-sright {
    display:inline-block;
    width: 20%;
  }
  .clearfix{
    clear:both;
    zoom:1;
    overflow: hidden;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" :label-width="10" inline class="clear">
          <FormItem>
            <i-input placeholder="VIN码" v-model.trim="searchData.vinCode" style="width: 190px;" clearable></i-input>
          </FormItem>
          <FormItem label="">
            <Select placeholder="车系" v-model="searchData.carSeries" @on-change="getModels1" style="width: 190px;" clearable>
              <Option v-for="item in seriesType" :value="item.vehicleSeries" :key="item.id" :label="item.vehicleSeries"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select placeholder="车型" v-model="searchData.carType" style="width: 190px;" clearable>
              <Option v-for="item in modelList" :value="item" :key="item" :label="item"></Option>
            </Select>
          </FormItem>
          <FormItem>
            <i-input placeholder="GPRS号" v-model.trim="searchData.gprsNo" style="width: 190px;" clearable></i-input>
          </FormItem>
          <FormItem>
            <i-input placeholder="电机号" v-model.trim="searchData.machineNo" style="width: 190px;" clearable></i-input>
          </FormItem>
          <FormItem>
            <i-input placeholder="电池组编号" v-model.trim="searchData.batteryPackNumber" style="width: 190px;" clearable></i-input>
          </FormItem>
          <FormItem>
            <Select class="hy_input" v-model="searchData.dealerName" placeholder="经销商名称" clearable filterable style="width: 190px;">
              <Option v-for="item in butorList" :value="item.dealerName" :key="item.id" :label="item.dealerName"></Option>
            </Select >
          </FormItem>
          <FormItem>
            <i-input placeholder="客户名称" v-model.trim="searchData.customerName" style="width: 190px;" clearable></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--end-->
          <Button type="primary" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <i-button type="success"  shape="circle" style="margin-left: 10px;margin-top: 1px" class="export" @click="exports">导出
          </i-button>
          <!--工具条部分-->
          <!-- 添加功能 -->
          <div class="hy-tool-bar hy-tool-add" v-if="buttonShow('车辆新增')">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#5179DF' size='22' @click="addOrUpdate()">新增</hy-icon>
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
        @current-change="_getList"></hy-page>
      <!--新增-->
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnShow" :width="800" :styles="{top: '20px'}">
        <p slot="header" class="hy-modal-title">
          <span>{{modalTitle}}车辆</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="vehicleArchives" :model="vehicleArchives" :rules="ruleValidate" :label-width="100" inline>
            <FormItem label="VIN码" prop="vinCode">
              <i-input v-model="vehicleArchives.vinCode" placeholder="以大写字母开头的17位中英文" :maxlength="50" class="hy_input" clearable></i-input>
            </FormItem>
            <FormItem label="车系" prop="carSeries">
              <Select class="hy_input" v-model="vehicleArchives.carSeries" @on-change="getModels(vehicleArchives.carSeries, 'change')" placeholder="">
                <Option v-for="item in seriesType" :value="item.vehicleSeries" :key="item.id" :label="item.vehicleSeries"></Option>
              </Select>
            </FormItem>
            <FormItem label="车型" prop="carType">
              <Select class="hy_input" v-model="vehicleArchives.carType" placeholder="">
                <Option v-for="item in modelList" :value="item" :key="item" :label="item"></Option>
              </Select>
            </FormItem>
            <FormItem label="车辆颜色" prop="carColor">
              <Select class="hy_input" v-model="vehicleArchives.carColor" placeholder="" filterable clearable>
                <Option v-for="item in colorType" :value="item.color" :key="item.id" :label="item.color"></Option>
              </Select>
            </FormItem>
            <FormItem label="配置" prop="configuration">
              <i-select class="hy_input" placeholder="" v-model="vehicleArchives.configuration" clearable>
                <Option v-for="item in configuration" :value="item.value" :key="item.value" :label="item.label"></Option>
              </i-select>
            </FormItem>
            <FormItem label="电池类型" prop="batteryType">
              <Select class="hy_input" placeholder="" v-model="vehicleArchives.batteryType" clearable>
                <Option v-for="item in batteryType" :value="item.value" :key="item.value" :label="item.label"></Option>
              </Select>
            </FormItem>
            <FormItem label="电机号" prop="machineNo">
              <i-input class="hy_input" v-model="vehicleArchives.machineNo" placeholder="由数字、字母或-组合" :maxlength="30" clearable></i-input>
            </FormItem>
            <FormItem label="控制器号" prop="controlNo">
              <i-input class="hy_input" v-model="vehicleArchives.controlNo" placeholder="由数字、字母或_组合" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="变速箱号" prop="gearBoxNo">
              <i-input class="hy_input" v-model="vehicleArchives.gearBoxNo" placeholder="由数字、字母或_组合" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="电池组编号" prop="batteryPackNumber">
              <i-input class="hy_input" v-model="vehicleArchives.batteryPackNumber" placeholder="由数字、字母或_组合" :maxlength="50" clearable></i-input>
            </FormItem>
            <FormItem label="GPRS号" prop="gprsNo">
              <i-input class="hy_input" v-model="vehicleArchives.gprsNo"  :maxlength="50" placeholder="由数字、字母或_组合" clearable></i-input>
            </FormItem>
            <FormItem label="生产基地" prop="factoryName">
              <Select class="hy_input" v-model="vehicleArchives.factoryName" placeholder="" filterable clearable>
                <Option v-for="item in baseType" :value="item.baseName" :key="item.id" :label="item.baseName"></Option>
              </Select>
            </FormItem>
            <FormItem label="生产日期" prop="produceTime">
              <DatePicker class="hy_input" v-model="vehicleArchives.produceTime" :options="maxNow" type="date" placeholder=""></DatePicker>
            </FormItem>
            <FormItem label="出厂日期" prop="releaseTime">
              <DatePicker class="hy_input" v-model="vehicleArchives.releaseTime" :options="maxNow" type="date" placeholder=""></DatePicker>
            </FormItem>
            <FormItem label="入库日期" prop="storageTime">
              <DatePicker class="hy_input" v-model="vehicleArchives.storageTime" :options="maxNow" type="date" placeholder=""></DatePicker>
            </FormItem>
            <FormItem label="销往地" prop="sendTo">
              <Select class="hy_input" placeholder="" v-model="vehicleArchives.sendTo" clearable>
                <Option v-for="item in sendTo" :value="item.value" :key="item.value" :label="item.label"></Option>
              </Select>
            </FormItem>
            <FormItem label="车辆状态" prop="status">
              <Select class="hy_input" placeholder="" v-model="vehicleArchives.status" clearable>
                <Option v-for="item in status" :value="item.value" :key="item.value" :label="item.label"></Option>
              </Select>
            </FormItem>
            <!-- <FormItem label="所属地区" prop="areaCode">
              <i-input class="hy_input" v-model="vehicleArchives.areaCode" placeholder="由中文、数字、字母组成" :maxlength="50" clearable></i-input>
            </FormItem> -->
            <FormItem label="协议版本" prop="commProtocolVersion">
              <Select class="hy_input" placeholder="" v-model="vehicleArchives.commProtocolVersion" clearable>
                <Option v-for="item in commProtocolVersionArray" :value="item.value" :key="item.value" :label="item.label"></Option>
              </Select>
            </FormItem>
            <FormItem label="矩阵版本" prop="matrixVersion">
              <Select class="hy_input" placeholder="" v-model="vehicleArchives.matrixVersion" clearable>
                <Option v-for="item in matrixVersionArray" :value="item.value" :key="item.value" :label="item.label"></Option>
              </Select>
            </FormItem>

            <!-- 车载终端 -->
            <FormItem label="设备型号" prop="deviceType">
              <i-input class="hy_input" v-model="vehicleArchives.deviceType" placeholder="由数字、字母或_组合" :maxlength="40" clearable></i-input>
            </FormItem>
            <!--<FormItem label="设备类别" prop="deviceClasses">-->
            <!--<i-input class="hy_input" v-model="vehicleArchives.deviceClasses" placeholder="" :maxlength="10"></i-input>-->
            <!--</FormItem>-->
            <FormItem label="伪IP" prop="pseudoIp">
              <i-input class="hy_input" v-model="vehicleArchives.pseudoIp" placeholder="由数字、字母或_组合" :maxlength="30" clearable></i-input>
            </FormItem>
            <FormItem label="SIM卡号" prop="simNumber">
              <i-input class="hy_input" v-model="vehicleArchives.simNumber" placeholder="由数字组成" :maxlength="20" clearable></i-input>
            </FormItem>
            <FormItem label="ICCID" prop="iccid">
              <i-input class="hy_input" v-model="vehicleArchives.iccid" placeholder="由数字字母组成" :maxlength="30" clearable></i-input>
            </FormItem>

            <!-- 车主信息 -->
            <FormItem label="客户名称" prop="customerName">
              <i-input class="hy_input" v-model="vehicleArchives.customerName" placeholder="由中文、数字、字母组成" :maxlength="10" clearable></i-input>
            </FormItem>
            <FormItem label="手机号码" prop="customerPhone">
              <i-input class="hy_input" v-model="vehicleArchives.customerPhone" placeholder="由11位数字组成" clearable></i-input>
            </FormItem>

            <!-- 销售信息 -->
            <FormItem label="经销商名称" prop="dealerId">
              <Select class="hy_input" v-model="vehicleArchives.dealerId" @on-change="changeDealer" placeholder="" clearable filterable>
                <Option v-for="item in butorList" :value="item.dealerId" :key="item.dealerId" :label="item.dealerName"></Option>
              </Select >
            </FormItem>
            <FormItem label="车牌号" prop="plateNo">
              <i-input class="hy_input" v-model="vehicleArchives.plateNo" placeholder="由1个中文和5或者6位字母+数字的组合" :maxlength="50" clearable></i-input>
            </FormItem>
            <!--<FormItem label="合格证日期" prop="certificateDate">-->
            <!--<DatePicker class="hy_input" v-model="vehicleArchives.certificateDate" :options="maxNow" type="date" placeholder=""></DatePicker>-->
            <!--</FormItem>-->
            <FormItem label="销售日期" prop="soldDate">
              <DatePicker class="hy_input" v-model="vehicleArchives.soldDate" :options="maxNow" type="date" placeholder=""></DatePicker>
            </FormItem>
            <FormItem label="备注信息" prop="remark">
              <Input style="width:610px" v-model="vehicleArchives.remark" type="textarea" :rows="4" placeholder="备注信息" />
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
        </div>
      </Modal>
      <!-- 关重件变更记录 -->
      <Modal v-model="keywordsShow" :mask-closable="false" @on-cancel="closeKey" :styles="{top: '20px'}" :width="800">
        <p slot="header" class="hy-modal-title">
          <span>关重件变更记录</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);height: 450px;">
          <Form label-position="right" :label-width="100" inline>
            <FormItem label="关重件类型">
              <i-select v-model.trim="searchKey.keyWord" placeholder="关重件类型" style="width:200px" clearable>
                <i-option v-for="item in keyWordType" :value="item.value" :key="item.value" :label="item.label"></i-option>
              </i-select>
            </FormItem>
            <Button type="primary" icon="ios-search" @click="changeWord(1, true)" shape="circle" :loading="loading1"
                    style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
            </Button>
          </Form>
          <!--table部分-->
          <!--<Table border :columns="columnsTitle" :data="list" @on-selection-change="handleSelectionChange"></Table>-->
          <hy-table :column-type="columnType" :columnsTitle="keyWordTitle" :list="wordList" :on-selection-change="handleSelectionChange"
                    :show-checkbox="showCheckbox" :multiple-selection="multipleSelection"></hy-table>
          <!-- 分页 -->
          <hy-page
            :current-page="searchKey.pageNum"
            :total-element="wordTotalElement"
            :total-page="wordTotalPage"
            @current-change="changeWord"></hy-page>
        </div>
        <div slot="footer"></div>
      </Modal>
      <!--详情-->
      <Modal v-model="modalDetailShow" :mask-closable="false" width='90%' :styles="{top: '20px'}" @on-visible-change="showModel">
        <Tabs style="width:99%;" v-model="name" :style="tabsHeight" @on-click="changeTabs">
          <Tab-pane label="车辆详情">
            <!-- <p slot="header" class="hy-modal-title">
              <span>车辆详情</span>
            </p> -->
            <div style="text-align:left">
              <hy-detail :form="vehicleDetail" :rowData="modalFormItem" v-if="modalDetailShow"></hy-detail>
            </div>
          </Tab-pane>
          <Tab-pane label="关重件信息">
            <Table stripe border :columns="keyPartTitle" :data="keyPartList" style="margin-top:20px;"></Table>
          </Tab-pane>
        </Tabs>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="modalDetailShow = false">关闭</Button>
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
  import { vehicleListAll, vehicleSave, vehicleDelete, butorList, keyWordList, vehicleExport, keyPart } from '@/service/vehicleManageService/vehicleService';
  import { listUse, modelList } from '@/service/vehicleManageService/basicDataService/modelService';
  import { colorListUse } from '@/service/vehicleManageService/basicDataService/colorService';
  import { baseListUse } from '@/service/vehicleManageService/basicDataService/baseService';
  import { handles } from '@/js/libs/checkValue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import { mapState, mapMutations } from 'vuex';
  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list, button],
    data () {
      let checkProduce = (rule, value, callback) => {
        if (this.vehicleArchives.releaseTime || this.vehicleArchives.storageTime) {
          if (new Date(value).getTime() > new Date(this.vehicleArchives.releaseTime).getTime() || new Date(value).getTime() > new Date(this.vehicleArchives.storageTime).getTime()) {
            callback(new Error('生产日期不能晚于出厂日期或入库日期'));
          }
        }
        callback();
      };
      let checkRelease = (rule, value, callback) => {
        if (this.vehicleArchives.produceTime || this.vehicleArchives.storageTime) {
          if (new Date(value).getTime() < new Date(this.vehicleArchives.produceTime).getTime() || new Date(value).getTime() > new Date(this.vehicleArchives.storageTime).getTime()) {
            callback(new Error('出厂日期不能早于生产日期或不能晚于入库日期'));
          }
        }
        callback();
      };
      let checkStorage = (rule, value, callback) => {
        if (this.vehicleArchives.releaseTime || this.vehicleArchives.produceTime) {
          if (new Date(value).getTime() < new Date(this.vehicleArchives.releaseTime).getTime() || new Date(value).getTime() < new Date(this.vehicleArchives.produceTime).getTime()) {
            callback(new Error('入库日期不能早于生产日期或出厂日期'));
          }
        }
        callback();
      };
      return {
        maxNow: {
          disabledDate (date) {         // 最大今天
            return date && date.valueOf() > Date.now();
          }
        },
        dealerCode: '',
        dealerName: '',
        cardType: '',
        name: 0,
        loading: false,
        loading1: false,
        tabName: 'tab1',                  // 当前tab页
        searchData: {},
        keyPartList: [],
        tabsHeight: {
          height: '850px'
        },
        modalAddFormShow: false,     // 新增修改
        modalDetailShow: false,     // 详情
        vehicleDetail: {},           // 车辆信息详情
        modalTitle: '新增',
        vehicleArchives: {
          vinCode: '',
          carSeries: '',
          carType: '',
          carColor: '',
          configuration: '',
          batteryType: '',
          machineNo: '',
          controlNo: '',
          gearBoxNo: '',
          batteryPackNumber: '',
          gprsNo: '',
          factoryName: '',
          produceTime: '',
          releaseTime: '',
          storageTime: '',
          sendTo: '',
          status: '',
          areaCode: '',
          commProtocolVersion: 0,
          matrixVersion: 0,
          deviceType: '',
          pseudoIp: '',
          simNumber: '',
          iccid: '',
          customerName: '',
          customerPhone: '',
          dealerId: '',
          plateNo: '',
          // certificateDate: '',
          soldDate: '',
          remark: ''
        },        // 车辆信息
        keywordsShow: false,         // 关重件变更
        wordList: [],
        wordTotalElement: 0,        // 总数量
        wordTotalPage: 0,           // 总页数
        searchKey: {
          pageNum: 1,               // 当前页数
          pageSize: 6,             // 每页条数
          keyWord: ''
        },              // 查询条件
        searchPageKey: {
          pageNum: 1,               // 当前页数
          pageSize: 6,             // 每页条数
          keyWord: ''
        },
        configuration: [            // 配置
          {value: 1, label: '标配'},
          {value: 2, label: '高配'},
          {value: 3, label: '低配'},
          {value: 4, label: '智享版'},
          {value: 5, label: '乐享版'},
          {value: 6, label: '租凭A版'}
        ],
        batteryType: [              // 电池类型
          {value: 1, label: '锂电池'},
          {value: 2, label: '铅酸电池'}
        ],
        sendTo: [                   // 销往地
          {value: 0, label: '国内'},
          {value: 1, label: '国外'}
        ],
        status: [                   // 状态
          {value: 0, label: '随车卡未录入'},
          {value: 1, label: '审核中'},
          {value: 3, label: '在库未售出'},
          {value: 4, label: '审核未通过'},
          {value: 5, label: '在经销处'},
          {value: 6, label: '在终端客户处'},
          {value: 7, label: '待入库'},
          {value: 8, label: '未记录去向'}
        ],
        certificateType: [          // 证件类型
          {value: 0, label: '身份证'},
          {value: 1, label: '护照'},
          {value: 2, label: '驾照'}
        ],
        commProtocolVersionArray: [
          {value: 0, label: '三期'},
          {value: 1, label: '二期'},
          {value: 2, label: '一期'}
        ],
        matrixVersionArray: [
          {value: 0, label: 'd3'},
          {value: 1, label: '双100'},
          {value: 80, label: '双80'},
          {value: 2, label: '模拟双80'},
          {value: 3, label: 'd5'}
        ],
        keyWordType: [              // 关重件
          {
            value: 1,
            label: 'TBOX'
          },
          {
            value: 2,
            label: 'SIM卡'
          },
          {
            value: 3,
            label: '电机'
          },
          {
            value: 4,
            label: '电池'
          }
        ],
        seriesType: [],             // 车系
        modelList: [],              // 车型列表
        colorType: [],              // 车身颜色
        baseType: [],               // 生产基地
        butorList: [],              // 经销商
        formLoading: false,
        ruleValidate: {
          vinCode: [
            {required: true, validator: handles.call(this, 'vin', 'VIN码'), trigger: 'blur'}
          ],
          carSeries: [
            {required: true, message: '请选择车系', trigger: 'change'}
          ],
          carType: [
            {required: true, message: '请选择车型', trigger: 'change'}
          ],
          machineNo: [
            {validator: handles.call(this, 'numberLetterCross', '电机号', true), trigger: 'blur'}
          ],
          // areaCode: [
          //   {validator: handles.call(this, 'stringNumber', '所属地区', true), trigger: 'blur'}
          // ],
          customerName: [
            {validator: handles.call(this, 'stringNumber', '客户名称', true), trigger: 'blur'}
          ],
          controlNo: [
            {validator: handles.call(this, 'noChinese', '控制器号', true), trigger: 'blur'}
          ],
          gearBoxNo: [
            {validator: handles.call(this, 'noChinese', '变速箱号', true), trigger: 'blur'}
          ],
          batteryPackNumber: [
            {validator: handles.call(this, 'noChinese', '电池组编号', true), trigger: 'blur'}
          ],
          gprsNo: [
            {required: true, validator: handles.call(this, 'noChinese', 'GPRS号'), trigger: 'blur'}
          ],
          deviceType: [
            {required: true, validator: handles.call(this, 'noChinese', '设备型号'), trigger: 'blur'}
          ],
          deviceClasses: [
            {required: true, validator: handles.call(this, 'number', '设备类别'), trigger: 'blur'}
          ],
          pseudoIp: [
            {required: true, validator: handles.call(this, 'noChinese', '伪IP'), trigger: 'blur'}
          ],
          simNumber: [
            {required: true, validator: handles.call(this, 'number', 'SIM卡号'), trigger: 'blur'}
          ],
          iccid: [
            {required: true, validator: handles.call(this, 'numberLetter', 'ICCID'), trigger: 'blur'}
          ],
          produceTime: [      // 生产日期
            {validator: checkProduce, trigger: 'blur'}
          ],
          releaseTime: [      // 出厂日期
            {validator: checkRelease, trigger: 'blur'}
          ],
          storageTime: [      // 入库日期
            {validator: checkStorage, trigger: 'blur'}
          ],
          customerPhone: [
            {validator: handles.call(this, 'phone', '手机号码', true), trigger: 'blur'}
          ],
          phoneNo: [
            {validator: handles.call(this, 'telPhone', '固定电话', true), trigger: 'blur'}
          ],
          email: [
            {validator: handles.call(this, 'email', '电子邮箱', true), trigger: 'blur'}
          ],
          otherChannel: [
            {validator: handles.call(this, 'noChinese', '其他联系方式', true), trigger: 'blur'}
          ],
          zipCode: [
            {validator: handles.call(this, 'zipCode', '邮政编码', true), trigger: 'blur'}
          ],
          orgIds: [
            {validator: handles.call(this, 'number', '组织机构ID', true), trigger: 'blur'}
          ],
          plateNo: [
            {validator: handles.call(this, 'license', '车牌号', true), trigger: 'blur'}
          ],
          commProtocolVersion: [
            {required: true, type: 'number', message: '请选择协议版本', trigger: 'change'}
          ],
          matrixVersion: [
            {required: true, type: 'number', message: '请选择矩阵版本', trigger: 'change'}
          ]
        },
        num: true,
        // 列表展示的数据
        columnType: 'index',
        columnsTitle: [
          {
            type: 'index',
            title: '序号',
            fixed: 'left',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            fixed: 'left',
            width: 165,
            key: 'vinCode'
          },
          {
            title: 'GPRS号',
            width: 165,
            key: 'gprsNo'
          },
          {
            title: '车系',
            width: 100,
            key: 'carSeries'
          },
          {
            title: '车型',
            width: 230,
            key: 'carType'
          },
          {
            title: '车牌号',
            width: 130,
            key: 'plateNo'
          },
          {
            title: '车辆状态',
            width: 130,
            key: 'status',
            render: (h, params) => {
              return this.__filters.vehicleStatus(h, params, 'status');
            }
          },
          {
            title: '经销商',
            width: 230,
            key: 'dealerName'
          },
          {
            title: '电机号',
            width: 230,
            key: 'machineNo'
          },
          {
            title: '电池组编号',
            width: 230,
            key: 'batteryPackNumber'
          },
          {
            title: '车辆来源',
            width: 230,
            key: 'vehicleSource`',
            render: (h, params) => {
              return params.row.vehicleSource === 0 ? '页面添加' : (params.row.vehicleSource === 1 ? '一车一档同步' : '');
            }
          },
          {
            title: '备注',
            width: 220,
            key: 'remark'
          },
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 190,
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.getDetail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this.buttonShow('车辆修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null,
                this.buttonShow('车辆删除') && params.row.vehicleSource !== 1 ? this._hyTool.createIcon(h, params, this.deleteById, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true},
                  {marginRight: '5px', color: 'red'}) : null,
                this._hyTool.createIcon(h, params, this.getKeyWordStart, '关重件变更记录', {color: '#4784ff', type: 'gonggaobiangeng', size: '20', content: '关重件变更记录', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        keyWordTitle: [
          {
            title: 'VIN码',
            width: 165,
            fixed: 'left',
            key: 'vinCode'
          },
          {
            title: '车系',
            width: 80,
            key: 'carSeries'
          },
          {
            title: '关重件',
            key: 'keyWord',
            width: 80,
            render: (h, params) => {
              return this.__filters.keyWordType(h, params, 'keyWord');
            }
          },
          {
            title: '原ID',
            width: 141,
            key: 'oldId'
          },
          {
            title: '新ID',
            width: 150,
            key: 'newId'
          },
          {
            title: '变更时间',
            key: 'modifyTime',
            width: 150,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'modifyTime');
            }
          }
        ],
        keyPartTitle: [
          {
            title: '条码',
            width: 240,
            key: 'partsBarcode'
          },
          {
            title: '物料编码',
            maxWidth: 130,
            key: 'materialCode'
          },
          {
            title: '零件部件名称',
            // width: 130,
            key: 'part'
          },
          {
            title: '类型/规格号',
            maxWidth: 220,
            key: 'type'
          },
          {
            title: '供应商',
            // width: 220,
            key: 'supplier'
          },
          {
            title: '批次号',
            maxWidth: 120,
            key: 'batchCode'
          },
          {
            title: '操作员',
            maxWidth: 100,
            key: 'operator'
          },
          {
            title: '安装时间',
            maxWidth: 120,
            key: 'proDate',
            render: (h, params) => {
              if (params.row.proDate) {
                return this._hyTool.DateFormat(new Date(+params.row.proDate), 'yyyy-MM-dd');
              }
            }
          },
          {
            title: '备注',
            maxWidth: 100,
            key: 'remarks'
          }
        ]
      };
    },
    created () {
      this.getSeries();
      this.getAllButor();
    },
    mounted () {
      let vin = this.$route.query.vin;
      if (vin) {
        this.searchData.vinCode = vin;
      }
    },
    computed: {
      ...mapState([
        'taskNum'
      ])
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      // 列表
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        vehicleListAll(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车辆列表失败',
            desc: ret
          });
        });
      },
      // 添加、修改弹框
      addOrUpdate (row) {
        this.num = true;
        if (row) {
          this.modalTitle = '修改';
          this.vehicleArchives = this._hyTool.extend({}, row);
          this.reData = this._hyTool.extend({}, row);
          if (this.vehicleArchives.produceTime) {
            this.vehicleArchives.produceTime = new Date(Number.parseInt(this.vehicleArchives.produceTime));
            this.reData.produceTime = new Date(Number.parseInt(this.reData.produceTime));
          }
          if (this.vehicleArchives.releaseTime) {
            this.vehicleArchives.releaseTime = new Date(Number.parseInt(this.vehicleArchives.releaseTime));
            this.reData.releaseTime = new Date(Number.parseInt(this.reData.releaseTime));
          }
          if (this.vehicleArchives.storageTime) {
            this.vehicleArchives.storageTime = new Date(Number.parseInt(this.vehicleArchives.storageTime));
            this.reData.storageTime = new Date(Number.parseInt(this.reData.storageTime));
          }
          // if (this.vehicleArchives.certificateDate) {
          //   this.vehicleArchives.certificateDate = new Date(Number.parseInt(this.vehicleArchives.certificateDate));
          //   this.reData.certificateDate = new Date(Number.parseInt(this.reData.certificateDate));
          // }
          if (this.vehicleArchives.soldDate) {
            this.vehicleArchives.soldDate = new Date(Number.parseInt(this.vehicleArchives.soldDate));
            this.reData.soldDate = new Date((this.reData.soldDate));
          }
           this.getModels(this.vehicleArchives.carSeries);
        } else {
          this.modalTitle = '新增';
          this.vehicleArchives = {
            vinCode: '',
            carSeries: '',
            carType: '',
            carColor: '',
            configuration: '',
            batteryType: '',
            machineNo: '',
            controlNo: '',
            gearBoxNo: '',
            batteryPackNumber: '',
            gprsNo: '',
            factoryName: '',
            produceTime: '',
            releaseTime: '',
            storageTime: '',
            sendTo: '',
            status: '',
            areaCode: '',
            commProtocolVersion: 0,
            matrixVersion: 0,
            deviceType: '',
            pseudoIp: '',
            simNumber: '',
            iccid: '',
            customerName: '',
            customerPhone: '',
            dealerId: '',
            plateNo: '',
            // certificateDate: '',
            soldDate: '',
            remark: ''
          };
          this.modalAddFormShow = true;
        }
        this.formLoading = false;
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['vehicleArchives'].validate((valid) => {
          if (valid) {
            vehicleSave({}, this.vehicleArchives, res => {
              this.$Notice.success({
                desc: `${this.modalTitle}成功`
              });
              this.modalAddFormShow = false;
              this.currentChange(1);
            }, ret => {
              this.formLoading = false;
              this.$Notice.error({
                title: `${this.modalTitle}失败`,
                desc: ret
              });
            });
          } else {
            this.formLoading = false;
          }
        });
      },
      // 取消新增或修改
      returnAdd () {
        if (this.vehicleArchives.id) {
          this.vehicleArchives = this._hyTool.extend({}, this.reData);
        } else {
          this.$refs['vehicleArchives'].resetFields();
          this.modelList = [];
        }
      },
      returnShow () {
        this.$refs['vehicleArchives'].resetFields();
        this.modelList = [];
      },
      // 删除
      deleteById (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vehicleDelete({ids: params.id}, res => {
            this.currentChange(1);
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
      // 获取所有车系,车身颜色,生产基地
      getSeries () {
        let apiType = [
          { name: listUse, label: '车系', type: 1 },
          { name: colorListUse, label: '车身颜色', type: 2 },
          { name: baseListUse, label: '生产基地', type: 3 }
        ];
        for (let item of apiType) {
          item.name(null, res => {
            if (item.type === 1) {
              this.seriesType = this._hyTool.deleteObject(res, 'vehicleSeries');  // object 去重
            } else if (item.type === 2) {
              this.colorType = res;
            } else if (item.type === 3) {
              this.baseType = res;
            }
          });
        }
      },
      // 获取所有经销商
      getAllButor () {
        butorList({bizStatus: 11080010}, res => {
          this.butorList = res;
        });
      },
      // 获取车系对应车型
      getModels (row, type) {
        if (!row) {
          if (!type) {
            this.modalAddFormShow = true;
          }
          return;
        }
        let param = {
          vehicleSeries: row
        };
        modelList(param, res => {
          let _this = this;
          _this.modelList = res;
          if (type === 'change' && !_this.num) {
            delete _this.vehicleArchives.carType;
          } else {
            _this.modalAddFormShow = true;
            _this.num = true;
          }
          if (type === 'change') this.num = false;
        });
      },
      // 获取车系对应车型
      getModels1 (row) {
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
        this.num = false;
      },
      // 详情
      getDetail (row) {
        this.vehicleDetail = this._hyTool.deepCopy(row);
        if (this.vehicleDetail.dealerId === 0) {
          this.vehicleDetail.dealerId = '';
        }
        this.vehicleDetail.produceTime = this.vehicleDetail.produceTime === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.produceTime), 'yyyy-MM-dd');
        this.vehicleDetail.releaseTime = this.vehicleDetail.releaseTime === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.releaseTime), 'yyyy-MM-dd');
        this.vehicleDetail.storageTime = this.vehicleDetail.storageTime === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.storageTime), 'yyyy-MM-dd');
        // this.vehicleDetail.certificateDate = this.vehicleDetail.certificateDate === undefined ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.certificateDate), 'yyyy-MM-dd');
        this.vehicleDetail.soldDate = (this.vehicleDetail.soldDate === undefined || this.vehicleDetail.soldDate < 0) ? null : this._hyTool.DateFormat(new Date(+this.vehicleDetail.soldDate), 'yyyy-MM-dd');
        this.modalFormItem = [
          {
            key: 'vinCode',
            title: 'VIN码'
          },
          {
            key: 'carSeries',
            title: '车系'
          },
          {
            key: 'carType',
            title: '车型'
          },
          {
            key: 'carColor',
            title: '车辆颜色'
          },
          {
            key: 'configuration',
            title: '配置',
            array: this.configuration
          },
          {
            key: 'batteryType',
            title: '电池类型',
            array: this.batteryType
          },
          {
            key: 'machineNo',
            title: '电机号'
          },
          {
            key: 'controlNo',
            title: '控制器号'
          },
          {
            key: 'gearBoxNo',
            title: '变速箱号'
          },
          {
            key: 'batteryPackNumber',
            title: '电池组编号'
          },
          {
            key: 'gprsNo',
            title: 'GPRS号'
          },
          {
            key: 'factoryName',
            title: '生产基地'
          },
          {
            key: 'produceTime',
            title: '生产日期'
          },
          {
            key: 'releaseTime',
            title: '出厂日期'
          },
          {
            key: 'storageTime',
            title: '入库日期'
          },
          {
            key: 'sendTo',
            title: '销往地',
            array: this.sendTo
          },
          {
            key: 'status',
            title: '车辆状态',
            array: this.status
          },
          // {
          //   key: 'areaCode',
          //   title: '所属地区'
          // },
          {
            key: 'commProtocolVersion',
            title: '协议版本',
            array: this.commProtocolVersionArray
          },
          {
            key: 'matrixVersion',
            title: '矩阵版本',
            array: this.matrixVersionArray
          },
          {
            key: 'deviceType',
            title: '设备型号'
          },
          {
            key: 'pseudoIp',
            title: '伪IP'
          },
          {
            key: 'simNumber',
            title: 'SIM卡号'
          },
          {
            key: 'iccid',
            title: 'ICCID'
          },
          {
            key: 'customerName',
            title: '客户名称'
          },
          {
            key: 'customerPhone',
            title: '手机号码'
          },
          {
            key: 'dealerName',
            title: '经销商名称'
          },
          {
            key: 'plateNo',
            title: '车牌号'
          },
          // {
          //   key: 'certificateDate',
          //   title: '合格证日期'
          // },
          {
            key: 'certificateNo',
            title: '合格证号'
          },
          {
            key: 'soldDate',
            title: '销售日期'
          },
          {
            key: 'vehicleSource',
            title: '车辆来源',
            array: [{value: 0, label: '页面添加'}, {value: 1, label: '一车一档同步'}]
          },
          {
            key: 'isActivation',
            title: '是否激活',
            array: [{value: 0, label: '否'}, {value: 1, label: '是'}]
          },
          {
            key: 'channelCode',
            title: '链路编码'
          },
          {
            key: 'remark',
            title: '备注'
          }
        ];
        keyPart({vinCode: row.vinCode}, res => {
          this.keyPartList = res;
        }, ret => {
          this.keyPartList = [];
          this.$Notice.error({
            title: '查询关重件信息失败',
            desc: ret
          });
        });
        this.modalDetailShow = true;
      },
      showModel (data) {
        if (data === false) {
          this.name = 0;
        }
      },
      changeTabs (index) {
        if (index === 1) {
          this.tabsHeight.height = '100%';
        } else {
          this.tabsHeight.height = '850px';
        }
      },
      // 选择经销商id
      changeDealer (row) {
        if (!row) {
          this.vehicleArchives.dealerName = '';
          return;
        }
        for (let item of this.butorList) {
          if (item.dealerId === row) {
            this.vehicleArchives.dealerName = item.dealerName;
            break;
          }
        }
      },
      // 关重件变更列表
      getKeyWord (flag) {
        // 查询按钮
        if (flag) this.searchPageKey = this._hyTool.extend({}, this.searchKey);
        keyWordList(this.searchPageKey, res => {
          this.wordTotalElement = res.totalElements;
          this.wordTotalPage = res.totalPages;
          this.wordList = res.content ? res.content : [];
          this.loading1 = false;
        }, ret => {
          this.loading1 = false;
          this.$Notice.error({
            title: '查询关重件变更列表失败',
            desc: ret
          });
        });
      },
      // 弹出框
      getKeyWordStart (row) {
        if (row) {
          this.searchKey.vinCode = row.vinCode;
          this.searchPageKey = this._hyTool.extend({}, this.searchKey);
        }
        this.keywordsShow = true;
        this.getKeyWord();
      },
      // 翻页
      changeWord (val, flag) {
        this.loading1 = true;
        if (val) {
          this.searchKey.pageNum = val;
          this.searchPageKey.pageNum = val;
        }
        // 获取列表
        this.getKeyWord(flag);
      },
      // 取消新增或修改
      closeKey () {
        this.searchKey.pageNum = 1;
        this.searchKey.keyWord = '';
      },
      // 导出
      exports () {
        if (!this.list.length) {
          this.$confirm('无导出数据', '提示', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          return;
        }
        vehicleExport(this.searchData, res => {
          this.TASK_NUM(this.taskNum + 1);
          this.$confirm('已加入下载任务', '提示', {
            confirmButtonText: '知道了',
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
        }, ret => {
          this.$Notice.error({
            title: '加入下载列表失败',
            desc: ret
          });
        });
      }
    }
  };
</script>
