<template>
  <div class="box">
    <div class="box1" ref="box1"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      // datas: null,
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/radarChat")
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 0) {
            let a = res.data.data;
            // console.log(a);
            // 活数据
            // let ss1 = [];
            // Object.keys(a[0])
            //   .slice(1)
            //   .map((item) => {
            //     ss1.push({
            //       name: item,
            //     });
            //   });
            // console.log(ss1);
            let ss2 = [];
            // a.map((item) => {
            //   console.log(item);
            //   Object.values(item).slice(1);
            //   ss2.push({
            //     value: Object.values(item).slice(1),
            //     name: item.name,
            //   });
            // });
            // console.log(ss2);
            // Sales
            let Saless = a
              .map((item) => {
                return item.sales;
              })
              .sort((a, b) => {
                return b - a;
              });
            // Admin
            // 排序取值是为了控制每个方面的最大值
            let Admin = a
              .map((item) => {
                return item.ministration;
              })
              .sort((a, b) => {
                return b - a;
              });
            // console.log(Admin);
            // marketing
            let marke = a
              .map((item) => {
                return item.marketing;
              })
              .sort((a, b) => {
                return b - a;
              });
            // delelopmer
            let delelopmer = a
              .map((item) => {
                return item.delelopmer;
              })
              .sort((a, b) => {
                return b - a;
              });
            // techology
            let techology = a
              .map((item) => {
                return item.techology;
              })
              .sort((a, b) => {
                return b - a;
              });

            // let abx = 1;
            // this.option.legend.radar.indicator = this.option.legend;
            let option = {
              color: ["rgb(29,212,175)", "rgb(90,177,239)", "rgb(250,110,134)"],
              type: "line",
              legend: {
                top: "5%",
                // 数据组
                data: [],
                // textStyle: { color: "#25c36c" },
              },
              radar: {
                // 控制底图是多边形或者圆形
                shape: "circle",
                radius: "50%",
                textstyle: [{}],

                // 每个数据不同方面 如人的身高 体重 max不同方面的最大值（固定）
                // max:以每个数据相同属性的最大那个为max的值
                indicator: [
                  { name: "Sales", max: Saless[0] },
                  { name: "Administration", max: Admin[0] },
                  {
                    name: "Information Technology",
                    max: techology[0],
                  },
                  { name: "Development", max: delelopmer[0] },
                  { name: "Marketing", max: marke[0] },
                ],
              },
              series: [
                {
                  //数据组 与legend的相同 可以不写
                  // name: "Allocated Budget vs Allocated Budget vs Actual Spending",
                  type: "radar",
                  // 每个数据不同方面的值是多少
                  data: [
                    {
                      value: Object.values(a[0]).slice(1),
                      // legend里的单个数据
                      name: "Allocated Budget",
                      //设置折线图颜色
                      // lineStyle: {},
                    },
                    {
                      value: Object.values(a[1]).slice(1),
                      // legend里的单个数据
                      name: "Expected Spending",
                      // lineStyle: {},
                    },
                    {
                      value: Object.values(a[2]).slice(1),
                      name: "Actual Spending",

                      // lineStyle: {},
                    },
                  ],
                },
              ],
            };
            // 数据组
            option.legend.data = a.map((item) => {
              return item.name;
            });
            // console.log(Object.values(a[0]).slice(1));
            // console.log(option.legend.data);
            let myChart = echarts.init(this.$refs.box1);
            myChart.setOption(option);
            // console.log(this.option.legend.data);
            // console.log(Object.values(a[1]).slice(1));
          }
        })
        .catch((err) => {
          console.log("请求错误", err);
        });
    },
  },
  mounted() {
    this.getData();
    //   获取元素
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  flex: 1;
  background-color: #fff;
  margin-top: 0;
  .box1 {
    height: 500px;
  }
}
</style>