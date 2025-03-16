import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import externalGlobals from 'rollup-plugin-external-globals'
import process from 'node:process'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    process.env.NODE_ENV === 'development' && vueDevTools(),
    visualizer(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],

  // 打包配置
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      external: ['echarts'],
      output: {
        manualChunks: {
          // 将核心库单独拆分
          vue: ['vue', 'vue-router', 'pinia']
        }
      },
      plugins: [
        externalGlobals({
          echarts: 'echarts'
        })
      ]
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        pure_funcs: ['console.log'] // 删除 console 代码
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
