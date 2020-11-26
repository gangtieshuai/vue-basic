<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-18 09:55:03
 * @Description: 专题消息
-->
<template>
  <div>
      <a-card :title="'专题列表'"  class="box">
            <a-button type="primary"   @click='add'>新增专题</a-button>
              <a-collapse style="margin-top:20px" v-model="activeKey" accordion :bordered="false" >
                  <a-collapse-panel v-for="item in dataList" :key="item.key" :showArrow="true"   :header="item.themeName">
                      <div v-if="item.children">
                        <a-tag
                        closable
                        @close="handleClose($event, tag)"
                        @click="handleEdit(tag)"
                        class="tags"
                        style="margin: 5px 2px"
                        color="#2db7f5"
                        v-for="tag in item.children"
                        :key="tag.id"
                       >
                          {{tag.themeName}}
                      </a-tag>
                      <a-tag color="#87d068" class="tags" @click="addchild(item)">添加</a-tag>
                      </div>
                      <span slot="extra">
                          <a-icon style="margin-right:5px"  type="edit" @click="edit($event, item)"/>
                          <a-icon  type="minus-square" @click="delItem($event, item)" />
                        </span>
                  </a-collapse-panel>
             </a-collapse>
      </a-card>
      <a-modal v-model="visible"  :title="modelTitle"   :width="800" @ok="handleSubmit">
            <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-form-item label="专题名">
                    <a-input v-decorator="['themeName', { rules: [{ required: true, message: '请必须输入专题名' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                   <a-form-item label="上级专题" v-if="isChild">
                    <a-input disabled v-decorator="['parentName', { rules: [{ required: false, message: '请必须上级专题' }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12" v-show="false">
                   <a-form-item label="上级专题id" >
                    <a-input disabled v-decorator="['parent', { rules: [{ required: false, message: '请必须专题id' }] }]" />
                  </a-form-item>
                </a-col>
              </a-row>
             </a-form>
      </a-modal>
  </div>
</template>
<script>

import http from 'Common/http'
const BASE_API = process.env.BASE_API
const resquest = 'api'
export default {
  name: 'Home',
  data () {
    return {
      dataList: [],
      activeKey: [],
      activeItem: {},
      activeeditItem: {}, // 修改的逻辑
      isEmptyArray: false, // 是不是空数组
      visible: false,
      isChild: false, // 是不是操作z子专题
      modelTitle: '新增专题',
      isupdate: false, // 是不是修改,默认不是
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  methods: {
    // 获取所有一级专题
    getThemeList(parms) {
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
                          'operator': 'IS_NULL',
                          'params': ['parent', true]
                      }
                ]
           }]
          };
           http.post(BASE_API + resquest + '/themes/page', dataItem).then(res => {
              if (res.status === 200) {
                      this.dataList = res.data.records
              }
          }).catch(err => console.log(err));
    },
    // 查询子专题
    querychildTheme(id) {
        // 重新查询id是父节点下面的子节点
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
                          'params': ['parent', id]
                      }
                ]
           }]
          };
           http.post(BASE_API + resquest + '/themes/page', dataItem).then(res => {
              if (res.status === 200) {
                   // 重新去赋值，子节点即可, 可能需要先清空一下
                    this.activeItem.children = [];
                    this.activeItem.children = res.data.records;
                    this.$forceUpdate(); // 强制更新
              }
          }).catch(err => console.log(err));
    },
    // 删除一整行
    delItem($event, item) {
       $event.stopPropagation(); // 禁止冒泡
       this.$confirm({
        title: '确定要专题吗？删除此专题,会删除专题下所有子专题!',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          // 模拟删除接口
           http.delete(BASE_API + resquest + '/themes/' + item.id).then(res => {
                      if (res.status === 200) {
                        this.$message.success('删除专题成功')
                        this.getThemeList(); // 重新查询
                      }
                  }).catch(err => console.log(err));
        }
       })
    },
    // 新增一级专题
    add() {
        this.modelTitle = '新增专题';
        this.visible = true;
        this.isChild = false;
        this.isupdate = false; // 新增
        this.form.resetFields() // 重置方法
        this.form.setFieldsValue({
            parentName: '',
            parent: null
        })
    },
    edit($event, item) {
        $event.stopPropagation(); // 禁止冒泡
        this.modelTitle = '修改专题';
        this.visible = true;
        this.isChild = false;
        this.isupdate = true; // 修改
        this.activeeditItem = item;
        setTimeout(() => {
          this.form.setFieldsValue({
            themeName: item.themeName,
            parent: null
          })
        })
    },
    // 新增子专题
    addchild(item) {
      this.modelTitle = '新增子专题';
      this.visible = true;
      this.isChild = true;
      this.isupdate = false; // 新增
      this.form.resetFields() // 重置方法
      this.activeItem = item;
      setTimeout(() => {
         this.form.setFieldsValue({
            parent: item.id,
            parentName: item.themeName
        })
      })
    },
    // 修改子专题
    handleEdit(item) {
        this.modelTitle = '修改子专题';
        this.visible = true;
        this.isupdate = true; // 修改
        this.isChild = true; // 是自传体
        this.activeeditItem = item;
         setTimeout(() => {
         this.form.setFieldsValue({
            themeName: item.themeName,
            parentName: this.activeItem.themeName,
            parent: item.parent
        })
      })
    },
    // 删除子专题方法
    handleClose($event, item) {
        $event.preventDefault();
        this.$confirm({
        title: '确定要专题吗',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
              http.delete(BASE_API + resquest + '/themes/' + item.id).then(res => {
                      if (res.status === 200) {
                        this.$message.success('删除专题成功')
                        this.querychildTheme(item.parent); // 重新查询id下的子接口
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
                     // 新增逻辑
                    http.post(BASE_API + resquest + '/themes', values).then(res => {
                      if (res.status === 200) {
                            if (this.isChild) {
                                  this.querychildTheme(this.activeItem.id)
                            } else {
                                 this.getThemeList()
                            }
                              this.$message.success('新增专题成功')
                              this.visible = false;
                      }
                    }).catch(err => console.log(err));
                    // 重新查询子节点即可
                  } else { // 修改逻辑
                    values.id = this.activeeditItem.id; // 修改的id
                    http.put(BASE_API + resquest + '/themes', values).then(res => {
                        if (res.status === 200) {
                          if (this.isChild) {
                                this.querychildTheme(this.activeItem.id)
                          } else {
                               this.getThemeList()
                          }
                          this.$message.success('修改专题成功')
                          this.visible = false;
                        }
                    }).catch(err => console.log(err));
                }
            }
      });
    }
  },
  watch: {
    activeKey(key) {
      if (key) {
          this.activeItem = this.dataList[key];
          this.querychildTheme(this.dataList[key].id)
      }
    }
  },
  components: {

  },
  created: function () {
      this.getThemeList();
  }
}

</script>
<style scoped>
  .tags {
    cursor: pointer;
  }
  .box {
    padding: 24px
  }
</style>
