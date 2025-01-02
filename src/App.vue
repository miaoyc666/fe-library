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

      <div class="chart-wrapper">
        <!-- 饼图 -->
        <h4 style="margin-left: 30px; margin-top: 10px">组织架构-g6</h4>
        <div id="container"></div>
      </div>
    </div>
  </div>

</template>

<script setup>
import Sankey from './components/charts/sankey.vue'
import Bar from './components/charts/bar.vue'
import {ref} from "vue";
import { onMounted } from "vue";
import { Badge, BaseBehavior, ExtensionCategory, Graph, GraphEvent, Rect, register } from '@antv/g6';

import { graphData } from './data.vue';

const statusColors = {
  online: '#17BEBB',
  busy: '#E36397',
  offline: '#B7AD99',
};

const DEFAULT_LEVEL = 'detailed';

/**
 * Draw a chart node with different ui based on the zoom level.
 */
class ChartNode extends Rect {

  defaultLabelColor = '#B7AD99';

  getColorByCount(count) {
    count = parseInt(count, 10); // 将count转换为整数
    if (isNaN(count)) return '#000000'; // 如果count不是数字，返回默认颜色
    if (count === 0) return '#17BEBB';
    if (count > 0 && count < 5) return '#eac06d';
    return '#E36397';
  };

  get data() {
    return this.context.model.getElementDataById(this.id).data;
  }

  get level() {
    return this.data.level || DEFAULT_LEVEL;
  }

  getKeyStyle(attributes) {
    return {
      ...super.getKeyStyle(attributes),
      fill: this.level === 'overview' ? statusColors[this.data.status] : '#fff',
    };
  }

  // style
  getDepartureCountPrefixStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: '离职',
      fontSize: 8,
      textAlign: 'left',
      transform: [['translate', -25, -15]],
      padding: [0, 4],
      fill: '#B7AD99',
    };
  }

  getDepartureCountStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: this.data.departure_count,
      fontSize: 8,
      textAlign: 'left',
      transform: [['translate', 0, -15]],
      padding: [0, 4],
      fill: '#fff',
      backgroundFill: this.getColorByCount(this.data.departure_count),
    };
  }

  getTotalCountLabelStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: '总数',
      fontSize: 8,
      textAlign: 'left',
      transform: [['translate', 15, -15]],
      padding: [0, 4],
      fill: '#B7AD99',
    };
  }

  getTotalCountStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: this.data.total_count,
      fontSize: 8,
      textAlign: 'left',
      transform: [['translate', 35, -15]],
      padding: [0, 4],
      fill: '#B7AD99',
    };
  }

  getDepartureRateLabelStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: '离职率',
      fontSize: 8,
      textAlign: 'left',
      transform: [['translate', 50, -15]],
      padding: [0, 4],
      fill: '#B7AD99',
    };
  }

  getDepartureRateStyle(attributes) {
    if (this.level === 'overview') return false;
    const departureCount = parseInt(this.data.departure_count, 10);
    const totalCount = parseInt(this.data.total_count, 10);
    let departureRate = totalCount > 0 ? ((departureCount / totalCount) * 100).toFixed(2) : '0';
    if (departureRate === '0.00') {
      departureRate = '0';
    } else {
      departureRate += '%';
    }
    return {
      text: departureRate,
      fontSize: 8,
      textAlign: 'left',
      transform: [['translate', 80, -15]],
      padding: [0, 4],
      fill: '#fff',
      backgroundFill: this.getColorByCount(this.data.departure_count),
    };
  }

  getBarStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      text: 'fffffff',
      fontSize: 8,
      textAlign: 'left',
      transform: 'translate(-120, 5)',
      padding: [0, 0],
      fill: '#fff',
      backgroundFill: '#B7AD99',
      radius: 0,
      // 添加边框颜色和宽度
      stroke: '#B7AD99',
      strokeWidth: 1,
    };
  }

  getTestStyle(attributes) {
    if (this.level === 'overview') return false;
    return {
      width: 100,
    }
  }

  // draw
  drawDepartureCountPrefix(attributes, container) {
    const statusStyle = this.getDepartureCountPrefixStyle(attributes);
    this.upsert('departure_count_prefix', Badge, statusStyle, container);
  }

  drawDepartureCount(attributes, container) {
    const statusStyle = this.getDepartureCountStyle(attributes);
    this.upsert('departure_count', Badge, statusStyle, container);
  }

  drawTotalCountPrefix(attributes, container) {
    const statusStyle = this.getTotalCountLabelStyle(attributes);
    this.upsert('total_count_prefix', Badge, statusStyle, container);
  }

  drawTotalCount(attributes, container) {
    const statusStyle = this.getTotalCountStyle(attributes);
    this.upsert('total_count', Badge, statusStyle, container);
  }

  drawDepartureRatePrefix(attributes, container) {
    const statusStyle = this.getDepartureRateLabelStyle(attributes);
    this.upsert('departure_rate_prefix', Badge, statusStyle, container);
  }

  drawDepartureRate(attributes, container) {
    const statusStyle = this.getDepartureRateStyle(attributes);
    this.upsert('departure_rate', Badge, statusStyle, container);
  }


  drawHorizontalBar(attributes, container) {
    const containerWidth = container.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;

    console.log('containerWidth', containerWidth);
    console.log('containerHeight', containerHeight);

    const segments = [
      { value: 40, color: '#17BEBB' },
      { value: 50, color: '#E36397' },
      { value: 70, color: '#B7AD99' },
      { value: 80, color: '#eac06d' },
    ];

    const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
    let currentX = -120;


    segments.forEach(segment => {
      // const width = (segment.value / totalValue) * 240;
      const width = segment.value;

      const style = {
        x: currentX,
        y: 15,
        width: width,
        height: 30,
        fill: segment.color,
        backgroundFill: segment.color,
      };

      this.upsert(`bar_segment_${segment.color}`, Rect, style, container);
      currentX += width;
      console.log('currentX 2', currentX);
    });
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawDepartureCountPrefix(attributes, container);
    this.drawDepartureCount(attributes, container);
    this.drawTotalCountPrefix(attributes, container);
    this.drawTotalCount(attributes, container);
    this.drawDepartureRatePrefix(attributes, container);
    this.drawDepartureRate(attributes, container);

    // 绘制横向柱形
    // this.drawHorizontalBar(attributes, container);
  }

  getLabelStyle() {
    const text = this.data.name;
    const labelStyle =
        this.level === 'overview'
            ? {
              fill: '#fff',
              fontSize: 20,
              fontWeight: 600,
              textAlign: 'center',
              transform: [['translate', 0, 0]],
            }
            : {
              fill: '#2078B4',
              fontSize: 14,
              fontWeight: 400,
              textAlign: 'left',
              transform: [['translate', -110, -15]],
            };
    return { text, ...labelStyle };
  }
}

