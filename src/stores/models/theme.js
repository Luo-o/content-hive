// const { defineStore } = window.Pinia
import { defineStore } from 'pinia'
// const { ref } = window.Vue
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const isDark = ref(false)
    const toggleDark = () => {
      document.documentElement.classList.toggle('dark', isDark.value)
    }
    return {
      isDark,
      toggleDark
    }
  },
  {
    persist: true
  }
)
