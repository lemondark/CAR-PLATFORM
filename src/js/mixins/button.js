/**
 *  描述：混合类
 */

export default {
  data () {
    return {
    };
  },
  methods: {
    buttonShow (name) {
      let code = this.$store.state.defaultButtonList[name];
      let buttonShow = false;
      let storage = JSON.parse(this._hyTool.getStore('permission', true));
//        console.log(storage);
      for (let arr of storage.array) {
        if (arr === code) {
          buttonShow = true;
        }
      }
      // 超级管理员拥有所有权限 admin
      if (storage.id === 1) {
        buttonShow = true;
      }
      return buttonShow;
    }
  }
};
