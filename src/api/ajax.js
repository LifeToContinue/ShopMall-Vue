// 1. 引入模块
import axios from "axios";

// 引入nprogress 
import 'nprogress/nprogress.css'  // 引入样式 直接引入即可
import NProgress from 'nprogress'  // 引入进度条模块
// import { v4 as uuidv4 } from 'uuid'; // 引入uuid
import { getUserTempId } from '@/utils/getUserTempId'
import store from '@/store'

// 将来我们要发送很多次请求 有不同的模块 有不同的数据
// 2. 创建实例对象 然后统一配置之后再去发送请求
// 只要使用ajax这个实例对象发送请求,会先走这里面的配置项
const ajax = axios.create({
  baseURL: '/api',  // 配置统一的公共的请求路径或者公共的转发标志
  timeout: 5000,
});

// 3. 设置请求拦截器  在请求发送之前执行里面的逻辑
ajax.interceptors.request.use(config => {
  // 设置进度条的开始
  NProgress.start()
  // 为每次请求都添加一个请求头
  // 如果写在这个位置，就会导致每次发送请求都会执行这一行代码,每次执行uuidv4()这个函数，都会生成一个新的唯一的userTempId 这是不对的
  // 还需要考虑一个问题是：当刷新购物车页面的时候，也应该显示之前的购物车数据 
  // 因此综上考虑，应该将uuidv4()生成的唯一身份标识存在本地存储localStoreage
  // config.headers.userTempId = uuidv4()
  config.headers.userTempId = getUserTempId()

  const token = store.state.user.userInfo.token

  // 判断一下，如果没有token则要重新赋值一个token
  if (token) {
    config.headers.token = token
  }

  return config  // 返回配置项 这个config里面包含请求的一些配置信息 url method
})

// 4. 设置响应拦截器 
ajax.interceptors.response.use(response => {
  // 设置进度条的结束 
  NProgress.done()
  return response.data
}, err => {
  // return err.message  // 返回失败对象中的错误信息
  // 即使是错误信息,也应该是一个Promise对象 如果是错误信息字符串,默认也会当成成功的操作
  return Promise.reject(err)
})

// 5. 导出对象
export default ajax