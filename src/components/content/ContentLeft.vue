<template>
  <el-row class="about--left">
    <el-col :span="24">
      <!-- router布尔值 让index的值为路径 -->
      <!-- :default-active="$route.path" -->
      <el-menu
        router
        :default-active="$route.meta.index"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">
          <i class="iconfont icon-dingwei"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/Published">
          <i class="iconfont icon-wancheng"></i>
          <span slot="title">已发布</span>
        </el-menu-item>
        <el-menu-item index="/Statistical">
          <i class="iconfont icon-tongji"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-menu-item index="/Release">
          <i class="iconfont icon-yifabu"></i>
          <span slot="title">发表文章</span>
        </el-menu-item>
        <el-menu-item index="/Label">
          <i class="iconfont icon-bianqian-"></i>
          <span slot="title">标签页</span>
        </el-menu-item>
        <el-menu-item index="/Excel">
          <i class="iconfont icon-chenggong"></i>
          <span slot="title">导出exce</span>
        </el-menu-item>
        <el-menu-item index="/ImgUpload">
          <i class="iconfont icon-dingwei"></i>
          <span slot="title">上传图片</span>
        </el-menu-item>
        <el-menu-item index="/LogOut">
          <i class="iconfont icon-shezhi"></i>
          <span slot="title">退出系统</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.iconfont {
  padding-right: 5px;
}
</style>