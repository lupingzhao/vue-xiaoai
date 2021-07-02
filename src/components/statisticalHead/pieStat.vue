<template>
  <div class="box">
    <div class="box1" ref="pie"></div>
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
            // console.log(res.data.data);
            let data = res.data.data;
            // 获取dom
            let myChart = echarts.init(this.$refs.pie);
            // 统计
            // 第一个参数是遍历的数组，第二个参数是按照哪个键的值进行分组
            // console.log(_.groupBy(data, "category"));
            let statdata = _.groupBy(data, "category");
            // 循环赋值
            let seriesData = [];
            // 循环对象 第一个是需要循环的对象，回调函数 只能在中间循环赋值
            _.forEach(statdata, (value, key) => {
              seriesData.push({
                name: key,
                value: value.length,
              });
            });
            // console.log(seriesData);

            if (res.data.data.length > 0) {
              myChart.showLoading({ text: "加载中......" });
              let option = {
                legend: {},
                series: [
                  {
                    type: "pie",
                    radius: "50%",
                    data: seriesData,
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 1.5)",
                      },
                    },
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
    // console.log(_.countBy(["one", "2", "1"], "length"));
    // 每个字符串的长度
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  flex: 1;
  padding: 10px;
  margin-right: 20px;
  background-color: #fff;
  .box1 {
    height: 300px;
    width: 100%;
  }
}
</style>