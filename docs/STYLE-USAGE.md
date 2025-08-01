# 样式按需引入使用指南

## 概述

从 v1.0.11 开始，组件库支持样式的按需引入，你可以选择全量引入或者只引入需要的组件样式。

## 引入方式

### 1. 全量引入（推荐用于小项目）

```javascript
// 引入所有组件样式
import "@tourmindai/components/styles/all";

// 或者使用原来的方式（兼容）
import "@tourmindai/components/style";
```

### 2. 按需引入（推荐用于大项目）

#### 基础主题 + 组件样式

```javascript
// 1. 首先引入主题样式（必需，包含CSS变量）
import "@tourmindai/components/styles/theme";

// 2. 然后引入需要的组件样式
import "@tourmindai/components/styles/button"; // Button组件
import "@tourmindai/components/styles/tm-splitter"; // TmSplitter组件
```

#### 只使用 Button 组件的完整示例

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";

// 引入组件库
import { MyButton } from "@tourmindai/components";

// 引入样式
import "@tourmindai/components/styles/theme"; // 主题变量（必需）
import "@tourmindai/components/styles/button"; // Button组件样式

const app = createApp(App);
app.component("MyButton", MyButton);
app.mount("#app");
```

#### 只使用 TmSplitter 组件的完整示例

```javascript
// main.js
import { createApp } from "vue";
import App from "./App.vue";

// 引入组件库
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";

// 引入样式
import "@tourmindai/components/styles/theme"; // 主题变量（必需）
import "@tourmindai/components/styles/tm-splitter"; // TmSplitter组件样式

const app = createApp(App);
app.component("TmSplitter", TmSplitter);
app.component("TmSplitterPanel", TmSplitterPanel);
app.mount("#app");
```

## 样式文件说明

| 文件路径                                    | 大小   | 说明                      | 是否必需           |
| ------------------------------------------- | ------ | ------------------------- | ------------------ |
| `@tourmindai/components/styles/all`         | ~6.5KB | 包含所有组件样式和主题    | 全量引入时         |
| `@tourmindai/components/styles/theme`       | ~4KB   | 主题变量（CSS Variables） | 按需引入时必需     |
| `@tourmindai/components/styles/button`      | ~0.5KB | Button 组件样式           | 使用 Button 时     |
| `@tourmindai/components/styles/tm-splitter` | ~2KB   | TmSplitter 组件样式       | 使用 TmSplitter 时 |

## 性能优化建议

### 小项目（< 5 个组件）

推荐使用全量引入：

```javascript
import "@tourmindai/components/styles/all";
```

### 大项目（> 5 个组件）

推荐按需引入以减少包大小：

```javascript
import "@tourmindai/components/styles/theme";
import "@tourmindai/components/styles/button";
// 只引入你实际使用的组件样式
```

## 主题定制

主题样式使用 CSS Variables，你可以轻松定制：

```css
/* 在你的全局CSS中覆盖变量 */
:root {
  --primary-500: #your-brand-color;
  --border-radius-base: 8px;
}

/* 深色模式定制 */
[data-theme="dark"] {
  --primary-500: #your-dark-mode-color;
}
```

## 注意事项

1. **必需引入主题**：使用按需引入时，`theme` 样式是必需的，因为组件样式依赖其中定义的 CSS 变量
2. **引入顺序**：建议先引入 `theme`，再引入组件样式
3. **兼容性**：旧的引入方式 `import '@tourmindai/components/style'` 仍然支持

## 构建产物说明

```
dist/
├── style.css                    # 原有的完整样式文件（兼容）
└── styles/
    ├── all.css                  # 全量样式文件
    ├── theme.css                # 主题变量文件
    ├── button.css               # Button组件样式
    └── tm-splitter.css          # TmSplitter组件样式
```
