<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-13 09:55:03
 * @Description: 我是学员-我的培训
-->
<template>
 <div>
        <v-component  :okText="okText" :headerDate="queryHeader"
                       @getQuery="getQuery" @reset="resetQuery"
                       :settingList="settingList" :datalist="data" :headercolumns="columns" :rowSelect="selectrow" :isbordered="false" :buttonList="buttonItem" :pageItem="page"
                       @buttonClick="buttonClick"  @pagechange="pagechange" @setttingClick="setttingClick"  @rowClick="rowClick"   @inlineClick="inlineClick" @selectChange="selectChange"></v-component>
          <a-modal v-model="visible" title="新增培训" :width="1024" @ok="handleSubmit">
               <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-row :gutter="24">
                      <a-col :span="12">
                                  <a-form-item label="培训名称">
                                      <a-input
                                        v-decorator="['pxmc', { rules: [{ required: true, message: '请必须写入培训名称' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="12">
                              <a-form-item label="开班进度">
                                <a-select   v-decorator="['kbjd', { rules: [{ required: true, message: '请选择开班进度' }] },]"
                                    placeholder="请选择开班进度" @change="handleSelectChange">
                                      <a-select-option   v-for="item in schedule" :key="item.value"   :value="item.label">
                                        {{item.value}}
                                      </a-select-option>
                              </a-select>
                              </a-form-item>
                      </a-col>
                       <a-col  :span="24" >
                                  <a-form-item label="培训简介" :labelCol="{span: 3}" :wrapper-col="{ span: 21 }">
                                      <a-textarea
                                        v-decorator="['CLASS_DESC', { rules: [{ required: false }] }]"
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
import { schedule } from 'Common/enum'
export default {
  name: 'Home',
  data () {
    return {
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        {label: '培训名称', value: 'pxmc', type: 'input', filedType: 'string' },
        {label: '开班进度', value: 'kbjd', type: 'input', filedType: 'string'}
      ],
      // table 控件封装方法
      settingList: [ // table 前置按钮
        {name: '新增培训', value: 'add', icon: 'plus'}
      ],
      selectrow: false, // 默认不要checkbox选择框
      data: [
        { pxmc: '测试班1', CLASS_DESC: '测试我的培训班', kbjd: '0' },
        { pxmc: '测试班2', CLASS_DESC: '测试我的培训班2', kbjd: '1' }
      ],
      columns: [
        { title: '培训名称',
          dataIndex: 'pxmc',
          sorter: (a, b) => a.pxmc.length - b.pxmc.length
        },
        { title: '培训简介',
          dataIndex: 'CLASS_DESC',
          sorter: (a, b) => a.CLASS_DESC.length - b.CLASS_DESC.length
        },
        { title: '开班进度',
          dataIndex: 'kbjd',
          customRender: renderContent, // 渲染函数的规则
          sorter: (a, b) => a.kbjd.length - b.kbjd.length
        },
        {
          title: '操作',
          dataIndex: 'exre',
          scopedSlots: { customRender: 'exre' }
        }
      ],
      buttonItem: [
        {key: 'edit', value: '修改'},
        {key: 'del', value: '删除', color: 'red'}
      ],
      page: {
        current: 1,
        total: 10
      }, // list页码内容
      schedule: [], // 开班数据
      visible: false,
      form: this.$form.createForm(this, { name: 'advanced_search' })
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
      if ($event.key === 'edit') {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue({
            pxmc: $event.item.pxmc,
            CLASS_DESC: $event.item.CLASS_DESC,
            kbjd: $event.item.kbjd
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
    // 表格组件整行点击事件
    rowClick ($event) {
      console.log($event)
    },
    // 特殊a标签点击事件
    inlineClick ($event) {
      console.log($event)
    },
    // table中checkbox选择数据
    selectChange ($event) {
      console.log($event)
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        CLASS_DESC: value
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
    this.schedule = getEnumArray(schedule)
  }
}

const renderContent = (value) => {
  return tableTranslation(schedule, value)
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
