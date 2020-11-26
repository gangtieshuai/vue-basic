<!--
 * @Author: 汪波
 * @Date: 2020-11-12 11:08:17
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-12 11:44:13
 * @Description: 树控件
-->

<template>
    <div>
            <a-tree
                    v-if="treeData.length>0"
                    :treeData="treeData"
                    :showLine="false"
                    show-icon
                    @expand="onExpand"
                    :defaultExpandAll="ExpandAll"
                    @select="this.onSelect"
                    @rightClick="this.onRightClick">
                    <template slot="custom" slot-scope="{  icon }">
                         <a-icon :type="icon" />
                    </template>
            </a-tree>
            <a-menu :style="menuStyle" v-show="menuVisible &&  menurightShow" ref='menubox' >
                        <a-menu-item id="menuItemClick" v-for="(item, index) in menuList" :key="index"  @click="menuItemClick(item.value)">{{item.label}}</a-menu-item>
            </a-menu>
    </div>

</template>

<script>

export default {
  props: ['menuList', 'menurightShow', 'treeFlatData', 'ExpandAll'],
  data () {
    return {
      nodeId: 0,
      tmpStyle: {},
      menuVisible: false,
      menuStyle: {},
      nodeitem: {}, // 具体选中数据
      treeData: [] // 数原始数据
    }
  },
  methods: {
    // 左键点击事件
    onSelect (selectedKeys, node) {
      this.menuVisible = false // 关闭右击按钮弹框
      const nodeitem = {
        parent: node.node.$parent.dataRef,
        data: node.node.dataRef// 绑定数据
      }
      this.$emit('treeClick', nodeitem) // 暴露出去
    },
    // 右键点击事件
    onRightClick ({ event, node }) {
      this.menuVisible = true
      const x = event.currentTarget.offsetLeft + event.currentTarget.clientWidth
      const y = event.currentTarget.offsetTop
      this.menuStyle = {
        position: 'absolute',
        maxHeight: 40,
        textAlign: 'center',
        left: `${x + 10 - 0}px`,
        top: `${y + 6 - 0}px`,
        zIndex: 9999
      }
      this.nodeitem = {
        parent: node.$parent.dataRef,
        data: node.dataRef
      } // 绑定数据
      this.$emit('treeRightClick', this.nodeitem) // 暴露出去
    },
    // 右键操作按钮事件
    menuItemClick (item) {
      const dataitem = {
        data: this.nodeitem,
        key: item
      }
      this.menuVisible = false
      this.$emit('rightMenuClick', dataitem) // 暴露出去
    },
    // 因为后台查询回来给的是扁平化结构，因此自己组装树
    convert (rows) {
      if (rows) {
        const node = []
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i]
          if (!this.exists(rows, row.pid)) {
            row.key = row.treenodeid
            node.push(row)
          }
        }
        const toDo = []
        for (let i = 0; i < node.length; i++) {
          toDo.push(node[i])
        }

        while (toDo.length) {
          const node = toDo.shift()
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i]
            if (row.pid === node.key) {
              // const child = {key: row.treenodeid, title: row.title, icon: row.icon}; // 根据传的值在拼进去, 先这样,到时候替换下面的就可以
              row['key'] = row.treenodeid
              if (node.children) {
                node.children.push(row)
              } else {
                node.children = [row]
              }
              toDo.push(row)
            }
          }
        }
        return node
      }
    },
    // 递归组装树
    exists (rows, parentId) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].treenodeid === parentId) {
          return true
        }
      }
      return false
    },
    // 展开事件
    onExpand (expandedKeys, {expanded: bool, node}) {
      node.dataRef['isexpand'] = bool // 展开还是折叠
      this.$emit('expand', node.dataRef) // 暴露出去
    }
  },
  created () {
    if (this.treeFlatData) { // 存在平铺的数据，那就要拼接成树需要的数据,不存在，就可以直接传递成型的数组
      const treeflagData = this.treeFlatData.map(item => {
        item['scopedSlots'] = {
          icon: 'custom'
        }
        return { title: item.orgName, treenodeid: item.orgCode, pid: item.parent, icon: 'menu-unfold', ...item }
      })
      this.treeData = this.convert(treeflagData)
    }
  },
  watch: {
      treeFlatData: {
         handler: function (newval, oldval) {
           if (newval.length > 0) {
              const treeflagData = newval.map(item => {
                  item['scopedSlots'] = {
                    icon: 'custom'
                  }
                  return { title: item.orgName, treenodeid: item.orgCode, pid: item.parent, children: [], icon: 'menu-unfold', ...item }
                })
              this.treeData = this.convert(treeflagData);
           }
        }
      }
  },
  mounted () {
    let _this = this
    // 点击其他地方，关闭弹框
    document.onmousedown = function (e) {
      if (e.target.id !== 'menuItemClick') {
        let x = e.clientX
        let y = e.clientY
        let div = _this.$refs.menubox
        let divx1 = div.offsetLeft
        let divy1 = div.offsetTop
        let divx2 = div.offsetLeft + div.offsetWidth
        let divy2 = div.offsetTop + div.offsetHeight
        if (e.button === 0) {
          if (x > divx1 && x < divx2 && y > divy1 && y < divy2) {
            _this.menuVisible = true
          } else {
            _this.menuVisible = false
          }
        } else {
          _this.menuVisible = false
        }
      }
    }
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
</style>
