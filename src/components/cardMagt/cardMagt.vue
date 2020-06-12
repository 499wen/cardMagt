<template>
    <div class="card-main">
        <!-- 头部导航 -->
        <div class="nav-header">
            <span 
                :class="['nav-single', item.select && 'nav-select']" 
                v-for="(item, idx) in headerTag" :key="idx"
                @click.self="switchTab(idx)"
            > {{ item.name }} </span>
        </div>

        <!-- 模板制作 -->
        <div class="model-make" v-show="headerTag[0].select">
             <!-- 上部分 -->
             <div class="model-make-top">
                 <!-- 设置模板长宽属性 -->
                 <i class="el-icon-s-tools"></i>
             </div>

             <div class="model-make-container">
                <!-- 左侧部分 -->
                <div class="model-make-left">
                     
                     <!-- 图片 -->
                     <i class="el-icon-picture" @dragstart="imgDrag($event)" @dragover="imgDragover($event)" style="position: absolute; z-index: 11"></i>
                     <i class="el-icon-picture"></i>
                     <i class="el-icon-picture"></i>
                     <i class="el-icon-picture"></i>

                </div>

                <!-- 右侧部分 -->
                <div class="model-make-right">

                    <vue-ruler-tool
                        :parent="aaa"
                        :content-layout="{left: 50,top: 50}"
                        :is-scale-revise="true"
                        :preset-line="presetLine"
                    >
                        <div class="mask" @drop="dropTest($event)" @dragover="allowDrop($event)"></div>
                    </vue-ruler-tool>
                </div>

             </div>
        </div>

    </div>
</template>

<script>
// import VueRulerTool from 'vue-ruler-tool'

// export default  {
//     components:{
//         'vue-ruler-tool': VueRulerTool
//     },
//     data() {
//         return {
//             headerTag: [
//                 {label: '模板制作', name: '模板制作', select: true},
//                 {label: '数据填充', name: '数据填充', select: false},
//                 {label: '导出', name: '导出', select: false},
//             ],
//             presetLine: [{ type: 'l', site: 100 }, { type: 'v', site: 200 }]
//         }
//     },
//     methods: {
//         switchTab:function(idx){ 
//             this.headerTag.map((item, index) => index == idx ? item.select = true : item.select = false)
//         }
//     },
//     mounted() {
//         // console.log(VueRulerTool)
//     }

// }
import CardMagt from '../../assets/js/index.js'

export default CardMagt;
</script>

<style lang="less" scoped>
@import './index.less';

</style>