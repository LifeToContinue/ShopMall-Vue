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
//   return ajax.get("/product/getBaseCategoryList")
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
export const reqRegister = (user) => ajax.post('/user/passport/register', user)

// 14. 实现用户登陆 就可以获取服务器发送过来的token 
export const reqUserLogin = (user) => ajax.post('/user/passport/login', user)

// 15. 用户登出
export const reqUserLogout = () => ajax.get('/user/passport/logout')

// 16. 结算
export const reqTradeInfoListData = () => ajax.get('/order/auth/trade')


  // (function () {
  //   reqTradeInfoListData().then(result => {
  //     console.log(result);
  //   })
  // }())





