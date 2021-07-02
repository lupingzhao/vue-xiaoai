<template>
  <div class="box">
    <div class="flex jcc img">
      <img
        src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
        alt=""
      />
    </div>

    <div class="m-t-10">
      <div
        class="about--element-jdt"
        v-for="(item, index) in data"
        :key="index"
      >
        <div>
          <div>{{ item.name }}</div>

          <el-progress
            :percentage="item.progress * 100"
            :status="status[index]"
          >
          </el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: [],
      success: "",
      prcent: "",
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/progress")
        .then((res) => {
          if (res.data.code === 0) {
            // console.log(res.data.data);
            this.data = res.data.data;
            this.prcent = this.data.map((a) => {
              return a.progress;
            });
            // console.log(this.prcent);
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
  computed: {
    //   动态绑定数据的颜色
    status() {
      return this.prcent.map((a) => {
        if (a * 100 === 100) {
          return "success";
        } else if (a * 100 < 50) {
          return "exception";
        }
      });
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  padding: 5px;
  flex: 1;
  background-color: #fff;
  height: 100%;
  justify-content: center;
  .img {
    height: 50%;
    img {
      width: 95%;
      height: 100%;
      position: center;
      // height: 250px;
    }
  }
}
</style>