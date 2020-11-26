<!--
 * @Author: 郭德纲
 * @Date: 2020-11-12 11:08:17
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 10:21:13
 * @Description: file content
-->

<template>
  <div>
    <a-layout id="components-layout-demo-top-side-2">
      <Header />
      <a-layout class="body">
        <Sider />
        <a-layout class="layout">
          <Breadcrumb :breaditem="breadcrumbs"></Breadcrumb>
          <a-layout-content class="content">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
      <p class="footer">ccb@1.0.0</p>
    </a-layout>
  </div>
</template>

<script>
import { getUserinfo } from 'Common/api'
import Header from './header'
import Sider from './sider'
import Breadcrumb from '../../components/breadcrumb'
export default {
  name: 'Default',
  components: {
    Header,
    Sider,
    Breadcrumb
  },
  data () {
    return {
      breadcrumbs: {
        numtitle: '应用管理',
        icon: 'user',
        url: 'common',
        isshow: false
      }
    }
  },
  methods: {},

  beforeMount: function () {
    getUserinfo().then(res => {
      console.log(res)
    }).catch(err => console.log(err))
  }
}

</script>
<style scoped lang="less">
.content {
  /* background: '#fff', padding: '24px', margin: 0, minHeight: '280px' */
  // background: @colorf;
  // padding: 24px;
}
.body {
  position: relative;
  margin-top: 64px;
}
.layout {
  padding: 0 24px 24px;
  margin-left: 200px;
  height: 90vh;
  background-color: @colorf4;
}
.footer {
  text-align: center;
  margin-left: 200px;
  background-color: @colorf4;
  color: #bfbfbf;
  line-height: 24px;
}
</style>
