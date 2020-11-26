<!--
 * @Author: 郭德纲
 * @Date: 2020-11-11 10:55:03
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 20:14:15
 * @Description: file content
-->
<template>
  <div>
    <div>
      <a-row>
        <a-col class="gutter-row" :span="12">
          <div class="gutter-top">
            <h2>战略看板</h2>
          </div>
        </a-col>
        <a-col class="gutter-row" :span="12">
          <div class="gutter-top">
            <a-input-search placeholder="input search text" enter-button="Search" size="large" @search="onSearch" />
          </div>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box" ref="gutterBox">
                <Statistic title="培训总场次" :suffix="true" :valueNum="288" />
                <TinyColumn id="total" />
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <Statistic title="培训总人次" :valueNum="1899" />
                <TinyArea id="peoplenum" />
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <Statistic title="培训总天数" :valueNum="166" />
                <TinyColumn id="daynum" />
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <Statistic title="讲师数量" :valueStyle="valueStyle" :prefix="true" :valueNum="20" />
                <TinyArea id="teachernum" />
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <Statistic title="课程数量" :valueNum="20" />
                <TinyColumn id="classnum" />
              </div>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <div class="gutter-box">
                <Statistic title="上课时长" :valueNum="160" />
                <Bullet />
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <div :style="boxStyle">
            <p class="div-title">图表</p>
            <DualAxes />
          </div>
        </a-col>
      </a-row>
    </div>

    <a-card :bordered="false" class="card-div" :tab-list="tabListNoTitle" :active-tab-key="noTitleKey" @tabChange="key => onTabChange(key, 'noTitleKey')">
      <!-- <p v-if="noTitleKey === 'article'">article content</p>
      <p v-else-if="noTitleKey === 'app'">app content</p>
      <p v-else>project content</p>-->
      <div>
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <div class="gutter-box">
              <DualAxes />
            </div>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <div class="gutter-box">
              <p class="div-title">排名</p>
              <ul>
                <li v-for="(item,i) in list" :key="i" :class="i<3?'list-p list-p-active':'list-p'">
                  <span :class="i<3?'num num-active ':'num'">{{i+1}}</span>
                  <span>{{item}}</span>
                  <span class="span-right">9.8</span>
                </li>
              </ul>
            </div>
          </a-col>
        </a-row>
      </div>
      <a slot="tabBarExtraContent" href="#">
        <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
      </a>
    </a-card>
    <a-card :bordered="false" class="card-div" title="Default size card">
      <a slot="extra" href="#">more</a>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
  </div>
</template>

<script>
// import { isLoginStatus } from 'Common/utils'
import Statistic from 'Components/statistic'
import less from 'less'
import { TinyColumn, TinyArea, DualAxes, Bullet } from 'Components/chart/chart'
export default {
  name: 'Home',
  data () {
    return {
      show: true,
      suffixComponent: { template: '<span>ss</span>' },
      valueStyle: { color: '#cf1322' },
      boxStyle: { height: '496px' },
      list: ['张三', '里斯', '王二', '麻子', '小白', '东东', '喜喜'],
      tabList: [
        {
          key: 'tab1',
          // tab: 'tab1',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'tab2',
          tab: 'tab2'
        }
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2'
      },
      tabListNoTitle: [
        {
          key: 'article',
          tab: '讲师'
        },
        {
          key: 'app',
          tab: '学员'
        }
      ],
      key: 'tab1',
      noTitleKey: 'app'
    }
  },
  components: {
    Statistic,
    TinyColumn,
    TinyArea,
    DualAxes,
    Bullet
  },
  methods: {
    clickFun () {
      this.show = !this.show
    },
    changeTheme (primaryColor) {
      // window.less.modifyVars({
      //   '@primary-color': primaryColor
      // }).then(() => {
      //   console.log('成功')
      // })
      //   .catch(error => {
      //     alert('失败')
      //     console.log(error)
      //   })
      less.modifyVars({
        '@primary-color': '#0035ff'
      })
      //   console.log(window.less)
    },
    onSearch () {

    },
    onTabChange (key, type) {
      console.log(key, type);
      this[type] = key;
    }

  },
  mounted: function () {
    setTimeout(() => {
      const height = this.$refs['gutterBox'].clientHeight * 2;
      this.boxStyle = { height: height + 24 + 'px', background: '#fff', padding: '16px' }
    }, 300)
  }

  // beforeMount: function () {
  //   console.log(isLoginStatus())
  //   if (!isLoginStatus()) {
  //     this.$warning({
  //       title: '登录失效，请重新登陆！',
  //       okText: '确认',
  //       onOk: () => {
  //         this.$router.push('/login')
  //       }
  //     });
  //   }
  // }
}

</script>
<style scoped lang="less">
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.card-div {
  margin-bottom: 24px;
}

.gutter-box {
  background-color: @colorf;
  margin-bottom: 24px;
  padding: 16px;
}
.gutter-top {
  margin-bottom: 24px;
  background-color: @colorf;
  padding: 16px;
  min-height: 72px;
  h2 {
    margin: 0;
  }
}
ul {
  list-style: none;
}
.list-p-active {
  font-size: 18px !important;
  font-weight: 500;
}
.list-p {
  line-height: 36px;
  font-size: 16px;
  .num {
    width: 30px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin-right: 5px;
  }
  .num-active {
    background-color: #fde3cf;
    color: #f56a00;
  }
  .span-right {
    float: right;
  }
}
</style>
