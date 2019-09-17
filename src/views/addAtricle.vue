<template>
  <div>
    <el-header>
      <el-page-header @back="goBack" content="添加文章"></el-page-header>
      <el-button type="primary">发布</el-button>
    </el-header>
    <el-main>Main</el-main>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push({ path: "/manageBlog" });
    }
  }
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #303848;
  color: #fff;
}
.el-page-header {
  float: left;
  line-height: 60px;
}
/deep/ .el-page-header__content {
  color: #fff;
}
.el-main {
  background-color: #fff;
  color: #303133;
  height: calc(100vh - 60px);
}
.el-button {
  float: right;
  margin: 12px;
}
</style>
