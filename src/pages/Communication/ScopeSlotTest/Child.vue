<template>
  <div>
      <h2>我爱你赵丽颖</h2>
      <!-- 
          插槽   占位挖坑
          父组件在使用这个子组件的适合，可以传递结构和样式数据进行天坑
          一个组件当中默认插槽只能有一个
        -->
      <slot>哈哈</slot>

      <!-- 具名插槽 -->
      <slot name='aa'>嘿嘿</slot>
  </div>
</template>

<script>
export default {
    name:'Child',
    data(){
        return{

        }
    }
}
</script>

<style>

</style>