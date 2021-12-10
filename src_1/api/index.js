/* 
    1.这个文件是统一用来处理发送请求的  也就是说所有的请求都在这里进行处理
    2.只需要暴露响应的接口即可
    3.优点：将来更新或是维护的时候，在此处进行统一修改
*/

//1.引入axios  也就是引入ajax.js这个文件 然后发送请求
import ajax from './ajax'
import mockAjax from './mockAjax'

//2.将发送请求的操作封装到函数当中 向外暴露
/* export function reqCategoryListData(){
    return ajax.get('/product/getBaseCategoryList')
} */
export const reqCategoryListData = () => ajax.get('/product/getBaseCategoryList')

//发送请求  获取mock数据
export const reqBannerListData = () => mockAjax.get('/banner')

// 发送请求 获取floors数据
export const reqFloorsListData = () => mockAjax.get('/floor')

// 发送请求 获取搜索数据 这个不是List 因为不是数组 是一个对象
export const reqSearchInfoData = (searchParams) => ajax.post('/list',searchParams)

//6.获取商品详情数据
export const reqGoodDetailInfoData=(id)=>ajax.get('/item/'+id)

// 7. 添加选中的商品到购物车成功页面
export const reqAddOrUpdateCart =(skuId,skuNum)=>ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)

// 8. 获取服务器中的之前添加到购物车中的数据
export const reqShopCartListData = () => ajax.get('/cart/cartList')

// 9. 更新购物车中数据的选中状态
export const reqChangeShopCartInfoState = (skuID,isChecked)=>ajax.get(`/cart/checkCart/${skuID}/${isChecked}`)

// 10. 删除一件购物车的商品
export const reqDelOneShopCartInfo=(skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)

// 11. 获取验证码的请求
export const reqCode = (phone) => ajax.get(`/user/passport/sendCode/${phone}`)

// 12. 批量删除购物车中选中的商品
export const reqDelSelectedCartInfo = (cartInfo)=> ajax.delete('/cart/batchDeleteCart',cartInfo)

//13.实现用户注册
export const reqRegister=(user)=>ajax.post('/user/passport/register',user)

//14.实现用户登录 可以获取服务器发送过来的token
export const reqUserLogin = (user)=> ajax.post('/user/passport/login',user)

// 15. 用户登出
export const reqUserLogout = () => ajax.get('/user/passport/logout')


//16.结算

/* ;(function () {
    reqGoodDetailInfoData().then(result => {
      console.log("11111",result);
    })
  }()) */