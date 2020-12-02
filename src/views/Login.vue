<template>
  <div class="login-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
      <el-tab-pane label="登录" name="login"
        >登录模块
        <el-card class="box-card">
          <el-form
            :model="user"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="user.username"
                autocomplete
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="user.password"
                autocomplete
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="loginForm('user')"
              >提交</el-button
            >
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <!-- 注册模块 -->
        <el-card class="box-card">
          <el-form
            :model="user"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="user.username"
                autocomplete
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="user.password"
                autocomplete
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="surePassword">
              <el-input
                type="password"
                v-model="user.surePassword"
                autocomplete
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                type="email"
                v-model="user.email"
                autocomplete
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="RegForm('user')"
              >提交</el-button
            >
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../api";
import { mapMutations } from "vuex";
import jwt from "jwt-decode";
export default {
  name: "Login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      }
      callback();
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      }
      callback();
    };
    return {
      activeName: "login",
      user: {
        username: "",
        password: "",
        surePassword: "",
        email: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("LoginModule", ["setUser"]),
    handleClick(key) {
     // console.log(key.name);
      //点击登录输出login
      //点击注册输出register
    },
   loginForm() {
      console.log(this.activeName);
      if(this.activeName=="login"){
        //登录
        api.getLogin({
          username: this.user.username,
          password: this.user.password,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.setUser({
              username: jwt(res.data).username,
              token: res.data,
            });
            //写入本地数据
            localStorage.setItem("userInfo",res.data)
             this.$router.push("/")
          } 
         
        })
        .catch(err=>{
            console.log(err);
            this.$message({
          message: err.data.errors,
          type: 'error'
        });
        })
      }//else 注册
      
    },
    RegForm(){
      console.log("zhuce1");
      api.getRegister({
        username:this.user.username,
        password:this.user.password,
        email:this.user.email
      }).then(res=>{
        console.log(res);
        if(res.status==200){//注册成功
          this.$message({
          message:res.data.msg,
          type: 'success'
        });
        }
      }).catch(err=>{
        console.log(err);
         this.$message({
          message:res.data.msg,
          type: 'error'
        });
      })
    }
  },
};
</script>

<style>
</style>