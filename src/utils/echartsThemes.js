import * as echarts from 'echarts/core'

// // 定义白天主题
// const lightTheme = {
//   textStyle: {
//     color: '#6c6d71' // 全局文字颜色
//   },
//   axisLabel: {
//     color: '#6c6d71'
//   },
//   label: {
//     color: '#6c6d71'
//   }
// }

// // 定义黑夜主题
// const darkTheme = {
//   textStyle: {
//     color: '#fff' // 全局文字颜色
//   },
//   axisLabel: {
//     color: '#fff'
//   },
//   label: {
//     color: '#fff'
//   }
// }

// 白天主题
// const lightTheme = {
//   // 全局基础颜色
//   color: ['#2a7dae', '#50a0d0', '#81c5eb', '#b5def6'], // 调色盘
//   // 全局文本样式（影响标题、图例等）
//   textStyle: {
//     color: '#6c6d71' // 全局默认文字颜色
//   },
//   // 坐标轴标签
//   axisLabel: {
//     color: '#6c6d71' // X/Y 轴标签颜色
//   },
//   // 系列标签（如饼图、柱状图的数值标签）
//   series: {
//     label: {
//       color: '#6c6d71' // 控制普通状态标签颜色
//     },
//     emphasis: {
//       label: {
//         color: '#333' // 控制高亮状态标签颜色
//       }
//     }
//   },
//   // 图例
//   legend: {
//     textStyle: {
//       color: '#6c6d71' // 图例文字颜色
//     }
//   },
//   // 提示框
//   tooltip: {
//     backgroundColor: '#fff', // 背景色
//     textStyle: {
//       color: '#6c6d71' // 文字颜色
//     }
//   }
// }

// // 黑夜主题
// const darkTheme = {
//   color: ['#2a7dae', '#50a0d0', '#81c5eb', '#b5def6'],
//   textStyle: {
//     color: '#fff'
//   },
//   axisLabel: {
//     color: '#fff'
//   },
//   series: {
//     label: {
//       color: '#fff'
//     },
//     emphasis: {
//       label: {
//         color: '#fff'
//       }
//     }
//   },
//   legend: {
//     textStyle: {
//       color: '#fff'
//     }
//   },
//   tooltip: {
//     backgroundColor: '#2c2c2c',
//     textStyle: {
//       color: '#fff'
//     }
//   }
// }

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
