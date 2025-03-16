<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { userRegisterRequest, userLoginRequest } from '@/api/user'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'
const isRegister = ref(false)

// form-model绑定表单的数据项, 可以进行共用
const ruleForm = ref({
  username: '',
  password: '',
  repassword: ''
})

// 为表单数据项设置规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 12, message: '用户名长度需要为5~12位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { pattern: /^\S{6,20}$/, message: '密码长度需要为6~20位非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { pattern: /^\S{6,20}$/, message: '密码长度需要为6~20位非空字符', trigger: 'blur' },
    {
      validator: (rules, value, callback) => {
        // 自定义规则，三个形参
        if (value !== ruleForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback() // 无论正确与否都需要callback
        }
      },
      trigger: 'blur'
    }
  ]
})

// 对表单进行绑定获取
const form = ref()

const register = async () => {
  await form.value.validate() // 注册前预校验
  await userRegisterRequest(ruleForm.value) // 随时要注意响应式数据需要传入value！
  ElMessage.success('注册成功!')

  isRegister.value = false
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate() // 登录预校验
  const res = await userLoginRequest(ruleForm.value) // 返回post结果，得到token

  ElMessage.success('登录成功!')

  // console.log(res)
  userStore.setToken(res.data.token) // 存token到pinia

  router.push('/') // 路由跳转到主页面
}

// watch监听isRegister变量变化， 每次将表单进行清空
watch(isRegister, () => {
  ruleForm.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="8" :offset="8" class="form">
      <transition name="slide" mode="out-in">
        <el-form
          :model="ruleForm"
          :rules="rules"
          key="register"
          ref="form"
          size="large"
          autocomplete="off"
          v-if="isRegister"
        >
          <el-form-item>
            <h1 class="title">注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              v-model="ruleForm.repassword"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入再次密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="register" class="button" type="primary" auto-insert-space>
              注册
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false"> 返回登录 </el-link>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm"
          :rules="rules"
          key="login"
          ref="form"
          size="large"
          autocomplete="off"
          v-else
        >
          <el-form-item>
            <h1 class="title">ContentHive管理平台</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              name="password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" class="button" type="primary" auto-insert-space
              >登录</el-button
            >
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true"> 前往注册 </el-link>
          </el-form-item>
        </el-form>
      </transition>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  // height: 100vh;
  // align-items: center;
  // background: url('@/assets/login_bg.jpg') no-repeat center / cover;
  .form {
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // height: 70%;
    // user-select: none;
    // background-color: #fff;
    // padding: 10px 20px;
    // border-radius: 10px;
    // overflow: hidden;
    .title {
      margin: 10px auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.5s ease;
  }

  .slide-enter-from {
    transform: translateX(120%);
  }

  .slide-leave-to {
    transform: translateX(120%);
  }
}
</style>
