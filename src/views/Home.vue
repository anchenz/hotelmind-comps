<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2 class="welcome-title">欢迎使用组件库</h2>
    <p class="welcome-desc">
      请从左侧导航选择要测试的组件，或点击下方卡片直接访问
    </p>

    <div class="component-list">
      <h3 class="list-title">可用组件列表</h3>
      <div class="card-container">
        <div class="component-card" @click="$router.push('/button')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path
                d="M19 6H5a3 3 0 00-3 3v6a3 3 0 003 3h14a3 3 0 003-3V9a3 3 0 00-3-3zm1 9a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1h14a1 1 0 011 1v6z"
              ></path>
            </svg>
          </div>
          <div class="card-content">
            <h4>按钮组件</h4>
            <p>基础按钮组件，支持多种样式和状态</p>
          </div>
        </div>

        <div class="component-card" @click="$router.push('/splitter')">
          <div class="card-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path
                d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h7V6H4zm9 0v12h7V6h-7z"
              ></path>
            </svg>
          </div>
          <div class="card-content">
            <h4>分隔面板</h4>
            <p>可拖拽调整的分隔面板组件，支持水平和垂直布局</p>
          </div>
        </div>

        <!-- 其他组件卡片将在这里添加 -->
      </div>
    </div>

    <div class="features-section">
      <h3 class="list-title">组件库特点</h3>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">🛠️</div>
          <div class="feature-content">
            <h4>可定制性强</h4>
            <p>所有组件支持丰富的配置选项，可以根据需求进行定制</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">📱</div>
          <div class="feature-content">
            <h4>响应式设计</h4>
            <p>组件自适应不同屏幕尺寸，提供一致的用户体验</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">🎨</div>
          <div class="feature-content">
            <h4>主题定制</h4>
            <p>支持自定义主题，轻松适配不同的设计风格</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon">⚡</div>
          <div class="feature-content">
            <h4>高性能</h4>
            <p>经过优化的组件实现，确保流畅的用户交互体验</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 首页组件
</script>

<style scoped>
.home {
  padding: 0;
}

.welcome-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary, #333);
  margin-bottom: 12px;
}

.welcome-desc {
  font-size: 16px;
  color: var(--text-secondary, #666);
  margin-bottom: 30px;
}

.list-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-secondary, #555);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-primary, #eaeaea);
}

.component-list {
  margin-bottom: 40px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.component-card {
  display: flex;
  padding: 20px;
  border: 1px solid var(--border-primary, #eaeaea);
  border-radius: 8px;
  background-color: var(--bg-card, #fff);
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
}

.component-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: var(--primary-300, #91d5ff);
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(var(--primary-rgb, 24, 144, 255), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: var(--primary-500, #1890ff);
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary, #333);
}

.card-content p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary, #666);
  line-height: 1.5;
}

.features-section {
  margin-top: 20px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.feature-item {
  display: flex;
  padding: 16px;
  border-radius: 8px;
  background-color: var(--bg-card, #fff);
  border: 1px solid var(--border-primary, #eaeaea);
  align-items: flex-start;
}

.feature-icon {
  font-size: 24px;
  margin-right: 12px;
  flex-shrink: 0;
}

.feature-content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary, #333);
}

.feature-content p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary, #666);
  line-height: 1.5;
}
</style>
