<template>
  <panel header="列表" :footer="{title:'更多', url:'http://www.baidu.com/'}" :list="list"/>
</template>

<script>
import { Panel } from "vux";
export default {
  components: { Panel },
  data() {
    return {
      list: []
    };
  }
};
</script>

<style>
</style>
