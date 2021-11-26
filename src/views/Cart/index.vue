<template>
  <div>
    <Toolbar></Toolbar>
    <TypeNav></TypeNav>
    <Cart_1></Cart_1>
  </div>
</template>

<script>
import Toolbar from "./Toolbar";
import TypeNav from "./TypeNav";
import Cart_1 from './Cart_1'

export default {
  name: "Cart",
  components: {
    Toolbar,
    TypeNav,
    Cart_1
  },
};
</script>

<style>
</style>