<template>
  <div ref="echartBar" style="width: 100%; height: 100%"/>
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

const barChart = shallowRef(null)
const echartBar = ref(null)
let dataBar = ref({})

const getChatData = async(chartData) => {
  dataBar = chartData
  await nextTick()
  barChart.value.clear()
  setBarOptions()
}

const setBarOptions = () => {
  barChart.value.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  })
}

onMounted(async() => {
  barChart.value = echarts.init(echartBar.value)
  await getChatData(props.chartData)
})

watch(() => props.chartData, () => {
  getChatData(props.chartData)
}, { deep: true })


</script>

<style scoped>

</style>
