<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-13 09:55:03
 * @Description: 我是教师-我的课程
-->
<template>
 <div>
        <v-component  :okText="okText" :headerDate="queryHeader"
                       @getQuery="getQuery" @reset="resetQuery"
                       :settingList="settingList" :datalist="data" :headercolumns="columns" :rowSelect="selectrow" :isbordered="false" :buttonList="buttonItem" :pageItem="page"
                       @buttonClick="buttonClick"  @pagechange="pagechange" @setttingClick="setttingClick" ></v-component>
          <a-modal v-model="visible" title="新增课程" :width="1024" @ok="handleSubmit">
               <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-row :gutter="24">
                      <a-col :span="24">
                                  <a-form-item label="课程名称" :labelCol="{span: 3}" :wrapper-col="{ span: 21 }">
                                      <a-input
                                        v-decorator="['LESSON_NAME', { rules: [{ required: true, message: '请必须写入课程名称' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="12">
                              <a-form-item label="课程状态">
                                <a-select   v-decorator="['LESSON_STATUS', { rules: [{ required: true, message: '请选择课程状态' }] },]"
                                    placeholder="请选择课程状态" @change="handleSelectChange">
                                      <a-select-option   v-for="item in startStatus" :key="item.value"   :value="item.label">
                                        {{item.value}}
                                      </a-select-option>
                              </a-select>
                              </a-form-item>
                      </a-col>
                       <a-col  :span="12">
                              <a-form-item label="课时(小时)">
                                <a-input
                                        v-decorator="['LESSION_COUNT', { rules: [{ required: true, message: '请输入课时' }] }]"
                                      />
                              </a-form-item>
                      </a-col>
                      <a-col  :span="12" >
                                  <a-form-item label="专题" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-select  allowClear showSearch v-decorator="['sszt', { rules: [{ required: true, message: '请选择所属专题' }] },]"
                                              placeholder="所属专题" @change="topicChange">
                                          <a-select-option   v-for="item in topicList" :key="item.value"   :value="item.label">
                                            {{item.value}}
                                          </a-select-option>
                                    </a-select>
                                  </a-form-item>
                      </a-col>
                       <a-col  :span="12" v-if="selectzt">
                                  <a-form-item  :labelCol="{span: 3}" :wrapper-col="{ span: 20 }">
                                      <a-select allowClear showSearch  v-decorator="['ejzt', { rules: [{ required: true, message: '请选择所属类别' }] },]"
                                              placeholder="专题类别" @change="topicchildChange">
                                          <a-select-option   v-for="item in topicchildList" :key="item.value"   :value="item.label">
                                            {{item.value}}
                                          </a-select-option>
                                    </a-select>
                                  </a-form-item>
                      </a-col>
                       <a-col  :span="24" >
                                  <a-form-item label="课程介绍" :labelCol="{span: 3}" :wrapper-col="{ span: 21 }">
                                      <a-textarea
                                        v-decorator="['LESSON_DESC', { rules: [{ required: true, message: '请输入课程介绍' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="24" >
                                  <a-form-item label="预约说明" :labelCol="{span: 3}" :wrapper-col="{ span: 21 }">
                                      <a-textarea
                                        v-decorator="['SUB_DES', { rules: [{ required: true, message: '请输入预约说明' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                    </a-row>
                </a-form>
            </a-modal>
 </div>
</template>

