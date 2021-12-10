// 1. 引入相应的模块
import Mock from 'mockjs'
import banner from './banner'
import floor from './floor'
import axios from 'axios'
// 2. 配置服务
// Mock.mock(url,method,data)
Mock.mock('/mock/banner','get',{code:200,data:banner})
Mock.mock('/mock/floor','get',{code:200,data:floor})

// 测试一下请求
axios.get('/mock/banner').then(
  response => console.log(response.data),
  error => console.log(error.message)
)
