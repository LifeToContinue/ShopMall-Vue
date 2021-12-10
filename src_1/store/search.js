// 将请求回来的数据添加到Vuex中
import {reqSearchInfoData} from '@/api'


const state={
    //用来存储搜索到的商品数据
    //里面又三项数据 商品goodsList attrsList trademarkList
    searchInfo:{}
}

//准备action
const actions={
    async getSearchInfoData({commit},searchParams){
        const result=await reqSearchInfoData(searchParams)
        if(result.code===200){
            commit('SAVE_SEARCH_INFO_DATA',result.data)
        }else{
            console.log(result.message);
        }
    }
}

const mutations={
    //存储搜索出来的数据
    SAVE_SEARCH_INFO_DATA(state,info){
        state.searchInfo=info
    }
}
const getters={
    attrsList(state){
        return state.searchInfo.attrsList
    },
    goodsList(state){
        return state.searchInfo.goodsList
    },
    trademarkList(state){
        return state.searchInfo.trademarkList
    },
    total(state){
        return state.searchInfo.total
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}