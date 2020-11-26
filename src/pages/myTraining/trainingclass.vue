<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-13 09:55:03
 * @Description: 培训班
-->
<template>
 <div>
    <div class="query">
          <a-card>
              <v-query :okText="okText" :headerDate="queryHeader"
                       @getQuery="getQuery" @reset="resetQuery"></v-query>
          </a-card>
          <a-card style="margin-top:30px">
                 <a-button style="margin: 0px 0px 20px" type="primary" @click="addClass">新增培训班</a-button>
                 <!-- <a-button type="primary" @click="clickinfo">培训班详情</a-button> -->
                   <v-table  :datalist="data" :headercolumns="columns" :speedList= "speedList" :isbordered="false" :buttonList="buttonItem" :pageItem="page"
                         @buttonClick="buttonClick"  @pagechange="pagechange"  @inlineClick="inlineClick" @stepClick="stepClick" @stepNext="stepNext">
                  </v-table>
          </a-card>
          <!-- 新增培训班 -->
          <a-modal v-model="visible" title="新增培训班" :width="1024" @ok="handleSubmit">
               <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-row :gutter="24">
                      <a-col :span="24">
                                  <a-form-item label="培训班名称" :labelCol="{span: 3}" :wrapper-col="{ span: 21 }">
                                      <a-input
                                        v-decorator="['className', { rules: [{ required: true, message: '请必须写入培训班名称' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="12" >
                                  <a-form-item label="专题领域" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-select  allowClear showSearch v-decorator="['sszt', { rules: [{ required: true, message: '请选择所属专题' }] },]"
                                              placeholder="所属专题" @change="topicChange">
                                          <a-select-option   v-for="item in topicList" :key="item.value"   :value="item.label">
                                            {{item.value}}
                                          </a-select-option>
                                    </a-select>
                                  </a-form-item>
                      </a-col>
                       <a-col  :span="12" v-show="selectzt">
                                  <a-form-item  :labelCol="{span: 1}" :wrapper-col="{ span: 23 }">
                                      <a-select allowClear showSearch  v-decorator="['ejzt', { rules: [{ required: true, message: '请选择所属类别' }] },]"
                                              placeholder="专题类别" @change="topicchildChange">
                                          <a-select-option   v-for="item in topicchildList" :key="item.value"   :value="item.label">
                                            {{item.value}}
                                          </a-select-option>
                                    </a-select>
                                  </a-form-item>
                      </a-col>
                       <a-col  :span="12">
                              <a-form-item label="时间安排">
                                   <a-range-picker :locale="locale"  v-decorator="['timeArrange', { rules: [{ required: true, message: '请选择时间安排' }] }]" @change="onChange" />
                              </a-form-item>
                      </a-col>
                       <a-col :span="12">
                                  <a-form-item label="所属部门" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-input
                                        v-decorator="['orgCode', { rules: [{ required: true, message: '请必须所属部门' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                       <a-col :span="12">
                                  <a-form-item label="总课时(小时）" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-input
                                        v-decorator="['totalLesson', { rules: [{ required: true, message: '请输入总课时' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                       <a-col :span="12">
                                  <a-form-item label="培训天数" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-input
                                        v-decorator="['totalDays', { rules: [{ required: true, message: '请输入培训天数' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                       <a-col  :span="12" >
                                  <a-form-item label="授课地点" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-input
                                        v-decorator="['classAddr', { rules: [{ required: true, message: '请输入课程介绍' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="12" >
                                  <a-form-item label="联系人" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-input
                                        v-decorator="['linkName', { rules: [{ required: true, message: '请输入联系人' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="24" >
                                  <a-form-item label="培训介绍" :labelCol="{span: 3}" :wrapper-col="{ span: 21 }">
                                      <a-textarea
                                        v-decorator="['classDesc', { rules: [{ required: true, message: '请输入预约说明' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                       <a-col  :span="12"  v-show="false">
                                  <a-form-item label="开始时间" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-input
                                        v-decorator="['startDate', { rules: [{ required: true, message: '请输入预约说明' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                       <a-col  :span="12" v-show="false">
                                  <a-form-item label="结束时间" :labelCol="{span: 6}" :wrapper-col="{ span: 18 }">
                                      <a-input
                                        v-decorator="['endDate', { rules: [{ required: true, message: '请输入预约说明' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                    </a-row>
                </a-form>
          </a-modal>
          <!-- 预约课程---查询 -->
          <a-modal title="预约课程"  v-model="ordervisible" :width="1024" @ok="ordervisible = false">
                 <v-table  :datalist="classData" :headercolumns="classColumns"  :isbordered="false" :pageItem="classPage"
                     @pagechange="classPagechange" >
                  </v-table>
          </a-modal>

    </div>
 </div>
