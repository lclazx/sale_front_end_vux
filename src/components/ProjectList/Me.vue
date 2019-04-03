<template>
  <div>
    <divider>基本信息</divider>
    <group>
      <x-input
        v-model="name"
        :required="true"
        title="姓名"
        placeholder="您的称呼"
        placeholder-align="right"
      />
      <x-input
        v-model="phone"
        :required="true"
        title="联系电话"
        placeholder="联系电话"
        placeholder-align="right"
      />
    </group>
    <divider>个人微信二维码</divider>
    <div style="position:relative">
      <input ref="avatar" @change="selectImage" id="avatar" type="file" accept="image/*">
      <a v-if="!imageSelected" class="avatar-preview">
        <img src="../../assets/img/upload.png">
        <p>点击上传微信二维码</p>
      </a>
      <img :src="qrcode" class="avatar-preview" v-if="imageSelected">
    </div>
    <div></div>
    <div>
      <x-button type="primary" @click.native="upload">提交</x-button>
    </div>
    <div v-transfer-dom>
      <alert v-model="showAlert" :title="title">{{message}}</alert>
    </div>
    <div v-transfer-dom>
      <loading :show="loading" text="资料上传中，请稍候"></loading>
    </div>
  </div>
</template>

<script>
import wechat_util from "../../utils/wechat_utils";
import axios from "axios";
import {
  PopupPicker,
  Group,
  XInput,
  Radio,
  XButton,
  Divider,
  TransferDomDirective as TransferDom,
  AlertModule,
  Alert,
  Loading
} from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Loading,
    PopupPicker,
    Group,
    XInput,
    Radio,
    XButton,
    Divider,
    Alert
  },
  mounted() {
    // wechat_util.check_login();
  },
  data() {
    return {
      qrcode: "",
      imageSelected: false,
      showAlert: false,
      title: "",
      message: "",
      name: "",
      phone: "",
      loading: false
    };
  },
  methods: {
    selectImage(event) {
      let file = event.target;
      if (!file.files || !file.files[0]) return;
      var reader = new FileReader();
      let _this = this;
      reader.onload = function(evt) {
        _this.qrcode = evt.target.result;
        _this.imageSelected = true;
      };
      reader.readAsDataURL(file.files[0]);
    },
    upload() {
      if (this.name && this.phone && this.qrcode) {
        let qrcodeLength = this.qrcode.length;
        let fileLength = parseInt(qrcodeLength - (qrcodeLength / 8) * 2);
        let size = (fileLength / 1024).toFixed(2);
        if (size > 3000) {
          this.showAlert = true;
          this.title = "图片过大";
          this.message = "请选择小于3M的图片";
        }
        this.loading = true;
        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("phone", this.phone);
        formData.append("qrcode", this.$refs.avatar.files[0]);
        axios
          .post("/api/saleinfo/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            this.loading = false;
            this.title = "资料提交成功，请复制你的推广链接";
            this.message = `http://times.zhumenginfo.com/?sale=${
              res.data.saleInfoId
            }`;
            this.showAlert = true;
          })
          .catch(e => {
            this.loading = false;
            this.title = "提交失败";
            this.message = "网络连接失败，请稍后重试";
            this.showAlert = true;
          });
      } else {
        this.showAlert = true;
        this.title = "请填写信息";
        this.message = "请填写称谓、电话并选择二维码";
      }
    }
  }
};
</script>

<style scoped>
#avatar {
  /* display: none; */
  /* visibility: hidden; */
  /* height: 0; */
}

.avatar-preview {
  margin: 0 auto;
  /* width: 200px; */
  max-height: 400px;
  display: block;
}

input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 400px;
  border: 1px solid #000;
  opacity: 0;
}
</style>
