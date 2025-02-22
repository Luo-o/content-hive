import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfoRequest } from '@/api/user'

// 用户模块： id, 具体内容， 持久化
export const useUserStore = defineStore(
  'ch-user',
  () => {
    // 获取token部分：用于验证登录
    const token = ref('')
    const setToken = (t) => {
      token.value = t
    }
    const removeToken = () => {
      token.value = ''
    }

    // 获取用户信息部分：用于渲染
    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await userInfoRequest()
      userInfo.value = res.data.data
      // console.log(res)
    }
    const setUserInfo = (newInfo) => {
      userInfo.value = newInfo
    }

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true //持久化sessionStorage
  }
)
