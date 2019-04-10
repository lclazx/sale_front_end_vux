<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="45px">
      <x-header
        slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      >{{project.name}}</x-header>
      <tabbar slot="bottom">
        <tabbar-item link="/Map">
          <img slot="icon" src="../../assets/img/map.png">
          <span slot="label">地图看房</span>
        </tabbar-item>
        <tabbar-item link="/contact">
          <img slot="icon" src="../../assets/img/contact.png">
          <span slot="label">联系客服</span>
        </tabbar-item>
      </tabbar>
      <div>
        <div clas="info-container">
          <swiper
            :list="imageDict&&imageDict['covers']"
            auto
            style="width:100%;margin:0 auto;"
            height="180px"
            dots-class="custom-bottom"
            dots-position="center"
          ></swiper>
          <card :header="{title:project.name}">
            <div slot="content" class="card-demo-flex card-demo-content01">
              <div class="vux-1px-r">
                <span>{{project.type}}</span>
                <br>产品类型
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
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-marker :position="project.location"></bm-marker>
        </baidu-map>
        <div v-for="(images, category) in imageDict" v-key="category">
          <div v-if="category!='covers'&&images.length>0">
            <divider>{{category}}</divider>
            <a :href="`.#/image/${category}/${project.id}`">
              <div class="image-link">
                <flexbox class="preview-container">
                  <flexbox-item>
                    <div>
                      <img class="preview-image" :src="images.length>0&&images[0].img">
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div>
                      <img class="preview-image" :src="images.length>1&&images[1].img">
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div>
                      <img class="preview-image" :src="images.length>2&&images[2].img">
                    </div>
                  </flexbox-item>
                </flexbox>
              </div>
            </a>
          </div>
        </div>
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
import { BaiduMap, BmMarker, BmNavigation } from "vue-baidu-map";
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
    BmNavigation,
    TabbarItem
  },
  data() {
    return {
      imageDict: { covers: [] },
      project: {
        location: {}
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
    sale_utils.getImageList(this.$route.params.id).then(res => {
      this.imageDict = res.data;
    });
  },
  methods: {
    convertToPageProject(prj) {
      return {
        id: prj.projectInfoId,
        price: prj.price,
        name: prj.name,
        location: { lat: prj.lat, lng: prj.lng },
        area: prj.area,
        type: prj.type
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
  height: 150px;
}
.image-link {
  margin: 5px;
}
.flex-container {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  height: 100%;
  -webkit-box-orient: vertical;
}
.preview-image {
  /* width: 25%; */
  /* width: 30%; */
  width: 80%;
  margin: 10px 10px;
}

.preview-container {
  background: #777;
  /* margin: 0 auto; */
  /* width: 90%; */
}

.preview-title {
  font-size: 10px;
  align-content: center;
  margin: 0 auto;
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
