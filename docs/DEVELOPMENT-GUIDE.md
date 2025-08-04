# 组件库开发指南

本文档提供完整的开发流程，从新组件开发到发布到 npm 的所有步骤。

## 📋 目录

- [开发环境准备](#开发环境准备)
- [新组件开发流程](#新组件开发流程)
- [样式处理](#样式处理)
- [构建配置更新](#构建配置更新)
- [测试验证](#测试验证)
- [文档更新](#文档更新)
- [版本管理](#版本管理)
- [发布流程](#发布流程)
- [注意事项](#注意事项)

## 🛠️ 开发环境准备

### 必要工具

- Node.js (>= 16)
- npm (>= 8)
- Git
- 代码编辑器 (推荐 VS Code)

### 克隆项目

```bash
git clone <your-repo-url>
cd tourmind-comps
npm install
```

### 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建组件库
npm run build:styles # 构建样式文件
```

## 🚀 新组件开发流程

### 第 1 步: 规划组件

在开发前，明确以下内容：

- 组件名称 (例如: `TmDatePicker`)
- 组件功能和 API 设计
- 样式需求
- 依赖关系

### 第 2 步: 创建组件目录结构

假设要开发一个 `TmDatePicker` 组件：

```bash
# 创建组件目录
mkdir src/components/TmDatePicker

# 创建必要文件
touch src/components/TmDatePicker/index.vue          # 主组件文件
touch src/components/TmDatePicker/index.js           # 组件导出文件
touch src/components/TmDatePicker/style.js           # 样式引入文件
touch src/components/TmDatePicker/style.js # 组件样式引用文件
touch src/components/TmDatePicker/README.md          # 组件文档
```

### 第 3 步: 实现组件

#### `src/components/TmDatePicker/index.vue`

```vue
<template>
  <div class="tm-date-picker" :class="[`tm-date-picker--${size}`]">
    <input
      v-model="displayValue"
      :placeholder="placeholder"
      @click="togglePicker"
      readonly
      class="tm-date-picker__input"
    />
    <div v-if="visible" class="tm-date-picker__popup">
      <!-- 日期选择器内容 -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: null,
  },
  placeholder: {
    type: String,
    default: "请选择日期",
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue", "change"]);

const visible = ref(false);

const displayValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits("update:modelValue", value);
    emits("change", value);
  },
});

const togglePicker = () => {
  if (!props.disabled) {
    visible.value = !visible.value;
  }
};

// 暴露方法给外部使用
defineExpose({
  togglePicker,
  visible,
});
</script>

<style lang="scss" scoped>
@use "../../styles/tm-date-picker.scss";
</style>
```

#### `src/components/TmDatePicker/index.js`

```javascript
// 导入组件
import TmDatePicker from "./index.vue";

// 安装函数
TmDatePicker.install = function (app) {
  app.component("TmDatePicker", TmDatePicker);
};

// 默认导出组件
export default TmDatePicker;
```

#### `src/components/TmDatePicker/style.js`

```javascript
// 引入组件相关的所有样式
import "../../styles/tm-date-picker.scss";
```

#### `src/components/TmDatePicker/style.js`

```javascript
// 组件样式引用（包含完整样式）
// 组件现已自包含样式，无需单独引入主题
import "../../styles/tm-date-picker.scss";
```

### 第 4 步: 创建样式文件

#### `src/styles/tm-date-picker.scss` (完整样式)

```scss
// 完整的日期选择器样式，包含变量引用
@use "variables";

.tm-date-picker {
  position: relative;
  display: inline-block;
  width: 100%;

  &__input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-primary);
    border-radius: var(--border-radius-base);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      border-color: var(--primary-color);
    }

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }

  &__popup {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: var(--bg-surface);
    border: 1px solid var(--border-primary);
    border-radius: var(--border-radius-base);
    box-shadow: var(--box-shadow-md);
    padding: 16px;
    margin-top: 4px;
  }

  // 尺寸变体
  &--small {
    .tm-date-picker__input {
      padding: 4px 8px;
      font-size: 12px;
    }
  }

  &--large {
    .tm-date-picker__input {
      padding: 12px 16px;
      font-size: 16px;
    }
  }
}
```

#### `src/styles/tm-date-picker.scss` (完整样式)

```scss
// 包含组件完整样式和主题变量

.tm-date-picker {
  position: relative;
  display: inline-block;
  width: 100%;

  &__input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-primary);
    border-radius: var(--border-radius-base);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      border-color: var(--primary-color);
    }

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }

  &__popup {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    background: var(--bg-surface);
    border: 1px solid var(--border-primary);
    border-radius: var(--border-radius-base);
    box-shadow: var(--box-shadow-md);
    padding: 16px;
    margin-top: 4px;
  }

  // 尺寸变体
  &--small {
    .tm-date-picker__input {
      padding: 4px 8px;
      font-size: 12px;
    }
  }

  &--large {
    .tm-date-picker__input {
      padding: 12px 16px;
      font-size: 16px;
    }
  }
}
```

## 🎨 样式处理

### 样式文件命名规范

- 组件样式文件: `src/styles/组件名.scss` (例: `tm-splitter.scss`)
- 组件内样式引用: `src/components/组件名/style.js` (组件自包含样式)

> **注意**: 从 2025 年 8 月开始，组件采用自包含样式方案，无需单独的-only.scss 和 style-standalone.js 文件

### 样式变量使用

```scss
// ✅ 正确：使用CSS变量
border-color: var(--primary-color);
background: var(--bg-surface);

