<script setup>
import { ref } from 'vue'
import { artChannelsService } from '@/api/article'
const channelList = ref({})

// 从父组件v-model接收到modelValue
defineProps({
  modelValue: [Number, String] // 返回是number型，接收是string型，可以定义为 1/2
})

const emit = defineEmits(['update:modelValue']) // 将id值进行绑定，这里的选择会影响到重新渲染

// 获取文章类型
const getChannelList = async () => {
  const res = await artChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    style="width: 150px"
  >
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
<style lang="scss"></style>
