/*
 * @Author: 郭德纲
 * @Date: 2020-11-10 10:22:31
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-18 16:06:56
 * @Description: 工具类
 */

import router from '../router/index'

/**
 * @description: token获取
 * @param {*}
 * @return {*}
 */
function getToken() {
  const data = sessionStorage.getItem('token');
  return data;
}
/**
 * @description: 会话存储token
 * @param {string} data
 * @return {*}
 */
function setToken(data) {
  sessionStorage.setItem('token', data);
}

/**
 * @description: 获取当前登录的用户信息
 * @param {*}
 * @return {*}
 */
function getAuth() {
  const data = JSON.parse(sessionStorage.getItem('auth'));
  return data;
}
/**
 * @description: 会话存储当前登录用户信息
 * @param {Object} data
 * @return {*}
 */
function setAuth(data) {
  sessionStorage.setItem('auth', JSON.stringify(data));
}
/**
 * @description: 删除会话
 * @param {*}
 * @return {*}
 */
function delAuth() {
  sessionStorage.clear();
}
/**
 * @description: 检测当前是否登录
 * @param {*}
 * @return {*}
 */
function isLoginStatus() {
  const data = getAuth();
  return !isNull(data);
}
/**
 * @description: 空判断
 * @param {string} data
 * @return {*}
 */
function isNull(data) {
  return data === '' || data === null || data === undefined;
}
/**
 * @description: 非空判断
 * @param {string} data
 * @return {*}
 */
function isNotNull(data) {
  return data !== '' && data !== null && data !== undefined;
}
/**
 * @description: 枚举值转换对象数组，默认{label:'',value:''}
 * @param {Object} object
 * @return {*}
 */
function getEnumArray(object) {
  const arr = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      arr.push({
        label: key,
        value: element
      });
    }
  }
  return arr;
}

// table翻译方法
function tableTranslation(object, value) {
  for (let key in object) {
    if (value === key) {
      return object[key];
    }
  }
}
/**
 * @description: 路由缓存
 * @param {Array} data
 * @param {Boolean} isreset 默认false ,是否重置取data
 * @return {*} promise
 */
function setRouter(data, isreset = false) {
  let arr = !isreset ? getRouter() ? getRouter() : [] : data;
  const objArr = arr.concat(data);
  const obj = {};
  const result = [];
  for (var i = 0; i < objArr.length; i++) {
    if (!obj[objArr[i].key]) {
      result.push(objArr[i]);
      obj[objArr[i].key] = true;
    }
  }
  return new Promise((resolve) => {
    sessionStorage.setItem('router', JSON.stringify(result))
    resolve('');
  })
}
/**
 * @description: 获取缓存路由
 * @param {*}
 * @return {*}
 */
function getRouter() {
  const data = JSON.parse(sessionStorage.getItem('router'));
  return data;
}
/**
 * @description: 获取当前用户权限菜单
 * @param {*}
 * @return {*}
 */
function getMenu() {
  const arr = router.options.routes.filter(i => i.path === '/');
  let menuArr = arr[0].children.filter(i => i.meta && i.meta.isMenuShow)
  menuArr = menuArr.map(i => {
    return {
      title: i.name,
      key: i.path.substr(1, i.path.length - 1),
      icon: i.meta.icon,
      role: i.meta.role,
      isend: true
    }
  })
  const auth = getAuth();
  menuArr = menuArr.filter(i => {
    const flage = parseInt(i.role, 2) & parseInt(auth.role, 2);
    return flage !== 0
  })
  return menuArr
}
/**
 * @description: 十进制转换二进制
 * @param {*}
 * @return {*}
 */
function toBin(n) {
    if (n === 0) return '0';
    var res = '';
    while (n !== 0) {
        res = n % 2 + res
        n = parseInt(n / 2)
    }
    return res;
}
export {
  isNull,
  isNotNull,
  getEnumArray,
  getToken,
  setToken,
  tableTranslation,
  getAuth,
  setAuth,
  isLoginStatus,
  delAuth,
  setRouter,
  getRouter,
  getMenu,
  toBin
};
