<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoneyXM(100)">找小明借钱100</button><br>
    <button @click="borrowMoneyXH(150)">找小红借钱150</button><br>
    <button @click="borrowMoneyALL(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son"/>

    <br>
    <Daughter ref="daughter"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
    borrowMoneyXM(money){
      this.money+=money
      // this.$refs.son  获取到子组件对象
      //获取到子组件对象之后，就可以操作子组件内部的所有的数据和方法
      this.$refs.son.money -=money
    },
    borrowMoneyXH(money){
      this.money+=money
       this.$refs.daughter.money -=money
    },
    borrowMoneyALL(money){
      this.money+=money*2
      this.$refs.son.money -=money
      this.$refs.daughter.money -=money
      //this.$children 拿的是所有的子组件对象组成的数组
      // this.$children.forEach(item=>item.money-=money)
    }
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
