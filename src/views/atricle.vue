<template>
  <div>
    <el-button type="primary" class="bottom10" @click="addAtricle"
      >添加文章</el-button
    >
    <el-table :data="tableData" border style="width: 100%" :height="height">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="文章标签" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) in scope.row.tagName"
            :key="index"
            :type="getType(index)"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="文章分类" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) in scope.row.catagoryName"
            :key="index"
            :type="getType(index)"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="name" label="发布形式">
        <template slot-scope="scope">
          <span>{{ getPublicTxet(scope.row.publicStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 0)" type="text"
            >查看文章</el-button
          >
          <el-button @click="handleClick(scope.row, 2)" type="text"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <article-detail
      v-if="showArticleDetail"
      class="detail"
      :detail="articleDetailId"
      @closeDetail="closeDetail"
    ></article-detail>
  </div>
</template>

<script>
import { GetArticles, DelArticle, PutArticle } from "../api/index";
import ArticleDetail from "./articleDetail";
export default {
  data() {
    return {
      tableData: [],
      showArticleDetail: localStorage.getItem("curArticleDetailId"),
      articleDetailId: null
    };
  },
  created() {
    this.getArticles();
  },
  computed: {
    height() {
      return document.body.clientHeight - 180;
    }
  },
  components: { ArticleDetail },
  methods: {
    getArticles() {
      GetArticles({ pageNum: 1, pageSize: 9999 }).then(({ code, data }) => {
        if (code === "200") {
          console.log(data);
          this.tableData = data;
        }
      });
    },
    getType(index) {
      const colorList = ["success", "info", "warning", "danger"];
      return colorList[index];
    },
    handleClick(row, type) {
      console.log(row);
      if (type === 0) {
        // 查看内容
        localStorage.setItem("curArticleDetailId", row.id);
        this.articleDetailId = row.id;
        this.showArticleDetail = true;
      } else if (type === 1) {
        // 编辑
        PutArticle();
      } else if (type === 2) {
        // 删除
        DelArticle({ id: row.id }).then(res => {
          this.getArticles();
        });
      }
    },
    addAtricle() {
      this.$router.push({
        path: "/addAtricle"
      });
    },
    getPublicTxet(status) {
      const publics = [
        { status: "0", label: "公开" },
        { status: "1", label: "私密" },
        { status: "2", label: "保存为草稿" }
      ];
      const target = publics.filter(item => item.status === status);
      if (target.length > 0) {
        return target[0].label;
      }
    },
    closeDetail() {
      localStorage.removeItem("curArticleDetailId");
      this.showArticleDetail = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom10 {
  margin-bottom: 10px;
}
.el-tag {
  margin-left: 5px;
}
.detail {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 1;
}
</style>
