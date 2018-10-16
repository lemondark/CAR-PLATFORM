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
  .path {
    /*text-align: center;*/
    display: block;
    margin-left: 9px;
    margin-bottom: 10px;
  }
</style>
<template>
  <div class="bgcolor">
    <div class="content">
      <div class="hy-search-bar2">
        <Form label-position="right" inline >
          <FormItem label="">
            <i-select placeholder="组织" v-model="searchData.id" clearable filterable>
              <Option v-for="item in selectOrgArray" :value="item.value" :key="item.code" :label="item.label">
                {{ item.label }}
              </Option>
            </i-select>
          </FormItem>
          <Button type="success" icon="ios-search" @click="_getList()" shape="circle" :loading="loading"
                  class="search">查询
          </Button>
        </Form>
      </div>
      <div class="treediv font14">
        <Tree :data="list" :render="renderContent" :empty-text="null"></Tree>
      </div>
      <!--<div class="line"></div>-->
      <div class="formdiv">
        <div><span class="path">{{pathName}}</span></div>
        <Form ref="form" :model="modalFormData" :rules="ruleValidate" :label-width="75">
          <hy-form-item :form="modalFormData" :formRow="modalFormItem"></hy-form-item>
        </Form>
        <div style="float: right;">
          <Button type="primary" style="background-color:#4784FF" :loading="formLoading" :disabled="submitShow" @click="addOrUpdateSubmit('form')">{{wordType}}</Button>
          <Button type="ghost" style="margin-left: 8px" :disabled="submitShow" @click="cancel(false)">重置</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import list from '@/js/mixins/list';
  import dictionary from '@/js/mixins/dictionary';
  import button from '@/js/mixins/button';
  import { orgList, saveOrg, deleteOrg } from '@/service/userService/org';
  import HyFormItem from '@/components/common/formItem/formItem.vue';
  export default {
    components: {HyFormItem},
    mixins: [list, dictionary, button],
    data () {
      return {
        loading: true,
        storeData: {},
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
                  position: 'relative',
                  padding: '7px 0'
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
                    right: '32px'
                  }
                }, [
                  h('div', {
                    style: {
                      width: '27px',
                      height: '27px',
                      border: '1px solid #6197F7',
                      display: this.buttonShow('组织新增') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? 'inline-block' : 'none', // 经销商默认id为900,
                      borderRadius: '5px',
                      marginRight: '8px',
                      textAlign: 'center'
                    }
                  }, [
                    h('hy-icon', {
                      props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                        // type: 'success'
                        type: 'tianjia',
                        color: '#4784FF',
                        size: '17',
                        content: '新增',
                        placement: 'top'
                      }),
                      style: {
                        // marginRight: '8px',
                        display: this.buttonShow('组织新增') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? '' : 'none' // 经销商默认id为900,
                      },
                      on: {
                        click: () => {
                          this.append(root, node, data);
                          this.focusclick();
                        }
                      }
                    }, '新增')
                  ]),
                  h('div', {
                    style: {
                      width: '27px',
                      height: '27px',
                      border: '1px solid #6197F7',
                      display: this.buttonShow('组织修改') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? 'inline-block' : 'none',
                      borderRadius: '5px',
                      marginRight: '8px',
                      textAlign: 'center'
                    }
                  }, [
                    h('hy-icon', {
                      props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                        // type: 'primary'
                        type: 'bi',
                        color: '#59BA73',
                        size: '17',
                        content: '修改',
                        placement: 'top'
                      }),
                      style: {
                        //    marginRight: (data.orgBeanSet.length > 0) ? '' : '8px',
                        display: this.buttonShow('组织修改') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? '' : 'none'
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
                      border: '1px solid #6197F7',
                      //   display: 'inline-block',
                      borderRadius: '5px',
                      marginRight: '8px',
                      textAlign: 'center',
                      display: (data.orgBeanSet.length === 0 && this.buttonShow('组织删除') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900')) ? 'inline-block' : 'none'
                    }
                  }, [
                    h('hy-icon', {
                      props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-minus-empty'
                        // type: 'error'
                        type: 'shanchu',
                        color: '#F31A3E',
                        size: '17',
                        content: '删除',
                        placement: 'top'
                      }),
                      style: {
                        display: (data.orgBeanSet.length === 0 && this.buttonShow('组织删除') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900')) ? '' : 'none'
                      },
                      on: {
                        click: () => { this.deletes(root, node, data); }
                      }
                    }, '删除')
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
        },   // 公共按钮样式
        modalFormData: {
          orgName: '',        // 组织名称
          orgPerson: '',        // 联系人
          phone: '',        // 电话
          orgAddress: '',        // 组织地址
          parentOrgName: '',  // 上级组织名称
          parentId: '',           // 上级组织id
          remark: ''                 // 备注
        },
        ruleValidate: {
          orgName: [
            {required: true, message: '组织名称不能为空', trigger: 'blur'},
            {pattern: '^[\\u4e00-\\u9fa5]{1,15}$', message: '组织名称为1-15个中文字', trigger: 'blur'}
          ],
          orgPerson: [
            {pattern: '^[\\u4e00-\\u9fa5]{1,16}$', message: '联系人为1-16个中文字', trigger: 'blur'}
          ],
          phone: [
            {pattern: '^(0[0-9]{2,3}(\\-)?)?([2-9][0-9]{6,7})+(\\-[0-9]{1,4})?$|(^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\\d{8}$)', message: '电话长度或格式不正确', trigger: 'blur'}
          ]
          // orgAddress: [
          //   {pattern: '^(?=.*?[\\u4E00-\\u9FA5])[\\dA-Za-z\\u4E00-\\u9FA5]{1,50}$', message: '组织地址为中文，字母和数字，并且一定有中文1-50位的字符串', trigger: 'blur'}
          // ]
        },   // 表单验证规则
        modalFormItem: [
          {
            key: 'orgName',
            title: '组织名称',
            placeholder: '由1-15个中文组成',
            property: {
              maxlength: 15,
              'v-focus': 'focusState',
              '@blur': 'focusState = false'
            }
          },
          {
            key: 'parentOrgName',
            title: '上级组织',
            clearAble: true,
            property: {
              disabled: true
            }
          },
          {
            key: 'orgPerson',
            title: '联系人',
            placeholder: '由1-16个中文组成',
            property: {
              maxlength: 16
            }
          },
          {
            key: 'phone',
            title: '电话',
            placeholder: '可输入手机号(11位数字)，座机(8-11位)',
            property: {
              maxlength: 11
            }
          },
          {
            key: 'orgAddress',
            title: '组织地址',
            placeholder: '由1-50位的字符组成',
            property: {
              maxlength: 50
            }
          },
          {
            key: 'remark',
            title: '备注',
            type: 'textarea',
            placeholder: '可输入0-255个字符',
            property: {
              maxlength: 255
            }
          }
        ],
        formLoading: false,
        wordType: '新增',
        searchData: {},
        selectId: [],                 // 选择id的数组
        originalData: {},            // 新增，修改的原始数据
        listFlag: true,              // 刷新页面标识
        submitShow: false,           // 提交按钮显示隐藏
        pathName: ''                 // 路径名称
      };
    },
    created () {
      this.getSelectOrg(); // 获取全部组织列表
    },
    mounted () {
      this.addOrUpdate();
    },
    methods: {
      // 聚焦
      focusclick () {
        let select = document.querySelectorAll('.ivu-input')[0];
        select.focus();
      },
      _getList () {
      //  this.getSelectOrg(); // 获取全部组织列表
        this.submitShow = false;
        let searchData = {
          id: ''
        };
        if (!this.searchData.id) {
          searchData.id = 1;
        } else {
          searchData.id = this.searchData.id;
        }
        this.loading = true;
        orgList(searchData, res => {
          this.loading = false;
          this.list = res;
          this.pathName = this.list[0].orgName;
          this.list[0].title = this.list[0].orgName;
          this.$set(this.list[0], 'expand', true);
          this.$set(this.list[0], 'pathName', this.list[0].orgName);
          this.$set(this.list[0], 'focus', false);
//          this.list[0].expand = this.treeData[0].expand;
          this.list[0].render = this.treeData[0].render;
          this.list[0].children = this.list[0].orgBeanSet;
          if (this.list[0].orgBeanSet.length > 0) {
            this.traversalObject(this.list[0]);
          }
          // 默认显示顶级菜单
          if (this.listFlag || searchData.id) {
            this.$refs.form.resetFields();
            this.listFlag = false;
            this.modalTitle = '新增';
            this.originalData = {};
            this.originalData = this._hyTool.extend({}, this.list[0]);
            this.originalData.parentOrgName = this.originalData.orgName;
            this.modalFormData = {
              orgName: '',        // 组织名称
              orgPerson: '',        // 联系人
              phone: '',        // 电话
              orgAddress: '',        // 组织地址
              parentOrgName: this.list[0].orgName,  // 上级组织名称
              parentId: this.list[0].id,           // 上级组织id
              remark: ''
            };
            // 排除经销商及其子组织
            if (this.list[0].id.toString() === '900' || (this.list[0].parentId === null ? '' : this.list[0].parentId.toString()) === '900') {
              this.submitShow = true;
            }
          }
        }, ret => {
          this.loading = false;
          this.$Notice.error({
            title: '查询组织列表失败',
            desc: ret
          });
        });
      },
      // 组织递归
      traversalObject (obj) {
        let array = obj.orgBeanSet;
        for (let arr of array) {
          arr.title = arr.orgName;
//          arr.expand = true;
          this.$set(arr, 'expand', false);
          this.$set(arr, 'pathName', obj.pathName + ' > ' + arr.orgName);
          this.$set(arr, 'focus', false);
          arr.children = arr.orgBeanSet;
          if (arr.orgBeanSet.length > 0) {
            this.traversalObject(arr);
          }
        }
      },
      // 树形 render
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
            fontSize: '14px',
            position: 'relative',
            padding: '7px 0'
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
            h('span', {style: data.focus ? this.spanStyle : null}, data.title)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              position: 'absolute',
              right: '32px'
            }
          }, [
            h('div', {
              style: {
                width: '27px',
                height: '27px',
                border: '1px solid #6197F7',
                //  display: 'inline-block',
                borderRadius: '5px',
                marginRight: '8px',
                textAlign: 'center',
                display: this.buttonShow('组织新增') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? 'inline-block' : 'none' // 经销商默认id为900,
              }
            }, [
              h('hy-icon', {
                props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                  //        type: 'success'
                  type: 'tianjia',
                  color: '#4784FF',
                  size: '17',
                  content: '新增',
                  placement: 'top'
                }),
                style: {
                  //  marginRight: '8px',
                  display: this.buttonShow('组织新增') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? '' : 'none' // 经销商默认id为900,
                },
                on: {
                  click: () => {
                    this.append(root, node, data);
                    this.focusclick();
                  }
                }
              }, '新增')
            ]),
            h('div', {
              style: {
                width: '27px',
                height: '27px',
                border: '1px solid #59BA73',
                // display: 'inline-block',
                borderRadius: '5px',
                marginRight: '8px',
                textAlign: 'center',
                display: this.buttonShow('组织修改') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? 'inline-block' : 'none'
              }
            }, [
              h('hy-icon', {
                props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-plus-empty'
                  //   type: 'primary'
                  type: 'bi',
                  color: '#59BA73',
                  size: '17',
                  content: '修改',
                  placement: 'top'
                }),
                style: {
                  //     marginRight: (data.orgBeanSet.length > 0) ? '' : '8px',
                  display: this.buttonShow('组织修改') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900') ? '' : 'none'
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
                //   display: 'inline-block',
                borderRadius: '5px',
                marginRight: '8px',
                textAlign: 'center',
                display: (data.orgBeanSet.length === 0 && this.buttonShow('组织删除') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900')) ? 'inline-block' : 'none'
              }
            }, [
              h('hy-icon', {
                props: Object.assign({}, this.buttonProps, {
//                icon: 'ios-minus-empty'
                  // type: 'error'
                  type: 'shanchu',
                  color: '#F31A3E',
                  size: '17',
                  content: '删除',
                  placement: 'top'
                }),
                style: {
                  display: (data.orgBeanSet.length === 0 && this.buttonShow('组织删除') && (data.id.toString() !== '900' && (data.parentId === null ? '' : data.parentId.toString()) !== '900')) ? '' : 'none'
                },
                on: {
                  click: () => { this.deletes(root, node, data); }
                }
              }, '删除')
            ])
          ])
        ]);
      },
      // 树形结构中的 新增
      append (root, node, data) {
        root.forEach(val => {
          val.node.focus = false;
        });
        data.focus = true;
        this.addOrUpdate(data, 'add');
      },
      // 树形结构中的 修改
      modify (root, node, data) {
        root.forEach(val => {
          val.node.focus = false;
        });
        data.focus = true;
        let parent = {};
        if (data !== undefined) { // 排除顶级组织
          const parentKey = root.find(el => el === node).parent;
          if (root.find(el => el.nodeKey === parentKey)) {   // 排除 查询出的第一级机构修改会报错
            parent = root.find(el => el.nodeKey === parentKey).node;
            this.addOrUpdate(data, 'modify', parent);
          } else {
            this.addOrUpdate(root[0].node, 'modify', true);
          }
        } else {
          this.addOrUpdate(root, 'modify');
        }
      },
      // 删除
      deletes (root, node, data) {
        root.forEach(val => {
          val.node.focus = false;
        });
        data.focus = true;
        if (!data) return;
        this.selectId = [];
        this.selectId.push(data.id);
        this.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrg({orgIdArr: this.selectId.join(',')}, null, res => {
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
      // 点击新增、修改
      addOrUpdate (row, flag, parent) {
        if (row) this.pathName = row.pathName;
        this.$refs.form.resetFields();
        this.formLoading = false;
        this.originalData = {};
        if (flag === 'add') {
          this.modalTitle = '新增';
          this.wordType = '新增';
          this.originalData = row;
          this.originalData.parentOrgName = this.originalData.orgName;
          this.modalFormData = {
            orgName: '',        // 组织名称
            orgPerson: '',        // 联系人
            phone: '',        // 电话
            orgAddress: '',        // 组织地址
            parentOrgName: row.orgName,  // 上级组织名称
            parentId: row.id,           // 上级组织id
            remark: ''                 // 备注
          };
        } else if (flag === 'modify') {
          this.modalTitle = '修改';
          this.wordType = '保存';
          this.modalFormData = this._hyTool.extend({}, row);
          // 保存数据，为重置按钮使用
          this.originalData = this._hyTool.extend({}, row);
          orgList({id: row.id, flag: 1}, res => {
            this.modalFormData.userBeanSet = res[0].userBeanSet;
          }, ret => {
          });
          if (row.id.toString() === '1') {
            this.modalFormData.parentOrgName = '无';
            this.originalData.parentOrgName = '无';
          } else if (row.parentId && parent === true) {
            let parentData = this.selectOrgArray.find(val => val.value === row.parentId);
            this.modalFormData.parentOrgName = parentData.label;
            this.originalData.parentOrgName = parentData.label;
          } else {
            this.modalFormData.parentOrgName = parent.orgName;
            this.originalData.parentOrgName = parent.orgName;
          }
        }
      },
      // 提交新增修改
      addOrUpdateSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.modalFormData.id || this.modalFormData.parentId) {
              this.formLoading = true;
              saveOrg(null, this.modalFormData, res => {
                this.formLoading = false;
                this._getList();
                this.originalData = this._hyTool.extend({}, this.modalFormData);
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
                title: '请选择上级组织'
              });
            }
          }
        });
      },
      // 重置
      cancel (flag) {
        if (this.modalTitle === '新增') {
          this.$refs.form.resetFields();
          let data = this._hyTool.extend({}, this.originalData);
          this.modalFormData.parentOrgName = data.parentOrgName;
          this.modalFormData.orgPerson = '';
          this.modalFormData.phone = '';
          this.modalFormData.orgAddress = '';
          this.modalFormData.remark = '';
        } else if (this.modalTitle === '修改') {
          if (!flag) {
            this.$refs.form.resetFields();
            this.modalFormData = this._hyTool.extend({}, this.originalData);
          }
        }
      }
    }
  };
</script>
