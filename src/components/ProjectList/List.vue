<template>
  <panel type="1" header="列表" :footer="{title:'更多', url:'http://www.baidu.com/'}" :list="list"/>
</template>

<script>
import { Panel } from "vux";
import sale_utils from "../../utils/sale_utils";
export default {
  components: { Panel },
  data() {
    return {
      list: []
    };
  },
  async created() {
    // this.list = sale_utils.getProjects();
  },
  async mounted() {
    let projectList = await sale_utils.getProjects();
    this.list = sale_utils.convertToPanelProjectItems(projectList);
  }
};
</script>

<style>
</style>
