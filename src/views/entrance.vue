<template>
    <div class="entrance">
        <!-- 左侧 - 导航栏 -->
        <!-- <AppLeft></AppLeft> -->

        <!-- 右侧 -->
        <div class="right">
            <!-- 右侧顶部 - 信息栏 -->
            <!-- <AppRight></AppRight> -->

            <!-- 右侧 - 主体 -->
            <router-view />
        </div>
    </div>
</template>

<script>
import AppLeft from "@/public/AppLeft";
import AppRight from "@/public/AppRight";

export default {
    components: {
        AppLeft,
        AppRight
    },
    created() {
        // this.token = localStorage.getItem('token') || null
        // if(this.token == null){
        //     // 跳转登录页
        //     this.$router.push('/login')
        // } else {
        //     // 获取登录用户数据  -  将数据保存全局 vuex
        //     this.$http.get("/api/usercenter/user/user").then(res => {
        //         if (res.code === "000") {
        //             console.log(res.data)
        //             this.$store.commit('setLoginIngo', res.data)
        //             // if (this.user && this.user.companyObj) {
        //             // }
        //         }
        //     })
        // }
    }
}
</script>

<style scoped>
table {page-break-after:always;}
.entrance {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #fff;
  overflow: hidden;
}

.right {
  flex: 1;
  height: 100vh;
  overflow: hidden;
}
</style>