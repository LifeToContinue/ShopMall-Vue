<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>{{ userInfo.name }}</span
            >&nbsp;&nbsp; <button @click="logout">退出</button>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/shopCart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            @click="btnSearch"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  mounted() {
    // 给全局事件总线注册一个事件
    this.$bus.$on("remove-keyword", () => {
      this.keyword = "";
    });
  },
  beforeDetroy() {
    // 在组件销毁之前，一定要先清除掉之前在事件总线上注册的事件
    this.$bus.$off("remove-keyword");
  },
  methods: {
    btnSearch() {
      // this.$router.push('/search',()=>{},()=>{})
      // this.$router.push('/search')
      // 解决方法一  把路由版本回退到 3.1.0
      // 解决方法二  自己设置回调
      // 解决方法二  将错误统一处理 这样以后项目中再用到push/replace 都没有问题了

      // 1.方案一: 可以使用location.search获取参数部分 ?key=value&key=value
      // 2.路由获取参数
      // console.log(this.$route);
      let { query } = this.$route;
      // let categoryName = this.$route.query.categoryName
      // let category1Id = this.$route.query.category1Id
      // let category2Id = this.$route.query.category2Id
      // let category3Id = this.$route.query.category3Id
      this.$router.push({
        name: "search", // 路由名称
        query: {
          // 路由跳转时，如果参数没有值是undefined的时候,路由会自动过滤掉undefined的值
          ...query,
          keyword: this.keyword || undefined,
        },
      });
    },
    // 用户登出
    // async logout() {
    //   const result = await reqUserLogout();
    //   if (result.code === 200) {
    //     // 本地的token要删除掉  vuex也要删除掉
    //     localStorage.removeItem('userName')
    //     localStorage.removeItem('token')
    //   }else {
    //     console.log(result.message);
    //   }
    // },
    async logout() {
      // 登出的时候，要删除vuex和本地存储中的token 所以要dispath
      await this.$store.dispatch("user/UserLogout");

      // 应该跳转到登陆页面
      this.$router.push("/login");
    },
  },
};

/**
 * 1. 单击搜索按钮拼接参数
 *     1. 当从三级导航链接跳转到了sarch页面之后，地址栏中会带有之前三级链接数据
 *     2. 如果我们单击Header中的seach按钮，想把搜索的关键词也拼接在之前地址栏参数的后面
 *     3. 此时我们可以使用this.$route.query获取之前的参数数据
 *     4. 将之前的数据和我们当前的keyword一块拼接在query对象中
 *
 *
 */
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>