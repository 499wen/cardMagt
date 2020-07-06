<template>
    <div class="card-main">

        <div class="main-box">
            <!-- 头部导航 -->
            <div class="nav-header">
                <div>
                    <el-button 
                        size="mini"
                        :class="['nav-single', item.select && 'nav-select']"
                        v-for="(item, idx) in headerTag" :key="idx"
                        @click="switchTab(idx)"
                    > {{ item.name }} </el-button >
                </div>

                <!-- 模板制作 -->
                <div class="operation" v-show="headerTag[0].select">
                    <el-button size="mini" @click="modelShow = true; imgShow = false">设置</el-button>
                    <el-button size="mini" @click="newCreate">新建模板</el-button>
                    <!-- @command="handleCommand"  -->
                    <el-dropdown style="margin: 0 10px;" placement="bottom">
                        <el-button size='mini' style=" width: 100.5px">
                        添加元素
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown" class="add-ele">
                            <div draggable="true" @dragstart="imgDrag($event)" @dragover="imgDragover($event)" style="z-index: 11">图片</div>
                            <div draggable="true" @dragstart="textDrag($event)" @dragover="textDragover($event)">文本</div>
                        </el-dropdown-menu> 
                    </el-dropdown>  
                    <el-button size="mini" @click="openModel">选择模板</el-button>
                    <el-button size="mini" v-if="eleList.length" @click="preservation">保存模板</el-button>
                </div>
 
                <!-- 数据填充 -->
                <div class="operation" v-show="headerTag[1].select">
                    <el-button size="mini" v-if="eleList.length" @click="relevantPerson">相关人员</el-button>
                    <!-- preProsons -->
                    <el-button size="mini" v-if="eleList.length" @click="verification">保存人员</el-button>
                </div>
            </div>

            <!-- 样式设计 -->
            <div class="model-make" v-show="headerTag[0].select">
                <!-- 上部分 -->
                <!-- <div class="model-make-top">
                    
                </div> -->

                <div class="model-make-container">

                    <!-- 中间部分 -->
                    <div class="model-make-center" style="flex: 1">

                        <Test>
                            <div class="box" id="box"
                                @dblclick.self='modelShow = true'
                                v-if="!edit_mo"
                                :style="{'width': model.width * 5 + 'px', 'height': model.height * 5 + 'px', 'padding': model.bleedingSite * 5 + 'px', 'background-color': model.bgcolor}"
                             >
                                <div 
                                    class="mask phone-item" 
                                    @dblclick.self='modelShow = true'
                                    @drop="dropTest($event)" @dragover="allowDrop($event)"
                                    >
                                
                                    <!-- 四个方向的出血点 -->
                                    <div class="mask-leftTop mask-direction" @dblclick='modelShow = true'>
                                        <div class="mask-left" :style="{width: model.bleedingSite * 2.5 + 'px', right: model.bleedingSite * 2.5 + 'px'}"></div>
                                        <div class="mask-top" :style="{height: model.bleedingSite * 2.5 + 'px', bottom: model.bleedingSite * 2.5 + 'px'}"></div>
                                    </div>
                                    <div class="mask-leftBottom mask-direction" @dblclick='modelShow = true'>
                                        <div class="mask-left" :style="{width: model.bleedingSite * 2.5 + 'px', right: model.bleedingSite * 2.5 + 'px'}"></div>
                                        <div class="mask-bottom" :style="{height: model.bleedingSite * 2.5 + 'px', top: model.bleedingSite * 2.5 + 'px'}"></div>
                                    </div>
                                    <div class="mask-rightTop mask-direction" @dblclick='modelShow = true'>
                                        <div class="mask-right" :style="{width: model.bleedingSite * 2.5 + 'px', left: model.bleedingSite * 2.5 + 'px'}"></div>
                                        <div class="mask-top" :style="{height: model.bleedingSite * 2.5 + 'px', bottom: model.bleedingSite * 2.5 + 'px'}"></div>
                                    </div>
                                    <div class="mask-rightBottom mask-direction" @dblclick='modelShow = true'>
                                        <div class="mask-right" :style="{width: model.bleedingSite * 2.5 + 'px', left: model.bleedingSite * 2.5 + 'px'}"></div>
                                        <div class="mask-bottom" :style="{height: model.bleedingSite * 2.5 + 'px', top: model.bleedingSite * 2.5 + 'px'}"></div>
                                    </div>
                                </div>

                            </div>

                            <div 
                                v-else 
                                v-html="editTc"
                                :style="{'width': model.width * 5 + 'px', 'height': model.height * 5 + 'px', 'padding': model.bleedingSite * 5 + 'px', 'background-color': model.bgcolor, 'box-sizing': 'unset'}"
                                class="mask phone-item box" id="edit" 
                                @dblclick.self='modelShow = true'
                                  @drop="dropTest($event)" @dragover="allowDrop($event)"
                                >
                            </div> 

                            <!-- 标识模板尺寸 -->
                            <div 
                                class="t-p-o"
                                :style="{
                                    'width': model.width * 5 + 'px',
                                    'margin-top': '10px', 
                                    'text-align': 'center',
                                    'font-size': '15px',
                                    'color': '#666',
                                    'padding': '0 ' + model.bleedingSite * 5 + 'px'
                                }"
                             > 
                                {{ (+model.bleedingSite * 2) + (+model.width) + 'x' + ((+model.bleedingSite * 2) + (+model.height)) }} 
                            </div>

                            <!-- 坐标 -->
                            <div class="coordinate" v-if="tNode"> 
                                <!-- .toFixed(1) -->
                                ({{ (+model.bleedingSite + +defaultStyle.curEleCoor.x) }}, {{ (+model.bleedingSite + +defaultStyle.curEleCoor.y) }})
                            </div>
                        </Test>
                    </div>

                    <!-- 右侧部分 -->
                    <div class="model-make-right">
                        <div style="width: 200px; height: 100%">
                            <div class="ele-list" >元素列表</div>
                            <div class="ele-single">
                                <div v-for="(item, idx) in eleList" :key="idx">
                                    
                                    <div class="ele-btn" v-if="item.select" style="border-color: red; " @click="selectDom(item, idx)">
                                        <img src="../../../public/static/images/invitimages.png" v-if="item.tips == '图片'" alt="">
                                        <img src="../../../public/static/images/invittext.png" v-else alt="">
                                        <div>{{ arrVarName.get(item.name) || item.name }}</div>
                                    </div>

                                    <div class="ele-btn" v-else @click="selectDom(item, idx)">
                                        <img src="../../../public/static/images/invitimages.png" v-if="item.tips == '图片'" alt="">
                                        <img src="../../../public/static/images/invittext.png" v-else alt="">
                                        <div>{{ arrVarName.get(item.name) || item.name }}</div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- 数据填充 -->
            <div v-show="headerTag[1].select" class="model-make" style="display: flex">
                <div class="model-make-center" style="width: 65%">
                    <Test> 
                        <div v-html="tc"></div>
                    </Test>
                </div>
                
                <div class="" style="width: 35%; height: 100%; text-align: center; z-index: 999">
                    <!-- 表格 -->
                    <div class="table" >
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            class="table__"
                            tooltip-effect="dark"
                            border
                            @selection-change="handleSelectionChange"
                            @row-click='rowClick'
                        >

                            <el-table-column align="center" type="selection" width="40"></el-table-column>

                            <el-table-column
                                align="center"
                                :label="item.name" :width="item.width" :prop="item.scription"
                                v-for="(item, idx) in tableCate" :key="idx"
                            >
                                <template slot-scope="scope">
                                    <div v-if="item.scription == 'photoFileId'">
                                        {{ scope.row[item.scription] ? '/api/filecenter/file/file/' + scope.row[item.scription] : '无相片' }}
                                        <!-- <img :src="'/api/filecenter/file/file/'+ scope.row[item.scription]" width="30" height='30'/> -->
                                    </div>
                                    <div v-else>{{ scope.row[item.scription] }}</div>
                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                    <div class="page">
                        <el-pagination
                            background
                            size='mini'
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="tData.currentPage"
                            :page-sizes="[30, 60, 90]"
                            :page-size="tData.pageSize"
                            layout="total, prev, pager, next"
                            :total="tData.total">
                        </el-pagination>
                    </div> 
                </div>
            </div>

            <!-- 这里是图片的模板 start?-->
            <div v-show="false" id="imageTemplate" class="imageTemplate public" :style="{'height': '85px', 'width': '85px', 'z-index': 5}">
                <div class="invite-text-box">
                    <div class="invite-text-box-text">
                        <div class="tip">双击选择图片</div>
                    </div>
                    <div class="invite-text-box-border i-t-b-border">
                        <div class="invite-text-box-border-container">
                            <div class="invite-text-box-border top-line move-line">
                                <div class="invite-text-box-border line-point s-resize top-line-point"></div>
                            </div>

                            <div class="invite-text-box-border left-line move-line">
                                <div class="invite-text-box-border line-point left-line-point"></div>
                            </div>

                            <div class="invite-text-box-border right-line move-line">
                                <div class="invite-text-box-border line-point right-line-point"></div>
                            </div>

                            <div class="invite-text-box-border bottom-line move-line">
                                <div class="invite-text-box-border line-point s-resize bottom-line-point"></div>
                            </div>

                            <div class="invite-text-box-border left-top-point up-point"></div>
                            <div class="invite-text-box-border right-top-point up-point"></div>
                            <div class="invite-text-box-border left-bottom-point up-point"></div>
                            <div class="invite-text-box-border right-bottom-point up-point"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--  这里是图片的模板 end-->

            <!-- 这里是文字的模板 start-->
            <div class="mr20 ml15">
                <div v-show="false" id="textTemplate" class="textTemplate public" style="height:40px;width:40%;z-index: 5">
                    <div class="invite-text-box">
                        <div class="invite-text-box-text edit-text tip">双击更改文本</div>
                        <div class="invite-text-box-border">
                            <div class="invite-text-box-border-container i-t-b-border">
                                <div class="invite-text-box-border top-line move-line">
                                    <div class="invite-text-box-border line-point s-resize top-line-point"></div>
                                </div>

                                <div class="invite-text-box-border left-line move-line">
                                    <div class="invite-text-box-border line-point left-line-point"></div>
                                </div>

                                <div class="invite-text-box-border right-line move-line">
                                    <div class="invite-text-box-border line-point right-line-point"></div>
                                </div>

                                <div class="invite-text-box-border bottom-line move-line">
                                    <div class="invite-text-box-border line-point s-resize bottom-line-point"></div>
                                </div>

                                <div class="invite-text-box-border left-top-point up-point"></div>
                                <div class="invite-text-box-border right-top-point up-point"></div>
                                <div class="invite-text-box-border left-bottom-point up-point"></div>
                                <div class="invite-text-box-border right-bottom-point up-point"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 这里是文字的模板 end?-->
    
            <!-- 图片双击后 修改弹框 start -->
            <el-dialog
                title="提示"
                :visible.sync="imgShow"
                width="30%"
                center
                :close-on-click-modal='false'
                >
                <!-- 图片、文本 修改的功能 -->
                <div id="templateStyle" v-if="true">
                    <el-collapse v-model="activeName">
                        <div class="function">
                            <span :class="['fun-single', item.select && 'fun-select']" 
                                v-for="(item, idx) in funTag" :key="idx"
                                @click.self="switchFun(idx)"
                            > {{ item.name }} </span>  
                        </div>
                        <div v-if="false">
                            <!-- 文本 -->
                            <ul class="position" v-if="!isImage">
                                <li>
                                    <span style="letter-spacing: 5px;">左边距</span>
                                    <el-input size='mini' v-model="text.paddingL"> </el-input>
                                </li>
                                <li>
                                    <span style="letter-spacing: 5px;">上边距</span>
                                    <el-input size='mini' v-model="text.paddingT"> </el-input>
                                </li>
                                <li>
                                    <span>高度</span>
                                    <el-input style="margin-left: -17px;" size='mini' v-model="text.height"> </el-input>
                                </li>
                                <li>
                                    <span>宽度</span>
                                    <el-input size='mini' style="margin-left: -17px;" v-model="text.width"> </el-input>
                                </li>
                            </ul>
                            <!-- 图片 -->
                            <ul class="position" v-else>
                                <li>
                                    <span>左边距</span>
                                    <el-input size='mini' v-model="img.paddingL"> </el-input>
                                </li>
                                <li>
                                    <span>上边距</span>
                                    <el-input size='mini' v-model="img.paddingT"> </el-input>
                                </li>
                                <li>
                                    <span>高度</span>
                                    <el-input size='mini' style="margin-left: -17px;" v-model="img.height"> </el-input>
                                </li>
                                <li>
                                    <span>宽度</span>
                                    <el-input size='mini' style="margin-left: -17px;" v-model="img.width"> </el-input>
                                </li>
                            </ul>
                        </div>
                        <div  v-if="funTag[0].select">
                            <div class="layui-colla-content layui-show">
                                <div v-if="!isImage">
                                    <ul class="position">
                                        <li>
                                            <span style="letter-spacing: 5px;">左边距</span>
                                            <el-input size='mini' style="width: 97px" @input="getVal('curEleCoorX', $event)" v-model="defaultStyle.curEleCoor.x"> </el-input>
                                        </li>
                                        <li>
                                            <span style="letter-spacing: 5px;">上边距</span>
                                            <el-input size='mini' style="width: 97px" @input="getVal('curEleCoorY', $event)" v-model="defaultStyle.curEleCoor.y"> </el-input>
                                        </li>
                                        <li>
                                            <span>高度</span>
                                            <el-input size='mini' style="width: 97px;margin-left: -20px;" v-model="defaultStyle.height"> </el-input>
                                        </li>
                                        <li>
                                            <span>宽度</span>
                                            <el-input size='mini' style="width: 97px;margin-left: -20px;" v-model="defaultStyle.width"> </el-input>
                                        </li>
                                    </ul>
                                    <!-- <div class="set-cte">
                                        <span style="">内容</span>
                                        <el-input v-model="defaultStyle.cte" size="mini" placeholder="设置文本内容"></el-input>
                                    </div> -->
                                    <div style="float:left;letter-spacing: 25px;margin-bottom: 10px">
                                        <span>内容</span>
                                        <el-input style="width: 285px; margin-left: -10px" v-model="defaultStyle.cte" size="mini" placeholder="设置文本内容"></el-input>
                                    </div>
                                    <div class="mb10 clear_float" style="text-align: left">
                                        <div style="float:left;letter-spacing: 25px;">
                                            <span>字体</span> 
                                            <el-select class="font_select mr10" filterable default-first-option allow-create size="mini" v-model="defaultStyle.fontFamily" style="margin-left: -10px;width:98px;height:35px; margin-right: 10px">
                                                <el-option value="黑体" selected="selected">黑体</el-option>
                                                <el-option value="宋体">宋体</el-option>
                                                <el-option value="微软雅黑">微软雅黑</el-option>
                                            </el-select>
                                            <span>字号</span>
                                            <el-select v-model="defaultStyle.fontSize" size="mini" class="font_select mr10" style="width:95px;height:35px;">
                                                <el-option value="12px">12px</el-option>
                                                <el-option value="13px">13px</el-option>
                                                <el-option value="14px">14px</el-option>
                                                <el-option value="16px">16px</el-option>
                                                <el-option value="18px">18px</el-option>
                                                <el-option value="20px">20px</el-option>
                                                <el-option value="24px">24px</el-option>
                                                <el-option value="32px">32px</el-option>
                                                <el-option value="48px">48px</el-option>
                                                <el-option value="64px">64px</el-option>
                                                <el-option value="96px">96px</el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                    <div style="display: flex; width: 100%; justify-content: space-between;">
                                        
                                        <div class="flex invite-progress">
                                                <span class="style_label mr10" style=" letter-spacing: 6px;margin-right: 20px;">变量名</span>
                                                <!-- 判断是否已存在 值 v-if="defaultStyle.varName" -->
                                                <el-select  v-model="defaultStyle.varName" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                        <el-option value="userName" label="姓名"></el-option>
                                                        <el-option value="phone" label="手机"></el-option>
                                                        <el-option value="sex" label="性别"></el-option>
                                                        <!-- <el-option value="address" label="地址"></el-option> -->
                                                </el-select>
                                        </div>
                                        <div class="flex invite-progress">
                                            <li class="flex top-floor mr20" @click="setTop(9)">
                                                <img style="margin-top: 3px;" class="mb10 alignment-mode0" src="../../../public/static/images/roofplacement.png"
                                                alt />
                                                <span>置顶</span>
                                            </li>
                                            <li class="flex top-floor" @click="setTop(1)">
                                                <img style="margin-top: 3px;" class="mb10 alignment-mode0" src="../../../public/static/images/bottomsetting.png"
                                                alt />
                                                <span>置底</span>
                                            </li>
                                        </div>

                                    </div>
                                    <div class="flex invite-progress">
                                        <span class="mr15 style_label" style="letter-spacing: 25px;">字距</span>
                                        <div class="ml15" style="flex: 1;">
                                            <el-slider v-model="defaultStyle.lineSpa" :max="50 * 1"></el-slider>
                                        </div>
                                    </div>
                                    <div class="flex invite-progress">
                                        <span class="mr15 style_label" style="letter-spacing: 25px;">行高</span>
                                        <div class="ml15" style="flex: 1;">
                                            <el-slider v-model="defaultStyle.lineHeight"></el-slider>
                                        </div>
                                    </div>
                                    <div class="flex invite-progress">
                                        <span class="mr15 style_label" style="line-height:35px;margin-right: 15px; letter-spacing: 1px;">透 明 度</span>
                                        <div style="display: inline-block;flex: 1; padding-left: 10px">
                                            <el-slider v-model="defaultStyle.opacity"></el-slider>
                                        </div>
                                    </div>



                                    <div class="flex invite-progress">
                                        <ul style="margin-left: 3px;padding:0;" class="option flex">
                                            <li @click="defaultStyle.textAlign='left'" class="font_style">
                                                <img class="" src="../../../public/static/images/activeduiqi.png" style="background: #ee6363;" title="左对齐" v-if="defaultStyle.textAlign=='left'" />
                                                <img class="" src="../../../public/static/images/duiqi.png" title="左对齐" v-else />
                                            </li>

                                            <li @click="defaultStyle.textAlign='center'" class="font_style">
                                                <img class="" src="../../../public/static/images/activejuzhong.png" title="居中" style="background: #ee6363;"
                                                v-if="defaultStyle.textAlign=='center'" />
                                                <img class="" src="../../../public/static/images/juzhongduiqi.png" title="居中" v-else />
                                            </li>

                                            <li @click="defaultStyle.textAlign='right'" class="font_style">
                                                <img class="" src="../../../public/static/images/activeduiqi_1.png" title="右对齐" style="background: #ee6363;"
                                                v-if="defaultStyle.textAlign=='right'" />
                                                <img class="" src="../../../public/static/images/duiqi_1.png" title="右对齐" v-else />
                                            </li>
                                            <li @click="defaultStyle.fontWeight = ! defaultStyle.fontWeight" class="font_style">
                                                <img class="" style="background: #ee6363;" src="../../../public/static/images/activezitiyangshi_jiacu.png"
                                                title="加粗" v-if="defaultStyle.fontWeight" />
                                                <img class="" src="../../../public/static/images/zitiyangshi_jiacu.png" title="加粗" v-else />
                                            </li>

                                            <li @click="defaultStyle.textDecoration= !defaultStyle.textDecoration" class="font_style">
                                                <img class="" src="../../../public/static/images/activezitiyangshi_xiahuaxian.png" style="background: #ee6363;"
                                                v-if="defaultStyle.textDecoration" title="下划线" />
                                                <img class="" src="../../../public/static/images/zitiyangshi_xiahuaxian.png" title="下划线" v-else />
                                            </li>

                                            <li @click="defaultStyle.fontStyle = !defaultStyle.fontStyle" class="font_style">
                                                <img class="" src="../../../public/static/images/activezitiyangshi_xieti.png" style="background: #ee6363;" v-if="defaultStyle.fontStyle"
                                                title="斜体" />
                                                <img class="" src="../../../public/static/images/zitiyangshi_xieti.png" title="斜体" v-else />
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="flex invite-progress" style="align-items: flex-start; margin-bottom: 5px">
                                        <span class="style_label mr10" style="margin-right: 14px">字体颜色</span>
                                        <el-color-picker v-model="defaultStyle.textColor" size="medium"></el-color-picker>
                                        <!-- ffffff,ff5448,f2a653,ffca28,18cfa1,59c7f9,4d8ff3,7171ef,4f5975,000000 -->
                                        <div class="default_color_box">
                                            <div class="default_color" @click="setColor('text','#ffffff')" style="background-color:#ffffff;"></div>
                                            <div class="default_color" @click="setColor('text','#ff5448')" style="background-color:#ff5448;"></div>
                                            <div class="default_color" @click="setColor('text','#f2a653')" style="background-color:#f2a653;"></div>
                                            <div class="default_color" @click="setColor('text','#ffca28')" style="background-color:#ffca28;"></div>
                                            <div class="default_color" @click="setColor('text','#18cfa1')" style="background-color:#18cfa1;"></div>
                                            <div class="default_color" @click="setColor('text','#59c7f9')" style="background-color:#59c7f9;"></div>
                                            <div class="default_color" @click="setColor('text','#4d8ff3')" style="background-color:#4d8ff3;"></div>
                                            <div class="default_color" @click="setColor('text','#7171ef')" style="background-color:#7171ef;"></div>
                                            <div class="default_color" @click="setColor('text','#4f5975')" style="background-color:#4f5975;"></div>
                                            <div class="default_color" @click="setColor('text','#000000')" style="background-color:#000000;"></div>
                                        </div>
                                    </div>
                                    <div class="flex invite-progress" style="align-items: flex-start">
                                        <span class="style_label mr10" style="margin-right: 14px">背景颜色</span>
                                        <el-color-picker v-model="defaultStyle.backColor" size="medium"></el-color-picker>
                                        <div class="default_color_box">
                                            <div class="default_color" @click="setColor('back','#ffffff')" style="background-color:#ffffff;"></div>
                                            <div class="default_color" @click="setColor('back','#ff5448')" style="background-color:#ff5448;"></div>
                                            <div class="default_color" @click="setColor('back','#f2a653')" style="background-color:#f2a653;"></div>
                                            <div class="default_color" @click="setColor('back','#ffca28')" style="background-color:#ffca28;"></div>
                                            <div class="default_color" @click="setColor('back','#18cfa1')" style="background-color:#18cfa1;"></div>
                                            <div class="default_color" @click="setColor('back','#59c7f9')" style="background-color:#59c7f9;"></div>
                                            <div class="default_color" @click="setColor('back','#4d8ff3')" style="background-color:#4d8ff3;"></div>
                                            <div class="default_color" @click="setColor('back','#7171ef')" style="background-color:#7171ef;"></div>
                                            <div class="default_color" @click="setColor('back','#4f5975')" style="background-color:#4f5975;"></div>
                                            <div class="default_color" @click="setColor('back','#000000')" style="background-color:#000000;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="isImage">
                                    <ul class="position">
                                        <li>
                                            <span style="letter-spacing: 5px;">左边距</span>
                                            <el-input size='mini' style="width: 97px" @input="getVal('curEleCoorX', $event)" v-model="defaultStyle.curEleCoor.x"> </el-input>
                                        </li>
                                        <li>
                                            <span style="letter-spacing: 5px;">上边距</span>
                                            <el-input size='mini' style="width: 97px" @input="getVal('curEleCoorY', $event)" v-model="defaultStyle.curEleCoor.y"> </el-input>
                                        </li>
                                        <li>
                                            <span>高度</span>
                                            <el-input size='mini' style="width: 97px;margin-left: -20px;" v-model="defaultStyle.height"> </el-input>
                                        </li>
                                        <li>
                                            <span>宽度</span>
                                            <el-input size='mini' style="width: 97px;margin-left: -20px;" v-model="defaultStyle.width"> </el-input>
                                        </li>
                                    </ul>
                                    <!--   /api/filecenter/file/file :headers="headers"  -->
                                    <el-upload class="upload-demo" drag action="/api/filecenter/file/file" :on-success="uploadImage" ref="elupload"
                                        accept="image/*" :headers="headers"  :show-file-list="false">
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">
                                            将图片拖到此处，或
                                            <em>点击上传</em>
                                        </div>
                                    </el-upload>
                                    <div class="flex invite-progress">
                                        <span class="mr15" style="line-height:35px;margin-right: 14px;letter-spacing: 1px;">透 明 度</span>
                                        <div style="display: inline-block;flex: 1; padding-right: 10px">
                                            <el-slider v-model="defaultStyle.opacity"></el-slider>
                                        </div>
                                    </div>
                                    <div class="flex invite-progress" v-show="false">
                                            <span class="style_label mr10" style=" letter-spacing: 25px;">层级</span>
                                            <!-- <el-select v-model="defaultStyle.hierarchy" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                    <el-option value="9" label="最顶层"></el-option>
                                                    <el-option value="1" label="最底层"></el-option>
                                            </el-select> -->
                                    </div>
                                    <div style="display: flex; width: 100%; justify-content: space-between;">
                                        <div class="flex invite-progress">
                                            <li class="flex top-floor mr20" @click="setTop(9)">
                                                <img style="margin-top: 3px;" class="mb10 alignment-mode0" src="../../../public/static/images/roofplacement.png"
                                                alt />
                                                <span>置顶</span>
                                            </li>
                                            <li class="flex top-floor" @click="setTop(1)">
                                                <img style="margin-top: 3px;" class="mb10 alignment-mode0" src="../../../public/static/images/bottomsetting.png"
                                                alt />
                                                <span>置底</span>
                                            </li>
                                        </div>
                                        <div class="flex invite-progress">
                                                <span class="style_label mr10" style=" letter-spacing: 6px;margin-right: 20px;">变量名</span>
                                                <!-- 判断是否已存在 值 v-if="defaultStyle.varName" -->
                                                <el-select  v-model="defaultStyle.varName" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                        <el-option value="photoFileId" label="头像"></el-option>
                                                        <!-- <el-option value="name" label="姓名"></el-option>
                                                        <el-option value="phone" label="手机"></el-option>
                                                        <el-option value="address" label="地址"></el-option> -->
                                                </el-select>
                                                <!-- <el-select v-else v-model="varName" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                        <el-option value="fans" label="头像"></el-option>
                                                        <el-option value="name" label="姓名"></el-option>
                                                        <el-option value="phone" label="手机"></el-option>
                                                        <el-option value="address" label="地址"></el-option>
                                                </el-select> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  v-if="funTag[1].select">
                            <div class="layui-colla-content">
                                <div class="flex invite-progress" style="align-items: flex-start">
                                    <span class="style_label mr10" style=" letter-spacing: 25px;">颜色</span>
                                    <div style="margin-left: -10px; flex: 1;display: flex; align-items: flex-start;">
                                        <el-color-picker v-model="defaultStyle.borderColor" size="medium"></el-color-picker>
                                        <div class="default_color_box">
                                            <div class="default_color" @click="setColor('border','#ffffff')" style="background-color:#ffffff;"></div>
                                            <div class="default_color" @click="setColor('border','#ff5448')" style="background-color:#ff5448;"></div>
                                            <div class="default_color" @click="setColor('border','#f2a653')" style="background-color:#f2a653;"></div>
                                            <div class="default_color" @click="setColor('border','#ffca28')" style="background-color:#ffca28;"></div>
                                            <div class="default_color" @click="setColor('border','#18cfa1')" style="background-color:#18cfa1;"></div>
                                            <div class="default_color" @click="setColor('border','#59c7f9')" style="background-color:#59c7f9;"></div>
                                            <div class="default_color" @click="setColor('border','#4d8ff3')" style="background-color:#4d8ff3;"></div>
                                            <div class="default_color" @click="setColor('border','#7171ef')" style="background-color:#7171ef;"></div>
                                            <div class="default_color" @click="setColor('border','#4f5975')" style="background-color:#4f5975;"></div>
                                            <div class="default_color" @click="setColor('border','#000000')" style="background-color:#000000;"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex invite-progress">
                                    <span class="style_label mr10" style="letter-spacing: 25px;">样式</span>
                                    <el-select v-model="defaultStyle.borderStyle" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                        <el-option value="none" label="无"></el-option>
                                        <el-option value="solid" label="直线"></el-option>
                                        <el-option value="dashed" label="虚线"></el-option>
                                        <el-option value="dotted" label="点状线"></el-option>
                                        <el-option value="double" label="双划线"></el-option>
                                    </el-select>
                                </div>
                                <div class="flex invite-progress">
                                    <span class="mr15 style_label" style=" letter-spacing: 25px;">尺寸</span>
                                    <div style="flex: 1;">
                                        <el-slider v-model="defaultStyle.borderWidth" :max="20*1"></el-slider>
                                    </div>
                                </div>
                                <div class="flex invite-progress">
                                    <span class="mr15 style_label" style=" letter-spacing: 25px;">弧度</span>
                                    <div style="flex: 1;">
                                        <el-slider size='mini' v-model="defaultStyle.borderRadius"></el-slider>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div  v-if="funTag[2].select">
                            <div class="layui-colla-content">
                                <div class="flex invite-progress">
                                    <span class="mr15 style_label" style=" letter-spacing: 25px;">大小</span>
                                    <div style="flex: 1">
                                        <el-slider v-model="defaultStyle.shadowWidth"></el-slider>
                                    </div>
                                </div>
                                <div class="flex invite-progress">
                                    <span class="style_label mr10" style=" letter-spacing: 25px;">颜色</span>
                                    <el-color-picker v-model="defaultStyle.shadowColor" size="medium"></el-color-picker>
                                    <div class="default_color_box">
                                        <div class="default_color" @click="setColor('shadow','#ffffff')" style="background-color:#ffffff;"></div>
                                        <div class="default_color" @click="setColor('shadow','#ff5448')" style="background-color:#ff5448;"></div>
                                        <div class="default_color" @click="setColor('shadow','#f2a653')" style="background-color:#f2a653;"></div>
                                        <div class="default_color" @click="setColor('shadow','#ffca28')" style="background-color:#ffca28;"></div>
                                        <div class="default_color" @click="setColor('shadow','#18cfa1')" style="background-color:#18cfa1;"></div>
                                        <div class="default_color" @click="setColor('shadow','#59c7f9')" style="background-color:#59c7f9;"></div>
                                        <div class="default_color" @click="setColor('shadow','#4d8ff3')" style="background-color:#4d8ff3;"></div>
                                        <div class="default_color" @click="setColor('shadow','#7171ef')" style="background-color:#7171ef;"></div>
                                        <div class="default_color" @click="setColor('shadow','#4f5975')" style="background-color:#4f5975;"></div>
                                        <div class="default_color" @click="setColor('shadow','#000000')" style="background-color:#000000;"></div>
                                    </div>
                                </div>
                                <div class="flex invite-progress">
                                    <span class="mr15 style_label" style=" letter-spacing: 25px;">模糊</span>
                                    <div style="flex: 1">
                                        <el-slider v-model="defaultStyle.shadowDim"></el-slider>
                                    </div>
                                </div>
                                <div class="flex invite-progress">
                                    <span class="mr15 style_label">水平方向</span>
                                    <div style="flex: 1; margin-left: 25px">
                                        <el-slider v-model="defaultStyle.shadowDirectionV" :min="-50/1.0" :max="50/1.0"></el-slider>
                                    </div>
                                </div>
                                <div class="flex invite-progress">
                                    <span class="mr15 style_label">垂直方向</span>
                                    <div style="flex: 1; margin-left: 25px">
                                        <el-slider v-model="defaultStyle.shadowDirectionH" :min="-50/1.0" :max="50/1.0"></el-slider>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </el-collapse>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="primary" @click="imgShow = false">确 定</el-button>
                    <el-button size="mini" @click="imgShow = false">取 消</el-button>
                </span>
            </el-dialog>
            <!-- 图片双击后 修改弹框 end -->
    
            <!-- 模板功能 - start -->
            <!-- <div class="musk" v-show="modelShow"> -->
            <el-dialog
                title="底板定义"
                :visible.sync="modelShow"
                width="30%"
                center
                :close-on-click-modal='false'
                >

                <!-- 设置模板样式 -->
                <div class="model-box">
                    <ul class="model-ul">
                        
                        <li class="model-single">
                            <span>宽度:</span>
                            <div class="value">
                                <el-input style="width: 80px" size="mini" v-model="model.width"></el-input>
                            </div>
                            <span>毫米(mm)</span>
                        </li>
                        <li class="model-single">
                            <span>高度:</span>
                            <div class="value">
                                <el-input style="width: 80px" size="mini" v-model="model.height"></el-input>
                            </div>
                            <span>毫米(mm)</span>
                        </li>
                        <li class="model-single">
                            <span>出血位:</span>
                            <div class="value">
                                <el-input style="width: 80px" size="mini" @input="setBleedingSite" v-model="model.bleedingSite"></el-input>
                            </div>
                        </li>
                        
                        <li class="model-single">
                            <span>缩放比例:</span>
                            <el-select v-model="model.bl" class="option" size="mini" style="margin-left: -5px;width:97px;">
                                    <el-option value="50%" label="50%"></el-option>
                                    <el-option value="100%" label="100%"></el-option>
                                    <el-option value="150%" label="150%"></el-option>
                                    <el-option value="150%" label="200%"></el-option>
                            </el-select>
                        </li>
                        <li class="model-single">
                            <span>模板名称:</span>
                            <div class="value">
                                <el-input size="mini" v-model="fileNameVal"></el-input>
                            </div>
                        </li>
                        <li class="model-single" style="align-items: flex-start">
                            <span>背景颜色:</span>
                            <div class="value">
                                <el-color-picker style="margin-top: 0" v-model="model.bgcolor" size="mini" @change='colorSelect'></el-color-picker>
                                <div class="default_color_box">
                                    <div class="default_color" @click="setColor('model','#ffffff')" style="background-color:#ffffff;"></div>
                                    <div class="default_color" @click="setColor('model','#ff5448')" style="background-color:#ff5448;"></div>
                                    <div class="default_color" @click="setColor('model','#f2a653')" style="background-color:#f2a653;"></div>
                                    <div class="default_color" @click="setColor('model','#ffca28')" style="background-color:#ffca28;"></div>
                                    <div class="default_color" @click="setColor('model','#18cfa1')" style="background-color:#18cfa1;"></div>
                                    <div class="default_color" @click="setColor('model','#59c7f9')" style="background-color:#59c7f9;"></div>
                                    <div class="default_color" @click="setColor('model','#4d8ff3')" style="background-color:#4d8ff3;"></div>
                                    <div class="default_color" @click="setColor('model','#7171ef')" style="background-color:#7171ef;"></div>
                                    <div class="default_color" @click="setColor('model','#4f5975')" style="background-color:#4f5975;"></div>
                                    <div class="default_color" @click="setColor('model','#000000')" style="background-color:#000000;"></div>
                                </div>
                            </div>
                        </li>
                        <li class="model-single" style="align-items: flex-start; flex-wrap: wrap;">
                            <span>背景图片:</span>
                            <div class="value" style="width: 100%">
                                <el-upload class="upload-demo" style="width: 100%" drag action="/api/filecenter/file/file" :on-success="uploadImageModel" ref="elupload"
                                    accept="image/*" :on-change="imgFileModel" :headers='headers' :on-preview='preview' :show-file-list="false">
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">
                                        将图片拖到此处，或
                                        <em>点击上传</em>
                                    </div>
                                </el-upload>
                            </div>
                        </li>
                    </ul>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="primary" @click="modelShow = false">确 定</el-button>
                    <el-button size="mini" @click="modelShow = false">取 消</el-button>
                </span>
            </el-dialog>
            <!-- </div> -->
            <!-- 模板功能 - end -->

            <!-- 选择模板 - start -->
            <el-dialog
                title="选择模板"
                :visible.sync="modelBox"
                width="1510px"
                center
                :close-on-click-modal='false'
                >
                <div class="modelBox-nav">
                    <el-button size='mini' @click="delModel">删除模板</el-button>
                    <el-button size='mini' v-if="haveHave" @click="editModel">编辑模板</el-button>
                </div>

                <div class="t-m-box">
                    <!-- <el-checkbox-group > -->
                        <div :class="['t-m-single', item.select && ' t-m-select']" 
                            v-for="(item, idx) in model__" :key="idx" 
                            :style="`transform: scale(${item.scalex}, ${item.scaley}); 
                            left: ${item.left}px;
                            top: ${(item.top)}px;
                            `"
                            >
                            <div @click="switchTm(idx)" @dblclick="makeSmooth(idx)" style="width: 100%; height: 100%" v-html="item.content"></div>

                            <el-checkbox class="check-box" @change="chioce(item)" v-model="item.check"></el-checkbox>
                            <div class="model-name"> {{ item.personTemplateUserName || item.publicAttr.name }} </div>
                        </div>
                    <!-- </el-checkbox-group> -->
                    <!-- <div class="btn-width">
                        <el-button @click="delModel" v-if="haveHave">删除</el-button>
                        <el-button v-if="haveHave" @click="editModel">编辑</el-button>
                        <el-button @click="modelBox = false">关闭</el-button>
                    </div> -->

                </div>
                <div class="page" style="height: auto; padding-top: 20px;">
                    <el-pagination
                        background
                        size='mini'
                        @size-change="modelSizeChange"
                        @current-change="modelCurrentChange"
                        :current-page="mData.currentPage"
                        :page-sizes="[30, 60, 90]"
                        :page-size="mData.pageSize"
                        layout="total, prev, pager, next"
                        :total="mData.total">
                    </el-pagination>
                </div> 
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button size='mini' @click="modelBox = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="modelBox = false">确 定</el-button>
                </span> -->
            </el-dialog>
            <!-- 选择模板 - end -->

            <!-- 提示信息 - 保存文件设置名字 -->

                <!-- 数据填充 - 提示 -->
                <el-dialog
                    :close-on-click-modal='false'
                    title="提示"
                    :visible.sync="fileName"
                    width="30%"
                    center>
                    <el-input v-model="fileNameVal" placeholder="请输入保存后的名字"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="preProsons">确 定</el-button>
                        <el-button @click="fileName = false">取 消</el-button>
                    </span>
                </el-dialog>

                <!-- 模板制作 - 提示 -->
                <el-dialog
                    :close-on-click-modal='false'
                    title="提示"
                    :visible.sync="modelName"
                    width="30%"
                    center>
                    <el-input v-model="fileNameVal" placeholder="请输入保存后的名字"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="preservation">确 定</el-button>
                        <el-button @click="modelName = false">取 消</el-button>
                    </span>
                </el-dialog>

            <!-- 相关人员 - 表格 -->
            <el-dialog
                title="相关人员"
                :close-on-click-modal='false'
                :visible.sync="relevantShow"
                width=""
                center
                class="chioceM"
                >
                <div class="modelBox-nav">
                    <el-button size='mini' @click="delModelPerson">删除人员</el-button>
                    <!-- <el-button size='mini' v-if="haveHave" @click="editModel">编辑模板</el-button> -->
                </div>

                <div class="table">
                    <el-table
                        ref="multipleTable"
                        :data="relevantUser"
                        tooltip-effect="dark"
                        style="width: 100%"
                        border
                        @selection-change="relevantChange">

                        <el-table-column border type="selection" :width="30"> </el-table-column>
                        <el-table-column border v-for="(item, idx) in tableCate" :key="idx" :width="'30'" :prop="item.scription" :label="item.name" > </el-table-column>

                    </el-table>
                </div>
                <!-- <div class="page" style="height: auto; padding-top: 20px;">
                    <el-pagination
                        background
                        size='mini'
                        @size-change="modelSizeChange"
                        @current-change="modelCurrentChange"
                        :current-page="mData.currentPage"
                        :page-sizes="[30, 60, 90]"
                        :page-size="mData.pageSize"
                        layout="total, prev, pager, next"
                        :total="mData.total">
                    </el-pagination>
                </div>  -->
                <span slot="footer" class="dialog-footer">
                    <el-button size='mini' @click="relevantShow = false">关 闭</el-button>
                    <!-- <el-button size="mini" type="primary" @click="relevantShow = false">确 定</el-button> -->
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import CardMagt from './index.js'

export default CardMagt;
</script>

<style>
@import "../../plugins/inviteTemplate.css";
@import "../../plugins/text.css";

.vue-ruler-wrapper {
    z-index: 10 !important;
    width: 100% !important;
}

.vue-ruler-h {
    left: 25px !important;
}

.vue-ruler-v {
    top: 25px !important;
}

.vue-ruler-content {
    padding: 25px 0px 0px 25px !important;
}

.el-collapse {
    border: none;
    width: 100%;
}

.el-collapse-item__header {
    height: 35px;
    line-height: 35px;
    background-color: #ddd;
    padding-left: 15px;
    margin-bottom: 10px;
}

.el-slider__button{
	width: 10px;
	height: 10px;
}

.el-collapse-item__content {
	padding-bottom: 5px;
}

.vue-ruler-wrapper {
    width: 100%;
    height: 100% !important;
}

.mask-direction {
    position: absolute;
    /* border: 1px solid red; */
    width: 800px;
    height: 800px;
}

.mask-leftTop {
    right: calc(100%);
    bottom: calc(100%);
}

.mask-leftTop .mask-left {
    position: absolute;
    bottom: -1px;
    right: 10px;
    width: 10px;
    height: 1px;
    background-color: red;
}

.mask-leftTop .mask-top {
    position: absolute;
    bottom: 10px;
    right: -1px;
    width: 1px;
    height: 10px;
    background-color: red;
}

.mask-leftBottom {
    right: calc(100%);
    top: calc(100%);
}

.mask-leftBottom .mask-left {
    position: absolute;
    top: -1px;
    right: 10px;
    width: 10px;
    height: 1px;
    background-color: red;
}

.mask-leftBottom .mask-bottom {
    position: absolute;
    top: 10px;
    right: -1px;
    width: 1px;
    height: 10px;
    background-color: red;
}

.mask-rightTop {
    left: calc(100%);
    bottom: calc(100%);
}

.mask-rightTop .mask-right {
    position: absolute;
    bottom: -1px;
    left: 10px;
    width: 10px;
    height: 1px;
    background-color: red;
}

.mask-rightTop .mask-top {
    position: absolute;
    bottom: 10px;
    left: -1px;
    width: 1px;
    height: 10px;
    background-color: red;
}

.mask-rightBottom {
    left: calc(100%);
    top: calc(100%);
}

.mask-rightBottom .mask-right {
    position: absolute;
    top: -1px;
    left: 10px;
    width: 10px;
    height: 1px;
    background-color: red;
}

.mask-rightBottom .mask-bottom {
    position: absolute;
    top: 10px;
    left: -1px;
    width: 1px;
    height: 10px;
    background-color: red;
}

.el-select .el-input {
    width: 100% !important;
}

.el-button {
    background-color: #054592;
    border-color: #ccc;
    color: #fff;
}

.el-upload--text, .el-upload-dragger {
    width: 100%;
}


/* 调色框 */
.el-color-dropdown {
    left: 810px !important;
}

/* 复选框 */
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #054592 !important;
    /* color: #054592 !important; */
    border-color: #054592 !important;
}



.chioceM > div {
    width: 1180px !important;
}

</style>

<style lang="less" scoped>

.add-ele {
    padding: 10px 0;
    margin: 5px 0;

    div {
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        padding: 5px 20px;
        color: #606266;
    }

    div:hover {
        background-color: #ecf5ff;
        color: #66b1ff;
    }
}
@import './index.less';
</style>