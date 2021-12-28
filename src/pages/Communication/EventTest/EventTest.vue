<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生DOM事件在html标签上使用 -->
    <button  @click="test1($event)">test1</button>
    <!-- ($event)=>{
      test1($event)
    } -->

    <!-- 原生DOM事件在组件标签身上使用 
            此时这个DOM事件就不再是原生DOM事件了，变成了自定义事件
            我还想让你是一个原生事件，此时我们需要用到一个事件修饰符.native
            这个原生时间会添加到子组件的根元素身上，形成事件委派
    -->
    <Event1 @click.native="test2"></Event1>
    
    
    <!-- 自定义事件在html身上使用 ,----无意义-->
    <button @xxx="test3">test3</button>

    <!-- 自定义事件在组件标签身上使用 -->
    <Event2 @click="test4" @xxx="test4"></Event2>
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
     test1(event){
       console.log(event.target.innerHTML);
     },
     test2(event){
       console.log(event.target.innerHTML);
     },
     test3(event){
       console.log(event.target.innerHTML);
     },
     test4(event){
       console.log(event)

     },
    }
  }
</script>
