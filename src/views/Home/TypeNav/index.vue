<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2">
            <div class="item" v-for="c1 in categoryList.slice(0,-2)" :key="c1.id">
              <h3>
                <a href="">{{c1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix" @click="btnSearch">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.id">
                    <dt>
                      <a href="">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em>
                        <a href="" v-for="c3 in c2.categoryChild" :key="c3.id"> {{c3.categoryName}} |</a>
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
import {mapState} from 'vuex'
export default {
  name: "TypeNav",
  computed:{
    //现在分模块了，所以使用mapState的时候，第一项应该制定模块名称
    ...mapState('home',['categoryList'])
  },
  methods:{
    btnSearch(){
      this.$router.push('/search')
    }
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
    this.$store.dispatch('home/getCategoryListData')
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