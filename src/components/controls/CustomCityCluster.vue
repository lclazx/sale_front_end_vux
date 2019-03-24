<template>
  <bml-marker-clusterer :averageCenter="true">
    <bm-marker
      v-for="item in projects"
      :key="item.projectInfoId"
      :project="item"
      :sale="sale"
      @click="customMarkerClick"
      :position="{lng:item.lng,lat:item.lat}"
    ></bm-marker>
  </bml-marker-clusterer>
</template>

<script>
import { BmlMarkerClusterer, BmMarker } from "vue-baidu-map";
import CustomMarker from "./CustomMarker";
export default {
  components: { BmlMarkerClusterer, CustomMarker, BmMarker },
  props: { projects: Array, city: String, sale: Object },
  methods: { customMarkerClick() {} }
};
</script>

<style>
</style>
