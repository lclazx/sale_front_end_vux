<template>
  <bm-marker
    :position="{lng:project.lng,lat:project.lat}"
    :title="project.projectInfoId.toString()"
    @click="click"
  >
    <bm-label
      :content="project.name"
      :labelStyle="{color: '', fontSize : '14px',transform: 'translateX(-25%)', background:'#999', border:'0'}"
      :offset="{width:0,height:-22}"
    />
  </bm-marker>
</template>

<script>
import { BmLabel, BmMarker, BmInfoWindow } from "vue-baidu-map";

export default {
  components: { BmMarker, BmInfoWindow, BmLabel },
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
    return {};
  }
};
</script>

<style>
</style>
