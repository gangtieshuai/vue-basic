<!--
 * @Author: 郭德纲
 * @Date: 2020-11-16 00:32:14
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 16:31:46
 * @Description: file content
-->
<template>
  <a-statistic :title="title" :value="valueNum" :value-style="{...valueStyle,fontSize:'35px'}">
    <template #suffix v-if="suffix">
      <a-icon :type="suffixicon?suffixicon:'like'" />
    </template>
    <template #prefix v-if="prefix">
      <a-icon :type="prefixicon?prefixicon:'arrow-up'" />
    </template>
  </a-statistic>
</template>

<script>
export default {
  name: 'statistic',
  data () {
    return {
    }
  },
  props: {
    title: String,
    valueNum: Number,
    suffix: Boolean,
    prefix: Boolean,
    suffixComponent: String,
    suffixicon: String,
    prefixicon: String,
    valueStyle: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
