<template>
  <el-table 
:data="tableData" 
style="width: 100%"
stripe
 border
:header-cell-style="{background:'#e6e6e6',color:'#000000'}"
:header-row-style="{background:'#e1f1f6',color:'#606262'}"
:cell-style="cellStyle" 
>
<slot></slot>
</el-table>
</template>

<script>
export default {
    name:"ElementTable",
    props:{
        tableData:{
            type:[Array],
            default:function(){
                return []
            }
        },
        cellStyle:{
            type:Function,
            default:function(){
                return null
            }
        }

    }
    

}
</script>

<style>

</style>


/* 
插槽是展示子级组件调用时，写在组件内部的内容




 */