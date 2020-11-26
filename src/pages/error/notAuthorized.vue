<!--
 * @Author: 郭德纲
 * @Date: 2020-11-18 15:28:12
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-18 15:42:26
 * @Description: file content
-->

<template>
  <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <router-link to="/">
        <a-button type="primary">Back Home</a-button>
      </router-link>
    </template>
  </a-result>
</template>
<script>
export default {
  name: 'notAuthorized',
  data () {
    return {
    };
  }
}

</script>
<style scoped></style>
