<template>
  <div class="nav-left">
    <el-aside width="100%" style="text-align: center">
      <a class="logo" href="javascript:;">
        <img alt="会智科技" id="hzLogo" src="@/assets/hzLogo.png" />
      </a>
      <hr class="logo-hr" />

      <!-- 导航菜单 -->
      <el-row style="text-align: left">
        <el-col :span="24">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#234060"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <div v-for="item in menus" :key="item.id">
              <el-menu-item :index="item.id" @click="chiose(item.id)">
                <!-- <template slot="title"> -->
                <i class="el-icon-location"></i>
                <span>{{ item.menuName }}</span>
                <!-- </template> -->
              </el-menu-item>
            </div>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </div>
</template>

<script>
import route from '@/public/route.js'
export default {
  data() {
    return {
      menus: [
        { menuName: "人员信息", id: "1" },
        { menuName: "通讯录", id: "2" },
        { menuName: "证件管理", id: "3" },
        { menuName: "日志管理", id: "4" },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    chiose(idx) {
      // 是否有配置的路由 没有跳转404页面
      var path = route[idx - 1].router ? route[idx - 1].router : '/404', 
          // 当前路由
          curPath = this.$route.path 

      // 路由重复  不执行跳转
      if(curPath != path) this.$router.push({ path, query: ''})
    }
  }
}
</script>

<style scoped lang="less">
  @import './public.less';
</style>
