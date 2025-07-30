<!-- src/views/App.vue -->
<template>
  <div class="app-container">
    <div class="app-layout">
      <!-- 左侧侧边栏 -->
      <div class="sidebar">
        <h3>组件导航</h3>
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/button" class="nav-item">按钮组件</router-link>
          <router-link to="/splitter" class="nav-item">分隔面板</router-link>
        </nav>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
// 主应用组件
</script>

<style scoped>
.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.app-layout {
  display: flex;
  border: 1px solid var(--border-primary, #eaeaea);
  border-radius: 8px;
  min-height: 700px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.sidebar {
  width: 220px;
  padding: 25px 20px;
  background-color: var(--bg-card, #f9f9f9);
  border-right: 1px solid var(--border-primary, #eaeaea);
}

.sidebar h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-secondary, #666);
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-primary, #eaeaea);
}

.nav-menu {
  display: flex;
  flex-direction: column;
}

.nav-item {
  margin-bottom: 12px;
  padding: 10px 15px;
  text-decoration: none;
  color: var(--text-primary, #333);
  border-radius: 6px;
  transition: all 0.3s;
  font-size: 14px;
}

.nav-item:hover {
  background-color: var(--bg-hover, #e6f7ff);
  color: var(--primary-500, #1890ff);
}

.nav-item.router-link-active {
  color: var(--primary-500, #1890ff);
  font-weight: 500;
  background-color: var(--bg-hover, #e6f7ff);
  position: relative;
}

.nav-item.router-link-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--primary-500, #1890ff);
  border-radius: 0 3px 3px 0;
}

.content {
  flex: 1;
  padding: 25px;
  overflow: auto;
  background-color: #fff;
}
</style>
