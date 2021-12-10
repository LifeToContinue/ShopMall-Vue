import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
// 引入swiper样式文件
import 'swiper/css/swiper.min.css'

import './mock/mockServer' // 引入进来之后开启服务器  相当于已经开启服务器了


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
  },
  render: h => h(App),
}).$mount('#app')

console.log('mainvm',vm);


