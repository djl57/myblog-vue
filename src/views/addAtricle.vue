<template>
  <div>
    <el-header>
      <el-page-header @back="goBack" content="添加文章"></el-page-header>
      <el-button class="button" type="primary" @click="publicArticle">发 布</el-button>
    </el-header>
    <el-main>
      <el-input v-model="title" placeholder="标题" class="input"></el-input>
      <mavon-editor v-model="value" @change="change" ref="mavonEditor" />
    </el-main>
    <el-dialog title="发布文章" :visible.sync="publicVisible" width="50%" :before-close="done=>done()">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="文章标签" prop="tag">
          <el-checkbox-group v-model="ruleForm.tag">
            <el-checkbox
              v-for="item in tags"
              :key="item.id"
              :label="item.id"
              name="tag"
            >{{item.name}}</el-checkbox>
            <el-input
              v-if="addTagVisible"
              v-model="addTagName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(0)"
              @blur="handleInputConfirm(0)"
              class="tag-input"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文章分类" prop="catagory">
          <el-checkbox-group v-model="ruleForm.catagory">
            <el-checkbox
              v-for="item in catagorys"
              :key="item.id"
              :label="item.id"
              name="catagory"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <el-input
            v-if="addCatagoryVisible"
            v-model="addCatagoryName"
            ref="saveCatagoryInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(1)"
            @blur="handleInputConfirm(1)"
            class="tag-input"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="cataInput">+ 新分类</el-button>
        </el-form-item>
        <el-form-item label="发布形式" prop="publicStatus">
          <el-radio-group v-model="ruleForm.publicStatus">
            <el-radio v-for="item in publics" :key="item.status" :label="item.status">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="publicVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">发布文章</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  AddArticle,
  GetArticles,
  DelArticle,
  PutArticle,
  GetTags,
  GetCatagorys,
  AddTag,
  AddCatagory
} from "../api/index";
export default {
  data() {
    return {
      value: "",
      title: "",
      render: "",
      publicVisible: false,
      tags: [],
      catagorys: [],
      addTagVisible: false,
      addTagName: "",
      addCatagoryVisible: false,
      addCatagoryName: "",
      publics: [
        { status: "0", label: "公开" },
        { status: "1", label: "私密" },
        { status: "2", label: "保存为草稿" }
      ],
      ruleForm: {
        tag: [],
        catagory: [],
        publicStatus: "0"
      },
      rules: {
        publicStatus: [
          { required: true, message: "请选择发布形式", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/manageBlog" });
    },
    publicArticle() {
      if (!this.title) {
        this.$message({
          message: "标题不能为空！",
          type: "warning"
        });
        return;
      }
      this.publicVisible = true;
      this.getTags();
      this.getCatagorys();
    },
    getTags() {
      GetTags().then(({ code, data }) => {
        if (code === "200") {
          this.tags = data;
        }
      });
    },
    getCatagorys() {
      GetCatagorys().then(({ code, data }) => {
        if (code === "200") {
          this.catagorys = data;
        }
      });
    },
    change(value, render) {
      this.render = render;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          const data = {
            title: this.title,
            renderHtml: this.render,
            tag: this.ruleForm.tag.join(),
            catagory: this.ruleForm.catagory.join(),
            publicStatus: this.ruleForm.publicStatus
          };
          AddArticle(data).then(res => {
            this.publicVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleInputConfirm(type) {
      if (type === 0) {
        // 新增标签
        console.log(this.addTagName);
        if (this.addTagName !== "") {
          AddTag({ name: this.addTagName }).then(({ code }) => {
            this.getTags();
            this.addTagVisible = false;
            this.addTagName = "";
          });
        }
      } else if (type === 1) {
        // 新增分类
        if (this.addCatagoryName !== "") {
          AddCatagory({ name: this.addCatagoryName }).then(({ code }) => {
            this.getCatagorys();
            this.addCatagoryVisible = false;
            this.addCatagoryName = "";
          });
        }
      }
    },
    showInput() {
      this.addTagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    cataInput() {
      this.addCatagoryVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveCatagoryInput.$refs.input.focus();
      });
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
  .input {
    margin-bottom: 10px;
  }
}
.button {
  float: right;
  margin: 12px;
}
.tag-input {
  width: 90px;
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
