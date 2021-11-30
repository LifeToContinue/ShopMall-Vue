<template>
  <div>
      <Toolbar></Toolbar>
      <TypeNav></TypeNav>
      <Main></Main>
  </div>
</template>

<script>
import Toolbar from './Toolbar'
import Main from './Main'

export default {
  name:'Search',
  components:{
    Toolbar,
    Main
  },
  mounted(){
    
  },
  beforeDestroy(){
    
  }
}
</script>

<style>

</style>