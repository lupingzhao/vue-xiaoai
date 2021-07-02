<template>
  <div class="flex jcsb m-tb-10">
    <div class="flex headBox jcsb">
      <div>
        <i class="iconfont icon-dilanxianxingiconyihuifu_huabanfuben"></i>
      </div>
      <div>
        <div class="title1">New Visits</div>
        <div>
          <countTo
            :startVal="0"
            :endVal="datas.visits"
            :duration="3000"
          ></countTo>
        </div>
      </div>
    </div>
    <div class="flex headBox jcsb">
      <div>
        <i class="iconfont icon-icon-"></i>
      </div>
      <div>
        <div class="title1">messages</div>
        <div class="title2">
          <countTo
            :startVal="0"
            :endVal="datas.messages"
            :duration="3000"
          ></countTo>
        </div>
      </div>
    </div>
    <div class="flex headBox jcsb">
      <div>
        <i class="iconfont icon-qian"></i>
      </div>
      <div>
        <div class="title1">purchases</div>
        <div class="title2">
          <countTo
            :startVal="0"
            :endVal="datas.purchases"
            :duration="3000"
          ></countTo>
        </div>
      </div>
    </div>
    <div class="flex headBox jcsb">
      <div>
        <i class="iconfont icon-gouwuche"></i>
      </div>
      <div>
        <div class="title1">shopping</div>
        <div class="title2">
          <countTo
            :startVal="0"
            :endVal="datas.shopping"
            :duration="3000"
          ></countTo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import countTo from "vue-count-to";
export default {
  name: "",
  props: {},
  data() {
    return {
      datas: "",
    };
  },
  components: { countTo },
  methods: {
    // 请求数据
    getData() {
      axios
        .get("/api/homeData")
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 0) {
            this.datas = res.data.data;
            // 是一个对象
            // console.log(this.datas);
          } else {
            console.log("请求失败");
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
.headBox {
  height: 60px;
  padding: 10px 20px;
  background-color: #fff;
  flex: 1;
  margin-left: 5px;

  .iconfont {
    font-size: 40px !important;
    color: rgb(64, 130, 134);
  }
  .icon-icon- {
    color: rgb(59, 162, 244);
  }
  .icon-qian {
    color: rgb(244, 113, 135);
  }
  .icon-gouwuche {
    color: rgb(254, 186, 133);
  }
  .title1 {
    font-size: 12px;
    color: rgb(129, 126, 126);
    margin-bottom: 10px;
  }
  .title1 {
    font-size: 12px;
    color: rgb(127, 139, 175);
  }
}
</style>