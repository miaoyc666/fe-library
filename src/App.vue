<template>
  <div>

  </div>
  <div class="header" style="height: 6%">
    <h1>Examples</h1>
  </div>

  <div class="container">
    <div class="charts-container">
      <div class="chart-wrapper">
        <!-- 桑基图 -->
        <h4 style="margin-left: 30px; margin-top: 10px">桑基图</h4>
        <Sankey :chartData="sankeyChartData"/>
      </div>

      <div class="chart-wrapper">
        <!-- 柱形图 -->
        <h4 style="margin-left: 30px; margin-top: 10px">柱形图</h4>
        <Bar :chartData="barChartData"/>
      </div>
    </div>
  </div>

</template>

<script setup>
import Sankey from './components/charts/sankey.vue'
import Bar from './components/charts/bar.vue'
import {ref} from "vue";

const sankeyChartData = ref({
  "data": [
    { name: 'a' },
    { name: 'b' },
    { name: 'a1' },
    { name: 'a2' },
    { name: 'b1' },
    { name: 'c' }
  ],
  "links": [
    { source: 'a', target: 'a1', value: 10 },
    { source: 'a', target: 'a2', value: 3 },
    { source: 'b', target: 'b1', value: 3 },
    { source: 'a', target: 'b1', value: 3 },
    { source: 'b1', target: 'a1', value: 1 },
    { source: 'b1', target: 'c', value: 2 }
  ]
})

const barChartData = ref({
  "data": [120, 200, 150, 80, 70, 110, 130],
  "xAxis": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
})



</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px 0;
  text-align: center;
}

.container {
  position: absolute;
  top: 6%;
  left: 0;
  width: 100%;
}

.charts-container {
  display: flex;
  justify-content: flex-start; ;
  width: 100%;
  margin: 0 auto;
}

.chart-wrapper {
  width: 33%;
  height: 400px;
  margin-right: 2%
}

.chart-wrapper:last-child {
  margin-right: 0; /* 最后一个元素不需要右边距 */
}

h4 {
  margin-left: 30px;
  margin-top: 10px;
}
</style>
