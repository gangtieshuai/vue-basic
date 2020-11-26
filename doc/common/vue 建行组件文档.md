1、何时使用
    通用增删改查的时候使用
2、调用事例:
        <v-common :breaditem="breadcrumbs"
                      :okText="okText" :headerDate="queryHeader"
                      @getQuery="getQuery" @reset="resetQuery"
                       :settingList="settingList" :datalist="data" :headercolumns="columns" :rowSelect="selectrow" :isbordered="false" :buttonList="buttonItem" :pageItem="page"
                       @buttonClick="buttonClick"  @pagechange="pagechange" @setttingClick="setttingClick"  @rowClick="rowClick"   @inlineClick="inlineClick" @selectChange="selectChange"
        ></v-common>
        <a-modal v-model="visible" title="新增用户" :width="1024" @ok="handleSubmit">
               <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
                <a-row :gutter="24">
                      <a-col :span="12">
                                  <a-form-item label="用户代码">
                                      <a-input
                                        v-decorator="['userCode', { rules: [{ required: true, message: '请必须传入用户代码' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="12">
                                  <a-form-item label="用户名称">
                                      <a-input
                                        v-decorator="['userName', { rules: [{ required: false, message: 'Please input your note!' }] }]"
                                      />
                                  </a-form-item>
                      </a-col>
                      <a-col  :span="12">
                              <a-form-item label="用户类型">
                                <a-select   v-decorator="['userType', { rules: [{ required: true, message: '请选择用户类型' }] },]"
                                    placeholder="请选择用户类型" @change="handleSelectChange">
                                      <a-select-option value="1">
                                        行员
                                      </a-select-option>
                                      <a-select-option value="2">
                                        外包
                                      </a-select-option>
                              </a-select>                            
                              </a-form-item>
                      </a-col>
                    </a-row>  
                </a-form>
            </a-modal>          
