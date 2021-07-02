<template>
  <div>
    <!-- 头部 -->
    <div>
      <index-head></index-head>
    </div>
    <!-- 折线图 -->
    <div>
      <index-line-chart></index-line-chart>
    </div>
    <div class="flex jcsb m-tb-25">
      <radar></radar>
      <pie></pie>
      <bar></bar>
    </div>
    <div class="flex m-b-10 jcsb box1">
      <list-lable class="m"></list-lable>
      <index-to-do></index-to-do>
      <progress-bar class="jdt"></progress-bar>
    </div>
  </div>
</template>

<script>
import Bar from "../components/indexHead/Bar.vue";
import IndexHead from "../components/indexHead/indexHead.vue";
import IndexLineChart from "../components/indexHead/indexLineChart.vue";
import IndexToDo from "../components/indexHead/IndexToDo.vue";
import ListLable from "../components/indexHead/ListLable.vue";
import Pie from "../components/indexHead/Pie.vue";
import ProgressBar from "../components/indexHead/ProgressBar.vue";

import radar from "../components/indexHead/radar.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    IndexHead,
    IndexLineChart,
    radar,
    Pie,
    Bar,
    ListLable,
    ProgressBar,
    IndexToDo,
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box1 {
  height: 550px;
}
</style>
