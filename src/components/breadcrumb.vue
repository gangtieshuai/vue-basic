<!--
 * @Author: 汪波
 * @Date: 2020-11-12 11:08:17
 * @LastEditors: 汪波
 * @LastEditTime: 2020-11-12 11:44:13
 * @Description: 面包屑控件
-->
<template>
      <div>
           <a-breadcrumb style="margin: 16px 0">
              <a-breadcrumb-item>
                 <router-link to="./">
                   <a-icon type="home"/>
                  <span>首页</span>
                </router-link>
              </a-breadcrumb-item>
              <a-breadcrumb-item >
                <router-link :to="breaditem.url">
                   <a-icon :type="breaditem.icon" />
                   <span>{{breaditem.numtitle}}</span>
                </router-link>
              </a-breadcrumb-item>
              <a-breadcrumb-item v-if="breaditem.isshow" >
                <router-link :to="breaditem.url1">
                    <a-icon :type="breaditem.icon1" />
                    <span>{{breaditem.numtitle1}}</span>
                 </router-link>
              </a-breadcrumb-item>
            </a-breadcrumb>
     </div>
</template>
<script>

export default {
  props: ['breaditem'],
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  },
  created: function () {

  }
}

</script>

<style scoped>
</style>
