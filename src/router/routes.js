import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Center from '@/pages/Center'
import Pay from '@/pages/Pay'
import Trade from '@/pages/Trade'
import PaySuccess from '@/pages/PaySuccess'

export default [
  {
    name:'home',
    path: '/home',
    component: Home,
    meta: {
      isShowTypeNav:true
    }
  },
  {
    name:'login',
    path: '/login',
    component: Login,
    meta: {
      isHiddenFooter:true
    }
  },
  {
    name:'register',
    path: '/register',
    component: Register,
    meta: {
      isHiddenFooter:true
    }  // 这是一个用来存储额外数据的一个属性，可以通过这个属性做一些差异化的操作
  },
  {
    name:'detail',
    path: '/detail/:id',  // params参数携带的时候，这个路由中要添加占位符
    component: Detail,
    props:true  // props+params参数 在对应的组件中直接使用props来接收，不用计算属性了
  },
  {
    name: 'addcartsuccess',
    path: '/addCartSuccess',
    component:AddCartSuccess
  },
  {
    name: 'shopcart',
    path: '/shopCart',
    component:ShopCart
  },
  {
    name:'search', // 路由名称
    path: '/search',
    component: Search
  },
  {
    // 订单中心 其实就是根据地址发货的页面
    name: 'trade',
    path: '/trade',
    component:Trade
  },
  {
    // 订单中心
    name: 'center',
    path: '/center',
    component:Center
  },
  {
    name: 'pay',
    path: '/pay',
    component:Pay
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component:PaySuccess
  },
  {
    path: '/',
    redirect: '/home'
  }
]