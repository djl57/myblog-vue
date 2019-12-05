<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-image :src="url" :fit="fit"></el-image>
        <el-link
          v-for="item in catagory"
          :key="item.id"
          :underline="false"
          :class="curCatagoryId === item.id?'catagory-active':'link'"
          @click="clickCatagory(item.id)"
        >{{item.name}}</el-link>
        <el-link :underline="false" target="_blank" @click="gotoManagePage" class="link">管理博客</el-link>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- <span>头像+介绍</span> -->
        </el-aside>
        <el-main v-loading="articleLoading">
          <li class="article" v-for="item in articles" :key="item.id" @click="clickArticle(item)">
            <p class="title">- {{item.title}}</p>
            <p class="tag">
              <el-tag v-for="(t, index) in item.tagName" :key="t" :type="getType(index)">{{t}}</el-tag>
            </p>
            <p class="date">{{item.createTime}}</p>
          </li>
          <article-detail
            v-if="showArticleDetail"
            class="detail"
            :detail="articleDetailId"
            @closeDetail="closeDetail"
          ></article-detail>
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
import ArticleDetail from "./articleDetail";
import { GetCatagorys, GetArticles } from "../api";
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
      checked: true,
      catagory: [],
      curCatagoryId: 1,
      articleLoading: false,
      articles: [],
      articleDetailId: null,
      showArticleDetail: localStorage.getItem("curArticleDetailId")
    };
  },
  components: { ArticleDetail },
  created() {
    this.getCatagory();
  },
  methods: {
    getCatagory() {
      GetCatagorys().then(({ code, data }) => {
        if (code === "200") {
          this.catagory = data;
          if (data.length > 0) {
            this.curCatagoryId = data[0].id;
            this.getArticles();
          }
        }
      });
    },
    getArticles() {
      this.articleLoading = true;
      GetArticles({
        catagory: this.curCatagoryId,
        pageSize: 9999,
        pageNum: 1
      }).then(res => {
        console.log(res);
        if (res.code === "200") {
          this.articles = res.data;
          this.articleLoading = false;
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getType(index) {
      const colorList = ["success", "info", "warning", "danger"];
      return colorList[index];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.ruleForm.pass);
          if (this.ruleForm.pass === "1234567") {
            if (this.checked) {
              localStorage.setItem("passSave", 1);
            }
            this.dialogVisible = false;
            localStorage.removeItem("curArticleDetailId");
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
        localStorage.removeItem("curArticleDetailId");
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
    },
    clickCatagory(id) {
      this.curCatagoryId = id;
      this.getArticles();
    },
    clickArticle(article) {
      localStorage.setItem("curArticleDetailId", article.id);
      this.articleDetailId = article.id;
      this.showArticleDetail = localStorage.getItem("curArticleDetailId");
    },
    closeDetail() {
      localStorage.removeItem("curArticleDetailId");
      this.showArticleDetail = localStorage.getItem("curArticleDetailId");
    }
  }
};
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #fff;
  line-height: 58px;
  border-bottom: 1px solid #dcdfe6;
}
.link {
  padding: 0 20px;
  &:last-child {
    float: right;
  }
}
.catagory-active {
  padding: 0 20px;
  color: #409eff;
}
.el-aside {
  background-color: #fff;
  color: #000;
  text-align: center;
  border-right: 1px solid #dcdfe6;
}
.el-main {
  background-color: #fff;
  line-height: 40px;
  width: 100%;
  color: #303133;
  padding: 20px 40px;
  position: relative;
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
.title {
  flex: 0 1 50%;
}
// .date,
// .tag {
//   width: 25%;
// }
.date {
  color: #909399;
  font-size: 14px;
}
.article {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.detail {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
</style>
