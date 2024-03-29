let nodes = new Map(); //所有控件的集合
let idMap = new Map(); //所有控件的集合
let nodeStyleMap = new Map(); //所有控件的集合


let mouseIsDown = false;
let currentNode;
let mouseX = 0;
let mouseY = 0; 
let nodeX = 0; 
let nodeY = 0;
let nodeWidth;
let nodeHeight;
let nodeNum = 0
let that = null
let moveMethod; 
let x = 0, y = 0
let moveWidth


import $ from 'jquery'
 
window.allowDrop = function(event) {
	event.preventDefault();
} 

function textDrag(event) { 
	event = event || window.event

	event.dataTransfer.setData("text", 'invite-text')
}

export function textDragover(event) {
	event = event || window.event
	event.preventDefault()
}

export function drop(event, _this, type = false) {
	that = _this

	// 

	event = event || window.event
	console.log(event)
	event.stopPropagation();
	event.preventDefault();
	// let data='image'
	let data = event.dataTransfer.getData("text");
	//如果不是拖动的文本框，不响应
	console.log(data)
	console.log(event.target)
	if (!event.target.classList.contains('phone-item')) {
		return;
	}
	let node
	let nodeValue;
	let uuId = uuid()

	if (data == 'invite-text') {
		nodeValue = "文本";
		node = document.getElementById('textTemplate').cloneNode(true);
	} else if (data == 'image') {
		nodeValue = "图片";
		node = document.getElementById('imageTemplate').cloneNode(true);
	}

	if (!node) {
		return;
	}
	hideBox()
	console.log(event)
	// 确定鼠标位置
	let x = event.layerX - 80;
	let y = event.layerY - 20;


	console.log("xy = " + x, y)
	//复制一个文件编辑控件

	console.log(node)
	// 配置唯一ID
	node.id = uuid()
	console.log("node = ", node)
	var idObject = {};
	idObject.id = node.id;
	idObject.nodeValue=nodeValue;
	_this.idList.push(idObject)
	idMap.set(node.id,_this.showKey)
	var defaultStyle = {
					id: uuId,
					"textColor": "#2c3e50",
					"fontFamily": "微软雅黑",
					"fontSize": "14px",
					"lineSpa": 0,
					"lineHeight": 16,
					"opacity": 100,
					"textAlign": "",
					"fontWeight": false,
					"textDecoration": false,
					"fontStyle": false,
					"backColor": "#FFFFFF",
					"borderColor": "#2c3e50",
					"borderStyle":"none",
					"borderWidth":0,
					'hierarchy': '',
					"borderRadius":0,
					"shadowWidth":0,  //大小
					"shadowColor":"#000",  //颜色
					"shadowDim":0,   //模糊
					"shadowDirectionV":0,  // 水平
					"shadowDirectionH":0,  //垂直方向
					
					'width': '21', // 宽度
					'height': '21', // 高度
					'top': '0', // 上边距
					'left': '0', // 左边距
					"translateX": '', 
					'translateY': '',

					'varName': '', // 变量名
					'cte': '', // 文本内容
					'defaultCte': '双击更改文本', // 默认内容  /  上一次数据
					'img': '', // 图片

					'x': 0,
					'y': 0,
					// 选中元素坐标
					curEleCoor: {
						x: Math.floor(x * 10 / 5) / 10,
						y: Math.floor(y * 10 / 5) / 10
					},
	}

	// _this.curEleCoor = {x: Math.floor(x * 10 / 5) / 10, y: Math.floor(y * 10 / 5) / 10}
	var mask = document.querySelector('.mask'),
		bigX = mask.offsetWidth, 
		bigY = mask.offsetHeight, 
		domX = 105, 
		domY = 105,
		translateX, translateY

	console.log('bigX, bigY, domX, domY, x, y::', bigX, bigY, domX, domY, x, y)
	/**
	 * bigX bigY   domX domY   x y
	 * 如果 x < bigX / 2
	 * 		var translateX = bigX / 2 - x - domX / 2
	 * 但是如果 x >= bigX / 2
	 * 		var translateX = x - (bigX / 2 - domX / 2)
	 */
	if(x < (bigX / 2)){
		translateX = -(bigX / 2 - x - domX / 2)
	} else if(x >= (bigX / 2)){
		translateX = x - (bigX / 2 - domX / 2)
	}

	if(y < (bigY / 2)){
		translateY = -(bigY / 2 - y - domY / 2)
	} else if(y >= (bigY / 2)){
		translateY = y - (bigY / 2 - domY / 2)
	}

	// 设置控件位置和样式
	$(node).css('display', 'block')
	$(node).css('position', 'absolute')
	console.log('translateY,translateX: ', translateX, translateY)
	// $(node).css('transform', "translate(" + translateX + "px," + translateY + "px)")
	$(node).css('transform', "translate(" + x + "px," + y + "px)")

	defaultStyle.translateX = x
	defaultStyle.translateY = y
	nodeStyleMap.set(node.id,defaultStyle)

	let num = _this.eleList.filter( item => item.tips == _this.curElem && item ).length

	// 去除其它的选中 
	// var varArr = ['photoFileId', 'userName', 'phone', 'sex']
	// _this.eleList = _this.eleList.map(item => {
	// 	console.log(item.name, varArr.includes(item.name))
	// 	if(varArr.includes(item.name)){
	// 		item.select = true
	// 	} else {
	// 		item.select = false
	// 	}

	// 	return item
	// })
	// console.log(_this.eleList)
	// 将创建的元素 保存eleList 数组中
	_this.eleList.push({
		name: _this.curElem,
		nodeKey: _this.curElem + (+num + 1),
		dom: node,
		tips: _this.curElem,
		select: false,
		id: uuId,
		nodeId: node.id
	})

	_this.defaultStyle = defaultStyle
	// 用作 选中元素时 的判断
	node.dataset.cont = _this.curElem + (+num + 1)

	console.log('eleList === ', _this.eleList)
	console.log(node)
	// 把控件保存起来
	nodes.set(node.id, node)
	
	// 给控件绑定点击事件
	$(node).click(function(e) {
		console.log('click')
		e.stopPropagation()
		e.preventDefault()
		console.log($(this), _this)
		hideBox()
		$(this).find('.invite-text-box-border').css('display', 'block')
		$(this).find('.btn-upload').css('display', 'block')
		var but = document.getElementById("itemId"+node.id);
		if(but != null){
			$(".check").removeClass("check")
			$("#" +'itemId'+ node.id).addClass("check");
		}
		// 点击元素后  匹配dom.eleListName 与 vue.eleList.nodeKey
		// _this.eleList.filter((item, idx) => item.nodeKey == node.eleListName ? item.select = true : item.select = false)

		// return 
		if(_this.activeName.length === 0){
			_this.activeName.push("1")
			 _this.activeName.push("2")
			 _this.activeName.push("3")
			}
		_this.initTemplateCss(this)

		node.oncontextmenu = (e) => {
			let self = e.path[0]
			if(self.dataset.delete == 'true'){
				return 
			}
			console.log(e.layerX, e.layerY)
			var delDom = document.createElement('div')
			delDom.innerText = '删除'
			delDom.style = `
				font-size: 15px;
				color: #333;
				padding: 5px 10px;
				box-shadow: 1px 1px 5px 1px #eee;
				position: absolute;
				top: ${e.layerY / 5}px;
				left: ${e.layerX / 5}px;
				z-index: 9999999;
				background-color: #fff;
				cursor: pointer
			`
			delDom.onclick = function() {
				var box = document.querySelector('.mask')
				// 删除 eleList 钟的数据
				that.eleList.filter( (item, idx, arr) => {
						if(item.nodeKey == that.tNode.dataset.cont){
							arr.splice(idx, 1)
						}
				}) 

				console.log(box)
				box.removeChild(that.tNode)
				console.log(e.path[2])
			}

			self.appendChild(delDom)
			self.dataset.delete = 'true'
			console.log('右键')
		}

		console.log('eleList, defaultStyle ----- ', that.defaultStyle, that.eleList)

		// 阻止浏览器右键显示
		document.querySelector('.rules').oncontextmenu = () => {
			return false
		}
		// 更新数据
		that.mergeData()
		// mous(e)
		// $('#baseStyle').click();
	})

	// $(node).keydown(function (e) {
	//     console.log(this.id,e.keyCode,e)
	//     if(e && e.keyCode==46){
	//         nodes.delete(this.id)
	//         $(this).remove()
	//     }
	// })

	// 给控件绑定鼠标按下的事件
	$(node).dblclick( function (e){ 
		_this.imgShow = true
		_this.modelShow = false
		console.log(defaultStyle)
	})

	//鼠标点击
	$(node).mousedown(function (e) {
		console.log('mouserdown')
		e.stopPropagation()
		e.preventDefault()
		// 鼠标按下时，初始化当前控件的各项属性
		// if ($(e.target).hasClass('edit-text')) {
		// 	// moveMethod='topResize'
		// 	return
		// }
		console.log('e.target:', $(e.target), this)
		// 获取模板大小
		moveWidth = +that.model.width * 5

		mouseIsDown = true;
		currentNode = this;
		mouseX = e.pageX;
		mouseY = e.pageY;
		moveMethod = 'move';
		let trans = $(this).css('transform')
		let s = trans.split(',');
		nodeWidth = $(this).css('width').replace('px', '') - 0;
		nodeHeight = $(this).css('height').replace('px', '') - 0
		console.log(node)
		console.log(nodeWidth, nodeHeight)
		nodeX = s[4] - 0
		nodeY = s[5].substr(0, s[5].length - 1) - 0
		console.log($(e.target).hasClass('top-line-point'))
		if ($(e.target).hasClass('top-line-point')) {
			moveMethod = 'topResize'
		}
		 if ($(e.target).hasClass('left-line-point')) {
			moveMethod = 'leftResize'
		}
		if ($(e.target).hasClass('right-line-point')) {
			moveMethod = 'rightResize'
		} 
		if ($(e.target).hasClass('bottom-line-point')) {
			moveMethod = 'bottomResize'
		}
		 if ($(e.target).hasClass('left-top-point')) {
			moveMethod = 'leftTopResize'
		}
		 if ($(e.target).hasClass('right-top-point')) {
			moveMethod = 'rightTopResize'
		}
		 if ($(e.target).hasClass('left-bottom-point')) {
			moveMethod = 'leftBottomResize'
		}
		 if ($(e.target).hasClass('right-bottom-point')) {
			moveMethod = 'rightBottomResize'
		}

	})
	//把控件添加到容器内
	event.target.appendChild(node);
	// 触发一次控件的点击事件
	$(node).click()

}

