/**
* 作者：szh
* 时间：2018-06-08
* 描述：车辆迁移
*/
<style lang="scss" scoped>
  .hy_bottom {
    padding: 20px;
    height: 50px;
    line-height: 30px;
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
</style>
<template>
  <div class="bgcolor">
    <div class="content" style="padding-bottom: 0;">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <RadioGroup v-model="searchData.selectType" @on-change="changeCheck">
              <Radio label="1">文件导入</Radio>
              <Radio label="2">迁移失败车辆</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-show="checkShow">
            <i-select v-model="searchData.batchNum" clearable placeholder="迁移批次" style="width:200px;" @on-change="changeBatch" filterable :class="warnTip">
              <i-option v-for="item in recordBatch" :value="item.value" :key="item.value" :label="item.label"></i-option>
            </i-select>
          </FormItem>
          <i-button v-show="checkShow" type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                    class="search">查询
          </i-button>
        </Form>
      </div>
      <!-- <Table height="350" :columns="columns" :data="list" :no-data-text="noData">
      </Table> -->
      <div v-show="searchData.selectType === '1'" style="height:350px;border:1px solid gray;width:100%;">
        <div class="hy_export wrapper"  v-show=" Number.parseInt(searchData.selectType) === 1 && !percentShow">
          <Row v-show="isEnd && success">
            <div style="clear:both;"></div>
            <p style="font-size: 24px;"><Icon size= '30' color="green" type="checkmark-circled" style="margin-right: 3px;"></Icon>开始迁移完成</p>
            <p>迁移总数：{{dataNum}}项</p>
            <p>迁移批次：第{{searchData.batchNum}}批</p>
          </Row>
          <Row class="hy_down">
            <!--<Upload ref="upload" action="//jsonplaceholder.typicode.com/posts/" style="float: left;padding-left: 45%;" :show-upload-list="false" :before-upload="beforeUpload" :on-progress="onProgress" :on-error="onError" :on-success="onSuccess">-->
            <!--<Button type="ghost" icon="ios-cloud-upload-outline">{{buttonText}}</Button>-->
            <!--</Upload>-->
            <Row v-show='!success' class="hy_success">
              <p>
                <img src="../../../../static/images/xsls.png"/>
                <span>{{fileName}}</span>
              </p>
            </Row>
            <Upload
              class="upload-demo"
              :style="{float: success && !isEnd? 'left':'', paddingLeft: success && !isEnd?'45%':''}"
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
            <a href="javascript:void(0)" v-show='success && !isEnd' style="float: left;padding-left: 5px;font-size: 12px;" @click="exportDown"><Icon type="ios-download"></Icon>下载模板</a>
            <div style="clear:both;"></div>
          </Row>
        </div>
        <Spin size="large" fix v-if="percentShow"></Spin>
      </div>
      <hy-table v-show="searchData.selectType === '2'" :column-type="columnAuthType" :columnsTitle="columns" :list="list" :on-selection-change="handleSelectionChange"
                :show-checkbox="false" :multiple-selection="multipleSelection" :loading="loading" :no-data-text="noData">
      </hy-table>
      <Row style="margin-bottom:200px;">
        <!-- <i-col :span="list.length >  5 ? 3 : 2" v-show="!checkShow">
          <span>总数：{{list.length}} 项</span>
        </i-col> -->
        <i-col span="9" style="margin-top:15px;">
          <span>迁移批次：第</span>
          <InputNumber :max="99" :min="1" v-model="batch" :precision="0" :readonly="checkShow" style="width: 60px;"></InputNumber>
          <span>批</span>
          <Button :disabled="transferStart" @click="startMigration" style="margin-left: 40px;">开始迁移</Button>
        </i-col>
        <!-- <i-col span="5" >
          <p></p>
        </i-col> -->
        <i-col span="15" >
          <hy-page v-show="searchData.selectType === '2'"
                   :current-page="searchData.pageNum"
                   :total-element="totalElement"
                   :total-page="totalPage"
                   @current-change="_getList"></hy-page>
        </i-col>
      </Row>

    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import { Result, ByCondition } from '@/service/vehicleMigration/vehicleMigration';

  export default {
    components: {
      HyTable
    },
    mixins: [list],
    data () {
      return {
        searchData: {
          selectType: '1',
          result: 0
        },
        batch: 1,
        noData: '',
        warnTip: 'warn',
        buttonText: '导入',
        fileName: '',
        file: null,
        dataNum: 0,
        percentShow: false, // 是否展示上传进度
        isEnd: false,
        transferStart: true,
        success: true,
        recordBatch: [],
        checkShow: false,
        loading: false,
        list: [],
        fileList: [],
        columnAuthType: 'index',
        columns: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: 'VIN码',
            width: 210,
            key: 'vin'
          },
          {
            title: 'GPRS号',
            width: 210,
            key: 'gprs'
          },
          {
            title: '车系',
            width: 210,
            key: 'vehicleSerial'
          },
          {
            title: '车型',
            width: 210,
            key: 'vehicleModel'
          },
          {
            title: '迁移批次',
            width: 210,
            key: 'batchNum'
          },
          {
            title: '通讯协议版本',
            width: 210,
            key: 'protocolVersion',
            render: (h, params) => {
              return params.row['protocolVersion'] === 0 ? '三期' : '二期';
            }
          },
          {
            title: 'CAN矩阵版本',
            width: 210,
            key: 'canVersion',
            render: (h, params) => {
              return params.row['canVersion'] === 0 ? 'd3' : '双100';
            }
          },
          {
            title: '迁移方式',
            width: 120,
            fixed: 'right',
            key: 'transferType',
            render: (h, params) => {
              return params.row['transferType'] === 1 ? '网关' : '短信';
            }
          }
        ]
      };
    },
    computed: mapState([
      'exportModel'
    ]),
    mounted () {
      for (let i = 1; i <= 99; i++) {
        this.recordBatch.push({value: i, label: `${i}`});
      }
    },
    methods: {
      _getList (page, flag) {
        this.warnTip = 'warn';
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
          this.searchPageData.result = 0;
        }
        // 查询按钮
        if (flag) {
          if (!this.searchData.batchNum) {
            this.warnTip = 'warncolor';
            return;
          }
          this.searchData.selectType = '2';
          this.loading = true;
          this.searchPageData = this._hyTool.extend({}, this.searchData);
        }
        Result(this.searchPageData, res => {
          this.loading = false;
          this.list = res.content;
          this.totalElement = res.totalElements;
          this.totalPage = res.totalPages;
          if (this.list.length && this.searchData.batchNum) {
            this.transferStart = false;
          } else {
            this.transferStart = true;
          }
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询迁移列表失败',
            desc: ret
          });
        });
      },
      // 单选框切换
      changeCheck (row) {
        this.warnTip = 'warn';
        this.searchPageData.batchNum = '';
        this.searchData.batchNum = '';
        if (Number.parseInt(row) === 1) {
          this.transferStart = true;
          this.checkShow = false;
          this.success = true;
          this.isEnd = false;
          this.noData = '';
        } else {
          this.transferStart = true;
          this.checkShow = true;
          this._getList(1, false);
          this.noData = '没有迁移失败的车辆';
        }
      },
      // 开始迁移
      startMigration () {
        if (this.searchData.selectType === '1') {
          this.$refs.upload.post(this.file);
        } else {
          ByCondition(this.searchData, res => {
            // this._getList(1, false);
            this.searchData.selectType = '1';
            this.buttonText = '继续导入';
            this.isEnd = true;
            this.success = true;
            this.transferStart = true;
            this.dataNum = res;
          }, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '迁移失败',
              desc: ret
            });
          });
        }
      },
      // 选择批次
      changeBatch (value) {
        this.warnTip = 'warn';
        if (value) this.batch = value;
        else this.batch = 1;
      },
      // 模板下载
      exportDown () {
        window.location.href = this.exportModel.vehicleMigration;
      },
      importFileUrl () {
        return '/api/vehicleTransferResult/transferByExcel?batchNum=' + this.batch;
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
          this.transferStart = false;
          this.fileName = file.name;
          this.buttonText = '重新导入';
          this.file = file;
          this.success = false;
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
        this.percentShow = true;
      },
      // 上传失败
      onError () {
        this.percentShow = false;
        this.$confirm('开始迁移失败', '提示', {
          showConfirmButton: false,
          showCancelButton: false,
          type: 'error'
        }).then(() => {
        }).catch(() => {
        });
      },
      // 上传成功
      onSuccess (res) {
        if (res.code === '200') {
          this.searchData.batchNum = this.batch;
          this.dataNum = res.data;
          this.buttonText = '继续导入';
          this.isEnd = true;
          this.success = true;
          this.transferStart = true;
        } else {
          this.$confirm(res.message, '开始迁移失败', {
            showConfirmButton: false,
            showCancelButton: false,
            type: 'warning'
          }).then(() => {
          }).catch(() => {
          });
          // this.$Modal.info({
          //       title: '开始迁移失败',
          //        content: res.message
          //   });
        }
        setTimeout(() => {
          this.percentShow = false;
        }, 1000);
      },
      // 取消上传
      cancelExport () {
        this.$refs.upload.clearFiles();
        this.percentShow = false;
      }
    }
  };
</script>
