
import {reqUsrLogin,reqUserLogout} from '@/api'

const state={
    userInfo:{
        name:localStorage.getItem('userName'),
        token:localStorage.getItem('token')//服务器端生成的唯一的标识
    }
}
const actions={
    //1.用户登录
    async getUserLogin({commit},user){
        const result=await reqUsrLogin(user)
        if(result.code===200){
            commit('SAVE_USER_INFO',result.data)
        }else{
            console.log(result.message);
        }
    },

    //2.用户登出
    async UserLogout({commit}){
        const result =await reqUserLogout()
        if(result.code===200){
            localStorage.removeItem('userName')
            localStorage.removeItem('token')
            commit('DELETE_USER_INFO')
        }else{
            console.log(result.message);
        }
    }
}
const mutations={
    SAVE_USER_INFO(state,payload){
        state.userInfo.name=payload.name
        state.userInfo.token=payload.token

        localStorage.setItem('userName',payload.name)
        localStorage.setItem('token',payload.token)
    },
    DELETE_USER_INFO(state){
        state.userInfo.name=''
        state.userInfo.token=''
    }
}
const getters={

}

export default{
    namespaced: true,
    state,
    actions, 
    mutations,
    getters
}