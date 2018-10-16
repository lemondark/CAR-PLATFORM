<!-- 
author:zhangxiahui
time:20180913
desc:升级参数
-->
<style lang="scss" scoped>
  .hy_input {
    width: 250px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-tool-kong">
      </div>
      <div class="hy-search-bar2 userCenter" style="height: auto;margin-left: -10px;">
        <Form label-position="right" inline :label-width="10">
          <FormItem label="">
            <Select
              placeholder="服务器名称"
              style="width: 200px"
              v-model="searchData.serverName"
              filterable
              remote
              transfer
              clearable
              ref="select"
              :remote-method="(query)=>serverMethod(query,'server')"
              :loading="serverLoading">
              <Option v-for="(option, index) in serverOptions" :value="option" :key="index" :label="option"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <Select
              placeholder="拨号点名称"
              style="width: 200px"
              v-model="searchData.dialingPoint"
              filterable
              remote
              transfer
              clearable
              ref="select"
              :remote-method="(query)=>serverMethod(query,'dialingPoint')"
              :loading="peerLoading">
              <Option v-for="(option, index) in peerOptions" :value="option" :key="index" :label="option"></Option>
            </Select>
          </FormItem>
          <FormItem label="">
            <i-input placeholder="拨号点用户名" v-model.trim="searchData.username" style="width:200px;" clearable></i-input>
          </FormItem>
          <i-button type="success" icon="ios-search" @click="_getList(1, true)" shape="circle" :loading="loading" class="search">查询
          </i-button>
          <div class="hy-tool-bar hy-tool-add">
            <hy-icon type="tianjia" content="新增" placement="left" class="adduser" color='#4784FF' size='22' @click="showAdd">新增</hy-icon>
          </div>
        </Form>
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
      <!-- 详情 -->
      <Modal v-model="detailShow" :mask-closable="false" :width="800" :styles="{top: '20px'}"  title="升级参数详情">
        <hy-detail :form="detailData" :rowData="detailList" v-if="detailShow"></hy-detail>
        <div slot="footer">
          <Button type="ghost" style="margin-left: 8px" @click="detailShow = false">关闭</Button>
        </div>
      </Modal>
       <!-- 编辑 -->
      <Modal v-model="editShow" :mask-closable="false" :width="850" :styles="{top: '20px'}" :title="(isNew?'新增':'编辑')+'升级参数'">
        <Form ref="editParamsForm" inline :model="editParamsForm" :rules="ruleValidate" :label-width="100">
          <FormItem label="服务器名称" prop="serverName">
              <Input v-model="editParamsForm.serverName" style="width:280px"></Input>
          </FormItem>
         <FormItem label="拨号点名称" prop="dialingPoint">
              <Input v-model="editParamsForm.dialingPoint" style="width:280px"></Input>
          </FormItem>
          <FormItem label="拨号点用户名" prop="username">
              <Input v-model="editParamsForm.username" style="width:280px"></Input>
          </FormItem>
          <FormItem label="拨号密码" prop="password">
              <Input v-model="editParamsForm.password" style="width:280px"></Input>
          </FormItem>
          <FormItem label="服务器地址" prop="hostname">
              <Input v-model="editParamsForm.hostname" style="width:280px"></Input>
          </FormItem>
          <FormItem label="服务器端口" prop="port">
              <Input v-model="editParamsForm.port" style="width:280px" number></Input>
          </FormItem>
          <FormItem label="备注" prop="remark">
              <Input v-model="editParamsForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" size="large" @click="handleSave('editParamsForm')">保存</Button>
          <Button size="large" @click="handleReset('editParamsForm')">重置</Button>
        </div>      
      </Modal>
    </div>
  </div>
</template>

<script>
  import list from '@/js/mixins/list';
  import HyTable from '@/components/common/table/table.vue';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  import HyDetail from '@/components/common/detail/detail.vue';
  import { getServerList, saveUpgradeParam, deleteList } from '@/service/otaUpgrade/otaUpgradeRecord';
  export default {
    components: {
      HyTable,
      HyFormItem,
      HyDetail
    },
    mixins: [list],
    data () {
      return {
        loading: false,
        detailShow: false,
        editShow: false,
        searchData: {},
        detailData: {},
        serverOptions: [],
        peerOptions: [],
        serverLoading: false,
        peerLoading: false,
        isNew: false,
        stateOptions: [],
        detailList: [
          {
            title: '服务器名称',
            key: 'serverName'
          },
          {
            title: '拨号点名称',
            key: 'dialingPoint'
          },
          {
            title: '拨号点用户名',
            key: 'username'
          },
          {
            title: '拨号密码',
            key: 'password'
          },
          {
            title: '服务器地址',
            key: 'hostname'
          },
          {
            title: '服务器端口',
            key: 'port'
          },
          {
            title: '备注',
            key: 'remark'
          }
        ],
        // 列表展示的数据
        columnAuthType: 'index',
        columnsAuthTitle: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center'
          },
          {
            title: '服务器名称',
            width: 165,
            key: 'serverName'
          },
          {
            title: '拨号点名称',
            key: 'dialingPoint'
          },
          {
            title: '拨号点用户名',
            key: 'username'
          },
          {
            title: '拨号密码',
            key: 'password'
          },
          {
            title: '服务器地址',
            key: 'hostname'
          },
          {
            title: '服务器端口',
            key: 'port'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            width: 130,
            key: 'action',
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                this._hyTool.createIcon(h, params, this.detail, '详情', {color: '#9BE298', type: 'xiangqing', size: '20', content: '详情', placement: 'top', showTransfer: true}),
                this._hyTool.createIcon(h, params, this.showEditModal, '修改', {color: '#EB8A36', type: 'xiugai', size: '20', content: '修改', placement: 'top', showTransfer: true}),
                this._hyTool.createIcon(h, params, this.deleteList, '删除', {color: '#F31A3E', type: 'qunfengshanchuchong', size: '20', content: '删除', placement: 'top', showTransfer: true})
              ]);
            }
          }
        ],
        editParamsForm: {},
        ruleValidate: {
          serverName: [
            { required: true, message: '服务器名称不能为空', trigger: 'blur' }
          ],
          dialingPoint: [
            { required: true, message: '拨号点名称不能为空', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '拨号点用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '拨号点密码不能为空', trigger: 'blur' }
          ],
          hostname: [
            { required: true, message: '服务器地址不能为空', trigger: 'blur' }
          ],
          port: [
            { required: true, type: 'number', message: '服务器端口必须为数字且不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    mounted () {
    },
    methods: {
      // 服务器搜索
      serverMethod (query, type) {
        query = query.trim();
        if (query !== '') {
          let params = {};
          if (type === 'server') {
            this.serverLoading = true;
            params = {
              pageSize: 10,
              pageNum: 1,
              serverName: query
            };
          } else {
            this.peerLoading = true;
            params = {
              pageSize: 10,
              pageNum: 1,
              dialingPoint: query
            };
          }
          type === 'server' && (this.serverLoading = true);
          type === 'dialingPoint' && (this.peerLoading = true);
          getServerList(params, res => {
            const server = [];
            const peer = [];
            res.content.forEach(item => {
              server.push(item.serverName);
              peer.push(item.dialingPoint);
            });
            setTimeout(() => {
              if (type === 'server') {
                this.serverLoading = false;
                this.serverOptions = server;
              } else {
                this.peerLoading = false;
                this.peerOptions = peer;
              }
            }, 200);
          });
        } else {
          type === 'server' && (this.serverOptions = []);
          type === 'dialingPoint' && (this.peerOptions = []);
        }
      },
      // 列表
      _getList (page, flag) {
        this.loading = true;
        if (page) {
          this.searchData.pageNum = page;
          this.searchPageData.pageNum = page;
        }
        // 查询按钮
        if (flag) this.searchPageData = this._hyTool.extend({}, this.searchData);
        getServerList(this.searchPageData, this.callback, ret => {
          this.loading = false;
          let text = '查询列表失败！';
          if (ret) text = ret;
          this.$confirm(text, {
              showConfirmButton: false,
              showCancelButton: false,
              type: 'error'
          }).then(() => {
          }).catch(() => {
          });
        });
      },
      detail (row) {
        this.detailData = this._hyTool.deepCopy(row);
        this.detailShow = true;
      },
      // 删除
      deleteList (params) {
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteList({ids: params.id}, null, res => {
            this.$confirm('删除成功！', {
                showConfirmButton: false,
                showCancelButton: false,
                type: 'success'
            }).then(() => {
            }).catch(() => {
            });
            this._getList(1, true);
          }, ret => {
            let text = '删除失败！';
            if (ret) text = ret;
            this.$confirm(text, {
                showConfirmButton: false,
                showCancelButton: false,
                type: 'error'
            }).then(() => {
            }).catch(() => {
            });
          });
        }).catch(() => {
        });
      },
      showAdd () {
        this.isNew = true;
        this.editShow = true;
        this.editParamsForm = {};
      },
      showEditModal (row) {
        this.isNew = false;
        this.editShow = true;
        this.editData = this._hyTool.deepCopy(row);
        this.editParamsForm = this._hyTool.deepCopy(row);
      },
      handleSave (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            saveUpgradeParam({}, this.editParamsForm, res => {
              this.$confirm('保存成功！', {
                  showConfirmButton: false,
                  showCancelButton: false,
                  type: 'success'
              }).then(() => {
              }).catch(() => {
              });
              this.editShow = false;
              this._getList(1, true);
            }, ret => {
              let text = '保存失败！';
              if (ret) text = ret;
              this.$confirm(text, {
                  showConfirmButton: false,
                  showCancelButton: false,
                  type: 'error'
              }).then(() => {
              }).catch(() => {
              });
            });
          }
        });
      },
      handleReset (form) {
        if (this.isNew) {
          this.$refs[form].resetFields();
        } else {
          this.editParamsForm = this._hyTool.deepCopy(this.editData);
        }
      }
    }
  };
</script>
