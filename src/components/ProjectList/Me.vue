<template>
  <div>
    <group>
      <x-input
        v-model="name"
        required="true"
        title="姓名"
        placeholder="您的称呼"
        placeholder-align="right"
      />
      <x-input
        v-model="phone"
        required="true"
        title="联系电话"
        placeholder="联系电话"
        placeholder-align="right"
      />
      <input ref="avatar" @change="selectImage" id="avatar" type="file" accept="image/*">
      <img :src="qrcode" class="avatar-preview" @click="avatarClicked">
    </group>
  </div>
</template>

<script>
import wechat_util from "../../utils/wechat_utils";
import { PopupPicker, Group, XInput, Radio, XButton } from "vux";
export default {
  components: { PopupPicker, Group, XInput, Radio, XButton },
  mounted() {
    // wechat_util.check_login();
  },
  data() {
    return {
      qrcode: ""
    };
  },
  methods: {
    avatarClicked() {
      this.$refs.avatar.click();
    },
    selectImage(event) {
      let file = event.target;
      if (!file.files || !file.files[0]) return;
      var reader = new FileReader();
      let _this = this;
      reader.onload = function(evt) {
        _this.qrcode = evt.target.result;
      };
      reader.readAsDataURL(file.files[0]);
    }
  }
};
</script>

<style>
#avatar {
  display: none;
}

.avatar-preview {
  width: 200px;
  height: 200px;
}
</style>
