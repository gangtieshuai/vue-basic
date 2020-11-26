<!--
 * @Author: 汪波
 * @Date: 2020-11-13 09:55:03
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-13 09:55:03
 * @Description: 我是教师-预约详情
-->
<template>
 <div class="box">
     <a-card class="card">
        <a-row  type="flex">
            <a-col :flex="1">
                  <a-row type="flex">
                    <a-col :flex="1" style="text-align: center;">
                     <img src="http://122.70.140.61:25601/assets/img/avatars/0.jpg">
                    </a-col>
                <a-col :flex="5">
                    <a-row class="title" type="flex">
                        <a-col :flex="1">
                           <h1>{{item.LESSON_NAME}}</h1>
                        </a-col>
                        <a-col :flex="1">
                             <a-tag   class="tag" color="#f4b400">
                                  {{item.LESSON_DESC}}
                             </a-tag>
                        </a-col>
                    </a-row>
                    <div class="teacher">
                      授课讲师： <a href="javascript:;">{{item.teacher}}</a>
                    </div>
                     <div class="teacher">
                      领域主题: <a-tag style="cursor: pointer;" v-for="tag in taglist"    :key="tag.value" color="#8c0095">
                                  {{tag.label}}
                              </a-tag>
                    </div>
                     <div class="line"></div>
                    <div class="teacher">
                      创建时间:  {{item.creatime}}
                    </div>
                </a-col>
                  </a-row>
            </a-col>
            <a-col :flex="1"  class="rightbox" style=" justify-content: space-between;">
                  <div class="border"></div>
                  <div class="details">
                            <a-row type="flex" >
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{item.startClass}}</p>
                                        <p>累计开课</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{item.grandTrainee}}</p>
                                        <p>累计学员</p>
                                    </a-col>
                                    <a-col :flex="1" class="info">
                                        <p class="number">{{item.rank}}</p>
                                       <p>综合评分</p>
                                    </a-col>
                            </a-row>
                  </div>
                  <div class="score">
                        综合评分: <a-rate :default-value="item.rankscore" disabled />
                  </div>
            </a-col>
        </a-row>

     </a-card>
      <a-card class="card" style="min-height: 200px" :title="'预约说明:' + item.apptinstructions">
            <span class="apptinstructions">课程简介</span>: {{item.apptinstructions}}
       </a-card>

      <a-card  class="card"
          :tab-list="tabList"
          :active-tab-key="noTitleKey"
          @tabChange="key => onTabChange(key, 'noTitleKey')"
      >
           <span slot="customRender" slot-scope="item"> <a-icon type="unordered-list" />{{ item.name }} </span>
           <span slot="branche" slot-scope="item"> <a-icon type="branches" />{{ item.name }} </span>
             <div v-if="noTitleKey === 'kjlb'">
                  课件列表
            </div>
          <div v-else-if="noTitleKey === 'pxjl'">
            <div>
                      <ul class="timeline animated">
                          <li style="clear:both;"  v-for="(item,index) in recording"
                              :key="item.id" :class="{ 'timeline-inverted': index%2 !== 0 }">
                            <div class="timeline-datetime">
                                          <span class="timeline-time">
                                                {{item.time}}
                                          </span>
                                          <span class="timeline-date"> {{item.area}}</span>
                            </div>
                            <div class="timeline-badge blue">
                                          <a-icon type="pushpin" />
                            </div>
                            <div class="timeline-panel">
                                          <div class="timeline-header  bordered-blue">
                                              <span class="timeline-title">
                                                  {{item.title}}
                                              </span>
                                        </div>
                                        <div class="timeline-body">
                                          <p> 主管部门： {{item.department}}</p>
                                          <p>  {{item.content}}</p>
                                        </div>
                            </div>
                          </li>
                          <li class="none" v-if="recording.lenght != 0 ">
                                <a-button  type="primary">
                                    没有更多了
                                </a-button>
                          </li>
                      </ul>
            </div>
         </div>
    </a-card>
 </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      taglist: [
        {label: '其他', value: 'other'},
        {label: '党员党性', value: 'dydx'},
        {label: '党建精品', value: 'dyjp'}
      ],
      item: {
            LESSON_NAME: '测试课程_20201112100635删除',
            LESSON_DESC: '此课程暂不可约',
            teacher: 'zhutianmei.hn',
            creatime: '2020-11-11 19:30:16',
            startClass: '1',
            grandTrainee: '0',
            rank: '5',
            rankscore: 0,
            apptinstructions: '1111'
      },
      noTitleKey: 'kjlb',
      tabList: [
        {
          key: 'kjlb',
          name: '课件列表',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'pxjl',
          name: '培训记录',
          scopedSlots: { tab: 'branche' }
        }
      ],
      recording: [
        {id: 0, time: '2020-11-06 08:30', area: '建行大学湖南省分行分校', title: '2020年湖南省分行本部人力资源部“建证成长”网点客户经理能力提升培训班（第三期', department: '人力资源部（党委组织部）(430000300)', content: '本次培训内容为总行研发定制的课程，包括：改变传统“灌输式”授课方式，以场景化培训为现场教学主要方式，按照“仗怎么打，兵怎么练”的思路，将工作场景搬到课堂，抓住新客户拓展、客户关系维护和产品营销等具体场景，以真实的案例为蓝本，以情景演练、案例分析、考核通关等多种形式，让学员在交流和演练中提升能力；基于新一代系统的精准营销及客户经理合规能力提升等'},
        {id: 1, time: '2020-11-06 08:30', area: '建行大学湖南省分行分校', title: '2020年湖南省分行本部人力资源部“建证成长”网点客户经理能力提升培训班（第三期', department: '人力资源部（党委组织部）(430000300)', content: '测试2测试2'},
        {id: 2, time: '2020-11-06 08:30', area: '建行大学湖南省分行分校', title: '2020年湖南省分行本部人力资源部“建证成长”网点客户经理能力提升培训班（第三期', department: '人力资源部（党委组织部）(430000300)', content: '本次培训内容为总行研发定制的怎么打'}

      ]
    }
  },
  methods: {
     onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    }
  },
  components: {

  },
  created: function () {

  }
}

