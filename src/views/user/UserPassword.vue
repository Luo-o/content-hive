<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import PageContainer from '@/components/PageContainer.vue'
import { userPasswordUpdateService } from '@/api/user'
// 表单数据
const formModel = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 表单引用（用于手动校验）
const formRef = ref()

// 自定义校验规则
const validateSameAsOld = (rule, value, callback) => {
  if (value === formModel.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

const validateSameAsNew = (rule, value, callback) => {
  if (value !== formModel.value.new_pwd) {
    callback(new Error('两次输入的新密码不一致'))
  } else {
    callback()
  }
}

// 表单校验规则
const rules = reactive({
  old_pwd: [
    { required: true, message: '原密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' },
    { validator: validateSameAsOld, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    { validator: validateSameAsNew, trigger: 'blur' }
  ]
})

// 重置表单
const handleReset = () => {
  formModel.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}

// 提交处理
const handleSubmit = async () => {
  try {
    // 手动触发表单校验
    await formRef.value.validate()
    // 这里添加实际提交逻辑
    await userPasswordUpdateService(formModel.value)
    ElMessage.success('上传成功！')
    handleReset()
  } catch (error) {
    console.log(error)
    ElMessage.error('请检查表单填写')
  }
}
</script>

<template>
  <page-container title="重置密码">
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      class="password-form"
    >
      <!-- 原密码 -->
      <el-form-item label="原密码" prop="old_pwd">
        <el-input
          v-model="formModel.old_pwd"
          type="password"
          show-password
          placeholder="请输入原密码"
        />
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item label="新密码" prop="new_pwd">
        <el-input
          v-model="formModel.new_pwd"
          type="password"
          show-password
          placeholder="请输入新密码"
        />
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input
          v-model="formModel.re_pwd"
          type="password"
          show-password
          placeholder="请再次输入新密码"
        />
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">修改密码</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped>
.password-form {
  width: 500px;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-button + .el-button {
  margin-left: 15px;
}
</style>
