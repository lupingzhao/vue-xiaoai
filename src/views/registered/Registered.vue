<template>
  <div class="box">
    <div class="content">
      <div class="flex jcc title">欢迎来到小爱后台管理系统</div>
      <!-- 注册 -->
      <div class="m_c box1 about--input">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username" class="item1s">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="repassword">
            <el-input v-model="ruleForm.repassword" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex jcc">
        <div class="m_c box2">
          <el-button type="primary" round @click="login">立即登陆</el-button>
          <el-button type="primary" round @click="regis">立即注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 发请求
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    // 自定义的验证方法 是一个函数
    let checkRePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("重复密码不能为空"));
      } else if (value !== this.ruleForm.password) {
        return callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    let checkUsername = (rule, value, callback) => {
      let regular = /^[a-zA-Z0-9_-]{4,16}$/;
      if (regular.test(value)) {
        callback();
      } else {
        return callback(
          new Error("用户名应为4到16位字符（字母，数字，下划线，减号）")
        );
      }
    };
    return {
      // 需要验证的内容
      ruleForm: {
        username: "",
        password: "",
        repassword: "",
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          // 自定义验证方法

          {
            validator: checkUsername,
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 7,
            message: "长度大于6个字符",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "重复密码不能为空", trigger: "blur" },
          // 自定义验证
          {
            validator: checkRePassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    // 注册
    regis() {
      this.$refs.ruleForm.validate((valid) => {
        // valid是个布尔值 如果是true 就代表表单验证通过 false没用过
        if (valid) {
          // 调用请求数据
          this.getData();
        } else {
          this.$message.error("表单填写有误,请检查");
        }
      });
    },

    // 发请求
    getData() {
      // console.log(this.ruleForm.username);
      axios
        .post("/api/user/register", {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
        })
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code === 200) {
            this.$router.push("/Login");
            this.$message.success("登陆成功");
          } else {
            this.$message.error("用户已存在");
          }
        })
        .catch((err) => {
          console.log("请求错误", err);
        });
      this.ruleForm.username = null;
      this.ruleForm.password = null;
      this.ruleForm.repassword = null;
    },

    login() {
      this.$router.push("/Login");
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  background-color: rgb(152, 173, 189);
  height: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 500px;
    border-radius: 10px;
    padding: 50px;
    background-color: whitesmoke;
  }
  .box1 {
    width: 500px;
  }
  .title {
    margin-bottom: 20px;
    font-size: 20px;
  }
}
</style>