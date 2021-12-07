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
    return ajax.get('/api/product/getBaseCategoryList')
} */
export const reqCategoryListData = () => ajax.get('/api/product/getBaseCategoryList')

//发送请求  获取mock数据
export const reqBannerListData = () => mockAjax.get('/banner')

// 发送请求 获取floors数据
export const reqFloorsListData = () => mockAjax.get('/floor')

// 发送请求 获取搜索数据 这个不是List 因为不是数组 是一个对象
export const reqSearchInfoData = (searchParams) => ajax.post('/api/list',searchParams)

//6.获取商品详情数据
export const reqGoodDetailInfoData=(id)=>ajax.get('/api/item/'+id)

// 7. 添加选中的商品到购物车成功页面
export const reqAddOrUpdateCart =(skuId,skuNum)=>ajax.post(`/api/cart/addToCart/${skuId}/${skuNum}`)

// 8. 获取服务器中的之前添加到购物车中的数据
export const reqShopCartListData = ()=> ajax.get('/api/cart/cartList') 

// 9. 更新购物车中数据的选中状态
export const reqChangeShopCartInfoState = (skuID,isChecked)=>ajax.get(`/api/cart/checkCart/${skuID}/${isChecked}`)

// 10. 删除一件购物车的商品
export const reqDelOneShopCartInfo=(skuId)=>ajax.delete(`/api/cart/deleteCart/${skuId}`)

// 11. 获取验证码的请求
export const reqCode = (phone) => ajax.get(`/api/user/passport/sendCode/${phone}`)