<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artAddArticleService,
  artEditArticleService,
  artGetArticleInfoService
} from '@/api/article'
import axios from 'axios'
import { baseURL } from '@/utils/request'
import { nextTick } from 'vue'

const visibleDrawer = ref(false)
const imageUrl = ref('')
const defaultModel = {
  // 不是ref响应式的，每一次会初始化
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const formModel = ref({
  ...defaultModel
})
const rules = {
  title: [
    { required: true, message: '标题不能为空！', trigger: 'blur' },
    { pattern: /^\S{1,30}$/, message: '请输入1~30个任意字符', trigger: 'blur' }
  ],
  cate_id: [{ required: true, message: '分类不能为空！', trigger: 'blur' }]
}

const editorRef = ref()
const open = async (row) => {
  visibleDrawer.value = true
  await nextTick() // 等待DOM更新完成=>抽屉展开后，再刷新富文本
  if (row.id) {
    // console.log(row)
    // formModel.value = { ...row } // 该语句通过row展开只能获取部分表格信息，需要通过getinfo得到详细信息
    const res = await artGetArticleInfoService(row.id)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img // 图片完整地址
    formModel.value.cover_img = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
  } else {
    formModel.value = { ...defaultModel }
    imageUrl.value = ''
    editorRef.value.setHTML('')
  }
}
defineExpose({
  // 将open方法暴露到父组件
  open
})

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

// 文章封面上传
const onUploadFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

const emit = defineEmits(['sucess'])

const onPublish = async (state) => {
  formModel.value.state = state
  const fd = new FormData() // 接口要求传入formdata格式
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key]) // 传入内容
  }
  if (formModel.value.id) {
    await artEditArticleService(fd)
    visibleDrawer.value = false
    emit('sucess', 'edit')
  } else {
    await artAddArticleService(fd)
    visibleDrawer.value = false
    emit('sucess', 'add')
  }
}
</script>
<template>
  <el-drawer v-model="visibleDrawer" title="大标题" direction="rtl" size="50%" label-width="100px">
    <el-form :model="formModel" :rules="rules">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" porp="cate_id">
        <channel-select v-model="formModel.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            v-model:content="formModel.content"
            theme="snow"
            contentType="html"
            ref="editorRef"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
