<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-18 09:55:03
 * @Description: 讲师库
-->
<template>
 <div>
        <v-component  :okText="okText" :headerDate="queryHeader"
                       @getQuery="getQuery" @reset="resetQuery"
                       :settingList="settingList" :datalist="data" :headercolumns="columns" :rowSelect="selectrow" :isbordered="false" :buttonList="buttonItem" :pageItem="page"
                       @buttonClick="buttonClick"    @setttingClick="setttingClick"  @pagechange="pagechange"  @inlineClick="inlineClick" ></v-component>
        <a-modal v-model="visible" title="新建讲师" :width="1024" @ok="handleSubmit">
                <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                    <a-row :gutter="24">
                      <a-col :span="12">
                        <a-form-item label="讲师UASS">
                          <a-input v-decorator="['userId', { rules: [{ required: true, message: '请必须输入讲师UASS' }] }]" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="讲师姓名">
                          <a-input v-decorator="['username', { rules: [{ required: true, message: '请必须输入讲师姓名' }] }]" />
                        </a-form-item>
                      </a-col>
                       <a-col :span="12">
                        <a-form-item label="职务">
                          <a-input v-decorator="['duty', { rules: [{ required: false, message: '请必须输入讲师职务' }] }]" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="专业领域">
                          <a-input v-decorator="['field', { rules: [{ required: true, message: '请必须输入讲师的专业领域' }] }]" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="讲师级别">
                          <a-input v-decorator="['teacherLevel', { rules: [{ required: false, message: '请必须输入讲师级别' }] }]" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="讲师类型">
                          <a-input v-decorator="['teacherType', { rules: [{ required: true, message: '请必须输入讲师类型' }] }]" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item label="聘任日期">
                                  <a-date-picker   style="width: 100%;" v-decorator="['appointTime', { rules: [{ required: false, message: '请选择出生年月' }]}]"
                                                  format="YYYY-MM-DD"/>
                        </a-form-item>
                      </a-col>
                    </a-row>
                </a-form>
        </a-modal>

         <!-- 批量上传 -->
    <a-modal v-model="uploadvisible" title="批量上传" :width="800" @ok="uploadvisible=false">
        <a-row  type="flex">
           <a-col :flex="1">
                <a-button @click="down()" type="primary">
                    下载模板
                  </a-button>
           </a-col>
           <a-col :flex="1">
                    <a-upload
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                    >
                    <a-button> <a-icon type="upload" /> 上传文件 </a-button>
                </a-upload>
           </a-col>
        </a-row>
    </a-modal>
 </div>
</template>