export function addSubmitForm(_this) {

	if (!_this.needForm) {
		//不需要表单
		let forms = $('#box').find('.formTemplate');	
		for (let i = 0; i < forms.length; i++) {
			$(forms[i]).remove()
		}

		return
	}

	//需要添加表单，先判断是否己经有表单了，如果有了，按配置变更显示项，否则先添加一下，再按配置变更显示项
	let forms = $('#box').find('.formTemplate');
	if (forms.length >= 1) {
		//己经存在表单
		_this.updateSubmitForm(forms[0])
		return
	}
	// 没有存在表单，就要先添加一个
	let node = document.getElementById('formTemplate').cloneNode(true)
	node.id = uuid()
	$(node).css('display', 'block')
	$($('#box').find('.phone-item')[_this.showKey]).append(node);
	$(node).css('transform', "translate(10px,50px)")
	initNode(node)
	_this.updateSubmitForm(node)

} //addSubmitForm

// text = 元素列显示的文字   bool 代表编辑
export function initNode(node, _this,text, bool = false) {
		if(text !== undefined){
			 var idObject = {};
			 idObject.id = $(node).attr('id');
			 idObject.nodeValue=text;
			 _this.idList.push(idObject)
			 idMap.set(node.id,_this.showKey)
			 
		}
	
		console.log(node)
		that = _this
	nodes.set($(node).attr('id'), node) 

	// 编辑 将创建的dom 覆盖 eleList中对应的dom  唯一标识 data-cont
	if(bool){
		moveWidth = +_this.model.width * 5

		_this.eleList.filter(item => {
			if(item.nodeKey == node.dataset.cont){
				// 将defaultStyle中的 nodeId 赋值 node.id
				node.id = item.nodeId
				nodeStyleMap.set(node.id, item)
				console.log('node.id: ', node.id)
				item.dom = node
			}
		})
	}
	
	$(node).click(function(e) {
		e.stopPropagation()
		e.preventDefault()
		hideBox()
		console.log(node)
		$(node).find('.invite-text-box-border').css('display', 'block')
		_this.initTemplateCss(node)

		node.oncontextmenu = () => {
			console.log('右键2')
		}
		
		if(_this.activeName.length === 0){
			_this.activeName.push("1")
			 _this.activeName.push("2")
			 _this.activeName.push("3")
			}
			
	})
	$(node).mousedown(function(e) {
		$(".check").removeClass("check")
		 $("#" +'itemId'+ node.id).addClass("check");
		
		// var nodeElement = $("#"+ node.id);
		// console.log("zzzz",nodeElement.css('color'))
		// 鼠标按下时，初始化当前控件的各项属性
		// if ($(e.target).hasClass('edit-text')) {
		// 	// moveMethod='topResize'
		// 	return
		// }

		// 根据 data-cont 关联对应的 node
		that.eleList.filter(item => {
			if(item.nodeKey == node.dataset.cont){
				that.tNode = item.dom
				that.defaultStyle = item
			}
		})
		
		// that.tNode = node
		// console.log(that.tNode)
		console.log("mouseIsDown = " + mouseIsDown)
		mouseIsDown = true;
		currentNode = this;
		mouseX = e.pageX;
		mouseY = e.pageY;
		moveMethod = 'move';
		let trans = $(this).css('transform')
		let s = trans.split(',');
		nodeWidth = $(this).css('width').replace('px', '') - 0;
		nodeHeight = $(this).css('height').replace('px', '') - 0
		console.log(nodeWidth, nodeHeight, s)
		nodeX = s[4] - 0
		nodeY = s[5].substr(0, s[5].length - 1) - 0
		console.log(e.target.classList)
		if ($(e.target).hasClass('top-line-point')) {
			moveMethod = 'topResize'
		}
		 if ($(e.target).hasClass('left-line-point')) {
			moveMethod = 'leftResize'
		}
		 if ($(e.target).hasClass('right-line-point')) {
			moveMethod = 'rightResize'
		}
		 if ($(e.target).hasClass('bottom-line-point')) {
			moveMethod = 'bottomResize'
		}
		 if ($(e.target).hasClass('left-top-point')) {
			moveMethod = 'leftTopResize'
		}
		 if ($(e.target).hasClass('right-top-point')) {
			moveMethod = 'rightTopResize'
		}
		 if ($(e.target).hasClass('left-bottom-point')) {
			moveMethod = 'leftBottomResize'
		}
		 else if ($(e.target).hasClass('right-bottom-point')) {
			moveMethod = 'rightBottomResize'
		}

	});

		// 给控件绑定鼠标按下的事件
		$(node).dblclick( function (e){
			_this.imgShow = true
			_this.modelShow = false
		})
}

