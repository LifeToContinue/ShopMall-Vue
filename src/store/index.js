// 1. 引入模块
import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'

// 2. 注册模块
Vue.use(Vuex)

// 4.设置选项
const state={

}
const actions = {

}
const mutations = {

}
const getters = {}

// 3.创建vuex实例对象
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{home,search,detail}
})


// 5.导出
export default store