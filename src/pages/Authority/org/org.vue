<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-18 09:55:03
 * @Description: 专题消息
-->
<template>
  <div>
      <a-card :title="'机构管理'"  class="box">
        <a-row  type="flex">
              <a-col :flex="1">
                   <a-tree
                    :treeData="treeData"
                    :showLine="true"
                    show-icon
                    :load-data="onLoadData"
                    :defaultExpandAll="ExpandAll"
                    @expand="onExpand"
                    @select="this.onSelect"
                    @rightClick="this.onRightClick">
                    <template slot="custom" slot-scope="{  icon }">
                         <a-icon :type="icon" />
                    </template>
            </a-tree>
            <a-menu :style="menuStyle" v-show="menuVisible &&  menurightShow" ref='menubox' >
                        <a-menu-item id="menuItemClick" v-for="(item, index) in menuList" :key="index"  @click="menuItemClick(item.value)">{{item.label}}</a-menu-item>
            </a-menu>
              </a-col>
              <a-col v-if="clickInfo" :flex="1">
                  <h2>机构详情:</h2>
                  <a-row :gutter="24" class="colstyle">
                          <a-col :span="24" class="textoverflow">机构名称: {{nodeData.data.orgName}}</a-col>
                 </a-row>
                  <a-row :gutter="24" class="colstyle">
                          <a-col :span="12">机构代码: {{nodeData.data.orgCode}}</a-col>
                          <a-col :span="12">机构类型: {{nodeData.data.orgType}}</a-col>
                 </a-row>
                  <a-row :gutter="24" class="colstyle">
                          <a-col :span="12">机构状态: {{nodeData.data.orgStatus === '0'? '未知': '正常'}}</a-col>
                          <a-col :span="12">机构等级: {{nodeData.data.orgLevel}}</a-col>
                 </a-row>
                  <a-row :gutter="24" class="colstyle">
                          <a-col :span="12">地域类型: {{nodeData.data.orgAddrType}}</a-col>
                          <a-col :span="12">创建时间: {{nodeData.data.createdTime}}</a-col>
                 </a-row>
                  <a-row :gutter="24" class="colstyle">
                         <a-col :span="24">机构地址: {{nodeData.data.orgAddr}}</a-col>
                 </a-row>
              </a-col>
        </a-row>
        <a-button slot="extra" type="primary" @click="uploadvisible=true">上传机构</a-button>
      </a-card>
      <a-modal v-model="uploadvisible" title="上传机构" :width="800" @ok="uploadvisible=false">
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
                      @change="handlefileChange"
                    >
                    <a-button> <a-icon type="upload" /> 上传文件 </a-button>
                </a-upload>
           </a-col>
        </a-row>
    </a-modal>

      <!-- 新增、修改、删除 -->
       <a-modal :title="handleName"  v-model="visible"     :width="800" @ok="handleSubmit">
            <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-form-item label="机构代码">
                    <a-input v-decorator="['orgCode', { rules: [{ required: true, message: '请必须输入机构代码' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="机构名称">
                    <a-input v-decorator="['orgName', { rules: [{ required: true, message: '请必须输入机构名称' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="上层机构">
                    <a-input disabled v-decorator="['parentName', { rules: [{ required: false, message: '请必须输入机构名称' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="机构层级" disabled>
                    <a-input v-decorator="['orgLevel' , { rules: [{ required: false, message: '请输入机构层级' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="机构类型">
                    <a-input v-decorator="['orgType' , { rules: [{ required: false, message: '请输入机构类型' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="机构状态" >
                     <a-select   v-decorator="['orgStatus', { rules: [{ required: true, message: '请选择机构状态' }] },]"
                                    placeholder="请选择机构类型" @change="handleSelectChange">
                                      <a-select-option   v-for="item in orgStatusList" :key="item.value"   :value="item.label">
                                        {{item.value}}
                                      </a-select-option>
                              </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="地域层级" >
                     <a-select   v-decorator="['orgAddrType', { rules: [{ required: true, message: '请选择机构地域层级' }] },]"
                                    placeholder="请选择机构地域层级" @change="handleChange">
                                      <a-select-option   v-for="item in orgAddrTypeList" :key="item.value"   :value="item.label">
                                        {{item.value}}
                                      </a-select-option>
                              </a-select>
                  </a-form-item>
                </a-col>
                 <a-col :span="12">
                  <a-form-item label="通讯地址">
                    <a-input v-decorator="['orgAddr' , { rules: [{ required: false, message: '请输入通讯地址' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" v-show="false">
                  <a-form-item label="机构父级">
                    <a-input v-decorator="['parent' , { rules: [{ required: false, message: '机构父级' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" v-show="false">
                  <a-form-item label="id">
                    <a-input v-decorator="['id' , { rules: [{ required: false, message: 'id' }] }]" />
                  </a-form-item>
                </a-col>
              </a-row>
             </a-form>
        </a-modal>
  </div>
