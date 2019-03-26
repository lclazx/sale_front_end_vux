<template>
  <div v-for="image in images">
    <x-img :src="image.img" class="preview-image"/>
  </div>
</template>

<script>
import { XImg } from "vux";
export default {
  components: { XImg },
  data() {
    return {
      images: []
    };
  },
  mounted() {}
};
</script>

<style>
</style>
