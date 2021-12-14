/**
 * 1. 这个文件是统一用来处理发送请求的 也就是说所有的请求都在这里进行处理
 * 2. 只需要暴露相应的接口即可
 * 3. 优点:将来更新或是维护的时候,在此处进行统一修改
 */

// 1. 引入axios 也就是引入ajax.js这个文件 然后发送请求
import ajax from './ajax'
import mockAjax from './mockAjax'

// 2. 将发送请求的操作封装到函数当中 向外暴露
// export function reqCategoryListData() {
//   return ajax.get("/api/product/getBaseCategoryList")
// }
// 2. 获取三级分类导航数据
export const reqCategoryListData = () => ajax.get("/product/getBaseCategoryList")

// 3. 发送请求获取轮播图中的数据
export const reqBannerListData = () => mockAjax.get('/banner')

// 4. 发送请求获取Floor楼层数据
export const reqFloorsListData = () => mockAjax.get('/floors')

// 5. 获取搜索的商品数据
export const reqSearchInfoData = (searchParams) => ajax.post('/list', searchParams)

// 6. 获取商品详情数据
export const reqGoodDetailInfoData = (id) => ajax.get('/item/' + id)

// 7. 添加选中的商品到购物车成功页面
export const reqAddOrUpdateCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 8. 获取服务器中的之前添加到购物车中的数据
export const reqShopCartListData = () => ajax.get('/cart/cartList')

// 9. 更改服务器端购物车中商品的选中与否的状态 
export const reqChangeShopCartInfoState = (skuID, isChecked) => ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)

// 10. 删除一件购物车的商品
export const reqDelOnShopCartInfo = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)

// 11. 获取验证码的请求
export const reqCode = (phone) => ajax.get(`/user/passport/sendCode/${phone}`)

// 12. 批量删除购物车中选中的商品
export const reqDelSelectedCartInfo = (cartInfo) => ajax.delete('/cart/batchDeleteCart', cartInfo)

// 13. 实现用户注册
// axios是个函数
// 函数是函数  函数也是对象
// 函数可以当函数用 函数也能当对象去用

// 函数当函数用 加括号 axios()
// 函数当对象用  axios.b


export const reqRegister = (user) => {
  return ajax({
    url:'/user/passport/register',
    method:'post',
    data:user
  })
}


// 14. 实现用户登陆 就可以获取服务器发送过来的token 
export const reqUserLogin = (user) => {
  return ajax({
    url:'/user/passport/login',
    method:'post',
    data:user
  })
}

// 根据token获取用户信息
export const reqGetUserInfo = () => {
  return ajax({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
  })
}



// 15. 用户登出
export const reqUserLogout = () => {
  return ajax({
    url:'/user/passport/logout',
    method:'get'
  })
}

// 16. 结算
export const reqUserAddressList=()=>{
  return ajax({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
  })
}

//17.获取交易信息
export const reqTradeInfo=()=>{
  return ajax({
    url:'/order/auth/trade',
    method:'get'
  })
}

//18.请求提交创建订单
export const reqSubmitOrder=(tradeNo,tradeInfo)=>{
  return ajax({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data:tradeInfo
  })
}

//19.请求获取订单支付信息
export const reqPayInfo=(orderId)=>{
  return ajax({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
  })
}

//20.请求获取支付状态
export const reqPaystatus=(orderId)=>{
  return ajax({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}

//21.请求获取订单列表
export const reqMyOrderInfo=(page,limit)=>{
  return ajax({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}

// {
//   reqUserLogout，
//   reqTradeInfoListData
// }

  // (function () {
  //   reqTradeInfoListData().then(result => {
  //     console.log(result);
  //   })
  // }())

// 无论什么样的暴露方式，出文件的时候都是对象，只是形成对象的方式不同
// 1、默认
// export default {a:100}
// {
//   default:{a:100}
// }

// 引入
// 默认暴露引入的全写
// import {default as xxx} from './xxx'
// 默认暴露引入的简写
// import xxx from './xxx'


// 分别暴露
// export let a = 100
// export let b = {n:1}

// {
//   a,
//   b
// }

// 引入
// import {a,b} from './xxx'


// 统一暴露
// const a = 100
// const b = {m:2}
// export {
//   a,
//   b
// }



// 拿的就是暴露出来的对象
// import * as xxx from './xxx'
