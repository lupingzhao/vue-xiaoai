<template>
  <!--饼图 -->
  <div class="box">
    <div class="pie" ref="pie"></div>
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
        .get("/api/ringChat")
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 0) {
            let data = res.data.data;
            // 获取dom元素
            let myChart = echarts.init(this.$refs.pie);
            // 循环创建对象数组
            let seriesData = [];

            data.map((a) => {
              // console.log(a.name);
              seriesData.push({
                value: a.data,
                name: a.name,
              });
            });
            // console.log(seriesData);
            // 判断是否有数据
            if (data.length > 0) {
              myChart.showLoading({ text: "数据加载中....." });
              // 定义显示的数据
              let option = {
                color: [
                  "rgb(25,212,174)",
                  "rgb(90,177,239)",
                  "rgb(250,110,134)",
                  "rgb(255,185,128)",
                  "rgb(0,103,166)",
                ],
                legend: {
                  top: "5%",
                },
                tooltip: {
                  trigger: "item",
                },
                toolbox: {
                  show: true,
                  feature: {
                    mark: { show: true },
                  },
                },
                series: [
                  {
                    type: "pie",
                    radius: [20, 100],
                    center: ["50%", "50%"],
                    roseType: "area",
                    itemStyle: {
                      borderRadius: 1,
                    },
                    data: seriesData,
                  },
                ],
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
  // width: 100%;
  background-color: #fff;

  flex: 1;
  margin-left: 10px;
  .pie {
    height: 500px;
    // padding: 10px;
  }
}
</style>