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

let moveMethod;


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

export function drop(event, _this) {
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
	var nodeValue;

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
	//确定鼠标位置
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
	var defaultStyle = {"textColor": "#2c3e50",
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
	}
	nodeStyleMap.set(node.id,defaultStyle)

	// 设置控件位置和样式
	$(node).css('display', 'block')
	$(node).css('position', 'absolute')
	console.log("设置 xy = " + x, y)
	$(node).css('top', `${y}px`)
	$(node).css('left', `${x}px`)


	/**
	 * bigX bigY   domX domY   x y
	 * 如果 x < bigX / 2
	 * 		var translateX = bigX / 2 - x - domX / 2
	 * 但是如果 x >= bigX / 2
	 * 		var translateX = x - (bigX / 2 - domX / 2)
	 */
	// $(node).css('transform', "translate(" + x + "px," + y + "px)")
	// 把控件保存起来
	nodes.set(node.id, node)
	
	// 给控件绑定点击事件
	$(node).click(function(e) {
		e.stopPropagation()
		e.preventDefault()
		hideBox()
		$(this).find('.invite-text-box-border').css('display', 'block')
		$(this).find('.btn-upload').css('display', 'block')
		var but = document.getElementById("itemId"+node.id);
		if(but != null){
			$(".check").removeClass("check")
			$("#" +'itemId'+ node.id).addClass("check");
		}
		// return 
		if(_this.activeName.length === 0){
			_this.activeName.push("1")
			 _this.activeName.push("2")
			 _this.activeName.push("3")
			}
		_this.initTemplateCss(this)
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
	})


	$(node).mousedown(function(e) {
		// 鼠标按下时，初始化当前控件的各项属性
		if ($(e.target).hasClass('edit-text')) {
			// moveMethod='topResize'
			return
		}
		mouseIsDown = true;
		currentNode = this;
		mouseX = e.pageX;
		mouseY = e.pageY;
		moveMethod = 'move';
		let trans = $(this).css('transform')
		let s = trans.split(',');
		nodeWidth = $(this).css('width').replace('px', '') - 0;
		nodeHeight = $(this).css('height').replace('px', '') - 0
		console.log(nodeWidth, nodeHeight)
		nodeX = s[4] - 0
		nodeY = s[5].substr(0, s[5].length - 1) - 0
		console.log($(e.target).hasClass('top-line-point'))
		if ($(e.target).hasClass('top-line-point')) {
			moveMethod = 'topResize'
		} else if ($(e.target).hasClass('left-line-point')) {
			moveMethod = 'leftResize'
		} else if ($(e.target).hasClass('right-line-point')) {
			moveMethod = 'rightResize'
		} else if ($(e.target).hasClass('bottom-line-point')) {
			moveMethod = 'bottomResize'
		} else if ($(e.target).hasClass('left-top-point')) {
			moveMethod = 'leftTopResize'
		} else if ($(e.target).hasClass('right-top-point')) {
			moveMethod = 'rightTopResize'
		} else if ($(e.target).hasClass('left-bottom-point')) {
			moveMethod = 'leftBottomResize'
		} else if ($(e.target).hasClass('right-bottom-point')) {
			moveMethod = 'rightBottomResize'
		}



	});
	//把控件添加到容器内
	event.target.appendChild(node);
	// 触发一次控件的点击事件
	$(node).click()

}

export function addSubmitForm(_this) {

	if (!_this.needForm) {
		//不需要表单
		let forms = $('#mc').find('.formTemplate');	
		for (let i = 0; i < forms.length; i++) {
			$(forms[i]).remove()
		}

		return
	}

	//需要添加表单，先判断是否己经有表单了，如果有了，按配置变更显示项，否则先添加一下，再按配置变更显示项
	let forms = $('#mc').find('.formTemplate');
	if (forms.length >= 1) {
		//己经存在表单
		_this.updateSubmitForm(forms[0])
		return
	}
	// 没有存在表单，就要先添加一个
	let node = document.getElementById('formTemplate').cloneNode(true)
	node.id = uuid()
	$(node).css('display', 'block')
	$($('#mc').find('.phone-item')[_this.showKey]).append(node);
	$(node).css('transform', "translate(10px,50px)")
	initNode(node)
	_this.updateSubmitForm(node)

} //addSubmitForm

