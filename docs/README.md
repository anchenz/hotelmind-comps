# @tourmindai/components 完整文档

Vue3 共享组件库

## 📋 目录

- [安装](#📦-安装)
- [快速开始](#🚀-快速开始)
- [样式引入指南](#🎨-样式引入指南)
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

### 1. 全局引入（推荐小项目）

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import TourmindComponents from "@tourmindai/components";
import "@tourmindai/components/style"; // 引入所有样式

const app = createApp(App);
app.use(TourmindComponents);
app.mount("#app");
```

### 2. 按需引入组件 + 全量样式

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { MyButton, TmSplitter, TmSplitterPanel } from "@tourmindai/components";
import "@tourmindai/components/style"; // 引入所有样式

const app = createApp(App);

// 注册单个组件
app.component("MyButton", MyButton);
app.component("TmSplitter", TmSplitter);
app.component("TmSplitterPanel", TmSplitterPanel);

app.mount("#app");
```

### 3. 按需引入组件 + 按需引入样式（推荐大项目）

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { MyButton, TmSplitter, TmSplitterPanel } from "@tourmindai/components";

// 按需引入样式 - 更小的打包体积
import "@tourmindai/components/styles/theme"; // 主题变量（必需）
import "@tourmindai/components/styles/button"; // Button组件样式
import "@tourmindai/components/styles/tm-splitter"; // TmSplitter组件样式

const app = createApp(App);
app.component("MyButton", MyButton);
app.component("TmSplitter", TmSplitter);
app.component("TmSplitterPanel", TmSplitterPanel);
app.mount("#app");
```

## 🎨 样式引入指南

### 样式引入方式对比

| 引入方式   | 文件大小 | 适用场景       | 示例                                         |
| ---------- | -------- | -------------- | -------------------------------------------- |
| 全量引入   | ~6.5KB   | 使用多个组件   | `import '@tourmindai/components/style'`      |
| 新全量引入 | ~6.5KB   | 使用多个组件   | `import '@tourmindai/components/styles/all'` |
| 按需引入   | 按需计算 | 只使用部分组件 | 见下方示例                                   |

### 按需引入样式示例

#### 只使用 Button 组件

```javascript
import "@tourmindai/components/styles/theme"; // 4.7KB - 主题变量
import "@tourmindai/components/styles/button"; // 0.3KB - Button样式
// 总计: ~5KB (比全量少 1.5KB)
```

#### 只使用 TmSplitter 组件

```javascript
import "@tourmindai/components/styles/theme"; // 4.7KB - 主题变量
import "@tourmindai/components/styles/tm-splitter"; // 1.5KB - Splitter样式
// 总计: ~6.2KB
```

#### 只需要主题变量进行自定义

```javascript
import "@tourmindai/components/styles/theme"; // 4.7KB - 仅主题变量
```

### 🔥 性能优化建议

- **小项目**（< 3 个组件）：使用全量引入
- **大项目**（≥ 3 个组件）：使用按需引入
- **自定义主题**：先引入 `theme`，再按需引入组件样式

详细的样式使用指南请查看：[样式按需引入指南](./STYLE-USAGE.md)

### 4. 在组件中使用

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

## 🎯 主题定制

组件库使用 CSS Variables，支持深色模式和主题定制：

```css
/* 自定义主题变量 */
:root {
  --primary-500: #your-brand-color;
  --border-radius-base: 8px;
}

/* 深色模式定制 */
[data-theme="dark"] {
  --primary-500: #your-dark-mode-color;
}
```

切换深色模式：

```javascript
// 切换到深色模式
document.documentElement.setAttribute("data-theme", "dark");

// 切换到浅色模式
document.documentElement.removeAttribute("data-theme");
```

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
│   ├── style.css            # 完整样式文件（兼容）
│   └── styles/              # 按需引入样式
│       ├── all.css          # 全量样式
│       ├── theme.css        # 主题变量
│       ├── button.css       # Button组件样式
│       └── tm-splitter.css  # TmSplitter组件样式
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

### JavaScript 模块

- **ES 模块**: `dist/tourmindai-components.es.js` - 支持 Tree Shaking
- **UMD 模块**: `dist/tourmindai-components.umd.js` - 通用模块定义

### 样式文件

- **完整样式**: `dist/style.css` - 包含所有组件样式（兼容旧版）
- **按需样式**:
  - `dist/styles/all.css` - 全量样式 (6.5KB)
  - `dist/styles/theme.css` - 主题变量 (4.7KB)
  - `dist/styles/button.css` - Button 样式 (0.3KB)
  - `dist/styles/tm-splitter.css` - TmSplitter 样式 (1.5KB)

## ⚠️ 注意事项

1. **Vue 版本**: 确保你的项目使用 Vue 3.x 版本
2. **样式引入**:
   - 全量引入：`import '@tourmindai/components/style'`
   - 按需引入：必须先引入 `theme`，再引入组件样式
3. **Composition API**: 组件库使用 Vue 3 的 Composition API 开发
4. **浏览器兼容性**: 支持现代浏览器，不支持 IE
5. **主题变量**: 按需引入时，`theme` 样式是必需的

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

### v1.0.11

- ✨ 新增样式按需引入功能
- ✨ 独立导出主题变量文件
- ✨ 支持更细粒度的样式控制
- 📦 优化打包体积，支持更好的性能优化
- 📚 完善文档和使用指南

### v1.0.6

- 修复构建配置问题
- 优化组件导出结构
- 完善文档说明

### v1.0.0

- 初始版本发布
- 包含 MyButton 和 TmSplitter 组件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License
