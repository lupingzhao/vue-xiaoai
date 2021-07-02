<template>
  <div class="c">
    <el-container>
      <el-header>
        <!-- 顶部 -->
        <Head></Head>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <!-- 左侧内容 -->
          <ContentLeft></ContentLeft>
        </el-aside>

        <!-- 右侧内容 -->
        <el-main class="pos-rel box">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ContentLeft from "../../components/content/ContentLeft";
import Head from "../../components/head/Head.vue";

export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { Head, ContentLeft },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.c {
  margin: auto;

  width: 1280px;

  header {
    background-color: rgb(46, 94, 133);
  }
  .box {
    background-color: rgb(240, 242, 245);
  }
  .boxLeft {
    background-color: rgb(84, 92, 100);
  }
  .about--menu {
    * {
      margin: 0;
      padding: 0;
    }
    background-color: rgb(84, 92, 100);
  }
}
</style>