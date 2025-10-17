# 样式使用指南

本文档基于当前项目的样式组织与导出策略，说明如何在不同场景下正确引入与定制样式。

## 目录

- 概述
- 快速开始（推荐）
- 其他引入方式
- 主题定制
- 最佳实践
- 常见问题
- 导出清单

## 概述

当前样式体系采用「组件自包含 + 主题变量」的方式：

- 每个组件会在自身入口内引入对应样式，使用组件即可自动生效。
- 主题变量单独导出，作为样式运行时所需的 CSS 变量来源。
- 同时提供一次性引入的完整样式入口，便于快速集成。

## 快速开始（推荐）

```javascript
// 1) 先引入主题变量（默认主题）
import "@tourmindai/components/styles/theme";

// 2) 按需引入并使用组件（样式自动随组件生效）
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";
```

要点：

- 主题变量是样式的前置依赖。若未引入默认主题，需自行提供包含必需变量的自定义主题文件。
- 组件本身无需再额外引入独立样式文件。

## 其他引入方式

- 一次性引入（包含主题 + 全部组件样式）

```javascript
import "@tourmindai/components/styles/all";
import { TmSplitter } from "@tourmindai/components";
```

- 仅组件样式（由业务侧提供主题变量）

```javascript
import "@tourmindai/components/styles/components"; // 只包含组件样式
import "./my-complete-theme.css"; // 自行提供完整主题变量
```

适用场景：

- 一次性引入：偏好传统方式、无需按需裁剪。
- 仅组件样式：需要完全自定义主题变量或复用现有设计系统变量。

## 主题定制

- 使用默认主题（推荐）

```javascript
import "@tourmindai/components/styles/theme";
```

- 使用自定义主题（不引入默认主题）

```javascript
// 不引入默认主题
// import "@tourmindai/components/styles/theme";

// 提供完整变量集合（示例）
import "./my-theme.css";
```

```css
/* my-theme.css */
:root {
  /* 必需的 CSS 变量（示例，按需补全） */
  --primary-500: #1677ff;
  --bg-surface: #ffffff;
  --border-primary: rgba(0, 0, 0, 0.12);
  --text-primary: rgba(0, 0, 0, 0.87);
  /* ...更多变量 */
}

/* 深色模式（可选） */
[data-theme="dark"] {
  --bg-surface: #1e1e1e;
  --border-primary: rgba(255, 255, 255, 0.12);
  --text-primary: rgba(255, 255, 255, 0.87);
}
```

- 主题切换（示例）

```javascript
document.documentElement.setAttribute("data-theme", "dark");
// 恢复浅色：document.documentElement.removeAttribute("data-theme");
```

## 最佳实践

- 在应用入口统一引入主题变量：

```javascript
// src/main.js
import "@tourmindai/components/styles/theme";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

- 组件中直接按需使用库组件，无需再引入额外样式：

```vue
<!-- 示例：src/components/MyComponent.vue -->
<template>
  <TmSplitter layout="horizontal">
    <TmSplitterPanel>Panel 1</TmSplitterPanel>
    <TmSplitterPanel>Panel 2</TmSplitterPanel>
  </TmSplitter>
</template>

<script setup>
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";
</script>
```

- 样式规范：
  - 使用 BEM 命名（如：`.tm-xxx`、`.tm-xxx__element`、`.tm-xxx--modifier`）。
  - 坚持使用 CSS 变量，避免硬编码颜色。
  - 自定义主题时，仅覆盖需要的变量即可。

## 常见问题

- 组件样式未生效？

  - 确认是否引入了默认主题：`@tourmindai/components/styles/theme`。
  - 若未引入默认主题，请确保自定义主题提供了完整的必需变量集合。

- 样式会污染全局吗？
  - 样式遵循严格的组件前缀（如 `tm-splitter`），全局污染风险低。

## 导出清单

来自 `package.json#exports` 的样式相关入口：

- `@tourmindai/components/styles/components`：仅组件样式汇总 CSS
- `@tourmindai/components/styles/all`：主题 + 全量组件样式 CSS
- `@tourmindai/components/styles/theme`：仅主题变量 CSS

库入口：

- `@tourmindai/components`（默认导出与命名导出）
- `@tourmindai/components/es`、`@tourmindai/components/lib`（分别对应 ES 与 UMD 产物）

---

以上内容与当前仓库代码与构建脚本一致，可直接按文档集成与定制。
