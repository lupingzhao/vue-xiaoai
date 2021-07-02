<template>
  <div class="box">
    <div class="flex jcsb head">
      <div>
        <i class="iconfont icon-xiala-copy" v-if="n"></i>
        <i class="iconfont icon-xiala" v-else></i>
      </div>
      <div>ToDOList</div>
    </div>
    <!-- list -->
    <div class="list1">
      <!-- 全部代做 -->
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="check flex jcsb">
          <div>
            <input
              type="checkbox"
              :checked="item.checked"
              @click="check(index)"
            />{{ item.title }}
          </div>

          <div class="del" @click="del(item.title, index)">x</div>
        </div>
      </div>
    </div>
    <!-- 进行中 -->

    <!-- foot -->
    <div class="flex jcsb foot">
      <div>{{ todo }} item list</div>
      <button @click="all">all</button>
      <div class="flex">
        <div class="foot1 shou" @click="click(false)" ref="aticve">aticve</div>
        <div class="shou" @click="click(true)" ref="complete">complete</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      n: true,
      list: [
        {
          title: "star this repository",
          checked: true,
          id: 1,
        },
        {
          title: "fork this repository",
          checked: false,
          id: 2,
        },
        {
          title: "follow author",
          checked: true,
          id: 3,
        },
        {
          title: "vue-admin",
          checked: false,
          id: 4,
        },
        {
          title: "vue",
          checked: true,
          id: 5,
        },
        {
          title: "element-ui",
          checked: false,
          id: 6,
        },
        {
          title: "axios",
          checked: true,
          id: 7,
        },
        {
          title: "webpack",
          checked: true,
          id: 8,
        },
      ],
      list1: [],
      c: "",
    };
  },
  components: {},
  methods: {
    // 双向绑定选中状态
    check(i) {
      this.list[i].checked = !this.list[i].checked;
      console.log(this.list[i].checked);
      console.log(1212132);
    },
    // 切换显示
    click(val, a) {
      // this.check();
      // 添加样式
      if (val) {
        this.$refs.complete.classList.add("border");
        this.$refs.aticve.classList.remove("border");
      } else {
        this.$refs.aticve.classList.add("border");
        this.$refs.complete.classList.remove("border");
      }
      this.list = this.list1;
      this.list = this.list.filter((a) => {
        return a.checked === val;
      });
    },
    // del 删除全部的
    del(item, index) {
      console.log(item);
      // this.list.splice(index, 1);
      // 过滤掉删除的
      this.list1 = this.list1.filter((a) => {
        return a.title !== item;
      });
      // 当前显示页删除相应的下标
      this.list.splice(index, 1);
    },
    // 全部
    all() {
      this.list = this.list1;
    },
  },
  mounted() {
    // 将原数组赋给中间变量
    this.list1 = this.list;
  },
  computed: {
    todo() {
      return this.list1.filter((a) => {
        return !a.checked;
      }).length;
    },
    // todolist() {
    //   if (this.aticve === "aticve") {
    //     return this.list.filter((a) => {
    //       return !a.checked;
    //     });
    //   } else if (this.aticve === "complete") {
    //     return this.list.filter((a) => {
    //       return a.checked;
    //     });
    //   } else {
    //     return this.list;
    //   }
    // },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  flex: 1;
  padding: 5px;
  margin: 0 5px;
  height: 100%;
  background-color: #fff;
  .head {
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
  }
  .list1 {
    height: 80%;
    > div {
      height: 10%;
    }
    input {
      margin-right: 10px;
    }
    .check {
      height: 100%;
    }
  }
  .foot {
    padding-top: 10px;
    border-top: 1px solid #eee;
    .foot1 {
      margin-right: 5px;
    }
  }
  .shou {
    padding: 2px;
    &:hover {
      color: aqua;
    }
  }
  .item {
    padding: 0 10px;
    .del {
      display: none;
    }

    &:hover {
      background-color: #eee;

      .del {
        color: red;
        display: inline-block;
      }
    }
  }
  .border {
    border: 1px solid black;
  }
  .color {
    color: aqua;
  }
}
</style>