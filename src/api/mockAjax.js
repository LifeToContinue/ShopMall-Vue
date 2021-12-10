// 1. 引入模块
import axios from "axios";

// 引入nprogress 
import 'nprogress/nprogress.css'  // 引入样式 直接引入即可
import NProgress from 'nprogress'  // 引入进度条模块

// 将来我们要发送很多次请求 有不同的模块 有不同的数据
// 2. 创建实例对象 然后统一配置之后再去发送请求
// 只要使用ajax这个实例对象发送请求,会先走这里面的配置项
const mockAjax = axios.create({
  baseURL: '/mock',  // 配置统一的服务器地址
  timeout: 1000,
});

// 3. 设置请求拦截器  在请求发送之前执行里面的逻辑
mockAjax.interceptors.request.use(config => {
  // 设置进度条的开始
  NProgress.start()
  return config  // 返回配置项 这个config里面包含请求的一些配置信息 url method
})

// 4. 设置响应拦截器 
mockAjax.interceptors.response.use(result => {
  // 设置进度条的结束 
  NProgress.done()
  return result.data
}, err => {
  // return err.message  // 返回失败对象中的错误信息
  // 即使是错误信息,也应该是一个Promise对象 如果是错误信息字符串,默认也会当成成功的操作
  return Promise.reject(new Error(err.message))
})

// 5. 导出对象
export default mockAjax