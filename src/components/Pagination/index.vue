<template>
  <div class="pagination">
    <button :disabled="currentPage===1" @click="$emit('changePageNo',currentPage-1)"> 上一页</button>
    <button v-if="startEnd.start>1" @click="$emit('changePageNo',1)"> 1</button>
    <button v-if="startEnd.start>2">···</button>

    <!-- v-for和v-if同时使用，v-for优先级大于v-if
      官方不推荐这么使用，但是可以使用:效率慢，遍历一个判断一个
     -->

    <!-- <button v-for="(page,index) in startEnd.end" :key="page" v-if="page>=startEnd.start">{{page}}</button> -->
    <!-- 上面的做法不推荐，如何优化   计算属性去计算出来不需要判断直接遍历的数据 -->
    <button @click="$emit('changePageNo',page)" :class="{active:currentPage===page}" v-for="(page,index) in continueNoArr" :key="page">{{page}}</button>

    <button  v-if="startEnd.end<totalPageNo-1">···</button>
    <button v-if="startEnd.end<totalPageNo" @click="$emit('changePageNo',totalPageNo)">{{totalPageNo}}</button>
    <button :disabled="currentPage===totalPageNo" @click="$emit('changePageNo',currentPage+1)">下一页</button>

    <span>共{{total}}条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage:Number,
    total:{
      type:Number,
      default:0
    },
    pageSize:{
      type:Number,
      default:10
    },
    continueNo:{
      type:Number,
      default:5
    }
  },
  computed: {
    // 在这个位置 我们要计算出来 总页数totalPage
    // 还要算连贯页的开始和结束
    totalPageNo() {
      //  const {total,pageSize} = this
      //  return Math.ceil(this.total / this.pageSize)
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    startEnd() {
      const { currentPage, continueNo, totalPageNo } = this;
      // console.log(currentPage, continueNo, totalPageNo);
      let start=0;
      let end=0;
      // if (continues > this.totalPage) {
      if (totalPageNo<=continueNo) {
        // total 13  pageSize5  totalPage3页
        // 当连贯页数大于总页数的时候，比如continues是5 而总页数只有4
        end = totalPageNo; // 最后一页就是总页数
        start = 1; // 所以起始页是1
      } else {
        start = currentPage - Math.floor(continueNo / 2);
        end = currentPage + Math.floor(continueNo / 2);

        // 如果计算起始页小于1了,则起始页只能是1
        if (start < 1) {
          start = 1;
          end = continueNo; // 就是相当于从起始页重新排列continues个页码
        }
        if (end > totalPageNo) {
          // 如果算出来的连贯页中的结束页大于了总页数
          end = totalPageNo; // 结束只能是总页数
          start = totalPageNo - continueNo + 1; // 开始页是从结束页向前推continues个 但是要加1
        }
      }

      return { start, end };
    },
    continueNoArr(){
      let {start,end}=this.startEnd
      let arr=[]
      for(let i=start;i<=end;i++){
        arr.push(i)
        // console.log(arr);
      }
      return arr
    }
  },
  methods: {
    // handlerChangePageNo(num){
    //  this.changePageNo(num)
    // }
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #c81623;
      color: #fff;
    }
  }
  span {
    display: inline-block;
    line-height: 28px;
    font-size: 14px;
    color: gray;
    vertical-align: middle;
  }
}
</style>