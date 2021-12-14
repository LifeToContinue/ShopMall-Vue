// 2. 引入并声明使用插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
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


router.beforeEach(async (to, from, next) => {
  // to代表目的地的路由对象
  // from代表起始位置的路由对象
  // next是一个函数，主要用于拦截之后的处理
  // next()  代表无条件放行
  // next(false) 代表原地不动
  // next(path/路由对象) 代表跳转到指定的路由（位置）

  let token = store.state.user.token
  let userInfo = store.state.user.userInfo
  // 判断token是不是存在
  if(token){
    // 代表token存在,代表登录过
    // 判断用户是不是还是去登录
    if(to.path === '/login'){
      // 代表用户已经登录又想去登录
      // 不能写false，写了false就卡那了，永远不可能拿到用户信息了
      // 写了路径，我们前置守卫就会再一次接入从头再来
      next('/')
    }else{
      // 如果人不是去登录，那么此时就要看用户信息在不在
      if(userInfo.name){
        // 如果用户信息存在无条件放行
        next()
      }else{
        // 如果用户信息不存在，就发请求获取用户
        try {
          // 请求获取用户信息成功，用户信息会自动存在state里面
          // 无条件放行
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          // 请求获取用户信息失败，统一认为token过期
          // 我们要把原来的token删除,然后重新登录
          store.dispatch('user/userLogout')
          next('/login')
        }
      }
    }
  }else{
    // 代表没登录过
    //如果用户没登陆访问   交易相关  支付相关  用户中心相关，我们不能让他去
    //应该让用户登录去
    let target=to.path
    if(target.indexOf('/trade')===0 || target.indexOf('/pay')===0 || target.startsWith('/center')){
      next('/login?redirect='+target)
    }else{
      next()
    }
  }

})


export default router



