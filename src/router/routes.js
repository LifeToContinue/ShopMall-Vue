import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

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
    component:ShopCart,

    
  },
  {
    name:'search', // 路由名称
    path: '/search/:keyword?',
    component: Search,
    /* 
      props配置是简化操作传递过去的路由参数
      -布尔：
        props:true    
        会把路由传递的params参数映射为组件内部的属性
      -对象
        proms:{username:'赵丽颖'} 
        会把对象内部的属性映射为组件内部的属性，一般用来传递一个额外的参数
      -函数
        props(){
          return{keyword:route.params.keyword,category1Id:route.query.category1Id}
        }
        可以手动的去映射params或者query参数
    */
  },
  {
    path: '/',
    redirect: '/home'
  }
]