<template>
  <div class="box">
    <el-table :data="data" stripe style="width: 100%" align="center">
      <el-table-column prop="num" label="Order_ No" width="300" align="center">
      </el-table-column>
      <el-table-column prop="price" label="Price" width="80" align="center">
      </el-table-column>
      <el-table-column label="status" align="center" width="100">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.status === 0">success </el-tag>
          <el-tag type="success" v-else>pending </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  props: {},
  data() {
    return {
      data: null,
      text: "",
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/orderData")
        .then((res) => {
          if (res.data.code === 0) {
            // console.log(res.data.data);
            this.data = res.data.data;
          }
        })
        .catch((err) => {
          console.log("请求错误", err);
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
.box {
  flex: 2;
  padding: 5px;
  background-color: #fff;
  height: 100%;
}
</style>