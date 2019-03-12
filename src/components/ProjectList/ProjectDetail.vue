<template>
  <div>
    <swiper
      :list="list"
      auto
      style="width:80%;margin:0 auto;"
      height="180px"
      dots-class="custom-bottom"
      dots-position="center"
    ></swiper>
    <card header="项目信息">
      <div
        slot="content"
        class="car-demo-flex card-demo-content01"
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
  </div>
</template>

<script>
import { Swiper, Card } from "vux";
export default {
  props: { id: Number },
  components: { Swiper, Card },
  data() {
    return {
      images: [
        {
          img:
            "http://times-plus.timesgroup.cn/timesangel/userfiles/projectImage/E2CE0CCF/%E5%85%A8%E6%B0%91%E8%90%A5%E9%94%80%E7%B3%BB%E7%BB%9F_%E9%A1%B9%E7%9B%AE%E7%9B%B8%E5%86%8C1080x688px-04.jpg",
          title: this.$props.id
        }
      ],
      project: { price: 20000, area: "80|100|120" }
    };
  },
  created() {},
  mounted() {}
};
</script>

<style>
@import "~vux/src/styles/1px.less";
</style>
