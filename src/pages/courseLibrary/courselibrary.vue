<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-18 09:55:03
 * @Description: 课程库
-->
<template>
 <div>
        <v-component  :okText="okText" :headerDate="queryHeader"
                       @getQuery="getQuery" @reset="resetQuery"
                       :buttonList="buttonItem"
                       :settingList="settingList" :datalist="data" :headercolumns="columns" :rowSelect="selectrow" :isbordered="false"  :pageItem="page"
                      @pagechange="pagechange" @setttingClick="setttingClick"  @buttonClick="buttonClick"  @inlineClick="inlineClick"></v-component>
       <a-modal v-model="visible" title="新建课程" :width="1024" @ok="handleSubmit">
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
                           <a-select   v-decorator="['lessonStatus', { rules: [{ required: true, message: '请选择课程状态' }] },]"
                                    placeholder="请选择课程状态" @change="handleSelectChange">
                                      <a-select-option   v-for="item in lessonStatusList" :key="item.value"   :value="item.label">
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
import http from 'Common/http'
const BASE_API = process.env.BASE_API
const resquest = 'api'
const list = getEnumArray(startStatus)
export default {
  name: 'Home',
  data () {
    return {
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        {label: '课程名称', value: 'lessonName', type: 'input', filedType: 'string' },
         {label: '讲师', value: 'TEACHER_ID', type: 'input', filedType: 'string'},
        {label: '状态', value: 'lessonStatus', type: 'select', filedType: 'string', select: list},
        {label: '所属专题', value: 'sszt', type: 'input', filedType: 'string'}
      ],
      // table 控件封装方法
      // table 控件封装方法
      settingList: [
         { name: '新增课程', value: 'add', icon: 'plus' }
      ],
      selectrow: false, // 默认不要checkbox选择框
      data: [
        { lessonName: '测试课程1', lessonDesc: '测试我的课程', taacherId: 'huangshuqin.hn', lessonStatus: '0', sszt: '[产品创新与管理]', createdTime: '2020-11-13 20:03:02', remarLESSION_COUNT: '无' }
      ],
      columns: [
        { title: '课程名称',
          dataIndex: 'lessonName',
          sorter: (a, b) => a.lessonName.length - b.lessonName.length,
          scopedSlots: { customRender: 'inlineButton' }
        },
        { title: '课程简介',
          dataIndex: 'lessonDesc',
          sorter: (a, b) => a.lessonDesc.length - b.lessonDesc.length
        },
        { title: '讲师',
          dataIndex: 'teacherId',
          sorter: (a, b) => a.teacherId.length - b.teacherId.length
        },
        { title: '状态',
          dataIndex: 'lessonStatus',
          customRender: renderContent, // 渲染函数的规则
          sorter: (a, b) => a.lessonStatus.length - b.lessonStatus.length
        },
        { title: '所属专题',
          dataIndex: 'sszt',
          sorter: (a, b) => a.sszt.length - b.sszt.length
        },
        { title: '创建时间',
          dataIndex: 'createdTime',
          sorter: (a, b) => a.createdTime.length - b.createdTime.length
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
        { key: 'edit', value: '修改', color: '#1890ff' },
        { key: 'del', value: '删除', color: 'red' }
      ],
      page: {
        current: 1,
        total: 10
      }, // list页码内容
      visible: false, // 讲师新增界面
      isupdate: false, // 是否是修改
      uploadvisible: false, // 批量上传弹框
      form: this.$form.createForm(this, { name: 'advanced_search' }),
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
     getList(parms) {
      const dataItem = {
            'page': {
                'current': this.page.current,
                'size': 10
            },
            'condition': parms || []
          };
           http.post(BASE_API + resquest + '/lessons/page', dataItem).then(res => {
              if (res.status === 200) {
                    this.data = res.data.records
                    this.page.total = res.data.total
                    this.page.current = res.data.current
              }
          }).catch(err => console.log(err));
    },
    getQuery ($event) {
      this.page.current = 1; // 更改为第一页
      this.getList($event)
    },
    resetQuery () {
        this.page.current = 1; // 更改为第一页
        this.getList();
    },
    // 表格组件翻页点击事件
    pagechange ($event) {
      this.page.current = $event;
      this.getList(); // 重新查询
    },
    inlineClick($event) {
        console.log($event);
        this.$router.push('/coursedetails')
    },
     setttingClick($event) {
      if ($event === 'add') {
          this.form.resetFields() // 重置方法
          this.visible = true
          this.isupdate = false; // 是新增，不是修改
      } else {
         this.uploadvisible = true; // 批量上传弹框打开
      }
    },
     handleSelectChange (value) {
      this.form.setFieldsValue({
        lessonStatus: value
      })
    },
      // 提交or弹框关闭
    handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
              if (!this.isupdate) { // 是新增
                  http.post(BASE_API + resquest + '/lessons', values).then(res => {
                      if (res.status === 200) {
                      this.$message.success('新增课程成功')
                       this.getteacherList()
                      }
                  }).catch(err => console.log(err));
              } else {
                values.id = this.dataItem.id;
                http.put(BASE_API + resquest + '/lessons', values).then(res => {
                      if (res.status === 200) {
                      this.$message.success('修改课程成功')
                       this.getteacherList()
                      }
                  }).catch(err => console.log(err));
              }
            }
        this.visible = false;
      });
    },
     // 表格组件操作按钮点击事件
    buttonClick ($event) {
      this.dataItem = $event.item
      if ($event.key === 'edit') {
      this.visible = true
      this.isupdate = true; // 是修改
        let fn = sum => ['16', '8', '4', '2', '1'].filter((v, i) => !!Number(parseInt(sum, 10).toString(2).padStart(5, '0').split('')[i]))
        setTimeout(() => {
          $event.item.usertype = fn(Number($event.item.userType))
          this.form.setFieldsValue($event.item)
        })
      } else if ($event.key === 'del') {
        this.$confirm({
        title: '确定要删除课程吗? 删除之后不可恢复!',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          http.delete(BASE_API + resquest + '/users/' + $event.item.id).then(res => {
                      if (res.status === 200) {
                      this.$message.success('删除课程成功')
                       this.getList()
                      }
                  }).catch(err => console.log(err));
        }
      });
      } else {
        this.initDetail()
        this.userInfovisible = true
      }
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
    }

  },
  components: {
    vComponent
  },
  created: function () {
    this.lessonStatusList = getEnumArray(startStatus);
    this.getList(); // 查询所有课程列表
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
