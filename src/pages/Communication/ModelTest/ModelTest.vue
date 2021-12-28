<template>
  <div>
    <h2>深入v-model</h2>

    <input type="text" v-model="msg">
    <span>{{msg}}</span>

    <input type="text" :value="msg" @input="msg=$event.target.value">
    <span>{{msg}}</span>

    <CustomInput :value="msg" @input="msg=$event"></CustomInput>
    <CustomInput v-model="msg"></CustomInput>
    <!-- 
      1.在父组件当中通过 :value 绑定msg数据，由于是在组件标签身上，所有是props传递
      2.在子组件当中通过 props声明接收到父组件传递过去的value，就可以在子组件当中使用
      3.在父组件当中给子组件标签绑定自定义事件@input="msg=$event"
      4.在子组件当中绑定input事件，触发input之后，再去触发自定义事件，把子组件当中最新的input数据，传递给父组件
      5.父组件拿到子组件传递的最新数据，把msg修改
      6.父组件msg一旦改变，第1步给子组件传递的value就会重新传递渲染，子组件里面的value就会发生改变

      最终实现父子双向数据同步
     -->
      <!-- 
          v-model="msg"


        :value="msg" @input="msg=$event"


        实现效果是一样的



       -->
    <br>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    components: {
      CustomInput
    },
    data(){
      return{
        msg:"赵丽颖"
      }
    }
  }
</script>