function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

export function hideBox(showStyle) {
	// for (let i = 0; i < nodes.length; i++) {
	//     //     // $(nodes[i]).css('color','blue')
	//     //     $(nodes[i]).find('.invite-text-box-border').css('display', 'none')
	//     // }

	nodes.forEach(function(node) {
		$(node).find('.invite-text-box-border').css('display', 'none')
		$(node).find('.btn-upload').css('display', 'none')
	})
	showStyle = false
}

document.body.ondrop = function(event) {
	event = event || window.event
	event.stopPropagation()
	event.preventDefault()

}

document.body.onmouseup = function(event) {
	// 释放控件及属性
	mouseIsDown = false;
	currentNode = null
	moveMethod = '';

	if(that && that.tNode){
		// console.log(that.tNode)
		var item = nodeStyleMap.get(that.tNode.id)
		
		item.x = 0
		item.y = 0
	}
}

document.body.onmousemove = function(event) {
	
	if (!mouseIsDown || !currentNode || $(currentNode).find('.invite-text-box-border').css('display') == 'none') {
		return
	}
	var item = nodeStyleMap.get(that.tNode.id)
	let moveX = event.pageX - mouseX;
	let moveY = event.pageY - mouseY;
	// moveWidth = item
	// console.log(item.curEleCoor.y, moveY, item.y)
	console.log('moveMethod:::', moveMethod)
	
	if (moveMethod == 'move') {
		console.log("move")

			// 获取差值
			if(item.x != moveX){
				var chaValX = (Math.floor(moveX * 10 / 5) - Math.floor(item.x * 10 / 5)) / 10
				// console.log('chaValX: ', typeof +chaValX.toFixed(1), typeof +item.curEleCoor.x, +chaValX.toFixed(1), +item.curEleCoor.x)
				
				item.curEleCoor.x = (+item.curEleCoor.x + +chaValX).toFixed(1)
				item.x = moveX 
			} 

			if(item.y != moveY){
				var chaValY = (Math.floor(moveY * 10 / 5) - Math.floor(item.y * 10 / 5)) / 10
				// console.log('chaValY: ', typeof chaValY, chaValY)

				item.curEleCoor.y = (+item.curEleCoor.y + +chaValY).toFixed(1)
				item.y = moveY
			}
		move(moveX, moveY)
	} else if (moveMethod == 'topResize') {
		if(item.y != moveY){
			var chaValY = (Math.floor(moveY * 10 / 5) - Math.floor(item.y * 10 / 5)) / 10
			// console.log('chaValY: ', typeof chaValY, chaValY)

			item.curEleCoor.y = (+item.curEleCoor.y + +chaValY).toFixed(1)
			item.y = moveY
		} 
		topResize(moveX, moveY)
	} else if (moveMethod == 'bottomResize') {
		bottomResize(moveX, moveY)
	} else if (moveMethod == 'leftResize') {
		console.log(moveX, moveY)
		// 获取差值
		if(item.x != moveX){
			var chaValX = (Math.floor(moveX * 10 / 5) - Math.floor(item.x * 10 / 5)) / 10
			console.log('chaValX: ', typeof chaValX, chaValX)

			item.curEleCoor.x = (+item.curEleCoor.x + +chaValX).toFixed(1)
			item.x = moveX
		} 
		leftResize(moveX, moveY)
		// rightResize
	} else if (moveMethod == 'rightResize') {
		rightResize(moveX, moveY)
	} else if (moveMethod == 'leftTopResize'){

		return 
		// 获取差值
		if(item.x != moveX){
			var chaValX = (Math.floor(moveX * 10 / 5) - Math.floor(item.x * 10 / 5)) / 10
			// console.log('chaValX: ', typeof +chaValX.toFixed(1), typeof +item.curEleCoor.x, +chaValX.toFixed(1), +item.curEleCoor.x)
			
			item.curEleCoor.x = (+item.curEleCoor.x + +chaValX).toFixed(1)
			item.x = moveX 
		} 

		if(item.y != moveY){
			var chaValY = (Math.floor(moveY * 10 / 5) - Math.floor(item.y * 10 / 5)) / 10
			// console.log('chaValY: ', typeof chaValY, chaValY)

			item.curEleCoor.y = (+item.curEleCoor.y + +chaValY).toFixed(1)
			item.y = moveY
		}
		leftTopResize(moveX, moveY)
	} else if (moveMethod == 'rightBottomResize'){

		rightBottomResize(moveX, moveY)
	} else if (moveMethod == 'leftBottomResize'){

		return 
		if(item.x != moveX){
			var chaValX = (Math.floor(moveX * 10 / 5) - Math.floor(item.x * 10 / 5)) / 10
			// console.log('chaValX: ', typeof +chaValX.toFixed(1), typeof +item.curEleCoor.x, +chaValX.toFixed(1), +item.curEleCoor.x)
			
			
			item.curEleCoor.x = (+item.curEleCoor.x + +chaValX).toFixed(1)
			item.x = moveX 
		} 
		leftBottomResize(moveX, moveY)
	} else if (moveMethod == 'rightTopResize'){
		
		return  
		if(item.y != moveY){
			var chaValY = (Math.floor(moveY * 10 / 5) - Math.floor(item.y * 10 / 5)) / 10
			// console.log('chaValY: ', typeof chaValY, chaValY)

			item.curEleCoor.y = (+item.curEleCoor.y + +chaValY).toFixed(1)
			item.y = moveY
		}
		rightTopResize(moveX, moveY)
	} 

}

