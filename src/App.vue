<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 通过路由元的方式来控制底部是否显示 在Footer组件中控制的是第1个 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 引入其它组件  App.vue相当于一个组件的大容器
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer"; // 可以省略index.vue
export default {
  name: "App",
  components: {
    // 注册组件
    Header,
    Footer,
  },
  mounted(){
    // 三级导航的派发请求
    this.$store.dispatch('home/getCategoryListData')
  }
};
</script>

<style>
</style>