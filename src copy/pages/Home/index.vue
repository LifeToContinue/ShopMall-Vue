<template>
  <div>
    <!-- 三级导航  -->
    <TypeNav></TypeNav>

    <!-- 轮播图 -->
    <ListContainer></ListContainer>

    <!-- 今日推荐 -->
    <Recommend></Recommend>

    <!-- 商品排行 -->
    <Rank></Rank>

    <!-- 猜你喜欢 -->
    <Like></Like>

    <!-- 楼层 -->
    <Floor v-for="floors in floorsList" :floors="floors" :cname="'floors-container'+floors.id" :key="floors.id"></Floor>

    <!-- 商品排行 -->
    <Brand></Brand>
  </div>
</template>

<script>
// import TypeNav from "./TypeNav";
import {mapState} from 'vuex'
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home", // 添加组件名称
  data(){
    return {

    }
  },
  // components: { TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand },
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  computed:{
    // 如果没有mapState的话，只能使用this.$store.state.floorsList来访问
    // 使用mapState辅助函数映射了Vuex中的数据到当前组件中，就相当于给当 前组件的data添加了一个floorsList
    ...mapState('home',['floorsList'])
  },
  mounted(){
    // 在此处去发请求，获取楼层的数据
    // console.log('home中的mounted代码执行了...');
    this.$store.dispatch('home/getFloorsListData')
  }

};
</script>

<style>
</style>