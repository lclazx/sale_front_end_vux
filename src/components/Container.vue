<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="45px">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <span>{{title}}</span>
        <x-icon
          slot="right"
          type="navicon"
          size="35"
          style="fill:#fff;position:relative;top:-8px;left:-3px;"
        />
      </x-header>
      <router-view></router-view>
      <tabbar slot="bottom">
        <tabbar-item link="/list">
          <img slot="icon" src="../assets/img/building.png">
          <span slot="label">项目列表</span>
        </tabbar-item>
        <tabbar-item link="/map">
          <img slot="icon" src="../assets/img/map.png">
          <span slot="label">地图</span>
        </tabbar-item>
        <tabbar-item link="/calcPrice">
          <img slot="icon" src="../assets/img/美元3.png">
          <span slot="label">房价计算</span>
        </tabbar-item>
        <tabbar-item link="/contact">
          <img slot="icon" src="../assets/img/contact.png">
          <span slot="label">联系客服</span>
        </tabbar-item>
        <!-- <tabbar-item link="/me">
          <img slot="icon" src="../assets/img/me.png">
          <span slot="label">个人中心</span>
        </tabbar-item>-->
      </tabbar>
    </view-box>
  </div>
</template>

<script>
/* eslint-disable */
import { XHeader, Search, Tabbar, TabbarItem, ViewBox } from "vux";
export default {
  components: { XHeader, Search, Tabbar, TabbarItem, ViewBox },
  name: "Container",
  data() {
    return {
      title: "时代中国"
    };
  }
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
