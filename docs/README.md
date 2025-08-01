# @tourmindai/components 完整文档

TourmindAI 组件库 - 基于 Vue 3 的现代化组件库

## 📋 目录

- [安装](#📦-安装)
- [快速开始](#🚀-快速开始)
- [组件文档](#📋-组件文档)
- [主题定制](#🎯-主题定制)
- [配置说明](#🛠️-配置说明)
- [构建输出](#📦-构建输出)
- [注意事项](#⚠️-注意事项)
- [开发指南](#🔧-开发)
- [更新日志](#📝-更新日志)

## 📦 安装

```bash
npm install @tourmindai/components
```

## 🚀 快速开始

### 1. 引入主题变量（必须）

**⚠️ 重要：** 在使用任何组件前，必须先引入主题变量：

```javascript
// main.js
import "@tourmindai/components/theme";
```

### 2. 全局引入（推荐）

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import TourmindComponents from "@tourmindai/components";
import "@tourmindai/components/theme"; // 主题变量

const app = createApp(App);
app.use(TourmindComponents); // 组件自动包含样式
app.mount("#app");
```

### 3. 按需引入

```javascript
// main.js 或组件文件
import "@tourmindai/components/theme"; // 主题变量（全局引入一次即可）
import { MyButton, TmSplitter, TmSplitterPanel } from "@tourmindai/components";

const app = createApp(App);
app.component("MyButton", MyButton);
app.component("TmSplitter", TmSplitter);
app.component("TmSplitterPanel", TmSplitterPanel);
app.mount("#app");
```

### 4. 在组件中使用

```vue
<template>
  <div>
    <!-- 按钮组件 -->
    <MyButton label="点击我" variant="primary" @click="handleClick" />

    <!-- 分割器组件 -->
    <TmSplitter layout="horizontal" :initial-sizes="['30%', '70%']">
      <TmSplitterPanel>
        <div>左侧面板</div>
      </TmSplitterPanel>
      <TmSplitterPanel>
        <div>右侧面板</div>
      </TmSplitterPanel>
    </TmSplitter>
  </div>
</template>

<script setup>
// 如果使用按需引入，可以在这里导入组件
import { MyButton, TmSplitter, TmSplitterPanel } from "@tourmindai/components";

const handleClick = () => {
  console.log("按钮被点击了");
};
</script>
```

## 📋 组件文档

### MyButton 按钮组件

```vue
<MyButton label="按钮文本" variant="primary" @click="handleClick" />
```

**Props:**

- `label` (String): 按钮文本，默认 "按钮"
- `variant` (String): 按钮样式，可选值：`primary`、`secondary`、`danger`，默认 `primary`

**Events:**

- `click`: 点击事件

### TmSplitter 分割器组件

```vue
<TmSplitter
  layout="horizontal"
  :initial-sizes="['30%', '70%']"
  @resize-start="onResizeStart"
  @resize="onResize"
  @resize-end="onResizeEnd"
>
  <TmSplitterPanel>
    <!-- 面板内容 -->
  </TmSplitterPanel>
  <TmSplitterPanel>
    <!-- 面板内容 -->
  </TmSplitterPanel>
</TmSplitter>
```

**Props:**

- `layout` (String): 布局方向，可选值：`horizontal`、`vertical`，默认 `horizontal`
- `initialSizes` (Array): 初始面板尺寸数组

**Events:**

- `resize-start`: 开始调整大小时触发
- `resize`: 调整大小过程中触发
- `resize-end`: 结束调整大小时触发

### TmSplitterPanel 分割器面板组件

```vue
<TmSplitterPanel min="100px" max="500px" :resizable="true" :collapsible="false">
  <!-- 面板内容 -->
</TmSplitterPanel>
```

**Props:**

- `min` (String|Number): 最小尺寸
- `max` (String|Number): 最大尺寸
- `resizable` (Boolean): 是否可调整大小，默认 `true`
- `collapsible` (Boolean): 是否可折叠，默认 `false`

## 🎯 主题定制

### 使用自定义主题

你可以使用自定义主题替换默认主题：

```javascript
// 不引入默认主题
// import "@tourmindai/components/theme"; ❌

// 引入自定义主题（需要提供相同的CSS变量）
import "./my-custom-theme.css"; ✅

import { TmSplitter } from "@tourmindai/components";
```

### 自定义主题变量

```css
/* my-custom-theme.css */
:root {
  --primary-500: #your-brand-color;
  --border-radius-base: 8px;
  --bg-surface: #ffffff;
  --text-primary: rgba(0, 0, 0, 0.87);
  /* 提供所有必需的CSS变量 */
}

/* 深色模式定制 */
[data-theme="dark"] {
  --primary-500: #your-dark-mode-color;
  --bg-surface: #1e1e1e;
  --text-primary: rgba(255, 255, 255, 0.87);
}
```

### 切换深色模式

```javascript
// 切换到深色模式
document.documentElement.setAttribute("data-theme", "dark");

// 切换到浅色模式
document.documentElement.removeAttribute("data-theme");
```

## 🛠️ 配置说明

### Vite 配置

```javascript
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["@tourmindai/components"],
  },
});
```

### 项目结构

```
@tourmindai/components/
├── dist/                    # 构建输出目录
│   ├── tourmindai-components.es.js    # ES 模块
│   ├── tourmindai-components.umd.js   # UMD 模块
│   ├── style.css            # 完整样式文件（兼容）
│   └── styles/              # 样式文件
│       ├── all.css          # 全量样式
│       └── theme.css        # 主题变量
├── src/
│   ├── components/          # 组件源码
│   ├── styles/              # 样式文件
│   └── index.js             # 入口文件
└── package.json
```

## 📦 构建输出

### JavaScript 模块

- **ES 模块**: `dist/tourmindai-components.es.js` - 支持 Tree Shaking
- **UMD 模块**: `dist/tourmindai-components.umd.js` - 通用模块定义

### 样式文件

- **主题变量**: `dist/styles/theme.css` - 必需的主题变量
- **全量样式**: `dist/styles/all.css` - 所有组件样式（可选）
- **兼容样式**: `dist/style.css` - 向后兼容的完整样式

## ⚠️ 注意事项

1. **Vue 版本**: 确保你的项目使用 Vue 3.x 版本
2. **主题变量**: 使用组件前必须先引入 `@tourmindai/components/theme`
3. **样式集成**: 组件引入时会自动包含对应样式，无需额外引入
4. **浏览器兼容性**: 支持现代浏览器，不支持 IE
5. **自定义主题**: 如果使用自定义主题，需要提供所有必需的 CSS 变量

## 🔧 开发

```bash
# 安装依赖
npm install

# 开发模式（启动演示页面）
npm run dev

# 构建库
npm run build

# 构建样式文件
npm run build:styles

# 监听构建（开发时使用）
npm run dev:lib
```

详细的开发指南请查看：[开发指南](./DEVELOPMENT-GUIDE.md)

## 📝 更新日志

### v1.0.12 ✨ 全新样式集成

**🎉 重大更新：样式自动集成**

- ✨ **样式集成**: 组件引入时自动包含样式，无需手动引入
- 🎨 **主题分离**: 主题变量独立导出，支持自定义主题
- 📦 **简化使用**: 用户只需引入 theme + 组件即可
- 🗑️ **移除**: 不再单独导出组件样式文件
- 📝 **文档更新**: 全新的使用方式说明

**⚠️ 破坏性变更:**

- 移除了单独的组件样式导出：`./styles/button`, `./styles/tm-splitter`
- 用户必须先引入 `@tourmindai/components/theme`

**🔄 迁移指南:**

```javascript
// 旧版本（v1.0.11及以下）
import "@tourmindai/components/styles/theme";
import "@tourmindai/components/styles/button";
import { MyButton } from "@tourmindai/components";

// 新版本（v1.0.12+）
import "@tourmindai/components/theme";
import { MyButton } from "@tourmindai/components"; // 样式自动包含
```

### v1.0.11

- ✨ 新增样式按需引入功能
- ✨ 独立导出主题变量文件
- ✨ 支持更细粒度的样式控制
- 📦 优化打包体积，支持更好的性能优化

### v1.0.0

- 初始版本发布
- 包含 MyButton 和 TmSplitter 组件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License
