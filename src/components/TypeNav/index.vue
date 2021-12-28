<template>
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="handlerLeave">
        <h2 class="all" @mouseenter="isShowNav = true">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShowNav">
            <div class="all-sort-list2" @click="btnSearch">
              <div
                class="item"
                v-for="c1 in categoryList.slice(0, -2)"
                :key="c1.categoryId"
              >
                <h3>
                  <a :data-id1="c1.categoryId" :data-name="c1.categoryName">{{
                    c1.categoryName
                  }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-id2="c2.categoryId"
                          :data-name="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-id3="c3.categoryId"
                            :data-name="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
// import axios from "axios";
// import ajax from '../../../api/ajax'
// import ajax from '@/api/ajax'
// import {reqCategoryListData} from '../../../api'
import { mapState } from "vuex"; // 引入mapState
export default {
  name: "TypeNav", // 组件名
  data() {
    return {
      isShowNav: true,
    };
  },
  computed: {
    // 现在分模块了，所以使用mapState的时候，第一项应该指定模块名称
    ...mapState("home", ["categoryList"]), // 就相当于将vuex中的数据映射到当前组件上了
  },
  methods: {
    btnSearch(event) {
      //点击之后，获取到点击id元素
      let target = event.target;
      //从点击的元素身上盲区，data-开头自定义属性组成的对象
      let dataset = target.dataset;
      //盲解
      let { id1, id2, id3, name } = dataset;

      if (name) {
        //代表点的是a标签
        let location = {
          name: "search",
        };
        let query = {
          categoryName: name,
        };
        if (id1) {
          query.category1Id = id1;
        } else if (id2) {
          query.category2Id = id2;
        } else {
          query.category3Id = id3;
        }

        location.query = query;

        //判断之前有没有params,合并参数
        location.params = this.$route.params;
        this.$router.push(location);
      }
    },

    /* btnSearch(event) {
      // 只要事件被触发，就会有一个默认的事件对象，用的时候就写上，不用就不写
      // console.log(event);
      // console.log(event.target);
      // console.log(event.target.dataset);// 获取标签上的所有的自定义属性 是一个对象
      // this.$router.push('/search') 不传参数的时候直接写路径
      // let {id,level,name} = event.target.dataset
      // 解构的时候，可以给某个值取一个别名
      let { id, level, name: categoryName } = event.target.dataset;

      // let level = event.target.dataset.level
      // 根据是否有id level name的确切值来判断是不是真正要跳转
      // if(!level) {
      //   return // 阻止代码的向下执行
      // }

      if (!level) return; // 阻止代码的向下执行
      // console.log(this.$route);
      const {keyword} = this.$route.query
      this.$router.push({
        name: "search", // 路由名称
        query: {
          keyword,  // 拼接上之前的参数
          ["category" + level + "Id"]: id,
          categoryName,
        },
      });
    }, */

    // 鼠标离开时的操作
    handlerLeave() {
      // search组件中 如果鼠标离开了父级标签，则让isShowNav=false
      // 但是在Home组件中的TypeNav中，即使鼠标离开了父级标签 也不能隐藏
      if (!this.$route.meta.isShowTypeNav) {
        // 能进到这里面，说明是search页面
        this.isShowNav = false;
      }
    },
  },
  mounted() {
    // 1. 原始的请求方式 没有封装时 可以在这里发送请求
    // axios
    //   .get("http://39.98.123.211/api/product/getBaseCategoryList")
    //   .then((result) => console.log(result),err=>console.log(err.message));

    // 2. 封装后的请求 虽然不用写公共的服务器地址了,但是这样发送请求还是有问题的,比如将来要更新接口
    // 为了将来更好的维护或是更新,应该将发送请求的这种操作统一管理起来
    // ajax
    //   .get("/api/product/getBaseCategoryList")
    //   .then((result) => console.log(result),err=>console.log(err.message));

    // 3. 统一封装了发送请求的操作之后
    // reqCategoryListData().then(result=>console.log('请求成功了',result),err=>console.log('请求失败了',err.message))

    // 4. 使用vuex的形式来获取数据 在这里需要dispatch actions中的方法
    // this.$store.dispatch('getCategoryListData') 相当于是全局形式的派发

    // 5. 使用模块化的方式来进行派发
    // this.$store.dispatch('home/getCategoryListData')
    // console.log('$route',this.$route);

    // 下面这个判断是判断的search页面,当跳转到search页面的时候meta中是没有isShowTypeNav
    if (!this.$route.meta.isShowTypeNav) {
      // 能进到这里面，说明是search页面
      this.isShowNav = false;
    }
  },
};
/**
 * 思路：
 * 1.单击三级链接实现跳转的同时携带参数分析
 *    1. 我们没有将所有的a标签都改成router-link的形式进行传参,因为有太多的a标签需要改成router-link 还要改成to的形式，再传参，效率比较低  不好
 *    2. 为了提高效率我们也不是给每一个a标签都注册事件，而是给所有的父级通过委托的方式注册了一个btnSeatch
 *    3. 当单击事件被触发的时候，需要跳转到search页面的时候，携带参数
 *
 * 2. 单击链接跳转时携带参数
 *    1. 当单击了几级链接的时候，需要将那一级的分类名称和分类id一并获取拼接到跳转路径中
 *    2. 如何获取链接中的参数？
 *    3. 当事件被触发的时候，会自动产生一个事件对象event
 *    4. 这个Event事件对象当中包含着一切与事件相关的信息 比如：哪个标签 目标元素 事件名称...
 *    5. 在事件对象中有一个event.target 可以获取目标事件源 就是当前事件源对象
 *    6. 在对应的a标签上使用data-这种自定义属性来存储对应的数据
 *    7. 使用event.target.dataset 来获取标签上的所有的自定义属性值 是一个对象
 *    8. 编程式导航 push还可以拼接参数
 *          .push({name:路由名称,query:参数})
 *
 * 3.排除非三级导航链接的跳转
 *    1. 由于我们是在父级元素中使用委托的方式注册的事件
 *    2. 因此就会导致所有的子元素被单击的时候，父元素的单击事件都会被触发 那些空白子节点也会触发单击整个
 *    3. 正常跳转应该是在单击a链接才对，空白的单击不应该跳转
 *    4. 应该过滤掉非三级导航链接的跳转
 *    5. 如果没有单击a标签，而点的其它空白位置的话，是没有id  level  name属性值的
 *    6. 所以就可以根据id  level  name进行判断
 *
 * 4. 使用路由元来控制TypeNav列表的显示与隐藏
 *     1. Home页面中的TypeNav要完整显示 而Search组件中的TypeNav下拉菜单一开始要隐藏
 *     2. 在Home组件的路由中添加了一个路由元meta:{isShowTypeNav:true}
 *     3. 在当前组件的mounted中进行判断 根据meta来进行判断
 *
 * 5. search组件鼠标进入或离开时控制TypeNav显示与隐藏
 *     1. 当鼠标进入h2标题标签的时候，要显示下拉框
 *     2. 鼠标离开h2和下拉菜单的父级标签区域时，才隐藏
 *         因为当鼠标在下拉菜单上时，我们想看到二级或三级导航
 */
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
      border-top: 2px solid #e1251b;

      &.sort-enter {
        height: 0;
        opacity: 0;
      }
      &.sort-enter-to {
        height: 461px;
        opacity: 1;
      }
      &.sort-enter-active {
        transition: all  2s;
      }

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
            background-color: cyan;
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