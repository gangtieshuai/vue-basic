<!--
 * @Author: 郭德纲
 * @Date: 2020-11-12 11:09:02
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-24 10:23:17
 * @Description: file content
-->
<template>
  <a-layout-header class="header">
    <div class="logo">
      <div>Logo</div>
    </div>
    <router-link class="link" v-for="(item,i) in menus" :key="item.key" :to="item.key" exact-active-class="active">
      <span @mouseover="item.isshow = true" @mouseleave="item.isshow = false">
        {{item.title}}&nbsp;
        <a-icon class="closeIcon" @click.prevent="doSomething($event)" v-if="item['isshow']" @click="closeMenu(i)" type="close" />
      </span>
    </router-link>

    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <a-avatar class="ant-dropdown-avatar">{{username.substr(0, 1)}}</a-avatar>
        {{username}}
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;" @click="selectMenu({key:'personalCenter'})">个人中心</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">个人设置</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="logout()">退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <div class="bell-div">
      <a-badge :count="99" :overflow-count="10">
        <a-avatar class="ant-dropdown-avatar">
          <a-icon type="bell" @click="selectMenu({key:'message'})" />
        </a-avatar>
      </a-badge>
    </div>
  </a-layout-header>
</template>

<script>
import { getAuth, delAuth, getRouter, setRouter } from 'Common/utils'
export default {
  name: 'Header',
  data () {
    const userinfo = getAuth();
    return {
      username: userinfo.name,
      menus: getRouter() ? getRouter().map(i => { i['isshow'] = false; return i }) : [],
      selectKey: ''
    }
  },
  created () {
    this.$eventHub.$on('changeRouter', (res) => {
      this.menus = getRouter() ? getRouter().map((i, j) => {
        i['isshow'] = false;
        if (i.key === res && j) {
          this.selectKey = j;
        }
        return i;
      }) : []
    })
  },
  beforeMount: function () {
    // console.log(username);
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    logout () {
      this.$confirm({
        title: '确定退出登录吗?',
        content: '',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          await delAuth();
          this.$router.push('/login')
        }
      });
    },
    selectMenu (event) {
      this.$router.push('/' + event.key)
    },
    doSomething (enent) {
      console.log(event);
    },
    closeMenu (event) {
      const obj = this.menus[event];
      this.menus.splice(event, 1);
      setRouter(this.menus, true).then(res => {
        const current = this.$router.history.current.fullPath;
        if (current && current.substr(1, current.length - 1) === obj.key) {
          console.log(this.menus);
          this.$router.push('/' + this.menus[this.menus.length - 1].key)
        }
      });
    }
  },
  destroyed () {
    // this.$eventHub.$off('changeRouter')
  }
}

</script>
<style scoped lang="less">
#components-layout-demo-top-side-2 .logo {
  width: 200px;
  height: 100%;
  float: left;
  padding: 12px 0;
  margin-right: 24px;
  div {
    height: 100%;
    width: 100%;
    border-right: 1px solid #f0f0f0;
    font-size: 26px;
    text-align: center;
    line-height: 33px;
    font-weight: bold;
    color: #1890ff;
    font-family: auto;
  }
}
.header {
  height: 64px;
  line-height: 64px;
  box-shadow: 0 2px 8px #f0f1f2;
  background: @colorf;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
  padding: 0 5% 0 0;
}
.ant-dropdown-link {
  float: right;
  color: @primary-color;
}
.closeIcon {
  position: absolute;
  top: 50%;
  margin-top: -7px;
}
.link {
  height: 100%;
  display: inline-block;
  width: 100px;
  text-align: center;
  color: @colorbf;
}
.active {
  color: @primary-color;
  border-bottom: 3px solid;
}
.bell-div {
  float: right;
  margin-right: 26px;
}
</style>
