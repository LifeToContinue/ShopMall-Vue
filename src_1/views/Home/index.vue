<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor  v-for="floor in floorList" :key="floor.id" :floor="floor" :cname="'floor-swiper'+floor.id"></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
    <Toolbar></Toolbar>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import Toolbar from "./Toolbar";

import {mapState} from 'vuex'


export default {
  name: "Home",
  data(){
    return{
      cname:''
    }
  },
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
    Toolbar,
  },
  computed:{
    ...mapState('home',['floorList'])
  },
  mounted() {
    this.$store.dispatch('home/getFloorsListData')
  },
  beforeDestroy() {
   
  },
};
</script>

<style>
</style>