<!--
 * @Author: 汪波
 * @Date: 2020-11-12 11:08:17
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-26 11:16:36
 * @Description: 表格控件
-->
<template>
  <div>
    <div class="box">
      <a-table :columns="headercolumns" :pagination="pagination" :bordered="isbordered" :row-selection="rowSelects?rowSelection:undefined" :customRow="customClick" :data-source="datalist">
        <!--表格a标签跳转内容-->
        <span slot="inlineButton" slot-scope="record">
          <a @click="inlineClick($event, record)">{{record}}</a>
        </span>
        <!--表格tags图标展示-->
        <span slot="tags" slot-scope="tags">
          <a-tag v-for="tag in tags" :key="tag.key" :color="tag.color">{{tag.key}}</a-tag>
        </span>

        <!--icon图标-->
        <span slot="icon" slot-scope="iconlist">
          <a-icon v-for="icon in iconlist" :key="icon" :type="icon" />
        </span>
        <!-- 步骤条 -->
        <span slot="speed" slot-scope="speend, record">
          <span v-for="(item, index) in speedList" :key="index">
            <a-tag
              class="speedTag"
              @click="step(item.status, record)"
              type="primary"
              :style="{'cursor': item.status === speend? 'pointer': 'normal'}"
              :color="item.status == speend? '#53a93f': ''"
            >{{item.value}}</a-tag>
            <a-icon
              @click="stepnext(item.status, record)"
              :style="{'cursor': item.status === speend? 'pointer': 'normal', 'color':item.status == speend? '#53a93f': ''}"
              v-if="speedList.length - 1 !== index"
              class="speedIcon"
              type="right-circle"
            />
          </span>
        </span>

        <!--图片-->
        <span slot="img" slot-scope="imgObjList">
          <img :style="img.style" v-for="img in imgObjList" :key="img.key" :src="img.key" />
        </span>
        <!--操作栏按钮-->
        <span slot="exre" slot-scope="record, indexitem">
          <!-- 权限按钮 -->
          <span v-if="indexitem.button">
            <a-button
              class="button"
              v-for="(item, index) in indexitem.button"
              :key="index"
              type="primary"
              v-bind:style="{ background: item.color, margin: '2px 10px' }"
              @click="buttonClick($event, item.key, record,indexitem)"
            >{{item.value}}</a-button>
          </span>

          <!-- 统一按钮层 -->
          <span v-if="!indexitem.button">
            <a-icon class="button-icon" v-for="(item, index) in buttonList" :key="index" :type="item.value" theme="twoTone" :two-tone-color="item.color" />
          </span>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>

export default {
  props: ['datalist', 'headercolumns', 'buttonList', 'pageItem', 'isbordered', 'rowSelect', 'speedList'],
  data () {
    return {
      pagination: {
        pageSize: 10,
        current: this.pageItem.current,
        total: this.pageItem.total,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条数据`,
        onChange: (page) => {
          this.$emit('pagechange', page)
        }
      },
      rowSelects: false
    }
  },
  methods: {
    // 操作栏按钮方法暴露出去
    buttonClick ($event, key, record, item) {
      $event.stopPropagation()
      const dataItem = {
        key: key,
        item: item
      }
      this.$emit('buttonClick', dataItem)
    },
    // 行内操作方法，暴露出去
    inlineClick ($event, item) {
      $event.stopPropagation()
      this.$emit('inlineClick', item)
    },
    // 各种事件相应，先注释，目前来说用不到
    customClick (record) {
      return {
        on: {
          click: () => {
            this.$emit('rowClick', record)
          }
        }
      }
    },
    // 步骤
    step (status, item) {
      if (item.classStatus === status) {
        this.$emit('stepClick', item)
      }
    },
    // 下一步
    stepnext (status, item) {
      if (item.classStatus === status) {
        this.$emit('stepNext', item)
      }
    }
  },
  mounted: function () {

  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.$emit('selectChange', selectedRows) // 暴露出去
        }
      }
    }
  },
  updated: function () {
    this.pagination.total = this.pageItem.total;
    this.pagination.current = this.pageItem.current;
  },
  created () {
    // 默认给false，传true，才显示checkbox
    if (this.rowSelect) {
      this.rowSelects = this.rowSelect
    }
  }

}
</script>

<style scoped>
.button-icon {
  width: 26px;
  height: 26px;
  line-height: 26px;
}
.speedTag {
  margin-top: 3px;
  margin-bottom: 3px;
}
.speedIcon {
  margin-right: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 18px;
  vertical-align: middle;
}
</style>
