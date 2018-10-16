<style lang="scss" scoped>
  .red{
    color: red;
  }
</style>
<template>
  <div style="transform: translateX(0%) translateZ(0px);">
    <template v-for="f in formRow">
      <FormItem :label="f.title" :prop="f.key">
        <i-input v-model="form[f.key]" :placeholder="f.placeholder"
                 v-if="!f.type || f.type === 'text' || f.type === 'password' || f.type === 'textarea'"
                 :type="f.type?f.type:'text'" :disabled="isProperty(f.property,'disabled')"  :maxlength="isProperty(f.property,'maxlength')" :clearable="f.clearAble ? false : true"></i-input>
        <i-select v-model="form[f.key]" :placeholder="f.placeholder" filterable clearable v-if="f.type === 'select'"
                  :disabled="isProperty(f.property,'disabled')" :multiple="isProperty(f.property,'multiple')"
                  :remote-method="f.remoteMethod">
          <Option v-for="item in f.array" :value="item.value" :key="item.value">{{item.label}}</Option>
        </i-select>
        <i-select v-model="form[f.key]" :placeholder="f.placeholder" filterable c v-if="f.type === 'select2' && f.onChange !== undefined"
                  :disabled="isProperty(f.property,'disabled')" @on-change="f.onChange" :label-in-value="isProperty(f.property,'labelValue')">
          <Option v-for="item in f.array" :value="item.value" :key="item.value">{{item.label}}</Option>
        </i-select>
        <DatePicker v-model="form[f.key]" :placeholder="f.placeholder"
                    v-if="f.type === 'date' || f.type === 'daterange' || f.type === 'datetime' || f.type === 'datetimerange'"
                    :type="f.type" :format="isProperty(f.property, 'format')"
                    :placement="isProperty(f.property, 'placement')" :style="isProperty(f.property, 'style')"
                    :editable="false" @on-change="form[f.key]=$event"></DatePicker>
        <RadioGroup v-model="form[f.key]" v-if="f.type === 'radio'">
          <template v-for="item in f.array">
            <Radio :label="item.value" :disabled="isProperty(item, 'disabled')">{{item.label}}</Radio>
          </template>
        </RadioGroup>
        <Cascader v-model="form[f.key]" v-if="f.type === 'cascader'" :data="f.array"></Cascader>
      </FormItem>
    </template>
  </div>
</template>
<script>

  export default {
    name: 'hyFormItem',
    data () {
      return {};
    },
    props: {
      form: Object,
      formRow: Array
    },
    created () {
    },
    methods: {
      // 上传成功后传值给form对象
      uploadSuccess (res, file) {
        // console.log(file, '文件成功对象');
        for (let i in this.$refs) {
          if (this.$refs.hasOwnProperty(i)) {
            if (this.$refs[i][0]) {
              this.form[i] = this.$refs[i][0].fileList[0].response.data;
            }
          }
        }
      },
      handleFormatError (file) {
        // console.log(file, '文件对象');
      },
      // 移除文件时触发
      fileRemove () {
        for (let i in this.$refs) {
          if (this.$refs.hasOwnProperty(i)) {
            this.form[i] = '';
          }
        }
      },
      // 判断是否有此属性
      isProperty (pro, attr) {
        // 如果想要的属性存在 返回该属性值
        if (pro) {
          if (pro[attr]) {
            return pro[attr];
          }
        }
        // 不存在返回默认值
        switch (attr) {
          case 'placement': {
            return 'bottom';
          }
          case 'disabled': {
            return false;
          }
          case 'multiple': {
            return false;
          }
        }
      }
    }
  };
</script>
