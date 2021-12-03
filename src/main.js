import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from '@/components/Pagination'

//引入swiper样式文件
import 'swiper/css/swiper.min.css'

import './mock/mockServe'



Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  render: h => h(App),
}).$mount('#app')
