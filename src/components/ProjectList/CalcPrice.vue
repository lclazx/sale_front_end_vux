<template>
  <div>
    <div style="height:44px;">
      <tab v-model="index01">
        <tab-item selected @on-item-click="changeTab">分期</tab-item>
        <tab-item @on-item-click="changeTab">贷款</tab-item>
      </tab>
    </div>
    <div v-if="displayTab">
      <flexbox>
        <flexbox-item>
          <group label-width="4.5em" label-margin-right="1em" label-align="left">
            <x-input title="总价" v-model="sumPrice" type="number" required></x-input>
            <x-input
              title="首付占比"
              v-model="firstPriceRatio"
              placeholder="单位：%"
              type="number"
              required
            ></x-input>
            <x-input title="期数" v-model="priods" type="number" required></x-input>
            <x-button plain type="primary" style="border-radius:99px;" @click.native="calculate">计算</x-button>
          </group>
          <div style="margin-top:2p;">
            <divider>计算结果</divider>
            <ul>
              <li>首付：￥{{firstPrice}}</li>
              <li v-for="price in priodsPrice" :key="price.index">第{{price.index}}期：￥{{price.price}}</li>
            </ul>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div v-else>
      <flexbox>
        <flexbox-item>
          <div class="flex-demo">贷款</div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import {
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  ViewBox,
  XInput,
  Group,
  XButton,
  Divider
} from "vux";
import { throws } from "assert";

export default {
  components: {
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    ViewBox,
    XInput,
    Group,
    XButton,
    Divider
  },
  data() {
    return {
      index01: 0,
      index: 1,
      displayTab: true,
      sumPrice: "",
      firstPriceRatio: "",
      firstPrice: 0,
      priods: "",
      priodsPrice: []
    };
  },
  methods: {
    changeTab(index) {
      if (index == 0) {
        this.displayTab = true;
      } else {
        this.displayTab = false;
      }
    },
    calculate() {

      this.priodsPrice = [];

      this.firstPrice = (this.sumPrice * this.firstPriceRatio) / 100;

      var remainder = parseFloat((this.sumPrice - this.firstPrice) % this.priods).toFixed(2);

      for (let index = 0; index < this.priods; index++) {
          
        var data = new Object();
        data.index = index + 1;

        if (remainder != 0 && index == 0) {

          data.price =
           parseFloat((this.sumPrice - this.firstPrice) / this.priods + remainder).toFixed(2);

          this.priodsPrice.push(data);
        } else {

          data.price = parseFloat((this.sumPrice - this.firstPrice) / this.priods).toFixed(2);

          this.priodsPrice.push(data);

        }
      }
    }
  }
};
</script>
<style scoped>
.space-btn {
  padding: 5px 0;
  margin: 10px;
  text-align: center;
  border: 1px red solid;
}

.space {
  padding: 30px 0;
  margin: 10px;
  text-align: center;
  border: 1px green solid;
}
</style>