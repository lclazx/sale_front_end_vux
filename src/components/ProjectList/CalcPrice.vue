<template>
  <div>
    <div style="height:44px;">
      <tab v-model="typeIndex">
        <tab-item selected @on-item-click="changeTab">分期</tab-item>
        <tab-item @on-item-click="changeTab">贷款</tab-item>
      </tab>
    </div>
    <div v-if="displayTab">
      <flexbox>
        <flexbox-item>
          <group label-width="6em" label-margin-right="2em" label-align="left">
            <x-input title="总价" v-model="sumPrice" type="number" required></x-input>
            <x-input
              title="首付占比(%)"
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
          <div style="margin-top:5px;">
            <button-tab v-model="creditType">
              <button-tab-item @on-item-click="creditTypeChange">等额本息</button-tab-item>
              <button-tab-item @on-item-click="creditTypeChange">等额本金</button-tab-item>
            </button-tab>
          </div>
          <group label-width="6em" label-margin-right="2em" label-align="left">
            <x-input title="贷款金额" v-model="creditCapital" type="number" required></x-input>
            <x-input title="年利率(%)" v-model="annualRate" placeholder="单位：%" type="number" required></x-input>
            <selector
              title="贷款年限"
              :options="creditYears"
              v-model="creditYear"
              @on-change="calPeriod"
            ></selector>
            <x-input title="还款期数" v-model="repaymentPeriod" type="number" required disabled></x-input>
            <x-button
              plain
              type="primary"
              style="border-radius:99px;"
              @click.native="calAvgCredit"
            >计算</x-button>
          </group>
          <div style="margin-top:2p;">
            <divider>计算结果</divider>
            <ul v-if="creditTypeFlag">
              <li>还款总金额：￥{{totalRepayAmount}}</li>
              <li>每月还款金额：￥{{mouthRepayAmount}}</li>
            </ul>
            <ul v-else>
              <li>还款总金额：￥{{totalRepayAmount}}</li>
              <li v-for="price in priodsPrice" :key="price.index">第{{price.index}}期：￥{{price.price}}</li>
            </ul>
          </div>
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
  Divider,
  ButtonTab,
  ButtonTabItem,
  Selector
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
    Divider,
    ButtonTab,
    ButtonTabItem,
    Selector
  },
  data() {
    return {
      typeIndex: 0, //贷款or分期
      displayTab: true, //板块展示flag
      sumPrice: 1000000, //房款总额
      firstPriceRatio: 30, //首付占比
      firstPrice: 0, //首付款
      priods: 6, //分期期数
      priodsPrice: [], //分期金额
      creditType: 0, //贷款类型
      creditTypeFlag: true, //贷款类型
      creditCapital: 1000000, //贷款本金
      annualRate: 4.2, //年利率
      repaymentPeriod: 360, //还款期数
      creditYear: 30, //贷款年限
      totalRepayAmount: 0, //还款总金额
      mouthRepayAmount: 0, //月还款金额
      creditYears: [
        { key: "5", value: "5年" },
        { key: "10", value: "10年" },
        { key: "15", value: "15年" },
        { key: "20", value: "20年" },
        { key: "25", value: "25年" },
        { key: "30", value: "30年" }
      ],
      mouthCapital: 0 //每月本金
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

      var remainder = parseFloat(
        (this.sumPrice - this.firstPrice) % this.priods
      ).toFixed(2);

      for (let index = 0; index < this.priods; index++) {
        var data = new Object();
        data.index = index + 1;

        if (remainder != 0 && index == 0) {
          data.price = parseFloat(
            (this.sumPrice - this.firstPrice) / this.priods + remainder
          ).toFixed(2);

          this.priodsPrice.push(data);
        } else {
          data.price = parseFloat(
            (this.sumPrice - this.firstPrice) / this.priods
          ).toFixed(2);

          this.priodsPrice.push(data);
        }
      }
    },
    creditTypeChange() {
      //贷款类型变化事件
      if (this.creditType == 0) {
        this.creditTypeFlag = true;
      } else {
        this.creditTypeFlag = false;
      }
    },
    calAvgCredit() {
      var mouthRate = this.annualRate / 100 / 12;
      if (this.creditTypeFlag) {
        //计算等额本息
        this.totalRepayAmount = 0;
        this.mouthRepayAmount = (
          (this.creditCapital *
            mouthRate *
            Math.pow(1 + mouthRate, this.repaymentPeriod)) /
          (Math.pow(1 + mouthRate, this.repaymentPeriod) - 1)
        ).toFixed(2);
        this.totalRepayAmount = (
          this.mouthRepayAmount * this.repaymentPeriod
        ).toFixed(2);
      } else {
        //计算等额本金
        this.totalRepayAmount = 0;
        this.priodsPrice = [];
        this.mouthCapital = (this.creditCapital / this.repaymentPeriod).toFixed(
          2
        );
        for (let index = 1; index <= this.repaymentPeriod; index++) {
          var data = new Object();
          data.index = index;
          data.price =
            (parseFloat(this.mouthCapital) +
            parseFloat((this.creditCapital - this.mouthCapital * index) * mouthRate)).toFixed(2);
          this.priodsPrice.push(data);
          this.totalRepayAmount = (
            parseFloat(this.totalRepayAmount) + parseFloat(data.price)
          ).toFixed(2);
        }
      }
    },
    calPeriod() {
      //贷款年限值变化事件
      this.repaymentPeriod = this.creditYear * 12;
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