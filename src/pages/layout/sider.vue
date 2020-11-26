<!--
 * @Author: 郭德纲
 * @Date: 2020-11-12 11:09:14
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-19 10:16:42
 * @Description: file content
-->
<template>
  <a-layout-sider width="200" class="sider">
    <a-menu mode="inline" @select="selectMenu">
      <template v-for="item in menus">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { setRouter, getMenu } from 'Common/utils'
import { Menu } from 'ant-design-vue';
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail" /><span>{{ menuInfo.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon type="pie-chart" />
            <span>{{ item.title }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.key" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
export default {
  name: 'sider',
  components: {
    'sub-menu': SubMenu
  },
  data () {
    console.log(getMenu());
    return {
      menus: getMenu()
    }
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    selectMenu (event) {
      const arr = []
      for (let index = 0; index < this.menus.length; index++) {
        const element = this.menus[index];
        if (element.isend) {
          if (element.key === event.key) {
            arr.push({ key: element.key, title: element.title })
            break;
          }
        } else {
          for (let i = 0; i < element.children.length; i++) {
            const elementChild = element.children[i];
            if (elementChild.key === event.key) {
              arr.push({ key: elementChild.key, title: elementChild.title })
              break;
            }
          }
        }
      }
      setRouter(arr).then(res => {
        this.$eventHub.$emit('changeRouter', event.key)
        this.$router.push('/' + event.key)
      });
    }
  }
}

</script>
<style scoped lang="less">
.sider {
  overflow: auto;
  left: 0;
  position: fixed;
  height: 95vh;
  background: @colorf;
  padding-top: 20px;
  border-right: 1px solid @colorf4;
}
.sider::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.sider::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background-color: #d9d9d9;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
.sider::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #f0f2f5;
}
.last-li {
  margin-bottom: 20px;
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border: 0 !important;
}
</style>
