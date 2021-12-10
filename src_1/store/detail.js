// 发请求的函数引入过来
import { reqGoodDetailInfoData } from '@/api'
const state = {
  goodDetailInfo: {}
}
const actions = {
  async getGoodDetailInfo({commit},id) {
    const result = await reqGoodDetailInfoData(id)
    if (result.code === 200) {
      commit('SAVE_GOOD_DETAIL_INFO',result.data)
    } else {
      console.log(result.message);
    }
  }
}
const mutations = {
  SAVE_GOOD_DETAIL_INFO(state,payload) {
    state.goodDetailInfo = payload
  }
}
const getters = {
  // 由于当前对象中的属性值也就是子项被我们组件来使用，因此先使用getters处理一下
  // 当页面中的数据使用的是我们state中的对象中的子属性中的值的时候，也就是说嵌套数据比较多
  // 此时页面中的控制台中会出现一些报错，说undefined... 
  // 究其原因是因为页面加载的时候，ajax请求还没有完全响应回来数据 而页面中已经在开始使用
  // 当ajax请求完毕，数据真的回来之后，收于我们当前是使用的Vue框架来开发的，是一个响应式的框架 
  // 因此数据一回来，页面中的数据就直接更新了 页面呢就能够看到正常数据了
  categoryView(state) {
    return state.goodDetailInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodDetailInfo.spuSaleAttrList || {}
  },
  price(state){
    return state.goodDetailInfo.price || {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}