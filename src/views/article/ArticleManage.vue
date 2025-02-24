<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetManageService, artDeleteArticleService } from '@/api/article'
import ChannelSelect from './components/ChannelSelect.vue'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessageBox } from 'element-plus'
// 表格加载中
const isLoding = ref()

// 搜索内容
const formSearchModel = ref({
  cate_name: '',
  state: ''
})
const rules = {
  cate_name: [{ required: true, message: '请选择文章类型', trigger: 'change' }],
  state: [{ required: true, message: '请选择文章当前状态', trigger: 'change' }]
}

const params = ref({
  // 定义params对象用于获取文章列表
  pagenum: 1,
  pagesize: 4,
  cate_id: '', // 与选择器绑定，查询时可以利用其渲染
  state: ''
})

const articleList = ref([])
const total = ref(0)
const getAticleList = async () => {
  isLoding.value = true
  const res = await artGetManageService(params.value)
  console.log(res)
  articleList.value = res.data.data
  total.value = res.data.total
  isLoding.value = false
}

getAticleList()

// 分页处理函数
const onSizeChange = (size) => {
  // 处理每页数据量
  params.value.pagesize = size
  getAticleList()
}

const onCurrentChange = (page) => {
  // 处理当前页数
  params.value.pagenum = page
  getAticleList()
}

// 搜索函数
const onSearch = () => {
  params.value.pagenum = 1
  getAticleList()
}

const onReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  getAticleList()
}

const articleEditRef = ref()
const onAddArticle = () => {
  articleEditRef.value.open({})
}

// 编辑文章内容
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

// 删除文章内容
const onDelArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(() => {
      artDeleteArticleService(row.id)
      ElMessage({ type: 'success', message: '删除成功' })
      getAticleList()
    })
    .catch(() => {})
}

const OnEditSucess = (type) => {
  if (type === 'add') {
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
  }
  getAticleList()
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <el-form :model="formSearchModel" :rules="rules" inline>
      <el-form-item label="文章分类：" prop="formSearchModel.cate_name">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：" prop="formSearchModel.state">
        <el-select style="width: 150px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="isLoding" :data="articleList" height="275px" style="width: 100%">
      <el-table-column label="文章标题" width="150" prop="title"> </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      :background="true"
      size="small"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
  </page-container>
  <article-edit ref="articleEditRef" @sucess="OnEditSucess"></article-edit>
</template>

<style lang="scss" scoped>
.el-table {
  background-color: var(--background-color);
  --el-table-header-bg-color: var(--background-color) !important;
  --el-table-border-color: var(--el-main-bg-color) !important;
  --el-table-tr-bg-color: var(--background-color);
  --el-table-text-color: var(--text-color);
  --el-table-header-text-color: var(--text-color);
  --el-table-row-hover-bg-color: var(--table-hover-bg-color);
}
.el-form {
  --el-text-color-regular: var(--text-color);
  .el-button {
    --el-text-color-regular: #6c6d71;
  }
}
</style>
