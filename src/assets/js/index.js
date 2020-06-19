import time from '@/plugins/time.js'
import $ from 'jquery'

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

var token = localStorage.getItem("token") || 'asdfghjklzxcvbndfgherghjkcvb123456'

export default  {
    data() { 
        return {
            tableData: [{
                fans: 'https://pic4.zhimg.com/80/v2-47a389a0c35f02f7263f7af7ebe37187_1440w.jpg',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }, {
                fans: 'https://pic4.zhimg.com/80/v2-aa2d1badd74884f7f876d61076a8f4b0_1440w.jpg',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              }],
              multipleSelection: [],
            
            eleList: [],
            show: false,
            imgShow: false,
            isImage: true,
            modelShow: false,
            img: {
                paddingL: '',
                paddingT: '',
                width: '',
                height: ''
            },
            text: {
                paddingL: '',
                paddingT: '',
                width: '',
                height: ''
            },
            model: {
                width: '300',
                height: '400',
                bgcolor: '#fff',
                bleedingSite: '0'
            },

            headers: {
                // Authorization: token,
                // token: token
            },
            defaultStyle: {
                textColor: "#2c3e50",
                fontFamily: "微软雅黑",
                fontSize: "14px",
                lineSpa: 0,
                lineHeight: 16,
                opacity: 100,
                textAlign: "",
                fontWeight: false,
                textDecoration: false,
                fontStyle: false,
                backColor: "#FFFFFF",
                borderColor: "",
                borderStyle: "none",
                hierarchy: '1',
                borderWidth: 0,
                borderRadius: 0,
                shadowWidth: 0,
                shadowDim: 0,
                shadowDirectionV: 0,
                shadowDirectionH: 0,
                shadowColor: "#000",

                'width': '105', // 宽度
                'height': '105', // 高度
                'varName': '', // 变量名
            },

            varName: '',
            activeName: [],
            idList: [],
            showKey: 0,
            headerTag: [
                {label: '模板制作', name: '模板制作', select: true},
                {label: '数据填充', name: '数据填充', select: false},
                // {label: '导出', name: '导出', select: false},
            ],
            presetLine: [{ type: 'l', site: 50 }, { type: 'v', site: 50 }],
            aaa: true,
            tc: '',
            curElem: '',
        }
    },
    methods: {
        // 新建
        newCreate(){
            // 删除模板中所有元素
            var parentDom = document.querySelector('.mask'),
                html = `
                <div class="mask-leftTop mask-direction"></div>
                <div class="mask-leftBottom mask-direction"></div>
                <div class="mask-rightTop mask-direction"></div>
                <div class="mask-rightBottom mask-direction"></div>
                `

            while(parentDom.hasChildNodes()){
                parentDom.removeChild(parentDom.firstChild)
            }

            // 将显示出血位的'div'添加进'parentDom'中
            parentDom.insertAdjacentHTML('afterbegin', html)

            console.log(parentDom)
        },
        // 选中单行
        rowClick(e){
            console.log(e)
            for(let i in e){
                if(i == 'fans'){
                    $('.' + i).css('background-image', 'url('+ e[i] +')')
                } else {
                    $('.' + i).text(e[i])
                }
            }
        },
        // 元素列表 - 选中的元素
        selectDom(item, idx){
            console.log(item.dom)
            this.eleList.filter( (i, index) => idx == index ? i.select = true : i.select = false )

            item.dom.click()
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 模板 - 选择颜色
        colorSelect(e){
            this.model.bgcolor = e
        },
        switchTab:function(idx){ 
            var box = document.querySelector('.box')
                this.tc = box.parentNode.innerHTML
            
            setTimeout(() => {
                // return 
                this.headerTag.map((item, index) => index == idx ? item.select = true : item.select = false)
                // 关闭弹框
                this.imgShow = false
                
                // 选中框dom
                var none = document.querySelectorAll('.i-t-b-border')

                console.log(none)
                // 数据填充
                if(idx == 1){
                    this.eleList.filter( (item, index, list) => {
                        // if(item.varName) {
                        //     console.log(item)
                        //     // 图片相关 - 删除图片地址
                        //     if(item.varName == 'fans'){
                        //         item.dom.style.backgroundImage = ''
                        //         // 文本相关 - 删除文本内容
                        //     } else {
                                
                        //     }
                        // }

                        // 去除 '双击选择图片' 字样  --  选中 fans 属性
                        if(item.dom.innerText == '双击选择图片'){
                            var lang = this.eleList.length
                            console.dir(item.dom)
                            // 将 '双击选择图片' 隐藏  且 选中属性后选择图片, 将清空地址
                            item.dom.innerHTML = item.dom.innerHTML.replace('>双击选择图片<', '><')
                            document.querySelectorAll('.fans')[1].style.backgroundImage = 'url()'

                            console.dir(item.dom)
                        }
                    })

                    // 循环 隐藏 '双击选择图片' '点击这里编辑' 字样
                    for(let i = 0; i < this.eleList.length; i++) {
                        document.querySelectorAll('.invite-text-box .tip')[i + this.eleList.length].style.opacity = 0
                    }

                    // 将元素选中提示 隐藏
                    for(let i of none){
                        i.style.display = 'none'
                    }
                    // none.map(item => item.style.display = 'none')
                    // 模板制作
                } else if(idx == 0){
                    // none.map(item => item.style.display = 'block')
                    var leng = document.querySelectorAll('.tip')

                    // 
                    for(let i of leng){
                        i.style.opacity = 1
                    }

                    // 将元素选中提示 显示
                    for(let i of none){
                        i.style.display = 'block'
                    }
                    
                }

            }, 500)

        },
        // 图片移动
        imgDrag: function(event) {
            console.log("图片元素 ");
            event = event || window.event;
            this.curElem = '图片元素'

            event.dataTransfer.setData("text", "image");
        },
        imgDragover: function(event) {
            console.log("图片元素 textDragover");

            event = event || window.event;
            event.preventDefault();
        },
        // 文字移动
        textDrag: function(event) {
            console.log("文本元素 ");
            event = event || window.event;
            this.curElem = '文本元素'

            event.dataTransfer.setData("text", "invite-text");
        },
        textDragover: function(event) {
            console.log("文本元素 textDragover");

            event = event || window.event;
            event.preventDefault();
        },

        allowDrop: function(ev) {
            console.log("allowDrop");
            ev.preventDefault();
        },
        dropTest: function(event) {
            console.log(this)
            drop(event, this);
        },
        initTemplateCss: function(node) {
            if ($(node).hasClass("formTemplate")) {
                this.showStyle = false;
            } else {
                this.showStyle = true;
            }
            //从nodeStyleMap获取该node的样式，否则解析节点  填充属性
            this.tNode = node;
            var defaultStyle = nodeStyleMap.get(node.id);
            if (defaultStyle === undefined) {
                // 初始化样式值    defaultStyle代表当前选中控件的所有属性,当回显保存数据的时候这个对象是空的,所以需要在此初始化
                defaultStyle = {};
                defaultStyle.textColor = $(node).css("color");
                defaultStyle.fontFamily = $(node).css("font-family")
                defaultStyle.fontSize = $(node).css("font-size")
                defaultStyle.lineSpa =Number($(node).css("letter-spacing").replace("px",""))
                defaultStyle.lineHeight = Number($(node).css("line-height").replace("px",""))
                defaultStyle.opacity = $(node).css("opacity")
                defaultStyle.textAlign = $(node).css("text-align")
                defaultStyle.borderColor = $(node).css("border-color")
                defaultStyle.borderStyle = $(node).css("border-style")
                defaultStyle.borderRadius = Number($(node).css("border-radius").replace("px",""))
                defaultStyle.borderWidth = Number($(node).css("border-width").replace("px",""))
                var boxShadow = $(node).css("box-shadow")
                var boxShadowArray = boxShadow.split(/\*|\-|\+|\s/);
                var shadowWidth = boxShadowArray[boxShadowArray.length - 1 ] || 0;
                var shadowDim = boxShadowArray[boxShadowArray.length - 2 ] || 0;
                var shadowDirectionH = boxShadowArray[boxShadowArray.length - 3 ] || 0;
                var shadowDirectionV = boxShadowArray[boxShadowArray.length - 4 ] || 0;
                defaultStyle.shadowWidth= Number(shadowWidth.replace("px",""))
                defaultStyle.shadowDim= Number(shadowDim.replace("px",""))
                defaultStyle.shadowDirectionV=   Number(shadowDirectionV.replace("px",""))
                defaultStyle.shadowDirectionH=   Number(shadowDirectionH.replace("px",""))
                defaultStyle.shadowColor=boxShadow.replace(shadowWidth,"").replace(shadowDim,"").replace(shadowDirectionV,"").replace(shadowDirectionH,"")
                if ($(node).css("background-color") === 'rgba(0, 0, 0, 0)') {
                    defaultStyle.backColor = "#FFFFFF";
                } else {
                    defaultStyle.backColor = $(node).css("background-color")
                }
                if (
                    $(this.tNode)
                    .find(".invite-text-box-text")
                    .css("font-style") == "italic"
                ) {
                    defaultStyle.fontStyle = true;
                } else {
                    defaultStyle.fontStyle = false;
                }
                if (
                    $(this.tNode)
                    .find(".invite-text-box-text")
                    .css("text-decoration").indexOf("underline") != -1
                ) {
                    defaultStyle.textDecoration = true;
                } else {
                    defaultStyle.textDecoration = false;
                }
                if ($(node).css("font-weight") == 700) {
                    defaultStyle.fontWeight = true;
                } else {
                    defaultStyle.fontWeight = false;
                }
                nodeStyleMap.set(node.id, defaultStyle);
            }
            this.defaultStyle = defaultStyle;
            if ($(node).hasClass("imageTemplate")) {
                this.isImage = true;
            } else {
                this.isImage = false;
            }
        },
        // 模板 - 捕获上传图片
        imgFileModel(e, fileList){
            console.log('change: ', e, fileList)
            if(e.status != "ready") return 
            
            var img = URL.createObjectURL(e.raw),
                box = document.querySelector('.box')
            console.log(box)
      
            setTimeout(() => {
                box.style.backgroundImage = `url(${img})`
            }, 500)

        },
        uploadImageModel: function(res) {
            console.log(res);
            if (res.code == "000") {
                let locationUrl = "/api/filecenter/file/file/" + res.data.id;

                // $(this.tNode).find('.invite-text-box-text').css('background-image','url("'+res.src+'")')
                $(this.tNode).css("background-image", 'url("' + locationUrl + '")');
                $(this.tNode)
                    .find(".tip")
                    .css("display", "none");
            }
            this.$refs.elupload.clearFiles();
        }, //uploadImage

        preview(file){
            console.log(file)
        },
        // 捕获上传图片
        imgFile(e){
            console.log('change: ', e)
            if(e.status != "ready") return 

            var img = URL.createObjectURL(e.raw)
            console.log(img, this.tNode)
      
            setTimeout(() => {
                this.tNode.style.backgroundImage = `url(${img})`
                this.tNode.style.color = `transparent`
            }, 500)

        },
        uploadImage: function(res) {
            console.log(res);
            if (res.code == "000") {
                let locationUrl = "/api/filecenter/file/file/" + res.data.id;

                // $(this.tNode).find('.invite-text-box-text').css('background-image','url("'+res.src+'")')
                $(this.tNode).css("background-image", 'url("' + locationUrl + '")');
                $(this.tNode)
                    .find(".tip")
                    .css("display", "none");
            }
            this.$refs.elupload.clearFiles();
        }, //uploadImage
        // 用户选择默认的字体颜色或背景颜色
        setColor: function(colorType, val) {
            if (colorType == "text") {
                this.defaultStyle.textColor = val;
                $(this.tNode).css("color", val);
            } else if (colorType == "back") {
                this.defaultStyle.backColor = val;
                $(this.tNode).css("background-color", val);
            } else if (colorType == "border") {
                this.defaultStyle.borderColor = val;
                $(this.tNode).css("border-color", val);
            } else if (colorType == "shadow") {
                this.defaultStyle.shadowColor = val;
            } else if (colorType == 'model'){
                this.model.bgcolor = val
            }
        },

        setShadow: function() {
            if (this.defaultStyle.shadowWidth == 0) {
                return;
            }
            let shadow =
                this.defaultStyle.shadowDirectionV +
                "px " +
                this.defaultStyle.shadowDirectionH +
                "px " +
                this.defaultStyle.shadowDim +
                "px " +
                this.defaultStyle.shadowWidth +
                "px " +
                this.defaultStyle.shadowColor;
            $(this.tNode).css("box-shadow", shadow);
            $(this.tNode).css("box-shadow", shadow);
        }, //setShadow
        // 获取css 属性值
        getCssVal(dom, key){
            var computedStyle = document.defaultView.getComputedStyle(dom, null)

            return computedStyle[key]
        }
    },
    mounted() {

    },
    watch: {
        // meetId: function(val, oldVal) {
        //     // if (oldVal === "") {
        //     // 	var _this = this;
        //     // 	var meetingId = val;
        //     // 	if (meetingId !== null && meetingId !== undefined && meetingId !== "") {
        //     // 		_this.initPage();
        //     // 	}
        //     // }
        // },
        // 监听defaultStyle下的fontFamily，即字体  : "",
        "defaultStyle.fontFamily": function(val) {
            this.defaultStyle.fontFamily = val
            $(this.tNode).css("font-family", val);
        },
        //监听defaultStyle下的fontSize，即字体大小
        "defaultStyle.fontSize": function(val) {
            this.defaultStyle.fontSize = val
            $(this.tNode).css("font-size", val);
        },
        //监听defaultStyle下的fontSize，即字体距离
        "defaultStyle.lineSpa": function(val) {
            this.defaultStyle.lineSpa = val
            $(this.tNode).css("letter-spacing", val);
        },

        "defaultStyle.lineHeight": function(val) {
            this.defaultStyle.lineHeight = val
            $(this.tNode).css("lineHeight", val / 10);
        },
        "defaultStyle.opacity": function(val) {
            if (val <= 1) {
                val = val * 100
            }
            this.defaultStyle.opacity = val
            $(this.tNode).css("opacity", val / 100);
        },
        "defaultStyle.textAlign": function(val) {
            this.defaultStyle.textAlign = val
            $(this.tNode).css("text-align", val);
        },

        "defaultStyle.fontWeight": function(val) {
            if (val) {
                $(this.tNode).css("font-weight", "bolder");
            } else {
                $(this.tNode).css("font-weight", "normal");
            }
        },
        "defaultStyle.textDecoration": function(val) {
            if (val) {
                $(this.tNode)
                    .find(".invite-text-box-text")
                    .css("text-decoration", "underline");
            } else {
                $(this.tNode)
                    .find(".invite-text-box-text")
                    .css("text-decoration", "none");
            }
        },
        "defaultStyle.fontStyle": function(val) {
            if (val) {
                $(this.tNode)
                    .find(".invite-text-box-text")
                    .css("font-style", "italic");
            } else {
                $(this.tNode)
                    .find(".invite-text-box-text")
                    .css("font-style", "normal");
            }
        },

        //监听defaultStyle下的fontSize，即字体大小
        "defaultStyle.borderStyle": function(val) {
            this.defaultStyle.borderStyle = val
            $(this.tNode).css("border-style", val);
        },

        //监听defaultStyle下的fontSize，即字体大小
        "defaultStyle.borderWidth": function(val) {
            this.defaultStyle.borderWidth = val
            $(this.tNode).css("border-width", val);
        },

        //监听defaultStyle下的fontSize，即字体大小
        "defaultStyle.borderRadius": function(val) {
            this.defaultStyle.borderRadius = val
            $(this.tNode).css("border-radius", val);
        },

        "defaultStyle.shadowDim": function() {
            this.setShadow();
        },
        "defaultStyle.shadowWidth": function(val) {
            if (val == 0) {
                $(this.tNode).css("box-shadow", "0px 0px ");
            } else {
                this.setShadow();
            }
        }, //shadowWidth
        "defaultStyle.shadowColor": function() {
            this.setShadow();
        }, //shadowColor
        "defaultStyle.shadowDirectionV": function() {
            this.setShadow();
        }, //shadowDirectionV
        "defaultStyle.shadowDirectionH": function() {
            this.setShadow();
        }, //shadowDirectionH

        // 监听元素层级
        "defaultStyle.hierarchy": function(val) {
            var template = document.querySelectorAll('.public')
            console.log(template)
            for(let i = 0; i < template.length - 1; i++) {
                var curN = this.getCssVal(template[i], 'zIndex')
                if(val == 1){
                    if(curN != 9){
                        template[i].style.zIndex = 5
                    }
                } else if(val == 9){
                    if(curN != 1){
                        template[i].style.zIndex = 5
                    }
                }
            }

            this.defaultStyle.hierarchy = val
            $(this.tNode).css("z-index", val);
        },

        // 变量名
        "defaultStyle.varName": function(val) {
            // 去重
            if(val && document.querySelector('.' + val)){
                document.querySelector('.' + val).classList.remove(val)
            }

            // 更新数据
            this.defaultStyle.varName = val
            console.log(this.defaultStyle, this.tNode, val)
            
            if(!val) return
            // 记录数据 保存 添加变量名的dom
            this.eleList.filter( item => item.name == this.tNode.eleListName ? item.varName = val : '') 
            
            // 在选中的dom 增加class 属性值
            this.tNode.classList.add(val)
        },
        "varName": function(val) {
            // 去重
            if(val && document.querySelector('.' + val)){
                document.querySelector('.' + val).classList.remove(val)
            }
            
            // 更新数据
            this.defaultStyle.varName = val
            console.log(this.defaultStyle, this.tNode, val)
            
            if(!val) return
            // 在选中的dom 增加class 属性值
            this.tNode.classList.add(val)
        },

        // 监听图片元素位置大小 宽度 高度 上边距 左边距
        "img.width": function(val) {
            this.defaultStyle.width = val

            $(this.tNode).css("width", val + 'px');
        }, // width
        "img.height": function(val) {
            this.defaultStyle.height = val
            $(this.tNode).css("height", val + 'px');
        }, // height
        "img.paddingT": function(val) {
            console.log(this.defaultStyle)
            // var parent = document.querySelector('.mask'),
            //     bigY = +parent.offsetHeight - 2,
            //     translateY

            // console.log(val, bigY, translateY, this.defaultStyle.height)

            // if(val < (bigY / 2)){
            //     translateY = -(bigY / 2 - val - this.defaultStyle.height / 2)
            // } else if(val >= (bigY / 2)){
            //     translateY = val - bigY / 2 - this.defaultStyle.height / 2
            // }
            // console.log($(this.tNode), translateY)
            // $(this.tNode).css("transform", `translate(${this.defaultStyle.translateX}px, ${translateY}px)`);
            // this.defaultStyle.translateY = translateY
            $(this.tNode).css("transform", `translate(${this.defaultStyle.translateX}px, ${val}px)`);
            this.defaultStyle.translateY = val

        }, // paddingT
        "img.paddingL": function(val) {
            // var parent = document.querySelector('.mask'),
            //     bigX = +parent.offsetWidth - 2,
            //     translateX

            // console.log(val, bigX, translateX)

            // if(val < (bigX / 2)){
            //     translateX = -(bigX / 2 - val - this.defaultStyle.width / 2)
            // } else if(val >= (bigX / 2)){
            //     translateX = val - bigX / 2 - this.defaultStyle.width / 2
            // }

            // console.log($(this.tNode), translateX)
            // $(this.tNode).css("transform", `translate(${translateX}px, ${this.defaultStyle.translateY}px)`);
            // this.defaultStyle.translateX = translateX

            $(this.tNode).css("transform", `translate(${val}px, ${this.defaultStyle.translateY}px)`);
            this.defaultStyle.translateX = val
        }, // paddingL

        // 监听文本元素位置大小 宽度 高度 上边距 左边距
        "text.width": function(val) {
            this.defaultStyle.width = val

            $(this.tNode).css("width", val + 'px');
        }, // width
        "text.height": function(val) {
            this.defaultStyle.height = val
            $(this.tNode).css("height", val + 'px');
        }, // height
        "text.paddingT": function(val) {
            console.log(this.defaultStyle)
            // var parent = document.querySelector('.mask'),
            //     bigY = +parent.offsetHeight - 2,
            //     translateY

            // console.log(val, bigY, translateY, this.defaultStyle.height)

            // if(val < (bigY / 2)){
            //     translateY = -(bigY / 2 - val - this.defaultStyle.height / 2)
            // } else if(val >= (bigY / 2)){
            //     translateY = val - bigY / 2 - this.defaultStyle.height / 2
            // }

            // console.log($(this.tNode), translateY)
            // $(this.tNode).css("transform", `translate(${this.defaultStyle.translateX}px, ${translateY}px)`);
            // this.defaultStyle.translateY = translateY
            $(this.tNode).css("transform", `translate(${this.defaultStyle.translateX}px, ${val}px)`);
            this.defaultStyle.translateY = val
        }, // paddingT
        "text.paddingL": function(val) {
            // var parent = document.querySelector('.mask'),
            //     bigX = +parent.offsetWidth - 2,
            //     translateX

            // console.log(val, bigX, translateX)

            // if(val < (bigX / 2)){
            //     translateX = -(bigX / 2 - val - this.defaultStyle.width / 2)
            // } else if(val >= (bigX / 2)){
            //     translateX = val - bigX / 2 - this.defaultStyle.width / 2
            // }

            // console.log($(this.tNode), translateX)
            // $(this.tNode).css("transform", `translate(${translateX}px, ${this.defaultStyle.translateY}px)`);
            // this.defaultStyle.translateX = translateX

            $(this.tNode).css("transform", `translate(${val}px, ${this.defaultStyle.translateY}px)`);
            this.defaultStyle.translateX = val
        }, // paddingL
    },

}