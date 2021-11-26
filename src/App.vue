<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 通过路由元的方式来控制底部是否显示 -->
    <Footer></Footer>
  </div>
</template>

<script>
//引入其它组件 App.vue相当于一个组件的大容器
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{Header,
    Footer}
}
</script>

<style>

</style>