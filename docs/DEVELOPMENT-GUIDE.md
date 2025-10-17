# 组件库开发指南

本文档基于当前项目组织与构建方式，提供从组件开发到发布的完整流程说明。内容已移除过时方案与历史备注，确保与你现在的代码一致可用。

## 目录

- 开发环境准备
- 组件开发流程
- 样式体系与使用
- 构建与产物
- 测试与验证
- 文档与示例
- 版本与发布
- 注意事项与检查清单

## 开发环境准备

- Node.js >= 16
- npm >= 8
- Git

```bash
npm install
npm run dev          # 启动示例站点（本地开发）
npm run build        # 构建组件库（含库与样式产物）
npm run build:styles # 单独构建样式入口（all/theme/components）
```

## 组件开发流程

以新增一个组件 `TmXxx` 为例。

### 1) 创建目录与文件

```bash
mkdir -p src/components/TmXxx
# 必要文件
# - 组件实现
# - 组件导出（注册 install、默认导出）
# - 组件样式入口（自包含样式）
touch src/components/TmXxx/index.vue
touch src/components/TmXxx/index.js
touch src/components/TmXxx/style.js
# 可选：组件说明
touch src/components/TmXxx/README.md
```

建议的文件内容骨架：

```vue
<!-- src/components/TmXxx/index.vue -->
<template>
  <div class="tm-xxx">
    <slot />
  </div>
</template>

<script setup>
// 组件逻辑（使用 Vue 3 <script setup>）
</script>

<style lang="scss">
@use "@/styles/tm-xxx.scss";
</style>
```

```javascript
// src/components/TmXxx/index.js
import TmXxx from "./index.vue";
import "./style.js"; // 自包含样式（关键）

TmXxx.install = function (app) {
  app.component("TmXxx", TmXxx);
};

export default TmXxx;
```

```javascript
// src/components/TmXxx/style.js
import "../../styles/tm-xxx.scss";
```

### 2) 新增样式文件

在 `src/styles/` 下新增对应 SCSS：

```bash
# 完整组件样式（遵循 BEM，使用 CSS 变量）
touch src/styles/tm-xxx.scss
```

样式规范：

- 使用 CSS 变量（例如：`var(--primary-500)`、`var(--bg-surface)`）。
- BEM 命名：`.tm-xxx`、`.tm-xxx__element`、`.tm-xxx--modifier`。
- 不要硬编码颜色值，尽量依赖主题变量。

### 3) 注册与导出组件

编辑 `src/index.js`，将组件纳入安装与导出（与 `TmSplitter`、`TmSplitterPanel` 同级）：

```javascript
import TmXxx from "./components/TmXxx/index.vue";

const install = (app) => {
  // ...已存在组件
  app.component("TmXxx", TmXxx);
};

const components = {
  // ...已存在组件
  TmXxx,
};

export { /* 已存在导出 */, TmXxx, install };
export default { install, ...components };
```

### 4) 示例页（本地验证）

在 `src/views/` 新增简单演示文件，方便 `npm run dev` 时验证交互与样式。

## 样式体系与使用

当前样式体系采用“组件自包含 + 主题变量”的方式：

- 每个组件在其 `index.js` 通过 `import "./style.js"` 自动引入自身样式。
- 使用组件前，建议引入主题变量（默认主题）：`@tourmindai/components/styles/theme`。
- 可选一次性引入全量样式：`@tourmindai/components/styles/all`。
- 仅组件样式（配合自定义主题）：`@tourmindai/components/styles/components`。

对外可用入口（见 `package.json#exports`）：

- `@tourmindai/components`（库入口）
- `@tourmindai/components/es`、`@tourmindai/components/lib`（分别对应 ES 与 UMD 产物）
- `@tourmindai/components/styles/components`（仅组件样式汇总 CSS）
- `@tourmindai/components/styles/all`（主题+全部组件样式）
- `@tourmindai/components/styles/theme`（仅主题变量 CSS）

