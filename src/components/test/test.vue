<template>
  <div class="right-body">

    <div class="rules" @mousemove="move($event)" @mouseup="up($event)" @keydown="keyDown($event)" style="user-select: none;">
      <!-- 卡尺 - x -->
      <div class="rules-x" @mousedown.self="xDown($event)">
        <span class="ruler-x-n" v-for="item in 100" :style="{'left': (item - 1) * 50 + 2 + 'px'}" :key="item">{{ (item - 1) * 10 }}</span>
      </div>

      <!-- 卡尺 - y -->
      <div class="rules-y" @mousedown.self="yDown($event)">
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
import { addLineX, addLineY } from  '@/plugins/ruler-line.js'
// import

let loading = null

export default {
  data() { 
    return {
      curObj: {},
      tNode: null,
      open: null,
      oldY: null,
      oldX: null,
      switch: null // y: 左右拖动 line x: 上下拖动 line
    }
  }, 
  methods: {
    // 鼠标按下 - x
    xDown(e){
      console.log(e)
      this.open = true
      this.oldY = e.screenY
      this.switch = 'x'

      // 创建 横 - line 
      addLineX(e.path[0], e.offsetY, this)
    }, 
    // 鼠标按下 - y
    yDown(e){
      console.log(e)
      this.open = true
      this.oldX = e.screenX
      this.switch = 'y'

      // 创建 横 - line 
      addLineY(e.path[0], e.offsetX, this)
    }, 
    // 鼠标移动
    move(e){
      if(!this.open){
        return 
      }
      console.log(e)
      if(this.switch == 'x'){
        // 计算移动的距离 y
        var chaVal = e.screenY - this.oldY,
            oldTop = this.tNode.style.top.replace('px', '')

        // 更新top值
        this.tNode.style.top = +oldTop + (+chaVal) + 'px'

        // 更新旧值
        this.oldY = e.screenY
      } else if(this.switch == 'y'){
        // 计算移动的距离 x
        var chaVal = e.screenX - this.oldX,
            oldLeft = this.tNode.style.left.replace('px', '')

        // 更新left值
        this.tNode.style.left = +oldLeft + (+chaVal) + 'px'

        // 更新旧值
        this.oldX = e.screenX
      }
    },
    // 鼠标抬起
    up(e){
      this.open = false
    },
    // 按键事件
    keyDown(e){
      console.log(e)
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
    // overflow-x: hidden;
    top: 10px;
    cursor: pointer;
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
    position: absolute;
    top: 38px;
    cursor: pointer;
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

<style>
  .linex {
    position: absolute;
    bottom: 0;
    left: -38px;
    width: calc(100% + 38px);
    height: 1px;
    background-color: #000;
    z-index: 99;
    cursor: pointer;
  }

  .liney {
    position: absolute;
    left: 0;
    top: -38px;
    height: calc(100% + 38px);
    width: 1px;
    background-color: #000;
    z-index: 99;
    cursor: pointer;
  }


  .linex:hover {
    background-color: rgb(153, 28, 28);
  }

  .select-line {
    background-color: rgb(153, 28, 28);
  }

  .del {
    display: none;
  }
</style>