</template>
<script>
import vTree from 'Components/tree'
import http from 'Common/http'
import { getEnumArray } from 'Common/utils'
import { orgStatus, orgAddrType } from 'Common/enum'
const BASE_API = process.env.BASE_API
const resquest = 'api'
export default {
  name: 'Home',
  data () {
    return {
      headers: {
        authorization: 'authorization-text'
      },
      clickInfo: false,
      ExpandAll: false,
      orgStatusList: [], // 机构状态
      orgAddrTypeList: [], // 机构地域层级
      menurightShow: false,
      visible: false, // 新增弹框
      isupdate: false, // 修改or新增
      nodeData: {}, // 左击、右击内容保存
      handleName: '',
      uploadvisible: false, // 上传
      menuList: [
            {label: '新增子组织', value: 'add'}
      ],
      treeData: [],
      menuStyle: {},
      tmpStyle: {},
      menuVisible: false,
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  methods: {
    // 查询机构
     getorgList(parms) {
      const dataItem = {
            'page': {
                'current': 1,
                'size': 9999
            },
            'condition': [{
                'logic': 'AND',
                'queryList': [
                      {
                          'logic': 'AND',
                          'operator': 'IS_NULL',
                          'params': ['parent', true]
                      }
                ]
           }]
          };
           http.post(BASE_API + resquest + '/orgs/page', dataItem).then(res => {
              if (res.status === 200) {
                  res.data.records[0].isLeaf = false;
                  res.data.records[0].title = res.data.records[0].orgName;
                  this.treeData = res.data.records;
              }
          }).catch(err => console.log(err));
    },
    // 查询子机构
    queryChildNode(item) {
        const dataItem = {
            'page': {
                'current': 1,
                'size': 999
            },
            'condition': [{
                'logic': 'AND',
                'queryList': [
                      {
                          'logic': 'AND',
                          'operator': 'EQ',
                          'params': ['parent', item.orgCode]
                      }
                ]
           }]
          };
           http.post(BASE_API + resquest + '/orgs/page', dataItem).then(res => {
              if (res.status === 200) {
                res.data.records.forEach((item) => {
                    item['title'] = item.orgName;
                    item.isLeaf = false
                })
                this.$set(item, 'children', res.data.records)
              }
          }).catch(err => console.log(err));
    },
    // 按需加载请求树
    onLoadData(treeNode) {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          this.queryChildNode(treeNode.dataRef)
          this.treeData = [...this.treeData];
          resolve();
        }, 1000);
      });
    },
      // 左键点击事件
    onSelect (selectedKeys, node) {
      this.menuVisible = false // 关闭右击按钮弹框
      this.clickInfo = true; // 打开右侧详情内容
      const nodeitem = {
          parent: node.node.$parent.dataRef,
          data: node.node.dataRef// 绑定数据
      };
      this.nodeData = nodeitem; // 当前点击内容
      console.log(this.nodeData)
      if (!nodeitem.data.parent) {
        this.menuList = [
          {label: '新增子机构', value: 'addorgChild'},
          {label: '修改机构', value: 'editOrg'}
       ]
      } else {
          this.menuList = [
            {label: '新增子机构', value: 'addorgChild'},
            {label: '修改机构', value: 'editchildOrg'},
            {label: '删除机构', value: 'delorg'}
          ]
      }
    },
    // 右键点击事件
    onRightClick ({ event, node }) {
      // this.menuVisible = true
      // this.menurightShow = true
      const x = event.currentTarget.offsetLeft + event.currentTarget.clientWidth
      const y = event.currentTarget.offsetTop
      this.menuStyle = {
        position: 'absolute',
        maxHeight: 40,
        textAlign: 'center',
        left: `${x + -0}px`,
        top: `${y + 6 - 0}px`,
        zIndex: 9999
      }
      this.nodeData = { // 右击的按钮保存
        parent: node.$parent.dataRef,
        data: node.dataRef
      }
    },
    // 右键操作按钮事件
    menuItemClick (item) {
      const dataitem = {
        data: this.nodeData,
        key: item
      }
      this.menuVisible = false
      switch (dataitem.key) {
        case 'editOrg':
          // 修改跟机构
          this.editorg(dataitem)
          break;
        case 'addorgChild':
          // 新增子机构
          this.addchildOrg(dataitem)
          break;
        case 'editchildOrg':
          // 修改子机构
          this.editchildOrg(dataitem)
          break;
        case 'delorg':
          // 删除机构
          this.delorg(dataitem)
          break;
      }
    },
    // 修改机构
    editorg(item) {
      this.handleName = '修改机构';
      this.visible = true
      this.isupdate = true; // 修改
      this.form.resetFields();
      setTimeout(() => {
          this.form.setFieldsValue(item.data.data)
       });
    },
    // 新增子机构
    addchildOrg(item) {
        this.handleName = '新增子机构';
        this.visible = true
        this.isupdate = false; // 新增
        this.form.resetFields();
        setTimeout(() => {
          this.form.setFieldsValue({
              parentName: item.data.data.orgName,
              parent: item.data.data.orgCode // 上级机构code
          })
        });
    },
    // 修改子机构
    editchildOrg(item) {
      this.handleName = '修改机构';
      this.visible = true;
      this.isupdate = true; // 修改
      const itemObj = item.data.data;
      itemObj['parentName'] = item.data.parent.orgName
      setTimeout(() => {
          this.form.setFieldsValue(itemObj)
       });
    },
    // 删除机构
    delorg(item) {
        this.$confirm({
        title: '确定要删除（' + item.data.data.orgName + '）机构吗？ 删除机构将会删除下面的所有机构,请谨慎操作!!!',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
            http.delete(BASE_API + resquest + '/orgs/' + item.data.data.id).then(res => {
                      if (res.status === 200) {
                      this.$message.success('删除机构成功')
                    }
                  }).catch(err => console.log(err));
        }
      })
    },
     // 提交or弹框关闭
    handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                  if (!this.isupdate) {
                    console.log(values)
                     // 新增逻辑
                      http.post(BASE_API + resquest + '/orgs', values).then(res => {
                        if (res.status === 200) {
                          this.$message.success('新增机构成功')
                          this.visible = false;
                          this.getorgList();
                        }
                     }).catch(err => console.log(err));
                  } else { // 修改逻辑
                    http.put(BASE_API + resquest + '/orgs', values).then(res => {
                      if (res.status === 200) {
                      this.$message.success('修改机构成功')
                       this.visible = false;
                      // this.getorgList();
                    }
                  }).catch(err => console.log(err));
                }
            }
      });
    },
    handleSelectChange (value) {
      this.form.setFieldsValue({
        orgStatus: value
      })
    },
    handleChange (value) {
      this.form.setFieldsValue({
        orgAddrType: value
      })
    },
    // 展开事件
    onExpand (expandedKeys, {expanded: bool, node}) {
       if (!bool) {
         this.clickInfo = false
       } else {
         this.clickInfo = true
       }
    },
      // 下载模板
    down() {
          const link = document.createElement('a')
          link.setAttribute('download', '机构.xlsx') // 下载的文件名
          link.href = BASE_API + '/static/jgbdr.xlsx' // 文件url
          link.click()
    },
    // 上传接口，还需要在调整
    handlefileChange(info) {
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
      vTree
  },
  created: function () {
      this.getorgList();
      this.orgStatusList = getEnumArray(orgStatus)
      this.orgAddrTypeList = getEnumArray(orgAddrType)
  }
}

</script>
<style scoped>
    .card-box {
       position: static;
  }
    .ant-menu-item-selected {
      background:transparent !important;
      color: rgba(0, 0, 0, 0.65) !important;
    }
    .colstyle {
      margin: 20px 0px;
      color: 24px;
    }
</style>
