<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-13 09:55:03
 * @Description:  讲师详情
-->
<template>
 <div class="box">
     <a-card class="card">
        <a-row  type="flex">
            <a-col :flex="1">
                  <a-row type="flex">
                    <a-col :flex="1" style="text-align: center;">
                     <img src="http://122.70.140.61:25601/assets/img/avatars/0.jpg">
                    </a-col>
                <a-col :flex="5">
                    <a-row class="title" type="flex">
                        <a-col :flex="1">
                           <h1>{{item.USERNAME}} <span style="font-size: 12px;vertical-align: super;">({{item.USER_ID}},{{item.IPHONE}})</span></h1>
                        </a-col>
                        <a-col :flex="1">
                             <a-tag   class="tag" :color="item.LESSON_DESC ==='0'? '#d73d32': '#f4b400'">
                                 <a-icon type="close" /> {{item.LESSON_DESC ==='0'? '取消关注': '立即关注'}}
                             </a-tag>
                        </a-col>
                    </a-row>
                    <div class="teacher">
                      岗位条线: <span>{{item.POSITION_TYPE}}</span>
                    </div>
                    <div class="teacher">
                      现任职务: <span>{{item.DUTY}}</span>
                    </div>
                     <div class="teacher">
                      擅长领域: <a-tag style="cursor: pointer;" v-for="tag in taglist"    :key="tag.value" color="#8c0095">
                                  {{tag.label}}
                              </a-tag>
                    </div>
                     <div class="line"></div>
                    <div class="contentdetails">
                      合规理念、员工禁止性规定、金融犯罪等
                    </div>
                </a-col>
                  </a-row>
            </a-col>
            <a-col :flex="1"  class="rightbox" style=" justify-content: space-between;">
                  <div class="border"></div>
                  <div class="details">
                            <a-row type="flex" >
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{item.startClass}}</p>
                                        <p>总课程</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{item.grandTrainee}}</p>
                                        <p>开课次数</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{item.rank}}</p>
                                       <p>授课人次</p>
                                    </a-col>
                            </a-row>
                  </div>
                  <div class="details" style="height: 20%">
                            <a-row type="flex" >
                                    <a-col :flex="1" class="infotwo">
                                        <div>职位:行长</div>
                                    </a-col>
                                    <a-col :flex="1" class="infotwo">
                                        <div>被关注:0人</div>
                                    </a-col>
                                    <a-col :flex="1" class="infotwo">
                                      <div>任教: 0.1年</div>
                                    </a-col>
                            </a-row>
                  </div>
                  <div class="details" style="height: 20%;text-align:center;padding-top: 1.8vh;">
                           <a-row type="flex" >
                                    <a-col :flex="1" class="info">
                                          <div>讲师类型:</div>
                                    </a-col>
                            </a-row>
                  </div>
                  <div class="score">
                        授课综合评分: <a-rate :default-value="item.rankscore"  />
                  </div>
            </a-col>
        </a-row>

     </a-card>
      <a-card class="card" style="min-height: 200px" :title="'现有课程'">
          <v-component  :okText="okText" :headerDate="queryHeader"
              @getQuery="getQuery" @reset="resetQuery"
              :settingList="settingList" :datalist="data" :headercolumns="columns" :rowSelect="selectrow" :isbordered="false" :buttonList="buttonItem" :pageItem="page"
              @buttonClick="buttonClick"  @pagechange="pagechange"  ></v-component>
       </a-card>

                <a-modal v-model="visible" title="预约课程" :width="1024" @ok="handleSubmit">
               <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                <a-row :gutter="24">
                      <a-col :span="12">
                                  <a-form-item label="课程名称" >
                                      <a-input :disabled="true"
                                        v-decorator="['LESSON_NAME', { rules: [{ required: true, message: '请输入课程名称' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                       <a-col :span="12">
                                  <a-form-item label="授课教师" >
                                      <a-input :disabled="true"
                                        v-decorator="['TEACHER_ID', { rules: [{ disabled:true,  required: true, message: '请输入授课讲师' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="12">
                              <a-form-item label="所属培训班">
                                <a-select   v-decorator="['CLASS_ID', { rules: [{ required: true, message: '请选择培训班' }]}]"
                                    placeholder="请选择培训班" @change="handleSelectChange">
                                      <a-select-option   v-for="item in classList" :key="item.value"   :value="item.label">
                                        {{item.value}}
                                      </a-select-option>
                              </a-select>
                              </a-form-item>
                      </a-col>
                      <a-col  :span="12">
                              <a-form-item label="上课时间">
                                <a-date-picker  :locale="locale"  style="width: 100%;" v-decorator="['TIME', { rules: [{ required: true, message: '请选择上课时间' }]}]"
                                      format="YYYY-MM-DD HH:mm:ss"
                                      :disabled-date="disabledDate"
                                      :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                                    />
                              </a-form-item>
                      </a-col>
                      <a-col :span="12">
                                  <a-form-item label="上课地点" >
                                      <a-input
                                        v-decorator="['skdd', { rules: [{ required: true, message: '请输入上课地点' }] }]"
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
import moment from 'moment';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
const list = getEnumArray(startStatus)
export default {
  name: 'Home',
  data () {
    return {
      locale,
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
        { title: '简介',
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
        {key: 'info', value: '详情', color: '#1890ff'}
      ],
      page: {
        current: 1,
        total: 10
      }, // list页码内容
      taglist: [
        {label: '其他', value: 'other'},
        {label: '党员党性', value: 'dydx'},
        {label: '党建精品', value: 'dyjp'}
      ],
      visible: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      item: {
            USERNAME: '邓雅元',
            USER_ID: 'dengren.hn',
            LESSON_DESC: '0',
            IPHONE: '18674386314',
            POSITION_TYPE: '长沙师大支行',
            FIELD: '党员党性',
            DUTY: '行长',
            startClass: '1',
            grandTrainee: '0',
            rank: '5',
            rankscore: 4
      },
      // 后期走接口，模拟
      classList: [
        {label: 'two', value: '二期测试培训班'},
        {label: 'three', value: '三期培训班'},
        {label: 'one', value: '一期培训班'}
      ]
    }
  },
  methods: {
    moment,
    getQuery ($event) {
      console.log($event)
    },
    resetQuery () {

    },
    // 表格组件操作按钮点击事件
    buttonClick ($event) {
      if ($event.key === '0') {
        console.log($event)

          this.visible = true;
          setTimeout(() => {
            this.form.setFieldsValue({
              LESSON_NAME: $event.item.LESSON_NAME,
              TEACHER_ID: this.item.USERNAME
      })
          })
      } else {
        console.log('已预约')
      }
    },
    // 表格组件翻页点击事件
    pagechange ($event) {
      console.log($event)
    },
     // 提交or弹框关闭
    handleSubmit (e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          // 提交逻辑
          this.visible = false
           this.$message.success(
                '预约成功!',
                10
            );
          // 刷新列表即可
        }
      })
    },
     handleSelectChange (value) {
      this.form.setFieldsValue({
        CLASS_ID: value
      })
    },
     disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }

  },
  components: {
    vComponent
  },
  created: function () {
     this.data.forEach(item => {
          if (item.LESSON_STATUS === '0') {
              item.button = [{key: '0', value: '预约此课'}]
          } else {
              item.button = [{key: '1', value: '已预约', color: 'red'}]
          }
     })
  }
}
  const renderContent = (value) => {
  return tableTranslation(startStatus, value)
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
      font-size: 18px;
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
    height: 30%;
    border-bottom: 1px solid #eee
  }

  .info {
    text-align: center; border-right: 1px solid #eee
  }

  .info:last-child {
      border-right: none;
  }
  .number {
    font-size: 24px;
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

  .contentdetails {
    display: block;
    padding: 10px;
    margin: 10px 0;
    font-size: 14px;
    line-height: 14px;
    width: 90%;
    color: #555;
    background-color: #f8f8f8;
    border: 1px solid #dedede;
    border-radius: 0;
  }
  .infotwo {
    height: 100%;
    text-align: center;
    border-right: 1px solid #eee;
    font-size: 20px;
  }
  .infotwo:last-child{
    border-right:  none;
 }

  .infotwo>div {
     height: 100%;
     padding-top: 1vh;
  }

</style>
