<template>
  <div class="box">
    <div class="lineChart" ref="line"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {
      datas: [],
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/homeChat")
        .then((res) => {
          if (res.data.code === 0) {
            let myChart = echarts.init(this.$refs.line);

            this.datas = res.data.data;
            // console.log(this.datas);
            if (this.datas.length > 0) {
              // 获取装图表的div,必须有高度
              myChart.showLoading({ text: "正在努力加载中" });
              let date1 = this.datas.map((a) => {
                return a.date;
              });
              // console.log(date1);
              let value1 = this.datas.map((a) => {
                return a.actual;
              });
              let value2 = this.datas.map((a) => {
                return a.expected;
              });
              // console.log(value1);
              let seriesData = [];
              seriesData.push({
                data: value2,
                name: Object.keys(this.datas[0])[1],
                type: "line",
                smooth: true,
                style: "rgb(125,175,249)",
              });
              seriesData.push({
                data: value1,
                name: Object.keys(this.datas[0])[2],
                type: "line",
                smooth: true,
              });
              // // 循环创建对象数组
              // for (let i = 0; i < this.datas.length; i++) {
              //   // console.log(value2);
              //   seriesData.push({
              //     value: [value1[i], value2[i]],
              //     name: Object.keys(this.datas[0])[1],
              //   });
              // }
              // console.log(Object.keys(this.datas[0]).slice(1));
              // console.log(seriesData);
              // 需要展示的数据
              let option = {
                color: ["rgb(125, 175, 249)", "rgb(253,38,102)"],
                legend: {
                  top: "5%",
                  // 数据组
                  data: Object.keys(this.datas[0]).slice(1),

                  // textStyle: { color: "#25c36c" },
                },
                tooltip: {
                  trigger: "axis",
                },
                xAxis: {
                  type: "category",
                  //   x轴数据名
                  data: date1,
                },
                yAxis: {
                  type: "value",
                },

                series: seriesData,
              };
              // 将需要展示的数据赋给div
              myChart.setOption(option);

              myChart.hideLoading();
            } else {
              myChart.showLoading({ text: "暂无数据" });
            }
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 拆分需要的数据为数组
  },
  mounted() {
    //

    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  .lineChart {
    height: 400px;
    width: 100%;
    background-color: #fff;
    // padding: 10px;
  }
}
</style>