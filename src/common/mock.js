/*
 * @Author: 郭德纲
 * @Date: 2020-11-11 11:10:52
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-24 11:39:59
 * @Description: mock数据
 */
import Mock from 'mockjs'
const BASE_API = process.env.BASE_API
Mock.mock(BASE_API + 'api/login', {
  'code': '200',
  'resultdata|8': 'x'
})
Mock.mock(BASE_API + 'api/auth', {
  'code': '200',
  'resultdata': {
    'name': '@name',
    'age|10-20': 10,
    'org|1': [
      '中行',
      '湖南分行',
      '湖南支行'
    ],
    role: '001000'
    // 'role|1': [
    //   '000001', // 管理员
    //   '000010', // 省行
    //   '000100', // 分行
    //   '001000', // 讲师
    //   '010000' // 学员
    // ]
  }
})
