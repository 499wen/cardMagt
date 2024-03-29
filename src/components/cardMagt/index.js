import time from '@/plugins/time.js'
import $ from 'jquery'
import getAge from  '@/plugins/getAge.js'
import Test from '../test/test.vue'

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
// import { map } from 'core-js/fn/array';

var token = localStorage.getItem("token") || 'asdfghjklzxcvbndfgherghjkcvb123456'

let loading = null
var arrVarName = new Map()
arrVarName.set('photoFileId', '头像')
arrVarName.set('userName', '姓名')
arrVarName.set('phone', '手机')
arrVarName.set('sex', '性别')

var tableCateM = [
    { name: "姓名", width: "50", scription: "userName" },
    { name: "性别", width: "30", scription: "sex" },
    { name: "相片", width: "70", scription: "photoFileId" },
    { name: "手机", width: "70", scription: "phone" },
    { name: "邮件", width: "200", scription: "email" },
    { name: "角色", width: "80", scription: "characterId" },
    { name: "级别", width: "80", scription: "ranksId" },
    { name: "出生日期", width: "140", scription: "birthday" },
    { name: "籍贯", width: "150", scription: "nativePlace" },
    { name: "党派", width: "80", scription: "party" },
    { name: "家庭住址", width: "200", scription: "homeAddress" },
    { name: "学历", width: "80", scription: "education" },
    { name: "政治面貌", width: "80", scription: "political" },
    { name: "类别", width: "80", scription: "type" }, 
    { name: "单位地址", width: "80", scription: "companyAddress" },
    { name: "单位邮编", width: "80", scription: "companyPostcodes" }, 
    { name: "单位电话", width: "80", scription: "companyPhone" },
    { name: "家庭电话", width: "80", scription: "homePhone" }, 
  ]

