<template>
  <div style="height:100%">
    <view-box ref="viewBox">
      <x-header
        slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      >
        <x-icon
          slot="overwrite-left"
          type="navicon"
          size="35"
          style="fill:#fff;position:relative;top:-8px;left:-3px;"
        ></x-icon>
      </x-header>
      <router-view>
      </router-view>
      <tabbar slot="bottom">
        <tabbar-item selected>已发货</tabbar-item>
        <tabbar-item>未发货</tabbar-item>
        <tabbar-item>全部订单</tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
/* eslint-disable */
import { XHeader, Search, Tabbar, TabbarItem, ViewBox } from "vux";
export default {
  components: { XHeader, Search, Tabbar, TabbarItem, ViewBox },
  name: "Container"
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
