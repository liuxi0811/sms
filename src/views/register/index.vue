<template>
  <div class="register-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="register-form"
    >
    <h2 class="register-title">注册</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        |
        <a href="#/login">已有账号，点击登录</a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from "@/api/login";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        checkPass: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
      },
    };
  },

  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.form.username, this.form.password,this.form.nickname).then((response) => {
            const resp = response.data;
            if (resp.flag) {
            //   前往登录页面
            this.$router.push("/login")
            } else {
              // 获取信息失败, 弹出警告
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
    .register-form{
        width: 350px;
        margin: 160px auto;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 30px;
        border-radius: 20px;
    }
    .register-container{
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background:url('../../assets/bg.jpg');
        background-size: cover;
    }
    .register-title{
        text-align: center;
        color: #303133;
    }
</style>