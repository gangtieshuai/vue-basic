<!--
 * @Author: 汪波
 * @Date: 2020-11-12 11:08:17
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-19 15:14:11
 * @Description: 通用增删改查组件
-->
<template>
  <div class="box">
    <div class="query">
      <a-card class="card-div" :bordered="false">
          <v-query :okText="okText" :headerDate="headerDate" :isLoading="isLoading"
              @getQuery="getQuery" @reset="resetQuery"></v-query>
      </a-card>
    </div>
    <div class="table">
      <a-card class="card-div" :bordered="false">
        <div class="setting">
          <a-button v-for="(item, index) in settingList" :style="item.style" :key="index" @click="setttingClick(item.value)" type="primary" :icon="item.icon">{{item.name}}</a-button>
        </div>
          <v-table  :datalist="datalist" :headercolumns="headercolumns" :speedList="speedList" :isbordered="isbordered" :buttonList="buttonList" :rowSelect="rowSelect" :pageItem="pageItem"
                          @buttonClick="buttonClick"  @pagechange="pagechange"  @inlineClick="inlineClick" @stepClick="stepClick" @stepNext="stepNext">
          </v-table>
      </a-card>
    </div>
  </div>
</template>
<script>
import vQuery from 'Components/query'
import vTable from 'Components/table'
export default {
  props: ['headerDate', 'okText', 'isLoading', 'datalist', 'headercolumns', 'speedList', 'buttonList', 'pageItem', 'isbordered', 'rowSelect', 'settingList'],
  data () {
    return {
    }
  },
  methods: {
    getQuery($event) {
      this.$emit('getQuery', $event)
    },
    resetQuery($event) {
        this.$emit('reset')
    },
    // 列表组件方法
    // table前置按钮方法
    setttingClick (item) {
      this.$emit('setttingClick', item)
    },
    // 操作栏按钮方法暴露出去
    buttonClick ($event) {
      this.$emit('buttonClick', $event)
    },
    // 行内操作方法，暴露出去
    inlineClick ($event) {
      this.$emit('inlineClick', $event)
    },
    pagechange($event) {
       this.$emit('pagechange', $event)
    },
    // 各种事件相应，先注释，目前来说用不到
    customClick (record) {
      return {
        on: {
          click: () => {
            this.recordInfo = record // 先自我留用
            this.$emit('rowClick', record)
          }
        }
      }
    },
    stepClick($event) {
      this.$emit('stepClick', $event)
    },
    stepNext($event) {
        this.$emit('stepNext', $event)
    }
  },
  created () {
  },
  updated: function() {
  },
  computed: {
  },
  components: {
      vQuery,
      vTable
  }
}

</script>

<style scoped lang="less">
/* 万能查询样式定义*/
.query {
  margin: 0 0 20px 0;
}
.divBorder {
  border: 1px dashed gainsboro;
  padding: 10px 0;
  padding-top: 14px !important;
  margin-bottom: 10px;
  border-radius: 5px;
}
.tagsbutton {
  margin-bottom: 10px;
}
.divMargin {
  margin: 0 10px;
  position: relative;
}
.divMarginLeft {
  margin: 0 20px 0 0;
}
.divBottom {
  margin-bottom: 12px;
}
.divIcon {
  margin-right: 5px;
  cursor: pointer;
}
.divIcon:hover {
  color: #108ee9;
}
.divIconRed:hover {
  color: red;
}
.divPad {
  padding: 0 !important;
  text-align: center;
  position: relative;
  top: 6px !important;
}
.iconS {
  position: absolute;
  right: -6px;
  top: -8px;
  z-index: 99;
}
.iconP {
  left: 85%;
}

.iconQ {
  left: 87%;
}
.iconDiv {
  width: 100%;
  position: relative;
}

button {
  margin-right: 1%;
}

.buttons {
  border-radius: 25px;
}

/*table按钮样式*/
.setting {
  display: flex;
  margin-bottom: 15px;
}
.button-div {
  padding: 0 !important;
  .button-div-botton {
    margin: 0 0 0 10px;
    float: right;
  }
}
.card-div {
  border-radius: 10px;
}
.addIcon {
  margin: 0 10px !important;
}
.list-complete-item {
  transition: all 1s;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