// ❌ 错误：硬编码颜色值
border-color: #1677ff;
background: #ffffff;
```

### CSS 类名规范

- 组件根类: `.tm-组件名` (例: `.tm-date-picker`)
- 子元素类: `.tm-组件名__元素名` (例: `.tm-date-picker__input`)
- 修饰符类: `.tm-组件名--修饰符` (例: `.tm-date-picker--large`)

## ⚙️ 构建配置更新

### 第 1 步: 更新全局样式

编辑 `src/styles/global.scss`，添加新组件样式：

```scss
@use "./base/index.scss";
@use "./base/theme.scss";
@use "./tm-splitter.scss";
@use "./tm-splitter-panel.scss";
@use "./tm-date-picker.scss"; // 新增
```

### 第 2 步: 更新主入口文件

编辑 `src/index.js`，导出新组件：

```javascript
// src/index.js
import TmSplitter from "./components/TmSplitter/index.vue";
import TmSplitterPanel from "./components/TmSplitterPanel/index.vue";
import TmDatePicker from "./components/TmDatePicker/index.vue"; // 新增

// 创建 install 方法
const install = (app) => {
  app.component("TmSplitter", TmSplitter);
  app.component("TmSplitterPanel", TmSplitterPanel);
  app.component("TmDatePicker", TmDatePicker); // 新增
};

// 所有组件列表
const components = {
  TmSplitter,
  TmSplitterPanel,
  TmDatePicker, // 新增
};

// 导出单个组件
export {
  TmSplitter,
  TmSplitterPanel,
  TmDatePicker, // 新增
  install,
};

// 导出 Vue 插件
export default {
  install,
  ...components,
};
```

### 第 3 步: 更新样式构建脚本

编辑 `scripts/build-styles.js`，添加新组件样式构建：

```javascript
const stylesToBuild = [
  {
    name: "all",
    entry: resolve(__dirname, "../src/entries/all-styles.js"),
    description: "全量样式",
  },
  {
    name: "theme",
    entry: resolve(__dirname, "../src/entries/theme.js"),
    description: "主题样式",
  },

  // 组件自包含样式，无需单独构建
  // 各组件样式已通过 style.js 文件自动引入
];
```

### 第 4 步: 更新 package.json 导出路径

编辑 `package.json`，添加新组件样式导出：

```json
{
  "exports": {
    ".": {
      "import": "./dist/tourmindai-components.es.js",
      "require": "./dist/tourmindai-components.umd.js"
    },
    "./es": "./dist/tourmindai-components.es.js",
    "./lib": "./dist/tourmindai-components.umd.js",
    "./style": "./dist/style.css",
    "./style/*": "./dist/style/*",
    "./styles/all": "./dist/styles/all.css",
    "./theme": "./dist/styles/theme.css"
    // 组件样式已自包含，无需单独导出
  }
}
```

## 🧪 测试验证

### 第 1 步: 本地开发测试

```bash
# 启动开发服务器
npm run dev

