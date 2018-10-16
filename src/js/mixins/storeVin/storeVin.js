/**
 *  描述：混合类
 *  搜索后保留vin
 */
import { vehicleList } from '@/service/vehicleManageService/vehicleService';
export default {
  data () {
    return {
      notFoundText: '',
      loading1: false,
      optionsVin: []
    };
  },
  methods: {
    storeVin (vin) {
        let userInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
        if (this._hyTool.getStore(`${userInfo.userName}Vin`, true)) {
            let storeVin = JSON.parse(this._hyTool.getStore(`${userInfo.userName}Vin`, true));
            if (storeVin.userName === userInfo.userName) {
              storeVin.vinList.map((item, index) => {
                if (item.value === vin) storeVin.vinList.splice(index, 1);
              });
              storeVin.vinList.unshift({value: vin, label: vin});
              if (storeVin.vinList.length >= 5) storeVin.vinList.splice(5, storeVin.vinList.length);
              this._hyTool.setStore(`${userInfo.userName}Vin`, storeVin, true);
            }
          } else {
            let storeVin = {
              userName: userInfo.userName,
              vinList: []
            };
            storeVin.vinList.push({value: vin, label: vin});
            this._hyTool.setStore(`${userInfo.userName}Vin`, storeVin, true);
        };
    },
    watchVin (select) {
        let userInfo = JSON.parse(this._hyTool.getStore('loginInfo', true));
        this.$refs[select].$el.addEventListener('click', () => {
          if (this.$refs[select]) this.$refs[select].setQuery(' ');
          this.notFoundText = '';
          if (this._hyTool.getStore(`${userInfo.userName}Vin`, true)) {
          let storeVin = JSON.parse(this._hyTool.getStore(`${userInfo.userName}Vin`, true));
          if (userInfo.userName === storeVin.userName) {
            this.$nextTick(() => {
              this.optionsVin = storeVin.vinList;
            });
          } else {
            this.optionsVin = [];
          }
        }
      });
    },
    // VIN搜索
    vinMethod (query) {
      query = query.trim();
      if (query !== '') {
        this.loading1 = true;
        let params = {
          pageSize: 10,
          pageNum: 1,
          vinCode: query
        };
        vehicleList(params, res => {
          const vinList = res.map(item => {
            return {value: item.vinCode, label: `【${item.vinCode}】【${!item.plateNo === true ? '无车主' : item.plateNo}】`};
          });
          this.notFoundText = '';
          if (vinList.length > 0) this.notFoundText = '';
          else this.notFoundText = '无匹配数据';
          setTimeout(() => {
            this.loading1 = false;
            this.optionsVin = vinList.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        });
      } else {
        this.optionsVin = [];
      }
    }
  }
};