// 移动
function move(moveX, moveY) {
	// console.log(currentNode)
	$(currentNode).css('transform', 'translate(' + (nodeX + moveX) + 'px,' + (nodeY + moveY) + 'px)');
}

// 上
function topResize(moveX, moveY) {
	if (nodeHeight - moveY <= 20) {
		return
	}
	$(currentNode).css('height', (nodeHeight - moveY) + 'px')
	$(currentNode).css('transform', 'translate(' + (nodeX) + 'px,' + (nodeY + moveY) + 'px)');
}

// 下
function bottomResize(moveX, moveY) {
	if (nodeHeight + moveY <= 20) {
		return
	}
	$(currentNode).css('height', (nodeHeight + moveY) + 'px')
}

// 左
function leftResize(moveX, moveY) {
	if (nodeWidth - moveX <= 20) {
		return
	}

	$(currentNode).css('width', (nodeWidth - moveX) / moveWidth * 101.5 + '%')
	$(currentNode).css('transform', 'translate(' + (nodeX + moveX) + 'px,' + (nodeY) + 'px)');
}

// 右
function rightResize(moveX, moveY) {
	if (nodeWidth + moveX <= 20) {
		return
	}
	console.log(nodeWidth, moveX, moveWidth)
	console.log('currentNode:::', currentNode)
	$(currentNode).css('width', (nodeWidth + moveX) / moveWidth * 101.5 + '%')
}


