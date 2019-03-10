<template>
  <bm-marker
    :position="{lng:project.lng,lat:project.lat}"
    :title="project.projectInfoId.toString()"
    @click="click"
  >
    <bm-info-window
      :show="project.showInfo"
      @open="project.showInfo=true"
      @close="close"
    >
      <project-info
        :project="project"
        :sale="sale"
      ></project-info>
    </bm-info-window>
  </bm-marker>
</template>

<script>
import ProjectInfo from "./ProjectInfo.vue";
import { BmMarker, BmInfoWindow } from "vue-baidu-map";

export default {
  components: { ProjectInfo, BmMarker, BmInfoWindow },
  props: { project: Object, sale: Object },
  methods: {
    click: function(e) {
      console.log(e);
      this.$emit("click", this.project);
    },
    close() {
      this.project.showInfo = false;
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style>
</style>
