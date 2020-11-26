<!--
 * @Author: 汪波
 * @Date: 2020-11-12 11:08:17
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-19 11:22:14
 * @Description: 查询控件
-->
<template>
  <div>
     <a-form layout="inline" @submit="getData">
          <a-row type="flex" justify="start" :gutter="24">
            <!--页面内容-->
            <div style="width:100%" v-for="(obj, index) in universal" :key="index">
              <!--以组为单位的连接符-->
              <a-col style="text-align:center" :span="12" v-if="obj.isLogic && index != 0" :offset="6">
                <a-dropdown>
                  <a-button class="tagsbutton" type="dashed">{{ obj.logic.label }}</a-button>
                  <a-menu slot="overlay">
                    <a-menu-item v-for="(s,sindex) in logic" :key="sindex" @click="changeLogic(s,obj)">{{s.label}}</a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-col>
              <!--正式内容拼接-->
              <a-col :span="24" class="divBorder first">
                <a-col :span="2" class="divPad">
                  <a-icon v-if="isShow && index === (universal.length - 1)" class="divIcon" type="plus-circle" @click="objAdd(obj,universal)" />
                  <a-icon v-if="universal.length !== 1" type="minus-circle" class="divIcon divIconRed" @click="objAdd(obj,universal,index)" />
                  第{{index+1}}组
                </a-col>
                <transition-group name="list-complete" tag="p">
                  <a-col
                    style="display:flex"
                    class="flex-1 childFirst divBottom list-complete-item"
                    v-for="(j, jindex) in obj.queryList"
                    :key="jindex.toString()"
                    :span="jindex === 0 ? '10':'12'"
                    :style="{'padding-left': jindex === 0 ? '0' : '12px'}"
                  >
                    <!--组里边条件之间的连接符号, 并且要判断不能是第一个-->
                    <a-dropdown class="divMarginLeft" v-if="j.isLogic && jindex != 0">
                      <a-button type="dashed" class="buttons">{{ j.logic.label }}</a-button>
                      <a-menu slot="overlay">
                        <a-menu-item v-for="(s,sindex) in logic" :key="sindex" @click="changeLogic(s,j,jindex,)">{{s.label}}</a-menu-item>
                      </a-menu>
                    </a-dropdown>
                    <!--字段名，条件名-->
                    <a-select showSearch allowClear v-model="j.field" style="width:100%" @change="ChangeOperator(j,obj)" name="checkStatus" placeholder="搜索条件">
                      <a-select-option v-for="(i, iindex) in obj.field" :key="iindex" :value="i.value">{{i.label}}</a-select-option>
                    </a-select>
                    <!--运算符-->
                    <a-popover class="divMargin" :style="{'width': j.operator.label.length > '2' ? '30%' : '20%'}" placement="top">
                      <a-button>
                        <span>{{j.operator.label}}</span>
                      </a-button>
                      <template slot="content">
                        <a-tag v-for="(tag, tagindex) in j.hotTags" :key="tagindex" @click="handleChange($event,tag,j.hotTags,j)">{{tag.label}}</a-tag>
                      </template>
                    </a-popover>
                    <!--值-->
                    <div class="iconDiv">
                      <!--具体内容-->
                      <a-input
                        v-if="j.type === 'input'"
                        style="width:100%"
                        class="container"
                        v-model="j.value"
                        name="itemName"
                        :placeholder="j.operator.value === 'IN' || j.operator.value === 'NOT_IN' ? '请填写值,以英文逗号分隔':'请填写值'"
                        @mouseover="changeIcon(index,jindex)"
                      />
                      <a-input v-else-if="j.type === 'selectNull'" style="width:100%" class="container" v-model="isNull" :readonly="true" @mouseover="changeIcon(index,jindex)" />
                      <a-select
                        v-else-if="j.type === 'selectIN'"
                        mode="multiple"
                        style="width:100%"
                        class="container"
                        @mouseover="changeIcon(index,jindex)"
                        showSearch
                        allowClear
                        v-model="j.value"
                        :placeholder="'请选择值'"
                      >
                        <a-select-option v-for="(y, yindex) in j.select" :key="yindex" :value="y.value">{{y.name}}</a-select-option>
                      </a-select>
                      <a-select
                        v-else-if="j.type === 'select'"
                        style="width:100%"
                        class="container"
                        @mouseover="changeIcon(index,jindex)"
                        showSearch
                        allowClear
                        v-model="j.value"
                        :placeholder="'请选择值'"
                      >
                        <a-select-option v-for="(y, yindex) in j.select" :key="yindex" :value="y.label">{{y.value}}</a-select-option>
                      </a-select>
                      <a-date-picker v-else-if="j.type === 'date'" style="width:100%" class="container" @mouseover="changeIcon(index,jindex)" v-model="j.value" :placeholder="'请选择时间'" />

                      <a-range-picker v-else-if="j.type === 'dateRange'" style="width:100%" class="container" @mouseover="changeIcon(index,jindex)" v-model="datetime" :format="'yyyy-MM-dd'" />
                      <a-input-group v-else style="width:100%" compact class="container" @mouseover="changeIcon(index,jindex)">
                        <a-input type="number" :placeholder="'最小值'" style="width: 66px; text-align: center;" v-model="j.value" />
                        <a-input type="text" placeholder="~" style="width: 2px; border-left: 0px; pointer-events: none;" />
                        <a-input type="number" placeholder="最大值" style="width: 66px; text-align: center; border-left: 0px;" [(ngModel)]="j.value1" />
                      </a-input-group>
                      <a-icon class="iconS" theme="twoTone" two-tone-color="#f5222d" type="close-circle" v-if="obj.queryList.length > 1 && j.isIcon" @click="delIcon(j,index,jindex)" />
                    </div>
                    <a-button class="divMarginLeft addIcon" v-if="j.isAdd" shape="circle" icon="plus" @click="add(j,obj.queryList)" />
                  </a-col>
                </transition-group>
              </a-col>
            </div>
            <!--按钮-->
            <a-col :span="24" class="button-div">
              <a-button class="button-div-botton" type="primary" shape="round" html-type="submit" :loading="isLoading" size="default">{{okText}}</a-button>
              <a-button class="button-div-botton" size="default" shape="round" @click="reset" style="margin-left:10px">重置</a-button>
            </a-col>
          </a-row>
        </a-form>
  </div>