3、 属性文档
属性 | 备注
---|---
datalist | table数据源，Array类型
headercolumns | table表头，Array类型
isbordered | table是否需要边框，boolean类型,默认false
buttonList | 操作栏按钮，Array类型
pageItem | 翻页参数，对象
rowSelect |  属性，table是否有选择框，默认false
settingList | 属性, table表头按钮 Array类型
ellipsis    |  表头属性，是否超长省略
customRender | 表头属性，列表翻译
buttonClick |  方法，点击操作栏具体操作方法
pagechange |  方法，翻页改变方法
rowClick |  方法，整行点击事件方法
inlineClick |  方法，单个a标签点击事件方法
setttingClick |  方法, table头部按钮点击事件
selectChange |  rowSelect为true时才生效，获取选中的数据
okText | query 控件按钮名称，默认‘查询’  类型: string
headerDate |  query控件主要数据源，查询列表， 类型 array
getQuery | query控件查询方法，筛选的原数组，用来发送给后台调用
reset | query控件重置方法，点击重置是触发
breadcrumbs | 主要属性,传递面包屑所需要的原始数据
breadcrumbs.numtitle |  二级菜单名称
breadcrumbs.icon | 二级菜单图标
breadcrumbs.url | 二级菜单路由名称
breadcrumbs.isshow | 是否显示三级菜单名
breadcrumbs.numtitle1 | 三级菜单菜单名称
breadcrumbs.icon1 | 三级菜单路由图标
breadcrumbs.url1 | 三级菜单路由名称
4、调用实例      
        <script>
            import vCommon from './common'
            import utils from '../utils/utils.js';
            export default {
          data(){
            return {
              // 面包屑属性
              breadcrumbs:{
                numtitle: '权限管理',
                icon:'team',
                url:'user',
                isshow:true,
                numtitle1: '用户管理',
                icon1:'user',
                url1:'user'
              },
              // 万能查询传参
              queryHeader:  [
                { label: '用户代码', value: 'user_code',  type: 'input',  filedType:  'string'},
                { label: '用户名称', value: 'user_name',  type: 'input',  filedType:  'string'},
                { label: '用户类型', value: 'user_type',  type: 'select',  filedType:  'string', select: [
                  {name: "本行员工",value: "1"}, {name: "实习生",value: "21"}, {name: "运行人员",value: "22"}, 
                  {name: "外协单位",value: "23"}, {name: "虚拟用户",value: "3"}]},
                { label: '工作机构代码', value: 'org_code',  type: 'input', filedType:  'string'},
                { label: '用户状态', value: 'user_status',  type: 'select',  filedType:  'string', select: [
                  {name:'正常', value:'0'}, {name:'停用', value:'1'},
                ]},
                { label: '工作状态', value: 'work_status',  type: 'select',  filedType:  'string', dictId: 'SYS_WORK_STATUS'}
              ],
               // query组件方法传递
              okText:'查询',
              // list控件内容传递
               data :[
                  {key: '1',userCode: 'JohnBrown',userName: '约翰',userType: '1', 
                  usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'], userimg:[{key:'', style:'width:100px'}]},
                  {key: '2',userCode: 'JimGreen',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'], button:[
                      {key: 'upload', value: '上传'},
                      {key: 'look', value: '查看', color: 'green'},
                      {key: 'edit', value: '修改', color: 'pink'},
                      {key: 'del', value: '删除', color: 'red'},
                  ]},
                  {key: '3',userCode: 'JimGreen9',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
                  {key: '4',userCode: 'JimGreen8',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
                  {key: '5',userCode: 'JimGreen7',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
                  {key: '6',userCode: 'JimGreen6',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
                  {key: '7',userCode: 'JimGreen5',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
                  {key: '8',userCode: 'JimGreen4',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'ceshu', color: 'green'}], usericon:['step-backward'] },
                  {key: '9',userCode: 'JimGreen3',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
                  {key: '10',userCode: 'JimGreen2',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
                  {key: '11',userCode: 'JimGreen1',userName: '春海',userType: '2', usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}], usericon:['step-backward'] },
              ], // 数据源
              columns: [
                  {
                    title: '用户代码',
                    dataIndex: 'userCode'
                  },
                  {
                    title: '用户名称',
                    dataIndex: 'userName',
                     scopedSlots: { customRender: 'inlineButton' },  
                  },
                  {
                    title: '用户类型',
                    dataIndex: 'userType',
                    customRender: renderContent, // 渲染函数的规则
                    scopedSlots: { customRender: 'inlineButton' },
                  },
                  {
                     title: '图标',
                     dataIndex: 'usericon',
                     scopedSlots: { customRender: 'icon' },  
                  },
                  {
                    title: 'Tags',
                    key: 'usertags',
                    dataIndex: 'usertags',
                    scopedSlots: { customRender: 'tags' },
                  },
                  {
                    title: '图片',
                    key: 'userimg',
                    dataIndex: 'userimg',
                    scopedSlots: { customRender: 'img' },
                  },
                  {
                    title: '操作',
                    dataIndex: 'exre',
                    scopedSlots: { customRender: 'exre' },
                  },
              ], // table数组
              buttonItem: [
                {key: 'edit', value: '修改'},
                {key: 'del', value: '删除', color: 'red'},
              ], // 默认按钮方法
              page: {
                current:1,
                total: 11
              }, // list页码内容
              selectrow: false, // 默认不要checkbox选择框
              settingList: [ // table 前置按钮
                {name: '新增', value:'add'},
                {name: '上传', value:'upload', style: {'background': 'green', 'color':'#000'}}
              ],
              visible:false,
              form: this.$form.createForm(this, { name: 'advanced_search' }),
            }
          },
          methods:{
            // 万能查询查询方法
             getQuery($event) {
                  console.log($event)
             },
             // 万能查询重置方法
             resetQuery() {
               alert("进入")
             },
             // 表格前置按钮方法
             setttingClick($event) {
                 if($event === 'add') {
                    this.form.resetFields(); // 重置方法
                    this.visible = true;
                 }
             },
             // 表格组件操作按钮点击事件
             buttonClick($event){
                if($event.key == "edit") {
                   this.visible = true;
                   console.log()
                  setTimeout(() => {
                      this.form.setFieldsValue({
                                userCode: $event.item.userCode,
                                userName: $event.item.userName,
                                userType: $event.item.userType
                            })
                  })
                }
             },
             // 表格组件翻页点击事件
             pagechange($event) {
              if($event===2) {
                  this.data = [
                          {key: '2',userCode: 'wabgo',userName: '汪波',userType: '2',usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}] },
                          {key: '3',userCode: 'gshit',userName: '郭柿彤',userType: '2',usertags: [{key:'nice', color: 'red'}, {key:'developer', color: 'blue'}] },
                      ]
              }
             },
             // 表格组件整行点击事件
             rowClick($event){
                console.log($event);
             },
             // 特殊a标签点击事件
             inlineClick($event){
                console.log($event)
             },
             // table中checkbox选择数据
             selectChange($event) {
                console.log($event)
             },
             renderContent(value) {
               console.log(value)
             },
             // select选择事件
             handleSelectChange(value) {
              this.form.setFieldsValue({
                  userType: value
              })
             },
             // 提交or弹框关闭
             handleSubmit(e) {
              e.preventDefault();
              this.form.validateFields((err, values) => {
                if (!err) {
                  console.log(values);
                }
                this.visible = false;
              });
            },
          },
          components: {
              vCommon
          },
           created: function() { 
          },
        }
        const renderContent = (value) => {
          return utils.renderContent(value, 'user')
        }
        </script>
      
