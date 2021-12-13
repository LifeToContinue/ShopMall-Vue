<template>
  <div class="pagination">
    <button @click="changePageNo(pageNo - 1)" :disabled="pageNo == 1 || totalPage<1">
      上一页
    </button>
    <!-- 当起始页已经是1了 现在这个已经存在的1就不要显示 -->
    <button v-show="startAndEnd.start > 1" @click="changePageNo(1)">1</button>
    <span v-show="startAndEnd.start > 2">...</span>
    <!-- <button>{{ startAndEnd.start }}</button>
    遍历出来...
    <button>{{ startAndEnd.end }}</button> -->
    <!-- <button v-for="(_,index) in continues" :key="_" :class="{active: pageNo === index + startAndEnd.start}">
      {{index + startAndEnd.start}}
    </button> -->

    <!-- <button
      v-for="(_, index) in startAndEnd.end - startAndEnd.start + 1"
      :key="_"
      :class="{ active: pageNo === index + startAndEnd.start }"
      @click="handlerChangePageNo(index + startAndEnd.start)"
    >
      {{ index + startAndEnd.start }}
    </button> -->
    <button
      v-for="(_, index) in startAndEnd.end - startAndEnd.start + 1"
      :key="_"
      :class="{ active: pageNo === index + startAndEnd.start }"
      @click="changePageNo(index + startAndEnd.start)"
    >
      {{ index + startAndEnd.start }}
    </button>

    <button v-show="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-show="startAndEnd.end < totalPage"
      @click="changePageNo(totalPage)"
    >
      总页数：{{ totalPage }}
    </button>
    <button @click="changePageNo(pageNo + 1)" :disabled="pageNo ==totalPage || totalPage<1">下一页</button>

    <span>共 {{ total }} 条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageNo", "pageSize", "continues", "changePageNo"],
  computed: {
    // 在这个位置 我们要计算出来 总页数totalPage
    // 还要算连贯页的开始和结束
    totalPage() {
      //  const {total,pageSize} = this
      //  return Math.ceil(this.total / this.pageSize)
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    startAndEnd() {
      const { pageNo, continues, totalPage } = this;
      let start, end;
      // if (continues > this.totalPage) {
      if (continues > totalPage) {
        // total 13  pageSize5  totalPage3页
        // 当连贯页数大于总页数的时候，比如continues是5 而总页数只有4
        end = totalPage; // 最后一页就是总页数
        start = 1; // 所以起始页是1
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);

        // 如果计算起始页小于1了,则起始页只能是1
        if (start < 1) {
          start = 1;
          end = continues; // 就是相当于从起始页重新排列continues个页码
        }
        if (end > totalPage) {
          // 如果算出来的连贯页中的结束页大于了总页数
          end = totalPage; // 结束只能是总页数
          start = totalPage - continues + 1; // 开始页是从结束页向前推continues个 但是要加1
        }
      }

      return { start, end };
    },
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