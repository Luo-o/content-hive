import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  // 文件匹配规则
  {
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  // 忽略文件规则
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  // 全局变量配置（使用 languageOptions.globals）
  {
    languageOptions: {
      globals: {
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    }
  },

  // ESLint推荐配置
  js.configs.recommended,

  // Vue插件配置
  ...pluginVue.configs['flat/essential'],

  // Prettier跳过格式化
  skipFormatting
]
