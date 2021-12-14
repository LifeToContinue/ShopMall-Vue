/**
 * 此模块是用来进行用户登陆及登出的
 */
 import {reqCode, reqGetUserInfo, reqRegister, reqUserAddressList, reqUserLogin, reqUserLogout} from "@/api"

 const state = {
   code:'',
   // token:'', 登录的时候我们是空串,刷新页面token丢失,信息就拿不到
   token:localStorage.getItem('token_key'),
   userInfo:{},
   userAddressList:[]
 }
 
 const mutations = {
   RECEIVE_CODE(state,code){
     state.code = code
   },
   RECEIVE_TOKEN(state,token){
     state.token = token
   },
   RECEIVE_USERINFO(state,userInfo){
     state.userInfo = userInfo
   },
 
   RESET_USERINFO(state){
     state.token = ''
     state.userInfo = {}
   },
   RECEIVE_USERADDRESSLIST(state,userAddressList){
     state.userAddressList=userAddressList
   }
 
 }
 
 const actions = {
   // async函数叫异步函数
   // 一般在异步函数当中都是一些异步的操作
   // async函数返回值一定是promise，不看return
   // 返回的promise成功还是失败看return 
   // 如果return的值：
   // promise值和非promise值
   // 如果是非promise值，那么函数返回的promise状态就是成功的，成功的结果就是return的结果
   // 如果是非promise值，但是中间抛出异常，那么函数返回的promise状态就是失败的，失败的原因就是抛出的异常
   // 如果是promise值，return返回的promise是成功的，那么函数返回的promise就是成功的，
           // 成功的结果就是return的promise成功的结果
   // 如果是promise值，return返回的promise是失败的，那么函数返回的promise就是失败的
           // 失败的原因就是return的promise失败的原因
 
   // 获取验证码
   async getCode({commit},phone){
     const result = await reqCode(phone)
     if(result.code === 200){
       commit('RECEIVE_CODE',result.data)
       return result.data
     }else{
       return Promise.reject(new Error('failed'))
     }
   },
 
   // 注册
   async userRegister({commit},user){
     const result = await reqRegister(user)
     if(result.code === 200){
       return 'ok'
     }else{
       return Promise.reject(new Error('failed'))
     }
   },
 
   // 登录
   async userLogin({commit},user){
     const result = await reqUserLogin(user)
     if(result.code === 200){
       // 保证第一次可以通过token拿到用户信息
       // 如果不写,第一次登录完成,state里面是没有保存token的,获取用户信息的时候我们从state里面
       // 就拿不到token
       commit('RECEIVE_TOKEN',result.data.token)
       // 保存到localStorage
       localStorage.setItem('token_key',result.data.token)
       return 'ok'
     }else{
       return Promise.reject(new Error('failed'))
     }
   },
 
 
   // 根据token获取用户信息
   async getUserInfo({commit}){
     const result = await reqGetUserInfo()
     if(result.code === 200){
       commit('RECEIVE_USERINFO',result.data)
       return 'ok'
     }else{
       return Promise.reject(new Error('failed'))
     }
   },
 
   // 退出登录
   async userLogout({commit}){
     const result = await reqUserLogout()
     if(result.code === 200){
       localStorage.removeItem('token_key')
       commit('RESET_USERINFO')
       return 'ok'
     }else{
       return Promise.reject(new Error('failed'))
     }
   },

   //获取收货地址
   async getUserAddressList({commit}){
     const result=await reqUserAddressList()
     if(result.code===200){
       commit('RECEIVE_USERADDRESSLIST',result.data)
     }
   }
 
 }
 
 
 
 
 
 
 const getters = {
 
 }
 
 
 export default {
   namespaced: true, // 开启命名空间
   state,
   actions,
   mutations,
   getters
 }