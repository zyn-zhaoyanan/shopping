<template>
  <div class="product-container">
    <ProductHead/>
    <ProductList/>
    <PagePagination/>
    <ProductAdd/>
    <ProductEditor/>

  </div>
</template>

<script>
import ProductList from "./ProductList"
import PagePagination from "./PagePagination"
import ProductHead from "./ProductHead"
import ProductAdd from "./ProductAdd"
import ProductEditor from "./ProductEditor"
export default {
    name:'Product',
    components:{
      ProductList,
      PagePagination,
       ProductHead,
        ProductAdd,
        ProductEditor
    }
}
</script>

<style>

</style>