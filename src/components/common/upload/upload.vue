<style lang="scss" scoped>
</style>
<template>
  <div>
    <Upload
      :before-upload="handleUpload"
      action="//">
      <Button type="ghost" icon="ios-cloud-upload-outline">选择要导入的文件</Button>
    </Upload>
    <div v-if="file !== null">待导入文件：{{ file.name }}
      <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '导入中' : '待导入' }}</Button>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'hyUpload',
    data () {
      return {
        file: null
      };
    },
    props: {
      format: {
        type: Array,
        default: ['jpg', 'png', 'gif']
      },
      maxSize: {
        type: Number,
        default: 2048
      },
      loadingStatus: Boolean
    },
    created () {
    },
    methods: {
      handleUpload (file) {
        let format = this.format;// 文件格式限制
        let maxSize = this.maxSize * 1024; // 文件大小限制
        // 判断文件是否符合上传要求
        let fileName = file.name;
        let fileSize = file.size / 1024;
        var suffix = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);// 后缀名
        if (format.indexOf(suffix) === -1) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 ' + format.toString() + ' 格式的图片。'
          });
        } else if (maxSize < fileSize) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 ' + maxSize / 1024 + 'M。'
          });
        } else {
          this.$emit('get-file', file);
          this.file = file;
        }
        return false;
      }
    }
  };
</script>
