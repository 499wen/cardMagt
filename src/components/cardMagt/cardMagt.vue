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
                 <i class="el-icon-s-tools" @click="modelShow = true"></i>
             </div>

             <div class="model-make-container">
                <!-- 左侧部分 -->
                <div class="model-make-left">
                     
                    <!-- 图片 -->
                    <ul class="pl20 verson" draggable="true" @dragstart="imgDrag($event)" @dragover="imgDragover($event)" style=" z-index: 11">
                        <img class="invittext" src="../../../public/static/images/invitimages.png" title="拖拽到手机进行编辑" />
                    </ul>
    
                    <!-- 文本 -->
                    <ul class="verson text-area" draggable="true" @dragstart="textDrag($event)" @dragover="textDragover($event)" style="padding-left:0px;">
                        <img class="invittext" src="../../../public/static/images/invittext.png" title="拖拽到手机进行编辑" />
                    </ul>
                     <!-- <i class="el-icon-picture" style="opacity: 0"></i>
                     <i class="el-icon-picture"></i>
                     <i class="el-icon-picture"></i> -->

                </div>

                <!-- 中间部分 -->
                <div class="model-make-center">

                    <vue-ruler-tool
                        :content-layout="{left: 0,top: 0}"
                        :is-scale-revise="true" 
                        :preset-line="presetLine"
                    >   
                        <div class="box" 
                            :style="{'width': model.width + 'px', 'height': model.height + 'px', 'padding': model.bleedingSite + 'px', 'background-color': model.bgcolor, 'boxSizing': 'border-box'}"
                        >
                            <div 
                                class="mask phone-item" 
                                @drop="dropTest($event)" @dragover="allowDrop($event)"
                                
                            >
                            
                                <!-- 四个方向的出血点 -->
                                <div class="mask-leftTop mask-direction"></div>
                                <div class="mask-leftBottom mask-direction"></div>
                                <div class="mask-rightTop mask-direction"></div>
                                <div class="mask-rightBottom mask-direction"></div>
                            </div>
                        </div>
                    </vue-ruler-tool>
                </div>

                <!-- 右侧部分 -->
                <div class="model-make-right">
                    <div class="ele-list">元素列表</div>
                    <div class="ele-single">
                        <el-button v-for="(item, idx) in eleList" size="mini" @click="selectDom(item)" :key="idx">{{ item.name }}</el-button>
                    </div>
                </div>
             </div>
        </div>

        <!-- 数据填充 -->
        <div v-show="headerTag[1].select" class="model-make" style="display: flex">
            <div class="model-make-center" style="width: 500px">
                <vue-ruler-tool
                    :content-layout="{left: 0,top: 0}"
                    :is-scale-revise="true"
                    :is-hot-key="true"
                    :preset-line="presetLine"
                    class="ruler"
                > 
                    <div v-html="tc"></div>
                </vue-ruler-tool>
            </div>

            <!-- 表格 -->
            <div class="table" >
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange"
                >

                    <el-table-column align="center" type="selection" width="55"></el-table-column>

                    <el-table-column align="center" label="日期" width="">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>

                    <el-table-column align="center" prop="name" label="姓名" width=""> </el-table-column>
                    <el-table-column align="center" prop="address" label="地址" show-overflow-tooltip></el-table-column>
                </el-table>

            </div>
        </div>


        <!-- 这里是图片的模板 start?-->
        <div v-show="false" id="imageTemplate" class="imageTemplate public" :style="{'height': '105px', 'width': '105px'}">
            <div class="invite-text-box">
                <div class="invite-text-box-text" >
                    <div class="tip">双击选择图片</div>
                </div>
                <div class="invite-text-box-border">
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
            <div v-show="false" id="textTemplate" class="textTemplate public" style="height:40px;width:60%">
                <div class="invite-text-box">
                    <div class="invite-text-box-text edit-text" contenteditable="true">点击这里编辑</div>
                    <div class="invite-text-box-border">
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
        </div>
        <!-- 这里是文字的模板 end?-->
 
        <!-- 图片双击后 修改弹框 start -->
        <!-- <div class="musk"> -->
        <div class="mask-box" v-show="imgShow">
            <!-- 关闭 -->
            <div class="close">
                <i class="el-icon-close" @click="imgShow = false" style="cursor: pointer"></i>
            </div>
            <div style="width: 100%; height: 20px;"></div>

            <!-- 图片、文本 修改的功能 -->
            <div id="templateStyle" v-if="true">
                <el-collapse v-model="activeName">
                    <el-collapse-item title="位置大小" name="1">
                        <!-- 文本 -->
                        <ul class="position" v-if="!isImage">
                            <li>
                                <span>左边距</span>
                                <el-input size='mini' v-model="text.paddingL"> </el-input>
                            </li>
                            <li>
                                <span>上边距</span>
                                <el-input size='mini' v-model="text.paddingT"> </el-input>
                            </li>
                            <li>
                                <span>高度</span>
                                <el-input size='mini' v-model="text.height"> </el-input>
                            </li>
                            <li>
                                <span>宽度</span>
                                <el-input size='mini' v-model="text.width"> </el-input>
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
                                <el-input size='mini' v-model="img.height"> </el-input>
                            </li>
                            <li>
                                <span>宽度</span>
                                <el-input size='mini' v-model="img.width"> </el-input>
                            </li>
                        </ul>
                    </el-collapse-item>
                    <el-collapse-item title="基本设置" name="2">
                        <div class="layui-colla-content layui-show">
                            <div v-if="!isImage">
                                <div class="mb10 clear_float" style="text-align: left">
                                    <div style="float:left;">
                                        <span>字体</span>
                                        <el-select class="font_select mr10" size="mini" v-model="defaultStyle.fontFamily" style="margin-left: 10px;width:110px;height:35px;margin-right:25px;">
                                            <el-option value="黑体" selected="selected">黑体</el-option>
                                            <el-option value="宋体">宋体</el-option>
                                            <el-option value="微软雅黑">微软雅黑</el-option>
                                        </el-select>
                                        <span>字号</span>
                                        <el-select v-model="defaultStyle.fontSize" size="mini" class="font_select mr10" style="margin-left: 10px;width:95px;height:35px;">
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
                                    <div style="display: inline-block;flex: 1; padding-right: 10px">
                                        <el-slider v-model="defaultStyle.opacity"></el-slider>
                                    </div>
                                </div>
                                <div class="flex invite-progress">
                                        <span class="style_label mr10" style=" letter-spacing: 25px;">层级</span>
                                        <el-select v-model="defaultStyle.hierarchy" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                <el-option value="9" label="最顶层"></el-option>
                                                <el-option value="1" label="最底层"></el-option>
                                        </el-select>
                                </div>
                                <div class="flex invite-progress">
                                        <span class="style_label mr10" style=" letter-spacing: 6px; margin-right: 20px;">变量名</span>

                                        <!-- 判断是否已存在 值 -->
                                        <el-select v-if="defaultStyle.varName" v-model="defaultStyle.varName" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                <el-option value="fans" label="头像"></el-option>
                                                <el-option value="name" label="姓名"></el-option>
                                                <el-option value="phone" label="手机"></el-option>
                                                <el-option value="address" label="地址"></el-option>
                                        </el-select>
                                        <el-select v-else v-model="varName" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                <el-option value="fans" label="头像"></el-option>
                                                <el-option value="name" label="姓名"></el-option>
                                                <el-option value="phone" label="手机"></el-option>
                                                <el-option value="address" label="地址"></el-option>
                                        </el-select>
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
                                        <!-- <div class="flex invite-progress">
                                            <li class="flex top-floor mr20" @click="changeZindex(2)">
                                                <img class="alignment-mode0" src="../../../public/static/images/roofplacement.png"
                                                alt />
                                                <span>置顶</span>
                                            </li>
                                            <li class="flex top-floor" @click="changeZindex(0)">
                                                <img class="alignment-mode0" src="../../../public/static/images/bottomsetting.png"
                                                alt />
                                                <span>置底</span>
                                            </li>
                                        </div> -->
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
                                <!--   /api/filecenter/file/file :headers="headers"  -->
                                <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :on-success="uploadImage" ref="elupload"
                                    accept="image/*" :on-change="imgFile" :show-file-list="false">
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
                                <div class="flex invite-progress">
                                        <span class="style_label mr10" style=" letter-spacing: 25px;">层级</span>
                                        <el-select v-model="defaultStyle.hierarchy" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                <el-option value="9" label="最顶层"></el-option>
                                                <el-option value="1" label="最底层"></el-option>
                                        </el-select>
                                </div>
                                <div class="flex invite-progress">
                                        <span class="style_label mr10" style=" letter-spacing: 6px;margin-right: 20px;">变量名</span>
                                        <!-- 判断是否已存在 值 -->
                                        <el-select v-if="defaultStyle.varName" v-model="defaultStyle.varName" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                <el-option value="fans" label="头像"></el-option>
                                                <el-option value="name" label="姓名"></el-option>
                                                <el-option value="phone" label="手机"></el-option>
                                                <el-option value="address" label="地址"></el-option>
                                        </el-select>
                                        <el-select v-else v-model="varName" class="option" size="mini" style="margin-left: -10px;width:97px;">
                                                <el-option value="fans" label="头像"></el-option>
                                                <el-option value="name" label="姓名"></el-option>
                                                <el-option value="phone" label="手机"></el-option>
                                                <el-option value="address" label="地址"></el-option>
                                        </el-select>
                                </div>
                                <!-- <div class="flex invite-progress" style="float:left;margin-bottom:10px">
                                    <li class="flex top-floor mr20" @click="changeZindex(2)">
                                        <img style="margin-top: 3px;" class="mb10 alignment-mode0" src="../../../public/static/images/roofplacement.png"
                                        alt />
                                        <span>置顶</span>
                                    </li>
                                    <li class="flex top-floor" @click="changeZindex(0)">
                                        <img style="margin-top: 3px;" class="mb10 alignment-mode0" src="../../../public/static/images/bottomsetting.png"
                                        alt />
                                        <span>置底</span>
                                    </li>
                                </div> -->
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="边框样式" name="3">
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
                    </el-collapse-item>
                    <el-collapse-item title="阴影样式" name="4">
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
                    </el-collapse-item>

                </el-collapse>
            </div>
        </div>
        <!-- </div> -->
        <!-- 图片双击后 修改弹框 end -->

        <!-- 模板功能 - start -->
        <!-- <div class="musk" v-show="modelShow"> -->
        <div class="mask-box" v-show="modelShow">
            <!-- 关闭 -->
            <div class="close">
                <i class="el-icon-close" @click="modelShow = false" style="cursor: pointer"></i>
            </div>
            <div style="width: 100%; height: 20px;"></div>
                            
            <!-- 设置模板样式 -->
            <div class="model-box">
                <ul class="model-ul">
                    <li class="model-single">
                        <span>宽度:</span>
                        <div class="value">
                            <el-input style="width: 80px" size="mini" v-model="model.width"></el-input>
                        </div>
                    </li>
                    <li class="model-single">
                        <span>高度:</span>
                        <div class="value">
                            <el-input style="width: 80px" size="mini" v-model="model.height"></el-input>
                        </div>
                    </li>
                    <li class="model-single">
                        <span>出血位:</span>
                        <div class="value">
                            <el-input style="width: 80px" size="mini" v-model="model.bleedingSite"></el-input>
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
                        <div class="value">
                            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :on-success="uploadImageModel" ref="elupload"
                                accept="image/*" :on-change="imgFileModel" :on-preview='preview' :show-file-list="false">
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
        </div>
        <!-- </div> -->
        <!-- 模板功能 - end -->

    </div>
</template>

<script>
import CardMagt from '../../assets/js/index.js'

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
</style>

<style lang="less" scoped>

@import './index.less';
</style>