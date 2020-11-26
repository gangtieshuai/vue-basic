<!--
 * @Author: 郭德纲
 * @Date: 2020-11-25 18:55:42
 * @LastEditors: 郭德纲
 * @LastEditTime: 2020-11-25 19:44:25
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
  <div :id="chartId" :ref="chartId" :style="divstyle" class="chart-div"></div>
</template>

<script>
import { DualAxes } from '@antv/g2plot';
export default {
  name: 'DualAxes',
  data () {
    return {
      chartId: 'DualAxes' + new Date().getTime(),
      divstyle: { height: '300px' }
    };
  },
  mounted () {
    setTimeout(() => {
      // const width = this.$refs[this.chartId].clientWidth;
      const height = this.$el.clientHeight;
      this.divstyle = { height: height + 'px' }
      console.log(height);
      const data = [
        { time: '2019-03', value: 350, count: 800 },
        { time: '2019-04', value: 900, count: 600 },
        { time: '2019-05', value: 300, count: 400 },
        { time: '2019-06', value: 450, count: 380 },
        { time: '2019-07', value: 470, count: 220 }
      ];
      const chart = new DualAxes(this.chartId, {
        // width: width,
        // height: 300,
        data: [data, data],
        xField: 'time',
        yField: ['value', 'count'],
        yAxis: {
          // 格式化左坐标轴
          value: {
            min: 0,
            label: {
              formatter: (val) => `${val}个`
            }
          },
          // 隐藏右坐标轴
          count: false
        },
        geometryOptions: [
          {
            geometry: 'column',
            color: '#5B8FF9',
            columnWidthRatio: 0.4,
            label: {
              position: 'middle'
            }
          },
          {
            geometry: 'line',
            smooth: true,
            color: '#5AD8A6'
          }
        ],
        // 更改柱线交互，默认为 [{type: 'active-region'}]
        interactions: [
          {
            type: 'element-highlight'
          },
          {
            type: 'active-region'
          }
        ],
        annotations: {
          value: [
            {
              type: 'text',
              position: ['2019-06', 'max'],
              content: '柱线混合图'
            }
          ],
          count: [
            {
              type: 'dataMarker',
              top: true,
              position: ['2019-05', 400],
              line: {
                length: 20
              },
              text: {
                content: '2019-05, 发布新版本',
                style: {
                  textAlign: 'left'
                }
              }
            }
          ]
        }
      });
      chart.render();
    }, 300)
  }
}

</script>
<style scoped></style>
