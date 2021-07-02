<template>
  <div>
    <!-- 发表文章 -->
    <div class="head">
      <el-button type="danger" size="mini" @click="submit"> 发布</el-button>
      <el-button type="primary" size="mini">查看</el-button>
    </div>
    <div class="m-tb-25">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="">
          <el-form-item label="文章标题" prop="title" required>
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="文章摘要" prop="abstract" required>
            <el-input v-model="ruleForm.abstract"></el-input>
          </el-form-item>
        </div>
        <div class="flex box1">
          <el-form-item label="作者" prop="author" required class="label">
            <el-input v-model="ruleForm.author"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="类目" prop="category" class="label" required>
              <el-select v-model="ruleForm.category" placeholder="类目">
                <el-option label="Vue" value="Vue"></el-option>
                <el-option label="React" value="React"></el-option>
                <el-option label="Node.js" value="Node.js"></el-option>
                <el-option label="性能优化" value="性能优化"></el-option>
                <el-option label="JavaScript" value="JavaScript"></el-option>
                <el-option label="小程序" value="小程序"></el-option>
                <el-option label="工具类" value="工具类"></el-option>
                <el-option label="其他" value="其他s's"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="来源" prop="source" class="label" required>
              <el-select v-model="ruleForm.source" placeholder="来源">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="转载" value="转载"></el-option>
                <el-option label="与他人合作" value="与他人合作"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="重要性" prop="star" class="label" required>
              <el-select v-model="ruleForm.star" placeholder="重要性">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="发布时间">
              <el-date-picker
                type="datetime"
                placeholder="选择日期"
                v-model="date"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="markdown-container">
        <div class="container">
          <mavon-editor v-model="text" ref="md" style="min-height: 600px" />
          <div class="flex">
            <el-button
              class="editor-btn sumit-btn"
              type="primary"
              @click="submit"
              >发布</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      text: "",
      // html: "",
      // configs: {},
      date: null,
      ruleForm: {
        title: "",
        abstract: null,
        author: null,
        category: null,
        source: null,
        star: null,
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        abstract: [
          {
            required: true,
            message: "请输入摘要",
            trigger: "blur",
          },
        ],
        author: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            message: "请输入类目",
            trigger: "blur",
          },
        ],
        source: [
          {
            required: true,
            message: "请输入来源",
            trigger: "blur",
          },
        ],
        star: [
          {
            required: true,
            message: "请输入星际",
            trigger: "blur",
          },
        ],
        date: [
          {
            required: true,
            message: "请输入发布时间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    getdata() {
      //将下面上传接口替换为你自己的服务器接口
      axios
        .post("/api/article/create", {
          title: this.ruleForm.title,
          abstract: this.ruleForm.abstract,
          author: this.ruleForm.author,
          category: this.ruleForm.category,
          source: this.ruleForm.source,
          star: this.ruleForm.star,
          text: this.text,
          date: this.date,
        })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交
    submit() {
      console.log(this.date);
      this.$refs.ruleForm.validate((valid) => {
        // valid是个布尔值 如果是true 就代表表单验证通过 false没用过
        if (valid) {
          // 调用请求数据
          // console.log(Boolean(this.date));

          if (this.text && this.date) {
            this.getdata();

            this.$message.success("提交成功！");
            this.$router.push("/Published");
          } else {
            this.$message.error("请输入内容或选择时间");
          }
        } else {
          this.$message.error("有必填项未输入");
        }
      });
      // console.log(this.text);
      // console.log(this.html);
    },
    // 时间格式转换
  },

  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  text-align: right;
  padding: 5px;
  background-color: rgb(89, 165, 134);
}
.markdown-container {
  .container {
    max-width: 100%;
  }
}
.sumit-btn {
  margin: 10px auto 0;
}
</style>