let that = null,
    lineMap = new Map(), // 将所有创建的 line 放入map集合中
    oldY = null

// 新增一条线 - 横
export function addLineX(parent, top, vue){
  console.log(parent, top)
  // 根据类名'linex'获取 横 线的条数：给定唯一数值为id  能够准确的获取dom
  var num = document.querySelectorAll('linex').length
  // 给当前选中的 line 添加样式
  var selectLine = document.querySelector('.select-line')
  if(selectLine){
    selectLine.classList.remove('select-line')
  }

  // 编写生成 dom之前的 标签 <span class='del'> 删除 </span>
  var line = `<div class="linex select-line tips" oncontextmenu='rightKey(this, event)' data-cont='x' id='line`+ num +`' style='top: `+ top +`px' onmousedown='lineDown(this, event)'>
    
  </div>`
  parent.insertAdjacentHTML('beforeEnd', line)

  // 获取当前创建的 dom 放入vue.tNode中
  vue.tNode = document.querySelector('#line'+ num)
  vue.tNode.id = uuid()
  lineMap.set(vue.tNode.id, vue.tNode)

  // 将vue对象 赋值给 that
  if(!that) that = vue
  console.log(vue.tNode)

}

// 新增一条线 - 竖
export function addLineY(parent, left, vue){
  console.log(parent, left)
  // 根据类名'linex'获取 横 线的条数：给定唯一数值为id  能够准确的获取dom
  var num = document.querySelectorAll('liney').length
  // 给当前选中的 line 添加样式
  var selectLine = document.querySelector('.select-line')
  if(selectLine){
    selectLine.classList.remove('select-line')
  }

  // 编写生成 dom之前的 标签
  var line = `<div class="liney select-line tips" data-cont='y' id='line`+ num +`' style='left: `+ left +`px' onmousedown='lineDown(this, event)'></div>`
  parent.insertAdjacentHTML('beforeEnd', line)

  // 获取当前创建的 dom 放入vue.tNode中
  vue.tNode = document.querySelector('#line'+ num)
  vue.tNode.id = uuid()
  lineMap.set(vue.tNode.id, vue.tNode)

  // 将vue对象 赋值给 that
  if(!that) that = vue
  console.log(vue.tNode)

}

// 鼠标点击 线
window.lineDown = function (self, e){
  // 给当前选中的 line 添加样式
  var selectLine = document.querySelector('.select-line')
  if(selectLine){
    selectLine.classList.remove('select-line')
  }
  self.classList.add('select-line')
  
  // 更新移动的 类型
  that.switch = self.dataset.cont

  // 更改vue 中当前的dom
  that.tNode = self

  if(self.dataset.cont == 'x'){
    that.oldY = e.screenY
  } else if(self.dataset.cont == 'y'){
    that.oldX = e.screenX
  }
  that.open = true
  console.log(that.open)

  console.log(e)
  del()
} 

window.rightKey = function (self, e){
  e.preventDefault();
  // document.querySelector('.del').style.display = 'inline'
}

console.log(document.querySelector('.rules'))

// 删除 line
function del(){
  document.querySelector('.rules').onkeydown = function (e){
    e.preventDefault();
    console.log(e)
    
    if(that && that.tNode){
      if(e.code ==  "Backspace"){
        // console.log(this.tNode, this.tNode.parentNode)
        that.tNode.parentNode.removeChild(that.tNode)
      }
    }
  }
}


// 生成唯一ID
window.uuid = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}