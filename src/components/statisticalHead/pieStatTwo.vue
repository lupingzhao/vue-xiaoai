<template>
  <div class="box">
    <div class="pie1" ref="pie1"></div>
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
        .get("/api/article/allArticle")
        .then((res) => {
          if (res.data.code === 200) {
            let myChart = echarts.init(this.$refs.pie1);
            myChart.showLoading({ text: "数据加载中......" });
            // console.log(res.data.data);
            if (res.data.data.length > 0) {
              // 赋值
              let statdata = _.groupBy(res.data.data, "source");
              // console.log(statdata);
              let seriesData = [];
              // 循环对象 第一个是需要循环的对象，回调函数 只能在中间循环赋值
              // for(let i in statdata){clg(i),clg(statdata[i])}
              _.forEach(statdata, (value, key) => {
                seriesData.push({
                  name: key,
                  value: value.length,
                });
              });
              // console.log(seriesData);
              let option = {
                legend: {},
                series: [
                  {
                    type: "pie",
                    radius: ["10%", "60%"],
                    center: ["50%", "50%"],
                    roseType: "radius",
                    itemStyle: {
                      borderRadius: 1,
                    },

                    data: seriesData,
                  },
                ],
              };
              myChart.setOption(option);
              //   console.log(myChart);
              myChart.hideLoading();
            }
          } else {
            myChart.showLoading({ text: "暂无数据" });
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
  padding: 10px;
  background-color: #fff;
  .pie1 {
    height: 300px;
    width: 100%;
  }
}
</style>