// 左上
function leftTopResize(moveX, moveY) {
	if (nodeWidth - moveX <= 20 || nodeHeight - moveY <= 20) {
		return
	}

	$(currentNode).css('width', (nodeWidth - moveX) / moveWidth * 101.5 + '%')
	$(currentNode).css('height', (nodeHeight - moveY) + 'px')
	
	$(currentNode).css('transform', 'translate(' + (nodeX + moveX) + 'px,' + (nodeY + moveY) + 'px)');
}

// 左下
function leftBottomResize(moveX, moveY) {
	if (nodeWidth - moveX <= 20 || nodeHeight + moveY <= 20) {
		return
	}

	$(currentNode).css('width', (nodeWidth - moveX) / moveWidth * 101.5 + '%')
	$(currentNode).css('height', (nodeHeight + moveY) + 'px')
	
	$(currentNode).css('transform', 'translate(' + (nodeX + moveX) + 'px,' + (nodeY) + 'px)');
}

// 右上
function rightTopResize(moveX, moveY) {
	if (nodeWidth + moveX <= 20 || nodeHeight - moveY <= 20) {
		return
	}

	$(currentNode).css('width', (nodeWidth + moveX) / moveWidth * 101.5 + '%')
	$(currentNode).css('height', (nodeHeight - moveY) + 'px')

	$(currentNode).css('transform', 'translate(' + (nodeX) + 'px,' + (nodeY + moveY) + 'px)');
}

// 右下
function rightBottomResize(moveX, moveY) {
	if (nodeWidth + moveX <= 20 || nodeHeight + moveY <= 20) {
		return
	}
	$(currentNode).css('width', (nodeWidth + moveX) / moveWidth * 101.5 + '%')
	$(currentNode).css('height', (nodeHeight + moveY) + 'px')
}

document.onclick = function (e) {
	var e = e || window.event;  //标准化事件对象
	var t = e.target || e.srcElement;  //获取发生事件的元素，兼容IE和DOM

	// console.log(t)
	// return 
	if (e.ctrlKey && e.shiftKey) {  //如果同时按下Ctrl和Shift键
			t.parentNode.removeChild(t);  //移出当前元素
	}
}




export {
	nodes,
	idMap,
	nodeStyleMap,
	mouseIsDown,
	currentNode,
	mouseX,
	mouseY,
	nodeX,
	nodeY,
	nodeWidth,
	nodeHeight,
	moveMethod
}
