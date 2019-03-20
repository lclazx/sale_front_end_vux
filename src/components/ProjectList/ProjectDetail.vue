<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="45px">
      <x-header
        slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      >{{project.name}}</x-header>
      <tabbar slot="bottom">
        <tabbar-item link="/contact">
          <img slot="icon" src="../../assets/img/contact.png">
          <span slot="label">联系客服</span>
        </tabbar-item>
      </tabbar>
      <div class="flex-container">
        <div clas="info-container">
          <swiper
            :list="images"
            auto
            style="width:100%;margin:0 auto;"
            height="180px"
            dots-class="custom-bottom"
            dots-position="center"
          ></swiper>
          <card :header="{title:'项目信息'}">
            <div slot="content" class="card-demo-flex card-demo-content01">
              <div class="vux-1px-r">
                <span>{{project.price}}</span>
                <br>单价
              </div>
              <div class="vux-1px-r">
                <span>{{project.area}}</span>
                <br>面积
              </div>
              <div class="vux-1px-r">
                <span>{{project.price}}</span>
                <br>单价
              </div>
            </div>
          </card>
        </div>
        <divider>项目地址</divider>
        <baidu-map
          ref="map"
          :zoom="zoom"
          :center="project.location"
          :scroll-wheel-zoom="true"
          class="bm-view"
          ak="3662942c3c1ec12221e4ac924ee11efe"
        >
          <bm-marker :position="project.location"></bm-marker>
        </baidu-map>
      </div>
    </view-box>
  </div>
</template>

<script>
import {
  Swiper,
  Card,
  Divider,
  ViewBox,
  XHeader,
  Flexbox,
  FlexboxItem,
  Tabbar,
  TabbarItem
} from "vux";
import { BaiduMap, BmMarker } from "vue-baidu-map";
import sale_utils from "../../utils/sale_utils";
export default {
  props: { id: Number },
  components: {
    Swiper,
    Card,
    BaiduMap,
    BmMarker,
    Divider,
    Flexbox,
    FlexboxItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      images: [
        {
          img:
            "http://times-plus.timesgroup.cn/timesangel/userfiles/projectImage/E2CE0CCF/%E5%85%A8%E6%B0%91%E8%90%A5%E9%94%80%E7%B3%BB%E7%BB%9F_%E9%A1%B9%E7%9B%AE%E7%9B%B8%E5%86%8C1080x688px-04.jpg",
          title: this.$props.id
        }
      ],
      project: {
        // price: 20000,
        // area: "80|100|120",
        location: {  },
        // name: "时代天韵"
      },
      zoom: 15
    };
  },
  created() {},
  mounted() {
    sale_utils.getProjects().then(projects => {
      let currentPrj = projects.find(
        x => x.projectInfoId == this.$route.params.id
      );
      this.project = this.convertToPageProject(currentPrj);
    });
  },
  methods: {
    convertToPageProject(prj) {
      return {
        price: prj.price,
        name: prj.name,
        location: { lat: prj.lat, lng: prj.log },
        area: prj.area
      };
    }
  }
};
</script>

<style>
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.bm-view {
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  flex: 1;
}

.flex-container {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  height: 100%;
  -webkit-box-orient: vertical;
}

.info-container {
  flex-grow: 0;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
