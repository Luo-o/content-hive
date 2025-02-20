import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const useUserStore = defineStore(
  'ch-user',
  () => {
    const token = ref('')
    const setToken = (t) => {
      token.value = t
    }
    return {
      token,
      setToken
    }
  },
  {
    persist: true //持久化sessionStorage
  }
)
