/*
 * @Author: 郭德纲
 * @Date: 2020-11-11 11:20:09
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-11 14:43:04
 * @Description: 请求封装
 */
/** **   http.js   ****/
// 导入封装好的axios实例
import request from './httpInterceptors'

const http = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param isToken 是否需要token
   */
  get(url, params, isToken = true) {
    const config = {
      method: 'get',
      url: url,
      isToken: isToken

    }
    if (params) config.params = params
    return request(config)
  },
  post(url, params, isToken = true) {
    const config = {
      method: 'post',
      url: url,
      isToken: isToken
    }
    if (params) config.data = params
    return request(config)
  },
  put(url, params, isToken = true) {
    const config = {
      method: 'put',
      url: url,
      isToken: isToken
    }
    if (params) config.data = params
    return request(config)
  },
  delete(url, params, isToken = true) {
    const config = {
      method: 'delete',
      url: url,
      isToken: isToken

    }
    if (params) config.params = params
    return request(config)
  }
}
// 导出
export default http