<script>
import vComponent from 'Components/component'
import { getEnumArray } from 'Common/utils'
import { postList } from 'Common/enum'
import http from 'Common/http'
const BASE_API = process.env.BASE_API
const psList = getEnumArray(postList)
const resquest = 'api'
export default {
  name: 'Home',
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        {label: '讲师UASS', value: 'userId', type: 'input', filedType: 'string' },
        {label: '姓名', value: 'username', type: 'input', filedType: 'string'},
        {label: '岗位', value: 'duty', type: 'select', filedType: 'string', select: psList},
        {label: '类型', value: 'teacherType', type: 'input', filedType: 'string'},
        {label: '擅长领域', value: 'field', type: 'input', filedType: 'string'}
      ],
      // table 控件封装方法
      settingList: [
         { name: '新增讲师', value: 'add', icon: 'plus' },
          { name: '批量上传', value: 'upload', icon: 'arrow-up' }
      ],
      selectrow: false, // 默认不要checkbox选择框
      data: [],
      dataItem: {},
      columns: [
        { title: '讲师UASS',
          dataIndex: 'userId',
         scopedSlots: { customRender: 'inlineButton' },
          sorter: (a, b) => a.userId.length - b.userId.length
        },
        { title: '姓名',
          dataIndex: 'username',
          sorter: (a, b) => a.username.length - b.username.length
        },
        { title: '岗位',
          dataIndex: 'duty',
          sorter: (a, b) => a.duty.length - b.duty.length
        },
        { title: '类型',
          dataIndex: 'teacherType',
          sorter: (a, b) => a.teacherType.length - b.teacherType.length
        },
        { title: '擅长领域',
          dataIndex: 'field',
          sorter: (a, b) => a.field.length - b.field.length
          // scopedSlots: { customRender: 'tags' }
        },
        { title: '课程总数',
          dataIndex: 'lessionCount',
          sorter: (a, b) => a.lessionCount - b.lessionCount
        },
        { title: '授课总次数',
          dataIndex: 'skzcs',
          sorter: (a, b) => a.skzcs - b.skzcs
        },
        { title: '学员总人次',
          dataIndex: 'xxzcs',
          sorter: (a, b) => a.xxzcs - b.xxzcs
        },
        {
          title: '操作',
          dataIndex: 'exre',
          scopedSlots: { customRender: 'exre' }
        }
      ],
      buttonItem: [
        {key: 'info', value: '详情', color: 'green'},
        {key: 'edit', value: '修改'},
        { key: 'del', value: '删除', color: 'red' }
      ],
      page: {
        current: 1,
        total: 10
      }, // list页码内容
      visible: false, // 讲师新增界面
      isupdate: false, // 是否是修改
      uploadvisible: false, // 批量上传弹框
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  methods: {
    getteacherList(parms) {
      const dataItem = {
            'page': {
                'current': this.page.current,
                'size': 10
            },
            'condition': parms || []
          };
           http.post(BASE_API + resquest + '/teachers/page', dataItem).then(res => {
              if (res.status === 200) {
                    this.data = res.data.records
                    this.page.total = res.data.total
                    this.page.current = res.data.current
              }
          }).catch(err => console.log(err));
    },
    getQuery ($event) {
       this.page.current = 1; // 更改为第一页
    this.getteacherList($event)
    },
    resetQuery () {
       this.page.current = 1; // 更改为第一页
        this.getteacherList()
    },
    // 表格组件操作按钮点击事件
    buttonClick ($event) {
      this.dataItem = $event.item
      if ($event.key === 'edit') {
          this.visible = true;
          this.isupdate = true; // 是修改
          setTimeout(() => {
            this.form.setFieldsValue($event.item)
            })
      } else if ($event.key === 'info') {
         this.$router.push('/teacherdetails')
      } else {
            this.$confirm({
              title: '确定要删除讲师吗? 删除之后不可恢复!',
              content: '',
              okText: '确定',
              cancelText: '取消',
              onOk: async () => {
                http.delete(BASE_API + resquest + '/teachers/' + $event.item.id).then(res => {
                            if (res.status === 200) {
                            this.$message.success('删除讲师成功')
                            this.getteacherList()
                            }
                        }).catch(err => console.log(err));
              }
            });
      }
    },
    inlineClick($event) {
       this.$router.push('/teacherdetails')
    },
    // 表格组件翻页点击事件
    pagechange ($event) {
      this.page.current = $event;
      this.getteacherList(); // 重新查询
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
      // 提交or弹框关闭
    handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
              if (!this.isupdate) { // 是新增
                  http.post(BASE_API + resquest + '/teachers', values).then(res => {
                      if (res.status === 200) {
                      this.$message.success('新增讲师成功')
                       this.getteacherList()
                      }
                  }).catch(err => console.log(err));
              } else {
                values.id = this.dataItem.id;
                http.put(BASE_API + resquest + '/teachers', values).then(res => {
                      if (res.status === 200) {
                      this.$message.success('修改讲师成功')
                       this.getteacherList()
                      }
                  }).catch(err => console.log(err));
              }
            }
        this.visible = false;
      });
    },
     // 下载模板
    down() {
          const link = document.createElement('a')
          link.setAttribute('download', '讲师.xlsx') // 下载的文件名
          link.href = BASE_API + '/static/jsbdr.xlsx' // 文件url
          link.click()
    },
     // 上传接口，还需要在调整
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    }
  },
  components: {
    vComponent
  },
  created: function () {
      this.getteacherList()
  }
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
