<template>
  <el-dialog
    title="编辑商品"
    :visible.sync="dialogEditorVisible"
    width="80%"
    :before-close="handleClose"
  >
    <el-form
      label-width="70px"
      :label-position="labelPosition"
      :model="addForm"
      ref="ruleForm"
    >
      <el-form-item label="商品类目">
        <el-button
          class="category"
          type="primary"
          @click="dialogCategroyVisible = true"
          >类目选择</el-button
        >
        <span class="category">{{ treeData.name }}</span>
        <el-dialog
          width="50%"
          title="类目选择"
          :visible.sync="dialogCategroyVisible"
          append-to-body
        >
          <ProductTree @treeData="getTreeData" />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="getCategoryDataHandle"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="addForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="addForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="addForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-button
          class="category"
          type="primary"
          @click="dialogUploadVisible = true"
          >图片上传</el-button
        >
        <span class="category">{{ uploadData.url }}</span>
        <el-dialog
          width="50%"
          title="上传图片"
          :visible.sync="dialogUploadVisible"
          append-to-body
        >
          <ProductUpload @upload="getUpload" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <ProductWangEditor @onEditor="getEditor" :editorData="editorContent" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEditorVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

import ProductWangEditor from "./ProductWangEditor";
import ProductUpload from "./ProductUpload";
import ProductTree from "./ProductTree";
import api from "../../api";
import { mapState, mapMutations } from "vuex";

export default {
  name: "ProductEditor",
  data() {
    return {
      dialogEditorVisible: false,
      dialogUploadVisible: false,
      labelPosition: "left",
      dialogCategroyVisible: false,
      addForm: {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      },
      treeData: {},
      uploadData: {},
      editorData: "",
      currentId: 0,
    };
  },
  components: {
    ProductWangEditor,
    ProductUpload,
    ProductTree,
  },
  computed: {
    ...mapState("EditorModule", {
      editorContent: (state) => state. editorContent,
    }),
  },

  mounted() {
    //这个data是传过来的row
    this.$bus.$on("editor", (data) => {
      this.dialogEditorVisible = true;
      this.currentId = data.id;
      console.log(data);
      api
        .getPreUpdate({
          id: data.id,
        })
        .then((res) => {
          this.getSingle(res.data.result[0].cid);
          console.log(res.data);
          (this.addForm.name = res.data.result[0].title),
            (this.addForm.sellPoint = res.data.result[0].sellPoint);
          this.addForm.price = res.data.result[0].price;
          this.addForm.num = res.data.result[0].num;
          this.uploadData = {
            url: res.data.result[0].image,
          };
          this.editorData = res.data.result[0].descs;
          this.setEditorContent(this.editorData);
        });
    });
  },
  methods: {
    ...mapMutations("EditorModule", ["setEditorContent"]),
    // this.setEditorContent()
    handleClose() {
      this.dialogEditorVisible = false;
    },
    getUpload(data) {
      console.log(22222);
      console.log(data);
      this.uploadData = data;
      this.dialogUploadVisible = false;
    },
    getCategoryDataHandle() {
      this.dialogCategroyVisible = false;
    },
    /**
     * 编辑产品事件
     */
    sureSubmit() {
      api
        .getUpdateProduct({
          id: this.currentId,
          title: this.addForm.name,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image: this.uploadData.url,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 200) {
            this.dialogEditorVisible = false;
            this.$bus.$emit("requestOneMore", true);
          } else {
            this.$message.error("修改失败");
          }
        });
    },

    getTreeData(data) {
      console.log(data);
      this.treeData = data;
    },
    getEditor(data) {
      this.editorData = data;
    },
    //单一类目名字获取
    getSingle(cid) {
      api.getSingleType({ cid }).then((res) => {
        //                                                                                                                              ````````````````````````````````````````console.log(res.data);
        if (res.data.status == 200) {
          this.treeData = {
            name: res.data.result[0].name,
          }
        } else {
           this.treeData = {
            name:res.data.msg,
          };
        }
      });
    },
  },
};
</script>


<style scoped lang="less">
.category {
  float: left;
  margin-right: 20px;
}
.upload-img {
  width: 400px;
  float: left;
}
</style>