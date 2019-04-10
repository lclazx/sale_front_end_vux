<template>
  <div>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3" v-for="(image, index) in images" :key="index">
        <div class="flex-demo">
          <a @click="show(index)">
            <x-img :src="image.img"/>
          </a>
        </div>
      </flexbox-item>
    </flexbox>
    <div v-transfer-dom>
      <previewer :list="imageList" ref="previewer"/>
    </div>
  </div>
</template>

<script>
import { XImg, Previewer, TransferDom, Flexbox, FlexboxItem } from "vux";
import sale_utils from "../../utils/sale_utils";
export default {
  components: { XImg, Previewer, TransferDom, Flexbox, FlexboxItem },
  directives: { TransferDom },
  data() {
    return {
      images: [],
      imageList: []
    };
  },
  mounted() {
    var projectId = this.$route.params.id;
    var category = this.$route.params.category;
    sale_utils.getImageList(projectId).then(res => {
      this.images = res.data[category];
      this.imageList = this.images.map(x => {
        return { src: x.img, w: 1200, h: 900 };
      });
    });
  },
  methods: {
    show(index) {
      this.$refs.previewer.show(index);
    }
  }
};
</script>

<style scoped>
.flex-demo {
  text-align: center;
  color: #fff;
  border-radius: 4px;
  background-clip: padding-box;
  margin: 5px;
}
</style>
