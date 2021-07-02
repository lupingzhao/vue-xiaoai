<template>
  <div>
    <statistical-head :data="data"></statistical-head>
    <div class="m-tb-25 box1 flex jcc">
      <pie-stat></pie-stat>

      <pie-stat-two></pie-stat-two>
    </div>
    <div>
      <stat-bar></stat-bar>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import StatisticalHead from "../../components/statisticalHead/StatisticalHead.vue";
import axios from "axios";
import PieStat from "../../components/statisticalHead/pieStat";
import PieStatTwo from "../../components/statisticalHead/pieStatTwo";
import StatBar from "../../components/statisticalHead/StatBar.vue";

export default {
  name: "",
  props: {},
  data() {
    return {
      data: [],
    };
  },
  components: { StatisticalHead, PieStat, PieStatTwo, StatBar },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>