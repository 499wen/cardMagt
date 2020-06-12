<template>
  <div class="nav-right">
    <el-header height="80px">
      <el-row>
        <el-col :span="10">
          <span align='left' id="companyName" :title="company.name">{{company.name}}</span>
        </el-col>

        <el-col :span="14">
          <div class="header-r">
            <div class="my-head-portrait-and-user-name-parent">
              <img
                v-if="loginInfo.photoFileId"
                id="my-head-portrait"
                :src="`/api/filecenter/file/file/${loginInfo.photoFileId}`"
              />
              <img v-else id="my-head-portrait" src="../assets/hztLogo.png" />
              <span id="user-name">{{loginInfo.userName}}</span>
            </div>
            <div class="main-date">
              <div>{{nowDate}}</div>
              <div>{{nowWeek}}</div>
            </div>
            <div class="main-setting-icon">
              <el-menu
                active-background-color="#b3d4fc"
                active-text-color="#fff"
                background-color="#054592"
                class="main-setting-menu"
                mode="horizontal"
                text-color="#fff"
              >
                <el-submenu class="main-setting-submenu" index="1">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                  </template>
                  <el-menu-item @click="passworBtn" index="2-1" v-if="false">
                    <div id="logout">
                      <i class="el-icon-unlock"></i> 修改密码
                    </div>
                  </el-menu-item>
                  <el-menu-item @click="logout" index="2-2">
                    <div id="logout">
                      <i class="el-icon-switch-button"></i> 注销
                    </div>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // 公司信息
      company: {
        name: "CompanyName"
      },
      // 年月日
      nowDate: "",
      // 星期
      nowWeek: "",
      weekArr: ["日", "一", "二", "三", "四", "五", "六"]
    };
  },
  methods: {
    passworBtn() {
      console.log("修改密码");
      //   this.passwordVisible = true;
      // debugger
      //   this.ruleForm = {
      //     oldPassword: "",
      //     psnewPassword: "",
      //     psagainNewPassword: ""
      //   };
    },
    logout() {
      console.log("退出登录");
      this.$confirm('是否退出此账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({ type: 'success',  message: '退出成功!' });
        // 清除token - 跳转登录页
        localStorage.removeItem('token')
        this.$router.push('/login')
      });

    },
    // 算出时间
    dateObjToYYYY_MM_DDString(date) {
      let fullYear = date.getFullYear(),
        month = date.getMonth() + 1,
        date2 = date.getDate();
      let yyyy_MM_DDString = fullYear + "-";
      if (month <= 9) {
        yyyy_MM_DDString += `0${month}-`;
      } else {
        yyyy_MM_DDString += `${month}-`;
      }

      if (date2 <= 9) {
        yyyy_MM_DDString += `0${date2}`;
      } else {
        yyyy_MM_DDString += `${date2}`;
      }
      return yyyy_MM_DDString;
    }
  },
  computed: {
    ...mapState([
      'loginInfo'
    ])
  },
  mounted() {
    let now = new Date();
    let day = now.getDay();
    this.nowDate = this.dateObjToYYYY_MM_DDString(now);
    this.nowWeek = `星期${this.weekArr[day]}`;

    
    console.log(this.loginInfo)
  }
};
</script>


<style scoped lang="less">
  @import './public.less';
</style>
