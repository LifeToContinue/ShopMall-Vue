<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <!-- 样式和结构一旦这样写就写死了，就没有复用的意义了 -->
      <!-- <span :style="{color:todo.isComplete?'green':''}">{{todo.text}}</span> -->
      <slot name="todo" :todo="todo" :index="index">{{todo.text}}</slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    todos: Array
  }
}
</script>