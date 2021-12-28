<template>
  <a href="javascript:;" title="">
      <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
    name:'HintButton',
    data(){
        return{
            
        }
    },
    props:['title']
}
</script>

<style>

</style>