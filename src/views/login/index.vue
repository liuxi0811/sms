<template>
  <div class="login-container">
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">登录</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        |
        <a href="#/register">点击注册</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入有效账号", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入有效密码", trigger: "blur" },
        ],
      },
    };
  },

  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.form.username, this.form.password).then((response) => {
            const resp = response.data;
            console.log(resp);
            if (resp.flag) {
              getUserInfo(resp.data.token).then((response) => {
                const respUser = response.data;
                if (respUser.flag) {
                  // 将信息保存到浏览器的 localStorage 中
                  localStorage.setItem(
                    "sms-user",
                    JSON.stringify(respUser.data)
                  );
                  // 方便后面重新验证
                  localStorage.setItem("sms-token", resp.data.token);
                  // 前往首页
                  this.$router.push("/");
                } else {
                  // 获取信息失败, 弹出警告
                  this.$message({
                    message: respUser.message,
                    type: "warning",
                  });
                }
              });
            } else {
              // 获取信息失败, 弹出警告
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error Submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../../assets/bg.jpg");
  background-size: cover;
}
.login-title {
  text-align: center;
  color: #303133;
}
</style>