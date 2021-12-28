<template>
  <div>
    
    <Child>
      <!-- 默认插槽 -->
      <template>
        <button>点我</button>
      </template>
      <!-- 具名插槽 -->
      <template slot='aa'>
        <p>我更爱李沁</p>
      </template>
    </Child>

    <!-- 
            作用域插槽 
      1、数据是在父组件当中的
      2、数据需要传递给子组件，子组件是用来展示这些数据的（v-for），展示数据的过程中，数据的结构和样式，子组件说了不算
      3、子组件需要把数据回传给父组件，父组件来决定这个数据的结构和样式
    -->





    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :todos="todos">
      <template slot-scope={todo,index} slot="todo">
        <!-- 
        {
          todo:todo         ======>   slotProps
        } 
        -->
        <span :style="{color:todo.isComplete&&'hotpink'}">{{todo.text}}</span>
      </template>
    </List>
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :todos="todos">
      <template slot-scope={todo,index} slot="todo">
        <!-- 
        {
          todo:todo         ======>   slotProps
        } 
        -->
        <span :style="{color:index%2===0?'hotpink':'skyblue'}">{{index}}{{todo.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List,
      Child
    }
  }
</script>
