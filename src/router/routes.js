// const Home=()=>import()
const Home = () => import('../pages/Home')
// import Login from '../pages/Login'
const Login=()=>import('../pages/Login')
// import Register from '../pages/Register'
const Register=()=>import('../pages/Register')
// import Search from '../pages/Search'
const Search=()=>import('../pages/Search')
// import Detail from '@/pages/Detail'
const Detail=()=>import('@/pages/Detail')
// import AddCartSuccess from '@/pages/AddCartSuccess'
const AddCartSuccess=()=>import('@/pages/AddCartSuccess')
// import ShopCart from '@/pages/ShopCart'
const ShopCart=()=>import('@/pages/ShopCart')
// import Pay from '@/pages/Pay'
const Pay=()=>import('@/pages/Pay')
// import PaySuccess from '@/pages/PaySuccess'
const PaySuccess=()=>import('@/pages/PaySuccess')
// import Trade from '@/pages/Trade'
const Trade=()=>import('@/pages/Trade')
// import Center from '@/pages/Center'
const Center=()=>import('@/pages/Center')
// import MyOrder from '@/pages/Center/MyOrder'
const MyOrder=()=>import('@/pages/Center/MyOrder')
// import GroupOrder from '@/pages/Center/GroupOrder'
const GroupOrder=()=>import('@/pages/Center/GroupOrder')


/* import XXX from './xxx'    叫同步引入，也叫静态引入，它不能动态引入，想用的时候在引入是不行的
同步引入必须是放在文件最上面，一上来所有的都已经引入了
webpack在打包的时候会把所有的引入的组件统统打包，打包成一个大的文件
这个打包的文件越大，浏览器在加载的时候越费劲，效率会越低
因此，我们以后生产阶段路由组件在引
入的时候都不会使用这种方式同步引入

而是要利用动态引入
import('./xxx') 叫动态引入，如果我们使用这个引入方式，那么
webpack在看到我们使用动态引入方式，会把动态引入的所有组件，单独进行打包
每个路由组件会单独打包成一个小的组件，小的文件浏览器不会立即去加载，而是当我们访问对应的每个路由界面的时候才会加载对应的小文件
打包的主文件变小，浏览器加载速度会更快 */




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
    component:AddCartSuccess,
    //路由独享守卫

    beforeEnter: (to, from, next) => {
      let skuNum=to.query.skuNum
      let skuInfo=sessionStorage.getItem('skuInfo_key')
      if(skuNum && skuInfo){
        next()
      }else{
        next('/')
      }
    }
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
    name:'pay',
    path:'/pay',
    component:Pay,
    beforeEnter: (to, from, next) => {
      if(from.path==='/trade'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    name:'paySuccess',
    path:'/paySuccess',
    component:PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path==='/pay'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    name:'trade',
    path:'/trade',
    component:Trade,
    beforeEnter: (to, from, next) => {
      if(from.path==='/shopCart'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    name:'center',
    path:'/center',
    component:Center,
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'/center',
        redirect: '/center/myorder'
      },
      {
        path: '/communication',
        component: () => import('@/pages/Communication/Communication'),
        children: [
          {
            path: 'event',
            component: () => import('@/pages/Communication/EventTest/EventTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'model',
            component: () => import('@/pages/Communication/ModelTest/ModelTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'sync',
            component: () => import('@/pages/Communication/SyncTest/SyncTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'attrs-listeners',
            component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'children-parent',
            component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
            meta: {
              isHideFooter: true
            },
          },
          {
            path: 'scope-slot',
            component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
            meta: {
              isHideFooter: true
            },
          }
        ],
      },
      
    ]
  }
]