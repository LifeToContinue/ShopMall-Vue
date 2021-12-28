<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <HintButton type='primary' size="mini" icon="el-icon-plus" title="添加">添加</HintButton>
    <HintButton type='warning' size="mini" icon="el-icon-edit" title="修改">修改</HintButton>
    <HintButton type='danger' size="mini" icon="el-icon-delete" title="删除">删除</HintButton>
    
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from '@/pages/Communication/AttrsListenersTest/HintButton'
  export default {
    name: 'AttrsListenersTest',
    components:{
      HintButton
    },

    methods: {
      
    },
  }
</script>
