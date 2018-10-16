/**
* 地标实时报警
* 2018-01-08
* zyb
**/
<style lang="scss" scoped>
  .map {
    min-width: 500px;
    min-height: 400px;
    margin-top: 10px;
  }
  .hy-sleft {
    width: 100%;
    float: left;
  }
  .hy-sright {
    display:inline-block;
    // width: 20%;
    // float: right;
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
      <div class="hy-tool-kong">
      </div>
      <Tabs  @on-click="getHistory" :value="name">
        <TabPane label="实时报警" name="current">
          <div class="hy-search-bar2 userCenter" style="height: auto;">
            <div class="hy-sleft">
              <Form label-position="right" inline :label-width="10">
                <FormItem label="">
                  <Select
                    placeholder="VIN码"
                    style="width: 200px;"
                    v-model="searchData.vin"
                    filterable
                    remote
                    transfer
                    clearable
                    :remote-method="vinMethod"
                    ref="select"
                    :not-found-text="notFoundText"
                    :loading="loading1">
                    <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
                  </Select>
                </FormItem>
                <!--<FormItem label="">-->
                <!--<i-input placeholder="报警内容" v-model="searchData.alarmContent" style="width:200px;"></i-input>-->
                <!--</FormItem>-->
                <FormItem label="">
                  <Select
                    placeholder="报警编码"
                    style="width: 200px;"
                    v-model="searchData.alarmCode"
                    filterable
                    remote
                    transfer
                    clearable
                    :remote-method="alarmCodeMethod"
                    :loading="loading1">
                    <Option v-for="(option, index) in optionsCode" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="">
                  <DatePicker type="datetime" v-model="searchData.timeBegin" :options="disabledDate" placement="bottom" placeholder="报警开始时间" style="width: 200px;"></DatePicker>
                </FormItem>
                <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
                <FormItem label="">
                  <DatePicker type="datetime" v-model="searchData.timeEnd" :options="disabledDate" placement="bottom" placeholder="结束时间" style="width: 200px;"></DatePicker>
                </FormItem>
                <FormItem label="">
                  <i-select placeholder="故障等级" v-model="searchData.dbLevel" clearable filterable style="width:200px;">
                    <Option v-for="item in level" :value="item.value" :key="item.value" :label="item.label">
                      {{ item.label }}
                    </Option>
                  </i-select>
                </FormItem>
                <FormItem label="">
                  <i-input placeholder="报警内容" v-model.trim="searchData.alarmContent" style="width:200px;" clearable></i-input>
                </FormItem>
                <FormItem label="">
                  <i-select placeholder="报警状态" v-model="searchData.alarmStatus" clearable filterable style="width:200px;">
                    <i-option value="0">未处理</i-option>
                    <i-option value="1">处理中</i-option>
                    <i-option value="2">已处理</i-option>
                  </i-select>
                </FormItem>
                <div class="hy-sright">
                  <i-button type="success" icon="ios-search" @click="_getList(1, true, 'real')" shape="circle" :loading="loading"
                            class="search">查询
                  </i-button>
                  <i-button type="success" @click="exports" shape="circle"
                            style="margin-left: 10px;margin-top: 1px;font-size: 16px;" class="export">导出
                  </i-button>
                </div>
              </Form>
            </div>
            <div class="clearfix"></div>
          </div>
          <hy-table :column-type="columnAuthType" :columnsTitle="columnsAuthTitle" :list="list" :on-selection-change="handleSelectionChange"
                    :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
          </hy-table>
          <!-- 分页 -->
          <hy-page
            :current-page="searchData.pageNum"
            :total-element="totalElement"
            :total-page="totalPage"
            @current-change="_getList"></hy-page>
        </TabPane>
        <TabPane label="历史报警" name="history">
          <div class="hy-search-bar2 userCenter" style="height: auto;">
            <div class="hy-sleft">
              <Form label-position="right" inline :label-width="10">
                <FormItem label="">
                  <Select
                    placeholder="VIN码"
                    style="width: 200px"
                    v-model="searchData.vin"
                    filterable
                    remote
                    transfer
                    clearable
                    :remote-method="vinMethod"
                    ref="historySelect"
                    :not-found-text="notFoundText"
                    :loading="loading1">
                    <Option v-for="(option, index) in optionsVin" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="">
                  <Select
                    placeholder="报警编码"
                    style="width: 200px"
                    v-model="searchData.alarmCode"
                    filterable
                    remote
                    transfer
                    clearable
                    :remote-method="alarmCodeMethod"
                    :loading="loading1">
                    <Option v-for="(option, index) in optionsCode" :value="option.value" :key="index" :label="option.value">{{option.label}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="">
                  <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeBegin" placement="bottom" placeholder="报警开始时间" style="width: 200px;"></DatePicker>
                </FormItem>
                <FormItem style="margin: 0;margin-left: -10px;">-</FormItem>
                <FormItem label="">
                  <DatePicker type="datetime" :options="disabledDate" v-model="searchData.timeEnd" placement="bottom" placeholder="报警结束时间" style="width: 200px;"></DatePicker>
                </FormItem>
                <FormItem label="">
                  <i-select placeholder="故障等级" v-model="searchData.dbLevel" clearable filterable style="width:200px;">
                    <Option v-for="item in level" :value="item.value" :key="item.value" :label="item.label">
                      {{ item.label }}
                    </Option>
                  </i-select>
                </FormItem>
                <FormItem label="">
                  <i-input placeholder="报警内容" v-model.trim="searchData.alarmContent" style="width:200px;" clearable></i-input>
                </FormItem>
                <FormItem label="">
                  <i-select placeholder="报警状态" v-model="searchData.alarmStatus" clearable filterable style="width:200px;">
                    <i-option value="0">未处理</i-option>
                    <i-option value="1">处理中</i-option>
                    <i-option value="2">已处理</i-option>
                    <i-option value="3">已关闭</i-option>
                  </i-select>
                </FormItem>
                <div class="hy-sright">
                  <i-button type="success" icon="ios-search" @click="_getList(1, true, 'history')" shape="circle" :loading="loading"
                            class="search">查询
                  </i-button>
                  <i-button type="success"  @click="exports" shape="circle"
                            style="margin-left: 10px;margin-top: 1px;font-size: 16px;" class="export">导出
                  </i-button>
                </div>
              </Form>
            </div>
            <div class="clearfix"></div>
          </div>
          <hy-table :column-type="columnAuthType" :columnsTitle="historyTitle" :list="list" :on-selection-change="handleSelectionChange"
                    :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noDataText">
          </hy-table>
          <!-- 分页 -->
          <hy-page
            :current-page="searchData.pageNum"
            :total-element="totalElement"
            :total-page="totalPage"
            @current-change="_getList"></hy-page>
        </TabPane>
        <el-upload
          class="upload-demo"
          ref="upload"
          slot="extra"
          action=""
          :multiple="false"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :limit="1">
          <Button type="ghost" icon="ios-cloud-upload-outline">导入报警处理</Button>
        </el-upload>
        <!--处理-->
        <Modal v-model="handleShow" :mask-closable="false" width="800" :styles="{top: '20px'}">
          <p slot="header" class="hy-modal-title">
            <span>{{textData.text}}</span>
          </p>
          <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
            <Form :model="handleData" :label-width="100">
              <Row>
                <Col span="12">
                  <FormItem label="报警编码">
                    {{handleData.alarmCode}}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="VIN码">
                    {{handleData.vin}}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="统计时间" v-if="this.type !== 0">
                    {{handleData.statisticsTime | formatTime}}
                  </FormItem>
                  <FormItem label="接收时间" v-if="this.type === 0">
                    {{handleData.createTime | formatTime}}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="GPRS号">
                    {{handleData.gprs}}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="报警时间">
                    {{handleData.startTime | formatTime}}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="结束时间" v-if="this.type !== 0">
                    {{handleData.endTime | formatTime}}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="报警来源">
                    {{handleData.alarmSource}}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="故障等级">
                    {{handleData.dbLevel | alarmLevel}}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="报警内容">
                    {{handleData.alarmContent}}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="持续时间" v-if="this.type !== 0">
                    {{handleData.continuedTime}}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="报警条数" v-if="this.type !== 0">
                    {{handleData.alarmCount}}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="状态">
                    {{handleData.alarmStatus | alarmStatus}}
                  </FormItem>
                </Col>
              </Row>
              <Row v-if="handleData.alarmStatus === 2">
                <Col span="12">
                  <FormItem label="处理人">
                    {{handleData.handleUser}}
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="处理时间">
                    {{handleData.handleTime | formatTime}}
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="处理方式" v-if="handleData.alarmStatus === 1">
                <i-input type="textarea" v-model="handleData.handle" placeholder="处理方式" :maxlength="85" :rows="5" clearable style="width: 500px;"></i-input>
              </FormItem>
              <FormItem label="处理方式" v-else>
                {{handleData.handle}}
              </FormItem>
            </Form>
          </div>
          <div slot="footer">
            <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">{{textData.button}}</Button>
            <Button type="ghost" style="margin-left: 8px" @click="handleShow = false;handleData.handle = ''">取消</Button>
          </div>
        </Modal>
        <!--详情-->
        <Modal v-model="modalDetailShow" :mask-closable="false" width="800" :styles="{top: '20px'}">
          <p slot="header" class="hy-modal-title">
            <span>处理详情</span>
          </p>
          <div style="text-align:left">
            <hy-detail :form="handleData" :rowData="modalFormItem" v-if="modalDetailShow"></hy-detail>
          </div>
          <div slot="footer">
            <Button type="ghost" style="margin-left: 8px" @click="modalDetailShow = false">关闭</Button>
          </div>
        </Modal>
      </Tabs>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import date from '@/js/mixins/date';
  import button from '@/js/mixins/button';
  import HyDetail from '@/components/common/detail/detail.vue';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import { realTimeAlarm, historyAlarm, currentExport, historyExport, gbHandle, gbClose, currentHandle, importHandle } from '@/service/alarmService/nationalStandard';
  import { mapState, mapMutations } from 'vuex';
  import { queryParam } from '@/service/alarmService/queryParam';
  import storeVin from '@/js/mixins/storeVin/storeVin';

  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list, date, button, storeVin],
    data () {
      return {
        searchData: {
          type: 2,
          notifyOwner: '',
          status: '',
          gbLevel: ''
        },
        startEndTime: '',
        loading: false,
        loading1: false,
        clickRealSearch: false, // 是否点击查询
        clickHistorySearch: false, // 是否点击查询
        type: 0,
        name: '',
        optionsCode: [], // 报警编码列表
        modalFormItem: [],
        modalTitle: '',
        form: {},
        handleShow: false,
        formLoading: false,
        textData: {
          text: '报警处理',
          button: '确定'
        },
        handleData: {},
        modalDetailShow: false,
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 220,
            key: 'vin'
          },
          {
            title: '报警编码',
            key: 'alarmCode',
            width: 170
          },
          {
            title: '报警内容',
            width: 300,
            key: 'alarmContent'
          },
          {
            title: 'GPRS号',
            key: 'gprs',
            width: 220
          },
          {
            title: '报警时间',
            key: 'startTime',
            width: 220,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            title: '接收时间',
            key: 'createTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'createTime');
            }
          },
          {
            title: '报警来源',
            width: 185,
            key: 'alarmSource'
          },
          {
            title: '故障等级',
            width: 150,
            key: 'dbLevel',
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, null, 'dbLevel')
              ]);
            }
          },
          {
            title: '状态',
            key: 'alarmStatus',
            width: 160,
            render: (h, params) => {
              return this.__filters.alarmStatus(h, params, 'alarmStatus', this.getStatus);
            }
          },
          {
            title: '操作',
            width: 100,
            fixed: 'right',
            key: 'action',
            render: (h, params) => {
              let [title, name, color, size, type] = ['', '', '#9BE298', 20, ''];
              if (params.row['alarmStatus'] === 0) {
                title = '开始处理';
                name = 'dengdaichuli';
                type = '地标开始';
              } else if (params.row['alarmStatus'] === 1) {
                title = '处理';
                name = 'chulizhong';
                //  color = '#0021e2';
                size = 18;
                type = '地标处理';
              }
              return h('div', [
                params.row.commProtocolVersion === 0 ? this._hyTool.createIcon(h, params, this.detail, '报警详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '报警详情', placement: 'top', showTransfer: true}) : null,
                params.row['alarmStatus'] === 2 ? this._hyTool.createIcon(h, params, this.openModel, '处理详情', {color: '#9BE298', type: 'xiangqing1', size: 18, content: '处理详情', placement: 'top', showTransfer: true}) : null,
                this.buttonShow(type) ? this._hyTool.createIcon(h, params, this.openModel, title, {color: color, type: name, size: size, content: title, placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
        ],
        historyTitle: [
          {
            type: 'index',
            title: '序号',
            width: 80,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 165,
            key: 'vin'
          },
          {
            title: '报警编码',
            key: 'alarmCode',
            width: 170
          },
          {
            title: '报警内容',
            key: 'alarmContent',
            width: 300
          },
          {
            title: '统计时间',
            key: 'statisticsTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'statisticsTime');
            }
          },
          {
            title: 'GPRS号',
            width: 160,
            key: 'gprs'
          },
          {
            title: '报警开始时间',
            key: 'startTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'startTime');
            }
          },
          {
            title: '报警结束时间',
            key: 'endTime',
            width: 160,
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'endTime');
            }
          },
          {
            title: '报警来源',
            width: 85,
            key: 'alarmSource'
          },
          {
            title: '故障等级',
            key: 'dbLevel',
            width: 85,
            render: (h, params) => {
              return h('div', [
                this.__filters.gbLevel(h, params, null, 'dbLevel')
              ]);
            }
          },
          {
            title: '持续时间',
            key: 'continuedTime',
            width: 200,
            render: (h, params) => {
              return this._hyTool.MillisecondToDate(params.row.endTime - params.row.startTime);
            }
          },
          {
            title: '报警条数',
            width: 140,
            key: 'alarmCount'
          },
          {
            title: '状态',
            key: 'alarmStatus',
            width: 160,
            render: (h, params) => {
              return this.__filters.alarmStatus(h, params, 'alarmStatus', this.getStatus);
            }
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (h, params) => {
              let [title, name, color, size, type] = ['', '', '#9BE298', 20, ''];
              if (params.row['alarmStatus'] === 0) {
                title = '开始处理';
                name = 'dengdaichuli';
                type = '地标开始';
              } else if (params.row['alarmStatus'] === 1) {
                title = '处理';
                name = 'chulizhong';
                //  color = '#0021e2';
                size = 18;
                type = '地标处理';
              } else if (params.row['alarmStatus'] === 2) {
                title = '关闭';
                name = 'yichuli';
                size = 18;
                type = '地标关闭';
              }
              return h('div', [
                params.row.commProtocolVersion === 0 ? this._hyTool.createIcon(h, params, this.detail, '报警详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '报警详情', placement: 'top', showTransfer: true}) : null,
                params.row['alarmStatus'] === 3 ? this._hyTool.createIcon(h, params, this.openModel, '处理详情', {color: '#9BE298', type: 'xiangqing1', size: 18, content: '处理详情', placement: 'top', showTransfer: true}) : null,
                this.buttonShow(type) ? this._hyTool.createIcon(h, params, this.openModel, title, {color: color, type: name, size: size, content: title, placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
        ]
      };
    },
    computed: {
      ...mapState([
        'level',
        'taskNum'
      ])
    },
    mounted () {
      this.watchVin('historySelect'); // 搜过的vin码
      this.watchVin('select'); // 搜过的vin码
      this.getAlarmCodeList();
    },
    methods: {
      ...mapMutations([
        'TASK_NUM'
      ]),
      _getList (page, flag, type) {
        if (window.sessionStorage.getItem('alarmParams') && JSON.stringify(this.$route.query.clickRealSearch)) {
          let detailPara = JSON.parse(this._hyTool.getStore('alarmParams'));
          let queSearch = this.$route.query;
          this.clickRealSearch = JSON.parse(queSearch.clickRealSearch);
          this.clickHistorySearch = JSON.parse(queSearch.clickHistorySearch);
          this._hyTool.removeStore('alarmParams');
          if (detailPara.flag === 2) {
            this.searchData = detailPara.searchData;
            if (detailPara.searchData.startTimeBegin && detailPara.searchData.startTimeEnd) {
              this.searchData.timeBegin = new Date(detailPara.searchData.startTimeBegin);
              this.searchData.timeEnd = new Date(detailPara.searchData.startTimeEnd);
            }
            this.searchPageData = this.searchData;
            this.type = 1;
            this.name = 'history';
            //  setTimeout(() => {
            this._getList(this.searchPageData.pageNum, this.clickHistorySearch);
            //   }, 500);
          }
          if (detailPara.flag === 1) {
            this.searchData = detailPara.searchData;
            if (detailPara.searchData.startTimeBegin && detailPara.searchData.startTimeEnd) {
              this.searchData.timeBegin = new Date(detailPara.searchData.startTimeBegin);
              this.searchData.timeEnd = new Date(detailPara.searchData.startTimeEnd);
            }
            this.searchPageData = this.searchData;
            this.type = 0;
            this.name = 'current';
            //  setTimeout(() => {
            this._getList(this.searchPageData.pageNum, this.clickRealSearch);
            //  }, 500);
          }
          //  this._hyTool.removeStore('alarmParams');
        } else {
          this._hyTool.removeStore('alarmParams');
          if (this.searchData.timeBegin) {
            this.searchData.startTimeBegin = new Date(this.searchData.timeBegin).getTime();
          } else {
            delete this.searchData.startTimeBegin;
          }
          if (this.searchData.timeEnd) {
            this.searchData.startTimeEnd = new Date(this.searchData.timeEnd).getTime();
          } else {
            delete this.searchData.startTimeEnd;
          }
          if (this.searchData.startTimeBegin && this.searchData.startTimeEnd) {
            let bol = this.checkDate(this.searchData.startTimeBegin, this.searchData.startTimeEnd, 7);
            if (!bol) {
              if (this.isFirst) return;
              this.$Notice.warning({
                title: '',
                desc: '开始时间与结束时间间隔不能超过7天',
                onClose: () => {
                  this.isFirst = false;
                }
              });
              this.isFirst = true;
              return;
            }
            if (this.searchData.timeBegin > this.searchData.timeEnd) {
              if (this.isFirst) return;
              this.$Notice.warning({
                title: '',
                desc: '开始时间不能大于结束时间',
                onClose: () => {
                  this.isFirst = false;
                }
              });
              this.isFirst = true;
              return;
            }
          }
          this.loading = true;
          if (page) {
            this.searchData.pageNum = page;
            this.searchPageData.pageNum = page;
          }
          if (type === 'real') this.clickRealSearch = true;
          if (type === 'history') this.clickHistorySearch = true;
          if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
          if (this.type === 0) {
            realTimeAlarm(this.searchPageData, this.callback, ret => {
              this.loading = false;
              this.$Notice.error({
                title: '查询实时报警失败',
                desc: ret
              });
            });
          } else {
            historyAlarm(this.searchPageData, this.callback, ret => {
              this.loading = false;
              this.$Notice.error({
                title: '查询历史报警失败',
                desc: ret
              });
            });
          }
        }
        if (this.searchData.vin) this.storeVin(this.searchData.vin);  // 存储搜索的vin
      },
      // 查询
      search () {
        if (this.searchData.timeBegin) {
          this.searchData.startTimeBegin = new Date(this.searchData.timeBegin).getTime();
        } else {
          delete this.searchData.startTimeBegin;
        }
        if (this.searchData.timeEnd) {
          this.searchData.startTimeEnd = new Date(this.searchData.timeEnd).getTime();
        } else {
          delete this.searchData.startTimeEnd;
        }
        if (this.searchData.startTimeBegin && this.searchData.startTimeEnd) {
          let bol = this.checkDate(this.searchData.startTimeBegin, this.searchData.startTimeEnd, 7);
          if (!bol) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '开始时间与结束时间间隔不能超过7天',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
          if (this.searchData.timeBegin > this.searchData.timeEnd) {
            if (this.isFirst) return;
            this.$Notice.warning({
              title: '',
              desc: '开始时间不得晚于结束日期时间',
              onClose: () => {
                this.isFirst = false;
              }
            });
            this.isFirst = true;
            return;
          }
        }
        this.currentChange(1);
      },
      // tabs
      getHistory (key) {
        this.list = [];
        this.startEndTime = '';
        this.searchData = {
          type: 2,
          pageSize: 10,
          pageNum: 1
        };
        setTimeout(() => {
          if (key === 'current') {
            this.type = 0;
          } else if (key === 'history') {
            this.type = 1;
          }
          this._getList(1, true);
        }, 800);
      },
      // 详情跳转
      detail (row) {
        let params = {};
        let que = {};
        if (this.type === 0) {
          params = {
            vin: row.vin,
            searchData: this.searchPageData,
            collectTime: row.startTime,
            type: 2,     // 区分3种报警详情
            currentPage: this.searchData.pageNum,
            flag: 1      // 实时
          };
        } else {
          params = {
            vin: row.vin,
            // startTime: row.startTime,
            // endTime: row.endTime,
            collectTime: row.startTime,
            searchData: this.searchPageData,
            currentPage: this.searchData.pageNum,
            type: 2,     // 区分3种报警详情
            flag: 2      // 历史
          };
        }
        que = {
          clickRealSearch: this.clickRealSearch,
          clickHistorySearch: this.clickHistorySearch
        };
        if (!window.sessionStorage.getItem('alarmParams')) {
          this._hyTool.setStore('alarmParams', params);
          this.$router.push({path: '/main/alarm/alarmDetail', query: que});
        }
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
        let apiType = null;
        if (this.type === 0) {
          apiType = currentExport;
        } else {
          apiType = historyExport;
        }
        apiType(this.searchData, res => {
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
      },
      // 报警编码
      getAlarmCodeList () {
        queryParam({field: 'alarm_code'}, res => {
          this.alarmCodeList = res.map(item => {
            return {value: item, label: item};
          });
        });
      },
      // 报警编码搜索
      alarmCodeMethod (query) {
        if (query !== '') {
          this.loading1 = true;
          setTimeout(() => {
            this.loading1 = false;
            this.optionsCode = this.alarmCodeList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.optionsCode = [];
        }
      },
      // 处理
      openModel (row) {
        this.handleData = this._hyTool.extend({}, row);
        if (row.alarmStatus === 0) {
          this.$confirm('确定开始处理？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let apiType = null;
            if (this.type === 0) {
              apiType = currentHandle;
            } else {
              apiType = gbHandle;
            }
            apiType({}, row, res => {
              setTimeout(() => {
                this.$Notice.success({
                  title: '',
                  desc: '处理成功'
                });
              }, 500);
              this.currentChange(this.searchData.pageNum);
            }, ret => {
              setTimeout(() => {
                this.$Notice.error({
                  title: '处理失败',
                  desc: ret
                });
              }, 500);
            });
          });
        } else if (row.alarmStatus === 1) {
          this.textData = {
            text: '报警处理',
            button: '确定'
          };
          if (row.endTime && row.startTime) {
            this.handleData.continuedTime = this._hyTool.MillisecondToDate(row.endTime - row.startTime);
          } else {
            this.handleData.continuedTime = '';
          }
          this.handleShow = true;
          this.handleData.continuedTime = this._hyTool.MillisecondToDate(this.handleData.endTime - this.handleData.startTime);
        } else if (row.alarmStatus === 2 && this.type === 1) {
          this.textData = {
            text: '报警关闭',
            button: '确定'
          };
          if (row.endTime && row.startTime) {
            this.handleData.continuedTime = this._hyTool.MillisecondToDate(row.endTime - row.startTime);
          } else {
            this.handleData.continuedTime = '';
          }
          this.handleShow = true;
          this.handleData.continuedTime = this._hyTool.MillisecondToDate(this.handleData.endTime - this.handleData.startTime);
        } else if (row.alarmStatus === 3 || (row.alarmStatus === 2 && this.type === 0)) {
          if (this.type === 1) {
            if (this.handleData.endTime && this.handleData.startTime) {
              this.handleData.continuedTime = this._hyTool.MillisecondToDate(this.handleData.endTime - this.handleData.startTime);
            } else {
              this.handleData.continuedTime = '';
            }
            this.handleData.statisticsTime = this._hyTool.DateFormat(new Date(+this.handleData.statisticsTime), 'yyyy-MM-dd hh:mm:ss');
            this.handleData.endTime1 = this._hyTool.DateFormat(new Date(+this.handleData.endTime), 'yyyy-MM-dd hh:mm:ss');
            this.handleData.closeTime = this._hyTool.DateFormat(new Date(+this.handleData.closeTime), 'yyyy-MM-dd hh:mm:ss');
          }
          this.handleData.handleTime = this._hyTool.DateFormat(new Date(+this.handleData.handleTime), 'yyyy-MM-dd hh:mm:ss');
          this.handleData.startTime1 = this._hyTool.DateFormat(new Date(+this.handleData.startTime), 'yyyy-MM-dd hh:mm:ss');
          this.modalDetailShow = true;
          if (this.type === 0) {
            this.handleData.startTime = this._hyTool.DateFormat(new Date(+this.handleData.startTime), 'yyyy-MM-dd hh:mm:ss');
            this.handleData.createTime = this._hyTool.DateFormat(new Date(+this.handleData.createTime), 'yyyy-MM-dd hh:mm:ss');
            this.modalFormItem = [
              {
                title: '报警编码',
                key: 'alarmCode'
              },
              {
                title: 'VIN码',
                key: 'vin'
              },
              {
                title: '报警时间',
                key: 'startTime'
              },
              {
                title: '接收时间',
                key: 'createTime'
              },
              {
                title: 'GPRS号',
                key: 'gprs'
              },
              {
                title: '报警来源',
                key: 'alarmSource'
              },
              {
                title: '故障等级',
                key: 'dbLevel',
                array: [{label: '一级', value: 1}, {label: '二级', value: 2}, {label: '三级', value: 3}]
              },
              {
                title: '报警内容',
                key: 'alarmContent'
              },
              {
                title: '状态',
                key: 'alarmStatus',
                array: [{label: '未处理', value: 0}, {label: '处理中', value: 1}, {label: '已处理', value: 2}, {label: '已关闭', value: 3}]
              },
              {
                title: '处理人',
                key: 'handleUser'
              },
              {
                title: '处理时间',
                key: 'handleTime'
              }
            ];
          } else {
            this.modalFormItem = [
              {
                title: '报警编码',
                key: 'alarmCode'
              },
              {
                title: 'VIN码',
                key: 'vin'
              },
              {
                title: '统计时间',
                key: 'statisticsTime'
              },
              {
                title: 'GPRS号',
                key: 'gprs'
              },
              {
                title: '报警开始时间',
                key: 'startTime1'
              },
              {
                title: '报警结束时间',
                key: 'endTime1'
              },
              {
                title: '报警来源',
                key: 'alarmSource'
              },
              {
                title: '故障等级',
                key: 'dbLevel',
                array: [{label: '一级', value: 1}, {label: '二级', value: 2}, {label: '三级', value: 3}]
              },
              {
                title: '报警内容',
                key: 'alarmContent'
              },
              {
                title: '持续时间',
                key: 'continuedTime'
              },
              {
                title: '报警条数',
                key: 'alarmCount'
              },
              {
                title: '状态',
                key: 'alarmStatus',
                array: [{label: '未处理', value: 0}, {label: '处理中', value: 1}, {label: '已处理', value: 2}, {label: '已关闭', value: 3}]
              },
              {
                title: '处理人',
                key: 'handleUser'
              },
              {
                title: '处理时间',
                key: 'handleTime'
              },
              {
                title: '关闭人',
                key: 'closeUser'
              },
              {
                title: '关闭时间',
                key: 'closeTime'
              }
            ];
          }
          if (this.handleData.alarmContent.length > 15) {
            this.modalFormItem.push(
              {
                title: '',
                key: ''
              },
              {
                title: '处理方式',
                key: 'handle'
              }
            );
          } else {
            this.modalFormItem.push({title: '处理方式', key: 'handle'});
          }
        }
      },
      // 处理
      save () {
        this.formLoading = true;
        if (this.textData.text === '报警处理') {
          if (!this.handleData.handle) {
            this.formLoading = false;
            if (this.isFirsts) return;
            this.$Notice.warning({
              title: '请填写处理方式!',
              onClose: () => {
                this.isFirsts = false;
              }
            });
            this.isFirsts = true;
            return;
          }
          let apiType = null;
          if (this.type === 0) {
            apiType = currentHandle;
          } else {
            apiType = gbHandle;
          }
          apiType({}, this.handleData, res => {
            this.formLoading = false;
            setTimeout(() => {
              this.$Notice.success({
                title: '',
                desc: '处理成功'
              });
            }, 500);
            this.handleShow = false;
            this.handleData = {};
            this.currentChange(this.searchData.pageNum);
          }, ret => {
            this.formLoading = false;
            setTimeout(() => {
              this.$Notice.error({
                title: '处理失败',
                desc: ret
              });
            }, 500);
          });
        } else {
          gbClose({id: this.handleData.id}, res => {
            this.formLoading = false;
            this.handleShow = false;
            this.handleData = {};
            this.currentChange(this.searchData.pageNum);
          }, ret => {
            this.$Notice.error({
              title: '关闭失败',
              desc: ret
            });
            this.formLoading = false;
          });
        }
      },
      getStatus () {},
      // 上传之前
      beforeUpload (file) {
        if (file.name.endsWith('xlsx')) {
          let params = new FormData();
          params.append('file', file);
          params.append('type', this.type === 0 ? 1 : 2);
          importHandle(null, params, res => {
            this.$confirm(`<p>报警批量处理完成</p><p>执行成功：${res.successCount}</p><p>执行失败：${res.errorCount}</p>`, '提示', {
              dangerouslyUseHTMLString: true,
              showConfirmButton: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
            });
          }, ret => {
            this.$Notice.error({
              title: '处理失败',
              desc: ret
            });
          });
          return false;
        }
        this.$confirm('导入失败，文件不符合模板规格', '提示', {
          showConfirmButton: false,
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
        }).catch(() => {
        });
        return false;
      }
    }
  };
</script>
