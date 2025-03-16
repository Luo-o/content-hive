import { createPinia } from 'pinia'
// const { createPinia } = window.Pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 强制禁用 DevTools
// pinia.use(() => ({ $env: 'production' }))
// pinia独立维护
export default pinia

export * from './models/user'
export * from './models/theme'
