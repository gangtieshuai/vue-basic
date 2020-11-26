/*
 * @Author: 郭德纲
 * @Date: 2020-11-10 16:35:41
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-11 14:20:16
 * @Description: file content
 */
'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_API: '"http://localhost:8080/"',

})
