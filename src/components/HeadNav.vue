<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item index="/">
      <i class="el-icon-aim"></i>{{ $t("message.project") }}</el-menu-item
    >
    <el-menu-item index="/params"
      ><i class="el-icon-paperclip"></i>{{ $t("message.params") }}</el-menu-item
    >
    <el-menu-item index="/adv"
      ><i class="el-icon-connection"></i
      >{{ $t("message.content") }}</el-menu-item
    >
    <div class="user">
      <router-link to="/user" tag="span" class="user-name">
        {{ user.username }}
      </router-link>
      <el-button class="logout" @click="logOutHandle">退出登录</el-button>
    </div>
    <el-menu-item class="set-lang">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          语言环境
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">英文</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "HeadNav",
  data() {
    return {
      activeIndex: "/",
    };
  },
  computed: {
    ...mapState("LoginModule", {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapMutations("LoginModule", ["clearUser"]),
    handleSelect(key, keyPath) {},
    logOutHandle() {
      this.clearUser();
      this.$router.push("/login");
      localStorage.removeItem("userInfo");
    },
    handleCommand(command) {
      console.log(command);
      this.$i18n. locale=command
      localStorage.setItem("lang",command)
    },
  },
};
</script>

<style>
</style>