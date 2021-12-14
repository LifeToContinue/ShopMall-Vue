/**
 * 这是一个新的search页面的模块 
 */
// 引入封装好的发请求的方法
import { reqSearchInfoData } from "@/api"

const state = {
  // 用来存储搜索到的商品数据
  // 里面有三项数据  商品goodsList  attrsList trademarkList
  searchInfo:{}
}
const actions = {
  // 1. 获取搜索商品的数据
  async getSearchInfoData({commit},searchParams) {
    const result = await reqSearchInfoData(searchParams)
    // console.log('searchActions',result);
    if (result.code === 200) {
      commit('SAVE_SEARCK_INFO_DATA',result.data)
    } else {
      console.log(result.message);
    }
  }
}
const mutations = {
  // 存储搜索出来的数据
  SAVE_SEARCK_INFO_DATA(state, payload) {
    state.searchInfo = payload
  }
}

// 相当于是Vuex给我们提供的一个计算属性
const getters = {
  goodsList(state) {
    return state.searchInfo.goodsList
  },
  attrsList(state) {
    return state.searchInfo.attrsList
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList
  },
  total(state) {
    // 商品总数量
    return state.searchInfo.total
  }
}

export default {
  namespaced:true, // 开启命名空间
  state,
  actions,
  mutations,
  getters
}