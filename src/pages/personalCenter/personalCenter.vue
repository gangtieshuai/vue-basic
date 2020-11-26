<!--
 * @Author: 郭德纲
 * @Date: 2020-11-24 10:10:42
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-24 15:27:33
 * @Description: file content
-->
<template>
  <div>
    <a-row class="workbench">
      <a-col class="gutter-row" :span="14">
        <div class="gutter-box">
          <div class="avatar-div">
            <a-avatar :size="72" style="font-size:30px" class="ant-dropdown-avatar">{{username.substr(0, 1)}}</a-avatar>
            <div class="avatar-title">
              <h2>早上好！{{username}}</h2>
              <p>
                <span>
                  <a-icon type="environment" />&nbsp;长沙市
                </span>
                <span>
                  <a-icon type="cluster" />
                  &nbsp;{{org}}
                </span>
                <span>
                  <a-icon type="user" />
                  &nbsp;{{role}}
                </span>
              </p>
            </div>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :span="10">
        <div class="gutter-box">
          <a-row>
            <a-col class="gutter-row" v-for="(item,i) in statisticList" :key="i" :span="statisticList.length>2?8:12">
              <a-statistic class="statistic-dom" :title="item.text" :value="item.value">
                <template #suffix v-if="item.key === 'sectorRanking' || item.key === 'hierarchicalRranking'">
                  <!-- <a-icon type="like" /> -->
                  <span>/ 100</span>
                </template>
              </a-statistic>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <div class="content-div">
      <a-tabs default-active-key="all" @change="callback">
        <a-tab-pane v-for="(item) in tabsList" :key="item.key" :tab="item.text">Content of Tab Pane 1</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'Common/utils'
import { roleType } from 'Common/enum'
export default {
  name: 'personalCenter',
  data () {
    const userinfo = getAuth();
    let statisticArray = [
      { text: '已开课程', value: '99', key: 'coursesOpened', role: '001000' },
      { text: '层级排名', value: '2', key: 'hierarchicalRranking', role: '001000' },
      { text: '部门排名', value: '1', key: 'sectorRanking', role: '001000' },
      { text: '已上课程', value: '22', key: 'coursesTaken', role: '010000' },
      { text: '我的预约', value: '2', key: 'myAppointment', role: '010000' }
    ]
    statisticArray = statisticArray.filter(i => i.role === userinfo.role)
    let tabsArray = [
      { text: '全部', key: 'all', role: '001000' },
      { text: '全部', key: 'all', role: '010000' },
      { text: '已开课程', key: 'coursesOpened', role: '001000' },
      { text: '已结束课程', key: 'coursesTaken', role: '010000' },
      { text: '已结束课程', key: 'coursesTaken', role: '001000' },
      { text: '已预约课程', key: 'coursesTaken', role: '010000' }
    ]
    tabsArray = tabsArray.filter(i => i.role === userinfo.role)
    return {
      username: userinfo.name,
      org: userinfo.org,
      role: roleType[parseInt(userinfo.role, 2)],
      statisticList: statisticArray,
      tabsList: tabsArray

    };
  },
  methods: {
    callback () {

    }
  }

}

</script>
<style scoped lang="less">
.workbench {
  background: @colorf;
}
.gutter-box {
  background-color: @colorf;
  padding: 20px;
  border-radius: 2px;
}
.border-box {
  border-left: 1px dashed @colord8;
}
.avatar-div {
  text-align: left;
  // padding: 30px 0 24px;
  display: flex;

  p {
    margin-bottom: 0;
    span {
      margin-right: 10px;
    }
  }
  .avatar-title {
    margin-left: 20px;
  }
}
.statistic-dom {
  padding-left: 24px;
}
.content-div {
  margin-top: 20px;
  background: #fff;
  padding: 10px;
}
</style>
