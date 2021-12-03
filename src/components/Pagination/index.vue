<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <span>...</span>
    <!-- <button>{{ startAndEnd.start }}</button>
    <button>{{ pageNo - 1 }}</button>
    <button>{{ pageNo }}</button>
    <button>{{ pageNo + 1 }}</button>
    <button>{{ startAndEnd.end }}</button> -->
    <button v-for="(_,index) in continues" :key="index">{{startAndEnd.start+index}}</button>
    <button>···</button>
    <button>{{ totalPage }}</button>
    <button>总页数：{{ totalPage }}</button>
    <button>下一页</button>

    <span>共 {{ total }} 条</span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageNo", "pageSize", "continues"],
  computed: {
    //总页数totalPage
    totalPage() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    //连续页的开始和结束
    startAndEnd() {
      const { pageNo, continues } = this;
      let start, end;
      //当连贯页数大于总页数的时候
      if (continues > this.totalPage) {
        end = this.totalPage;
        start = 1;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      //当计算起始页小于1 则其实也只能是1
      if(start<1){
          start=1
          end=continues
      }
      if(end>this.totalPage){
          end=this.totalPage
          start=this.totalPage-continues+1
      }

      return { start, end };
    },
  },
  mounted() {
    console.log(this.total, this.pageNo, this.pageSize, this.continues);
    console.log(typeof this.total);
  },
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