# @tourmindai/components

Vue3 共享组件库

## 📦 安装

```bash
npm install @tourmindai/components
```

## 🚀 快速开始

### 1. 全局引入（推荐）

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

### 2. 按需引入

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

### 3. 在组件中使用

```vue
<template>
  <div>
    <!-- 按钮组件 -->
    <MyButton label="点击我" variant="primary" @click="handleClick" />

    <!-- 分割器组件 -->
    <TmSplitter layout="horizontal" :initial-sizes="['200px', '300px']">
      <TmSplitterPanel size="200px">
        <div>左侧面板</div>
      </TmSplitterPanel>
      <TmSplitterPanel size="300px">
        <div>右侧面板</div>
      </TmSplitterPanel>
    </TmSplitter>
  </div>
</template>

<script setup>
// 如果使用按需引入，需要在这里导入组件
// import { MyButton, TmSplitter, TmSplitterPanel } from '@tourmindai/components'

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
  :initial-sizes="['200px', '300px']"
  @resize-start="onResizeStart"
  @resize="onResize"
  @resize-end="onResizeEnd"
>
  <TmSplitterPanel size="200px">
    <!-- 面板内容 -->
  </TmSplitterPanel>
  <TmSplitterPanel size="300px">
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
<TmSplitterPanel
  size="200px"
  min="100px"
  max="500px"
  :resizable="true"
  :collapsible="false"
  @update:size="onSizeUpdate"
>
  <!-- 面板内容 -->
</TmSplitterPanel>
```

**Props:**

- `size` (String|Number): 面板大小，支持像素值或百分比，默认 "50%"
- `min` (String|Number): 最小尺寸
- `max` (String|Number): 最大尺寸
- `resizable` (Boolean): 是否可调整大小，默认 `true`
- `collapsible` (Boolean): 是否可折叠，默认 `false`

**Events:**

- `update:size`: 尺寸更新时触发

## 🛠️ 配置说明

### Vite 配置

如果你使用 Vite，可以在 `vite.config.js` 中配置：

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
│   └── style.css            # 样式文件
├── src/
│   ├── components/          # 组件源码
│   │   ├── Button.vue       # 按钮组件
│   │   └── TmSplitter/      # 分割器组件
│   ├── styles/              # 样式文件
│   └── index.js             # 入口文件
└── package.json
```

## 📦 构建输出

组件库提供以下构建输出：

- **ES 模块**: `dist/tourmindai-components.es.js` - 支持 Tree Shaking
- **UMD 模块**: `dist/tourmindai-components.umd.js` - 通用模块定义
- **样式文件**: `dist/style.css` - 组件样式

## ⚠️ 注意事项

1. **Vue 版本**: 确保你的项目使用 Vue 3.x 版本
2. **样式引入**: 组件库的样式文件需要单独引入：`import '@tourmindai/components/style'`
3. **Composition API**: 组件库使用 Vue 3 的 Composition API 开发
4. **浏览器兼容性**: 支持现代浏览器，不支持 IE

## 🔧 开发

```bash
# 安装依赖
npm install

# 开发模式（启动演示页面）
npm run dev

# 构建库
npm run build

# 监听构建（开发时使用）
npm run dev:lib
```

## 📝 更新日志

### v1.0.6

- 修复构建配置问题
- 优化组件导出结构
- 完善文档说明

### v1.0.0

- 初始版本发布
- 包含 MyButton 和 TmSplitter 组件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
