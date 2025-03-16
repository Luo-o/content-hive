import echarts from './commonEcharts'

const lightTheme = {
  color: ['#2a7dae', '#50a0d0', '#81c5eb', '#b5def6'],
  textStyle: { color: '#6c6d71' },
  axis: {
    axisLine: { lineStyle: { color: '#6c6d71' } },
    splitLine: { lineStyle: { color: '#f0f0f0' } }
  },
  legend: { textStyle: { color: '#6c6d71' } },
  tooltip: {
    backgroundColor: '#fff',
    textStyle: { color: '#6c6d71' }
  },
  label: { color: '#6c6d71', fontSize: 12 },
  emphasis: { label: { color: '#333', fontSize: 14 } }
}

const darkTheme = {
  color: ['#2a7dae', '#50a0d0', '#81c5eb', '#b5def6'],
  textStyle: { color: '#fff' },
  axis: {
    axisLine: { lineStyle: { color: '#fff' } },
    splitLine: { lineStyle: { color: '#666' } }
  },
  legend: { textStyle: { color: '#fff' } },
  tooltip: {
    backgroundColor: '#2c2c2c',
    textStyle: { color: '#fff' }
  },
  label: { color: '#fff', fontSize: 12 },
  emphasis: { label: { color: '#fff', fontSize: 14 } }
}

// 注册主题
echarts.registerTheme('lightTheme', lightTheme)
echarts.registerTheme('darkTheme', darkTheme)
