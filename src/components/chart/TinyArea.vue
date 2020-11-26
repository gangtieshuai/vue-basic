<!--
 * @Author: 郭德纲
 * @Date: 2020-11-25 16:17:24
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 17:27:24
 * @Description: file content
-->
<template>
  <div :id="chartId" :ref="chartId" class="chart-div"></div>
</template>

<script>
import { TinyArea } from '@antv/g2plot';
export default {
  name: 'TinyArea',
  props: {
    id: String
  },
  data () {
    return {
      chartId: 'TinyArea' + new Date().getTime()
    };
  },
  mounted () {
    setTimeout(() => {
      const width = this.$refs[this.chartId].clientWidth;
      const data = [
        264,
        417,
        438,
        887,
        309,
        397,
        550,
        575,
        563,
        430,
        525,
        592,
        492,
        467,
        513,
        546,
        983,
        340,
        539,
        243,
        226,
        192
      ];
      console.log(width);
      const chart = new TinyArea(this.chartId, {
        height: 64,
        width: width,
        autoFit: false,
        data,
        smooth: true,
        areaStyle: {
          fill: '#d6e3fd'
        }
      });
      chart.render();
    }, 300)
  }
}

</script>
<style scoped></style>
