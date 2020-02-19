import axios from '../utils/http'
import base from './base';
const api={
    getLogin(params){
        return axios.post(base.baseUrl+base.login,params)
    },
    /**
     * 商品查询
     */
    getToutaio(params){
        return axios.get(base.juheBaseUrl+base.toutiao,{
            params
        })

    },
    /**
     * 商品查询
     */
    getselectTbItemAllByPage(params){
        return axios.get(base.baseUrl+base.selectTbItemAllByPage,{
            params:params
        })
    },
    /**
     * 类目接口
     */
    getProductCategory(params){
        return axios.get(base.baseUrl+base.selectProductCategory,{
            params:params
        })
    },
    /**
     * 添加商品接口
     */
    getInsertTbItem(params){
        return axios.get(base.baseUrl+base.insertTbItem,{params})
    },
    /**
     * 删除接口
     */
    getdeleteItemById(params){
        return axios.get(base.baseUrl+base.deleteItemById,{params})

    },
    /**
     * 预更新
     */
    getpreUpdateItem(params){
        return axios.get(base.baseUrl+base.preUpdateItem,{params})
    },
    /***
     * 修改
     */
    getupdateTbItem(params){
        return axios.get(base.baseUrl+base.updateTbItem,{params})

    },
     /***
     *规格参数查询
     */
    getselectItemParamAll(params){
        return axios.get(base.baseUrl+base.selectItemParamAll,{params})

    },
    /**
     * 添加规格参数
     */
    getinsertItemParam(params){
        return axios.get(base.baseUrl+base.insertItemParam,{params})

    },
    /**
     * 删除规格参数
     */
    getdeleteItemParamById(params){
        return axios.get(base.baseUrl+base.deleteItemParamById,{params})

    },
    // 分类管理
    getselectContentCategoryByParentId(params){
        return axios.get(base.baseUrl+base.selectContentCategoryByParentId,{params})

    },
    // 分类添加
    getinsertContentCategory(params){
        return axios.get(base.baseUrl+base.insertContentCategory,{params})

    },
    /**
     * 内容管理删除接口
     */
    getdeleteContentCategoryById(params){
        return axios.get(base.baseUrl+base.deleteContentCategoryById,{params})
    },
     /**
     * 内容管理修改接口
     */
    getupdateContentCategory(params){
        return axios.get(base.baseUrl+base.updateContentCategory,{params})
    },
    /**
     * 右侧内容查询
     */
    getselectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl+base.selectTbContentAllByCategoryId,{params})
    },
    /**
     * 右侧内容添加
     */
    getinsertTbContent(params){
        return axios.get(base.baseUrl+base.insertTbContent,{params})
    },
    /**
     * 右侧内容删除
     */
    getdeleteContentByIds(params){
        return axios.get(base.baseUrl+base.deleteContentByIds,{params})
    },

}
export default api;