// text = 元素列显示的文字
export function initNode(node, _this,text) {
		if(text !== undefined){
			 var idObject = {};
			 idObject.id = $(node).attr('id');
			 idObject.nodeValue=text;
			 _this.idList.push(idObject)
			 idMap.set(node.id,_this.showKey)
			 
		}
	

	nodes.set($(node).attr('id'), node)
	

	
	$(node).click(function(e) {
		e.stopPropagation()
		e.preventDefault()
		hideBox()
		$(this).find('.invite-text-box-border').css('display', 'block')
		_this.initTemplateCss(this)
		
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
		if ($(e.target).hasClass('edit-text')) {
			// moveMethod='topResize'
			return
		}
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
		console.log($(e.target).hasClass('top-line-point'))
		if ($(e.target).hasClass('top-line-point')) {
			moveMethod = 'topResize'
		} else if ($(e.target).hasClass('left-line-point')) {
			moveMethod = 'leftResize'
		} else if ($(e.target).hasClass('right-line-point')) {
			moveMethod = 'rightResize'
		} else if ($(e.target).hasClass('bottom-line-point')) {
			moveMethod = 'bottomResize'
		} else if ($(e.target).hasClass('left-top-point')) {
			moveMethod = 'leftTopResize'
		} else if ($(e.target).hasClass('right-top-point')) {
			moveMethod = 'rightTopResize'
		} else if ($(e.target).hasClass('left-bottom-point')) {
			moveMethod = 'leftBottomResize'
		} else if ($(e.target).hasClass('right-bottom-point')) {
			moveMethod = 'rightBottomResize'
		}

	});
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
}

document.body.onmousemove = function(event) {

	if (!mouseIsDown || !currentNode || $(currentNode).find('.invite-text-box-border').css('display') == 'none') {
		return
	}

	let moveX = event.pageX - mouseX;
	let moveY = event.pageY - mouseY;
	// console.log("move = " +moveX,moveY,(nodeX+moveX),(nodeY+moveY))
	if (moveMethod == 'move') {
		console.log("move")
		move(moveX, moveY)
	} else if (moveMethod == 'topResize') {
		topResize(moveX, moveY)
	} else if (moveMethod == 'bottomResize') {
		bottomResize(moveX, moveY)
	} else if (moveMethod == 'leftResize') {
		leftResize(moveX, moveY)
	} else if (moveMethod == 'rightResize') {
		rightResize(moveX, moveY)
	}


}

function move(moveX, moveY) {
	$(currentNode).css('transform', 'translate(' + (nodeX + moveX) + 'px,' + (nodeY + moveY) + 'px)');
}

function topResize(moveX, moveY) {
	if (nodeHeight - moveY <= 20) {
		return
	}
	$(currentNode).css('height', (nodeHeight - moveY) + 'px')
	$(currentNode).css('transform', 'translate(' + (nodeX) + 'px,' + (nodeY + moveY) + 'px)');
}

function bottomResize(moveX, moveY) {
	if (nodeHeight + moveY <= 20) {
		return
	}
	$(currentNode).css('height', (nodeHeight + moveY) + 'px')
	// $(currentNode).css('transform','translate('+(nodeX)+'px,'+(nodeY+moveY)+'px)');
}

function leftResize(moveX, moveY) {
	if (nodeWidth - moveX <= 20) {
		return
	}
	console.log('移动')
	$(currentNode).css('width', (nodeWidth - moveX) / 375 * 101.5 + '%')
	$(currentNode).css('transform', 'translate(' + (nodeX + moveX) + 'px,' + (nodeY) + 'px)');
}

function rightResize(moveX, moveY) {
	if (nodeWidth + moveX <= 20) {
		return
	}
	$(currentNode).css('width', (nodeWidth + moveX) / 375 * 101.5 + '%')
	// $(currentNode).css('transform','translate('+(nodeX+moveX)+'px,'+(nodeY)+'px)');
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
