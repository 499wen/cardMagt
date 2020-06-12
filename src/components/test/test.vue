<template>
  <div class="right-body">
    <div class="list" :style="{'width': tableTeles.width }">
      <el-row v-if="true" class="oneHan"> 
        <el-col :span="6" class="wrapper">
          <!-- 选项 - 列表操作 -->
          <div class="operation">
            <el-row style="margin: 10px 0; display: flex; align-items: center; flex-wrap: wrap;">

            </el-row>

            <!-- 人员类型切换 --> 


            <!-- 关键字搜索 -->
            <div style="margin: 10px 0;  display: flex; justify-content: flex-end">
              <el-input placeholder="输入姓名、手机号进行搜索" v-model="searchKey" size='small'>
                <el-button slot="append" size='small' @click='url'>搜索</el-button> 
              </el-input>

              <!-- 人员查询 - 条件组 -->
              <el-dropdown style="margin-left: 10px" placement="bottom">
                <el-button type="primary" size='small'>
                  条件组查询
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="idx" v-for="(item, idx) in preGroup" :key="idx"> {{ item.queryBuilderName }} </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

               <div class="custom">
                <el-popover placement="bottom" trigger="click">
                  <el-button slot="reference" size='small'>自定义条件</el-button>
                  <!-- <div solt="content">
                    <SearchUser @setsearchcondition="setsearchcondition"></SearchUser>
                  </div> -->
                </el-popover>
              </div>
            </div>

          
          </div>

          <div class="table-box">
            <el-row class="oneHan">
              <el-table
                ref="multipleTable"
                :data="[]"
                border
                tooltip-effect="dark" 
                class="table"
              
                
              >
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column
                  align="center"
                  :prop="item.scription"
                  v-for="(item, index) in tableCate2"
                  :key="index"
                  :label="item.name"
                  :width='item.width'
                  height='10'
                >
                <template slot-scope="scope">
                  <div v-if="item.scription == 'photoFileId'" class="image" :style="!scope.row.photoFileId && 'border-radius: 0; line-height: 50px'">
                    <img v-if='scope.row.photoFileId' style="width: 50px; height: 70px; top: -2.5px;" :src="`/api/filecenter/file/file/${scope.row['photoFileId']}`" fit="cover" />
                    <span v-else> 无相片 </span>
                    <!-- <img v-else id="my-head-portrait" src="@/assets/hztLogo.png" /> -->
                  </div> 
                  <span v-else> {{ scope.row[item.scription] }}</span>
                </template>
                </el-table-column>
              </el-table>
            </el-row>
          </div>

          <!-- 总人数 - 信息 -->
          <div class="number">共{{ tableData.length }}人</div>
        </el-col>
      </el-row>
    </div>

    <!-- 信息文档 -->
    <div class="info-document">
      <div class="infoArch" >
        <iframe width='100%' :src="uuu"></iframe>
      </div>

    </div>
    
  </div>
</template>

<script>

// 引入打印 文件
// import printJS from '@/plugins/print.js'
import time from '@/plugins/time.js';
import getAge from  '@/plugins/getAge.js'

let loading = null

export default {
  name: "App",
  components: {
    // SearchUser
  }, //components
  data() {
    return {
      /**
       * 表格拉伸相关数据
       * status: 拉伸状态 (true: 拉，false: 收)
       * width: 表格宽度 (100%, 600px 30%)
       */
      tableTeles: {
        status: true,
        width: "30%"
      },
      // 收起后显示
      tableCate2: [
        { name: "姓名", width: "100", scription: "userName" },
        // { name: "性别", width: "60", scription: "sex" },
        { name: "手机", width: "150", scription: "phone" },
        // { name: "部门", width: "150", scription: "'departmentObj.name'" },
        // { name: "邮件", width: "200", scription: "email" },
      ],

      radio: '1',
      showMask: false,
      pageNum: 1,
      pageSize: 30, // 999
      total: 0,
      searchKey: "",
      tableData: [],
      multipleSelection: [],
      searchCondition: [],
      centerDialogVisible: false,
      showAddUserDialog: false,
      externalCode: "0",
      showImportDialog: false,
      customConditions: false,
      flag: "0",
      external: false,
      type:'internal',
      internal:true,
 
      // 图片管理
      showUploadImageDialog: false, //上传相片
      compressDialog: false, //压缩包
      matchingDialog: false, //照片匹配
      exportPhotosDialog: false, //下载相片

      totalData: [], // 保存全部数据

      preGroup: [], // 条件组

      centerDialogVisible__: false,

      userList: [],
      selectArr: [],

      uuu: 'http://view.wps.cn/preview/v1/view/preview?fileid=7b926d48a9c74b80b99ce7056524ebf7cd8211d5.doc&signature=TWsv%2FwlVgtnY3KF5iAj26Y8fzMM%3D&appid=876cdbe637324b987dfh777697cb0696a&fileSource=localfile'
    };
  }, //data
  methods: {
    url(){
      this.uuu = this.searchKey
    },
  },
  mounted() {

  }, //mounted
};
</script>

<style lang="less" scoped>
// @import "../personnelIfo/PerTable.less";

.type-item{
  display: flex;
  margin-left: 10px;
  .type-value{
    margin-right: 10px;
    .swich-text{
      margin-left: 10px;
    }
  }
}

.image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: auto;
  }
}

    .box-card {
        width: 210mm;
        height: 258mm;
        padding: 0 10px;
        padding-top: 50px;
        margin: auto;
        box-shadow: 1px 1px 5px 1px #eee;
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 40px;
        box-shadow: 1px 1px 5px 3px #ccc;
        flex-direction: column;

    .container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .main-- {
      width: 100%;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;
    }

    .opac {
      opacity: 0
    }
    .c-left {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }

    .c-right {
        width: 130px;
        height: 170px;
        margin-left: 10px;

        img {
          width: 100%;
          height: 100%;
        }
    }

    .single {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .single-- {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .span {
        width: 90px;
        // text-align: right;
        padding: 0 5px;
        box-sizing: border-box;
        // display: flex;
        // justify-content: space-between;
        letter-spacing: 2px;
    }

    .input {
        flex: 1; 
        // margin-left: 5px;
    }


  }

.mm-mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
  display: flex;
  box-sizing: border-box;
  padding: 20px 0;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 88;

  .mask-box {
    width: 60%;
    height: calc(100% - 80px);
    overflow: hidden;
    // overflow-y: auto;
    background-color: #fff;
    padding: 10px;
    box-shadow: 1px 1px 5px 1px #eee;
    text-align: right;
    box-sizing: border-box;
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column;

    .mask-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333;
      font-size: 20px;
      font-weight: 700;

      i {
        cursor: pointer;
      }
    }

    .printing {
      width: 100%;
      // height: 100%;
      flex: 1;
      overflow-y: auto;
      margin-top: 10px;
    }
  }
}
</style>

<style>
.el-table__body-wrapper {
  flex: 1 !important;
  overflow-y: auto;
  overflow-x: auto;
}

.el-switch.is-checked .el-switch__core {
  border-color: #3280fc !important;
  background-color: #3280fc !important;
}

.el-table td.is-center, .el-table th.is-center {
  padding: 7px 0;
}

.el-table .cell {
  display: flex !important;
  justify-content: center;
}
</style>