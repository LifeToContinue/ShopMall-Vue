//1.引入文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './route.js'

//2.注册组件
Vue.use(VueRouter)





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
    routes:route,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
})

//4.导出路由实例
export default router