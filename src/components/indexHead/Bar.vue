<template>
  <!-- 柱状图 -->
  <div class="box">
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("./api/homeChat")
        .then((res) => {
          if (res.data.code === 0) {
            // console.log(res.data.data);
            let data = res.data.data;
            // 获取donm
            let myChart = echarts.init(this.$refs.bar);
            // 判断是不是空
            // console.log(Object.values(res.data.data));
            if (res.data.data.length > 0) {
              myChart.showLoading({ text: "数据加载中......" });
              // 赋值
              let dimensions = ["product"];
              //   console.log(Object.keys(data[0]));

              // 拼接数组
              dimensions = dimensions.concat(Object.keys(data[0]).slice(1));
              //   console.log(dimensions);

              //   series柱子个数及样式 个数比dimensions长度小1
              let series = [];
              for (let i = 0; i < dimensions.length - 1; i++) {
                series.push({ type: "bar" });
              }
              //   console.log(series);
              // 柱子数据
              let source = [];
              data.map((a) => {
                source.push({
                  product: a.date,
                  expected: a.expected,
                  actual: a.actual,
                });
              });
              // console.log(source);

              // 创建dom 的数据
              let option = {
                color: ["rgb(25,212,174)", "rgb(90,177,239)"],
                legend: {
                  top: "5%",
                },

                tooltip: {},
                dataset: {
                  dimensions: dimensions,
                  source: source,
                },
                xAxis: { type: "category" },
                yAxis: {},
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                // 控制数据显示的样子及个数， 柱状 线形
                series: series,
              };
              // 赋值
              myChart.setOption(option);
              myChart.hideLoading();
            } else {
              myChart.showLoading({ text: "暂无数据......" });
            }
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  flex: 1;
  margin-left: 10px;

  background-color: #fff;
  .bar {
    height: 500px;
    padding: 0 10px 0;
  }
}
</style>