<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级导航中的分类 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索关键词 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌属性 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ trademarkName }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 售卖属性 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="prop"
            >
              {{ prop | fmtPropName }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <SearchSelector @get-trademark="saveTrademark"  @get-attr="saveAttrValue"/>

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :total="91" :pageNo="16" :pageSize="3" :continues="5"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "", //一级分类id
        category2Id: "", //二级分类id
        category3Id: "", //三级分类id
        categoryName: "", //分类id对应的分类名称
        keyword: "", //搜索关键词
        props: [], //细化的分类属性  比如：屏幕尺寸 售价登
        trademark: "", //品牌
        order: "", //排序方式
        pageNo: 1, //页码
        pageSize: 40, //每页要显示的数量
      },
    };
  },
  methods: {

    search(){
       this.$store.dispatch("search/getSearchInfoData", this.searchParams);
    },
    //1.移出面包屑中的三级导航分类名
    removeCategoryName() {
      const { keyword } = this.$route.query;
      this.$router.push({
        name: "search",
        // query: { keyword: this.searchParams.keyword } // 要把关键词留下来 但是这种情况下会发两次请求 如果按之前的话
        query: { keyword },
      });
    },
    //2.移出面包屑中的关键词
    removeKeyword() {
      const { query } = this.$route;
      this.$router.push({
        name: "search",
        query: {
          ...query,
          keyword: undefined, //路由会过滤掉值为undefined的参数
        },
      });

      //触发事件总线上的事件
      this.$bus.$emit('remove-keyword')
    },
    handlerTrade(trademark) {
      // 触发自定义事件，将数据传递过去
      this.$emit("get-trademark", trademark);
    },
    // 保存SearchSelector传递过来的trademark
    saveTrademark(trademark) {
      // 将trademark维护到searchParams中
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 发请求
      this.search()
    },
    removeTrademark() {
      // 所谓移除掉某个面包屑 其实就是将那个数据设置为undefined
      // 因为移除某项面包屑之后，要重新发送请求，发送请求的时候，路由会将undefined值过滤掉
      this.searchParams.trademark = undefined;

      // 根据剩下或是修改后的参数继续发送请求，重新渲染商品列表
      // 重新发送请求
      this.search()
    },
    saveAttrValue(attrValue, parent) {
      // console.log();
      const prop = `${parent.attrId}:${attrValue}:${parent.attrName}`;
      //如果没用这个属性的话，才需要往里添加，如果有了，则不需要添加
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
      }
      this.search()
    },
    removeProp(index){
      //从searchParams.props这个数组总删除指定索引的那条数据
      this.searchParams.props.splice(index,1)
      //继续发送请求
      this.search()
    }
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    trademarkName() {
      const { trademark } = this.searchParams;
      return trademark ? trademark.split(":")[1] : "";
    },
  },
  filters: {
    fmtPropName(rawPropName) {
      const nameAttr = rawPropName.split(":");
      return nameAttr[2] + ":" + nameAttr[1];
    },
  },
  components: {
    SearchSelector,
  },
  watch: {
    //不需要开启深度监视，因为每一次路由的变化  都会生成一个新的路由数据对象 this.$route.query
    $route: {
      immediate: true, //第一次见识的时候就要触发
      handler() {
        // console.log(this.$route.query);
        Object.assign(this.searchParams, {
          category1Id: undefined, //一级分类id
          category2Id: undefined, //二级分类id
          category3Id: undefined, //三级分类id
          categoryName: undefined, //分类id对应的分类名称
          keyword: undefined, //搜索关键词
        });

        //把路由传递过来的query参数整合到searchParams中，供以后发请求使用
        Object.assign(this.searchParams, this.$route.query);

        this.$store.dispatch("search/getSearchInfoData", this.searchParams);
      },
    },
  },
  mounted() {
    this.searchParams.category1Id = this.$route.query.category1Id;
    this.searchParams.categoryName = this.$route.query.categoryName;
  },
  updated() {
    this.searchParams.category1Id = this.$route.query.category1Id;
    this.searchParams.categoryName = this.$route.query.categoryName;
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>