<template>
  <div>
    <swiper
      :list="images"
      auto
      style="width:80%;margin:0 auto;"
      height="180px"
      dots-class="custom-bottom"
      dots-position="center"
    ></swiper>
    <card :header="{title:'项目信息'}">
      <div
        slot="content"
        class="card-demo-flex card-demo-content01"
      >
        <div class="vux-1px-r">
          <span>{{project.price}}</span>
          <br>
          单价
        </div>
        <div class="vux-1px-r">
          <span>{{project.area}}</span>
          <br>
          面积
        </div>
        <div class="vux-1px-r">
          <span>{{project.price}}</span>
          <br>
          单价
        </div>
      </div>
    </card>
    <baidu-map
      ref="map"
      :zoom="zoom"
      :center="project.location"
      :scroll-wheel-zoom="true"
      class="bm-view"
      ak="3662942c3c1ec12221e4ac924ee11efe"
    >
      <bm-marker :position="project.location">

      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import { Swiper, Card } from "vux";
import { BaiduMap, BmMarker } from "vue-baidu-map";
export default {
  props: { id: Number },
  components: { Swiper, Card, BaiduMap, BmMarker },
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
        price: 20000,
        area: "80|100|120",
        location: { lat: 23.0, lng: 113.0 }
      },
      zoom: 15
    };
  },
  created() {},
  mounted() {}
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
  height: 200px;
}
.map-container {
  height: 100%;
}
</style>
