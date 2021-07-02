<template>
  <div class="box">
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
import lodash from "lodash";
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
        .get("/api//article/allArticle ")
        .then((res) => {
          if (res.data.code === 200) {
            //
            // console.log(res.data.data);

            let data = res.data.data;
            let myChart = echarts.init(this.$refs.bar);
            if (data.length > 0) {
              myChart.showLoading({ text: "数据加载中......" });
              // 根据日期进行统计

              for (let i = 0; i < data.length; i++) {
                data[i].date = data[i].date.substring(0, 10);
              }

              data = _.countBy(data, "date");
              //   console.log(data);

              //   总数
              let total = 0;
              //   每一个的数量
              let seriesData1 = [];
              let xAxisData = ["总数量"];
              //  差值
              let differ = [0];
              //   循环对象
              for (let i in data) {
                total += data[i];
                xAxisData.push(i);
                seriesData1.push(data[i]);
              }
              //   给每一数量的数组在头部添加总数
              seriesData1.unshift(total);
              //   console.log(total);
              //  头部添加0
              //   differ.unshift(0);
              //   循环计算每一个差值
              let sub = total;
              for (let i = 0; i < seriesData1.length - 1; i++) {
                sub -= seriesData1[i + 1];
                differ.push(sub);
              }

              //   console.log(differ);
              //   console.log(seriesData1);
              //   console.log(xAxisData);

              let option = {
                color: ["rgb(90,177,239)"],
                title: {
                  subtext: "已发布数量",
                },
                tooltip: {
                  //   sshadowStyle: { width: "100" }, // 阴影指示器样式设置     width: 'auto',
                  trigger: "axis",
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                  },
                  formatter: function (params) {
                    var tar = params[1];
                    return (
                      tar.name + "<br/>" + tar.seriesName + " : " + tar.value
                    );
                  },
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true,
                },
                xAxis: {
                  //   interval: 0, //强制文字产生间隔
                  //   rotate: 90, //文字逆时针旋转45°
                  //   axisLabel: { interval: 0, rotate: 90 }, // 设置x轴标题文字旋转90度

                  data: xAxisData,
                },
                yAxis: {},
                series: [
                  {
                    type: "bar",
                    stack: "总量",
                    itemStyle: {
                      color: "rgba(0,0,0,0)",
                    },
                    data: differ,
                    barWidth: "40%",
                  },
                  {
                    name: "总数量",
                    type: "bar",
                    stack: "总量",
                    label: {
                      show: true,
                      position: "inside",
                    },
                    data: seriesData1,
                  },
                ],
              };

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
  background-color: #fff;
  padding: 10px;
  .bar {
    height: 400px;
    width: 100%;
  }
}
</style>