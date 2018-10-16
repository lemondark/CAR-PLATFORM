
/**
* 描述：温度计组件
*/
<style lang="scss" scoped>
  .hy-thermometer-panel {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    .hy-thermometer-line {
      position: relative;
      width: 7px;
      height: 300px;
      background: #CCCCCC;
      .hy-thermometer-innerline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: inherit;
        height: 50%;
        transition: all 0.3s linear;
        background: #F00;
      }
      .hy-thermometer-ball {
        position: absolute;
        left: 50%;
        top: 290px;
        width: 30px;
        height: 30px;
        background: #F00;
        border-radius: 50%;
        transform: translate3d(-50%, 0, 0);
        &::after {
          content: attr(data-setTitle);
          position: absolute;
          padding: 0 10px;
          bottom: -25px;
          left: 50%;
          white-space:nowrap;
          font-size: 14px;
          transform: translateX(-50%);
        }
      }
    }
    .hy-thermometer-tips {
      position: absolute;
      bottom: 0;
      left: 10px;
      padding: 5px 10px;
    //  background: #CCCCCC;
      border-radius: 5px;
      white-space: nowrap;
      font-size: 12px;
      vertical-align: middle;
      transition: bottom 0.3s linear;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 100%;
        width: 0;
        height: 0;
        border: 6px solid transparent;
      //  border-left: 8px solid #CCCCCC;
        transform: translate3d(0, -50%, 0);
      }
    }
    .hy-thermometer-ruler {
      position: absolute;
      left: 20px;
      top: 2px;
      width: 14px;
      height: 280px;
      font-size: 0;
      box-sizing: border-box;
      .cm, .mm {
        position: absolute;
        border-top: 1px solid #CCCCCC;
        width: 4px;
        height: auto;
      }
      // .cm:after {
      //   position: absolute;
      //   top: -7px;
      //   left: 20px;
      //   content: attr(data-setNum);
      //   font: 12px/1 sans-serif;
      // }
      .mm {
        width: 5px;
      }
    }
  }
</style>
<template>
  <div class="hy-thermometer-panel">
    <div class="hy-thermometer-line" :style="lineStyle">
      <div class="hy-thermometer-innerline" :style="styles"></div>
      <span style="position:absolute;top:0;left:-13px;">H</span>
      <span style="position:absolute;bottom:0;left:-13px;">C</span>
      <!--<div class="hy-thermometer-ball" :data-setTitle="title" :style="ballStyle"></div>-->
    </div>
    <!-- 尺子 -->
    <div class="hy-thermometer-ruler" :style="rulerStyle">
      <div class='cm' :data-setNum="setNum(item)" v-for="item in equal" :key="item" :style="cmStyle(item)">
        <!--<div v-if="item !== equal" class='mm' v-for="itm in 9" :key="itm" :style="mmStyle(itm)"></div>-->
      </div>
    </div>
    <!-- 提示 -->
    <div class="hy-thermometer-tips" ref="tips" :style="tipStyle">{{tValue}}°C</div>
  </div>
</template>
<script>
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (fn) {
      return setTimeout(fn, 1000 / 60);
    };
  }
  const linear = (t, b, c, d) => {
    return c * t / d + b;
  };

  const prefixTime = 300;
  export default {
    name: 'Thermometer',
    props: {
      width: {
        type: Number,
        validator: function (value) {
          return value >= 0;
        },
        default: 15
      },
      height: {
        type: Number,
        validator: function (value) {
          return value >= 100;
        },
        default: 300
      },
      degrees: {
        type: Number,
        default: 0
      },
      offset: {
        type: Number,
        validator: function (value) {
          return value >= 10;
        },
        default: 20
      },
      max: {
        type: Number,
        validator: function (value) {
          return value % 10 === 0;
        },
        default: 100
      },
      min: {
        type: Number,
        validator: function (value) {
          return value % 10 === 0;
        },
        default: -20
      },
      bg: String,
      activeBg: String,
      title: String
    },
    data () {
      return {
        tLeft: 0,
        tValue: 0
      };
    },
    computed: {
      equal () {
        return (this.max - this.min) / this.offset + 1;
      },
      equalPartHeight () {
        return (this.height - 20) / ((this.equal - 1) * this.offset);
      },
      value () {
        return this.degrees > this.max
          ? this.max
          : this.degrees < this.min ? this.min : this.degrees;
      },
      styles () {
        let style = {};
        style.height = (this.value - this.min) * this.equalPartHeight + 10 + 'px';
        if (this.activeBg) {
          style.backgroundColor = this.activeBg;
        }
        return style;
      },
      lineStyle () {
        let style = {
          width: `${this.width}px`,
          height: `${this.height}px`
        };
        if (this.bg) {
          style.backgroundColor = this.bg;
        }
        return style;
      },
      ballStyle () {
        let style = {
          width: `${this.width * 2}px`,
          height: `${this.width * 2}px`,
          top: `${this.height - 10}px`
        };
        if (this.activeBg) {
          style.backgroundColor = this.activeBg;
        }
        return style;
      },
      rulerStyle () {
        return {
          left: `${this.width * 0.9}px`,
          height: `${this.height - 5}px`
        };
      },
      tipStyle () {
        return {
          bottom: parseFloat(this.styles.height) - 14 + 'px',
          left: '10px'
        };
      }
    },
    mounted () {
      this.getRect();
      this.tValue = this.value;
    },
    methods: {
      getRect () {
        if (this.$refs.tips.offsetWidth) {
           this.$nextTick(() => {
          this.tLeft = this.$refs.tips.offsetWidth;
        });
        }
      },
      setNum (index) {
        return this.max - (this.offset * (index - 1));
      },
      cmStyle (index) {
        return {
          height: `${100 / (this.equal - 1)}%`,
          top: `${100 / (this.equal - 1) * (index - 1)}%`
        };
      },
      mmStyle (index) {
        return {
          width: (index === 5) ? '10px' : '5px',
          top: `${10 * index}%`
        };
      },
      animate (start, end, during) {
        start = start || 0;
        let interval = end - start;
        let startTime = 0;
        during = during * 60 / 1000;
        const step = () => {
          let value = linear(startTime++, start, interval, during);
          if (startTime >= during) {
            value = end;
            setTimeout(() => {
              this.getRect();
            });
          } else {
            window.requestAnimationFrame(step);
          }
          this.tValue = parseInt(value);
        };
        step();
      }
    },
    watch: {
      value (val, oldVal) {
        if (val === oldVal) return;
        this.animate(oldVal, val, prefixTime);
      }
    }
  };
</script>
