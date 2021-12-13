// 1. 引入插件入数据文件
import banner from './banner.json'
// import或require引入的本地json文件中的数据会直接转换成对象
import floors from './floors.json'
import Mock from 'mockjs'
// import axios from 'axios'

// 2. 配置服务器
// Mock.mock(url,method,data)
// 请求方式这个地方要小写
Mock.mock('/mock/banner','get',{code:200,data:banner})
Mock.mock('/mock/floors', 'get', { code: 200, data: floors })

// 3. 测试一下 是否好用
// axios.get('/mock/banner').then(
//   res => console.log('mock',res),
//   err=>console.log('mockerror',err.message)
// )