/**
 * Implement a level of detail rendering, which will show different details based on the zoom level.
 */
class LevelOfDetail extends BaseBehavior {
  prevLevel = DEFAULT_LEVEL;
  levels = {
    ['overview']: [0, 0.6],
    ['detailed']: [0.6, Infinity],
  };

  constructor(context, options) {
    super(context, options);
    this.bindEvents();
  }

  update(options) {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  updateZoomLevel = async (e) => {
    if ('scale' in e.data) {
      const scale = e.data.scale;
      const level = Object.entries(this.levels).find(([key, [min, max]]) => scale > min && scale <= max)?.[0];
      if (level && this.prevLevel !== level) {
        const { graph } = this.context;
        graph.updateNodeData((prev) => prev.map((node) => ({ ...node, data: { ...node.data, level } })));
        await graph.draw();
        this.prevLevel = level;
      }
    }
  };

  bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
  }

  unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_TRANSFORM, this.updateZoomLevel);
  }

  destroy() {
    this.unbindEvents();
    super.destroy();
  }
}

register(ExtensionCategory.NODE, 'chart-node', ChartNode);
register(ExtensionCategory.BEHAVIOR, 'level-of-detail', LevelOfDetail);

onMounted(() => {

  const graph = new Graph({
    container: document.getElementById('container'),
    // width: window.innerWidth,
    // height: window.innerHeight,
    width: 800,
    height: 600,
    data: graphData,
    node: {
      type: 'chart-node',
      style: {
        labelPlacement: 'center',
        lineWidth: 1,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
        radius: 2,
        shadowBlur: 10,
        shadowColor: '#e0e0e0',
        shadowOffsetX: 3,
        size: [240, 60],
        stroke: '#C0C0C0',
      },
    },
    edge: {
      type: 'polyline',
      style: {
        router: {
          type: 'orth',
        },
        stroke: '#C0C0C0',
      },
    },
    layout: {
      type: 'dagre',
    },
    autoFit: 'view',
    behaviors: ['level-of-detail'],
  });
  // behaviors
  // zoom-canvas 放大缩小
  // drag-canvas 拖动

  graph.render();
});

// onMounted(() => {
//   const graph = new Graph({
//     container: document.getElementById('container'),
//     width: 800,
//     height: 600,
//     data: data.value,
//   });
//
//   graph.render();
// });
//
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
  width: 20%;
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
