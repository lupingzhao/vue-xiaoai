<template>
  <div class="box">
    <!-- 退出 -->
    <div class="hello">期待您下次光临！</div>
    <div>
      <el-button type="primary" round @click="logout">退出系统</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    logout() {
      // 发请求
      this.getData();
    },
    getData() {
      axios
        .get("/api/user/logout")
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 0) {
            // 清楚本地数据
            localStorage.clear();
            this.$message.info(res.data.message);
            this.$router.push("/Login");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .hello {
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>