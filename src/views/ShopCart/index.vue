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
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum('decrement',cartInfo)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @click="changeSkuNum('change',cartInfo,$event)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum('increment',cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="showDialogByDelOneCarInfo(cartInfo.skuId)"
              >删除</a
            >
            <br />
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
          已选择 <span>{{ selectdCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ selectedMoney }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
    <!-- <Dialog :visible="visible" @update:visible="close"> -->
    <!-- <Dialog :visible="visible" @update:visible="visible=$event"> -->
    <Dialog :visible.sync="visible">
      <template v-slot:header>
        <span>提示</span>
      </template>
      <template>
        你真的要删除{{ isDelOne ? "这条" : "选中的" }}商品吗？
      </template>
      <template #footer>
        <button class="btn" @click="visible = false">取消</button>
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
  reqAddOrUpdateCart
} from "@/api";
import Dialog from "@/components/Dialog";
import {reg} from '@/utils/reg'
export default {
  name: "ShopCart",
  async mounted() {
    const result = await reqShopCartListData();
    // console.log("shopcart", result);
    if (result.code === 200) {
      console.log(result);
      
      this.cartInfoList = result.data[0].cartInfoList;
    } else {
      console.log(result.message);
    }
  },
  data() {
    return {
      cartInfoList: [],
      visible: false,
      skuId: "",
      isDelOne: false, //做个标识  判断删除数量
      skuIdList: [], //存储批量删除商品的id
      leftCartInfoList: [], //剩余未删除的商品
    };
  },
  methods: {
    //1.更改当前商品的选中状态
    async checkCartInfoState(cartInfo) {
      let isChecked = 1 - cartInfo.isChecked;
      const result = await reqChangeShopCartInfoState(
        cartInfo.skuId,
        isChecked
      );
      // 更新服务器数据成功后，重新更新页面
      // cartInfo.isChecked = isChecked;
      if (result.code === 200) {
        cartInfo.isChecked = isChecked;
      } else {
        console.log(result.message);
      }
    },
    /* close(val){
      this.visible=val
    } */

    //2.删除一条数据弹出对话框询问是否删除
    showDialogByDelOneCarInfo(skuId) {
      this.skuId = skuId;
      this.visible = true;
      this.isDelOne = true;
    },

    //3.删除一条数据
    async delShopCartInfo() {
      if (this.isDelOne) {
        const result = await reqDelOneShopCartInfo(this.skuId);
        if (result.code === 200) {
          this.visible = false;
          this.cartInfoList = this.cartInfoList.filter(
            (cartInfo) => cartInfo.skuId !== this.skuId
          );
        } else {
          console.log(result.message);
        }
      }

      //批量删除多条数据
      const result = await reqDelSelectedCartInfo({ data: this.skuIdList });
      if (result.code === 200) {
        this.visible = false;
        this.cartInfoList = this.leftCartInfoList;
      } else {
        console.log(result.message);
      }
    },

    //4.批量删除
    showDialogByDelSelected() {
      //1.弹出删除框
      this.visible = true;
      //2.要标识是批量删除
      this.isDelOne = false;
      //3.手机被选中的商品的skuId
      this.cartInfoList.forEach((cartInfo) => {
        if (cartInfo.isChecked) {
          this.skuIdList.push(cartInfo.skuId);
        } else {
          //将没有被删除的商品保存
          this.leftCartInfoList.push(cartInfo);
        }
      });
    },

    //5.更改购买商品的数量
    async changeSkuNum(type,cartInfo,event){
      const {skuId}=cartInfo
      let num=0;

      switch(type){ 
        case 'increment':
          cartInfo.skuNum++ //页面的数量
          num++ //服务器的数量
          if(cartInfo.skuNum>200){
            cartInfo.skuNum=200
            num=0
          }
          break;
        case 'decrement':
          cartInfo.skuNum--
          num--
          if(cartInfo.skuNum<1){
            cartInfo.skuNum=1
            num=0
          }
          break;
        case 'change':{
          let oldSkuNum =cartInfo.skuNum
          let newSkuNum= event.target.value
          if(reg.test(newSkuNum)){
            cartInfo.skuNum=newSkuNum
            if(newSkuNum>200) cartInfo.skuNum=oldSkuNum;
            if(newSkuNum<1) cartInfo.skuNum=1;
            num=cartInfo.skuNum-oldSkuNum
          }else{
            // cartInfo.skuNum=oldSkuNum
            cartInfo.skuNum=1
            num=0
          }  
          break;
          }
      }

      //发送请求，更新服务器端已购买的数量
      if(num==0) return;
      const reslut=await reqAddOrUpdateCart(skuId,num)
      
    }
  },
  computed: {
    //全选
    checkAll: {
      get() {
        return this.cartInfoList.every((cartInfo) => cartInfo.isChecked === 1);
      },
      set(val) {
        this.cartInfoList.forEach((cartInfo) => {
          let isChecked = val ? 1 : 0;
          cartInfo.isChecked = isChecked;

          this.checkCartInfoState({
            skuId: cartInfo.skuId,
            isChecked: 1 - isChecked,
          });
        });
      },
    },
    //已选商品数量
    selectdCount() {
      return this.cartInfoList.reduce((prev, current) => {
        return prev + current.isChecked;
      }, 0);
    },
    selectedMoney() {
      return this.cartInfoList.reduce((p, c) => {
        return p + c.skuPrice * c.skuNum * c.isChecked;
      }, 0);
    },
  },
  components: {
    Dialog,
  },
};
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