<template>
  <div class="chart-box">
    <el-row>
      <span style="font-size: 16px; font-weight: 700">文章发布统计</span>
      <el-radio-group v-model="modeSelect" @change="onChangeMode">
        <el-radio value="day" size="small">日</el-radio>
        <el-radio value="month" size="small">月</el-radio>
      </el-radio-group>
    </el-row>
    <div ref="chart" class="chart-canvas"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useThemeStore } from '@/stores/index'
import '@/utils/echartsThemes'

// 获取主题状态
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// 图表相关逻辑
const chart = ref(null) // dom对象，指向dom
const currentMode = ref('day') // 当前模式：day 或 month
let chartInstance = null // 保存ECharts实例

// 生成图表数据
const chartData = computed(() => {
  const now = new Date()
  if (currentMode.value === 'day') {
    // 生成近5日数据
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date(now)
      date.setDate(now.getDate() - (4 - i))
      return {
        date: `${date.getMonth() + 1}-${date.getDate()}`, // 格式：MM-DD
        count: Math.floor(Math.random() * 5) + 1 // 随机生成文章数
      }
    })
  } else {
    // 生成近5月数据
    return Array.from({ length: 5 }, (_, i) => {
      const date = new Date(now)
      date.setMonth(now.getMonth() - (4 - i))
      return {
        date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`, // 格式：YYYY-MM
        count: Math.floor(Math.random() * 20) + 5 // 随机生成文章数
      }
    })
  }
})

// 获取图表配置
const getChartOption = () => {
  const xData = chartData.value.map((item) => item.date)
  const yData = chartData.value.map((item) => item.count)

  return {
    tooltip: {
      trigger: 'axis'
      // textStyle: {
      //   color: isDark.value ? '#fff' : '#333'
      // }
    },
    xAxis: {
      type: 'category',
      data: xData
      // axisLabel: {
      //   color: isDark.value ? '#fff' : '#333'
      // }
    },
    yAxis: {
      type: 'value',
      minInterval: 1
      // axisLabel: {
      //   color: isDark.value ? '#fff' : '#333'
      // }
    },
    series: [
      {
        name: '发表文章数',
        type: 'line',
        smooth: true,
        data: yData,
        symbol: 'circle', // 数据点显示为圆点
        symbolSize: 8,
        itemStyle: {
          color: '#409eff' // 数据点颜色
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 1)' }, // 渐变黄色
            { offset: 1, color: 'rgba(64, 158, 255, 0.4)' }
          ])
        }
      }
    ]
    // textStyle: {
    //   color: isDark.value ? '#fff' : '#333'
    // }
  }
}

// 更新图表
const updateChart = () => {
  if (chartInstance) {
    const option = getChartOption()
    chartInstance.setOption(option)
  }
}

// 切换模式
const modeSelect = ref('day')
const onChangeMode = (value) => {
  if (value === 'day') {
    currentMode.value = 'day'
  } else {
    currentMode.value = 'month'
  }
  updateChart()
}

// 初始化图表
onMounted(() => {
  chartInstance = echarts.init(chart.value, isDark.value ? 'darkTheme' : 'lightTheme')
  updateChart()
})

// 监听主题变化
watch(isDark, () => {
  if (chartInstance) {
    // 销毁当前图表并重新初始化，应用新主题
    chartInstance.dispose()
    chartInstance = echarts.init(chart.value, isDark.value ? 'darkTheme' : 'lightTheme')
    updateChart()
  }
})

// 销毁图表
onBeforeUnmount(() => {
  if (chart.value) {
    chartInstance.dispose()
  }
})
</script>

<style lang="scss" scoped>
.chart-box {
  position: relative;
  width: 100%;
  background-color: var(--background-color);
  .chart-canvas {
    width: 100%;
    height: 300px;
  }
  .el-radio-group {
    position: absolute;
    right: 10%;
  }
}
</style>