<script>
import vComponent from 'Components/component'
import { getEnumArray, tableTranslation } from 'Common/utils'
import { startStatus } from 'Common/enum'
const list = getEnumArray(startStatus)
export default {
  name: 'Home',
  data () {
    return {
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        {label: '课程名称', value: 'LESSON_NAME', type: 'input', filedType: 'string' },
        {label: '课程状态', value: 'LESSON_STATUS', type: 'select', filedType: 'string', select: list},
        {label: '所属专题', value: 'sszt', type: 'input', filedType: 'string'}
      ],
      // table 控件封装方法
      settingList: [ // table 前置按钮
        {name: '新增课程', value: 'add', icon: 'plus'}
      ],
      selectrow: false, // 默认不要checkbox选择框
      data: [
        { LESSON_NAME: '测试课程1', LESSON_DESC: '测试我的课程', LESSON_STATUS: '0', sszt: '[产品创新与管理]', CREATED_TIME: '2020-11-13 20:03:02', remarLESSION_COUNT: '无' },
        { LESSON_NAME: '测试课程2', LESSON_DESC: '测试我的课2', LESSON_STATUS: '1', sszt: '[数据管理]', CREATED_TIME: '2020-11-12 14:30:30', remarLESSION_COUNT: '无' },
        { LESSON_NAME: '测试课程3', LESSON_DESC: '测试我的课3', LESSON_STATUS: '1', sszt: '[业务知识]', CREATED_TIME: '2020-11-11 14:30:30', remarLESSION_COUNT: '无' }
      ],
      columns: [
        { title: '课程名称',
          dataIndex: 'LESSON_NAME',
          sorter: (a, b) => a.LESSON_NAME.length - b.LESSON_NAME.length
        },
        { title: '课程简介',
          dataIndex: 'LESSON_DESC',
          sorter: (a, b) => a.LESSON_DESC.length - b.LESSON_DESC.length
        },
        { title: '课程状态',
          dataIndex: 'LESSON_STATUS',
          customRender: renderContent, // 渲染函数的规则
          sorter: (a, b) => a.LESSON_STATUS.length - b.LESSON_STATUS.length
        },
        { title: '所属专题',
          dataIndex: 'sszt',
          sorter: (a, b) => a.sszt.length - b.sszt.length
        },
        { title: '创建时间',
          dataIndex: 'CREATED_TIME',
          sorter: (a, b) => a.CREATED_TIME.length - b.CREATED_TIME.length
        },
        { title: '备注',
          dataIndex: 'remarLESSION_COUNT',
          sorter: (a, b) => a.remarLESSION_COUNT.length - b.remarLESSION_COUNT.length
        },
        {
          title: '操作',
          dataIndex: 'exre',
          scopedSlots: { customRender: 'exre' }
        }
      ],
      buttonItem: [
        {key: 'info', value: '详情', color: '#1890ff'},
        {key: 'edit', value: '修改'},
        {key: 'del', value: '删除', color: 'red'}
      ],
      page: {
        current: 1,
        total: 10
      }, // list页码内容
      startStatus: [], // 开课状态
      visible: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      statusList: [],
      topicList: [
        {label: 'djjp', value: '党建精品'},
        {label: 'sdzl', value: '三大战略'},
        {label: 'xczx', value: '乡村振兴'},
        {label: 'cpcx', value: '产品创新与管理'},
        {label: 'ywzs', value: '业务知识'},
        {label: 'other', value: '其他'}
      ],
      selectzt: false, // 专题默认false
      topicchildList: [] // 所属专题类别
    }
  },
  methods: {
    getQuery ($event) {
      console.log($event)
    },
    resetQuery () {

    },
    // 表格组件操作按钮点击事件
    buttonClick ($event) {
      console.log($event)
      if ($event.key === 'edit') {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue({
            LESSON_DESC: $event.item.LESSON_DESC,
            LESSON_NAME: $event.item.LESSON_NAME,
            remarLESSION_COUNT: $event.item.remarLESSION_COUNT,
            LESSON_STATUS: $event.item.LESSON_STATUS
          })
        })
      } else {
        console.log('删除逻辑')
      }
    },
    // 表格组件翻页点击事件
    pagechange ($event) {
      console.log($event)
    },
    // 表格前置按钮方法
    setttingClick ($event) {
      this.form.resetFields() // 重置方法
      this.visible = true
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        LESSON_STATUS: value
      })
    },
    // 专题选择事件
    topicChange (value) {
      this.form.setFieldsValue({
        sszt: value,
        ejzt: undefined
      })
      console.log(value)
      if (value === 'djjp') {
        this.topicchildList = [
          {label: 'ddpx', value: '道德品行'},
          {label: 'zzll', value: '政治理论'},
          {label: 'dydx', value: '党员党性'}
        ]
      } else {
        this.topicchildList = []
      }
      this.selectzt = true // 显示
    },
    // 专题选择事件
    topicchildChange (value) {
      this.form.setFieldsValue({
        ejzt: value
      })
    },
    // 提交or弹框关闭
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 提交逻辑
          console.log(values)
        }
        this.visible = false
      })
    }
  },
  components: {
    vComponent
  },
  created: function () {
    this.startStatus = getEnumArray(startStatus)
  }
}

const renderContent = (value) => {
  return tableTranslation(startStatus, value)
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
