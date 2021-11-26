// 1. 引入模块
import Vue from 'vue'
import Vuex from 'vuex'
import {reqCategoryListData} from '../api'

// 2. 注册模块
Vue.use(Vuex)

// 4.设置选项
const state={
    categoryList:[]
}
const actions = {
    //可以进行异步操作
    //1.获取三级分类信息数据
    async getCategoryListData(context){
        const reslut = await reqCategoryListData()
        //提交给mutation来操作state中的数据
        context.commit('SAVE_CATEGORY_LIST_DATA',reslut)
    }
}
const mutations = {
    // 用来修改state中的数据
    SAVE_CATEGORY_LIST_DATA(state,payload){
        state.categoryList=payload.data
    }
}
const getters = {}

// 3.创建vuex实例对象
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})


// 5.导出
export default store