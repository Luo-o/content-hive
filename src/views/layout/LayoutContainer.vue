<script setup>
import { onMounted, onUnmounted } from 'vue'
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  HomeFilled,
  Sunny,
  MoonNight
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useThemeStore, useUserStore } from '@/stores/index'
import router from '@/router'
// 初始化主题
const themeStore = useThemeStore()
onMounted(() => {
  document.documentElement.classList.toggle('dark', themeStore.isDark)
})

onUnmounted(() => {
  document.documentElement.classList.remove('dark') // 恢复默认主题
})

//获取用户基本信息进行渲染
const userStore = useUserStore()
onMounted(() => {
  userStore.getUserInfo()
})
// 处理下拉菜单点击相关指令
const handleCommand = async (command) => {
  if (command === 'logout') {
    await ElMessageBox.confirm('确定要退出登录吗？', '退出提醒', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      ElMessage({
        type: 'success',
        message: '已退出登录！'
      })
      userStore.removeToken()
      userStore.setUserInfo({})
      router.push(`/login`)
    })
  } else {
    router.push(`/user/${command}`) // 直接跳转到对应的页面
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-header>
      <div class="el-header-logo">ContentHive</div>
      <div style="position: absolute; right: 30px">
        <el-switch
          class="dark-switch"
          size="large"
          v-model="themeStore.isDark"
          :active-action-icon="MoonNight"
          :inactive-action-icon="Sunny"
          active-color="var(--el-switch-on-color)"
          inactive-color="var(--el-switch-off-color)"
          @change="themeStore.toggleDark"
        />
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo.user_pic || avatar" />
            <span style="margin-left: 10px; color: var(--text-color); cursor: default">{{
              userStore.userInfo.username
            }}</span>
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          active-text-color="#39a0ff"
          background-color="var(--background-color)"
          :default-active="$route.path"
          text-color="var(--text-color)"
          router
        >
          <el-menu-item index="/home">
            <el-icon><HomeFilled /></el-icon>
            <span>主页</span>
          </el-menu-item>
          <el-menu-item index="/article/channel">
            <el-icon><Management /></el-icon>
            <span>文章分类</span>
          </el-menu-item>
          <el-menu-item index="/article/manage">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>
          <el-sub-menu index="/user">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/profile">
              <el-icon><User /></el-icon>
              <span>基本资料</span>
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon><Crop /></el-icon>
              <span>更换头像</span>
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon><EditPen /></el-icon>
              <span>重置密码</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <div style="background-color: var(--background-color); height: 100%">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  .el-aside {
    .el-menu {
      font-weight: 700;
      border-right: none;
      --el-menu-hover-bg-color: var(--menu-hover-bg-color) !important;
      .el-menu-item {
        --el-menu-hover-bg-color: var(--menu-hover-bg-color) !important;
      }
    }
  }
  .el-header {
    display: flex;
    position: relative;
    align-items: center;
    .el-header-logo {
      width: 200px;
      font-size: 20px;
      font-weight: 700;
      color: #409eff;
    }
    .el-header-user {
      flex-grow: 4;
    }
    .dark-switch {
      margin-right: 30px;
      --el-switch-off-color: #dcdfe6 !important;
      --el-switch-on-color: #2c2c2c !important;
      transform: scale(1.1);
    }
    .el-dropdown__box {
      display: flex;
      align-items: center;
      flex-grow: 1;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }
      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-main {
    background-color: var(--el-main-bg-color);
    padding: 20px 0 0 20px;
  }
}
</style>
