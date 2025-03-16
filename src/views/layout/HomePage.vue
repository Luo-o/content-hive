<script setup>
import { Document, DocumentAdd, ChatDotRound, ChatLineRound } from '@element-plus/icons-vue'
import ArticleStatisticsChart from './components/ArticleStatisticsChart.vue'
import ArticleChannelChart from './components/ArticleChannelChart.vue'
const cardList = [
  {
    title: '总文章数',
    icon: Document,
    number: 93
  },
  {
    title: '日新增文章数',
    icon: DocumentAdd,
    number: 3
  },
  {
    title: '评论总数',
    icon: ChatDotRound,
    number: 523
  },
  {
    title: '评论日增长数',
    icon: ChatLineRound,
    number: 12
  }
]
</script>
<template>
  <main>
    <el-card class="box-card">
      <el-row>
        <el-col class="card-list" :span="6" v-for="item in cardList" :key="item.title">
          <el-icon size="25">
            <component :is="item.icon" />
          </el-icon>
          <el-col style="margin-left: 10px">
            <div style="font-size: 10px">{{ item.title }}</div>
            <div style="font-size: 25px; color: var(--el-color-primary)">{{ item.number }}</div>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
    <div class="charts">
      <keep-alive>
        <el-card class="box-card-charts box-card-chart-articles">
          <article-statistics-chart></article-statistics-chart>
        </el-card>
      </keep-alive>
      <keep-alive>
        <el-card class="box-card-charts box-card-chart-channels">
          <article-channel-chart></article-channel-chart>
        </el-card>
      </keep-alive>
    </div>
  </main>
</template>
<style lang="scss" scoped>
main {
  height: 100%;
  background-color: var(--el-main-bg-color);
}
.box-card,
.box-card-charts {
  margin: 0 20px;
  background-color: var(--background-color);
  transition-property: color, border-color, box-shadow, transform !important;
  color: var(--text-color);
  border: none;
}
.box-card {
  .card-list {
    display: flex;
    align-items: center;
    padding: 10px;
    font-weight: 700;
    .el-icon {
      color: var(--el-color-primary);
      background-color: var(--el-icon-bg-color);
      padding: 10px;
      border-radius: 50%;
    }
  }
}
.charts {
  margin: 10px 0;
  display: flex;
  .box-card-chart-articles {
    width: 55%;
    margin-right: 10px;
  }
  .box-card-chart-channels {
    width: 45%;
    margin-left: 0;
  }
}
</style>
