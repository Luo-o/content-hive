<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>
<template>
  <el-card class="page-container" shadow="never">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 具名插槽放按钮等 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 默认插槽可以实现主体的多样性，给予子组件发展空间 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
* {
  border: 0;
}
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  color: var(--text-color);
  background-color: transparent;
  border-radius: 2px;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-weight: 700;
    }
  }
}
:deep(.el-card__header) {
  border-bottom: 2px solid var(--el-main-bg-color) !important;
}
</style>
