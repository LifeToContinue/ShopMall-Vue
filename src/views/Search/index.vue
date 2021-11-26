<template>
  <div>
      <Toolbar></Toolbar>
      <TypeNav></TypeNav>
      <Main></Main>
  </div>
</template>

<script>
import Toolbar from './Toolbar'
import TypeNav from './TypeNav'
import Main from './Main'

export default {
  name:'Search',
  components:{
    Toolbar,
    TypeNav,
    Main
  }
}
</script>

<style>

</style>