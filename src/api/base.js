const base={
    baseUrl:'/api',
    juheBaseUrl:'/juhe_api',
    toutiao:'/toutiao/index',
    login:'/login',
    selectTbItemAllByPage:"/backend/item/selectTbItemAllByPage",  // 查询商品地址
    selectProductCategory:'/backend/itemCategory/selectItemCategoryByParentId',
    insertTbItem:'/backend/item/insertTbItem',
    deleteItemById:'/backend/item/deleteItemById',
    preUpdateItem:"/backend/item/preUpdateItem",//预更新
    updateTbItem:"/backend/item/updateTbItem",//修改
    selectItemParamAll:'/backend/itemParam/selectItemParamAll',
    insertItemParam:'/backend/itemParam/insertItemParam',//规格参数添加
    deleteItemParamById:"/backend/itemParam/deleteItemParamById",
    selectContentCategoryByParentId:'/content/selectContentCategoryByParentId',//分类查询
    insertContentCategory:'/content/insertContentCategory',//添加
    deleteContentCategoryById:"/content/deleteContentCategoryById",//内容管理删除
    updateContentCategory:"/content/updateContentCategory",//修改
    selectTbContentAllByCategoryId:'/content/selectTbContentAllByCategoryId',//内容查询
    insertTbContent:"/content/insertTbContent",//内容添加 
    deleteContentByIds:"/content/deleteContentByIds"//删除接口
}
export default base;