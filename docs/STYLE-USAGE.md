# 样式使用指南

本文档详细说明了 `@tourmindai/components` 的样式系统和使用方式。

## 📋 目录

- [概述](#概述)
- [新版本使用方式](#新版本使用方式-v1012)
- [主题定制](#主题定制)
- [最佳实践](#最佳实践)
- [迁移指南](#迁移指南)

## 概述

**v1.0.12** 版本进行了重大更新，实现了**样式自动集成**：

### ✨ 新特性

- **🎯 自动集成**: 组件引入时自动包含样式
- **🎨 主题分离**: 主题变量独立导出
- **📦 简化使用**: 用户体验大幅提升
- **🔧 灵活定制**: 支持完全自定义主题

### 🗑️ 移除功能

- 不再单独导出组件样式文件
- 简化了 package.json 的 exports 配置

## 新版本使用方式 (v1.0.12+)

### 1. 基本使用

```javascript
// 第1步：引入主题变量（必须）
import "@tourmindai/components/theme";

// 第2步：引入组件（样式自动包含）
import { TmSplitter, MyButton } from "@tourmindai/components";
```

### 2. 全局引入

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";

// 引入主题
import "@tourmindai/components/theme";

// 引入组件库
import Components from "@tourmindai/components";

const app = createApp(App);
app.use(Components); // 所有组件样式自动包含
app.mount("#app");
```

### 3. 按需引入

```javascript
// 任意组件文件
import "@tourmindai/components/theme"; // 全局引入一次即可
import { TmSplitter } from "@tourmindai/components";
```

## 主题定制

### 使用默认主题

```javascript
// 引入默认主题
import "@tourmindai/components/theme";
import { TmSplitter } from "@tourmindai/components";
```

### 使用自定义主题

```javascript
// 不引入默认主题
// import "@tourmindai/components/theme"; ❌

// 引入自定义主题
import "./my-theme.css"; ✅
import { TmSplitter } from "@tourmindai/components";
```

```css
/* my-theme.css */
:root {
  /* 必需的CSS变量 */
  --primary-500: #1677ff;
  --bg-surface: #ffffff;
  --border-primary: rgba(0, 0, 0, 0.12);
  --text-primary: rgba(0, 0, 0, 0.87);

  /* 组件特定变量 */
  --button-bg: var(--primary-500);
  --button-text: #ffffff;
  --button-hover: #1976d2;

  /* 更多变量... */
}

/* 深色模式 */
[data-theme="dark"] {
  --primary-500: #1677ff;
  --bg-surface: #1e1e1e;
  --border-primary: rgba(255, 255, 255, 0.12);
  --text-primary: rgba(255, 255, 255, 0.87);
}
```

### 主题切换

```javascript
// 切换到深色模式
document.documentElement.setAttribute("data-theme", "dark");

// 切换到浅色模式
document.documentElement.removeAttribute("data-theme");
```

## 最佳实践

### 1. 项目组织

```javascript
// src/main.js - 应用入口
import "@tourmindai/components/theme"; // 全局引入主题
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

```vue
<!-- src/components/MyComponent.vue -->
<template>
  <TmSplitter layout="horizontal">
    <TmSplitterPanel>Panel 1</TmSplitterPanel>
    <TmSplitterPanel>Panel 2</TmSplitterPanel>
  </TmSplitter>
</template>

<script setup>
// 直接使用组件，样式自动生效
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";
</script>
```

### 2. 自定义主题项目

```javascript
// src/styles/theme.css - 自定义主题
:root {
  --primary-500: #0066cc; /* 品牌色 */
  --border-radius-base: 8px; /* 圆角 */
  /* 其他自定义变量 */
}
```

```javascript
// src/main.js
import "./styles/theme.css"; // 自定义主题
// import "@tourmindai/components/theme"; // 不引入默认主题

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

### 3. 混合主题（默认 + 自定义）

```javascript
// src/main.js
import "@tourmindai/components/theme"; // 默认主题作为基础
import "./styles/custom-overrides.css"; // 覆盖部分变量

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

```css
/* src/styles/custom-overrides.css */
:root {
  /* 只覆盖需要修改的变量 */
  --primary-500: #ff6b35;
  --border-radius-base: 12px;
}
```

## 迁移指南

### 从 v1.0.11 迁移到 v1.0.12+

#### 旧版本 (v1.0.11)

```javascript
// 需要手动引入每个组件的样式
import "@tourmindai/components/styles/theme";
import "@tourmindai/components/styles/button";
import "@tourmindai/components/styles/tm-splitter";
import { MyButton, TmSplitter } from "@tourmindai/components";
```

#### 新版本 (v1.0.12+)

```javascript
// 只需引入主题，组件样式自动包含
import "@tourmindai/components/theme";
import { MyButton, TmSplitter } from "@tourmindai/components";
```

### 迁移步骤

1. **移除单独的组件样式引入**：

   ```javascript
   // 删除这些行
   import "@tourmindai/components/styles/button";
   import "@tourmindai/components/styles/tm-splitter";
   ```

2. **更新主题引入方式**：

   ```javascript
   // 旧的
   import "@tourmindai/components/styles/theme";

   // 新的
   import "@tourmindai/components/theme";
   ```

3. **验证功能**：
   - 确保组件样式正常显示
   - 确保主题切换功能正常
   - 确保自定义主题仍然生效

### 常见问题

#### Q: 组件样式没有生效？

A: 确保已经引入了主题变量：

```javascript
import "@tourmindai/components/theme"; // 必须先引入
import { TmSplitter } from "@tourmindai/components";
```

#### Q: 可以只使用自定义主题吗？

A: 可以，但需要提供所有必需的 CSS 变量：

```javascript
import "./my-complete-theme.css"; // 包含所有必需变量
import { TmSplitter } from "@tourmindai/components";
```

#### Q: 样式会污染全局吗？

A: 所有样式都使用了严格的组件前缀（如 `tm-splitter`），污染风险很低。

## 💡 提示

- 🎯 **简化使用**: 新版本大大简化了使用方式
- 🎨 **主题优先**: 主题变量是使用组件的前提
- 📦 **自动集成**: 组件样式无需手动管理
- 🔧 **完全控制**: 支持完全自定义主题

如有其他问题，请查阅 [完整文档](./README.md) 或提交 Issue。
