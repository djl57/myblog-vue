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
            <el-dropdown-item command="myIntro">我的简历</el-dropdown-item>
            <el-dropdown-item command="gotoHome" divided>返回首页</el-dropdown-item>
            <el-dropdown-item command="signOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeIndex" @select="handleSelect">
            <el-menu-item v-for="side in sides" :key="side.name" :index="side.name">
              <span slot="title">{{side.meta.title}}</span>
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
      activeIndex: this.$route.name,
      dialogVisible: false,
      ruleForm: {
        pass: ""
      },
      rules: {
        pass: [{ required: true, message: "请输入密码", trigger: "change" }]
      },
      url: require("../assets/logo.png"),
      fit: "contain",
      sides: []
    };
  },
  created() {
    const routes = this.$router.options.routes;
    const sides = routes.filter(route => route.path === "/manageBlog");
    if (sides && sides.length === 1) {
      this.sides = sides[0].children.filter(side => side.meta.isSide);
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({ name: key });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCommand(command) {
      if (command === "myIntro") {
        this.$router.push({
          name: "myIntro"
        });
        return;
      }
      if (command === "signOut") {
        localStorage.removeItem("passSave");
        localStorage.removeItem("curArticleDetailId");
      }
      if (command === "gotoHome") {
        localStorage.removeItem("curArticleDetailId");
      }
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
}
.link {
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
  position: relative;
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
