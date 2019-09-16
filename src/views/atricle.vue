<template>
  <div>
    <el-button type="primary" class="bottom10" @click="addAtricle">添加文章</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column label="文章标签" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) in scope.row.tag"
            :key="index"
            :type="getType(index)"
          >{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="文章分类">
        <template slot-scope="scope">
          <el-tag>{{scope.row.catagory}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="创建时间"></el-table-column>
      <el-table-column prop="name" label="发布状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '1'">已发布</span>
          <span v-else>未发布</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">查看内容</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: "标题1",
          tag: ["js", "数组"],
          catagory: "前端",
          date: "2016-05-02",
          status: "0"
        }
      ]
    };
  },
  methods: {
    getType(index) {
      const colorList = ["success", "info", "warning", "danger"];
      return colorList[index];
    },
    handleClick(row) {
      console.log(row);
    },
    addAtricle() {
      this.$router.push({
        path: "/addAtricle"
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.bottom10 {
  margin-bottom: 10px;
}
.el-tag {
  margin-left: 5px;
}
</style>
