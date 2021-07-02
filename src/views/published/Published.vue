<template>
  <div>
    <!--已发布列表页  -->
    <div>
      <el-table :data="tableDataPage" style="width: 100%" align="center" border>
        <el-table-column label="#" type="index" align="center">
          <!-- <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="标题" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" align="center" width=" ">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类目" align="center">
          <template slot-scope="scope">
            <el-tag :type="type[scope.$index]">
              {{ scope.row.category }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="来源" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.source }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重要性" align="center" width="160">
          <template slot-scope="scope">
            <el-rate
              v-model="value1[scope.$index]"
              disabled
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ time[scope.$index] }}</span>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEditList(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteList(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="toView(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="m-tb-10">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      isShow: 1,
      // 默认显示第几页
      currentPage: 1,
      //所有数据
      tableData: [],
      // 显示数据
      tableDataPage: [],
      // value: "",
    };
  },
  components: {},
  methods: {
    // 改变显示页数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // console.log(val);
      this.currentPage = val;
      // 拆分显示数据
      this.tableDataPage = this.tableData.slice(
        (this.currentPage - 1) * 10,
        (this.currentPage - 1) * 10 + 10
      );
    },
    getData() {
      axios
        .get("/api/article/allArticle")
        .then((res) => {
          if (res.data.code === 200) {
            console.log(res.data);
            // 所有数据
            this.tableData = res.data.data;
            // 拆分显示数据
            this.tableDataPage = this.tableData.slice(
              (this.currentPage - 1) * 10,
              (this.currentPage - 1) * 10 + 10
            );
          } else {
            console.log("请求失败");
          }
        })
        .catch((err) => {
          console.log("请求错误", err);
        });
    },
    // 拆分每页显示个数
    // getPageData(a, b) {
    // a代表下标 b代表每页要显示的条数
    //   let start = (b - 1) * b;
    //   let end = start + b;
    //   this.tableDatapage = this.tableData.slice(start, end);
    // },

    // 编辑
    handleEditList(index, row) {
      // console.log(index, row);
      // 跳转页面
      // console.log(row._id);
      this.$router.push({
        path: "/Editor",
        // 传参
        query: {
          title: row.title,
          abstract: row.abstract,
          author: row.author,
          category: row.category,
          source: row.source,
          star: row.star,
          text: row.text,
          date: row.date,
          id: row._id,
        },
      });
    },
    // 删除
    handleDeleteList(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .post("/api/article/delete", {
              _id: row._id,
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getData();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查看
    toView(index, row) {
      this.$router.push({
        // 传递当前点击的文章标题的id 在接受页用id发请求
        path: "/Details",
        query: {
          id: row._id,
        },
      });
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    // 标签颜色
    type() {
      // console.log(this.tableData);
      // 接受标签的类型
      let type1 = "";
      return this.tableData.map((a) => {
        if (a.category === "React") {
          return (type1 = "info");
        } else if (a.category === "性能优化") {
          return (type1 = "success");
        } else if (a.category === "JavaScript") {
          return (type1 = "warning");
        } else if (a.category === "Vue") {
          return (type1 = "success");
        }
      });
    },
    // 格式化时间
    time() {
      return this.tableData.map((a) => {
        if (a.date.includes("T")) {
          // console.log(dayjs(a.date).format("YYYY年MM月DD日HH时mm分ss秒"));
          return dayjs(a.date).format("YYYY年MM月DD日HH时mm分ss秒");
        } else {
          return a.date;
        }
      });
    },
    //重要性
    value1() {
      return this.tableData.map((a) => {
        return Number(a.star);
      });
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
// .bgc{
// background-color: #ff9900;
// }
</style>