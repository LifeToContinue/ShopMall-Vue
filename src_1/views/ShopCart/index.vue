<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <!-- !!是将其它数据类型隐式转换成boolean类型数据的一种方式 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="!!cartInfo.isChecked"
              @change="checkCartInfoState(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('decrement', cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', cartInfo, $event)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('increment', cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="showDialogByDelOneCartInfo(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <!-- <a href="#none">移到收藏</a> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="checkAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="showDialogByDelSelected"
          >删除选中的商品</a
        >
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectedCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ selectedMoney }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="javascript:;" @click="$router.push('/trade')"
            >结算</a
          >
        </div>
      </div>
    </div>

    <!-- 弹出框 -->
    <!-- <Dialog :visible="visible" @update:visible="closeAAA"> -->
    <!-- <Dialog :visible="visible" @update:visible="visible = $event"> -->
    <Dialog :visible.sync="visible">
      <template v-slot:header>
        <span>提示</span>
      </template>
      <template>
        <p>你真的要删除{{ isDelOne ? "这1条" : "这些选中的" }}商品吗？</p>
      </template>
      <template #footer>
        <button class="btn" @click="visible = false">取消</button>
        <!-- <button class="btn primary" @click="delOneShopCartInfo">确定</button> -->
        <button class="btn primary" @click="delShopCartInfo">确定</button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import {
  reqShopCartListData,
  reqChangeShopCartInfoState,
  reqDelOneShopCartInfo,
  reqDelSelectedCartInfo,
  reqAddOrUpdateCart,
} from "@/api";
import Dialog from "@/components/Dialog";
import { reg } from "@/utils/reg";
// import _ from 'lodash' // 可以直接这样来用

