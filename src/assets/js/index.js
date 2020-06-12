import time from '@/plugins/time.js'
import $ from "vue-jquery";

import {
    hideBox,
    idMap,
    nodeStyleMap,
    nodes,
    drop,
    initNode,
    addSubmitForm,
    imageDrag,
    imageDragover
} from "@/plugins/invitation.js";

export default  {
    data() {
        return {
            idList: [],
            showKey: 0,
            headerTag: [
                {label: '模板制作', name: '模板制作', select: true},
                {label: '数据填充', name: '数据填充', select: false},
                {label: '导出', name: '导出', select: false},
            ],
            presetLine: [{ type: 'l', site: 150 }, { type: 'v', site: 50 }],
            aaa: true
        }
    },
    methods: {
        switchTab:function(idx){ 
            this.headerTag.map((item, index) => index == idx ? item.select = true : item.select = false)
        },
        // 图片移动
        imgDrag: function(event) {
            console.log("文本元素 ");
            event = event || window.event;

            event.dataTransfer.setData("text", "image");
        },
        imgDragover: function(event) {
            console.log("文本元素 textDragover");

            event = event || window.event;
            event.preventDefault();
        },

        allowDrop: function(ev) {
            console.log("allowDrop");
            ev.preventDefault();
        },
        dropTest: function(event) {
            drop(event, this);
        },
    },
    mounted() {
        console.log(time(new Date().getTime()))
        // console.log(VueRulerTool)
    }

}