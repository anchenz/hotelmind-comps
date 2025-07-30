# 使用示例

## 1. 创建新的 Vue3 + Vite 项目

```bash
npm create vue@latest my-project
cd my-project
npm install
```

## 2. 安装组件库

```bash
npm install @tourmindai/components
```

## 3. 配置 main.js

### 方式一：全局引入（推荐）

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import TourmindComponents from "@tourmindai/components";
import "@tourmindai/components/style"; // 引入样式

const app = createApp(App);
app.use(TourmindComponents);
app.mount("#app");
```

### 方式二：按需引入

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { MyButton, TmSplitter, TmSplitterPanel } from "@tourmindai/components";
import "@tourmindai/components/style"; // 引入样式

const app = createApp(App);

// 注册单个组件
app.component("MyButton", MyButton);
app.component("TmSplitter", TmSplitter);
app.component("TmSplitterPanel", TmSplitterPanel);

app.mount("#app");
```

## 4. 在组件中使用

### App.vue 示例

```vue
<template>
  <div class="app">
    <h1>TourMind Components 使用示例</h1>

    <!-- 按钮组件示例 -->
    <section class="demo-section">
      <h2>按钮组件</h2>
      <div class="button-demo">
        <MyButton
          label="主要按钮"
          variant="primary"
          @click="handlePrimaryClick"
        />
        <MyButton
          label="次要按钮"
          variant="secondary"
          @click="handleSecondaryClick"
        />
        <MyButton
          label="危险按钮"
          variant="danger"
          @click="handleDangerClick"
        />
      </div>
    </section>

    <!-- 分割器组件示例 -->
    <section class="demo-section">
      <h2>分割器组件</h2>

      <!-- 水平分割器 -->
      <div class="splitter-demo">
        <h3>水平分割器</h3>
        <TmSplitter
          layout="horizontal"
          :initial-sizes="['200px', '300px']"
          @resize-start="onResizeStart"
          @resize="onResize"
          @resize-end="onResizeEnd"
        >
          <TmSplitterPanel size="200px" min="100px" max="400px">
            <div class="panel-content">
              <h4>左侧面板</h4>
              <p>这是左侧面板的内容，可以调整大小。</p>
              <p>最小宽度：100px，最大宽度：400px</p>
            </div>
          </TmSplitterPanel>
          <TmSplitterPanel size="300px" min="150px">
            <div class="panel-content">
              <h4>右侧面板</h4>
              <p>这是右侧面板的内容。</p>
              <p>最小宽度：150px</p>
            </div>
          </TmSplitterPanel>
        </TmSplitter>
      </div>

      <!-- 垂直分割器 -->
      <div class="splitter-demo">
        <h3>垂直分割器</h3>
        <TmSplitter
          layout="vertical"
          :initial-sizes="['150px', '200px']"
          style="height: 300px;"
        >
          <TmSplitterPanel size="150px" min="80px" max="250px">
            <div class="panel-content">
              <h4>上方面板</h4>
              <p>这是上方面板的内容。</p>
              <p>最小高度：80px，最大高度：250px</p>
            </div>
          </TmSplitterPanel>
          <TmSplitterPanel size="200px" min="100px">
            <div class="panel-content">
              <h4>下方面板</h4>
              <p>这是下方面板的内容。</p>
              <p>最小高度：100px</p>
            </div>
          </TmSplitterPanel>
        </TmSplitter>
      </div>
    </section>
  </div>
</template>

<script setup>
// 如果使用按需引入，需要在这里导入组件
// import { MyButton, TmSplitter, TmSplitterPanel } from '@tourmindai/components'

// 按钮事件处理
const handlePrimaryClick = () => {
  console.log("主要按钮被点击");
  alert("主要按钮被点击了！");
};

const handleSecondaryClick = () => {
  console.log("次要按钮被点击");
  alert("次要按钮被点击了！");
};

const handleDangerClick = () => {
  console.log("危险按钮被点击");
  if (confirm("确定要执行危险操作吗？")) {
    alert("危险操作已执行！");
  }
};

// 分割器事件处理
const onResizeStart = (index, sizes) => {
  console.log("开始调整大小:", index, sizes);
};

const onResize = (index, sizes) => {
  console.log("调整大小中:", index, sizes);
};

const onResizeEnd = (index, sizes) => {
  console.log("结束调整大小:", index, sizes);
};
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.demo-section h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.button-demo {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.splitter-demo {
  margin-bottom: 30px;
}

.splitter-demo h3 {
  margin-bottom: 15px;
  color: #555;
}

.panel-content {
  padding: 15px;
  height: 100%;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.panel-content h4 {
  margin-top: 0;
  color: #333;
}

.panel-content p {
  margin: 8px 0;
  color: #666;
  line-height: 1.5;
}
</style>
```

## 5. Vite 配置（可选）

如果你遇到构建问题，可以在 `vite.config.js` 中添加配置：

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["@tourmindai/components"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

## 6. 运行项目

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

## 7. 常见问题

### 样式不生效

确保在 `main.js` 中引入了样式文件：

```javascript
import "@tourmindai/components/style";
```

### 组件未定义

如果使用按需引入，确保在组件中正确导入：

```javascript
import { MyButton, TmSplitter, TmSplitterPanel } from "@tourmindai/components";
```

### 构建错误

检查 Vue 版本是否为 3.x，组件库只支持 Vue 3。

## 8. 更多示例

### 动态调整分割器大小

```vue
<template>
  <div>
    <TmSplitter layout="horizontal" ref="splitterRef">
      <TmSplitterPanel :size="leftSize" @update:size="updateLeftSize">
        <div>左侧面板 ({{ leftSize }})</div>
      </TmSplitterPanel>
      <TmSplitterPanel :size="rightSize" @update:size="updateRightSize">
        <div>右侧面板 ({{ rightSize }})</div>
      </TmSplitterPanel>
    </TmSplitter>

    <div class="controls">
      <button @click="resetSizes">重置大小</button>
      <button @click="swapSizes">交换大小</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";

const leftSize = ref("200px");
const rightSize = ref("300px");
const splitterRef = ref(null);

const updateLeftSize = (size) => {
  leftSize.value = size;
};

const updateRightSize = (size) => {
  rightSize.value = size;
};

const resetSizes = () => {
  leftSize.value = "200px";
  rightSize.value = "300px";
};

const swapSizes = () => {
  const temp = leftSize.value;
  leftSize.value = rightSize.value;
  rightSize.value = temp;
};
</script>
```

这个示例展示了如何在第三方 Vue3+Vite 项目中完整地使用你的组件库。
