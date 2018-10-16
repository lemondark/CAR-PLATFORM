/**
 *  描述：字典混合类
 */
import { userList } from '@/service/userService/user';
import { orgList } from '@/service/userService/org';
import { roleList } from '@/service/userService/role';
import { serviceStationList } from '@/service/serviceStationService/serviceStation';

export default {
  data () {
    return {
      // dicSearch: {pageNum: 1, pageSize: 10000},
      dicSearch: {},
      selectUserArray: [],              // 用户列表
      selectOrgArray: [],              // 组织列表
      selectOrgTreeArray: [],         // 组织树形结构列表
      selectOrgTreeArrayDis: [],         // 组织树形结构列表 disabled
      selectRoleArray: [],             // 获取角色列表
      selectStationArray: []           // 获取所有服务站
    };
  },
  computed: {},
  created () {
  },
  methods: {
    // 用户列表
    getSelectUser (num) {
      let dicSearch = {};
      if (num) {
        dicSearch.pageNum = 1;
        dicSearch.pageSize = 10000;
      } else {
        dicSearch = {};
      }
      userList(dicSearch, res => {
        if (res.content && res.content.length > 0) {
          this.selectUserArray = [];
          res.content.forEach((item) => {
            if (!(item.userName === '' || item.userName === null)) {
              this.selectUserArray.push({value: item.id, label: item.userName, key: item.id});
            }
          });
          // console.log(JSON.stringify(this.selectUserArray));
        } else {
          this.selectUserArray = [];
        }
      }, ret => {
        this.selectUserArray = [];
      });
    },
    // 组织列表
    getSelectOrg () {
      orgList(this.dicSearch, res => {
        if (res && res.length > 0) {
          this.selectOrgArray = [];
          res.forEach((item) => {
            if (!(item.orgName === '' || item.orgName === null)) {
              this.selectOrgArray.push({value: item.id, label: item.orgName, code: item.orgCode, partitionKey: item.partitionKey});
              this.traversalObjectArray(item.orgBeanSet);
            }
          });
        } else {
          this.selectOrgArray = [];
        }
      }, ret => {
        this.selectOrgArray = [];
      });
    },
    // 组织递归
    traversalObjectArray (array) {
      for (let arr of array) {
        this.selectOrgArray.push({value: arr.id, label: arr.orgName, code: arr.orgCode, partitionKey: arr.partitionKey});
        if (arr.orgBeanSet.length > 0) {
          this.traversalObjectArray(arr.orgBeanSet);
        }
      }
    },
    // 组织树形列表
    getSelectOrgTree () {
      orgList(this.dicSearch, res => {
        if (res && res.length > 0) {
          this.selectOrgTreeArray = [];
          this.selectOrgTreeArray = res;
          this.selectOrgTreeArray[0].value = this.selectOrgTreeArray[0].id;
          this.selectOrgTreeArray[0].title = this.selectOrgTreeArray[0].orgName;
          this.$set(this.selectOrgTreeArray[0], 'expand', true);
          // this.selectOrgTreeArray[0].render = this.treeData[0].render;
          this.selectOrgTreeArray[0].children = this.selectOrgTreeArray[0].orgBeanSet;
          if (this.selectOrgTreeArray[0].orgBeanSet.length > 0) {
            this.traversalObjectTree(this.selectOrgTreeArray[0]);
          }
        } else {
          this.selectOrgTreeArray = [];
        }
      }, ret => {
        this.selectOrgTreeArray = [];
      });
    },
    // 组织递归
    traversalObjectTree (obj) {
      let array = obj.orgBeanSet;
      for (let arr of array) {
        arr.value = arr.id;
        arr.title = arr.orgName;
//          arr.expand = true;
        this.$set(arr, 'expand', false);
        arr.children = arr.orgBeanSet;
        if (arr.orgBeanSet.length > 0) {
          this.traversalObjectTree(arr);
        }
      }
    },
    getSelectOrgTreeDis () {
      orgList(this.dicSearch, res => {
        if (res && res.length > 0) {
          this.selectOrgTreeArrayDis = [];
          this.selectOrgTreeArrayDis = res;
          this.selectOrgTreeArrayDis[0].value = this.selectOrgTreeArrayDis[0].id;
          this.selectOrgTreeArrayDis[0].title = this.selectOrgTreeArrayDis[0].orgName;
          this.$set(this.selectOrgTreeArrayDis[0], 'expand', true);
          this.$set(this.selectOrgTreeArrayDis[0], 'disabled', true);
          // this.selectOrgTreeArrayDis[0].render = this.treeData[0].render;
          this.selectOrgTreeArrayDis[0].children = this.selectOrgTreeArrayDis[0].orgBeanSet;
          // dis
          if (this.selectOrgTreeArrayDis[0].orgBeanSet.length > 0) {
            this.traversalObjectTreeDis(this.selectOrgTreeArrayDis[0]);
          }
        } else {
          this.selectOrgTreeArrayDis = [];
        }
      }, ret => {
        this.selectOrgTreeArrayDis = [];
      });
    },
    // 组织递归
    traversalObjectTreeDis (obj) {
      let array = obj.orgBeanSet;
      for (let arr of array) {
        arr.value = arr.id;
        arr.title = arr.orgName;
//          arr.expand = true;
        this.$set(arr, 'expand', true);
        this.$set(arr, 'disabled', true);
        arr.children = arr.orgBeanSet;
        if (arr.orgBeanSet.length > 0) {
          this.traversalObjectTreeDis(arr);
        }
      }
    },
    // 角色列表
    getSelectRole () {
      roleList(this.dicSearch, res => {
        if (res && res.length > 0) {
          res.forEach((item) => {
            item.key = item.id;
            if (item.roleName.length > 8) item.roleName = item.roleName.substring(0, 8) + '...';
            item.label = item.roleName;
          });
          this.selectRoleArray = res;
        } else {
          this.selectRoleArray = [];
        }
      }, ret => {
        this.selectRoleArray = [];
      });
    },
    // 服务站
    getSelectStation () {
      this.dicSearch.nature = '1,2,3';
      this.dicSearch.state = '1';
      serviceStationList(this.dicSearch, res => {
        if (res && res.length > 0) {
          this.selectStationArray = [];
          res.forEach((item) => {
            if (!(item.serviceStationName === '' || item.serviceStationName === null)) {
              this.selectStationArray.push({value: item.id, label: item.serviceStationName, key: item.id});
            }
          });
          // console.log(JSON.stringify(this.selectStationArray));
        } else {
          this.selectStationArray = [];
        }
      }, ret => {
        this.selectStationArray = [];
      });
    }
  }
};