示例（推荐方式）：

```javascript
// 引入主题变量（必要，否则变量未定义时样式可能异常）
import "@tourmindai/components/styles/theme";

// 然后按需使用组件（样式已自包含）
import { TmSplitter, TmSplitterPanel } from "@tourmindai/components";
```

一次性引入：

```javascript
import "@tourmindai/components/styles/all";
import { TmSplitter } from "@tourmindai/components";
```

仅组件样式 + 自定义主题：

```javascript
import "@tourmindai/components/styles/components";
import "./my-complete-theme.css";
```

## 构建与产物

- 库构建：`vite build` 产出 `dist/tourmindai-components.es.js` 与 `dist/tourmindai-components.umd.js`。
- 样式构建：脚本 `scripts/build-styles.js` 产出：
  - `dist/styles/all.css`（主题 + 全部组件样式）
  - `dist/styles/theme.css`（仅主题变量）
  - `dist/styles/components.css`（仅组件样式汇总）

目录参考：

```
dist/
  ├─ tourmindai-components.es.js
  ├─ tourmindai-components.umd.js
  └─ styles/
      ├─ all.css
      ├─ components.css
      └─ theme.css
```

## 测试与验证

```bash
npm run dev   # 在示例站点中验证交互、样式与无控制台报错
npm run build # 构建库与样式产物
```

建议检查：

- 组件是否随引入自动包含样式。
- 未引入 `@tourmindai/components/styles/theme` 时，是否明确提示或文档说明需引入主题变量。
- 拖拽/交互类组件是否在不同浏览器表现一致。

## 文档与示例

- 为新组件在 `src/components/TmXxx/README.md` 编写最小可运行示例与 API（Props、Events、Slots）。
- 在 `docs/STYLE-USAGE.md` 补充使用方式或差异点（如主题变量依赖）。
- 在示例站点 `src/views/` 增加对应 Demo 页面，覆盖基础用法与核心交互。

## 版本与发布

版本采用语义化（SemVer）：

- 主版本（X.0.0）：不兼容变更
- 次版本（0.X.0）：向后兼容的新特性
- 修订（0.0.X）：问题修复

常用命令：

```bash
# 新增组件或特性（次版本）
npm version minor

# 修复问题（修订版本）
npm version patch

# 重大不兼容（主版本）
npm version major
```

发布流程：

```bash
git add .
# commit 遵循约定式提交，type 英文 + 描述中文，例如：
# feat: 新增 TmXxx 组件

git commit -m "feat: 新增 TmXxx 组件"
git push origin <branch>

# 构建并发布（已配置作用域公开发布）
npm run build
npm publish
```

> 包名为作用域包 `@tourmindai/components`，项目已在 `package.json` 配置 `publishConfig.access = public`，可直接 `npm publish`。

## 注意事项与检查清单

开发规范：

- 组件前缀使用 `Tm`，目录/文件使用 kebab-case。
- Props 均需类型与默认值；事件命名遵循 Vue 规范（kebab-case）。
- 样式必须使用 CSS 变量，避免硬编码颜色。
- 交互组件需考虑无障碍与键盘可达性；注意性能与边界情况。

快速检查清单：

- [ ] 创建组件目录与文件（`index.vue`、`index.js`、`style.js`、样式 SCSS）
- [ ] 组件功能完成，Props/Events/Slots 明确
- [ ] 样式符合规范（BEM + CSS 变量）
- [ ] `src/index.js` 注册并导出组件
- [ ] `src/views/` 添加演示页（本地可运行）
- [ ] `npm run dev` 验证交互与样式
- [ ] `npm run build` 验证产物（库与样式）
- [ ] 更新组件 README 与 `docs/STYLE-USAGE.md`
- [ ] 按语义化版本更新版本号并提交发布

---

以上流程与路径均已与当前仓库结构与构建脚本对齐，可直接按文档执行。
