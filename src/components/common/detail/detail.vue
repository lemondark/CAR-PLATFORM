<style lang="scss" scoped>
  .detail-body {
    width: 100%;
    height: auto;
  }

  .detail-item {
    width: 50%;
    min-width: 240px;
    line-height: 40px;
    float: left;
    /*background-color: #f8f8f9;*/
    border-bottom: 1px solid #e9eaec;
  }

  .detail-item2 {
    width: 100%;
    min-width: 480px;
    line-height: 40px;
    float: left;
    /*background-color: #f8f8f9;*/
    border-bottom: 1px solid #e9eaec;
    .detail-title {
      width: 20%;
    }
    .detail-content {
      width: 80%;
    }
  }

  .detail-title {
    text-align: right;
    width: 40%;
    min-width: 80px;
    /* padding-right: 20px;*/
    float: left;
  }

  .detail-content {
    width: 60%;
    min-width: 140px;
    padding-left: 20px;
    padding-right: 10px;
    word-wrap:break-word;
    float: left;
  }
</style>
<template>
  <div class="detail-body" :style="style">
    <template v-for="rd,index in itemArray">
      <div :class="rd.newLine || ((index + 1) === itemArray.length && rd.index  % 2 !==0)?'detail-item2':'detail-item'" :style="((Math.ceil(rd.index / 2)) % 2 === 0)?{'background-color':'#f8f8f9'}:{'background-color':'#FFFFFF'}">
        <div class="detail-title">
          <p v-if="rd.title">{{rd.title}}：</p>
          <p v-else>&nbsp</p>
        </div>
        <div class="detail-content">
          <hy-cell v-if="rd.array" :array="rd.array"
                   :value="rd.value || rd.value===0?rd.value.toString():''"></hy-cell>
          <!--<span v-else>{{rd.value}}</span>-->
          <a v-else style="color:#495060;text-decoration:none;cursor:default">{{rd.value}}</a>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  // 最乱的详情代码 目前只能这样实现效果 后期有时间优化
  import HyCell from './cell.vue';

  export default {
    name: 'hyDetail',
    components: {
      HyCell
    },
    data () {
      return {
        style: {},
        itemArray: []
      };
    },
    props: {
      form: Object,
      rowData: Array
    },
    methods: {
      // 判断字符串是否超出显示范围
      getLen (val) {
        if (!val) {
          return true;
        }
        var len = 0;
        for (var i = 0; i < val.length; i++) {
          var length = val.charCodeAt(i);
          if (length >= 0 && length <= 128) {
            len += 1;
          } else {
            len += 2;
          }
        }
        if (len > 30) {
          return false;
        }
        return true;
      },
      handleData () {
        this.itemArray = [];
        let len = 0;
        // 循环需要显示的列
        for (let i in this.rowData) {
          let row = this.rowData[i];
          let item = {};
          for (let j in this.form) {
            // 取出列对应的数据
            if (j === row.key) {
              // console.log(this.form[j]);
              item.value = this.form[j];
            }
          }
          // 构建列对象
          item.title = row.title;
          if (row.array) item.array = row.array;
          item.key = row.key;
          if (this.getLen(item.value)) { // 正常显示列
            len += 1; // 列的len +1
            item.newLine = false; // 是否换行
            item.index = len;
            this.itemArray.push(item);
          } else if (len % 2 !== 0) {   // 如果长度超出显示范围并且该列不是头列
            this.itemArray.push({index: len + 1}); // 补充一列
            len += 2;// 当前列len +1
            item.newLine = true;// 换行
            item.index = len;
            this.itemArray.push(item);
            if (len % 2 !== 0) { // 如果换行后该列为头列 补充len + 1
              len += 1;
            }
          } else {
            len += 1;
            item.newLine = true;
            item.index = len;
            this.itemArray.push(item);
            len += 1;
          }
        }
        // 计算高度
        this.style = {height: (len % 2 === 0 ? len : len + 1) / 2 * 40 + 'px'};
      }
    },
    watch: {
      form (val) {
        this.handleData();
      }
    },
    mounted () {
      this.handleData();
    }
  };
</script>
