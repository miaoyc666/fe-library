<template>
  <div class="header">
    <h1>Welcome to My Library</h1>
  </div>
  <div>
    <!-- 桑基图 -->
    <Sankey :chartData="sankeyChartData"/>
  </div>
</template>

<script setup>
import Sankey from './components/charts/sankey.vue'
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
</style>