</template>

<script>
import vQuery from 'Components/query'
import vTable from 'Components/table'
import { getEnumArray } from 'Common/utils'
import { schedule } from 'Common/enum'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import http from 'Common/http'
const BASE_API = process.env.BASE_API
const resquest = 'api'
export default {
  name: 'Home',
  data () {
    return {
        locale,
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        {label: '培训名称', value: 'className', type: 'input', filedType: 'string' },
        {label: '开班进度', value: 'classStatus', type: 'input', filedType: 'string'}
      ],
      data: [],
      columns: [
          {
            title: '培训名称',
            dataIndex: 'className',
            scopedSlots: { customRender: 'inlineButton' },
            ellipsis: true
          },
          {
            title: '培训简介',
            dataIndex: 'classDesc',
            ellipsis: true
          },
          {
            width: '40%',
            title: '开班进度',
            dataIndex: 'classStatus',
            scopedSlots: { customRender: 'speed' }
          },
          {
          width: '10%',
          title: '操作',
          dataIndex: 'exre',
          scopedSlots: { customRender: 'exre' }
        }
      ],
      page: {
        current: 1,
        total: 10
      },
       topicList: [
        {label: 'djjp', value: '党建精品'},
        {label: 'sdzl', value: '三大战略'},
        {label: 'xczx', value: '乡村振兴'},
        {label: 'cpcx', value: '产品创新与管理'},
        {label: 'ywzs', value: '业务知识'},
        {label: 'other', value: '其他'}
      ],
      selectzt: false, // 专题默认false
      topicchildList: [], // 所属专题类别
      visible: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      speedList: [
        {key: 'add', value: '① 预约课程', status: '待预约课程'},
        {key: 'add', value: '② 导入学员', status: '待导入学员'},
        {key: 'add', value: '③ 通知各方', status: '待通知各方'},
        {key: 'add', value: '④ 开放互评', status: '待评价'},
        {key: 'add', value: '⑤ 培训结束', status: '已结束'}
      ],
      buttonItem: [
        { key: 'edit', value: '修改', color: '#1890ff' },
        { key: 'del', value: '删除', color: 'red' }
      ],
      // 预约课程字段
      ordervisible: false, // 预约课程弹框
      classData: [],
      classColumns: [],
      classPage: {
        current: 1,
        total: 10
      }
    }
  },
  methods: {
    // 查询机构
     getAllClass(parms) {
      const dataItem = {
            'page': {
                'current': 1,
                'size': 9999
            },
            'condition': parms || []
          };
           http.post(BASE_API + resquest + '/classes/page', dataItem).then(res => {
              if (res.status === 200) {
                this.data = res.data.records;
              }
          }).catch(err => console.log(err));
    },
    getQuery ($event) {
       this.page.current = 1; // 更改为第一页
      this.getAllClass($event)
    },
    resetQuery () {
      this.page.current = 1; // 更改为第一页
      this.getAllClass()
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
    // 特殊a标签点击事件
    inlineClick ($event) {
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
          delete values.timeArrange;
          this.selectzt = false;
           console.log(values)
        }
        this.visible = false
      })
    },
    addClass() {
      this.visible = true;
      this.form.resetFields(); // 重置
      // setTimeout(() => {
      //   this.form.setFieldsValue({
      //     timeArrange: ['2019-12-03', '2019-12-05']
      //    })
      // })
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
    onChange(date, dateString) {
        this.form.setFieldsValue({
          startDate: dateString[0],
          endDate: dateString[1]
        })
    },
  stepClick($event) {
      switch ($event.classStatus) {
        case '待预约课程':
            this.ordervisible = true; // 打开弹窗
        break;
        case '待导入学员':
        break;
        case '待通知各方':
        break;
        case '待评价':
        break;
      }
   },
   stepNext($event) {
      console.log($event)
      this.$confirm({
        title: '进度切换后，将进入下阶段操作,请确认是否切换?',
        content: '点击【确定】完成切换，点击【取消】放弃切换',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
           this.$message.success('重新刷新, 切换完成')
        }
      });
   },
   // 课程翻页
   classPagechange($event) {
      console.log($event)
   }
  },
  components: {
    vQuery,
    vTable
  },
  created: function () {
    this.schedule = getEnumArray(schedule);
    this.getAllClass();
  }
}

</script>
<style scoped>

</style>
