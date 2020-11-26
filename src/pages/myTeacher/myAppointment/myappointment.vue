<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-13 09:55:03
 * @Description: 我是教师-我的预约
-->
<template>
 <div>
        <v-component  :okText="okText" :headerDate="queryHeader"
                       @getQuery="getQuery" @reset="resetQuery"
                       :settingList="settingList" :datalist="data" :headercolumns="columns" :rowSelect="selectrow" :isbordered="false" :pageItem="page"
                        @pagechange="pagechange"     @inlineClick="inlineClick"></v-component>
 </div>
</template>

<script>
import vComponent from 'Components/component'
import { getEnumArray, tableTranslation } from 'Common/utils'
import { reservationStatus } from 'Common/enum'
const list = getEnumArray(reservationStatus)
export default {
  name: 'Home',
  data () {
    return {
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        {label: '课程名称', value: 'LESSON_NAME', type: 'input', filedType: 'string' },
        {label: '预约培训班', value: 'yypxb', type: 'input', filedType: 'string'},
        {label: '当前状态', value: 'dqzt', type: 'select', filedType: 'string', select: list},
        {label: '预约人', value: 'yyr', type: 'input', filedType: 'string'},
        {label: '授课地点', value: 'skdd', type: 'input', filedType: 'string'}
      ],
      // table 控件封装方法
      settingList: [], // table 前置按钮
      selectrow: false, // 默认不要checkbox选择框
      data: [
        { LESSON_NAME: '测试课程_20201112100635', yypxb: '二期测试开班课程', dqzt: '0', yyr: 'zhutianmei.hn', sksj: '020-11-19 19:45', skdd: '333' }
      ],
      columns: [
        { title: '课程名称',
          dataIndex: 'LESSON_NAME',
          sorter: (a, b) => a.LESSON_NAME.length - b.LESSON_NAME.length,
          scopedSlots: { customRender: 'inlineButton' }
        },
        { title: '预约培训班',
          dataIndex: 'yypxb',
          sorter: (a, b) => a.yypxb.length - b.yypxb.length
        },
        { title: '当前状态',
          dataIndex: 'dqzt',
          customRender: renderContent, // 渲染函数的规则
          sorter: (a, b) => a.dqzt.length - b.dqzt.length
        },
        { title: '预约人',
          dataIndex: 'yyr',
          sorter: (a, b) => a.yyr.length - b.yyr.length
        },
        { title: '授课时间',
          dataIndex: 'sksj',
          sorter: (a, b) => a.sksj.length - b.sksj.length
        },
        { title: '授课地点',
          dataIndex: 'skdd',
          sorter: (a, b) => a.skdd.length - b.skdd.length
        }
      ],
      page: {
        current: 1,
        total: 10
      }, // list页码内容
      schedule: [] // 开班数据

    }
  },
  methods: {
    getQuery ($event) {
      console.log($event)
    },
    resetQuery () {

    },
    // 表格组件翻页点击事件
    pagechange ($event) {
      console.log($event)
    },
    // 特殊a标签点击事件
    inlineClick ($event) {
      console.log($event)
      this.$router.push('/coursedetails')
    }

  },
  components: {
    vComponent
  },
  created: function () {
    this.schedule = getEnumArray(reservationStatus)
  }
}

const renderContent = (value) => {
  return tableTranslation(reservationStatus, value)
}

</script>
<style scoped>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
