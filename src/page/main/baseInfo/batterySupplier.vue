/**
* 作者：szh
* 时间：2018-04-11
* 描述：电池供应商管理
**/
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline>
          <FormItem>
            <i-input placeholder="供应商名称" v-model.trim="searchData.name" clearable style="width: 200px"></i-input>
          </FormItem>
          <FormItem>
            <i-input placeholder="供应商简称" v-model.trim="searchData.shortName" clearable style="width: 200px"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--start-->
          <FormItem>
            <i-input placeholder="供应商代码" v-model.trim="searchData.code" clearable style="width: 200px"></i-input>
          </FormItem>
          <!--单个的input框会有enter错误--end-->
          <Button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading"
                  style="margin-left: 10px;margin-top: 1px;width:93px;font-size:16px" class="search">查询
          </Button>
          <!--工具条部分-->
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
      <Modal v-model="modalAddFormShow" :mask-closable="false" @on-cancel="returnAdd">
        <p slot="header" class="hy-modal-title">
          <span>编辑供应商</span>
        </p>
        <div style="text-align:left;transform: translateX(0%) translateZ(0px);">
          <Form ref="formAdd" :model="modalFormData" :rules="ruleValidate" :label-width="95">
            <FormItem label="供应商简称" prop="shortName">
              <i-input v-model="modalFormData.shortName" placeholder="由中文、字母、数字组成" :maxlength="10" clearable></i-input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" style="background-color:#4784FF" :loading="formLoading" @click="save">保存</Button>
          <Button type="ghost" style="margin-left: 8px" @click="returnAdd">重置</Button>
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
  import { batteryList, batterySave } from '@/service/baseInfo/batterySupper';
  import { handles } from '@/js/libs/checkValue';

  export default {
    components: {
      HyTable,
      HyFormItem
    },
    mixins: [list, button],
    data () {
      return {
        searchData: {},
        modalAddFormShow: false,  // 新增修改
        modalFormData: {},
        formLoading: false,
        ruleValidate: {
          shortName: [
            {required: true, validator: handles.call(this, 'stringNumber', '简称'), trigger: 'blur'}
          ]
        },
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
            title: '供应商名称',
            key: 'name'
          },
//          {
//            title: '状态',
//            key: 'status',
//            render: (h, params) => {
//              return params.row.status === 0 ? '可用' : '不可用';
//            }
//          },
          {
            title: '简称',
            width: 120,
            key: 'shortName'
          },
          {
            title: '供应商代码',
            width: 150,
            key: 'code'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '更新时间',
            width: 160,
            key: 'updateTime',
            render: (h, params) => {
              return this.__filters.formatTime(h, params, 'updateTime');
            }
          },
          {
            title: '操作',
            fixed: 'right',
            width: 100,
            align: 'center',
            key: 'action',
            render: (h, params) => {
              return h('div', [
                this.buttonShow('电供修改') ? this._hyTool.createIcon(h, params, this.addOrUpdate, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}) : null
              ]);
            }
          }
        ]
      };
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
        if (!this.searchData.name) delete this.searchData.name;
        if (!this.searchData.shortName) delete this.searchData.shortName;
        if (!this.searchData.code) delete this.searchData.code;
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        batteryList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询车身颜色列表失败',
            desc: ret
          });
        });
      },
      // 添加、修改
      addOrUpdate (row) {
        // console.log(row);
        this.$refs['formAdd'].resetFields();
        this.formLoading = false;
        this.modalFormData = this._hyTool.deepCopy(row);
        this.reData = this._hyTool.extend({}, row);
        this.modalAddFormShow = true;
      },
      // 保存
      save () {
        this.formLoading = true;
        this.$refs['formAdd'].validate((valid) => {
          if (valid) {
            batterySave({id: this.modalFormData.id, shortName: this.modalFormData.shortName}, res => {
              this.$Notice.success({
                desc: '修改成功'
              });
              this.modalAddFormShow = false;
              this._getList();
            }, ret => {
              this.formLoading = false;
              this.$Notice.error({
                title: '修改失败',
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
        this.modalFormData = this._hyTool.extend({}, this.reData);
      }
    }
  };
</script>
