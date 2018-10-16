<style lang="scss" scoped>
</style>
<template>
  <div class="bgcolor">
    <alarm-modal :data="alarmDetailData" :vehicleData="vehicleData" :hasMap='true'></alarm-modal>
  </div>
</template>

<script>
  import { currentDetail, historyDetail } from '@/service/alarmService/nationalStandard';
  import { vehicleListAll } from '@/service/vehicleManageService/vehicleService';
  import alarmModal from '@/components/alarmDetail/alarmModal';

  export default {
    components: {
      alarmModal
    },
    data () {
      return {
        vehicleData: {},
        choosePrev: '',
        chooseNext: '',
        changeColor: 0,
        chooseNum: 0,
        circles: [],
        fakeBallWidth: '',
        newArray: [],
        alarmDetailData: {}
      };
    },
    mounted () {
      this._getList();
    },
    methods: {
      _getList () {
        let detailPara = JSON.parse(this._hyTool.getStore('alarmParams'));
        this.getVehicle(detailPara.vin);
        if (detailPara.vin && detailPara.collectTime) {
          currentDetail(detailPara, res => {
            this.alarmDetailData = res;
          }, ret => {
            this.$Notice.error({
              title: '查询实时报警详情失败',
              desc: ret
            });
          });
        }
        if (detailPara.vin && detailPara.startTime && detailPara.endTime) {
          historyDetail(detailPara, res => {
            //   console.log(res);
            if (res.length > 60) {
              let n = Math.ceil(res.length / 60);
              for (let i = 1; i <= (n - 1); i++) {
                if (res.length > 60) {
                  let item = res.splice(0, 60);
                  this.newArray.push(item);
                };
                if (res.length <= 60) {
                  this.newArray.push(res);
                };
              };
              this.circles = this.newArray[0];
            } else {
              this.circles = res;
            }
            // console.log(this.circles);
            this.contrast(0);
            if (this.circles.length > 1) {
              this.chooseNext = 'prev';
            }
          }, ret => {
            this.$Notice.error({
              title: '查询历史报警详情失败',
              desc: ret
            });
          });
        }
      },
      getVehicle (code) {
        vehicleListAll({vinCode: code}, res => {
          this.vehicleData = res[0];
        }, ret => {
          this.$Notice.error({
            title: '查询车辆信息失败',
            desc: ret
          });
        });
      },
      contrast (index) {
        this.changeColor = index;
        this.getData(this.circles[index]);
      },
      prev () {
        //  this.contrast(0);
        if (this.chooseNum > 0) {
          this.circles = [];
          this.chooseNum--;
          this.circles = this.newArray[this.chooseNum];
          this.contrast(0);
          //    this.changeColor--;
          this.chooseNext = 'prev';
          this.choosePrev = '';
        }
        if (this.chooseNum > 0 && this.chooseNum < this.newArray.length - 1) {
          this.choosePrev = 'prev';
          this.chooseNext = 'prev';
        }
      },
      next () {
        if (this.chooseNum < this.newArray.length - 1) {
          this.circles = [];
          this.chooseNum++;
          this.circles = this.newArray[this.chooseNum];
          this.contrast(0);
          this.choosePrev = 'prev';
          this.chooseNext = '';
        }
        if (this.chooseNum > 0 && this.chooseNum < this.newArray.length - 1) {
          this.choosePrev = 'prev';
          this.chooseNext = 'prev';
        }
      }
    }
  };
</script>
