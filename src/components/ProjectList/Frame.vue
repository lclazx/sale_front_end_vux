<template>
  <div class="times-plus">
    <iframe
      class="times-plus"
      ref="iframe"
      :src="frameUrl"
    />
    <!-- <x-button @click.native="click" text="test" type="primary"/> -->
  </div>
</template>

<script>
import { XButton } from "vux";
import sale_utils from "../../utils/sale_utils";
export default {
  components: { XButton },
  data() {
    return {
      projectId: this.$route.params.id,
      project: {},
      frameUrl: ""
    };
  },
  async created() {
    let id = this.$route.params.id;
    let projects = await sale_utils.getProjects();
    this.project = projects.find(x => x.projectInfoId == id);
    this.frameUrl = `http://times-plus.timesgroup.cn/recommendation.html#/detail/${this
      .project && this.project.caption}`;
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
