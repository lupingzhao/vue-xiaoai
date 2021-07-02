<template>
  <div>
    <!-- 发表文章 -->
    <div class="head">
      <div>
        <el-button class="head1" type="danger" size="mini" @click="goBack">
          返回</el-button
        >
        <el-button type="primary" size="mini" @click="submit">发布</el-button>
      </div>
    </div>
    <div class="m-tb-25">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="80px"
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
    <!-- 编辑器-->
    <div>
      <div class="markdown-container">
        <div class="container">
          <mavon-editor v-model="text" ref="md" style="min-height: 500px" />
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
      id: "",
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
      axios
        .post("/api/article/update", {
          id: this.id,
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
          if (res.data.success) {
            console.log(res.data);
            this.$message.success("提交成功！");
            this.$router.push("/Published");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        // valid是个布尔值 如果是true 就代表表单验证通过 false没用过
        if (valid) {
          // 调用请求数据
          console.log(Boolean(this.date));

          if (this.text && this.date) {
            this.getdata();
            console.log(this.date + "bbb");
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

    // 返回
    goBack() {
      this.$router.back();
    },
  },

  mounted() {
    // 接收数据
    // console.log(this.$route.query.title);
    (this.ruleForm.title = this.$route.query.title),
      // console.log(this.ruleForm.title);
      (this.ruleForm.abstract = this.$route.query.abstract),
      (this.ruleForm.author = this.$route.query.author),
      (this.ruleForm.category = this.$route.query.category),
      (this.ruleForm.source = this.$route.query.source),
      (this.ruleForm.star = this.$route.query.star),
      (this.text = this.$route.query.text),
      (this.date = this.$route.query.date);
    this.id = this.$route.query.id;
    // console.log(this.id);
    console.log(this.date + "___ 11");
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  text-align: center;
  padding: 5px;
  .head1 {
    margin-right: 100px;
  }
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