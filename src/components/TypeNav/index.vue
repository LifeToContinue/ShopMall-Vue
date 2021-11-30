<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="handlerLeave">
        <h2 class="all" @mouseenter="isShowNav = true">全部商品分类</h2>
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2" @click="btnSearch">
            <div
              class="item"
              v-for="c1 in categoryList.slice(0, -2)"
              :key="c1.categoryId"
            >
              <h3>
                <a
                  data-level="1"
                  :data-id="c1.categoryId"
                  :data-name="c1.categoryName"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" @click="btnSearch">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.id">
                    <dt>
                      <a
                        data-level="2"
                        :data-id="c2.categoryId"
                        :data-name="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.id">
                        <a
                          data-level="3"
                          :data-id="c3.categoryId"
                          :data-name="c3.categoryName"
                        >
                          {{ c3.categoryName }} |</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import ajax from "../../../api/ajax";

// import {reqCategoryListData} from "../../../api";
// import {reqCategoryListData} from '@/api'
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isShowNav: true,
    };
  },
  computed: {
    //现在分模块了，所以使用mapState的时候，第一项应该制定模块名称
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    btnSearch(e) {
      // this.$router.push('/search')
      // console.log(e.target);
      // console.log(e.target.dataset);
      let { id, level, name: categoryName } = e.target.dataset;
      //市局是否有id level name的确切值来判断是不是真正要跳转
      if (!level) return;
      const {keyword}=this.$route.query
      this.$router.push({
        name: "search",
        query: {
          keyword,//拼接上之前的参数
          ["category" + level + "Id"]: id,
          categoryName,
        },
      });
    },
    handlerLeave() {
      //search组件中 如果鼠标离开父级标签，则让isShowNav=false
      //但是在Home组组件中的TypeNav中，即使鼠标离开了父级标签  也不能隐藏
      if (!this.$route.meta.isShowTypeNav) {
        //this.$route.name==="search"
        //能进到这里面，说明是search页面
        this.isShowNav = false;
      }
    },
  },
  mounted() {
    //可以在这里发请求
    // axios.get('http://39.98.123.211/api/product/getBaseCategoryList')
    // .then((result)=>
    //   console.log(result),
    // )

    //封装后的请求  不用谢公共服务器地址
    /* ajax
      .get("/api/product/getBaseCategoryList")
      .then((result) => console.log(result)); */

    //统一管理
    // reqCategoryListData().then(
    //   (result) => console.log(result),
    //   (error) => console.log(error.message)
    // );

    //使用vuex的形式来获取数据  在这里需要dispatch actions方法
    // this.$store.dispatch('home/getCategoryListData')
    // console.log(this.$route);

    //下面这个判断是判断的search页面，当跳转到search页面的时候meta中是没有isShowTypeNav
    if (!this.$route.meta.isShowTypeNav) {
      //this.$route.name==="search"
      //能进到这里面，说明是search页面
      this.isShowNav = false;
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

         &:hover {
            background-color:#d9d9d9;
            cursor: pointer;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>