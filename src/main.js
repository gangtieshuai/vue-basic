/*
 * @Author: 郭德纲
 * @Date: 2020-11-10 16:35:41
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-18 15:57:48
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'Common/mock.js'
import {
  isLoginStatus,
  getAuth
} from 'Common/utils'
import {
  Modal
} from 'ant-design-vue'

Vue.config.productionTip = false
/**
 * @description: 路由守卫
 * @param {*}
 * @return {*}
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (isLoginStatus()) { // 查询本地存储信息是否已经登陆
      const auth = getAuth();
      const flage = parseInt(to.meta.role, 2) & parseInt(auth.role, 2);
      if (flage === 0) {
        next({
          path: '/notAuthorized',
          query: {
            redirect: to.fullPath
          }
        });
      } else {
        next();
      }
    } else {
      Modal.warning({
        title: '登录失效，请重新登陆！',
        okText: '确认',
        onOk: () => {
          next({
            path: '/login', // 未登录则跳转至login页面
            query: {
              redirect: to.fullPath
            } // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
          });
        }
      });
    }
  } else {
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
