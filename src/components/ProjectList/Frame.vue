<template>
  <div class="times-plus">
    <iframe class="times-plus" ref="iframe" src="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8b729213fa67ac2f&redirect_uri=http%3A%2F%2Ftimes-plus.timesgroup.cn%2Ftimesangel%2Fapi%2Fagent%2FgetWechatUser%3FagentId%3D5513%26random%3D4840&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect"/>
    <x-button @click.native="click" text="test" type="primary"/>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  components: { XButton },
  methods: {
    click() {
      console.log(this.$refs.iframe.src);
    }
  }
};
</script>

<style>
.times-plus {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
