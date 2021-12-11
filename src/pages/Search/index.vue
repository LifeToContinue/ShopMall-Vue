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
        <SearchSelector
          @get-trademark="saveTrademark"
          @get-attr="saveAttrValue"
        />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:!isPrice}" @click="changeOrder(1)">
                  <a>综合 <span v-show="!isPrice" class="iconfont" :class="{'icon-shangfan':isUp,'icon-xiafan':!isUp}"></span></a>
                </li>
                <li :class="{active:isPrice}" @click="changeOrder(2)">
                  <a>价格 <span v-show="isPrice" class="iconfont" :class="{'icon-shangfan':isUp,'icon-xiafan':!isUp}" ></span></a>
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
                    <router-link :to="`/detail/${good.id}`" 
                      ><img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>&nbsp;&nbsp;{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`"  :title="good.title">{{
                      good.title
                    }}</router-link>
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
          <!-- 分页器组件 -->
          <!-- 我们先传一些理想的模拟数据 传total pageNo continus pageSize 计算出总页数 连贯页的开始和结束 -->
          <!-- <Pagination :total="91" :pageNo="1" :pageSize="3" :continues="5"></Pagination> -->
          <Pagination
            :total="total"
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :continues="5"
            :changePageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector";
import { mapGetters } from "vuex";
export default {
  name: "Search",
  //布尔：
  // props:['keyword'],
  //对象：
  // props:['keyword'，'username'],
  //函数
  // props:['keyword'，'username','category1Id'],
  data() {
    return {
      searchParams: {
        category1Id: "", // 一级分类id
        category2Id: "", // 二级分类id
        category3Id: "", // 三级分类id
        categoryName: "", // 分类id对应的分类名称
        keyword: "", // 搜索关键词
        props: [], // 细化的分类属性 比如 屏幕尺寸 售价  像素
        trademark: "", // 品牌
        order: "2:asc", // 排序方式  1 综合  2 价格
        pageNo: 1, // 页码 是第几页 默认是第1页
        pageSize: 3, // 每页要显示的数量
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters("search", ["goodsList", "total"]),
    trademarkName() {
      // return this.searchParams.trademark.split(':')[1]
      const { trademark } = this.searchParams;
      return trademark ? trademark.split(":")[1] : "";
    },
    // 判断综合或是价格高亮
    isPrice(){
      // let num = this.searchParams.order.split(':')[0]
      // return num === '2'
      // 判断是不是价格 如果2代表的是价格需要高亮 反之则综合高亮
      return this.searchParams.order.split(':')[0] === '2'
    },
    // 判断箭头是否向上 或是向下
    isUp(){
      return this.searchParams.order.split(':')[1] === 'asc'
    }
  },
  filters: {
    fmtPropName(prop) {
      const arr = prop.split(":"); // ["24","128G","机身内存"]
      return arr[2] + ":" + arr[1];
    },
  },
  methods: {
    search() {
      // 重新发送请求
      this.$store.dispatch("search/getSearchInfoData", this.searchParams);
    },
    // 1. 移除三级导航分类名
    removeCategoryName() {
      // 当我们单击了删除某面包屑参数的时候，发生了什么？
      // 1. 面包屑要消失
      // 2. 地址栏中的对应参数数据也要消失 也就是地址栏中的三级导航分类名称和分类ID要消失
      // 3. 当前面的数据要根据剩余面包屑参数进行渲染 需要重新发送请求

      // 获取地址栏中的数据 其实就相当于是剩下了搜索关键词
      const { keyword } = this.$route.query;

      // 根据搜索关键词改变浏览器地址栏 并发送请求
      this.$router.push({
        name: "search",
        query: {
          // keyword:keyword
          keyword,
        },
      });

      // 再次去发送请求 获取最新地址栏中相关参数的数据显示在下面的商品列表中
    },
    // 2. 移除面包屑中的关键词
    removeKeyword() {
      // 其实移除某面包屑就相当于是留下地址栏中剩余项
      // 思路就是剩下categoryName 将keyword设置为undefined
      const { query } = this.$route;
      // 改变路由地址
      this.$router.push({
        name: "search",
        query: {
          ...query,
          keyword: undefined, // 路由会过滤掉值为undefined的参数
        },
      });

      // 触发事件总线上的事件
      this.$bus.$emit("remove-keyword");
    },
    // 3. 在面包屑位置 显示商品品牌trademark
    saveTrademark(trademark) {
      // 拼接符合要求的参数字符串 trademark:"id:名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // console.log(this.searchParams.trademark);
      // 当前的SearchSelect组件中的品牌不需要拼接在地址栏，只需要显示在面包屑位置 并将获取的数据重新渲染在下面的商品列表中即可

      // 重新发送请求
      // this.$store.dispatch("search/getSearchInfoData", this.searchParams);
      this.search();
    },
    // 4. 移除品牌面包屑
    removeTrademark() {
      // 所谓移除掉某个面包屑 其实就是将那个数据设置为undefined
      // 因为移除某项面包屑之后，要重新发送请求，发送请求的时候，路由会将undefined值过滤掉
      this.searchParams.trademark = undefined;

      // 根据剩下或是修改后的参数继续发送请求，重新渲染商品列表
      // 重新发送请求
      // this.$store.dispatch("search/getSearchInfoData", this.searchParams);
      this.search();
    },
    // 5. 添加售卖属性面包屑
    saveAttrValue(attrValue, parent) {
      // console.log();
      // searchParams.props是一个数组，是发送给服务器的真正的售卖属性参数
      const prop = `${parent.attrId}:${attrValue}:${parent.attrName}`;
      // console.log(prop);
      if (this.searchParams.props.indexOf(prop) == -1) {
        // 如果没有这个属性的话，才需要往里添加 如果已经有了，就不需要再添加了
        this.searchParams.props.push(prop);

        // 重新发送请求
        // this.$store.dispatch("search/getSearchInfoData", this.searchParams);
        this.search();
      }
    },
    // 6. 删除某一个售卖属性
    removeProp(index) {
      // 从searchParams.props这个数组中删除指定索引的那条数据 [10,20,30]
      // console.log(this.searchParams.props);
      // console.log('index',index);
      this.searchParams.props.splice(index, 1);

      // 继续发送请求
      // 重新发送请求
      // this.$store.dispatch("search/getSearchInfoData", this.searchParams);
      this.search();
    },
    // 7. 获取传递过来的新页码
    getPageNo(currentPage) {
      // console.log('currentPage',currentPage);
      // 根据新页码去更新pageNo
      this.searchParams.pageNo = currentPage;

      // 重新发送请求
      this.search();
    },
    // 8. 排序
    changeOrder(newNum){
      /**
       * 基本思路:
       * 1. 首先先获取order中的原来的值 oldNum值 及排序的类型asc desc
       * 2. 用最新的newNum和原来的oldNumnum进行比较 来判断需要不需要高亮
       * 3. 如果两个值相同 说明单击的还是原来的按钮，此时不需要改变高亮，只需要将排序取反
       */
      // 8.1 先获取order中原来的数据
      // const oldNum = this.searchParams.order.split(':')[0]
      // const oldType = this.searchParams.order.split(':')[1]

      const [oldNum,oldType] =this.searchParams.order.split(":")
      
      // 8.2 用传过来的数字和原来的数字进行判断
      if(oldNum == newNum){ 
        // 说明 当前高亮不需要改变 只需要改变排序状态即可 也就是修改order中的排序
        this.searchParams.order = `${oldNum}:${oldType==='asc'?'desc':'asc'}`
      }else {
        this.searchParams.order = `${newNum}:desc`
      }

      // 8.3 发送请求进行排序
      this.search()
    }
  },
  watch: {
    // 不需要开启深度监视
    $route: {
      immediate: true, // 第一次监视的时候，就立即执行
      handler() {
        // console.log(this.$route.query);
        // 将路由中的数据更新到searchParams中
        // 三级分类不可能同时将真正的数据一并发送给服务器，只能是有一个带着分类名称发给服务器
        // this.searchParams.category1Id = undefined
        // this.searchParams.category2Id = undefined
        // this.searchParams.category3Id = undefined

        // 每次更新数据前，先将之前的数据清掉，也就是置为undefined 因为路由会过滤掉undefined
        Object.assign(this.searchParams, {
          category1Id: undefined,
          category2Id: undefined,
          category3Id: undefined,
          categoryName: undefined,
          keyword: undefined,
        });

        // 比较好的办法  使用后面的参数将前面的数据给覆盖掉(合并掉)
        Object.assign(this.searchParams, this.$route.query,this.$route.params);

        this.$store.dispatch("search/getSearchInfoData", this.searchParams);
      },
    },
  },

  mounted() {
    //
    // this.$store.state.bannerList
    // this.$store.state.searchInfo.goodslist
  },
};

/**
 * 1. 准备参数 完成
 * 			将所有的请求参数放在data中的searchParams当中
 * 2. 根据参数发送请求
 * 		  1. 如果根据最新的参数去发送请求
 * 3. watch监视数据变化
 * 		  只要是vm上的数据或是vc(VueComponent)上的数据 都可以watch进行监视
 * 			当监视路由对象$route的时候，不要深度监视
 * 			因为每一次路由跳转都会生成一个新的$route
 *
 */
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