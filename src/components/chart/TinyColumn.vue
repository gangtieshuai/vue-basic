<!--
 * @Author: 郭德纲
 * @Date: 2020-11-25 16:17:24
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 17:22:13
 * @Description: file content
-->
<template>
  <div :id="chartId" :ref="chartId" class="chart-div"></div>
</template>

<script>
import { TinyColumn } from '@antv/g2plot';
export default {
  name: 'TinyColumn',
  props: {
    id: String
  },
  data () {
    return {
      chartId: 'TinyColumn' + new Date().getTime()
    };
  },
  mounted () {
    setTimeout(() => {
      const width = this.$refs[this.chartId].clientWidth;
      const data = [274, 337, 81, 497, 666, 219, 269];
      console.log(this.$refs[this.chartId].clientWidth);
      const chart = new TinyColumn(this.chartId, {
        height: 64,
        width: width,
        autoFit: false,
        data,
        tooltip: {
          // customContent: function (x, data) {
          //   return `NO.${x}: ${data[0].data.y.toFixed(2)}`;
          // }
        }
      });
      chart.render();
    }, 300);
  }
}

</script>
<style scoped></style>
