<template>
    <div class="error">
        <div class="coutain">
            403
            <div>无权限进行访问</div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .error {
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        padding: 300px 0;
        text-align: center;
        background-image: url(../assets/background.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .coutain {
            width: 100%;
            font-size: 100px;
            color: #ccc;
            text-align: center;
        }
    }
</style>