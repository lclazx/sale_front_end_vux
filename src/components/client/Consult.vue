<template>
  <div class="container">
    <group
      title="请填写您的联系方式"
      style="{background:transparent}"
    >
      <group title="简要信息">
        <x-input
          title="你的姓名"
          v-model="name"
          name='name'
          is-type="china-name"
          required
        />
        <x-input
          title="手机号码"
          name="mobile"
          keyboard='number'
          is-type="china-mobile"
          required
        />
      </group>
      <group title="性别">
        <radio
          :options="['先生','女士']"
          v-model="gender"
        ></radio>
      </group>
      <group title="楼盘偏好">
        <popup-picker
          title="意向小区"
          :data="project_list"
          show-name
          v-model="selected_project"
          :columns="3"
        >
        </popup-picker>
      </group>
      <x-button
        text="提交"
        @click.native="submit"
        :show-loading="button_loading"
        :disabled="button_disabled"
        type='primary'
      />
    </group>
    <b>
      <span class="alert">
        本网站郑重承诺:<br>您所填写的信息只用于向你介绍时代全民营销信息，绝不他用！</span>
    </b>
  </div>
</template>

<script>
import { PopupPicker, Group, XInput, Radio, XButton } from "vux";

export default {
  components: { PopupPicker, Group, XInput, Radio, XButton },
  data() {
    return {
      project_list: [
        { name: "广州", value: "guangzhou", parent: 0 },
        { name: "中山", value: "zhongshan", parent: 0 },
        { name: "佛山", value: "foshan", parent: 0 },
        { name: "东莞", value: "dongguan", parent: 0 },
        { name: "时代天韵", value: "tianyun", parent: "guangzhou" },
        { name: "时代香海彼岸", value: "xianghaibian", parent: "guangzhou" },
        { name: "时代香海彼岸", value: "xianghaibian", parent: "dongguan" },
        { name: "时代水岸", value: "shuian", parent: "foshan" },
        { name: "时代云图", value: "yuntu", parent: "zhongshan" }
      ],
      selected_project: [],
      gender: "先生",
      button_disabled: false,
      button_loading: false,
      name: "",
      phone: ""
    };
  },
  methods: {
    submit() {
      this.button_disabled = true;
      this.button_loading = true;
    }
  }
};
</script>

<style>
.container {
  margin: 0px, 20px;
  background: transparent;
}
.alert {
  color: red;
}
</style>
