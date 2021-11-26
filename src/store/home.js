/* 
    1.这个home.js文件是专门用于处理home组件（主页面）数据的
    2.这个相当于是一个独立的空间  只存储home中的数据
    3.在这个模块当中也有Vuex中的state mutation...
    4.当前这个文件是一个独立的模块，在设置完成之后，一定要和store关联起来
*/
import {reqCategoryListData} from '../api'//引入api

const state={
    categoryList:[]
}
const actions = {
    //可以进行异步操作
    //1.获取三级分类信息数据
    async getCategoryListData(context){
        const reslut = await reqCategoryListData()
        //提交给mutation来操作state中的数据
        if(reslut.code===200){//根据状态码来判断是否真正的请求回数据
            context.commit('SAVE_CATEGORY_LIST_DATA',reslut)
        }
    }
}
const mutations = {
    // 用来修改state中的数据
    SAVE_CATEGORY_LIST_DATA(state,payload){
        state.categoryList=payload.data
    }
}
const getters = {}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}