</script>
<style scoped>
  .box{
    padding:24px;
    height: 100vh;
  }

  .title {
    position: relative;
  }

  .title h1 {
    display: inline-block;
    font-size: 28px;
    line-height: 28px;
  }

  .teacher{
      margin: 15px 0px;
      font-weight: 500;
      font-size: 14px;
  }
  .tag {
    font-size: 16px;
    padding: 4px 9px;
    line-height: 22px;
    cursor: pointer;
  }

  .card {
    margin: 15px 0px;
  }

  img {
    width: 125px;
    height: 125px;
    border-radius: 50%;
    background-clip: padding-box;
    border-radius: 50%;
    border-radius: 50%;
    background-clip: padding-box;
    border: 5px solid #f5f5f5;
    box-shadow: 0 0 10px rgba(0,0,0,.15);
    margin: 25px auto;
  }

  .line {
    height:1px; border: 1px solid #eee; width:90%; margin: 20px 0px
  }
  .rightbox {
    position: relative;
  }
  .rightbox .border {
      width: 1px;
      position: absolute;
      left: 0px;
      background: #eee;
      height: 100%;
  }

  .details {
    height: 50%;
    border-bottom: 1px solid #eee
  }

  .info {
    text-align: center; border-right: 1px solid #eee
  }

  .info:last-child {
      border-right: none;
  }
  .number {
    font-size: 30px;
    font-family: 'Lucida Sans','trebuchet MS',Arial,Helvetica;
    color: #e75b8d;
    margin-bottom: 0px;
  }

  .score {
    padding:20px 40px;
  }

  .apptinstructions {
    font-weight: 900;
  }

  .profile-container .timeline {
      padding-top: 35px;
      margin-top: -16px;
  }

