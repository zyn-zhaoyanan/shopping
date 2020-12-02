import axios from "../utils/request"
import base from "./base"

const api = {
    //登陆接口
    getLogin(params) {
     return axios.post(base.baseUrl+base.loginUrl,params)
    },

    //注册接口
    getRegister(params) {
        return axios.post(base.baseUrl + base.registerUrl, params)
    },

    //商品查询接口
    selectProduct(params) {
        return axios.get(base.baseUrl+base.selectProduct,{params})
    },
    //总页数查询接口
    selectAllPages() {
        return axios.get(base.baseUrl+base.pageTotal)
    },
    //模糊查询接口
    getSearch(params) {
        return axios.get(base.baseUrl+base.Search,{params})
    },
    //查询类目(类目选择)
    getSelectItemCategoryByParentId(params) {
        return axios.get(base.baseUrl+base.selectItemCategoryByParentId,{params})
    },
    //插入商品
    getInsert(params) {
        return axios.get(base.baseUrl + base.insertProduct, { params })   
    },
    //删除产品
    getDelete(params) {
        return axios.get(base.baseUrl + base.deleteProject, {
            params
        })
    },
    //预更新产品
    getPreUpdate(params) {
        return axios.get(base.baseUrl+base.preUpdate,{params})
    },
    //修改商品
    getUpdateProduct(params) {
        return axios.get(base.baseUrl+base.UpdateProduct,{params})
    },
    //单一类目数据获取
    getSingleType(params) {
        return axios.get(base.baseUrl+base.SingleType,{params})
    },
    //获取产品参数
    getParams() {
        return axios.get(base.baseUrl+base.getParams)
    },


    /**
     * 规格参数模糊查询
     */
    paramsSearch(params){
        return axios.get(base.baseUrl + base.paramsSearch,{
            params
        })
    },
    /**
     * 规格参数删除
     */
    paramsDelete(params){
        return axios.get(base.baseUrl + base.paramsDelete,{
            params
        })
    },
    /**
     * 规格参数总条数
     */
    paramsTotal(){
        return axios.get(base.baseUrl + base.paramsTotal)
    },
    /**
     * 规格参数添加
     */
    insertItemParam(params){
        return axios.get(base.baseUrl + base.insertItemParam,{
            params
        })
    },
    /**
     * 规格参数配和产品添加
     */
    paramsItem(params){
        return axios.get(base.baseUrl + base.paramsItem,{
            params
        })
    }
  
}
export default api
