<template>
  <div>
    <divider>添加<b style="color:red">{{name}}</b>的微信咨询</divider>
    <div class="flex">
      <img
        style="height:20px;width:20px"
        src="../../assets/img/contact.png"
      />
      <a
        style="text-decoration:underline"
        href="tel:13570437810"
      >13570437810</a></div>
    <img
      class="flex-img"
      src="../../assets/img/zx.jpg"
    />
    <divider>公众号咨询</divider>
    <img
      class="flex-img"
      src="../../assets/img/mp_qrcode.png"
    />
    <div class="flex">
      <b>筑梦时代</b>
    </div>
  </div>
</template>

<script>
import { Group, Divider, Flexbox, FlexboxItem } from "vux";
export default {
  components: { Group, Divider, Flexbox, FlexboxItem },
  data() {
    return {
      weixin_qrcode: "../../assets/img/zx.jpg",
      name: "陈潜",
      phone: "13570437810"
    };
  }
};
</script>

<style>
.flex-img {
  display: flex;
  margin: 0 auto;
  width: 60%;
  height: 60%;
}
.flex {
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
</style>
