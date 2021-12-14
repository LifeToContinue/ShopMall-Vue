// 1. 引入插件
import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import search from './modules/search'
import detail from './modules/detail'
import user from './modules/user'
import trade from './modules/trade'
// 2. 注册插件
Vue.use(Vuex)

// 4. 设置选项
const state = {

}
const actions = {
  
}
const mutations = {
  
}
const getters = {}
// 3. 创建vuex实例对象  一个项目中只有一个store对象 但是可以有多个模块 
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules:{home,search,detail,user,trade}  // 和store对象关联起来  类似于组件注册
})

// 5. 导出
export default store