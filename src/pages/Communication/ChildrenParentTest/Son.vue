<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney(50)">给BABA钱: 50</button>
  </div>
</template>

<script>
import tmyMixin from '@/pages/Communication/ChildrenParentTest/tmyMixin'
export default {
  mixins:[tmyMixin],
  name: 'Son',
  data () {
    return {
      money: 30000
    }
  },

  methods: {
   /*  giveMoney(money){
      this.money -=money
      // this.$parent 代表的就是这个子组件对象的父组件对象
      //禁用   只要你确定这个组件只有一个父组件对象就可以用
      this.$parent.money +=money
      
    } */
  }
}
</script>
