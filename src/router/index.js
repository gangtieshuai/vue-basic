/*
 * @Author: 郭德纲
 * @Date: 2020-11-10 16:35:41
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-26 11:12:43
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from 'Pages/login/Login'
import Home from 'Pages/home/Home'
import Default from 'Pages/layout/content'
import notFound from 'Pages/error/notFound'
import notAuthorized from 'Pages/error/notAuthorized'
import user from 'Pages/Authority/userManage/user'
import messageRemind from 'Pages/messageRemind/message'
import org from 'Pages/Authority/org/org'
import personalCenter from 'Pages/personalCenter/personalCenter'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = {
  routes: [{
      path: '/',
      name: 'Home',
      component: Default,
      meta: {
        requireAuth: true, // token校验
        role: '111111'
      },
      children: [{
          path: '/',
          redirect: '/home',
          component: Home
        },
        {
          path: '/home',
          name: '首页',
          component: Home,
          meta: {
            keepAlive: true,
            role: '111111',
            isMenuShow: true,
            icon: 'home'
          } // 缓存
        },
        // 用户
        {
          path: '/user',
          name: '用户信息',
          component: user,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '000011', // 管理员 + 省行
            isMenuShow: true

          }
        },
        {
          path: '/message',
          name: '我的消息',
          component: messageRemind,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '111111' // 管理员 + 省行
            // isMenuShow: true

          }
        },
        {
          path: '/org',
          name: '机构管理',
          component: org,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '000011', // 管理员 + 省行
            isMenuShow: true

          }
        },
        {
          path: '/personalCenter',
          name: '个人中心',
          component: personalCenter,
          meta: {
            role: '111111'
          }
        },
        {
          path: '/notAuthorized',
          name: 'notAuthorized',
          component: notAuthorized,
          meta: {
            role: '111111'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
};
export default new Router(router);
// export router;
