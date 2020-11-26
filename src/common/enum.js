/*
 * @Author: 郭德纲
 * @Date: 2020-11-10 10:22:52
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-24 11:43:49
 * @FilePath: \ccb-web\src\common\enum.js
 * @Description: 枚举值
 */
const sex = {
  '女': '女',
  '男': '男'
}
// 是否开班
const schedule = {
  0: '未开班',
  1: '已开班'
}
// 课程状态
const startStatus = {
  0: '可预约',
  1: '已预约'
}
// 预约状态
const reservationStatus = {
  0: '已确认',
  1: '未确认'
}

// 培训状态
const trainingStatus = {
  0: '待预约课程',
  1: '已确认课程'
}
const postList = {
  0: '行长',
  1: '副行长',
  2: '经理',
  3: '党支部书记',
  4: '党支部委员',
  5: '副主任',
  6: '客户经理',
  7: '信息技术工程师'
}
const roleType = {
  1: '管理员',
  2: '省行人力部',
  4: '分行人力部',
  8: '教师',
  16: '学员'
}
// 机构类型
const orgType = {
  0: '网点型城区支行',
  1: '网点型县支行',
  2: '普通内设机构',
  3: '省(自治区)分行',
  4: '综合型城区支行',
  5: '单点型县支行',
  6: '二级分行（城区'
}
// 地域层级
const orgAddrType = {
  0: '城区',
  1: '内设机构',
  2: '县域'
}

const orgStatus = {
  0: '未知',
  1: '正常'
}

const classStatus = {
  0: '待确认',
  1: '已确认'
}

export {
  sex,
  schedule,
  startStatus,
  reservationStatus,
  trainingStatus,
  postList,
  roleType,
  orgType,
  orgAddrType,
  orgStatus,
  classStatus
}
