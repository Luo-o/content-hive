<script setup>
import { useUserStore } from '@/stores/index'
const useStore = useUserStore()
</script>

<template>
  <div>{{ useStore.token }}</div>
  <button>set</button>
</template>

<style scoped></style>
