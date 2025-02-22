import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 自己创建一个axios实例，最后将其导出进行使用
const instance = axios.create({
  baseURL, // 这里的baseURL是固定属性，不能随意进行更改
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const useUser = useUserStore()
    if (useUser.token) config.headers.Authorization = useUser.token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    if (res.data.code === 0) {
      // 不需要消息提示，请求数据成功
      // ElMessage({
      //   message: res.data.message,
      //   type: 'success'
      // })
      return res
    }
    ElMessage.error(res.data.message)
    return Promise.reject(res.data)
  },
  function (error) {
    // 对响应错误做点什么
    ElMessage.error(error.response.data.message)
    // 打印错误信息
    console.log(error)
    if (error.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
