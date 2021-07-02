<template>
  <div>
    <div v-if="ishow === 1">
      <el-button type="primary" size="small" @click="goBack">返回</el-button>
      <div class="box">
        <!-- 文章详情 -->

        <h1>
          {{ details.title }}
        </h1>

        <h5 class="abstract">摘要：{{ details.abstract }}</h5>
        <div class="subtitle">发布于：{{ time() }}</div>
        <div class="nr bgc-white markdown-body" v-html="details.text"></div>
      </div>
    </div>

    <div v-if="ishow === 0">
      <div>
        <h1 class="jz">页面加载中.....</h1>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      ishow: 0,
      details: "",
      id: "",
    };
  },
  components: {},
  methods: {
    // 返回
    goBack() {
      this.$router.back();
    },
    // 格式化时间
    time() {
      return dayjs(this.details.date).format("YYYY年MM月DD日HH时");
    },
    // 发请求
    getData() {
      axios
        .post("/api/article/article", {
          _id: this.id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 200) {
            this.details = res.data.data;
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getData();
    // console.log(Boolean(this.id));
    if (Boolean(this.id)) {
      this.ishow = 1;
    }
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  text-align: center;
  h1 {
    margin-bottom: 10px;
  }
  .abstract {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .jz {
    text-align: center;
    line-height: 398px;
    margin-bottom: 0;
    // transform: translateY(50%);
  }
  .subtitle {
    font-size: 12px;
    color: rgb(94, 92, 92);
  }
  .nr {
    margin-top: 20px;
    padding: 15px 10px;
  }
}
</style>