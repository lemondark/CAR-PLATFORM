<style lang="scss" scoped>
  .hy_div {
    text-align: center;
    width: 260px;
    margin-top: 20px;
  }
  .hy_button {
    width: 60px;
    height: 24px;
  }
</style>
<template>
  <div class="hy_div">
    <div v-if="showSwitch">
      <Switch size="large" v-model="current" @on-change="change" :true-value="1" :false-value="2">
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
      </Switch>
    </div>
    <div v-else>
      <Button type="primary" shape="circle" class="hy_button" @click="clickButton"></Button>
    </div>
    <div>
      <hy-icon :type="jsonData.type" class="adduser" :showContent="true" :size='size'></hy-icon>
      <span>{{jsonData.label}}</span>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'hySwitch',
    data () {
      return {
        current: this.value
      };
    },
    props: {
      value: {
        type: Number,
        default: 2
      },
      size: {
        type: Number,
        default: 18
      },
      showSwitch: {
        type: Boolean,
        default: true
      },
      jsonData: Object
    },
    methods: {
      change (value) {
        // if (this.jsonData.value === 'airHeating' || this.jsonData.value === 'airRefrigeration') {
        //   let air = this._hyTool.findComponentUpward(this, 'hyRemote').addForm;
        //   if (!air.time || !air.temperature) {
        //     setTimeout(() => {
        //       if (value === 1) {
        //         this.current = 2;
        //       } else {
        //         this.current = 1;
        //       }
        //     }, 500);
        //     this.$Notice.warning({
        //       title: '',
        //       desc: '请填写控制秒数与温度'
        //     });
        //     return;
        //   }
        // }
        this.$confirm(this.jsonData.prompt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.$emit('input', value);
          this.$emit('click', value, this.jsonData);
        }).catch(() => {
          if (value === 2) {
            this.current = 1;
          } else {
            this.current = 2;
          }
        });
      },
      clickButton () {
        this.$confirm(this.jsonData.prompt, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.$emit('click', null, this.jsonData);
        }).catch(() => {
        });
      }
    }
  };
</script>
