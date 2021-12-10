import { v4 as uuidv4 } from 'uuid'

// 写在这里的目的是为了每次发送请求的时候都携带着这个唯一的身份标识ID，并且保证是同一个

export const getUserTempId = () => {
  // 1. 先从本地存储当中获取一下
  let userTempId = localStorage.getItem('userTempId')

  // 2. 如果没有的话，就要先生成一份
  if (!userTempId) {
    localStorage.setItem('userTempId',uuidv4())
  }

  return userTempId // 返回数据
}