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
      <x-input v-model="agentId" title="经纪人编号" placeholder="全民营销经纪人ID" placeholder-align="right"/>
    </group>
    <group>
      <x-img 
    </group>
  </div>
</template>

<script>
import { PopupPicker, Group, XInput, Radio, XButton } from "vux";
export default {
  components: { PopupPicker, Group, XInput, Radio, XButton },
  data() {
    return {
      form_data: {
        name: ""
      }
    };
  }
};
</script>

<style>
</style>
