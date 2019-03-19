<template>
  <div id="app" style="height:100%">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import wechat_util from "./utils/wechat_utils";
export default {
  name: "app",
  created() {
    // wechat_util.check_login();
  },
  mounted() {
    wechat_util.check_login();
  },
  methods: {
    get_user_info() {}
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";

body {
  background-color: #fbf9fe;
}
</style>