.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.timeline {
    list-style: none;
    padding: 0;
    position: relative;
}

.timeline:before {
    top: 0;
    bottom: -35px;
    position: absolute;
    content: " ";
    width: 3px;
    left: 50%;
    margin-left: -1.5px;
    box-shadow: 0 1px 6px rgba(0,0,0,.175);
    background-color: #f3f3f3;
}
.timeline>li {
    margin-bottom: 40px;
    position: relative;
    min-height: 200px;
}
.timeline>li:before, .timeline>li:after {
    content: " ";
    display: table;
}

.timeline>li>.timeline-datetime {
    color: #737373;
    position: absolute;
    left: 55%;
    top: 6px;
    text-align: left;
    padding: 10px;
}

.timeline>li>.timeline-datetime .timeline-time, .timeline>li>.timeline-datetime .timeline-date {
    display: block;
    font-size: 18px;
    font-weight: 900;
    font-family: 'Lucida Sans','trebuchet MS',Arial,Helvetica;
}

.timeline>li .timeline-badge {
    width: 50px;
    height: 50px;
    font-size: 1.4em;
    text-align: center;
    position: absolute;
    top: 6px;
    left: 50%;
    margin-left: -25px;
    background-image: linear-gradient(to bottom,#eee 0,#fbfbfb 100%);
    z-index: 100;
    -webkit-border-radius: 50%;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 50%;
    -moz-background-clip: padding;
    border-radius: 50%;
    background-clip: padding-box;
    box-shadow: 0 1px 6px rgba(0,0,0,.175);
    color: #444;
}

.blue {
    color: #5db2ff!important;
}

.timeline>li .timeline-badge i {
    line-height: 50px;
}
.fa {
    display: inline-block;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.timeline>li>.timeline-panel {
    background-color: #fbfbfb;
    width: calc(50% - 45px);
    float: left;
    border-radius: 2px;
    padding: 0;
    position: relative;
    box-shadow: 0 1px 6px rgba(0,0,0,.175);
}

.timeline>li>.timeline-panel:before {
    position: absolute;
    top: 16px;
    right: -15px;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: 15px solid #e5e5e5;
    border-right: 0 solid #e5e5e5;
    border-bottom: 15px solid transparent;
    content: " ";
}
  .timeline-rightdatetime {
    left: auto;
    right: 55%;
    text-align: right;
  }
.bordered-blue {
    border-color: #5db2ff;
}

.timeline>li>.timeline-panel .timeline-header .timeline-title {
    display: block;
    padding: 10px 20px 0;
    min-width: 200px;
    font-size: 14px;
    font-family: 'Lucida Sans','trebuchet MS',Arial,Helvetica;
    font-weight: 700;
}

.timeline>li>.timeline-panel .timeline-body {
    padding: 10px 20px 20px;
    line-height: 22px;
}

/* 右侧 */
.timeline>li.timeline-inverted>.timeline-panel {
    float: right;
}

.timeline>li.timeline-inverted>.timeline-panel:before {
    border-left-width: 0;
    border-right-width: 15px;
    left: -15px;
    right: auto;
}
.timeline>li>.timeline-panel:before {
    position: absolute;
    top: 16px;
    right: -15px;
    display: inline-block;
    border-top: 15px solid transparent;
    border-left: 15px solid #e5e5e5;
    border-right: 0 solid #e5e5e5;
    border-bottom: 15px solid transparent;
    content: " ";
}

.timeline>li.timeline-inverted>.timeline-datetime {
    left: auto;
    right: 55%;
    text-align: right;
}
.none {
    /* position: absolute !important; */
    left: 50%;
    margin-left: -52px;
    /* bottom: -37%; */
    min-height: 10px !important;
}
.none > button {
  background: #ffce55;
  border-color: #ffce55
}
</style>
