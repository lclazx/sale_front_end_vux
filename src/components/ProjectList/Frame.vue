<template>
  <div class="times-plus">
    <iframe
      class="times-plus"
      ref="iframe"
      :src="`http://times-plus.timesgroup.cn/recommendation.html#/detail/${projectId}`"
    />
    <!-- <x-button @click.native="click" text="test" type="primary"/> -->
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  components: { XButton },
  data() {
    return {
      projectId: this.$route.params.id
    };
  },
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
