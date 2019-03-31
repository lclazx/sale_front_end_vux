<template>
  <div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      top="46px"
      auto-scroll-to-top
    />
    <panel type="1" header="楼盘列表" :list="list"/>
  </div>
</template>

<script>
import { Panel, Search } from "vux";
import sale_utils from "../../utils/sale_utils";
export default {
  components: { Panel, Search },
  data() {
    return {
      list: [],
      results: []
    };
  },
  methods: {
    resultClick(item) {
      this.$router.push(item.url);
    },
    getResult(val) {
      if (val) {
        // let projectList = await sale_utils.getProjects();
        this.results = this.list.filter(x => x.title.includes(val));
      }
    }
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
