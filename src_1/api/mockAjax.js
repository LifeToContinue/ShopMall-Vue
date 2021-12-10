//1.引入axios模块
import axios from 'axios'
import NProress from 'nprogress'

//引入nproress样式
import 'nprogress/nprogress.css' // 引入对应的样式

//将来我们要发送很多次请求  有不同的模块 有不同的数据
//2.创建实例对象
//只要使用ajax这个实例对象发送请求，会先走这里面的配置项
const mockAjax = axios.create({
    baseURL: '/mock', // 请求的基本路径
    timeout: 5000, // 设置超时时间
})

//3.设置请求拦截器  在请求发送之前执行里面的逻辑
mockAjax.interceptors.request.use(config => {
    //设置进度条的开始
    NProress.start()
    return config  //返回配置项 这个config里面包含请求的一些配置信息: url method
})

//4.设置响应拦截器
mockAjax.interceptors.response.use(result => {
    //设置进度条结束
    NProress.done()
    return result.data
},error => {
        // 如果发送请求出错了,会在这里统一提示错误信息
        // return error.message
        // 返回失败的Promise实例  目的是走程序员自己设置的错误信息
        return Promise.reject(new Error(error.message))  //返回失败对象中的信息
})

//5.导出对象
export default mockAjax