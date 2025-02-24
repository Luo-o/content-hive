<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artChannelsService, artDeleteChannelService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'
// 表格加载中
const isLoding = ref()

// 获取文章分类
const channelList = ref([])
const getChannelList = async () => {
  isLoding.value = true
  const res = await artChannelsService()
  // console.log(res)
  channelList.value = res.data.data
  isLoding.value = false // 放在渲染完成后比较好
}
getChannelList() // 初始渲染

const dialog = ref() // 弹出框指定

// 添加文章分类
const onAddChannel = () => {
  dialog.value.open({})
}

// 编辑文章分类信息
const onEditChannel = (row) => {
  dialog.value.open(row)
}

// 删除文章分类信息
const onDelChannel = (row) => {
  ElMessageBox.confirm(`该操作将会删除分类 "${row.cate_name}" ，确定继续吗？`, '删除提醒', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    lockScroll: false
  })
    .then(async () => {
      await artDeleteChannelService(row.id)
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      getChannelList()
    })
    .catch(() => {})
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加类型</el-button>
    </template>
    <el-table v-loading="isLoding" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channel-edit ref="dialog" @sucess="getChannelList"></channel-edit>
  </page-container>
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
.el-message-box {
  background-color: var(--background-color) !important;
  color: var(--text-color);
}
</style>
