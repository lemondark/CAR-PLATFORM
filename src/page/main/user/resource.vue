<style lang="scss" scoped>
  .font14 {font-size: 24px;font-weight: bold}
  .treediv {
    width: 50%;
    margin-top: 20px;
    float: left;
  }
  .formdiv {
    width: 47%;
    margin-top: 20px;
    float: right;
  }
  .line{
    margin-top: 20px;
    margin-left: 5px;
    float:left;
    width:1%;
    border-right: 1px solid #f1f1f1;
    padding-bottom:760px;  /*关键*/
    margin-bottom:-760px;  /*关键*/
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content" id="content">
      <div class="treediv font14">
        <Tree :data="list" :render="renderContent" :empty-text="null"></Tree>
      </div>
      <!--<div class="line"></div>-->
      <div class="formdiv">
        <Form ref="formType" :model="modalFormDataType" :label-width="75">
          <FormItem label="资源类型">
            <i-select placeholder="" v-model="modalFormDataType.type" :disabled="typeShow" clearable filterable @on-change="changeType">
              <Option v-for="item in typeArray" :value="item.value" :key="item.value" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
        </Form>
        <Form v-show="modalFormDataType.type === 1" ref="formMenu" :model="modalFormDataMenu" :rules="ruleValidateMenu" :label-width="75">
          <FormItem label="资源名称" prop="resourceName">
            <i-input v-model="modalFormDataMenu.resourceName" placeholder="由1-8个中文或字符组成" :maxlength="8"></i-input>
          </FormItem>
          <FormItem label="上级资源">
            <i-input v-model="modalFormDataMenu.parentResourceName" placeholder="" :disabled="true"></i-input>
          </FormItem>
          <FormItem label="资源图标">
            <i-input v-model="modalFormDataMenu.icon" :disabled="true">
              <Upload slot="append" :action="uploadAction" ref="upload"
                      :show-upload-list="false"
                      :before-upload="handleBeforeUpload">
                <Button type="ghost" icon="ios-cloud-upload-outline" style="background-color: #FFFFFF;border-top: 1px solid #dddee1;border-bottom: 1px solid #dddee1">浏览</Button>
              </Upload>
            </i-input>
            <span v-if="!modalFormDataMenu.icon">资源图标最大为800k</span>
            <img style="margin-top: 10px;" v-if="modalFormDataMenu.icon" :src="modalFormDataMenu.icon" width="50" height="50">
          </FormItem>
          <FormItem label="资源路径" prop="url">
            <i-input v-model="modalFormDataMenu.url" placeholder="由1-50个字母和/组成" :maxlength="50"></i-input>
          </FormItem>
          <FormItem label="备注">
            <i-input type="textarea" v-model="modalFormDataMenu.remark" placeholder="" :maxlength="255"></i-input>
          </FormItem>
        </Form>
        <Form v-show="modalFormDataType.type === 2" ref="formButton" :model="modalFormDataButton" :rules="ruleValidateButton" :label-width="75">
          <FormItem label="资源名称" prop="buttonName">
            <i-input v-model="modalFormDataButton.buttonName" placeholder="由1-8个中文组成" :maxlength="8"></i-input>
          </FormItem>
          <FormItem label="上级资源">
            <i-input v-model="modalFormDataButton.parentResourceName" placeholder="" :disabled="true"></i-input>
          </FormItem>
          <FormItem label="备注">
            <i-input type="textarea" v-model="modalFormDataButton.remark" placeholder="" :maxlength="255"></i-input>
          </FormItem>
        </Form>
        <div style="float: right;">
          <Button type="primary" style="background-color:#4784FF" :loading="formLoading" @click="addOrUpdateSubmit()">{{wordType}}</Button>
          <Button type="ghost" style="margin-left: 8px" @click="cancel(false)">重置</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import button from '@/js/mixins/button';
  import { resourceTree, resourceList, saveResource, deleteResource, swopResource, resourceUpload } from '@/service/userService/resource';
  import { saveButton, deleteButton } from '@/service/userService/button';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  export default {
    components: {HyFormItem},
    mixins: [list, button],
    data () {
      return {
        spanStyle: {
          backgroundColor: '#d5e8fc',
          padding: '5px',
          borderRadius: '5px'
        },  // 公共样式
        treeData: [
          {
            title: '',
            expand: true,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%',
                  fontSize: '14px',
                  padding: '4px 0',
                  position: 'relative'
                  // borderBottom: 'solid 1px #e9eaec'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', {style: data.focus ? this.spanStyle : null}, data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    position: 'absolute',
                    right: '34px'
                  }
                }, [
                  h('div', {
                    style: {
                      width: '27px',
                      height: '27px',
                      border: '1px solid #6197F7',
                      // display: 'inline-block',
                      borderRadius: '5px',
                      marginRight: '51px',
                      textAlign: 'center',
                      display: this.buttonShow('资源菜单新增') ? 'inline-block' : 'none'
                    }
                  }, [
                    h('hy-icon', {
                      props: Object.assign({}, this.buttonProps, {
                        //  type: 'success'
                        type: 'tianjia',
                        color: '#4784FF',
                        size: '17',
                        content: '新增',
                        placement: 'top'
                      }),
                      style: {
                        //   marginRight: this.buttonShow('资源菜单位置交换') ? '56px' : '8px',
                        display: this.buttonShow('资源菜单新增') ? '' : 'none'
                      },
                      on: {
                        click: () => { this.append(root, node, data); }
                      }
                    }, '新增')
                  ])
                ])
              ]);
            },
            children: []
          }
        ],  // 树形结构
        buttonProps: {
          type: 'ghost',
          size: 'small'
        },  // 公共样式
        buttonStyle: {
          marginRight: '8px',
          fontSize: '24px',
          height: '24px',
          width: '8px',
          color: 'gray',
          lineHeight: '24px'
        },  // 公共样式
        modalFormDataType: {
          type: 1
        },
        typeArray: [{value: 1, label: '菜单'}, {value: 2, label: '按钮'}],
        typeShow: true, // 类型不可选
        modalFormDataMenu: {
          resourceName: '',        // 资源名称
          url: '',        // 资源路径
          resourceSort: '', // 资源排序
          parentResourceName: '',  // 上级资源名称
          parentId: '',           // 上级资源id
          remark: ''                 // 备注
        },
        ruleValidateMenu: {
          resourceName: [
            {required: true, message: '资源名称不能为空', trigger: 'blur'},
            {pattern: '^[a-zA-Z\u4e00-\u9fa5]{1,8}$', message: '资源名称为1-8个中文或字母', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '资源路径不能为空', trigger: 'blur'},
            {pattern: '^[A-Za-z\\/]{1,50}$', message: '资源路径为1-50个字母和/', trigger: 'blur'}
          ]
        },
        modalFormDataButton: {
          resourceId: '',
          buttonName: '',
          parentResourceName: '',
          buttonType: 1,
          remark: ''
        },
        ruleValidateButton: {
          buttonName: [
            {required: true, message: '按钮名称不能为空', trigger: 'blur'},
            {pattern: '^[\\u4e00-\\u9fa5]{1,8}$', message: '按钮名称为1-8个中文字', trigger: 'blur'}
          ]
        },
        formLoading: false,
        modalTitle: '',
        wordType: '新增',
        searchData: {},
        selectId: [],                 // 选择id的数组
        oneResource: [],                // 获取单个资源的信息
        swopUpData: {},               // 上移的数据
        swopDownData: {},               // 下移的数据
        selectButtonId: [],           // 删除的按钮id数组
        appendData: {},              // 新增节点保存的数据
        firstArray: [],               // 一级菜单的id集合
        secondArray: [],             // 二级菜单的id集合
        thirdArray: [],             // 三级菜单的id集合
        originalData: {},            // 新增，修改的原始数据
        listFlag: true,              // 刷新页面标识
        uploadForm: new FormData(),   // 一个formdata
        fileBig: null,
        file: null,
        fileTips: false,
        bigIconShow: false,    //
        uploadAction: '/api/sys/resource/upload'    // 上传路径
      };
    },
    mounted () {
      this.addOrUpdate();
    },
    methods: {
      _getList () {
        this.searchData.id = 1;
        resourceTree(this.searchData, res => {
          this.list = [];
          this.list.push(res);
          this.list[0].title = this.list[0].resourceName;
          this.$set(this.list[0], 'expand', true);
          this.$set(this.list[0], 'focus', false);
//          this.list[0].expand = true;
          this.list[0].render = this.treeData[0].render;
          this.list[0].children = this.list[0].userChildrenList;
          if (this.list[0].userChildrenList.length > 0) {
            this.traversalObject(this.list[0]);
          }
          // 过滤出一级，二级，三级菜单的id
          for (let li of this.list[0].userChildrenList) {
            this.firstArray.push(li.id);   // 一级菜单id
            for (let ch of li.userChildrenList) {
              this.secondArray.push(ch.id);  // 二级菜单id
              for (let chi of ch.userChildrenList) {
                this.thirdArray.push(chi.id);  // 三级菜单id
              }
            }
          }
          // 默认显示顶级菜单
          if (this.listFlag) {
            this.listFlag = false;
            this.modalTitle = '新增菜单';
            this.originalData = {};
            this.originalData = this.list[0];
            this.fileBig = null;
            this.file = null;
            this.modalFormDataMenu = {
              resourceName: '',        // 资源名称
//              resourceIcon: '',        // 资源图标
              icon: '',
              bigIcon: '',
              url: '',        // 资源路径
              resourceSort: this.list[0].userChildrenList.length === 0 ? 1 : this.list[0].userChildrenList[this.list[0].userChildrenList.length - 1].resourceSort + 1, // 资源排序
              parentResourceName: this.list[0].resourceName,  // 上级资源名称
              parentId: this.list[0].id,           // 上级资源id
              remark: ''                 // 备注
            };
            this.bigIconShow = true;
          }
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询资源列表失败',
            desc: ret
          });
        });
      },
      traversalObject (obj) {
        let array = obj.children;
        for (let arr of array) {
          arr.title = arr.resourceName ? arr.resourceName : arr.buttonName;
          this.$set(arr, 'expand', false);
          this.$set(arr, 'focus', false);
//          arr.expand = true;
//          arr.children = arr.userChildrenList;
          arr.children = [];
          if (arr.userChildrenList && arr.userChildrenList.length > 0) {
            arr.children = arr.userChildrenList;
          } else if (arr.userChildrenList && arr.userButtonList.length > 0) {
            arr.children = arr.userButtonList;
          }
          if (arr.children.length > 0) {
            this.traversalObject(arr);
          }
        }
      },
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
            fontSize: '14px',
            padding: '4px 0',
            position: 'relative'
            // borderBottom: 'solid 1px #e9eaec'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            data.resourceName ? h('span', {style: data.focus ? this.spanStyle : null}, data.title) : h('Button', {
              props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                type: 'ghost',
                backgroundColor: '#F2F2F2'
              }),
              style: {
//                marginRight: '8px'
                backgroundColor: data.focus ? '#d5e8fc' : null
              },
              on: {
//                click: () => { this.append(data); }
              }
            }, data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              position: 'absolute',
              right: '45px'
            }
          }, [
            h('div', {
              style: {
                width: '27px',
                height: '27px',
                border: '1px solid #6197F7',
                // display: 'inline-block',
                borderRadius: '5px',
                marginRight: '8px',
                textAlign: 'center',
                display: data.resourceName && ((data.userButtonList.length === 0 && this.buttonShow('资源菜单新增')) || (data.userChildrenList.length === 0 && this.buttonShow('资源按钮新增'))) ? 'inline-block' : 'none'   // 是菜单
              }
            }, [
              h('hy-icon', {
                props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                  //  type: 'success'
                  type: 'tianjia',
                  color: '#4784FF',
                  size: '17',
                  content: '新增',
                  placement: 'top'
                }),
                style: {
                  // marginRight: '8px',
                  display: data.resourceName && ((data.userButtonList.length === 0 && this.buttonShow('资源菜单新增')) || (data.userChildrenList.length === 0 && this.buttonShow('资源按钮新增'))) ? '' : 'none'   // 是菜单
                },
                on: {
                  click: () => { this.append(root, node, data); }
                }
              }, '新增')
            ]),
            h('div', {
              style: {
                width: '27px',
                height: '27px',
                border: '1px solid #6197F7',
                // display: 'inline-block',
                borderRadius: '5px',
                marginRight: '8px',
                textAlign: 'center',
                display: (data.resourceName ? (this.buttonShow('资源菜单修改') && data.isDefault === 1) : (data.buttonType === 1 && this.buttonShow('资源按钮修改'))) ? 'inline-block' : 'none'
              }
            }, [
              h('hy-icon', {
                props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                  //     type: 'primary'
                  type: 'bi',
                  color: '#59BA73',
                  size: '17',
                  content: '修改',
                  placement: 'top'
                }),
                style: {
                  //   marginRight: ((data.buttonType === 1 && this.buttonShow('资源按钮删除')) || (data.resourceName && this.buttonShow('资源菜单位置交换'))) ? '8px' : '56px',
                  display: (data.resourceName ? (this.buttonShow('资源菜单修改') && data.isDefault === 1) : (data.buttonType === 1 && this.buttonShow('资源按钮修改'))) ? '' : 'none'
                },
                on: {
                  click: () => { this.modify(root, node, data); }
                }
              }, '修改')
            ]),
            h('div', {
              style: {
                width: '27px',
                height: '27px',
                border: '1px solid #F31A3E',
                // display: 'inline-block',
                borderRadius: '5px',
                marginRight: '8px',
                textAlign: 'center',
                display: ((data.resourceName && data.children.length === 0 && data.isDefault === 1 && this.buttonShow('资源菜单删除')) || (data.buttonType === 1 && this.buttonShow('资源按钮删除'))) ? 'inline-block' : 'none'
              }
            }, [
              h('hy-icon', {
                props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-minus-empty'
                  //   type: 'error'
                  type: 'shanchu',
                  color: '#F31A3E',
                  size: '17',
                  content: '删除',
                  placement: 'top'
                }),
                style: {
                  // marginRight: ((data.buttonType === 1 && !this.buttonShow('资源菜单位置交换')) || (data.resourceName && this.buttonShow('资源菜单位置交换'))) ? '8px' : '56px',
                  display: ((data.resourceName && data.children.length === 0 && data.isDefault === 1 && this.buttonShow('资源菜单删除')) || (data.buttonType === 1 && this.buttonShow('资源按钮删除'))) ? '' : 'none'
                },
                on: {
                  click: () => { this.deletes(root, node, data); }
                }
              }, '删除')
            ]),
            h('hy-icon', {
              props: Object.assign({}, this.buttonProps, {
                // type: 'text',
                // icon: 'arrow-up-c'
                type: 'shangsheng',
                color: '#000000',
                size: '17',
                content: '上移',
                placement: 'top'
              }),
              style: {
                ...this.buttonStyle,
                display: data.resourceName && this.buttonShow('资源菜单位置交换') ? '' : 'none'
              },
              on: {
                click: () => { this.swopUp(data); }
              }
            }, ''),
            h('hy-icon', {
              props: Object.assign({}, this.buttonProps, {
                // type: 'text',
                // icon: 'arrow-down-c'
                type: 'xiajiang',
                color: '#000000',
                size: '17',
                content: '下移',
                placement: 'top'
              }),
              style: {
                ...this.buttonStyle,
                display: data.resourceName && this.buttonShow('资源菜单位置交换') ? '' : 'none'
              },
              on: {
                click: () => { this.swopDown(data); }
              }
            }, '')
          ])
        ]);
      },
      changeType (val) {
        if (val === 1) {
          if (!(this.modalTitle === '修改菜单')) {
            this.modalTitle = '新增菜单';
          }
        } else {
          if (!(this.modalTitle === '修改按钮')) {
            this.modalTitle = '新增按钮';
            this.addOrUpdateButton(this.appendData, 'add');  // 按钮
          }
        }
      },
      // 新增 菜单/按钮
      append (root, node, data) {
        root.forEach(val => {
          val.node.focus = false;
        });
        data.focus = true;
        this.appendData = {};
        this.appendData = this._hyTool.extend({}, data);
        // console.log(JSON.stringify(data));
        // 判断父节点是否在三级菜单id中。菜单最多三级，三级菜单下只能有按钮
        // console.log(JSON.stringify(this.thirdArray));
//        let secondMenuShow = this._hyTool.oneOf(data.id, this.secondArray);
        let thirdMenuShow = this._hyTool.oneOf(data.id, this.thirdArray);
        if (data.userButtonList.length > 0) {  // 下级已存在按钮
          this.addOrUpdateButton(data, 'add');  // 按钮
        } else {
          if (thirdMenuShow) {     // 三级菜单下只能有按钮
            this.addOrUpdateButton(data, 'add');  // 按钮
          } else {
            if (this.buttonShow('资源按钮新增') && !this.buttonShow('资源菜单新增')) {   // 有按钮新增权限并且没有资源新增权限
              this.addOrUpdateButton(data, 'add');  // 按钮
            } else {
              this.addOrUpdate(data, 'add');     // 菜单
            }
          }
        }
      },
      // 修改 菜单/按钮
      modify (root, node, data) {
        root.forEach(val => {
          val.node.focus = false;
        });
        data.focus = true;
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        if (data.buttonType) {
          this.addOrUpdateButton(data, 'modify', parent);
        } else {
          this.addOrUpdate(data, 'modify', parent);
        }
      },
      // 删除 菜单/按钮
      deletes (root, node, data) {
        root.forEach(val => {
          val.node.focus = false;
        });
        data.focus = true;
        if (data.buttonType) {  // 按钮
          this.deletesButton(data);
        } else {    // 菜单
          this.deletesResource(data);
        }
      },
      // 删除
      deletesResource (data) {
        if (!data) return;
        this.selectId = [];
        this.selectId.push(data.id);
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteResource({resourceIdArr: this.selectId.join(',')}, null, res => {
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
      // 上移
      swopUp (data) {
        this.swopCommit('up', data);
      },
      // 下移
      swopDown (data) {
        this.swopCommit('down', data);
      },
      // 查询一个资源的信息
      swopCommit (flag, data) {
        let message = '';
        if (flag === 'up') {
          message = '上移';
        } else {
          message = '下移';
        }
        this.$confirm('确定' + message + '？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.searchData.id = data.parentId;
          resourceTree(this.searchData, res => {
            this.oneResource = res;
            this.swop(message, data, this.oneResource.userChildrenList);
          }, ret => {
            this.loading = false;
            this.$Notice.error({
              title: '查询单个资源失败',
              desc: ret
            });
          });
        }).catch(() => {
        });
      },
      // 交换位置提交
      swop (message, data, list) {
        let params = {
          oid: data.id,
          tid: ''
        };
        let index = list.findIndex(value => {
          return value.id === data.id;
        });
        if (message === '上移') {
          if (index > 0) {
            params.tid = list[index - 1].id;
          } else {
            this.$Notice.warning({
              title: '已经到最高了'
            });
            return;
          }
        } else {
          if (index < list.length - 1) {
            params.tid = list[index + 1].id;
          } else {
            this.$Notice.warning({
              title: '已经到最低了'
            });
            return;
          }
        }
        swopResource(params, null, res => {
          this.formLoading = false;
          this._getList();
//          this.cancel();
          this.$Notice.success({
            title: message + '成功'
          });
        }, ret => {
          this.formLoading = false;
          this.$Notice.error({
            title: message + '失败',
            desc: ret
          });
        });
      },
      // 提交新增修改
      addOrUpdateSubmit () {
//        console.log(this.modalTitle);
        if (this.modalTitle === '新增菜单' || this.modalTitle === '修改菜单') {
          this.addOrUpdateResourceSubmit();
        } else if (this.modalTitle === '新增按钮' || this.modalTitle === '修改按钮') {
          this.addOrUpdateButtonSubmit();
        } else {
          this.$Notice.warning({
            title: '请选择上级资源'
          });
        }
      },
      // 菜单点击新增、修改
      async addOrUpdate (row, flag, parent) {
        this.modalFormDataType.type = 1;
        this.$refs.formMenu.resetFields();
        this.formLoading = false;
        this.originalData = {};
        this.fileBig = null;
        this.file = null;
        if (flag === 'add') {
          if (row.id === 1) {
            this.bigIconShow = true;
          } else {
            this.bigIconShow = false;
          }
          this.modalTitle = '新增菜单';
          this.wordType = '新增';
          // 保存数据，为重置按钮使用
          this.originalData = row;
          this.modalFormDataMenu = {
            resourceName: '',        // 资源名称
//            resourceIcon: '',        // 资源图标
            icon: '',
            bigIcon: '',
            url: '',        // 资源路径
            resourceSort: row.userChildrenList.length === 0 ? 1 : row.userChildrenList[row.userChildrenList.length - 1].resourceSort + 1, // 资源排序
            parentResourceName: row.resourceName,  // 上级资源名称
            parentId: row.id,           // 上级资源id
            remark: ''                 // 备注
          };
          // 顶级菜单下只能新建菜单 菜单下有子菜单就只能新建菜单
          if (row.id === 1 || row.userChildrenList.length > 0 || (!this.buttonShow('资源按钮新增') && this.buttonShow('资源菜单新增'))) {
            this.typeShow = true;
          } else {
            this.typeShow = false;
          }
        } else if (flag === 'modify') {
          // 一级菜单才会上传大图标
          if (this.firstArray.find(val => val === row.id)) {
            this.bigIconShow = true;
          } else {
            this.bigIconShow = false;
          }
          this.typeShow = true;
          this.modalTitle = '修改菜单';
          this.wordType = '保存';
          this.modalFormDataMenu = {};
          this.modalFormDataMenu = this._hyTool.extend({}, row);
          this.modalFormDataMenu.parentResourceName = parent.resourceName;
          let resourceById = await this.getResource(row.id); // 获取资源的详细数据
          this.modalFormDataMenu.roleBeanSet = resourceById.roleBeanSet ? resourceById.roleBeanSet : [];  // 资源的角色集合
//          this.modalFormDataMenu.iconFileUrl = null;
//          if (this.modalFormDataMenu.resourceIcon) {
//            this.modalFormDataMenu.iconFileUrl = '/api/sys/resource/download?id=' + row.id + '&random=' + (10 * Math.random()).toFixed(4);
//          }
//          console.log(JSON.stringify(this.modalFormDataMenu));
          // 保存数据，为重置按钮使用
          this.originalData = this._hyTool.extend({}, row);
          this.originalData.parentResourceName = parent.resourceName;
        }
      },
      // 获取
      getResource (id) {
        return new Promise((resolve, reject) => {
          try {
            resourceList({id: id}, res => {
              if (res.length > 0) {
                resolve(res[0]);
              } else {
                this.$Notice.warning({
                  title: '资源不存在'
                });
              }
            }, ret => {
              this.$Notice.error({
                title: '查询资源信息失败',
                desc: ret
              });
              reject({});
            });
          } catch (e) {
            reject({});
          }
        });
      },
      // 提交新增修改 菜单
      addOrUpdateResourceSubmit () {
        this.$refs['formMenu'].validate((valid) => {
          if (valid) {
            if (this.modalFormDataMenu.id || this.modalFormDataMenu.parentId) {
              this.formLoading = true;
              this.modalFormDataMenu.isDefault = 1; // 0 默认不可操作， 1 可操作
              saveResource(null, this.modalFormDataMenu, res => {
//                console.log(JSON.stringify(res));
//                if (!this.file) {
                this.formLoading = false;
                this._getList();
                this.originalData = this._hyTool.extend({}, this.modalFormDataMenu);
                this.typeShow = true;
                this.cancel(true);
                this.$Notice.success({
                  title: this.modalTitle + '成功'
                });
//                } else {
//                  this.uploadSubmit(res);
//                }
              }, ret => {
                this.formLoading = false;
                this.$Notice.error({
                  title: this.modalTitle + '失败',
                  desc: ret
                });
              });
            } else {
              this.$Notice.warning({
                title: '请选择上级资源'
              });
            }
          }
        });
      },
      // 点击新增修改 按钮
      addOrUpdateButton (row, flag, parent) {
        this.modalFormDataType.type = 2;
        this.$refs.formButton.resetFields();
        this.formLoading = false;
        this.originalData = {};
        if (flag === 'add') {
          this.modalTitle = '新增按钮';
          this.wordType = '新增';
          // 保存数据，为重置按钮使用
          this.originalData = row;
          this.modalFormDataButton = {
            resourceName: '',        // 资源名称
            parentResourceName: row.resourceName,  // 上级资源名称
            resourceId: row.id,           // 上级资源id
            remark: ''
          };
          // 判断父节点是否在三级菜单id中。菜单最多三级，三级菜单下只能有按钮
//          let secondMenuShow = this._hyTool.oneOf(row.id, this.secondArray);
          let thirdMenuShow = this._hyTool.oneOf(row.id, this.thirdArray);
          if (row.userButtonList.length > 0 || thirdMenuShow || (this.buttonShow('资源按钮新增') && !this.buttonShow('资源菜单新增'))) {
            this.typeShow = true;
          } else {
            this.typeShow = false;
          }
        } else if (flag === 'modify') {
          this.modalTitle = '修改按钮';
          this.wordType = '保存';
          this.modalFormDataButton = {};
          this.modalFormDataButton = this._hyTool.extend({}, row);
          this.modalFormDataButton.parentResourceName = parent.resourceName;        // 父级资源名称
          // 保存数据，为重置按钮使用
          this.originalData = this._hyTool.extend({}, row);
          this.originalData.parentResourceName = parent.resourceName;
        }
      },
      // 提交按钮新增修改
      addOrUpdateButtonSubmit () {
        this.$refs['formButton'].validate((valid) => {
          if (valid) {
            if (this.modalFormDataButton.id || this.modalFormDataButton.resourceId) {
              this.formLoading = true;
              let modalFormData = {
                resourceId: this.modalFormDataButton.resourceId,
                buttonName: this.modalFormDataButton.buttonName,
                buttonType: 1, // 0 系统默认不可操作，1 可操作
                remark: this.modalFormDataButton.remark
              };
              if (this.modalFormDataButton.id) modalFormData.id = this.modalFormDataButton.id;
              saveButton(null, modalFormData, res => {
                this.formLoading = false;
                this._getList();
                this.originalData = this._hyTool.extend({}, this.modalFormDataButton);
                this.typeShow = true;
                this.cancel(true);
                this.$Notice.success({
                  title: this.modalTitle + '成功'
                });
              }, ret => {
                this.formLoading = false;
                this.$Notice.error({
                  title: this.modalTitle + '失败',
                  desc: ret
                });
              });
            } else {
              this.$Notice.warning({
                title: '请选择上级资源'
              });
            }
          }
        });
      },
      // 按钮删除
      deletesButton (data) {
        if (!data) return;
        this.selectButtonId = [];
        this.selectButtonId.push(data.id);
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteButton({buttonIdArr: this.selectButtonId.join(',')}, null, res => {
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
      // 上传大图标
      handleBeforeUploadBig (file) {
//        console.log(this.$refs.upload);
        this.fileBig = file;
//        console.log(this.file);
        this.uploadForm = new FormData();
        this.uploadForm.append('iconFile', this.fileBig);
        this.fileTipsBig = false;
        let format = ['jpg', 'png', 'gif'];// 文件格式限制
        let maxSize = 800; // 文件大小限制  800k
        // 判断文件是否符合上传要求
        let fileName = file.name;
        let fileSize = file.size / 1024; // k
        let suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);// 后缀名
        if (format.indexOf(suffix) === -1) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 ' + format.toString() + ' 格式的文件。'
          });
          this.fileTipsBig = true;
          return false;
        } else if (maxSize < fileSize) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 ' + maxSize + 'kb。'
          });
          this.fileTipsBig = true;
          return false;
        } else {
          this.uploadSubmit('big');
        }
        return false;
      },
      // 上传
      handleBeforeUpload (file) {
        this.file = file;
        this.uploadForm = new FormData();
        this.uploadForm.append('iconFile', this.file);
        this.fileTips = false;
        let format = ['jpg', 'png', 'gif'];// 文件格式限制
        let maxSize = 800; // 文件大小限制  800k
        // 判断文件是否符合上传要求
        let fileName = file.name;
        let fileSize = file.size / 1024; // k
        let suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);// 后缀名
        if (format.indexOf(suffix) === -1) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 ' + format.toString() + ' 格式的文件。'
          });
          this.fileTips = true;
          return false;
        } else if (maxSize < fileSize) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 ' + maxSize + 'kb。'
          });
          this.fileTips = true;
          return false;
        } else if (fileName.indexOf('&') > -1 || fileName.indexOf('%') > -1 || fileName.indexOf('#') > -1) {
          this.$Notice.warning({
            title: '文件名称不正确',
            desc: '文件 ' + file.name + ' 不能包含 &,%,# 符号。'
          });
          this.fileTips = true;
          return false;
        } else {
          this.uploadSubmit('small');
        }
        return false;
      },
      // 上传提交
      uploadSubmit (flag) {
        if (this.fileTipsBig) {
          this.$Notice.error({
            title: '资源大图标上传错误',
            desc: '资源大图标格式不正确或文件太大'
          });
          return;
        }
        if (this.fileTips) {
          this.$Notice.error({
            title: '资源小图标上传错误',
            desc: '资源小图标格式不正确或文件太大'
          });
          return;
        }
        resourceUpload(null, this.uploadForm, res => {
          if (flag === 'big') {
            this.$set(this.modalFormDataMenu, 'bigIcon', res);
          } else {
            this.$set(this.modalFormDataMenu, 'icon', res);
          }
          this.$Notice.success({
            title: '资源图标上传成功'
          });
        }, ret => {
          this.formLoading = false;
          this.$refs.upload.clearFiles();
          this.$Notice.error({
            title: '资源图标上传失败',
            desc: ret.message
          });
        });
      },
      cancel (flag) {
        if (this.modalTitle === '新增菜单') {
          this.$refs.formMenu.resetFields();
//          this.modalFormDataMenu.resourceIcon = '';
          this.modalFormDataMenu.remark = '';
          this.modalFormDataMenu.bigIcon = '';
          this.modalFormDataMenu.icon = '';
          this.fileBig = null;
          this.file = null;
        } else if (this.modalTitle === '修改菜单') {
          if (!flag) {
            this.$refs.formMenu.resetFields();
            this.modalFormDataMenu = this._hyTool.extend({}, this.originalData);
          }
          this.fileBig = null;
          this.file = null;
        } else if (this.modalTitle === '新增按钮') {
          this.$refs.formButton.resetFields();
          this.modalFormDataButton.remark = '';
          if (!this.typeShow) {
            this.modalFormDataType.type = 1;
          }
        } else if (this.modalTitle === '修改按钮') {
          if (!flag) {
            this.$refs.formButton.resetFields();
            this.modalFormDataButton = this._hyTool.extend({}, this.originalData);
          }
        }
      }
    }
  };
</script>
