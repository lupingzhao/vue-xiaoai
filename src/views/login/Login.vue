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
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username" class="item1s">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <div class="flex">
            <el-form-item label="输入验证码" prop="recode">
              <el-input v-model="ruleForm.recode"></el-input>
            </el-form-item>
            <div class="recode m-l-15" v-html="recode1" @click="click"></div>
          </div>
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
          new Error("用户名应为（字母，数字，下划线，减号）字符")
        );
      }
    };
    return {
      recode1: "",

      // 表单验证变量
      ruleForm: {
        username: "",
        password: "",
        // 验证码
        recode: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 4,
            max: 8,
            //  "/^[a-zA-Z0-9_-]{4,16}$/",
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
          {
            validator: checkUsername,
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 7,
            message: "密码长度大于6个字符",
            trigger: "blur",
          },
          {
            validator: checkRePassword,
            trigger: "blur",
          },
        ],
        recode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  components: {},
  methods: {
    // 登陆
    login() {
      axios
        .post("/api/user/login", {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          code: this.ruleForm.recode,
        })
        .then((res) => {
          // console.log(res.data);
          //里面有登陆时间
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            // 跳转页面 传递参数
            // console.log(res.data.data[0].date);
            let obj = {
              time: res.data.data[0].date,
              user: this.ruleForm.username,
            };
            // 转换
            let obj1 = JSON.stringify(obj);
            // 对象参数
            this.$router.push("/");
            console.log("hhhh");
            // 本地储存用户
            localStorage.setItem("obj1", obj1);
          } else {
            this.$message.error(res.data.message + "请重新输入");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 注册
    regis() {
      this.$router.push("/Registered");
    },
    // 请求验证码
    getRecode() {
      axios
        .get("/api/captcha")
        .then((res) => {
          // console.log(res.data);
          this.recode1 = res.data;
        })
        .catch((err) => {
          console.log("请求错误", err);
        });
    },
    // 点击换验证码
    click() {
      this.getRecode();
    },
  },
  mounted() {
    this.getRecode();
  },
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
  .recode {
    height: 50px;
    margin-bottom: 22px;
  }
}
</style>