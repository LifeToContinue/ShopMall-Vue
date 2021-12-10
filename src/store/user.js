/**
 * 此模块是用来进行用户登陆及登出的
 */
import { reqUserLogin, reqUserLogout } from "@/api"


const state = {
  userInfo: {
    name: localStorage.getItem('userName'),
    token: localStorage.getItem('token') // 服务器端生成的唯一的标识
  }
}
const actions = {
  // 1. 用户登陆
  async getUserLogin({ commit }, user) {
    const result = await reqUserLogin(user)
    console.log('userLoginActions', result);
    if (result.code === 200) {
      commit('SAVE_USER_IFNO', result.data)
    } else {
      console.log(result.message);
    }
  },
  // 2. 用户登出
  async UserLogout({ commit }) {
    const result = await reqUserLogout()
    if (result.code === 200) {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')

      commit('DELETE_USER_INFO')
    } else {
      console.log(result.message);
    }
  }
}
const mutations = {
  SAVE_USER_IFNO(state, payload) {
    console.log('payload',payload);
    state.userInfo.name = payload.name
    state.userInfo.token = payload.token

    // 为了方便起见，可以在本地存储中保留一份，这样刷新页面的时候，也可以直接访问
    localStorage.setItem('userName', payload.name)
    localStorage.setItem('token', payload.token)
  },
  DELETE_USER_INFO(state) {
    state.userInfo.name = ''
    state.userInfo.token = ''
  }
}
const getters = {}


export default {
  namespaced: true, // 开启命名空间
  state,
  actions,
  mutations,
  getters
}