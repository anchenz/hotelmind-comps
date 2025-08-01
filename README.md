# @tourmindai/components

Vue3 共享组件库

## 📦 安装

```bash
npm install @tourmindai/components
```

## 🚀 快速开始

### 全局引入（推荐）

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import TourmindComponents from "@tourmindai/components";
import "@tourmindai/components/style";

const app = createApp(App);
app.use(TourmindComponents);
app.mount("#app");
```

### 按需引入

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { MyButton, TmSplitter, TmSplitterPanel } from "@tourmindai/components";

// 按需引入样式
import "@tourmindai/components/styles/theme"; // 主题变量（必需）
import "@tourmindai/components/styles/button"; // Button组件样式
import "@tourmindai/components/styles/tm-splitter"; // TmSplitter组件样式

const app = createApp(App);
app.component("MyButton", MyButton);
app.component("TmSplitter", TmSplitter);
app.component("TmSplitterPanel", TmSplitterPanel);
app.mount("#app");
```

## 🎨 组件预览

### MyButton 按钮组件

```vue
<MyButton label="点击我" variant="primary" @click="handleClick" />
```

### TmSplitter 分割器组件

```vue
<TmSplitter layout="horizontal" :initial-sizes="['200px', '300px']">
  <TmSplitterPanel size="200px">左侧面板</TmSplitterPanel>
  <TmSplitterPanel size="300px">右侧面板</TmSplitterPanel>
</TmSplitter>
```

## 📚 文档

| 文档                                       | 说明                      |
| ------------------------------------------ | ------------------------- |
| [📖 文档索引](./docs/INDEX.md)             | 完整的文档导航和使用指南  |
| [📋 完整 API 文档](./docs/README.md)       | 详细的组件 API 和使用示例 |
| [🎨 样式按需引入](./docs/STYLE-USAGE.md)   | 样式优化和按需引入说明    |
| [👨‍💻 开发指南](./docs/DEVELOPMENT-GUIDE.md) | 组件开发、构建和发布流程  |

## 🎯 特性

- ✨ **Vue 3** - 基于 Vue 3 Composition API 开发
- 🎨 **主题定制** - 支持 CSS Variables 和深色模式
- 📦 **按需引入** - 支持样式和组件的按需加载
- 🔧 **TypeScript** - 完整的类型定义支持
- 🌍 **SSR 友好** - 支持服务端渲染

## 📝 更新日志

### v1.0.11

- ✨ 新增样式按需引入功能
- ✨ 独立导出主题变量文件
- ✨ 支持更细粒度的样式控制
- 📦 优化打包体积，支持更好的性能优化

[查看完整更新日志](./docs/README.md#📝-更新日志)

## 💡 快速导航

- 🆕 **新用户** → [文档索引](./docs/INDEX.md)
- 🎨 **样式优化** → [按需引入指南](./docs/STYLE-USAGE.md)
- 👨‍💻 **开发贡献** → [开发指南](./docs/DEVELOPMENT-GUIDE.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

详细的开发指南请查看：[开发指南](./docs/DEVELOPMENT-GUIDE.md)

## �� 许可证

MIT License
