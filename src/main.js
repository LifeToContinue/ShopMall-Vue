import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
//引入swiper样式文件
import 'swiper/css/swiper.min.css'

import './mock/mockServe'



Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
