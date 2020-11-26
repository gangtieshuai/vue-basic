<!--
 * @Author: 郭德纲
 * @Date: 2020-11-25 18:55:42
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 20:38:09
 * @Description: file content
-->
<!--
 * @Author: 郭德纲
 * @Date: 2020-11-25 16:17:24
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 17:27:24
 * @Description: file content
-->
<template>
  <div :id="chartId" class="chart-div"></div>
</template>

<script>
import { Bullet } from '@antv/g2plot';
export default {
  name: 'Bullet',
  data () {
    return {
      chartId: 'Bullet' + new Date().getTime()
    };
  },
  mounted () {
    setTimeout(() => {
      // const width = this.$refs[this.chartId].clientWidth;
      const height = this.$el.clientHeight;
      this.divstyle = { height: height + 'px' }
      console.log(height);
      const data = [
        {
          title: '满意度',
          ranges: [100],
          measures: [80],
          target: 85
        }
      ];
      const chart = new Bullet(this.chartId, {
        data,
        height: 64,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
          range: '#f0fbff',
          measure: '#1890ff',
          target: '#43a5ff'
        },
        xAxis: {
          line: null
        },
        yAxis: false,
        // 自定义 legend
        legend: {
          custom: true,
          position: 'bottom',
          items: [
            {
              value: '实际值',
              name: '实际值',
              marker: { symbol: 'square', style: { fill: '#1890ff', r: 5 } }
            },
            {
              value: '目标值',
              name: '目标值',
              marker: { symbol: 'line', style: { stroke: '#43a5ff', r: 5 } }
            }
          ]
        }
      });
      ;
      chart.render();
    }, 300)
  }
}

</script>
<style scoped></style>
