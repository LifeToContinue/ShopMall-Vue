import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
import '@/plugins/lazyload'

// 引入swiper样式文件
import 'swiper/css/swiper.min.css'

//element-ui的完整引入
/* import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI) */

//element-ui的按需引入
import { Button,MessageBox,Message,Input } from 'element-ui';
// Vue.component(Button.name, Button);    上线两种形式一样
Vue.use(Button)
Vue.use(Input)
/* 
  按需引入的时候注意：重点
  element-ui当中其实包含两大类组件
  一大类是可以写组件标签使用的  例如Button
  另外一大类是没办法写组件标签使用的，而是通过js去实现
    这一类组件其实最终是一个对象或者一个函数，它并不是我们认为的组件
    它代表的是一个功能，那么这一类组件，我们要用就是挂在vue的原型身上
    再用的时候直接调用这个js功能  例如 MessageBox
*/
//这就是第二类组件的注册方式
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;



import './mock/mockServer' // 引入进来之后开启服务器  相当于已经开启服务器了

import * as API from '@/api'




Vue.config.productionTip = false // 关闭生产提示

// 注册成全局组件
// Vue.component('TypeNav', TypeNav)
Vue.component(TypeNav.name, TypeNav)

Vue.component(Pagination.name,Pagination)


const vm = new Vue({
  router,
  store, // 和vm对象进行关联
  beforeCreate() {  // 注册全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
}).$mount('#app')

console.log('mainvm',vm);


