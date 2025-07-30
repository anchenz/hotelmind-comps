# TmSplitter 分隔面板组件

## 功能特性

- ✅ 支持水平和垂直布局
- ✅ 可拖拽调整面板大小
- ✅ 支持最小/最大尺寸限制
- ✅ 支持状态持久化（localStorage）
- ✅ 主题切换时保持面板尺寸
- ✅ 响应式设计

## 基本使用

```vue
<template>
  <TmSplitter layout="horizontal" :initial-sizes="splitterSizes" @resize="handleResize">
    <TmSplitterPanel :size="splitterSizes[0]" min="300" resizable>
      <div>左侧面板内容</div>
    </TmSplitterPanel>
    <TmSplitterPanel :size="splitterSizes[1]" min="300" resizable>
      <div>右侧面板内容</div>
    </TmSplitterPanel>
  </TmSplitter>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TmSplitter from '@/components/base/TmSplitter/index.vue'
import TmSplitterPanel from '@/components/base/TmSplitter/SplitterPanel.vue'

// 分隔面板尺寸状态管理
const STORAGE_KEY = 'my-splitter-sizes'
const DEFAULT_SIZES = ['50%', '50%']
const splitterSizes = ref([...DEFAULT_SIZES])

// 从localStorage加载保存的尺寸
function loadSplitterSizes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsedSizes = JSON.parse(saved)
      if (Array.isArray(parsedSizes) && parsedSizes.length === 2) {
        splitterSizes.value = parsedSizes
        return
      }
    }
  } catch (error) {
    console.warn('加载分隔面板尺寸失败:', error)
  }
  splitterSizes.value = [...DEFAULT_SIZES]
}

// 保存尺寸到localStorage
function saveSplitterSizes(sizes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sizes))
  } catch (error) {
    console.warn('保存分隔面板尺寸失败:', error)
  }
}

// 处理分隔面板尺寸变化
function handleResize(index, sizes) {
  const container = document.querySelector('.tm-splitter')
  if (container) {
    const containerWidth = container.offsetWidth
    const percentageSizes = sizes.map((size) => {
      if (typeof size === 'number') {
        const percentage = ((size / containerWidth) * 100).toFixed(2)
        return `${percentage}%`
      }
      return size
    })

    splitterSizes.value = percentageSizes

    // 防抖保存
    clearTimeout(handleResize.timer)
    handleResize.timer = setTimeout(() => {
      saveSplitterSizes(percentageSizes)
    }, 300)
  }
}

onMounted(() => {
  loadSplitterSizes()
})
</script>
```

## Props

### TmSplitter

| 参数         | 类型   | 默认值       | 说明                                 |
| ------------ | ------ | ------------ | ------------------------------------ |
| layout       | String | 'horizontal' | 布局方向，'horizontal' 或 'vertical' |
| initialSizes | Array  | []           | 初始面板尺寸数组                     |

### TmSplitterPanel

| 参数        | 类型          | 默认值    | 说明                       |
| ----------- | ------------- | --------- | -------------------------- |
| size        | String/Number | '50%'     | 面板大小（像素值或百分比） |
| min         | String/Number | undefined | 最小尺寸                   |
| max         | String/Number | undefined | 最大尺寸                   |
| resizable   | Boolean       | true      | 是否可调整大小             |
| collapsible | Boolean       | false     | 是否可折叠                 |

## 事件

### TmSplitter

| 事件名       | 参数           | 说明         |
| ------------ | -------------- | ------------ |
| resize-start | (index, sizes) | 开始拖拽调整 |
| resize       | (index, sizes) | 调整过程中   |
| resize-end   | (index, sizes) | 调整结束     |

## 持久化配置

为了实现状态持久化，需要：

1. **状态管理**：使用 `ref` 管理面板尺寸状态
2. **localStorage 读写**：实现加载和保存函数
3. **事件监听**：在 `resize` 事件中保存新尺寸
4. **主题适配**：监听主题变化并保持尺寸状态

## 注意事项

1. **性能优化**：使用防抖机制避免频繁写入 localStorage
2. **错误处理**：加载失败时使用默认尺寸
3. **主题兼容**：确保主题切换时不重置面板尺寸
4. **响应式**：支持容器尺寸变化时的自适应
