<template>
  <div class="img-flex-container">
    <div v-for="(image, index) in images" :key="index" class="img-preview-container">
      <a @click="show(index)" class="img-preview-image">
        <x-img :src="image.img" class="img-preview-image"/>
      </a>
    </div>
    <div v-transfer-dom>
      <previewer :list="imageList" ref="previewer"/>
    </div>
  </div>
</template>

<script>
import { XImg, Previewer, TransferDom } from "vux";
import sale_utils from "../../utils/sale_utils";
export default {
  components: { XImg, Previewer, TransferDom },
  directives: { TransferDom },
  data() {
    return {
      images: [],
      imageList: []
    };
  },
  mounted() {
    var projectId = this.$route.params.id;
    sale_utils.getImageList(projectId).then(res => {
      this.images = res.data;
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
.img-preview-container {
  margin: 5px;
}
.img-preview-image {
  width: 80px;
  height: 80px;
}
.img-flex-container {
  display: flex;
  flex-flow: wrap;
}
</style>
