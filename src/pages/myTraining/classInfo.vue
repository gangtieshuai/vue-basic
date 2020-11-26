<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-13 09:55:03
 * @Description: 我是教师-预约详情
-->
<template>
 <div class="box">
      <a-card class="card">
          <a-row  type="flex">
              <a-col :flex="1">
                    <a-row type="flex">
                      <a-col :flex="1" style="text-align: center;">
                      <img src="http://122.70.140.61:25601/assets/img/avatars/edit-paste.png">
                      </a-col>
                  <a-col :flex="5">
                      <a-row class="title" type="flex">
                          <a-col :flex="3">
                            <h1>{{item.className}}</h1>
                          </a-col>
                          <a-col :flex="1">
                              <a-tag   class="tag" color="#f4b400">
                                    {{item.classStatus ==='1' ? '待预约课程': (item.classStatus === '2'? '待导入学员' : (item.classStatus === '3' ? '待通知各方' : (item.classStatus === '4' ? '待评价' : '已结束')))}}
                              </a-tag>
                          </a-col>
                      </a-row>
                      <div class="teacher">
                        <a-row type="flex">
                            <a-col :flex="1">
                              主管部门: {{item.orgName}}
                            </a-col>
                            <a-col :flex="1">
                              联系人: {{item.linkName}}
                            </a-col>
                        </a-row>
                      </div>
                      <div class="teacher">
                        起止时间: {{item.timeArrange}}
                      </div>
                      <div class="teacher">
                        开班地点: {{item.classAddr}}
                      </div>
                      <div class="teacher">
                        领域主题: <a-tag style="cursor: pointer;" v-for="tag in taglist"    :key="tag.value" color="#8c0095">
                                    {{tag.label}}
                                </a-tag>
                      </div>
                  </a-col>
                    </a-row>
              </a-col>
              <a-col :flex="1"  class="rightbox" style=" justify-content: space-between;">
                    <div class="border"></div>
                    <div class="details">
                              <a-row type="flex" >
                                      <a-col :flex="1" class="info">
                                          <p class="number">{{item.classNumber}}</p>
                                          <p>包含课程数</p>
                                      </a-col>
                                      <a-col :flex="1" class="info">
                                          <p class="number">{{item.userNumber}}</p>
                                          <p>学员总数</p>
                                      </a-col>
                                      <a-col :flex="1" class="info">
                                        <p class="number">{{item.totalLesson}}</p>
                                        <p>课时总数</p>
                                      </a-col>
                              </a-row>
                    </div>
                    <div class="score" style="border-bottom: 1px solid #eee;">
                          综合评分: <a-rate :default-value="item.rankscore" disabled />
                    </div>
                    <div class="score">
                        <a-row >
                            <a-col :span="24" style="margin: 5px 0px;">
                              创建人 {{item.createdBy}}
                            </a-col>
                            <a-col :span="24" >
                              创建时间 {{item.createdTime}}
                            </a-col>
                        </a-row>
                    </div>
              </a-col>
          </a-row>

      </a-card>
      <a-card class="card" style="min-height: 200px" :title="'培训简介:' + item.classDesc">
          <a-card  class="card" :tab-list="tabList" :active-tab-key="noTitleKey"  @tabChange="key => onTabChange(key, 'noTitleKey')">
            <span slot="customRender" slot-scope="item"> <a-icon type="menu-unfold" />{{ item.name }} </span>
            <span slot="branche" slot-scope="item"> <a-icon type="book" />{{ item.name }} </span>
              <div v-if="noTitleKey === 'classInfo'">
                  <v-table  :datalist="classData" :headercolumns="classColumns"  :isbordered="false" :buttonList="buttonItem" :pageItem="page"
                         @buttonClick="buttonClick"  @pagechange="pagechange"    @inlineClick="inlineClick">
                  </v-table>
              </div>
              <div v-if="noTitleKey === 'userInfo'">
                  <a-button style="margin: 20px 0px" type="primary" @click="fileStudent">导入学员评价</a-button>
                  <v-table  :datalist="studentData" :headercolumns="studentColumns"  :isbordered="false" :pageItem="studentPage"
                     @pagechange="studentPagechange" >
                  </v-table>
              </div>
          </a-card>
      </a-card>
         <a-modal v-model="uploadvisible" title="学员上传" :width="800" @ok="uploadvisible=false">
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
import vTable from 'Components/table'
// const resquest = 'api'
import { tableTranslation } from 'Common/utils'
import { classStatus } from 'Common/enum'
// import http from 'Common/http'
const BASE_API = process.env.BASE_API
export default {
  name: 'Home',
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      taglist: [
        {label: '普惠与零售', value: 'other'}
      ],
      item: {
            className: '21',
            orgName: '长沙卧龙湾支行',
            timeArrange: '2020-11-21 - - 2020-11-25',
            linkName: '123',
            classAddr: '23',
            classStatus: '3',
            classNumber: '1',
            userNumber: '0',
            totalLesson: '12.0',
            classDesc: '323',
            createdBy: 'zhutianmei.hn',
            createdTime: ' 2020-11-24 15:52:28'
      },
      noTitleKey: 'classInfo',
      tabList: [
        {
          key: 'classInfo',
          name: '课程安排',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'userInfo',
          name: '学员信息',
          scopedSlots: { tab: 'branche' }
        }
      ],
      studentData: [],
      studentColumns: [{
          title: '课程名称',
          dataIndex: 'className'
        },
        {
          title: '学员UASS',
          dataIndex: 'userId'
        },
        {
          title: '学员姓名',
          dataIndex: 'userName'
        },
        {
          title: '所属机构',
          dataIndex: 'orgCode'
        },
        {
          title: '是否已评价',
          dataIndex: 'birth'
      }],
      studentPage: {
        current: 1,
        total: 10
      },
      uploadvisible: false,
      classData: [],
      classColumns: [
          {
            title: '课程名称',
            dataIndex: 'className',
            scopedSlots: { customRender: 'inlineButton' }
          },
          {
            title: '授课时间',
            dataIndex: 'classTime'
          },
          {
            title: '授课地点',
            dataIndex: 'classAddr'
          },
          {
            title: '授课教师',
            dataIndex: 'teacher'
          },
          {
            title: '课后评价',
            dataIndex: 'classEvaluate',
            ellipsis: true
          },
          {
            title: '课程状态',
            dataIndex: 'classStatus',
            customRender: renderContent // 渲染函数的规则
          },
          {
          width: '20%',
          title: '操作',
          dataIndex: 'exre',
          scopedSlots: { customRender: 'exre' }
        }
      ],
      page: {
        current: 1,
        total: 10
      },
      buttonItem: []
    }
  },
  methods: {
     onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
    // 表格组件翻页点击事件
    studentPagechange ($event) {
      this.studentPage.current = $event;
    },
    // 上传学员
    fileStudent() {
        this.uploadvisible = true
    },
     // 下载模板
    down() {
          const link = document.createElement('a')
          link.setAttribute('download', '学员评价.xlsx') // 下载的文件名
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
    },
    // 行内事件
    inlineClick ($event) {
        console.log('跳转到课程详情')
    },
     buttonClick ($event) {
       console.log('操作栏点击事件')
     },
    pagechange ($event) {
      this.page.current = $event;
    }
  },
  components: {
      vTable
  },
  created: function () {
      this.classData = [
        { className: '数字化经营理念和浅析', classTime: '2020-11-11 8:00 PM', classAddr: '123', teacher: 'huangshuqin.hn', classEvaluate: '', classStatus: '0' },
        { className: '基于新一代系统的精准营销', classTime: '2020-11-20 7:45 PM', classAddr: '777', teacher: 'zengmingxian.hn', classEvaluate: '', classStatus: '1' }
      ];
      this.classData.forEach((item) => {
          if (item.classStatus === '0') {
                item.button = [
                  {key: 'upload', value: '强制确认', color: 'red'}
                ]
          }
      })
  }
}
const renderContent = (value) => {
  return tableTranslation(classStatus, value)
}
</script>
<style scoped>
  .box{
    padding:24px;
    height: 100vh;
  }

  .title {
    position: relative;
  }

  .title h1 {
    display: inline-block;
    font-size: 28px;
    line-height: 28px;
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
    height:1px; border: 1px solid #eee; width:90%; margin: 20px 0px
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
    border-bottom: 1px solid #eee
  }

  .info {
    text-align: center; border-right: 1px solid #eee
  }

  .info:last-child {
      border-right: none;
  }
  .number {
    font-size: 30px;
    font-family: 'Lucida Sans','trebuchet MS',Arial,Helvetica;
    color: #e75b8d;
    margin-bottom: 0px;
  }

  .score {
    padding:10px 40px;
    font-weight: 500;
  }

  .apptinstructions {
    font-weight: 900;
  }
</style>
