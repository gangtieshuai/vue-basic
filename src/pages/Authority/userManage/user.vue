<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-18 09:55:03
 * @Description: 用户信息
-->
<template>
  <div>
    <v-component
      :okText="okText"
      :headerDate="queryHeader"
      @getQuery="getQuery"
      @reset="resetQuery"
      :settingList="settingList"
      :datalist="data"
      :headercolumns="columns"
      :pageItem="page"
      :rowSelect="selectrow"
      :isbordered="false"
      :buttonList="buttonItem"
      @buttonClick="buttonClick"
      @setttingClick="setttingClick"
      @pagechange="pagechange"
      @inlineClick="inlineClick"
    ></v-component>
    <a-modal v-model="visible" title="新建员工" :width="1024" @ok="handleSubmit">
      <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="UASS用户名">
              <a-input v-decorator="['uassid', { rules: [{ required: true, message: '请必须输入UASS用户名' }] }]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="员工编号">
              <a-input v-decorator="['empNo', { rules: [{ required: true, message: '请必须输入员工编号' }] }]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="员工姓名" >
              <a-input v-decorator="['username', { rules: [{ required: true, message: '请输入员工姓名' }] }]" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item label="用户类型">
                        <a-select mode="multiple"  v-decorator="['usertype', { rules: [{ required: true, message: '请选择用户类型' }] },]"
                                    placeholder="请选择用户类型" @change="userTypeListSelectChange">
                                      <a-select-option   v-for="item in userTypeList" :key="item.value"   :value="item.label">
                                        {{item.value}}
                                      </a-select-option>
                              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="员工性别">
                            <a-select   v-decorator="['gender', { rules: [{ required: true, message: '请选择员工性别' }] },]"
                                    placeholder="请选择员工性别" @change="handleSelectChange">
                                      <a-select-option   v-for="item in sexList" :key="item.value"   :value="item.label">
                                        {{item.value}}
                                      </a-select-option>
                              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="出生年月">
                       <a-date-picker  :locale="locale"  style="width: 100%;" v-decorator="['birth', { rules: [{ required: true, message: '请选择出生年月' }]}]"
                                      format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
            <a-col :span="12">
            <a-form-item label="身份证" >
              <a-input v-decorator="['idNo', { rules: [{ required: true, message: '请输入身份证号' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="手机号" >
              <a-input v-decorator="['phone', { rules: [{ required: true, message: '请输入员工姓名' }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所属机构编号" >
              <a-input v-decorator="['orgCode', { rules: [{ required: false}] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="现任职务" >
              <a-input v-decorator="['duty', { rules: [{ required: false }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所在岗位" >
              <a-input v-decorator="['positionName', { rules: [{ required: false }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="职位职等" >
              <a-input v-decorator="['dutyLevel', { rules: [{ required: false }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="入行年月">
                       <a-date-picker  :locale="locale"  style="width: 100%;" v-decorator="['workDate', { rules: [{ required: false, message: '请选择出生年月' }]}]"
                       format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item label="电子邮箱" >
              <a-input v-decorator="['email', { rules: [{ required: false }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 用户详情 -->
    <a-modal v-model="userInfovisible" title="用户详情" :width="1024" @ok="userInfovisible=false">
           <a-row  type="flex">
            <a-col :flex="1">
                  <a-row type="flex">
                    <a-col :flex="1" style="text-align: center;">
                     <img src="http://122.70.140.61:25601/assets/img/avatars/0.jpg">
                    </a-col>
                <a-col :flex="5">
                    <a-row class="title" type="flex">
                        <a-col :flex="1">
                           <h1>{{dataItem.username}} <span>（{{dataItem.uassid}})</span></h1>
                        </a-col>
                    </a-row>
                     <div class="line"></div>
                      <div class="teacher">
                          <a-row class="title" type="flex">
                            <a-col :flex="1" v-if="dataItem.empNo">
                              员工编号: {{dataItem.empNo}}
                            </a-col>
                            <a-col :flex="1" v-if="dataItem.orgCode">
                              机构编号: {{dataItem.orgCode}}
                            </a-col>
                          </a-row>
                      </div>
                      <div class="teacher" v-if="dataItem.userType">
                          用户类型: <a-tag style="cursor: pointer;" v-for="tag in taglist"    :key="tag" color="#1890ff">
                                  {{tag}}
                              </a-tag>
                      </div>
                      <div class="teacher">
                       <a-row class="title" type="flex">
                            <a-col :flex="1" v-if="dataItem.phone">
                               手机号码: {{dataItem.phone}}
                            </a-col>
                            <a-col :flex="1" v-if="dataItem.email">
                              电子邮件: {{dataItem.email}}
                            </a-col>
                          </a-row>
                     </div>
                     <div class="teacher" v-if="dataItem.idNo">
                              身份证号码: {{dataItem.idNo}}
                     </div>
                     <div class="teacher" v-if="dataItem.des">
                              用户描述: {{dataItem.des}}
                     </div>
                </a-col>
                  </a-row>
            </a-col>
            <a-col :flex="1"  class="rightbox" style=" justify-content: space-between;">
                  <div class="border"></div>
                  <div class="details">
                            <a-row type="flex" >
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{dataItem.positionName}}</p>
                                        <p>所在岗位</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                         <p class="number">{{dataItem.duty}}</p>
                                        <p>现任职务</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{dataItem.dutyLevel}}</p>
                                       <p>职位职等</p>
                                    </a-col>
                            </a-row>
                  </div>
                  <div class="details">
                            <a-row type="flex" >
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{dataItem.gender }}</p>
                                        <p>性别</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{dataItem.birth?dataItem.birth: 'xxxx-xx-xx'}}</p>
                                        <p>出生日期</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                       <p class="number">{{dataItem.workDate}}</p>
                                       <p>任职时间</p>
                                    </a-col>
                            </a-row>
                  </div>

            </a-col>
        </a-row>
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
import { sex, roleType } from 'Common/enum'
import http from 'Common/http'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
const sexList = getEnumArray(sex)
const BASE_API = process.env.BASE_API
const resquest = 'api'
export default {
  name: 'Home',
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      locale,
      // query控件方法传递
      okText: '查询',
      queryHeader: [
        // eslint-disable-next-line standard/object-curly-even-spacing
        { label: 'UASS用户名', value: 'uassid', type: 'input', filedType: 'string' },
        { label: '员工编号', value: 'empNo', type: 'input', filedType: 'string' },
        { label: '姓名', value: 'username', type: 'input', filedType: 'string' },
        { label: '性别', value: 'gender', type: 'select', filedType: 'string', select: sexList },
        { label: '身份证号码', value: 'idNo', type: 'input', filedType: 'string' },
        { label: '手机号', value: 'phone', type: 'input', filedType: 'string' },
        { label: '所属机构编号', value: 'orgCode', type: 'input', filedType: 'string' },
        { label: '现任职务', value: 'duty', type: 'input', filedType: 'string' },
        { label: '所在岗位', value: 'positionName', type: 'input', filedType: 'string' },
        { label: '职位职等', value: 'dutyLevel', type: 'input', filedType: 'string' }
      ],
      // table 控件封装方法
      settingList: [ // table 前置按钮
        { name: '新增员工', value: 'add', icon: 'plus' },
        { name: '批量上传', value: 'upload', icon: 'arrow-up' }
      ],
      selectrow: false, // 默认不要checkbox选择框
      data: [],
      buttonItem: [
        { key: 'edit', value: '修改', color: '#1890ff' },
        { key: 'del', value: '删除', color: 'red' },
        { key: 'info', value: '详情', color: 'green' }
      ],
      isupdate: false, // 是否是修改
      userInfovisible: false, // 用户详情弹框
      uploadvisible: false, // 批量上传弹框
      dataItem: {}, // 修改的数据
      columns: [
        {
          title: 'UASS用户名',
          dataIndex: 'uassid',
          scopedSlots: { customRender: 'inlineButton' }
        },
        {
          title: '员工编号',
          dataIndex: 'empNo',
          ellipsis: true
        },
        {
          title: '姓名',
          width: 80,
          dataIndex: 'username',
          ellipsis: true
        },
        {
          title: '性别',
          width: 60,
          dataIndex: 'gender'
        },
        {
          title: '出生年月',
          dataIndex: 'birth',
          ellipsis: true
        },
        {
          title: '身份证号码',
          dataIndex: 'idNo',
          ellipsis: true
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          ellipsis: true
        },
        {
          title: '所属机构编号',
          dataIndex: 'orgCode',
          ellipsis: true
        },
        {
          title: '现任职务',
          dataIndex: 'duty',
          ellipsis: true
        },
        {
          title: '所在岗位',
          dataIndex: 'positionName',
          ellipsis: true
        },
        {
          title: '职位职等',
          dataIndex: 'dutyLevel',
          ellipsis: true
        },
        {
          title: '入行年月',
          dataIndex: 'workDate',
          ellipsis: true
        },
        {
          width: '20%',
          title: '操作',
          dataIndex: 'exre',
          scopedSlots: { customRender: 'exre' }
        }

      ],
      sexList: [],
      userTypeList: [],
      page: {
        current: 1,
        total: 10
      }, // list页码内容
      visible: false,
      taglist: [], // 用户类型
      form: this.$form.createForm(this, { name: 'advanced_search' })
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
           http.post(BASE_API + resquest + '/users/page', dataItem).then(res => {
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
        title: '确定要删除员工吗? 删除之后不可恢复!',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          http.delete(BASE_API + resquest + '/users/' + $event.item.id).then(res => {
                      if (res.status === 200) {
                      this.$message.success('删除用户成功')
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
    // 表格组件翻页点击事件
    pagechange ($event) {
      this.page.current = $event;
      this.getList(); // 重新查询
    },
    inlineClick ($event) {
      this.userInfovisible = true;
      this.initDetail()
      this.dataItem = $event;
    },
    // 表格前置按钮方法
    setttingClick ($event) {
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
              var number = 0;
              values.usertype.forEach((item) => {
                    number = number + Number(item)
              })
              values.userType = number;
              values.birth = moment(values.birth._d).format('YYYY-MM-DD')
              values.password = '12345678';
              if (values.workDate) {
                values.workDate = moment(values.workDate._d).format('YYYY-MM-DD')
              }
              if (!this.isupdate) { // 是新增
                  http.post(BASE_API + resquest + '/users', values).then(res => {
                      if (res.status === 200) {
                      this.$message.success('新增用户成功')
                       this.getList()
                      }
                  }).catch(err => console.log(err));
              } else {
                values.id = this.dataItem.id;
                console.log(values)
                http.put(BASE_API + resquest + '/users', values).then(res => {
                      if (res.status === 200) {
                      this.$message.success('修改用户成功')
                       this.getList()
                      }
                  }).catch(err => console.log(err));
              }
            }
        this.visible = false;
      });
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        gender: value
      })
    },
    // 用户类型赋值
    userTypeListSelectChange(value) {
      this.form.setFieldsValue({
        userType: value
      })
    },
    // 初始化详情
    initDetail() {
        let fn = sum => ['学员', '教师', '分行人力部', '省行人力部', '管理员'].filter((v, i) => !!Number(parseInt(sum, 10).toString(2).padStart(5, '0').split('')[i]))
        this.taglist = fn(Number(this.dataItem.userType));
    },
    // 下载模板
    down() {
          const link = document.createElement('a')
          link.setAttribute('download', '员工.xlsx') // 下载的文件名
          link.href = BASE_API + '/static/yhbdr.xlsx' // 文件url
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
    this.sexList = getEnumArray(sex);
    this.userTypeList = getEnumArray(roleType);
    this.getList();
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

  .title {
    position: relative;
  }

  .title h1 {
    display: inline-block;
    font-size: 24px;
    line-height: 28px;
  }
  .title span {
    font-size: 18px;
    line-height: 18px;
    vertical-align:super;
  }

  .teacher{
      margin: 15px 0px;
      font-weight: 500;
      font-size: 14px;
  }
  .tag {
    font-size: 16px;
    padding: 4px 9px;
    line-height: 22px;
    cursor: pointer;
  }

  .card {
    margin: 15px 0px;
  }

  img {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background-clip: padding-box;
    border-radius: 50%;
    border-radius: 50%;
    background-clip: padding-box;
    border: 5px solid #f5f5f5;
    box-shadow: 0 0 10px rgba(0,0,0,.15);
    margin: 25px auto;
  }

  .line {
    height:1px; border: 1px solid #eee; width:90%;
  }
  .rightbox {
    position: relative;
  }

  .rightbox .border {
      width: 1px;
      position: absolute;
      left: 0px;
      background: #eee;
      height: 100%;
  }

  .details {
    height: 50%;
    /* border-bottom: 1px solid #eee */
  }

  .info {
    text-align: center;
    border-right: 1px solid #eee;
  }

  .info:last-child {
      border-right: none;
  }
  .number {

    font-family: 'Lucida Sans','trebuchet MS',Arial,Helvetica;
    color: #e75b8d;
    margin-bottom: 0px;
  }

  .score {
    padding:20px 40px;
  }

  .apptinstructions {
    font-weight: 900;
  }
</style>
