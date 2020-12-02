<template>
  <el-tree
    highlight-current
    :props="defaultProps"
    :load="loadNode"
    lazy
    @node-click="handleNodeClick"
  >
  </el-tree>
</template>

<script>
import api from "../../api";
export default {
  name: "ProductTree",
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
    };
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        api.getSelectItemCategoryByParentId().then((res) => {
          console.log(res.data);
          if (res.data.status == 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        api
          .getSelectItemCategoryByParentId({
            id: node.data.cid,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            resolve([]);
          });
      }
    },
    handleNodeClick(data) {
      console.log(data);
      this.$emit("treeData",data)
    },
  },
};
</script>

<style>
</style>