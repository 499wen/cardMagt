<template>
  <div class="right-body" >

    <div class="rules" @mousemove="move($event)" @mouseup="up($event)" style="user-select: none;">
      <div class="empty-x"></div>
      <div class="empty-y"></div>
      <div class="clear" title="清空提示线" @click.self='clearLine'></div>

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
      tNode: null, // 当前选中的line dom
      open: null, // 可移动开关
      oldY: null, // 记录旧 y值
      oldX: null, // 记录旧 x值
      switch: null // y: 左右拖动 line x: 上下拖动 line
    }
  }, 
  methods: {
    // 清空所有提示线
    clearLine(){
      console.log(document.querySelectorAll('.tips'))
      // 所有line dom
      var allLineDom = document.querySelectorAll('.tips')

      // 删除
      for(let item of allLineDom){
        item.parentNode.removeChild(item)
      }
    },
    // 鼠标按下 - x
    xDown(e){
      console.log(e)
      this.open = true
      this.oldY = e.screenY
      this.switch = 'x'

      // 创建 横 - line 
      addLineX(e.path[1], e.offsetY, this)
    }, 
    // 鼠标按下 - y
    yDown(e){
      console.log(e)
      this.open = true
      this.oldX = e.screenX
      this.switch = 'y'

      // 创建 横 - line 
      addLineY(e.path[1], e.offsetX, this)
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
    overflow: hidden;
  }

  .rules-x {
    position: absolute;
    left: 38px;
    z-index: 100;
    // overflow-x: hidden;
    top: 10px;
    cursor: pointer;
    width: calc(100% - 40px);
    height: 18px;
    background: url('../../assets/ruler.png') repeat-x;
  }

  .empty-x {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 28px;
    background-color: #fff;
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
    z-index: 100;
    cursor: pointer;
    left: 10px;
    height: calc(100% - 40px);
    width: 18px;
    background: url('../../assets/ruler-y.png') repeat-y;
  }

  .empty-y {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    height: 100%;
    width: 28px;
    background-color: #fff;
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

  .clear {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ccc;
    z-index: 51;
    cursor: pointer;
  }

</style>

<style>
  .linex {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #000;
    z-index: 30;
    cursor: move;
  }

  .line-x-box {
    position: absolute;
    left: 90%;
    top: -10px;
    height: 21px;
    width: 10px;
    background-color: inherit;
  }

  .liney {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background-color: #000;
    z-index: 30;
    cursor: move;
  }

  .line-y-box {
    position: absolute;
    top: 90%;
    left: -10px;
    width: 21px;
    height: 10px;
    background-color: inherit;
  }

  .linex:hover {
    background-color: rgb(153, 28, 28);
  }

  .liney:hover {
    background-color: rgb(153, 28, 28);
  }

  .select-line {
    background-color: rgb(153, 28, 28);
  }

  .line-func {
    box-shadow: 1px 1px 5px 1px #ccc;
    padding: 3px;
    width: 30px;
    font-size: 14px;
    color: #666;
    position: absolute;
    display: none;
    cursor: pointer;
  }

  .linex:hover .line-func, .liney:hover .line-func {
    display: block;
  }

  .del {
    display: none;
  }
</style>