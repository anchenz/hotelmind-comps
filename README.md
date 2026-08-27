# TourmindAI Components

TourmindAI 组件库 - 基于 Vue 3 的现代化组件库

## 特性

- 🎨 主题系统：CSS Variables 动态主题
- 📦 按需引入：组件自包含样式，开箱即用
- 🔧 TypeScript：类型定义支持
- 🌗 深色模式：内置深色主题
- 📱 响应式：移动端友好

## 安装

```bash
npm install @tourmindai/components
```

## 快速开始

### 1) 引入主题变量（必须）

```javascript
// main.js
import "@tourmindai/components/styles/theme";
```

### 2) 使用组件（样式自动包含）

- 全局注册：

```javascript
import { createApp } from "vue";
import Components from "@tourmindai/components";
import "@tourmindai/components/styles/theme";

const app = createApp(App);
app.use(Components);
app.mount("#app");
```

- 按需引入：

```javascript
import "@tourmindai/components/styles/theme"; // 入口处引入一次即可
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";
```

```vue
<template>
  <TmSplitter layout="horizontal" :initial-sizes="['30%', '70%']">
    <TmSplitterPanel>左侧</TmSplitterPanel>
    <TmSplitterPanel>右侧</TmSplitterPanel>
  </TmSplitter>
</template>
```

### 3) 一次性引入（替代方案）

```javascript
// 包含主题变量 + 全部组件样式
import "@tourmindai/components/styles/all";
import { TmSplitter } from "@tourmindai/components";
```

## 主题定制

- 使用默认主题（推荐）

```javascript
import "@tourmindai/components/styles/theme";
```

- 使用自定义主题（不引入默认主题）

```javascript
// import "@tourmindai/components/styles/theme"; // 不引入默认主题
import "./my-custom-theme.css"; // 提供完整的变量集合
```

```css
/* my-custom-theme.css */
:root {
  --primary-500: #1677ff;
  --bg-surface: #ffffff;
  --border-primary: rgba(0, 0, 0, 0.12);
  --text-primary: rgba(0, 0, 0, 0.87);
}

[data-theme="dark"] {
  --bg-surface: #1e1e1e;
  --border-primary: rgba(255, 255, 255, 0.12);
  --text-primary: rgba(255, 255, 255, 0.87);
}
```

- 仅组件样式 + 自定义主题（兼容用法）

```javascript
import "@tourmindai/components/styles/components"; // 只包含组件样式
import "./my-complete-theme.css"; // 自行提供完整主题变量
```

## Hooks

可以从子路径导入内置 Hooks：

```javascript
import { useSplitterPersistence } from "@tourmindai/components/hooks";
```

## 组件列表

- TmSplitter - 分隔面板组件
  - 水平/垂直布局，拖拽调整，最小/最大限制
- TmSplitterPanel - 分隔面板子组件

## 开发

```bash
npm install
npm run dev
npm run build
```

## 样式导出清单（来自 package.json#exports）

- `@tourmindai/components/styles/components`：仅组件样式汇总 CSS
- `@tourmindai/components/styles/all`：主题 + 全量组件样式 CSS
- `@tourmindai/components/styles/theme`：仅主题变量 CSS
- `@tourmindai/components/hooks`：Hooks 入口（ES 模块）

## 许可证

MIT License
