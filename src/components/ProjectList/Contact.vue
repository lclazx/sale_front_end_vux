<template>
  <div>
    <divider>
      添加
      <b style="color:red">{{name}}</b>的微信咨询
    </divider>
    <div class="flex">
      <img style="height:20px;width:20px" src="../../assets/img/contact.png">
      <a style="text-decoration:underline" :href="`tel:${phone}`">{{phone}}</a>
    </div>
    <img class="flex-img" :src="weixin_qrcode">
    <divider>公众号咨询</divider>
    <img class="flex-img" src="../../assets/img/mp_qrcode.png">
    <div class="flex">
      <b>筑梦时代</b>
    </div>
  </div>
</template>

<script>
import { Group, Divider, Flexbox, FlexboxItem } from "vux";
import window_utils from "../../utils/window_utils";
import axios from "axios";
export default {
  components: { Group, Divider, Flexbox, FlexboxItem },
  data() {
    return {
      weixin_qrcode: "./static/img/zx.jpg",
      name: "张熙",
      phone: "13570437810"
    };
  },
  mounted() {
    let params = window_utils.splitSearch();
    let saleId = params.sale;
    axios.get(`/api/saleinfo/index/${saleId}`).then(res => {
      if (res && res.status == 200) {
        this.weixin_qrcode = res.data.qrCodeUrl;
        this.name = res.data.name;
        this.phone = res.data.saleSlogan;
      }
    });
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
