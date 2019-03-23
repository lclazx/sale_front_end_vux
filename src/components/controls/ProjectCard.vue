<template>
  <div class="container">
    <p class="container">
      <b>{{project&&project.name}}</b>
    </p>
    <div class="img-box">
      <Swiper
        :list="[{img:'http://times-plus.timesgroup.cn/timesangel/userfiles/projectImage/E2CE0CCF/%E5%85%A8%E6%B0%91%E8%90%A5%E9%94%80%E7%B3%BB%E7%BB%9F_%E9%A1%B9%E7%9B%AE%E7%9B%B8%E5%86%8C1080x688px-04.jpg'}]"
      />
    </div>
    <card :header="{title:'项目信息'}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>{{project&&project.price}}</span>
          <br>单价
        </div>
        <div class="vux-1px-r">
          <span>{{project&&project.area}}</span>
          <br>面积
        </div>
        <div class="vux-1px-r">
          <span>{{project&&project.price}}</span>
          <br>单价
        </div>
      </div>
    </card>
    <p>
      <x-button type="default" class="detail" :link="`/project/${project&&project.projectInfoId}`">
        点击查看
        <b class="project-name">{{project&&project.name}}</b>
        详情>>
      </x-button>
    </p>
  </div>
</template>

<script>
import { Swiper, XImg, XDialog, XButton } from "vux";
export default {
  components: { XImg, XDialog, Swiper, XButton },
  props: { project: Object }
};
</script>

<style scoped>
div {
  background: #e5e6e6;
}
.container {
  margin: 0 auto;
}
.flex {
  display: flex;
}
.project-name {
  color: red;
}
img {
  width: 220px;
}
x-img {
  width: 100%;
}
.detail {
  font-size: 14px;
  color: cadetblue;
}
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
</style>
