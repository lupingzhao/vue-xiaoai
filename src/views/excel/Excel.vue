<template>
  <div>
    <!-- 导出表格 -->
    <div class="ipt">
      <el-input
        v-model="input"
        placeholder="请输入您想要搜索的商品名称"
        @input="ipt"
      ></el-input>
    </div>

    <div class="block">
      <!-- 显示数据 -->
      <div class="tab-date">
        <el-table :data="tableData1" style="width: 100%" align="center">
          <el-table-column label="商品名称" width="400" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品编号" width="180" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" align="center">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.GOODS_SERIAL_NUMBER }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="原价" width="120" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" align="center">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.ORI_PRICE }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="现价" width="120" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top" align="center">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.PRESENT_PRICE }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 下载按钮 -->
      <div class="foot-btn flex">
        <download-excel
          class="btn btn-default"
          :data="tabledata"
          header="这是个excel的头部"
          name="商品明细.xls"
        >
          <div><el-button type="primary">导出excel</el-button></div>
        </download-excel>

        <download-excel
          :data="table"
          type="csv"
          header="这是个excel的头部"
          name="商品明细.xls"
        >
          <div><el-button type="danger">导出csv</el-button></div>
        </download-excel>
      </div>

      <!-- 编辑弹框 -->
      <div class="tk">
        <el-dialog
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <div>
            名称：
            <input type="text" v-model="text1" />
          </div>
          <div>
            原价：
            <input type="numbel" v-model="pirce1" />
          </div>
          <div>
            现价：
            <input type="text" v-model="pirce2" />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editSure">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";

export default {
  name: "",
  props: {},
  data() {
    return {
      input: null,
      total: null,

      //默认显示第几页
      currentPage1: 1,
      page: null,
      // 原数组
      table: [],
      //  拆分数组
      table1: [],
      // 显示数组
      tableData1: [],
      // 控制弹框是否显示
      dialogVisible: false,
      editIndex: -1,
      text1: "",
      pirce1: "",
      pirce2: "",
    };
  },
  components: {},
  methods: {
    // 当前点击页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // val 是页码数  但是显示的数组比页码小1
      this.currentPage1 = val;
      this.tableData1 = this.table1[val - 1];
    },

    // 请求数据
    getData() {
      axios
        .get("/api/tableData")
        .then((res) => {
          // console.log(res.data);
          if (res.data.code === 0) {
            // chunk拆分数组;
            this.table = res.data.data;
            this.total = this.table.length;
            this.table1 = lodash.chunk(res.data.data, 10);
            this.tableData1 = this.table1[0];
            // console.log(this.tableData1);
          }
        })
        .catch((err) => {
          console.log("请求错误", err);
        });
    },

    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      this.text1 = row.NAME;
      this.editIndex = index;
      this.pirce1 = row.ORI_PRICE;
      this.pirce2 = row.PRESENT_PRICE;
      this.dialogVisible = true;
    },
    // 编辑的确定
    editSure() {
      console.log(this.tableData1[this.editIndex]);
      this.tableData1[this.editIndex].NAME = this.text1;
      this.tableData1[this.editIndex].ORI_PRICE = this.pirce1;
      this.tableData1[this.editIndex].PRESENT_PRICE = this.pirce2;
      this.dialogVisible = false;
    },
    // 关闭弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    // 操作删除
    handleDelete(index, row) {
      // console.log(this.tableData1);
      console.log(index);
      this.$confirm("此操作将永久删除该项数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData1.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 搜索
    ipt(e) {
      // var that = this;
      console.log(e);
      console.log(Boolean(e === ""));
      if (Boolean(e !== "")) {
        console.log("true0-==--");
        this.tableData1 = this.table.filter((a) => {
          // console.log(e);
          return a.NAME.includes(e);
        });
        this.total = this.tableData1.length;
      } else {
        console.log("false-==--");
        this.tableData1 = this.table1[0];
        this.total = this.table.length;
        console.log(this.total);
        console.log(1111);
        console.log("false-==--");
      }
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    // 下载当前显示页面
    tabledata() {
      let a = this.currentPage1 - 1;
      // console.log(this.table1[a]);
      return this.table1[a];
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.ipt {
  width: 250px;
}
.tab-date {
  margin: 15px 0;
}
.tk {
  input {
    width: 230px;
    height: 30px;
    margin: 10px;
  }
}
.foot-btn {
  margin-top: 15px;
  div {
    margin-right: 10px;
  }
}
</style>