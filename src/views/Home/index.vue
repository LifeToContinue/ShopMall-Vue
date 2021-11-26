<template>
    <div>
      <TypeNav></TypeNav>
      <ListContainer></ListContainer>
      <TodayRecommend></TodayRecommend>
      <Rank></Rank>
      <Like></Like>
      <Floor_1></Floor_1>
      <Floor_2></Floor_2>
      <Brand></Brand>
      <Toolbar></Toolbar>
  </div>
</template>

<script>
import TypeNav from './TypeNav'
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor_1 from './Floor_1'
import Floor_2 from './Floor_2'
import Brand from './Brand'
import Toolbar from './Toolbar'

export default {
    name:'Home',
    components:{
        TypeNav,
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor_1,
        Floor_2,
        Brand,
        Toolbar
    }
}
</script>

<style>

</style>