<template>
  <div>
    <div class="flex jcsb head font-c-w">
      <!-- 左边 -->
      <div>欢迎{{ user }}，来到小爱后台管理系统</div>
      <!-- 右边 -->
      <div class="flex">
        <div>{{ text }}{{ user }}，</div>
        <div>上次登陆时间：{{ lastLoginTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "",
  props: {},
  data() {
    return {
      user: "",
      lastLoginTime: "",
      text: "",
      h: "",
    };
  },
  components: {},
  methods: {
    siHi(a) {
      if (a >= 6 && a <= 12) {
        return (this.text = "早上好！");
      } else if (a > 12 && a <= 14) {
        this.text = "中午好！";
      } else if (a > 14 && a <= 18) {
        this.text = "下午好！";
      } else if (a > 18 && a <= 23) {
        this.text = "晚上好！";
      } else {
        this.text = "太晚了，该睡觉啦！";
      }
    },
  },
  mounted() {
    let obj = JSON.parse(localStorage.getItem("obj1"));

    // 获取用户名
    this.user = obj.user;
    let time = obj.time;

    // 获取当前小时 getHours()
    this.h = new Date().getHours();
    // 上次登陆
    this.lastLoginTime = dayjs(time).format("YYYY年MM月DD日H时mm分ss秒");

    // 招呼
    this.siHi(this.h);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  line-height: 60px;
}
</style>