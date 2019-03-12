<template>
  <div class="map-container">
    <baidu-map
      ref="map"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      :scroll-wheel-zoom="true"
      class="bm-view"
      ak="3662942c3c1ec12221e4ac924ee11efe"
    >
      <custom-marker
        v-for="item in projects"
        :key="item.projectInfoId"
        :project="item"
        :sale="sale"
        @click="customMarkerClick"
      ></custom-marker>
    </baidu-map>
    <!-- <project-info
      :project="currentProject"
      v-if="currentProject!=null&&currentProject.showInfo"
      :sale="sale"
    />-->
  </div>
</template>

<script>
import { BaiduMap, BmMarker } from "vue-baidu-map";
import ProjectInfo from "../controls/ProjectInfo.vue";
import CustomMarker from "../controls/CustomMarker.vue";
export default {
  props: { location: Object },
  components: { BaiduMap, BmMarker, ProjectInfo, CustomMarker },
  data() {
    return {
      center: this.$props.location || "广州",
      zoom: 10,
      mapStyle: {},
      projects: [],
      currentProject: null,
      sale: {
        phone: "13570437810",
        qrcode: "https://www.baidu.com/img/bd_logo1.png?where=super"
      }
    };
  },
  methods: {
    handler({ BMap, map }) {
      this.zoom = 15;
    },
    infoWindowClose() {},
    customMarkerClick(e) {
      this.center = { lng: e.lng, lat: e.lat };
      e.showInfo = true;
      this.currentProject = e;
    }
  },
  mounted() {
    let _this = this;
    this.$wechat.getLocation({
      type: "wgs84",
      success: function(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        _this.center = { lat: latitude, lng: longitude };
        _this.center.lng = longitude;
        _this.center.lat = latitude;
        // this.center = "广州";
        _this.zoom = 10;
        console.log(_this.center);
      }
    });
  }
};
</script>

<style>
.bm-view {
  height: 100%;
}
.map-container {
  height: 100%;
}
</style>
