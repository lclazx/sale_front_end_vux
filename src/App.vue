<template>
  <div
    id="app"
    style="height:100%"
  >
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "app",
  created() {},
  methods: {
    get_user_info() {
      
    }
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
