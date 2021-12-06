import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Search from '../views/Search'
import AddCartSuccess from '../views/AddCartSuccess'
import ShopCart from '../views/ShopCart'
import Trade from '../views/Trade'
import MyOrder from '../views/MyOrder'
import Pay from '../views/Pay'
import PaySuccess from '../views/PaySuccess'
import Cart from '../views/Cart'
import Detail from '../views/Detail'

export default [
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
      name:'addCartSuccess',
      path:'/addCartSuccess',
      component:AddCartSuccess
    },
    {
      name:'shopCart',
      path:'/shopCart',
      component:ShopCart
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
      path:'/detail/:id',
      component:Detail,
      props:true //props+params
    },
    {
      path:'/',
      redirect:'/home'
    },
]