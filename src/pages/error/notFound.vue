<!--
 * @Author: 郭德纲
 * @Date: 2020-11-17 20:18:17
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-18 15:42:58
 * @Description: file content
-->
<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <router-link to="/">
        <a-button type="primary">Back Home</a-button>
      </router-link>
    </template>
  </a-result>
</template>
<script>
export default {
  name: 'notFound',
  data () {
    return {
    };
  }
}

</script>
<style scoped></style>
