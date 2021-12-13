// 1. 引入文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 2. 注册组件
Vue.use(VueRouter)



// 官方解决方案
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

// 原型上修改push方法
const originPush = VueRouter.prototype.push  // 先将之前的存储到一个变量当中
const originReplace = VueRouter.prototype.replace // 同上

// 修改VueRouter原型上的push 用于解决重复跳转时报错的问题
VueRouter.prototype.push = function (location, okCallBack, errCallBack) {
  if (okCallBack === undefined && errCallBack === undefined) {
    // 上面的判断成立的话，表示没有传递这两个参数
    originPush.call(this, location).catch(() => { })  // 统一处理报错的问题 一劳永逸
  } else {
    originPush.call(this, location, okCallBack, errCallBack)
  }
}

// 修改VueRouter原型上的replace 用于解决重复跳转时报错的问题
VueRouter.prototype.replace = function (location, okCallBack, errCallBack) {
  if (okCallBack === undefined && errCallBack === undefined) {
    // 上面的判断成立的话，表示没有传递这两个参数
    originReplace.call(this, location).catch(() => { })  // 统一处理报错的问题 一劳永逸
  } else {
    originReplace.call(this, location, okCallBack, errCallBack)
  }
}

// 3. 创建路由实例并添加路由规则 
const router = new VueRouter({
  mode: 'history', // 设置路由模式  不要#
  // routes:routes
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log(to,from);
    // to 表示要跳转到的页面 是一个路由规则对象 
    // from 表示从哪里跳转过来 也是一个路由规则对象
    // savedPosition 记录之前的页面位置  当浏览器的前进或后退按钮被单击的时候会触发
    // console.log(savedPosition);
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// router.beforeEach((to, from, next) => {
//   // ... to from 类型于我们导航对象中 $route
//   console.log(to, from, next);

//   next()
//   // 在node中的中间件 next()
// })

const token = store.state.user.userInfo.token
// console.log('router-token',token);
router.beforeEach((to, from, next) => {
  console.log(to.name,token);
  if (to.name !== 'login' && !token) next({ name: 'login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})


// 4. 导出路由实例
export default router

/**
 * 1. 控制底部显示与否
 *     哪几个页面是没有底部的 login register
 *     只要显示或是跳转到 login register 页面就不会显示底部
 *     相当于其它页面做一个差异化
 *
 *
 */

