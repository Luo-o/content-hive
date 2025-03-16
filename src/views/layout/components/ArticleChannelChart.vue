<template>
  <span style="font-weight: 700">文章类别统计</span>
  <div ref="chart" class="pie-chart"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'

import echarts from '@/utils/commonEcharts'
import { useThemeStore } from '@/stores/index'
import '@/utils/echartsThemes'

// 获取主题状态
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// 图表容器
const chart = ref(null)
let chartInstance = null

// 饼图数据
const pieData = [
  { name: '前端开发', value: 40 },
  { name: '后端开发', value: 35 },
  { name: '数据科学', value: 15 },
  { name: '人工智能', value: 10 }
]

// 饼图颜色（蓝色渐变色）
const colors = ['#2a7dae', '#50a0d0', '#81c5eb', '#b5def6']

// 获取图表配置
const getChartOption = () => {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark.value ? '#2c2c2c' : '#ffffff', // 背景色
      textStyle: {
        color: isDark.value ? '#ffffff' : '#333333' // 文字色
      }
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      textStyle: {
        fontSize: 10,
        color: isDark.value ? '#fff' : '#333' // 动态文本色
      }
    },
    series: [
      {
        name: '文章类型',
        type: 'pie',
        radius: '50%',
        data: pieData,
        itemStyle: {
          color: (params) => colors[params.dataIndex % colors.length] // 按索引分配颜色
        },
        label: {
          // 添加常规状态标签样式
          show: true,
          fontSize: 12,
          color: isDark.value ? '#ffffff' : '#333333' // 动态标签颜色
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold',
            color: isDark.value ? '#ffffff' : '#333333' // 高亮标签颜色
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

// 初始化图表
onMounted(() => {
  chartInstance = echarts.init(chart.value, isDark.value ? 'darkTheme' : 'lightTheme')
  chartInstance.setOption(getChartOption())
})

// 监听主题变化
watch(isDark, () => {
  if (chartInstance) {
    // chartInstance.dispose()
    // chartInstance = echarts.init(chart.value, isDark.value ? 'darkTheme' : 'lightTheme')
    chartInstance.setOption(getChartOption())
  }
})

// 销毁图表
onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
})
</script>

<style scoped>
.pie-chart {
  width: 100%;
  height: 300px;
  margin-top: 2px;
}
</style>
