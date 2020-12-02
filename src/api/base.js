const base = {
    baseUrl: '/api',
    loginUrl: '/api/login',//登陆接口
    registerUrl: '/api/register',//注册接口
    selectProduct:'/api//backend/item/selectTbItemAllByPage',//商品查询接口
    pageTotal: "/api/total",//数据总条数接口
    Search: '/api/search',//模糊查询接口
    selectItemCategoryByParentId: "/api/backend/itemCategory/selectItemCategoryByParentId",//类目查询接口
    insertProduct: "/api/backend/item/insertTbItem",//添加产品
    deleteProject: "/api/backend/item/deleteItemById",//删除产品
    preUpdate: "/api/backend/item/preUpdateItem",//预更新产品
    UpdateProduct:"/api/backend/item/updateTbItem",//修改产品
    SingleType: "/api/preCategory",//单一类目数据获取
    getParams: "/api/backend/itemParam/selectItemParamAll",//规格参数
    paramsSearch:"/api/params/search", // 规格参数模糊查询
    paramsDelete:"/api/params/delete", // 规格参数删除
    paramsTotal:"/api/params/total", // 规格参数总条数
    insertItemParam:"/api/backend/itemParam/insertItemParam", // 规格参数添加
    paramsItem:"/api/product/parmas/paramsItem", // 产品规格参数

    
}
export default base