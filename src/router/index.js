/*
 * @Author: 郭德纲
 * @Date: 2020-11-10 16:35:41
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-24 10:23:44
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from 'Pages/login/Login'
import Home from 'Pages/home/Home'
import Default from 'Pages/layout/content'
import myTrainee from 'Pages/myTrainee/mytrainee'
import docManagement from 'Pages/docManagement/docManagement'
import courseLibrary from 'Pages/courseLibrary/courseLibrary'
import notFound from 'Pages/error/notFound'
import notAuthorized from 'Pages/error/notAuthorized'
import myCourses from 'Pages/myTeacher/myCourses/mycourses'
import myAppointment from 'Pages/myTeacher/myAppointment/myappointment'
import courseDetails from 'Pages/myTeacher/courseDetails/coursedetails'
import classRecord from 'Pages/myTeacher/classRecord/classrecord'
import teacherLibrary from 'Pages/teacherLibrary/teacherlibrary'
import teacherDetails from 'Pages/myTeacher/teacherDetails/teacherdetails'
import trainingClass from 'Pages/myTraining/trainingclass'
import classInfo from 'Pages/myTraining/classInfo'
import user from 'Pages/Authority/userManage/user'
import messageRemind from 'Pages/messageRemind/message'
import theme from 'Pages/Authority/theme/theme'
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
        // 我的培训
        {
          path: '/myTrainee',
          name: '我的培训',
          component: myTrainee,
          meta: {
            keepAlive: true,
            role: '011000',
            icon: 'unordered-list',
            isMenuShow: true
          }
        },
        // 我的课程
        {
          path: '/myCourses',
          name: '我的课程',
          component: myCourses,
          meta: {
            keepAlive: true,
            role: '011000',
            icon: 'unordered-list',
            isMenuShow: true
          } // 缓存
        },
        // 我的预约
        {
          path: '/myAppointment',
          name: '我的预约',
          component: myAppointment,
          meta: {
            keepAlive: true,
            role: '011000',
            icon: 'clock-circle',
            isMenuShow: true
          }
        },
        // 课程详情
        {
          path: '/courseDetails',
          name: 'coursedetails',
          component: courseDetails,
          meta: {
            keepAlive: true,
            role: '011111'
          }
        },
        // 课程库
        {
          path: '/courseLibrary',
          name: '课程库',
          component: courseLibrary,
          meta: {
            keepAlive: true,
            role: '000001',
            icon: 'user',
            isMenuShow: true
          }
        },
        // 文档管理
        {
          path: '/docManagement',
          name: '文档管理',
          component: docManagement,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '000001',
            isMenuShow: true
          }
        },
        {
          path: '/notAuthorized',
          name: 'notAuthorized',
          component: notAuthorized,
          meta: {
            role: '111111'
          }
        },
        // 上课记录
        {
          path: '/classrecord',
          name: '上课记录',
          component: classRecord,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '011000',
            isMenuShow: true
          }
        },
        // 讲师库
        {
          path: '/teacherlibrary',
          name: '讲师库',
          component: teacherLibrary,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '000011', // 管理员 + 省行
            isMenuShow: true
          }
        },
        // 讲师详情
        {
          path: '/teacherdetails',
          name: '讲师详情',
          component: teacherDetails,
          meta: {
            role: '000011' // 管理员 + 省行
          }
        },
        // 培训班
        {
          path: '/trainingclass',
          name: '培训班',
          component: trainingClass,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '000011', // 管理员 + 省行
            isMenuShow: true

          }
        },
        {
          path: '/classinfo',
          name: '培训班详情',
          component: classInfo,
          meta: {
            role: '000011' // 管理员 + 省行
          }
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
            role: '000011' // 管理员 + 省行
            // isMenuShow: true

          }
        },
        {
          path: '/theme',
          name: '专题管理',
          component: theme,
          meta: {
            keepAlive: true,
            icon: 'folder-open',
            role: '000011', // 管理员 + 省行
            isMenuShow: true

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
