<script setup>
// const { ref } = window.Vue
import { ref } from 'vue'
import { useUserStore } from '@/stores/index'
import PageContainer from '@/components/PageContainer.vue'
import { userInfoUpdateService, userInfoRequest } from '@/api/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

// 表单数据
const form = ref({
  id: userStore.userInfo.id,
  username: userStore.userInfo.username, // 默认禁用值
  nickname: userStore.userInfo.nickname,
  email: userStore.userInfo.email
})

// 表单校验规则
const rules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    {
      min: 2,
      max: 10,
      message: '长度在2到10个字符',
      trigger: ['blur', 'change']
    },
    {
      pattern: /^\S+$/,
      message: '不能包含空格',
      trigger: ['blur', 'change']
    }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ]
}

// 表单引用
const formRef = ref()

const getUser = async () => {
  await userInfoRequest()
}
// 提交处理
const handleSubmit = async () => {
  formRef.value.validate()
  await userInfoUpdateService(form.value)
  await getUser()
  ElMessage.success('信息更新成功！')
}
</script>

<template>
  <page-container title="个人中心">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" size="default">
      <!-- 登录名称（禁用） -->
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="form.username" disabled />
      </el-form-item>

      <!-- 用户昵称 -->
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入2-10位昵称" clearable />
      </el-form-item>

      <!-- 用户邮箱 -->
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" clearable />
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped>
.el-form {
  width: 500px;
}
.el-form-item {
  margin-bottom: 22px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 700;
  }
}
</style>
