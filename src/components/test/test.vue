<template>
  <div class="right-body">
    <div v-html="html"></div>
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
     html: ''
    };
  }, //data
  methods: {

  },
  mounted() {
    this.html = `
            <div id="a4e43a7c-fbb2-40ab-afce-0c943864da7f" class="imageTemplate" style="height: 150px; width: 150px; display: block; position: absolute; transform: translate(4px, 35px); background-image: url(&quot;/api/filecenter/file/file/402880ac72bcd1710172c151abd10072&quot;);"><div class="invite-text-box"><div class="invite-text-box-text"><div class="tip" style="display: none;">请上传图片</div></div><div class="invite-text-box-border" style="display: none;"><div class="invite-text-box-border-container"><div class="invite-text-box-border top-line move-line" style="display: none;"><div class="invite-text-box-border line-point s-resize top-line-point" style="display: none;"></div></div><div class="invite-text-box-border left-line move-line" style="display: none;"><div class="invite-text-box-border line-point left-line-point" style="display: none;"></div></div><div class="invite-text-box-border right-line move-line" style="display: none;"><div class="invite-text-box-border line-point right-line-point" style="display: none;"></div></div><div class="invite-text-box-border bottom-line move-line" style="display: none;"><div class="invite-text-box-border line-point s-resize bottom-line-point" style="display: none;"></div></div><div class="invite-text-box-border left-top-point up-point" style="display: none;"></div><div class="invite-text-box-border right-top-point up-point" style="display: none;"></div><div class="invite-text-box-border left-bottom-point up-point" style="display: none;"></div><div class="invite-text-box-border right-bottom-point up-point" style="display: none;"></div></div></div></div></div><div id="0ed9a2aa-bad5-442b-8cc3-776d6e72fb7b" class="imageTemplate" style="height: 150px; width: 150px; display: block; position: absolute; transform: translate(192px, 73px); background-image: url(&quot;/api/filecenter/file/file/402880ac72bcd1710172c152cd4f0073&quot;); border-color: rgb(242, 166, 83);"><div class="invite-text-box"><div class="invite-text-box-text"><div class="tip" style="display: none;">请上传图片</div></div><div class="invite-text-box-border" style="display: none;"><div class="invite-text-box-border-container"><div class="invite-text-box-border top-line move-line" style="display: none;"><div class="invite-text-box-border line-point s-resize top-line-point" style="display: none;"></div></div><div class="invite-text-box-border left-line move-line" style="display: none;"><div class="invite-text-box-border line-point left-line-point" style="display: none;"></div></div><div class="invite-text-box-border right-line move-line" style="display: none;"><div class="invite-text-box-border line-point right-line-point" style="display: none;"></div></div><div class="invite-text-box-border bottom-line move-line" style="display: none;"><div class="invite-text-box-border line-point s-resize bottom-line-point" style="display: none;"></div></div><div class="invite-text-box-border left-top-point up-point" style="display: none;"></div><div class="invite-text-box-border right-top-point up-point" style="display: none;"></div><div class="invite-text-box-border left-bottom-point up-point" style="display: none;"></div><div class="invite-text-box-border right-bottom-point up-point" style="display: none;"></div></div></div></div></div><div id="f5ed3652-dcd2-4867-9c15-7070f0987a99" class="textTemplate" style="height: 40px; width: 60%; display: block; position: absolute; transform: translate(7px, 274px);"><div class="invite-text-box"><div contenteditable="true" class="invite-text-box-text edit-text">点击这里编辑</div><div class="invite-text-box-border" style="display: none;"><div class="invite-text-box-border-container"><div class="invite-text-box-border top-line move-line" style="display: block;"><div class="invite-text-box-border line-point s-resize top-line-point" style="display: block;"></div></div><div class="invite-text-box-border left-line move-line" style="display: block;"><div class="invite-text-box-border line-point left-line-point" style="display: block;"></div></div><div class="invite-text-box-border right-line move-line" style="display: block;"><div class="invite-text-box-border line-point right-line-point" style="display: block;"></div></div><div class="invite-text-box-border bottom-line move-line" style="display: block;"><div class="invite-text-box-border line-point s-resize bottom-line-point" style="display: block;"></div></div><div class="invite-text-box-border left-top-point up-point" style="display: block;"></div><div class="invite-text-box-border right-top-point up-point" style="display: block;"></div><div class="invite-text-box-border left-bottom-point up-point" style="display: block;"></div><div class="invite-text-box-border right-bottom-point up-point" style="display: block;"></div></div></div></div></div>"
             `
  }, //mounted
};
</script>

<style lang="less" scoped>
// @import "../personnelIfo/PerTable.less";

</style>