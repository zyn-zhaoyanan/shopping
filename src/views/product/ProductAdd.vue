<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialogAddVisible"
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
        <ProductWangEditor @onEditor="getEditor" />
      </el-form-item>
      <div v-for="(item, index) in treeDataEditor" :key="index">
        <h3>{{ item.value }}</h3>
        <div v-for="(childItem, childIndex) in item.children" :key="childIndex">
          <el-form-item label-width="130px" :label="childItem.childValue">
            <el-input v-model="childItem.value" type="text"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProductWangEditor from "./ProductWangEditor";
import ProductUpload from "./ProductUpload";
import ProductTree from "./ProductTree";
import api from "../../api";
export default {
  data() {
    return {
      dialogAddVisible: false,
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
      treeDataEditor:[],
    };
  },
  components: {
    ProductWangEditor,
    ProductUpload,
    ProductTree,
  },

  mounted() {
    this.$bus.$on("productAddVisible", (flag) => {
      this.dialogAddVisible = flag;
    });
  },
  methods: {
    handleClose() {
      this.dialogAddVisible = false;
    },
    getUpload(data) {
      console.log(22222);
      console.log(data);
      this.uploadData = data;
      this.dialogUploadVisible = false;
    },
    getCategoryDataHandle() {
      api
        .paramsItem({
          cid: this.treeData.cid,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 200) {
           this.treeDataEditor = JSON.parse(res.data.result[0].paramData)
             this.dialogCategroyVisible = false;
          } else {
            this.$message("请选择");
          }
        });
     
    },
    /**
     * 添加产品事件
     */
    sureSubmit() {
      api
        .getInsert({
          title: this.addForm.name,
          cid: this.treeData.cid,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image: this.uploadData.url,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 200) {
            this.dialogAddVisible = false;
            this.$bus.$emit("requestOneMore", true);
          } else {
            this.$message.error("添加失败");
          }
        });
    },

    getTreeData(data) {
      console.log(data);
      /*   api.paramsItem({
        cid:this.treeData.cid
      }).then(res=>{
        console.log(res.data);
      }) */
      this.treeData = data;
    },
    getEditor(data) {
      this.editorData = data;
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