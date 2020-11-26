/*
 * @Author: your name
 * @Date: 2020-11-10 10:22:38
 * @LastEditTime: 2020-11-16 11:44:46
 * @LastEditors: 郭德纲
 * @Description: 公共接口
 * @FilePath: \ccb-web\src\common\api.js
 */
import http from './http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
const resquest = 'api'

// post请求
export function LoginFormAPI (params) {
  return http.post(`${resquest}/login`, params, false)
};

export function getUserinfo (params) {
  return http.post(`${resquest}/auth`, params)
};
