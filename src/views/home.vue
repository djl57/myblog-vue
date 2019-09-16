<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-image :src="url" :fit="fit"></el-image>
        <el-link :underline="false" href="#" target="_blank" class="link">分类1</el-link>
        <el-link :underline="false" href="#" target="_blank" class="link">分类2</el-link>
        <el-link :underline="false" href="#" target="_blank" class="link">分类3</el-link>
        <el-link :underline="false" href="#" target="_blank" class="link">分类4</el-link>
        <el-link :underline="false" target="_blank" @click="gotoManagePage" class="link">管理博客</el-link>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeIndex" @select="handleSelect">
            <el-menu-item index="1">
              <span slot="title">标签1</span>
            </el-menu-item>
            <el-menu-item index="2">
              <span slot="title">标签1</span>
            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">标签1</span>
            </el-menu-item>
            <el-menu-item index="4">
              <span slot="title">标签1</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <li class="article">
            <p class="float-left">博文标题博文标题</p>
            <p class="float-right">2019.09.09</p>
          </li>
          <li class="article">
            <p class="float-left">博文标题博文标题</p>
            <p class="float-right">2019.09.09</p>
          </li>
          <li class="article">
            <p class="float-left">博文标题博文标题</p>
            <p class="float-right">2019.09.09</p>
          </li>
          <li class="article">
            <p class="float-left">博文标题博文标题</p>
            <p class="float-right">2019.09.09</p>
          </li>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      title="身份验证"
      :visible.sync="dialogVisible"
      width="350px"
      :before-close="done=> done()"
    >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="55px">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          <el-checkbox v-model="checked">下次自动验证</el-checkbox>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
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
      fit: "contain",
      checked: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm.pass);
          if (this.ruleForm.pass === "1234567") {
            if (this.checked) {
              localStorage.setItem("passSave", 1);
            }
            this.dialogVisible = false;
            this.$router.push({
              path: "/manageBlog"
            });
          } else {
            this.$message.error("密码错误!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    gotoManagePage() {
      if (localStorage.getItem("passSave")) {
        this.$router.push({
          path: "/manageBlog"
        });
      } else {
        this.dialogVisible = true;
        this.$nextTick(() => {
          this.resetForm("ruleForm");
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #303848;
  color: #fff;
  line-height: 58px;
}
.link {
  color: #fff;
  padding: 0 20px;
  &:last-child {
    float: right;
  }
}
.el-aside {
  background-color: #fff;
  color: #000;
  text-align: center;
}
.el-main {
  background-color: #fff;
  line-height: 40px;
  width: 100%;
  color: #303133;
  padding: 20px 40px;
}
.el-menu-item,
.el-submenu__title {
  line-height: 40px;
  height: 40px;
}
.el-container {
  height: 100vh;
}
.el-menu {
  height: 100%;
}
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
/deep/ .el-form-item {
  margin-bottom: 0;
}
.el-image {
  float: left;
  width: 100px;
  margin: 0 50px 0 30px;
  height: 60px;
}
.float-left {
  float: left;
  width: 60%;
}
.float-right {
  float: right;
}
.article {
  cursor: pointer;
}
</style>
