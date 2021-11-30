<template>
  <div>
    <TypeNav></TypeNav>
    <Toolbar></Toolbar>
    <Like></Like>
    <Con_1></Con_1>
    <ProductDetail></ProductDetail>
  </div>
</template>

<script>

import Toolbar from './Toolbar'
import Like from './Like'
import Con_1 from './Con_1'
import ProductDetail from './ProductDetail'
export default {
  name: "Detail",
  components: {
    Toolbar,
    ProductDetail,
    Like,
    Con_1
  },
};
</script>

<style>
</style>