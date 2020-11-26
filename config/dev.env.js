/*
 * @Author: 郭德纲
 * @Date: 2020-11-10 16:35:41
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-11 11:39:08
 * @Description: file content
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8080/"'
})
