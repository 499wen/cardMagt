<template>
  <div class="right-body">

    <div class="rules">
      <!-- 卡尺 - x -->
      <div class="rules-x">
        <span class="ruler-x-n" v-for="item in 100" :style="{'left': (item - 1) * 50 + 2 + 'px'}" :key="item">{{ (item - 1) * 10 }}</span>
      </div>

      <!-- 卡尺 - y -->
      <div class="rules-y">
        <span class="ruler-y-n" v-for="item in 30" :style="{'top': (item - 1) * 50 + 2 + 'px'}" :key="item">{{ (item - 1) * 10 }}</span>
      </div>

      <!-- 模板 -->
      <div class="model">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

// 引入打印 文件  比例： 1:50
// import printJS from '@/plugins/print.js'
import time from '@/plugins/time.js';
import getAge from  '@/plugins/getAge.js'

let loading = null

export default {
  data() {
    return {
      ruler:{
          width: '60',
          height: '40'
        }
    }
  }
}

</script>

<style lang="less" scoped>
  .right-body {
    width: 100%;
    height: calc(100%);
    background-color: #eee;
    position: relative;
  }

  .rules {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .rules-x {
    position: absolute;
    left: 38px;
    overflow: hidden;
    top: 10px;
    width: calc(100% - 40px);
    height: 18px;
    background: url('../../assets/ruler.png') repeat-x;
  }

  .ruler-x-n {
    top: 1px;
    left: 2px;
    position: absolute;
    font: 10px/1 Arial,sans-serif;
    color: #333;
  }

  .rules-y {
    overflow: hidden;
    position: absolute;
    top: 38px;
    left: 10px;
    height: calc(100% - 40px);
    width: 18px;
    background: url('../../assets/ruler-y.png') repeat-y;
  }

  .ruler-y-n {
    top: 1px;
    left: 2px;
    position: absolute;
    font: 10px/1 Arial,sans-serif;
    color: #333;
  }

  .model {
    position: absolute;
    top: 38px;
    left: 38px;
    // width: 300px;
    // height: 200px;
    // background-color: #fff;
  }

</style>