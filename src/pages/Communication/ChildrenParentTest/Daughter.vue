<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
import tmyMixin from '@/pages/Communication/ChildrenParentTest/tmyMixin'
export default {
  name: 'Daughter',
  mixins:[tmyMixin],
  data () {
    return {
      money: 20000
    }
  },

  methods: {
    
  }
}
</script>