# 在演示页面中添加新组件测试
```

### 第 2 步: 构建测试

```bash
# 构建组件库
npm run build

# 检查构建产物
ls -la dist/
ls -la dist/styles/
```

### 第 3 步: 创建测试页面

在 `src/views/` 中创建新组件的演示页面：

#### `src/views/TmDatePickerDemo.vue`

```vue
<template>
  <div class="demo-container">
    <h1>TmDatePicker 演示</h1>

    <section>
      <h2>基础用法</h2>
      <TmDatePicker v-model="date1" placeholder="请选择日期" />
      <p>选中值: {{ date1 }}</p>
    </section>

    <section>
      <h2>尺寸变体</h2>
      <TmDatePicker v-model="date2" size="small" placeholder="小尺寸" />
      <TmDatePicker v-model="date3" size="medium" placeholder="中等尺寸" />
      <TmDatePicker v-model="date4" size="large" placeholder="大尺寸" />
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TmDatePicker from "../components/TmDatePicker/index.vue";

const date1 = ref("");
const date2 = ref("");
const date3 = ref("");
const date4 = ref("");
</script>
```

## 📚 文档更新

### 第 1 步: 更新 README.md

在组件文档部分添加新组件说明：

```markdown
### TmDatePicker 日期选择器组件

\`\`\`vue
<TmDatePicker
v-model="date"
placeholder="请选择日期"
size="medium"
@change="handleDateChange"
/>
\`\`\`

**Props:**

- `modelValue` (String|Date): 绑定值
- `placeholder` (String): 占位符文本，默认 "请选择日期"
- `size` (String): 尺寸，可选值：`small`、`medium`、`large`，默认 `medium`
- `disabled` (Boolean): 是否禁用，默认 `false`

**Events:**

- `update:modelValue`: 值变化时触发
- `change`: 日期选择时触发
```

### 第 2 步: 更新样式引入指南

```markdown
#### 只使用 TmDatePicker 组件

\`\`\`javascript
import "@tourmindai/components/styles/theme"; // 4.7KB - 主题变量
import "@tourmindai/components/styles/tm-date-picker"; // 1.2KB - DatePicker 样式
// 总计: ~5.9KB
\`\`\`
```

### 第 3 步: 更新 STYLE-USAGE.md

在使用指南中添加新组件的引入示例。

## 📦 版本管理

### 版本号规则 (语义化版本)

- **主版本号** (1.x.x): 不兼容的 API 修改
- **次版本号** (x.1.x): 新增功能，向后兼容
- **修订号** (x.x.1): 问题修复，向后兼容

### 版本更新步骤

#### 新增组件 (次版本更新)

```bash
# 更新版本号 (例如 1.0.11 -> 1.1.0)
npm version minor
```

#### Bug 修复 (修订版本更新)

```bash
# 更新版本号 (例如 1.1.0 -> 1.1.1)
npm version patch
```

#### 重大更新 (主版本更新)

```bash
# 更新版本号 (例如 1.1.1 -> 2.0.0)
npm version major
```

### 更新日志

在 `README.md` 中更新版本日志：

```markdown
## 📝 更新日志

### v1.1.0

- ✨ 新增 TmDatePicker 日期选择器组件
- 🎨 支持三种尺寸 (small/medium/large)
- 📦 添加独立样式文件支持按需引入

### v1.0.11

- ✨ 新增样式按需引入功能
- ✨ 独立导出主题变量文件
```

## 🚀 发布流程

### 第 1 步: 最终检查

```bash
# 确保所有文件已提交
git status

# 运行构建
npm run build

# 检查构建产物
ls -la dist/
```

