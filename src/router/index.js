//1.引入文件
import Vue from 'vue'
import VueRouter from 'vue-router'

//2.注册组件
Vue.use(VueRouter)

import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Search from '../views/Search'
import AddCart from '../views/AddCart'
import Trade from '../views/Trade'
import MyOrder from '../views/MyOrder'
import Pay from '../views/Pay'
import PaySuccess from '../views/PaySuccess'
import Cart from '../views/Cart'
import Detail from '../views/Detail'



const originalPush = VueRouter.prototype.push
// const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//     return originalReplace.call(this, location).catch(err => err)
//   }


//3.创建路由实例并添加路由规则
const router=new VueRouter({
    mode:'history',
    routes:[
        {
          name:'home',
          path:'/home',
          component:Home,
          meta:{
            isShowTypeNav:true
          }
        },
        {
          name:'login',
          path:'/login',
          component:Login,
          meta:{
            isHiddenFooter:true
          }
        },
        {
          name:'register',
          path:'/register',
          component:Register,
          meta:{
            isHiddenFooter:true
          }
        },
        {
          name:'search',
          path:'/search',
          component:Search,
          meta:{
            // isHiddenNav:false
          }
        },
        {
          name:'addcart',
          path:'/addcart',
          component:AddCart
        },
        {
          name:'trade',
          path:'/trade',
          component:Trade
        },
        {
          name:'myorder',
          path:'/myorder',
          component:MyOrder
        },
        {
          name:'pay',
          path:'/pay',
          component:Pay
        },
        {
          name:'paysuccess',
          path:'/paysuccess',
          component:PaySuccess
        },
        {
          name:'cart',
          path:'/cart',
          component:Cart
        },
        {
          name:'detail',
          path:'/detail',
          component:Detail
        },
        {
          path:'/',
          redirect:'/home'
        },
    ]
})

//4.导出路由实例
export default router