</template>

<script>

export default {
  props: ['headerDate', 'okText', 'isLoading'], // headerDate 初始化字段 isShow 是否展现头部 okText 按钮名称 isLoading 是否显示loading
  data () {
    return {
      universalStar: [],
      datetime: [],
      stringOperator: [
        { label: '=', value: 'EQ', check: false },
        { label: '!=', value: 'NE', check: false },
        { label: '为空', value: 'IS_NULL', check: false },
        { label: '不为空', value: 'IS_NOT_NULL', check: false },
        { label: '存在', value: 'IN', check: false },
        { label: '不存在', value: 'NOT_IN', check: false },
        { label: '左匹配', value: 'LEFT_LIKE', check: false },
        { label: '右匹配', value: 'RIGHT_LIKE', check: false },
        { label: '匹配', value: 'LIKE', check: false }
      ],
      dateOperator: [
        { label: '=', value: 'EQ', check: false },
        { label: '!=', value: 'NE', check: false },
        { label: '>', value: 'GT', check: false },
        { label: '<', value: 'LT', check: false },
        { label: '>=', value: 'GE', check: false },
        { label: '<=', value: 'LE', check: false },
        { label: '为空', value: 'IS_NULL', check: false },
        { label: '不为空', value: 'IS_NOT_NULL', check: false },
        { label: '介于', value: 'BETWEEN', check: false },
        { label: '不介于', value: 'NOT_BETWEEN', check: false },
        { label: '存在', value: 'IN', check: false },
        { label: '不存在', value: 'NOT_IN', check: false },
        { label: '左匹配', value: 'LEFT_LIKE', check: false },
        { label: '右匹配', value: 'RIGHT_LIKE', check: false },
        { label: '匹配', value: 'LIKE', check: false }
      ],
      rangeOperator: [
        { label: '介于', value: 'BETWEEN', check: false },
        { label: '不介于', value: 'NOT_BETWEEN', check: false },
        { label: '左匹配', value: 'LEFT_LIKE', check: false },
        { label: '右匹配', value: 'RIGHT_LIKE', check: false },
        { label: '匹配', value: 'LIKE', check: false },
        { label: '存在', value: 'IN', check: false },
        { label: '不存在', value: 'NOT_IN', check: false },
        { label: '为空', value: 'IS_NULL', check: false },
        { label: '不为空', value: 'IS_NOT_NULL', check: false }
      ],
      numberOperator: [
        { label: '=', value: 'EQ', check: false },
        { label: '!=', value: 'NE', check: false },
        { label: '>', value: 'GT', check: false },
        { label: '<', value: 'LT', check: false },
        { label: '>=', value: 'GE', check: false },
        { label: '<=', value: 'LE', check: false },
        { label: '为空', value: 'IS_NULL', check: false },
        { label: '不为空', value: 'IS_NOT_NULL', check: false },
        { label: '介于', value: 'BETWEEN', check: false },
        { label: '不介于', value: 'NOT_BETWEEN', check: false },
        { label: '存在', value: 'IN', check: false },
        { label: '不存在', value: 'NOT_IN', check: false },
        { label: '左匹配', value: 'LEFT_LIKE', check: false },
        { label: '右匹配', value: 'RIGHT_LIKE', check: false },
        { label: '匹配', value: 'LIKE', check: false }
      ],
      logic: [{ label: '并且', value: 'AND' }, { label: '或者', value: 'OR' }],
      nullList: [{ label: '是', value: true }, { label: '否', value: false }],
      isNull: '是',
      universal: [
        {
          field: [],
          logic: { label: '并且', value: 'AND' },
          isLogic: true,
          queryList: [
            {
              logic: { label: '并且', value: 'AND' },
              operator: { label: '=', value: 'EQ' },
              field: null,
              value: null,
              value1: null,
              hotTags: [],
              type: 'input',
              select: [],
              isLogic: false,
              isAdd: true,
              isIcon: false,
              filedType: null
            }
          ]
        }
      ],
      isShow: true // 可改成传递，即可进行控制是否可以联动
    }
  },
  methods: {
    // 暴露出去的重置方法
    resetButton () {

    },
    // 父组件调用更新字段条件
    changeInit (headerDate) {
      this.universal.forEach(i => {
        i.field = headerDate
      })
      this.universalStar = this.universal
    },
    //  运算符改变方法
    handleChange (event, tag, hotTags, queryList) {
      if (tag.value === 'BETWEEN' || tag.value === 'NOT_BETWEEN') {
        if (queryList.filedType === 'number') {
          queryList.type = 'range'
        } else {
          queryList.type = 'dateRange'
        }
      } else if (tag.value === 'IS_NULL' || tag.value === 'IS_NOT_NULL') {
        queryList.type = 'selectNull'
      } else if (queryList.select.length > 0 && (tag.value === 'NOT_IN' || tag.value === 'IN')) {
        queryList.type = 'selectIN'
      } else {
        if (queryList.select.length > 0) {
          queryList.type = 'select'
        } else {
          queryList.value = null
          queryList.value1 = null
        }
      }
      hotTags.forEach(i => {
        i.check = false
        if (tag.label === i.label) {
          i.check = true
          queryList.operator.value = i.value
          queryList.operator.label = i.label
        }
      })
    },
    //  连接符改变方法
    changeLogic (it, j) {
      j.logic.label = it.label
      j.logic.value = it.value
    },
    //  左侧条件字段改变方法
    ChangeOperator (it, obj) {
      obj.field.forEach(element => {
        if (element.value === it.field) {
          if (element.hotTags === undefined) {
            element.hotTags = []
            switch (element.type) {
              case 'range':
                element.hotTags = this.rangeOperator
                break
              case 'date':
                element.hotTags = this.dateOperator
                break
              default:
                if (element.filedType === 'number') {
                  element.hotTags = this.numberOperator
                } else if (element.filedType === 'string') {
                  element.hotTags = this.stringOperator
                }
                break
            }
          }
          it.filedType = element.filedType
          it.hotTags = element.hotTags
          it.type = element.type
          it.value = null
          it.value1 = null
          it.operator.label = it.hotTags[0].label
          it.operator.value = it.hotTags[0].value
          it.select = []
          if (element.alias) {
            it.alias = element.alias
          }
          it.hotTags.forEach((x, xindex) => {
            if (xindex === 0) {
              x.check = true
            } else {
              x.check = false
            }
          })
          if (it.type === 'select') {
            it.select = element.select
          }
        }
      })
    },
    // 组里边条件增加方法
    add (j, it) {
      j.isAdd = false
      const obj = {
        logic: { label: '并且', value: 'AND' },
        operator: { label: '=', value: 'EQ' },
        field: null,
        value: '',
        hotTags: [],
        type: 'input',
        select: [],
        isLogic: true,
        isAdd: true,
        isIcon: false,
        filedType: 'string'
      }
      it.push(obj)
    },
    // 以组为单位添加
    objAdd (obj, universal, index) {
      if (index !== undefined) {
        obj.isLogic = true
        this.universal.splice(index, 1)
        this.universal[this.universal.length - 1]['isLogic'] = true
      } else {
        obj.isLogic = true
        const it = {
          field: this.headerDate,
          logic: { label: '并且', value: 'AND' },
          isLogic: true,
          queryList: [
            {
              logic: { label: '并且', value: 'AND' },
              operator: { label: '=', value: 'EQ' },
              field: null,
              value: null,
              value1: null,
              hotTags: [],
              type: 'input',
              select: [],
              isLogic: false,
              isAdd: true,
              isIcon: false,
              filedType: 'string'
            }
          ]
        }
        this.universal.push(it)
      }
    },
    // 组里边单个条件的增删
    changeIcon (it, index) {
      this.universal.forEach(i => {
        i.queryList.forEach(j => {
          j.isIcon = false
        })
      })
      this.universal[it].queryList[index].isIcon = true
    },
    // 以组为单位的删除
    delIcon (j, index, indexJD) {
      if (this.universal[index].queryList.length === 1 && indexJD === 0) {
        return
      }
      this.universal[index].queryList.splice(indexJD, 1)
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.universal[index].queryList[
        this.universal[index].queryList.length - 1
      ]['isAdd'] = true
    },
    // 返回最终数据
    getData (e) {
      e.preventDefault()
      const obj = []
      for (let i = 0; i < this.universal.length; i++) {
        const query = []
        for (let j = 0; j < this.universal[i].queryList.length; j++) {
          let str = []
          if (this.universal[i].queryList[j]['type'] === 'date') {
            this.universal[i].queryList[j]['value'] = this.datePipe.transform(this.universal[i].queryList[j]['value'], 'yyyy-MM-dd')
            this.universal[i].queryList[j]['value'] = this.datePipe.transform(this.universal[i].queryList[j]['value'], 'yyyy-MM-dd')
          } else if (
            this.universal[i].queryList[j]['type'] === 'dateRange'
          ) {
            this.universal[i].queryList[j]['value1'] = this.datePipe.transform(this.datetime[1], 'yyyy-MM-dd')
            this.universal[i].queryList[j]['value'] = this.datePipe.transform(this.datetime[0], 'yyyy-MM-dd')
          }
          if (
            this.universal[i].queryList[j]['field'] != null &&
            (this.universal[i].queryList[j]['operator']['value'] ===
              'IS_NULL' ||
              this.universal[i].queryList[j]['operator']['value'] ===
              'IS_NOT_NULL')
          ) {
            this.universal[i].queryList[j]['value'] = true
          }
          if (
            this.universal[i].queryList[j]['field'] != null && this.universal[i].queryList[j]['value'] != null
          ) {
            if (
              this.universal[i].queryList[j]['operator']['value'] === 'IN' || this.universal[i].queryList[j]['operator']['value'] === 'NOT_IN'
            ) {
              let result
              if (
                Array.isArray(
                  this.universal[i].queryList[j]['value']
                ) === true
              ) {
                result = this.universal[i].queryList[j]['value']
              } else {
                result = this.universal[i].queryList[j]['value'].split(',')
              }
              result.splice(
                0,
                0,
                this.universal[i].queryList[j]['field']
              ) // 插入字段
              str = result
            } else {
              if (this.universal[i].queryList[j]['value1'] != null) {
                str.push(
                  this.universal[i].queryList[j]['field'],
                  this.universal[i].queryList[j]['value'],
                  this.universal[i].queryList[j]['value1']
                )
              } else {
                str.push(
                  this.universal[i].queryList[j]['field'],
                  this.universal[i].queryList[j]['value']
                )
              }
            }
            if (this.universal[i].queryList[j]['alias']) {
              query.push({
                logic: this.universal[i].queryList[j]['logic']['value'],
                operator: this.universal[i].queryList[j]['operator']['value'],
                params: str,
                alias: this.universal[i].queryList[j]['alias']
              })
            } else {
              query.push({
                logic: this.universal[i].queryList[j]['logic']['value'],
                operator: this.universal[i].queryList[j]['operator']['value'],
                params: str
              })
            }
          }
        }
        if (query.length > 0) {
          obj.push({
            logic: this.universal[i].logic.value,
            queryList: query
          })
        }
      }
      this.$emit('getQuery', obj) // 暴露出去
    },
    // 重置方法
    reset () {
      this.universal = [
        {
          field: [],
          logic: { label: '并且', value: 'AND' },
          isLogic: false,
          queryList: [
            {
              logic: { label: '并且', value: 'AND' },
              operator: { label: '=', value: 'EQ' },
              field: null,
              value: null,
              value1: null,
              hotTags: [],
              type: 'input',
              select: [],
              isLogic: false,
              isAdd: true,
              isIcon: false,
              filedType: null
            }
          ]
        }
      ]
      this.universal.forEach(i => {
        i.field = this.headerDate
      })
      this.universalStar = this.universal

      this.$emit('reset') // 暴露出去
    },
    resetData (obj) {
      obj.forEach(i => {
        switch (i.type) {
          case 'range':
            i.hotTags = this.rangeOperator
            break
          case 'date':
            i.hotTags = this.dateOperator
            break
          default:
            if (i.filedType === 'number') {
              i.hotTags = this.numberOperator
            } else if (i.filedType === 'string') {
              i.hotTags = this.stringOperator
            }
            break
        }
        i['hotTags'].forEach(element => {
          if (i.operator === element.value) {
            element.check = true
            i.operator = element
          }
        })
        if (i.logic === 'AND') {
          i.logic = { label: '并且', value: 'AND' }
        } else {
          i.logic = { label: '或者', value: 'OR' }
        }
        i['isLogic'] = false
        if (i.select) {
          i.select.forEach(element => {
            if (i.value === element.value) {
              element.selector = true
            }
          })
        }
      })
      this.universal[0].queryList = obj
    }
  },
  created () {
    // 初始化获取dict方法
    //   this.headerDate.forEach(i => {
    //     if (i.type === 'select' && i.dictId) {
    //     const serviceRequest: ServiceRequest = {
    //       svctype: ServiceTypeEnum.PRE_CONTENT_BIZ_DICT,
    //       svccode: i.dictId,
    //       requestdata: { coh: {}, bdy: {} }
    //     };
    //     this.bsaApi.asynCall(serviceRequest).subscribe(data => {
    //       if (data.resultdata.bdy) {
    //         i.select = data.resultdata.bdy.dictList;
    //       }
    //     });
    //   }
    // });
    this.universal.forEach(i => {
      i.field = this.headerDate
    })
    this.universalStar = this.universal
  }
}
</script>

<style scoped>
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
  margin: 0 10px;
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
  color: red;
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
  float: right;
}

.buttons {
  border-radius: 25px;
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
