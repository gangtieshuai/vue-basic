<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-16 09:55:03
 * @Description: 我是教师-上课记录
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
import { trainingStatus } from 'Common/enum'
const list = getEnumArray(trainingStatus)
export default {
  name: 'Home',
  data () {
    return {
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        {label: '课程名称', value: 'LESSON_NAME', type: 'input', filedType: 'string' },
        {label: '培训班名称', value: 'yypxb', type: 'input', filedType: 'string'},
        {label: '培训地点', value: 'yyr', type: 'input', filedType: 'string'},
        {label: '培训状态', value: 'skdd', type: 'select', filedType: 'string', select: list}
      ],
      // table 控件封装方法
      settingList: [], // table 前置按钮
      selectrow: false, // 默认不要checkbox选择框
      data: [
        { LESSON_NAME: '测试课程_20201112100635', pxbmc: '二期测试开班课程', pxsj: '2020-11-19 20:08:30', pxdd: '33', pxzt: '0' }
      ],
      columns: [
        { title: '课程名称',
          dataIndex: 'LESSON_NAME',
          sorter: (a, b) => a.LESSON_NAME.length - b.LESSON_NAME.length
        },
        { title: '培训班名称',
          dataIndex: 'pxbmc',
          sorter: (a, b) => a.pxbmc.length - b.pxbmc.length
        },
        { title: '培训时间',
          dataIndex: 'pxsj',
          sorter: (a, b) => a.pxsj.length - b.pxsj.length
        },
        { title: '培训地点',
          dataIndex: 'pxdd',
          sorter: (a, b) => a.pxdd.length - b.pxdd.length
        },
        { title: '培训状态',
          dataIndex: 'pxzt',
          customRender: renderContent, // 渲染函数的规则
          sorter: (a, b) => a.pxzt.length - b.pxzt.length
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
    this.schedule = getEnumArray(trainingStatus)
  }
}

const renderContent = (value) => {
  return tableTranslation(trainingStatus, value)
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
