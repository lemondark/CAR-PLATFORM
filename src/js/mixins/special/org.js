/**
 *  描述：混合类
 *  给用户管理用到的组织方法
 */
import { orgList } from '@/service/userService/org';
export default {
  data () {
    return {
      orgSearch: {},
      mixinOrgTreeArray: [],         // 组织树形结构列表
      orgTreeArrayMixin: [],
      mixinOrgTreeArrayDis: [],         // 组织树形结构列表 disabled
      orgTreeArrayDisMixin: []
    };
  },
  methods: {
    // 组织树形列表
    getOrgTree (id, cb) {
      if (id) this.orgSearch.id = id;
      this.orgTreeArrayMixin = [];
      orgList(this.orgSearch, res => {
        if (res && res.length > 0) {
          this.mixinOrgTreeArray = [];
          this.mixinOrgTreeArray = res;
          this.mixinOrgTreeArray[0].value = String(this.mixinOrgTreeArray[0].id);
          this.mixinOrgTreeArray[0].title = this.mixinOrgTreeArray[0].orgName;
          this.mixinOrgTreeArray[0].label = this.mixinOrgTreeArray[0].orgName;
          this.$set(this.mixinOrgTreeArray[0], 'expand', true);
          // this.mixinOrgTreeArray[0].render = this.treeData[0].render;
          this.mixinOrgTreeArray[0].children = this.mixinOrgTreeArray[0].orgBeanSet;
          if (this.mixinOrgTreeArray[0].orgBeanSet.length > 0) {
            this.traversalObjectOrgTree(this.mixinOrgTreeArray[0]);
          }
          this.orgTreeArrayMixin = this._hyTool.extend([], this.mixinOrgTreeArray);
          cb(this.orgTreeArrayMixin);
        } else {
          // this.mixinOrgTreeArray = [];
          cb(this.orgTreeArrayMixin);
        }
      }, ret => {
        // this.mixinOrgTreeArray = [];
        cb(this.orgTreeArrayMixin);
      });
    },
    // 组织递归
    traversalObjectOrgTree (obj) {
      let array = obj.orgBeanSet;
      for (let arr of array) {
        arr.value = String(arr.id);
        arr.title = arr.orgName;
        arr.label = arr.orgName;
//          arr.expand = true;
        this.$set(arr, 'expand', true);
        arr.children = arr.orgBeanSet;
        if (arr.orgBeanSet.length > 0) {
          this.traversalObjectOrgTree(arr);
        }
      }
    },
    // 组织树形列表 默认不能操作  供展示
    getOrgTreeDis (cb) {
      this.orgTreeArrayDisMixin = [];
      orgList({}, res => {
        if (res && res.length > 0) {
          this.mixinOrgTreeArrayDis = [];
          this.mixinOrgTreeArrayDis = res;
          this.mixinOrgTreeArrayDis[0].value = String(this.mixinOrgTreeArrayDis[0].id);
          this.mixinOrgTreeArrayDis[0].title = this.mixinOrgTreeArrayDis[0].orgName;
          this.$set(this.mixinOrgTreeArrayDis[0], 'expand', true);
          this.$set(this.mixinOrgTreeArrayDis[0], 'disabled', true);
          // this.mixinOrgTreeArrayDis[0].render = this.treeData[0].render;
          this.mixinOrgTreeArrayDis[0].children = this.mixinOrgTreeArrayDis[0].orgBeanSet;
          // dis
          if (this.mixinOrgTreeArrayDis[0].orgBeanSet.length > 0) {
            this.traversalObjectOrgTreeDis(this.mixinOrgTreeArrayDis[0]);
          }
          this.orgTreeArrayDisMixin = this._hyTool.extend([], this.mixinOrgTreeArrayDis);
          cb(this.orgTreeArrayDisMixin);
        } else {
          // this.mixinOrgTreeArrayDis = [];
          cb(this.orgTreeArrayDisMixin);
        }
      }, ret => {
        // this.mixinOrgTreeArrayDis = [];
        cb(this.orgTreeArrayDisMixin);
      });
    },
    // 组织递归
    traversalObjectOrgTreeDis (obj) {
      let array = obj.orgBeanSet;
      for (let arr of array) {
        arr.value = String(arr.id);
        arr.title = arr.orgName;
//          arr.expand = true;
        this.$set(arr, 'expand', true);
        this.$set(arr, 'disabled', true);
        arr.children = arr.orgBeanSet;
        if (arr.orgBeanSet.length > 0) {
          this.traversalObjectOrgTreeDis(arr);
        }
      }
    }
  }
};
