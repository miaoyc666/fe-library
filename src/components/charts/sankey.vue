<template>
  <div ref="echartSankey" style="width: 410px; height: 270px"/>
</template>

<script setup>
import * as echarts from 'echarts';
import { nextTick, onMounted, ref, shallowRef, watch } from 'vue'

const props = defineProps({
  chartData : {
    type: Object,
    required: true
  }
})

const sankeyChart = shallowRef(null)
const echartSankey = ref(null)
let dataSankey = ref({})
// dataSankey 数据示例
// let dataSankey = ref({
//   "data": [
//     { name: 'a' },
//     { name: 'b' },
//     { name: 'a1' },
//     { name: 'a2' },
//     { name: 'b1' },
//     { name: 'c' }
//   ],
//   "links": [
//     { source: 'a', target: 'a1', value: 10 },
//     { source: 'a', target: 'a2', value: 3 },
//     { source: 'b', target: 'b1', value: 3 },
//     { source: 'a', target: 'b1', value: 3 },
//     { source: 'b1', target: 'a1', value: 1 },
//     { source: 'b1', target: 'c', value: 2 }
//   ]
// })

const getChatData = async(chartData) => {
  dataSankey = chartData
  await nextTick()
  sankeyChart.value.clear()
  setSankeyOptions()
}

const setSankeyOptions = () => {
  sankeyChart.value.setOption({
    series: {
      type: 'sankey',
      layout: 'none',
      emphasis: {
        focus: 'adjacency'
      },
      data: dataSankey.data,
      links: dataSankey.links
    }
  })
}

onMounted(async() => {
  sankeyChart.value = echarts.init(echartSankey.value)
  await getChatData(props.chartData)
})

watch(() => props.chartData, () => {
  getChatData(props.chartData)
}, { deep: true })


</script>

<style scoped>

</style>


