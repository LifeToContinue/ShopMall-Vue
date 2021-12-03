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