// 用下面的方式可以实现按需加载
import debounce from "lodash/debounce";
// import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  data() {
    return {
      cartInfoList: [],
      visible: false,
      skuId: "",
      isDelOne: false, // 做个标识 判断一下是删除一条商品还是批量删除多条
      skuIdList: [], // // 存储批量删除被选中的商品时的skuId
      leftCartInfoList: [], // 存储的是未被删除的商品
    };
  },
  components: { Dialog },
  async mounted() {
    // console.log(23);
    const result = await reqShopCartListData();
    if (result.code === 200) {
      console.log(result.data);
      // 为了实现响应式，所以在当前的data中先添加一个cartInfoList
      this.cartInfoList = result.data[0].cartInfoList;
    } else {
      console.log(result.message);
    }
  },
  methods: {
    // 1. 更改当前商品的选中状态
    async checkCartInfoState(cartInfo) {
      // let isChecked = cartInfo.isChecked == 1 ? 0 : 1;

      let isChecked = 1 - cartInfo.isChecked; // 传递的只有两个值 要么是1 要么是0
      const result = await reqChangeShopCartInfoState(
        cartInfo.skuId,
        isChecked
      );

      if (result.code === 200) {
        // 如果成功了的话，页面
        cartInfo.isChecked = isChecked;
      } else {
        console.log(result.message);
      }
    },
    // closeAAA(val){
    //   this.visible = val
    // }
    // 2. 删除一条商品数据时弹出对话框 询问一下是否真的删除
    showDialogByDelOneCartInfo(skuId) {
      console.log(skuId);
      this.skuId = skuId;
      this.visible = true; // 弹出对话框
      this.isDelOne = true; // 确定是删除一条 当单击弹出来的对话框中的确定按钮的时候，要做个判断
    },
    // 3. 单击弹出框的确定按钮 删除一条商品数据
    // async delOneShopCartInfo(){
    async delShopCartInfo() {
      if (this.isDelOne) {
        // 3.1 如果这个条件成立 则证明删除一条数据
        const result = await reqDelOneShopCartInfo(this.skuId);
        if (result.code === 200) {
          this.visible = false; // 隐藏对话框
          // 正常情况下，当删除购物车中的商品数据成功的时候，需要做两件事
          // 1. 隐藏弹出来的对话框 2. 页面应该要显示剩下的商品数(刷新 一般要重新刷新页面重发请求)
          this.cartInfoList = this.cartInfoList.filter(
            (cartInfo) => cartInfo.skuId !== this.skuId
          );
        } else {
          console.log(result.message);
        }
        return; // 不要往下执行了
      }

      // 3.2 批量删除多条数据
      const result = await reqDelSelectedCartInfo({ data: this.skuIdList });
      if (result.code === 200) {
        // 对话框要隐藏
        this.visible = false;
        // 当前页面应该要渲染剩下的商品 正常情况下应该要重新渲染页面 重新发送ajax请求，获取剩下的数据渲染在页面上，但是为了节省服务器资源 我们可以节省一次请求

        this.cartInfoList = this.leftCartInfoList;
      } else {
        console.log(result.message);
      }
    },
    // 4. 单击批量删除商品时弹出来的对话框
    showDialogByDelSelected() {
      // 这个函数中要执行的业务逻辑分析
      // 1. 单击批量删除商品按钮时，对话框要弹出来
      this.visible = true;
      // 2. 要标识是批量删除
      this.isDelOne = false;
      // 3. 收集被选中的商品的skuId
      this.cartInfoList.forEach((cartInfo) => {
        if (cartInfo.isChecked) {
          this.skuIdList.push(cartInfo.skuId);
        } else {
          // 将没有被删除的商品添加到leftCartInfoList数组中
          this.leftCartInfoList.push(cartInfo);
        }
      });
    },
    // 5. 更改购买商品的数量
    changeSkuNum: debounce(async function (type, cartInfo, event) {
      // 分支 if-else if... switch-case
      const { skuId } = cartInfo;
      let num = 0;
      switch (type) {
        case "increment": {
          cartInfo.skuNum++; // 这个是页面显示的数量
          num++; // 这个才是发给服务器的更改数量
          if (cartInfo.skuNum > 200) {
            cartInfo.skuNum = 200; // 已经最大数了
            num = 0; // 将num置为0
          }
          break;
        }
        case "decrement": {
          cartInfo.skuNum--;
          num--;
          if (cartInfo.skuNum < 1) {
            cartInfo.skuNum = 1;
            num = 0; // 将num置为0
          }
          break;
        }
        case "change": {
          // event.target 表示当前事件源 文本框中值的获取要使用value
          let oldSkuNum = cartInfo.skuNum;
          let newSkuNum = event.target.value; // 变量本地化 不用每次重新获取 需要先存储到变量中
          console.log("oldNum,newNum", oldSkuNum, newSkuNum);
          if (reg.test(newSkuNum)) {
            cartInfo.skuNum = newSkuNum;
            if (newSkuNum > 200) cartInfo.skuNum = oldSkuNum;
            if (newSkuNum < 1) cartInfo.skuNum = 1;
            num = cartInfo.skuNum - oldSkuNum;
            console.log("change", num);
          } else {
            // cartInfo.skuNum = oldSkuNum // 如果用户输入的是非法值 则直接转为最小数
            console.log("oldNum,newNum ---", oldSkuNum, newSkuNum);
            // cartInfo.skuNum = oldSkuNum // 如果用户输入的是非法值 则直接转为最小数
            cartInfo.skuNum = 1; // 如果用户输入的是非法值 则直接转为最小值1
            num = 0; // 给一个0
          }

          break;
        }
      }

      // 去发送请求 更新服务器端的已购买商品的数量 skuId  skuNum(是需要变动的数量，不是当前显示出来的数量)
      // if (num == 0 ) return; // 不要往下执行了 不要发送请求了
      if (!num) return; // 不要往下执行了 不要发送请求了
      const result = await reqAddOrUpdateCart(skuId, num);
    }, 300),
  },
  computed: {
    // 1. 全选按钮
    checkAll: {
      get() {
        return this.cartInfoList.every((cartInfo) => cartInfo.isChecked === 1);
      },
      set(val) {
        this.cartInfoList.forEach((cartInfo) => {
          // 先判断一下当前按钮的状态是什么 此总按钮是选中状态的话则val是true
          // 如果不选中则是false
          // 但是我们发送给服务器的这个isChecked值是字符串形式的数字不是boolean类型
          let isChecked = val ? 1 : 0;
          cartInfo.isChecked = isChecked;

          // 一条条更新    更新的时候 后面的isChecked的值一定要先取反一下，因为用到了上面的函数中也有取反，这样才能够保证服务器是存储的真正的状态
          this.checkCartInfoState({
            skuId: cartInfo.skuId,
            isChecked: 1 - isChecked,
          });
        });
      },
    },
    // 2. 已经选择的商品数量
    selectedCount() {
      // 由于当前商品的选中与否，刚好是isChecked的值来决定的而这个值是number类型1  没选中则是0
      return this.cartInfoList.reduce(
        (prev, current) => prev + current.isChecked,
        0
      );
    },
    selectedMoney() {
      return this.cartInfoList.reduce(
        (p, c) => p + c.skuPrice * c.skuNum * c.isChecked,
        0
      );
    },
  },
};

/**
 * 更改商品数量的思路分析
 * 1. 如果是第一次往购物车中添加商品 携带的参数中skuId skuNum 此时的skuNum就是当前购买的数量
 * 2. 如果现在单击+号 意味着增加已经购买商品的数量 是在服务器已有商品数量的基础上来增加
 * 3. 同理 如果单击的是-号 则是在服务器已有商品数量的基础上减skuNum
 * 4. 也就是说如果服务器端已经有了某种商品，此时的+或1 发送给服务器的skuNum是带正负的
 * 5. 服务器端会根据数据自动进行计算
 * 6. 如果是直接修改数量的话,则最终显示的就是当前修改的数量，但是发送给服务器的skuNum应该是用当前显示的最新数量值减去之前的数量值
 *
 *
 *
 */
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>