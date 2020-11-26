<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-18 09:55:03
 * @Description: 我的消息
-->
<template>
  <div>
      <a-card :title="'通知处理'">
          <a-row >
              <a-col  :span="11">
                  <a-card style="max-height: 800px; overflow-y: scroll;">
                       <div slot="title" href="#">我的信息<span class="titlespan">(未读：<span>{{myinfo.number}}</span> 条)</span></div>
                           <a-list
                                class="demo-loadmore-list"
                                :loading="myinfo.loading"
                                item-layout="horizontal"
                                :data-source="myinfo.data"
                              >
                            <div
                              v-if="myinfo.showLoadingMore"
                              slot="loadMore"
                              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                            >
                            <a-spin v-if="myinfo.loadingMore" />
                              <a-button v-else @click="myinfoMore">
                                  加载更多
                              </a-button>
                          </div>
                          <a-list-item slot="renderItem" slot-scope="item">
                             <div style="color:red" v-if="item.status !== '0'" slot="actions"><a-icon type="delete"/></div>
                            <a-list-item-meta>
                              <div slot="description" :class="item.status === '0'? 'nohavereadtext':'havereadtext'">{{item.content}}</div>
                              <div slot="title">{{ item.name }}<span class="time">{{ item.time }}</span><a  :class="item.status === '0'? 'nohaveread':'haveread'"  @click="myclick(item)" href="javascript:;">{{item.status === '0'?'标记为已读': '['+ item.HaveReadTime+' 已读]'}}</a></div>
                              <a-avatar
                                slot="avatar"
                                src="http://122.70.140.61:25601/assets/img/avatars/0.jpg"
                              />
                            </a-list-item-meta>
                          </a-list-item>
                        </a-list>
                  </a-card>
              </a-col>

              <a-col  :span="12" :offset="1">
                 <a-card style="max-height: 800px; overflow-y: scroll;">
                       <div slot="title" href="#">我的代办<span class="titlespan">(未处理<span>{{agentinfo.number}}</span> 条)</span></div>
                                   <a-list
                                class="demo-loadmore-list"
                                :loading="agentinfo.loading"
                                item-layout="horizontal"
                                :data-source="agentinfo.data"
                              >
                            <div
                              v-if="agentinfo.showLoadingMore"
                              slot="loadMore"
                              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                            >
                            <a-spin v-if="agentinfo.loadingMore" />
                              <a-button v-else @click="agentMore">
                                  加载更多
                              </a-button>
                          </div>
                          <a-list-item slot="renderItem" slot-scope="item">
                             <div style="color:red" v-if="item.status !== '0'" slot="actions"><a-icon type="delete"/></div>
                            <a-list-item-meta>
                              <div slot="description" :class="item.status === '0'? 'nohavereadtext':'havereadtext'">{{item.content}}</div>
                              <div slot="title">{{ item.name }}<span style="margin:0px 5px">({{ item.ussid }})</span> <span class="time">{{ item.time }}</span><br v-if="item.status !== '0'"><a  :class="item.status === '0'? 'nohaveread':'haveread'"  @click="goAgent(item)" href="javascript:;">{{item.status === '0'?'暂未处理': '['+ item.HaveReadTime + '   已处理]'}}</a></div>
                              <a-avatar
                                slot="avatar"
                                src="http://122.70.140.61:25601/assets/img/avatars/task.png"
                              />
                            </a-list-item-meta>
                          </a-list-item>
                        </a-list>
                  </a-card>
              </a-col>
          </a-row>
      </a-card>
  </div>
</template>
<script>

// import http from 'Common/http'

