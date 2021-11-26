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
        {path:'/home',component:Home},
        {path:'/login',component:Login},
        {path:'/register',component:Register},
        {path:'/search',component:Search},
        {path:'/addcart',component:AddCart},
        {path:'/trade',component:Trade},
        {path:'/myorder',component:MyOrder},
        {path:'/pay',component:Pay},
        {path:'/paysuccess',component:PaySuccess},
        {path:'/cart',component:Cart},
        {path:'/detail',component:Detail},
        {path:'/',redirect:'/home'},
    ]
})

//4.导出路由实例
export default router