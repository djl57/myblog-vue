<template>
  <div>
    <el-button type="primary" class="bottom10" @click="addTag">添加标签</el-button>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="标签名称"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 1)" type="text">编辑</el-button>
          <el-button @click="handleClick(scope.row, 2)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增标签" :visible.sync="addVisible" width="60%" :before-close="done=>done()">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑标签" :visible.sync="editVisible" width="60%" :before-close="done=>done()">
      <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AddTag, GetTags, DelTag, PutTag } from "../api/index";

export default {
  data() {
    return {
      tableData: [],
      addVisible: false,
      editVisible: false,
      ruleForm: {
        name: ""
      },
      editForm: {
        name: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "change" }]
      },
      loading: true
    };
  },
  created() {
    this.getTags();
  },
  methods: {
    getTags() {
      this.loading = true;
      GetTags().then(res => {
        const { code, data } = res;
        if (code === "200") {
          this.loading = false;
          this.tableData = data;
        }
      });
    },
    handleClick(row, type) {
      if (type === 1) {
        this.editVisible = true;
        this.editForm = { ...row };
      } else if (type === 2) {
        // 删除
        this.$confirm("确认删除改标签?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            DelTag({ id: row.id }).then(({ code }) => {
              if (code === "200") {
                this.getTags();
              }
            });
          })
          .catch(() => {});
      }
    },
    addTag() {
      this.addVisible = true;
      this.$nextTick(() => {
        this.resetForm("ruleForm");
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.submitType); // 0新增 1编辑
          if (formName === "ruleForm") {
            AddTag(this.ruleForm).then(res => {
              this.addVisible = false;
              this.getTags();
            });
          } else if (formName === "editForm") {
            PutTag({ ...this.editForm }).then(res => {
              this.editVisible = false;
              this.getTags();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
