import { createApp } from 'vue'
// 从全局变量获取
// const { createApp } = window.Vue

import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'

import '@/assets/styles/main.scss'
import 'element-plus/theme-chalk/dark/css-vars.css' // 官方暗黑模式变量
import '@/assets/styles/theme.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
