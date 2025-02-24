<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false) // 弹窗显示控制
const open = (row) => {
  // 父组件点击触发 open方法
  console.log(row)
  formModel.value = { ...row } // 将row传过来的数据进行展开
  dialogVisible.value = true
}

// 暴露open方法 => 父组件传入相关参数
defineExpose({
  open
})

// 双向绑定表单
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
// 定义规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名必须是1~10位非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1~15位字母数字', trigger: 'blur' }
  ]
}
// ref指定表单元素
const formRef = ref()

const emit = defineEmits(['sucess']) // 通过父组件进行回显
const onSubmit = async () => {
  await formRef.value.validate() // 表单预校验
  formModel.value.id
    ? await artEditChannelService(formModel.value)
    : await artAddChannelService(formModel.value)
  ElMessage.success(formModel.value.id ? '编辑成功！' : '添加成功！')
  dialogVisible.value = false
  emit('sucess')
}
</script>
<template>
  <el-dialog
    draggable
    align-center
    :lock-scroll="false"
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules" label-width="auto">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss">
.el-dialog {
  background-color: var(--background-color);
}
.el-form-item__label,
.el-dialog__title {
  color: var(--text-color) !important;
}
</style>