export default  {
    components: {
        Test
    },
    data() { 
        return {
            tableCate: [],

            tableData: [],

            // 选中元素坐标
            curEleCoor: {
                x: '',
                y: ''
            },
            
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
                // 1.6
                width: '86', // 宽
                height: '54', // 高
                bgcolor: '#fff', // 背景颜色
                bleedingSite: '0', // 出血位
                bgimage: '', // 背景图片
                bl: '', // 缩放比例
                name: '', // 模板名称
            },

            headers: {
                Authorization: token,
                token: token
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

                'width': '', // 宽度
                'height': '', // 高度
                'varName': '', // 变量名

                cte: '', // 文本内容
                defaultCte: '双击更改文本', // 默认内容  /  上一次数据

                img: '', // 
                curEleCoor: {}
            },

            varName: '',
            activeName: [],
            idList: [],
            showKey: 0,
            headerTag: [
                {label: '样式设计', name: '样式设计', select: true},
                {label: '数据填充', name: '数据填充', select: false},
                // {label: '导出', name: '导出', select: false},
            ],
            funTag: [
                // {label: '位置大小', name: '位置大小', select: true},
                {label: '基本设置', name: '基本设置', select: true},
                {label: '边框样式', name: '边框样式', select: false},
                {label: '阴影样式', name: '阴影样式', select: false},
            ],
            presetLine: [{ type: 'l', site: 50 }, { type: 'v', site: 50 }],
            tc: '',
            curElem: '',

            arrVarName, // 储存属性 map类型 {'photoFileId' => '头像'}
            cte: '双击更改文本',

            tData: { 
                pageNum: 1,
                pageSize: 20, // 999
                total: 0,
                currentPage: 1,
            }, // 表单分页

            mData: { 
                pageNum: 1,
                pageSize: 8, // 999
                total: 0,
                currentPage: 1,
            }, // 模板分页

            model__: [],
            haveHave: false,
            modelBox: false,

            edit_mo: false,
            editTc: '',
            attrArr: [],

            tNode: null,
            wantDelModel: [],  // 需要删除的模板id

            fileName: false, // 
            multipleSelection: [],
            fileNameVal: '', // 接收文件 名字

            curModelData: {},

            relevantShow: false,
            relevantUser: [],
            relevantArr: [],

            modelName: false
        }
    },
    methods: {
        // 双击模板列表  编辑
        makeSmooth(idx){
            console.log(idx)
            this.switchTm(idx)

            this.editModel()
        },
        // 删除人员
        delModelPerson(e){
            if(this.relevantArr.length == 0){
                this.$message('请先勾选人员！')
                return 
            }

            console.log(this.relevantArr)
            var ids = this.relevantArr.map(item => item.tempUserId),
                arr = this.relevantUser.map((item, idx) => {
                    if(ids.includes(item.tempUserId)){ 
                        return idx 
                    }
                }).filter(item => item != undefined)
            
            console.log(arr)

            this.$http.delete('/api/usercenter/personTemplateUser/personTemplateUsers', {data: ids}).
                then(res => {
                    console.log(res)
                    if(res.code == '000'){
                        this.$message.success('删除成功！')

                        // 删除本地数据
                        arr.sort(function(a, b) { return b - a});
                        arr.forEach((index) => { this.relevantUser.splice(index, 1) })
                        console.log(this.relevantUser)
                    }
                })
        },
        // 相关人员表格 - 勾选表格
        relevantChange(arr){
            this.relevantArr = arr
        },
        // 相关人员 
        relevantPerson(){
            this.relevantShow = true
            console.log(this.relevantUser)
        },
        // 选择模板 - 勾选复选框
        chioce(item){
            let wDM = this.wantDelModel, 
                id = item.id
            // 判断是否存在   存在 - 删除  不存在 - 添加
            if(wDM.includes(id)){
                wDM.splice(wDM.indexOf(id), 1)
            } else {
                wDM.push(id)
            }
        },
        // 文本-图片中基本样式 获取输入框中的值
        getVal(type, e){
            switch(type){
                case 'curEleCoorX': 
                    console.log(e) 
                    this.defaultStyle.curEleCoor.x = +e
                    $(this.tNode).css("transform", `translate(${e * 5}px, ${this.defaultStyle.curEleCoor.y * 5}px)`);
            ;break
                case 'curEleCoorY': 
                    console.log(e) 
                    this.defaultStyle.curEleCoor.y = +e
                    $(this.tNode).css("transform", `translate(${this.defaultStyle.curEleCoor.x * 5}px, ${e * 5}px)`);
            ;break
            }
        },
        // 编辑模板
        editModel(){
            this.edit_mo = true
            var item = this.model__.map(item => item.select && item),
                selectDom = item.filter(i => i)[0]
            
            console.log(selectDom)

            this.eleList = selectDom.attr

            // 填充背景块
            this.model = selectDom.publicAttr
            // document.querySelector('.box').style.backgroundImage = `url(${this.model.bgimage})`

            // 获保存当前选中模板对象
            this.curModelData = selectDom
            this.relevantUser = []
            if(selectDom.personTemplateUsers != null){
                selectDom.personTemplateUsers.map(item => {
                    item.user.tempUserId = item.id
                    this.relevantUser.push(item.user)
                })
            }

            this.editTc = selectDom.content

            // return
            setTimeout(() => {
                let textNodes = $("#box").find(".textTemplate");
                console.log('textNodes',textNodes)
                for (let i = 0; i < textNodes.length; i++) {
                    initNode(textNodes[i], this, "文本", true);
                }
                let imageNodes = $("#box").find(".imageTemplate");
                for (let i = 0; i < imageNodes.length; i++) {
                    initNode(imageNodes[i], this, "图片", true);
                }
            }, 300)
            this.modelBox = false

            setTimeout(() => {
                // 给编辑底板增加双击事件
                console.log(document.querySelector('#edit .mask'))
                document.querySelector('#edit .mask').ondblclick = () => {
                    this.modelShow = true
                }
            }, 500)
        },
        // 打开模板
        openModel(){
            console.log(this.model__.length)
            
            if(this.model__.length == 0){
                this.$message.error('目前还未添加模板, 请先添加!')
                return 
            }
            this.modelBox = true

            this.getModel()
        },
        // 删除模板
        delModel(e){
            if(!this.wantDelModel.length){
                this.$message('请先勾选模板！')
                return 
            }
            // 加判断 提示用户是否删除模板
            this.$confirm('确认删除该模板?', '提示', {
                cancelButtonClass: 'btn_custom_cancel',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                var id = null
                var item = this.model__.filter( (item, idx) => {
                    if(item.select){
                        id = idx
                        return item 
                    } 
                }),
                // ids = item.map(item => item.id)
                ids = this.wantDelModel
                console.log(item, ids)
    
                // return 
                this.$http.delete('/api/usercenter/personTemplate/ids',{data: ids})
                    .then(res => {
                        console.log(res)
                        if(res.code == '000'){
                            this.$message.success('删除成功！')
                            this.model__.splice(id, 1)
                            if(this.model__.length == 0){
                                this.modelBox = false
                            }

                            this.haveHave = false
                            this.pageNum = 1
                            this.getModel()
                            
                        }
                    })
                
            })
            

        },
        // 去除带有属性的数据
        removeAttrVal(){
            var attrName_text = ['userName', 'phone', 'sex'],
                attrName_img = ['photoFileId'],
                dom

            // 循环查看是否存在 - 文本
            for(let i = 0; i < attrName_text.length; i++){
                dom = document.querySelector('.'+attrName_text[i])
                if(dom){
                    dom.innerHTML = dom.innerHTML.replace(dom.innerText, '')
                }
            }

            // 循环查看是否存在 - 图片
            for(let i = 0; i < attrName_img.length; i++){
                dom = document.querySelector('.'+attrName_img[i])
                if(dom){
                    dom.style.backgroundImage = 'url()'
                }
            }

        },
        // 绑定模板 - 保存人员
        preProsons(){
            // 判断是否设置模板模板名字
            // if(!this.fileNameVal.trim()){
            //     this.fileName = true
            //     this.$message('请先设置模板名称')
            //     return 
            // } 

            // 除去 带有属性的值
            this.removeAttrVal()
            
            console.dir(this.eleList[0].dom)
            var box = document.querySelector('#box'),
                content = JSON.stringify(box.parentNode.innerHTML),
                attr = JSON.stringify(this.eleList)

            if(this.curModelData.id == ''){
                // 修改一次
                if(content.indexOf('color: rgb(102, 102, 102); display: none;') == -1){
                    // 隐藏尺寸大小
                    content = content.replace('text-align: center; font-size: 15px; color: rgb(102, 102, 102);', 'text-align: center; font-size: 15px; color: rgb(102, 102, 102); display: none;')
                    // 隐藏坐标
                    content = content.replace('class=\\"coordinate\\"', 'class=\\"coordinate\\" style=\\"display: none\\"')
                }

                var data = {
                    attr,
                    content,
                    publicAttr: publicAttr,
                    personTemplateUserName: this.fileNameVal,
                    userIds: this.multipleSelection.map(item => item.id)
                }
                

                // 更新模板
                if(this.edit_mo){
                    var item = this.model__.map(item => item.select && item),
                    selectDom = item.filter(i => i)[0]
                    data.id = selectDom.id
                }

                this.$http.post('/api/usercenter/personTemplate/personTemplate', data)
                    .then(res => {
                        console.log(res)
                        if(res.code == '000'){
                            this.$message.success('保存成功！')

                            this.getModel()
                            this.fileName = false
                        }
                    })
            } else {
                
                this.$http.post(`/api/usercenter/personTemplateUser/personTemplateUsers/personTemplateIdAndUserIds/${this.curModelData.id}?personTemplateUserName=${this.fileNameVal}`, this.multipleSelection.map(item => item.id))
                    .then(res => {
                        console.log(res)
                        if(res.code == '000'){
                            this.$message.success('保存成功！')

                            this.getModel()
                            this.fileName = false
                        }
                    })
            }

        },
        // 保存模板 
        preservation(){
            // 判断是否设置模板模板名字
            if(!this.fileNameVal.trim()){
                this.$message('请先设置模板名称')
                setTimeout(() => {
                    this.modelName = true
                }, 500)
                return 
            }

            // 去除选中样式
            $('.invite-text-box-border').css('display', 'none')

            // 去除带有属性的数据
            this.removeAttrVal()
            
            console.dir(this.eleList[0].dom)
            var box = document.querySelector('#box'),
                // content = JSON.stringify(box.innerHTML),
                content = JSON.stringify(box.parentNode.innerHTML),
                attr = JSON.stringify(this.eleList)
            if(content.indexOf('color: rgb(102, 102, 102); display: none;') == -1){
                // 隐藏尺寸大小
                content = content.replace('text-align: center; font-size: 15px; color: rgb(102, 102, 102);', 'text-align: center; font-size: 15px; color: rgb(102, 102, 102); display: none;')
                // 隐藏坐标
                content = content.replace('class=\\"coordinate\\"', 'class=\\"coordinate\\" style=\\"display: none\\"')
            }

            console.log(content)
            this.model.name = this.fileNameVal
            // return 
            var data = {
                    content, 
                    attr, 
                    publicAttr: JSON.stringify(this.model),
                    personTemplateUserName: this.fileNameVal,
                    userIds: []
                }

            // 更新模板
            if(this.edit_mo){
                var item = this.model__.map(item => item.select && item),
                selectDom = item.filter(i => i)[0]
                data.id = selectDom.id
            }
            console.log(this.eleList)
            // return 
            this.$http.post('/api/usercenter/personTemplate/personTemplate', data)
                .then(res => {
                    console.log(res)
                    if(res.code == '000'){
                        this.$message.success('保存成功！')

                        this.curModelData = res.data
                        this.modelName = false
                        this.getModel()
                    }
                })
        },
        // 表格 - 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.tData.pageSize = val;
            this.tData.pageNum = 1
            this.init();
        }, //handleSizeChange
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.tData.pageNum = val;
            this.init();
        }, //handleSizeChange

        // 模板 - 分页
        modelSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.mData.pageSize = val;
            this.mData.pageNum = 1
            this.getModel();
        }, //modelSizeChange
        modelCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.mData.pageNum = val;
            this.getModel();
        }, //modelCurrentChange
        // 设置层级
        setTop(num){
            this.defaultStyle.hierarchy = num
        },
        newCreatePublic(){
            this.edit_mo = false
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

            // 清空元素列表
            this.eleList = []

            // 将显示出血位的'div'添加进'parentDom'中
            parentDom.insertAdjacentHTML('afterbegin', html)

            console.log(parentDom)
        },
        // 新建
        newCreate(){
            if(this.eleList.length){
                // 加判断 提示是否需要保存当前模板
                this.$confirm('是否需要保存模板?', '提示', {
                    cancelButtonClass: 'btn_custom_cancel',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 保存模板
                    this.preservation()
                    this.newCreatePublic()

                }).catch(() => {
                    this.newCreatePublic()
                })
            } else {
                this.newCreatePublic()
            }
            
        },
        // 设置出血位
        setBleedingSite(val){
            console.log(val)
            let lt_l = document.querySelector('.mask-leftTop .mask-left')
            , lt_t = document.querySelector('.mask-leftTop .mask-top')
            , lb_l = document.querySelector('.mask-leftBottom .mask-left')
            , lb_b = document.querySelector('.mask-leftBottom .mask-bottom')
            , rt_r = document.querySelector('.mask-rightTop .mask-right')
            , rt_t = document.querySelector('.mask-rightTop .mask-top')
            , rb_r = document.querySelector('.mask-rightBottom .mask-right')
            , rb_b = document.querySelector('.mask-rightBottom .mask-bottom')
            
            
            // 左上
            lt_l.style = `width: ${val * 2.5}px; right: ${val * 2.5}px`
            lt_t.style = `height: ${val * 2.5}px; bottom: ${val * 2.5}px`

            // 左下
            lb_l.style = `width: ${val * 2.5}px; right: ${val * 2.5}px`
            lb_b.style = `height: ${val * 2.5}px; top: ${val * 2.5}px`

            // 右上
            rt_r.style = `width: ${val * 2.5}px; left: ${val * 2.5}px`
            rt_t.style = `height: ${val * 2.5}px; bottom: ${val * 2.5}px`

            // 右下
            rb_r.style = `width: ${val * 2.5}px; left: ${val * 2.5}px`
            rb_b.style = `height: ${val * 2.5}px; top: ${val * 2.5}px`

            console.log(document.querySelectorAll('.mask-leftTop .mask-left'))
        },
        // 选中单行
        rowClick(e){
            console.log(e)
            for(let i in e){
                if(i == 'photoFileId'){
                    $('.' + i).css('background-image', 'url(/api/filecenter/file/file/'+ e[i] +')')
                } else {
                    if(document.querySelector('.'+i)){
                        document.querySelectorAll('.' + i)[0].innerHTML = document.querySelectorAll('.' + i)[0].innerHTML.replace('>'+document.querySelectorAll('.' + i)[0].innerText+'<', '>'+e[i]+'<')
                        document.querySelectorAll('.' + i)[1].innerHTML = document.querySelectorAll('.' + i)[0].innerHTML.replace('>'+document.querySelectorAll('.' + i)[0].innerText+'<', '>'+e[i]+'<')
                    }
                    // $('.' + i).text(e[i])
                    // console.log($('.' + i))
                }
            }
        },
        // 元素列表 - 选中的元素
        selectDom(item, idx){
            this.defaultStyle = item
            this.tNode = item.dom
            console.log(this.tNode)
            console.log(this.model.bleedingSite, this.defaultStyle.curEleCoor.x, this.defaultStyle.curEleCoor.y)
            console.log(this.defaultStyle)
            // if(!arrVarName.get(item.name)){
            //     // this.eleList.filter( (i, index) => idx == index ? i.select = true : i.select = false )
            // }

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

        // 数据验证
        verification(){
            if(!this.eleList.length){
                this.$message.error('请选设计模板！')
                return
            }

            if(!this.multipleSelection.length){
                this.$message.error('请选勾选需要添加的人员！')
                return
            }

            if(this.fileNameVal || this.curModelData.id){
                this.fileNameVal = this.curModelData.personTemplateUsers[0].name
                this.preProsons()
            } else {
                this.fileName = true
            }
        },
        // 勾选表单 获取勾选数据 
        handleSelectionChange(val) {
            this.multipleSelection = val;

            console.log(val)
        },
        // 模板 - 选择颜色
        colorSelect(e){
            this.model.bgcolor = e
        },
        switchTm: function(idx) {
            this.haveHave = true
            this.model__.map((item, index) => index == idx ? item.select = true : item.select = false)
        },
        switchFun: function(idx) {
            this.funTag.map((item, index) => index == idx ? item.select = true : item.select = false)
        },
        // 切换头部导航
        switchTab:function(idx){ 
            var box = document.querySelector('.box')
                this.tc = box.parentNode.innerHTML
                this.headerTag.map((item, index) => index == idx ? item.select = true : item.select = false)
            
            setTimeout(() => {
                // 关闭弹框
                this.imgShow = false
                this.attrArr = []
                
                // 选中框dom
                var none = document.querySelectorAll('.invite-text-box-border')

                // console.log(none)
                // 数据填充
                if(idx == 1){
                    this.eleList.filter( (item, index, list) => {
                        this.attrArr.push(item.name)

                        // 去除 '双击选择图片' 字样  --  选中 photoFileId 属性
                        if(item.dom.innerText == '双击选择图片'){
                            var lang = this.eleList.length
                            // 将 '双击选择图片' 隐藏  且 选中属性后选择图片, 将清空地址
                            item.dom.innerHTML = item.dom.innerHTML.replace('>双击选择图片<', '><')
                            if(document.querySelectorAll('.photoFileId').length){
                                document.querySelectorAll('.photoFileId')[1].style.backgroundImage = 'url()'
                            }

                            console.dir(item.dom)
                        }
                    })

                    // 过滤 tableCate
                    this.tableCate = tableCateM.filter(item => {
                        if(item.scription != 'photoFileId'){
                           return this.attrArr.includes(item.scription) && item
                        }
                        
                    })
                    if(this.tableCate.length == 0){
                        this.tableCate = [
                            { name: "姓名", width: "50", scription: "userName" },
                            { name: "性别", width: "30", scription: "sex" },
                            { name: "相片", width: "70", scription: "photoFileId" }
                        ]
                    }
                    console.log('this.tableCate: ', this.tableCate)
                    // 循环 隐藏 '双击选择图片' '双击更改文本' 字样
                    for(let i = 0; i < this.eleList.length; i++) {
                        if(document.querySelectorAll('.invite-text-box .tip')[i + this.eleList.length].innerText == '双击更改文本' || document.querySelectorAll('.invite-text-box .tip')[i + this.eleList.length].innerText == '双击选择图片')
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
            this.curElem = '图片'

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
            this.curElem = '文本'

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
            console.dir(this.tNode)
            var defaultStyle = nodeStyleMap.get(node.id) || this.defaultStyle;
            if (defaultStyle === 'undefined') {
                // 初始化样式值    defaultStyle代表当前选中控件的所有属性,当回显保存数据的时候这个对象是空的,所以需要在此初始化
                defaultStyle = {};
                defaultStyle.textColor = $(node).css("color");
                defaultStyle.fontFamily = $(node).css("font-family")
                defaultStyle.fontSize = $(node).css("font-size")
                defaultStyle.lineSpa =Number($(node).css("letter-spacing").replace("px",""))
                console.log($(node).css("line-height"))
                defaultStyle.lineHeight = $(node).css("line-height") == 'normal' ? 10 : Number($(node).css("line-height").replace("px",""))
                defaultStyle.opacity = $(node).css("opacity")
                defaultStyle.textAlign = $(node).css("text-align")

                defaultStyle.borderColor = $(node).css("border-color")
                defaultStyle.borderStyle = $(node).css("border-style")
                defaultStyle.borderRadius = Number($(node).css("border-radius").replace("px",""))
                defaultStyle.borderWidth = Number($(node).css("border-width").replace("px",""))

                // box-shadow
                var boxShadow = $(node).css("box-shadow")
                var boxShadowArray = boxShadow.split(/\*|\-|\+|\s/);
                if(boxShadowArray[0] != 'none'){
                    var shadowWidth = boxShadowArray[boxShadowArray.length - 1 ] || 0;
                    var shadowDim = boxShadowArray[boxShadowArray.length - 2 ] || 0;
                    var shadowDirectionH = boxShadowArray[boxShadowArray.length - 3 ] || 0;
                    var shadowDirectionV = boxShadowArray[boxShadowArray.length - 4 ] || 0;
    
                    console.log(boxShadowArray)
                    defaultStyle.shadowWidth= Number(shadowWidth.replace("px",""))
                    defaultStyle.shadowDim= Number(shadowDim.replace("px",""))
                    defaultStyle.shadowDirectionV = Number(shadowDirectionV.replace("px",""))
                    defaultStyle.shadowDirectionH = Number(shadowDirectionH.replace("px",""))
                    defaultStyle.shadowColor=boxShadow.replace(shadowWidth,"").replace(shadowDim,"").replace(shadowDirectionV,"").replace(shadowDirectionH,"")
                } else {
                    defaultStyle.shadowWidth = 0
                    defaultStyle.shadowDim = 0
                    defaultStyle.shadowDirectionV = 0
                    defaultStyle.shadowDirectionH = 0
                    defaultStyle.shadowColor = '#000'
                }

                // 变量名
                defaultStyle.varName = this.tNode.classList.length == 3 ? this.tNode.classList[2] : ''

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
                    .css("text-decoration") == "underline"
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
            // this.defaultStyle = defaultStyle;
            if ($(node).hasClass("imageTemplate")) {
                this.isImage = true;
            } else {
                this.isImage = false;
            }
        },
        // 模板 - 捕获上传图片
        imgFileModel(e, fileList){
            return 
            console.log('change: ', e, fileList)
            // if(e.status != "ready") return 
            
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
                let img = "/api/filecenter/file/file/" + res.data.id,
                    box = document.querySelector('.box')
                    this.model.bgimage = img

                    setTimeout(() => {
                        box.style.backgroundImage = `url(${img})`
                        // box.style.color = `transparent`
                    }, 500)
            }
            // this.$refs.elupload.clearFiles();
        }, //uploadImage

        preview(file){
            console.log(file)
        },
        // 捕获上传图片
        imgFile(e){
            return 
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
                let img = "/api/filecenter/file/file/" + res.data.id,
                    box = document.querySelector('.box')

                setTimeout(() => {
                    this.tNode.style.backgroundImage = `url(${img})`
                    this.tNode.style.color = `transparent`
                }, 500)
            }
            // this.$refs.elupload.clearFiles();
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

            // 更新数据
            this.mergeData()
        }, //setShadow
        // 获取css 属性值
        getCssVal(dom, key){
            var computedStyle = document.defaultView.getComputedStyle(dom, null)

            return computedStyle[key]
        },
        
        // 匹配 defaultStyle 与 eleList 合并数据
        mergeData(){
            let defaultStyle = this.defaultStyle,
                eleList = this.eleList

            eleList.filter(item => {
                if(item.id == defaultStyle.id){
                    for(let i in defaultStyle){
                        item[i] = defaultStyle[i]
                    }
                }
            })

        },

        // 请求接口
        init: function() {
            let _this = this;
            this.type = "internal"
            // this.type = this.external ? "internal" : "external";
            if (true) {
              this.externalCode = "0";
            } else {
              this.externalCode = "1";
            }
            
            this.$http.post(
                `/api/usercenter/user/users/${this.type}/key?pageNum=${this.tData.pageNum}&pageSize=${this.tData.pageSize}`,
                this.searchCondition
              )
              .then(res => {
                console.log(res);
       
                if(res.msg == "无法识别操作人信息"){
                  this.$message('无法识别操作人信息, 请重新登录')
      
                  setTimeout(() => {
                    this.$router.push('/login')
                  }, 500)
                }
                if (res.code == "000") {
                  let data = res.data || [];
                  // 处理时间格式
                  data.content.filter( item => {
                    item.birthday = time(new Date(item.birthday).getTime())
                    item.age = getAge(item.birthday)
                    item.imgExist = true
                  })
      
                  console.log(data.content)
                  var arr = data.content
      
                  _this.tData.totalCount = data.totalElements;
                  _this.tableData = arr;

                  console.log(_this.tableData)
      
                //   // 将第一条数据赋值给 userList 
                //   if(_this.userList.length == 0) {
                //     _this.userList = [arr[0]]
                //   }
      
                  loading && loading.close();
      
                  _this.tData.total = data.totalElements
                  _this.tData.pageNum = data.totalPages
                } else {
                  _this.tData.totalCount = 0;
                  _this.tData.tableData = [];
                } 
              })
              .catch(res => {
                console.log(res);
                _this.tData.totalCount = 0;
                _this.tData.tableData = [];
              });
          }, //searchData
        //  获取模板
        getModel(){
            let _this = this

            this.$http.get(`/api/usercenter/personTemplate/page?pageNum=${this.mData.pageNum}&pageSize=${this.mData.pageSize}`)
            .then( res => {
                console.log(res)
                if(res.code = '000'){
                    var data = res.data
                    data.content.filter( (item, idx) => {
                        item.content = JSON.parse(item.content)
                        item.select = false
                        item.publicAttr = JSON.parse(item.publicAttr)
                        item.attr = JSON.parse(item.attr)

                        // 计算缩放比例  底板长： 450  底板宽： 270
                        item.scalex = 450 / ((+item.publicAttr.width + +item.publicAttr.bleedingSite * 2) * 5) 
                        item.scaley = 270 / ((+item.publicAttr.height + +item.publicAttr.bleedingSite * 2) * 5)

                        // 计算缩放后偏移的像素
                        item.left = (idx % 3) * 450 + ((item.scalex * +item.publicAttr.width * 5 * (item.scalex - 1)) / 2) + 20 * (idx % 3 + 1)
                        item.top = Math.floor(idx / 3) * 270 + ((item.scaley * +item.publicAttr.height * 5 * (item.scaley - 1)) / 2) + 20 * (Math.floor(idx / 3) + 1)
                        
                    })
                    this.model__ = data.content
                    _this.mData.total = data.totalElements
                    // _this.mData.pageNum = data.totalPages
                    console.log(this.model__)
                } else {
                    _this.mData.totalCount = 0;
                    _this.mData.tableData = [];
                }
            })
        }
    },
    mounted() {
        this.init()
        this.getModel()
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

            // 更新数据
            this.mergeData()
        },
        //监听defaultStyle下的fontSize，即字体大小
        "defaultStyle.fontSize": function(val) {
            this.defaultStyle.fontSize = val
            $(this.tNode).css("font-size", val);
        
            // 更新数据
            this.mergeData()
        },
        //监听defaultStyle下的fontSize，即字体距离
        "defaultStyle.lineSpa": function(val) {
            this.defaultStyle.lineSpa = val
            $(this.tNode).css("letter-spacing", val);

            // 更新数据
            this.mergeData()
        },

        "defaultStyle.lineHeight": function(val) {
            console.log(this.tNode)
            this.defaultStyle.lineHeight = val
            $(this.tNode).css("lineHeight", val / 10);

            // 更新数据
            this.mergeData()
        },
        "defaultStyle.opacity": function(val) {
            if (val <= 1) {
                val = val * 100
            }
            this.defaultStyle.opacity = val
            $(this.tNode).css("opacity", val / 100);

            // 更新数据
            this.mergeData()
        },
        "defaultStyle.textAlign": function(val) {
            this.defaultStyle.textAlign = val
            $(this.tNode).css("text-align", val);

            // 更新数据
            this.mergeData()
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

            // 更新数据
            this.mergeData()
        },

        //监听defaultStyle下的fontSize，即字体大小
        "defaultStyle.borderWidth": function(val) {
            this.defaultStyle.borderWidth = val
            $(this.tNode).css("border-width", val);

            // 更新数据
            this.mergeData()
        },

        //监听defaultStyle下的fontSize，即字体大小
        "defaultStyle.borderRadius": function(val) {
            this.defaultStyle.borderRadius = val
            $(this.tNode).css("border-radius", val);

            // 更新数据
            this.mergeData()
        },

        "defaultStyle.shadowDim": function() {
            this.setShadow();
        },
        "defaultStyle.shadowWidth": function(val) {
            if (val == 0) {
                $(this.tNode).css("box-shadow", "0px 0px");
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

            // 更新数据
            this.mergeData()
        },

        // 变量名  只有添加变量名 select为 true
        "defaultStyle.varName": function(val) {
            // 去重
            if(val && document.querySelector('.' + val)){
                document.querySelector('.' + val).classList.remove(val)
            }

            // 更新数据
            this.defaultStyle.varName = val
            console.dir(this.tNode)
            console.log(this.defaultStyle, this.tNode, val)
            
            if(!val) return
            // 修改元素列表的文本提示
            // this.eleList.filter(item => item.nodeKey == this.tNode.eleListName ? item.name = val : '')

            // 记录数据 保存 添加变量名的dom 
            this.eleList.filter( item => {
                if(item.nodeKey == this.tNode.dataset.cont){
                    item.name = val
                    item.select = true
                }
            }) 
            
            // 在选中的dom 增加class 属性值 只能存在1个属性
            if(this.tNode.classList.length == 3){
                this.tNode.classList.remove(this.tNode.classList[2])
            }
            this.tNode.classList.add(val)

            console.log(this.eleList)
            // 更新数据
            this.mergeData()
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

            // 更新数据 - eleList
            this.mergeData()
        },

        // 监听图片元素位置大小 宽度 高度 上边距 左边距
        "img.width": function(val) {
            this.defaultStyle.width = val * 5
            
            $(this.tNode).css("width", val * 5 + 'px');

            // 更新数据 - eleList
            this.mergeData()
        }, // width
        "img.height": function(val) {
            this.defaultStyle.height = val * 5
            $(this.tNode).css("height", val * 5+ 'px');
        }, // height
        // "defaultStyle.curEleCoor.x": function(val) {
        //     console.log('val+++',val)
        //     this.defaultStyle.curEleCoor.x = +val
        //     // $(this.tNode).css("transform", `translate(${this.defaultStyle.curEleCoor.y * 5}px, ${val * 5}px)`);
        //     // this.defaultStyle.translateY = val

        // }, // paddingT
        "img.paddingL": function(val) {

            $(this.tNode).css("transform", `translate(${val}px, ${this.defaultStyle.translateY}px)`);
            this.defaultStyle.translateX = val
        }, // paddingL

        // 监听文本元素位置大小 宽度 高度 上边距 左边距
        "defaultStyle.width": function(val) {
            this.defaultStyle.width = val

            $(this.tNode).css("width", val * 5 + 'px');

            // 更新数据 - eleList
            this.mergeData()
        }, // width
        "defaultStyle.height": function(val) {
            this.defaultStyle.height = val 
            $(this.tNode).css("height", val * 5 + 'px');

            // 更新数据 - eleList
            this.mergeData()
        }, // height
        "text.paddingT": function(val) {
            console.log(this.defaultStyle)

            $(this.tNode).css("transform", `translate(${this.defaultStyle.translateX}px, ${val}px)`);
            this.defaultStyle.translateY = val
        }, // paddingT
        "text.paddingL": function(val) {

            $(this.tNode).css("transform", `translate(${val}px, ${this.defaultStyle.translateY}px)`);
            this.defaultStyle.translateX = val
        }, // paddingL
        // 文本内容
        "defaultStyle.cte": function(val){
            console.log(val)
            if(!val) return 
            val = val.trim()
            // 更新数据
            this.defaultStyle.cte = val
            console.log(this.tNode.dataset.cont, this.eleList)
            this.eleList.filter(item => item.nodeKey == this.tNode.dataset.cont ? item.name = val : '')
            
            // 替换数据
            // console.log(this.tNode.innerHTML)
            var text = this.tNode.innerText
            // this.tNode.innerHTML = this.tNode.innerHTML.replace('>'+ this.defaultStyle.defaultCte +'<', '>'+val+'<')
            this.tNode.innerHTML = this.tNode.innerHTML.replace('>'+ text +'<', '>'+val+'<')
        
            // 覆盖上一次修改的数据
            this.defaultStyle.defaultCte = val

            // 更新数据 - eleList
            this.mergeData()
        },
        // 缩放比例
        'model.bl': function(val) {
            console.log(val)
            var n = +val.replace('%', '') / 100
            document.querySelector('.rules').style.zoom = n
        }
    },

}