export default {
  name: 'Home',
  data () {
    return {
      myinfo: {
          loading: false,
          loadingMore: false,
          showLoadingMore: false,
          data: [],
          number: 3
      },
      agentinfo: {
          loading: false,
          loadingMore: false,
          showLoadingMore: false,
          data: [],
          number: 1
      }

    }
  },
  methods: {
    // 获取我的信息方法
    getmyinformationList() {
        this.myinfo.data = [
          {name: '邓雅元', content: '课程[员工业绩计量考核入门]经zhutianmei.hn与授课教师ganyinghui.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '0'},
          {name: '张帆航', content: '课程[客户经理合规能力提升]经zhutianmei.hn与授课教师dengyayuan.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '1', HaveReadTime: '2020-11-18 10:08:32'},
          {name: '邓雅元', content: '课程[基于新一代系统的精准营销]经zhutianmei.hn与授课教师zhangfanhang.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '0'},
          {name: '张帆航', content: '课程[打造自由开放敏捷的创新体系]经zhutianmei.hn与授课教师zengmingxian.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '1', HaveReadTime: '2020-11-14 10:08:32'},
          {name: '张帆航', content: '课程[数字化经营理念和浅析]经zhutianmei.hn与授课教师huangshuqin.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '0'}
        ]
        if (this.myinfo.data.length > 0) {
              this.myinfo.loadingMore = false;
              this.myinfo.showLoadingMore = true;
        }
    },
    // 我的信息加载更多
    myinfoMore() {
      this.myinfo.loading = true;
      this.myinfo.loadingMore = true;
      // 模拟请求接口
      setTimeout((item) => {
        this.myinfo.loading = false;
        const datas = [{name: '张帆航', content: '课程[客户经理合规能力提升]经zhutianmei.hn与授课教师dengyayuan.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '1', HaveReadTime: '2020-11-18 10:08:32'},
          {name: '邓雅元', content: '课程[基于新一代系统的精准营销]经zhutianmei.hn与授课教师zhangfanhang.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '0'},
          {name: '张帆航', content: '课程[打造自由开放敏捷的创新体系]经zhutianmei.hn与授课教师zengmingxian.hn沟通后，代为确认！', time: '2020-11-19 11:25:03.0', status: '1', HaveReadTime: '2020-11-14 10:08:32'} ]
        this.myinfo.data = this.myinfo.data.concat(datas);
        this.myinfo.loadingMore = false;
      })
    },
    myclick($event) {
      if ($event.status === '0') { // 未读才设置为已读
          console.log('标记完成.重新刷新')
      }
    },
    // 获取代办信息列表
    getagenList() {
        this.agentinfo.data = [
          {name: '邓雅元', ussid: 'zhutianmei.hn', content: '预约课程（测试课程) 课程时间：19-11-2020 7:45 PM 地点:33 培训班名称：二期测试开班课程 归属部门：长沙含浦支行2020-11-11 07:36:24 zhutianmei.hn', time: '2020-11-19 11:25:03.0', status: '0'},
          {name: '邓雅元', ussid: 'zhutianmei.hn', content: '预约课程（测试课程) 课程时间：19-11-2020 7:45 PM 地点:33 培训班名称：二期测试开班课程 归属部门：长沙含浦支行2020-11-11 07:36:24 zhutianmei.hn', time: '2020-11-19 11:25:03.0', status: '1', HaveReadTime: '2020-11-14 10:08:32'}
        ]
        if (this.agentinfo.data.length > 0) {
              this.agentinfo.loadingMore = false;
              this.agentinfo.showLoadingMore = true;
        }
    },
    goAgent($event) {
      if ($event.status === '0') { // 未处理，才去处理
         console.log('前去处理')
      }
    },
    // 我的代办加载更多
    agentMore() {
      this.agentinfo.loading = true;
      this.agentinfo.loadingMore = true;
      // 模拟请求接口
      setTimeout((item) => {
        this.agentinfo.loading = false;
        const datas = [
          {name: '邓雅元', ussid: 'zhutianmei.hn', content: '预约课程（测试课程) 课程时间：19-11-2020 7:45 PM 地点:33 培训班名称：二期测试开班课程 归属部门：长沙含浦支行2020-11-11 07:36:24 zhutianmei.hn', time: '2020-11-19 11:25:03.0', status: '0'},
          {name: '邓雅元', ussid: 'zhutianmei.hn', content: '预约课程（测试课程) 课程时间：19-11-2020 7:45 PM 地点:33 培训班名称：二期测试开班课程 归属部门：长沙含浦支行2020-11-11 07:36:24 zhutianmei.hn', time: '2020-11-19 11:25:03.0', status: '1', HaveReadTime: '2020-11-14 10:08:32'}
          ]
        this.agentinfo.data = this.myinfo.data.concat(datas);
        this.agentinfo.loadingMore = false;
      })
    }
  },
  components: {

  },
  created: function () {
      this.getmyinformationList();
      this.getagenList(); // 获取列表
  }
}

</script>
<style scoped>
  .titlespan {
    font-size: 14px;
    margin-left:5px;
    vertical-align: super;
    font-weight: 100;
  }
  .titlespan span {
    color: red;
    font-weight: 900;
  }
  .time {
    color: #d0d0d0;
    font-size: 12px;
    margin: 0px 10px;
  }
  .haveread {
    color: green
  }
  .nohavereadtext {
      color: red
  }
  .havereadtext {
    color:#000
  }
</style>
