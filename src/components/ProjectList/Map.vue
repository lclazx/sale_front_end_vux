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
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <!-- <custom-city-cluster :projects="projects" :sale="sale"/> -->
      <custom-marker
        v-for="item in projects"
        :key="item.projectInfoId"
        :project="item"
        :sale="sale"
        @click="customMarkerClick"
      ></custom-marker>
      <x-dialog
        class="dialog-demo"
        :title="currentProject&&currentProject.name"
        v-model="showDialog"
        hide-on-blur
      >
        <project-card :project="currentProject"/>
      </x-dialog>
    </baidu-map>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmMarker,
  BmNavigation,
  BmCityList,
  BmGeolocation
} from "vue-baidu-map";
import ProjectInfo from "../controls/ProjectInfo.vue";
import CustomMarker from "../controls/CustomMarker.vue";
import CustomCityCluster from "../controls/CustomCityCluster.vue";
import sale_utils from "../../utils/sale_utils";
import ProjectCard from "../controls/ProjectCard.vue";
import { XDialog } from "vux";
export default {
  props: { location: Object },
  components: {
    BaiduMap,
    BmMarker,
    ProjectInfo,
    ProjectCard,
    CustomMarker,
    XDialog,
    BmNavigation,
    BmCityList,
    BmGeolocation,
    CustomCityCluster
  },
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
      },
      showDialog: false
    };
  },
  methods: {
    handler({ BMap, map }) {
      this.zoom = 16;
    },
    infoWindowClose() {},
    customMarkerClick(e) {
      this.center = { lng: e.lng, lat: e.lat };
      e.showInfo = true;
      this.showDialog = true;
      this.currentProject = e;
    }
  },
  async mounted() {
    this.projects = await sale_utils.getProjects();
    if (this.$route.params.id) {
      let project = this.projects.find(
        x => x.projectInfoId == this.$route.params.id
      );
      this.center = { lat: project.lat, lng: project.lng };
      this.currentProject = project;
    } else {
      let _this = this;
      this.center = JSON.parse(window.localStorage["center"]) || "广州";
      // console.log(this.$wechat);
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import "~vux/src/styles/close";

.bm-view {
  height: 100%;
  width: 100%;
}
.map-container {
  height: 100%;
}
.dialog-demo {
  .weui-dialog {
    border-radius: 8px;
    padding-bottom: 8px;
    display: flex;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