### 第 2 步: Git 操作

```bash
# 提交所有变更
git add .
git commit -m "feat: add TmDatePicker component"

# 推送到远程仓库
git push origin main

# 创建标签 (版本号)
git tag v1.1.0
git push origin v1.1.0
```

### 第 3 步: 发布到 npm

```bash
# 登录npm (首次发布)
npm login

# 发布作用域包到公开仓库
# 方式1: 使用package.json中的publishConfig配置 (推荐)
npm publish

# 方式2: 手动指定access参数
# npm publish --access public

# 查看发布结果
npm info @tourmindai/components
```

> **⚠️ 作用域包发布说明**
>
> 由于项目使用作用域包名 `@tourmindai/components`，作用域包默认是私有的。
>
> - 已在 `package.json` 中配置 `"publishConfig": {"access": "public"}`
> - 这样可以直接使用 `npm publish` 发布公开包
> - 如果没有此配置，需要使用 `npm publish --access public`

### 第 4 步: 验证发布

```bash
# 在测试项目中安装验证
cd ../test-project
npm install @tourmindai/components@latest

# 测试新组件
import { TmDatePicker } from '@tourmindai/components'
import '@tourmindai/components/styles/theme'
import '@tourmindai/components/styles/tm-date-picker'
```

## ⚠️ 注意事项

### 开发规范

1. **组件命名**: 使用 `Tm` 前缀，采用 PascalCase
2. **文件命名**: 目录和文件使用 kebab-case
3. **CSS 类名**: 使用 BEM 命名规范
4. **Props 验证**: 所有 props 都要有类型和默认值
5. **事件命名**: 使用 kebab-case，遵循 Vue 规范

### 样式规范

1. **必须使用 CSS 变量**: 不要硬编码颜色值
2. **响应式设计**: 考虑不同屏幕尺寸
3. **无障碍访问**: 添加适当的 ARIA 属性
4. **浏览器兼容**: 支持现代浏览器

### 构建规范

1. **样式分离**: 同时提供完整样式和纯净样式
2. **导出路径**: 更新 package.json 的 exports 配置
3. **构建脚本**: 添加到自动化构建流程中
4. **文件大小**: 关注打包后的文件大小

### 发布规范

1. **版本管理**: 严格遵循语义化版本
2. **变更日志**: 详细记录每次更新内容
3. **向后兼容**: 避免破坏性变更
4. **测试验证**: 发布前充分测试
5. **作用域包**: 确保 `publishConfig.access` 设置为 `public`

### 文档规范

1. **API 文档**: 详细说明 props、events、slots
2. **使用示例**: 提供完整的代码示例
3. **样式指南**: 说明按需引入的使用方法
4. **更新及时**: 与代码同步更新文档

## 🔄 快速检查清单

新组件开发完成后，使用此清单确保没有遗漏：

### 开发阶段

- [ ] 创建组件目录和必要文件
- [ ] 实现组件功能和 API
- [ ] 创建完整样式和纯净样式文件
- [ ] 添加 Props 验证和类型定义
- [ ] 实现事件处理

### 集成阶段

- [ ] 更新 `src/index.js` 导出新组件
- [ ] 更新 `src/styles/global.scss` 引入样式
- [ ] 更新 `scripts/build-styles.js` 构建配置
- [ ] 更新 `package.json` 导出路径

### 测试阶段

- [ ] 创建演示页面测试功能
- [ ] 运行构建命令检查产物
- [ ] 测试按需引入样式功能
- [ ] 验证在不同项目中的使用

### 文档阶段

- [ ] 更新 README.md 组件文档
- [ ] 更新 STYLE-USAGE.md 样式指南
- [ ] 编写或更新组件的 README.md
- [ ] 更新版本日志

### 发布阶段

- [ ] 更新版本号
- [ ] 提交 Git 并打标签
- [ ] 发布到 npm
- [ ] 验证发布结果

---

遵循这个流程，你就能高效地开发和发布新组件！如有疑问，参考现有组件的实现方式。
