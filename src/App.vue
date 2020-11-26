<!--
 * @Author: 郭德纲
 * @Date: 2020-11-05 11:46:21
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 10:05:09
 * @FilePath: \ccb-web\src\App.vue
 * @Description: file content
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {
  DatePicker, Row, Col, Form, Input, Checkbox, Button, Icon, message, Layout, Menu,
  Breadcrumb, Table, Tree, Select, Card, Popover, Dropdown, Tag, Modal, Avatar, Result,
  Rate, Upload, List, Collapse, Badge, Divider, Statistic, Tabs
} from 'ant-design-vue'
Vue.use(DatePicker)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Breadcrumb)
Vue.use(message)
Vue.use(Table)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Card)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(Tag)
Vue.use(Modal)
Vue.use(Avatar)
Vue.use(Result)
Vue.use(Rate)
Vue.use(Upload)
Vue.use(List)
Vue.use(Collapse)
Vue.use(Badge)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(Statistic)
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$message = message;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
export default {
  name: 'App',
  data () {
    return {
      locale: zhCN,
      eventHub: new Vue()
    }
  }
}
</script>

<style>
body {
  margin: 0;
  width: 100% !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
