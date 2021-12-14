import { reqTradeInfo } from "@/api"

const state= {
    tradeInfo:{}
}
const mutations={
    RECEIVE_TRADEINFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    }
}
const actions={
    async getTradeInfo({commit}){
        const result =await reqTradeInfo()
        if(result.code===200){
            commit('RECEIVE_TRADEINFO',result.data)
        }
    }
}
const getters={

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}