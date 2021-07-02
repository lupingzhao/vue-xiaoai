<template>
  <div class="flex">
    <div class="box1">
      <div>今日发布</div>
      <div>{{ today.length }}</div>
      <div class="icon iconfont icon-wancheng1"></div>
    </div>

    <div class="box2">
      <div>原创文章</div>
      <div>{{ original.length }}</div>
      <div class="iconfont icon-yewubaobiao icon"></div>
    </div>

    <div class="box3">
      <div>新留言</div>
      <div>0</div>
      <i class="iconfont icon icon-tongzhi"></i>
    </div>

    <div class="box4">
      <div>新信息</div>
      <div>0</div>
      <i class="iconfont icon icon-laidian"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "",
  props: {},
  data() {
    return {
      today: [],
      original: "",
      mesg: "",
      call: "",
      datas: "",
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api//article/allArticle ")
        .then((res) => {
          if (res.data.code === 200) {
            // console.log(res.data.data);
            this.datas = res.data.data;
            // 判断是否是当天
            this.today = this.datas.filter((a) => {
              return (
                new Date().toDateString() === new Date(a.date).toDateString()
              );
            });
            // 原创
            this.original = this.datas.filter((a) => {
              return a.source === "原创";
            });
            // console.log(this.original);
            // console.log(this.today);
            // console.log(dayjs(this.datas[0].date).valueOf());
            // console.log(new Date(this.datas[15].date).toDateString());
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },

    tod() {},
  },
  mounted() {
    this.getData();
    // console.log(dayjs().valueOf());
    // console.log(new Date().toDateString());
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.flex {
  > div {
    text-align: center;
    width: 25%;
    padding: 10px 0;
    font-size: 12px;
    color: #fff;
  }
  .box1 {
    position: relative;
    background-color: rgb(124, 202, 191);
  }
  .box2 {
    position: relative;
    background-color: rgb(232, 138, 135);
  }
  .box3 {
    position: relative;
    background-color: rgb(131, 117, 163);
  }
  .box4 {
    position: relative;
    background-color: rgb(159, 206, 193);
  }
  .icon {
    position: absolute;
    right: 20px;
    bottom: 50%;
    transform: translateY(50%);
  }
}
</style>