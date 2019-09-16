<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-image :src="url" :fit="fit"></el-image>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的简历</el-dropdown-item>
            <el-dropdown-item command="forgetPass" divided>忘记密码</el-dropdown-item>
            <el-dropdown-item command="gotoHome">返回首页</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeIndex" @select="handleSelect">
            <el-menu-item index="1">
              <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">标签管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">分类管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      dialogVisible: false,
      ruleForm: {
        pass: ""
      },
      rules: {
        pass: [{ required: true, message: "请输入密码", trigger: "change" }]
      },
      url: require("../assets/logo.png"),
      fit: "contain"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand(command) {
      if (command === "gotoHome") {
        this.$router.push({
          path: "/"
        });
      } else if (command === "forgetPass") {
        localStorage.removeItem("passSave");
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #303848;
  color: #fff;
}
.link {
  color: #fff;
  padding: 0 20px;
  float: right;
}
.el-aside {
  background-color: #fff;
  color: #000;
  text-align: center;
}
.el-main {
  background-color: #fff;
  width: 100%;
  color: #303133;
}
.el-container {
  height: 100vh;
}
.el-menu {
  height: 100%;
}
.el-image {
  float: left;
  width: 100px;
  margin: 0 50px 0 30px;
  height: 60px;
}
.el-dropdown {
  float: right;
  position: relative;
  top: 8px;
}
</style>
