<template>
  <div class="article-detail">
    <el-page-header @back="goBack" content="文章详情"></el-page-header>
    <el-main v-loading="loading">
      <div class="hd">
        <h1>{{content.title}}</h1>
        <div class="flex">
          <p class="createTime">{{content.createTime}}</p>
          <p class="editButton" @click="edit" v-show="editShow">编辑</p>
        </div>
      </div>
      <div class="mainCont html-table" v-html="content.renderHtml"></div>
    </el-main>
  </div>
</template>

<script>
import { GetArticleDetail } from "../api";

export default {
  props: {
    detail: Number
  },
  data() {
    return {
      loading: false,
      content: {},
      editShow: localStorage.getItem("passSave")
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    getArticleDetail() {
      let articleDetail;
      if (this.detail) {
        articleDetail = this.detail;
      } else {
        articleDetail = localStorage.getItem("curArticleDetailId");
      }
      this.loading = true;
      GetArticleDetail({ id: articleDetail }).then(({ code, data }) => {
        if (code === "200") {
          this.loading = false;
          this.content = data;
        }
      });
    },
    goBack() {
      this.$emit("closeDetail");
    },
    edit() {
      this.$router.push({
        path: "/addAtricle"
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.article-detail {
  padding: 20px;
}
.el-main {
  line-height: 40px;
  width: 100%;
  color: #303133;
}
.hd {
  border-bottom: 1px solid #dcdfe6;
  .flex {
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    .createTime {
      color: #c0c4cc;
    }
    .editButton {
      cursor: pointer;
    }
  }
}
.mainCont {
  padding-top: 20px;
}
</style>
