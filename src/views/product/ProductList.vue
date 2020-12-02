<template>
  <element-table :tableData="tableData" :cell-style="cellStyle">
    <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
    <el-table-column prop="title" label="商品名称"></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="image"
      label="商品图片"
    ></el-table-column>
    <el-table-column prop="sellPoint" label="商品卖点"></el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="100"
    ></el-table-column>
    <el-table-column prop="num" label="商品数量" width="100"></el-table-column>
    <el-table-column prop="descs" label="商品描述">
      <template slot-scope="scope">
        <p v-html="scope.row.descs"></p>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </element-table>
</template>

<script>
import api from "../../api";

export default {
  name: "ProductList",
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.http(1);
    this.$bus.$on("page", (val) => {
      //console.log(val);
      this.http(val);
    });
    this.$bus.$on("searchData", (dataList) => {
      this.tableData = dataList;
    });
    this.$bus.$on("requestOneMore", () => {
      this.http(1);
    });
  },
  methods: {
    http(page) {
      //开启loading
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      api.selectProduct({ page }).then((res) => {
        // console.log(res.data);
        loading.close();
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      //   console.log(index,row);

      this.$bus.$emit("editor", row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api
          .getDelete({
            id: row.id,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.http(1);
            } else {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            }
          });
      });

      /*   console.log(index, row);
      api.getDelete({
        id:row.id
      }).then(res=>{
       // console.log(res.data);
        if(res.data.status==200){

        }else{

        }
      }) */
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      console.log(111111);
      if (row.num <= 30) {
        return{
          color:"red"
        }

      }
    },
  },
};
</script>

<style scoped>
</style>