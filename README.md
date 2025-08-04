# TourmindAI Components

TourmindAI 组件库 - 基于 Vue 3 的现代化组件库

## 特性

- 🎨 **主题系统** - 基于 CSS Variables 的动态主题解决方案
- 📦 **按需引入** - 支持组件级别的按需引入，样式自动集成
- 🔧 **TypeScript** - 完整的 TypeScript 类型定义
- 🌗 **深色模式** - 内置深色主题支持
- 📱 **响应式** - 移动端友好的响应式设计

## 安装

```bash
npm install @tourmindai/components
```

## 快速开始

### 1. 引入主题变量（必须）

在使用组件前，**必须**先引入主题变量：

```javascript
// main.js
import "@tourmindai/components/theme";
```

### 2. 全局引入

```javascript
// main.js
import { createApp } from "vue";
import Components from "@tourmindai/components";
import "@tourmindai/components/theme"; // 主题变量

const app = createApp(App);
app.use(Components); // 组件自动包含样式
app.mount("#app");
```

### 3. 按需引入

```javascript
// 组件文件
import "@tourmindai/components/theme"; // 主题变量（全局引入一次即可）
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";
```

```vue
<template>
  <TmSplitter layout="horizontal" :initial-sizes="['30%', '70%']">
    <TmSplitterPanel>
      <div>左侧面板内容</div>
    </TmSplitterPanel>
    <TmSplitterPanel>
      <div>右侧面板内容</div>
    </TmSplitterPanel>
  </TmSplitter>
</template>
```

### 4. 替代方案（一次性引入）

如果你偏好传统的一次性引入方式：

```javascript
// 引入完整样式包（包含主题变量+组件样式）
import "@tourmindai/components/styles/all"; // 6.47 kB
import { TmSplitter } from "@tourmindai/components";
```

## 主题定制

你可以使用自定义主题替换默认主题：

```javascript
// 不引入默认主题
// import "@tourmindai/components/theme"; ❌

// 引入自定义主题（需要提供相同的CSS变量）
import "./my-custom-theme.css"; ✅

import { TmSplitter } from "@tourmindai/components";
```

## 组件列表

- **TmSplitter** - 分隔面板组件

  - 支持水平和垂直布局
  - 可拖拽调整面板大小
  - 支持最小/最大尺寸限制

  - 多种样式变体
  - 支持禁用状态
  - 自定义主题色

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 版本历史

### v1.0.12

- ✨ 样式集成：组件引入时自动包含样式
- 🎨 主题分离：主题变量独立导出
- 📝 更新文档：新的使用方式说明

## 许可证

MIT License
