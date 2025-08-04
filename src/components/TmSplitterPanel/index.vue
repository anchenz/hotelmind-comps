<template>
  <div
    class="tm-splitter-panel"
    ref="panelRef"
    :data-resizable="resizable"
    :data-min="min"
    :data-max="max"
    :data-collapsible="collapsible"
    :style="panelStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
/**
 * TmSplitterPanel 分隔面板子组件
 * 用于定义面板的属性和内容
 */
import { inject, computed, ref, watch, onMounted, nextTick } from "vue";

const props = defineProps({
  /** 面板大小 (像素值或百分比) */
  size: {
    type: [String, Number],
    default: "50%",
  },
  /** 最小尺寸 (像素值或百分比) */
  min: {
    type: [String, Number],
    default: undefined,
  },
  /** 最大尺寸 (像素值或百分比) */
  max: {
    type: [String, Number],
    default: undefined,
  },
  /** 是否可调整大小 */
  resizable: {
    type: Boolean,
    default: true,
  },
  /** 是否可折叠 */
  collapsible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:size"]);

const panelRef = ref(null);

// 注入父组件提供的信息
const splitter = inject("splitter", null);

// 计算面板样式
const panelStyle = computed(() => {
  const isHorizontal = splitter?.layout.value === "horizontal";
  const sizeProperty = isHorizontal ? "width" : "height";

  let size = props.size;
  if (typeof size === "number") {
    size = `${size}px`;
  }

  return {
    [sizeProperty]: size,
    flexShrink: 0,
  };
});

// 监听 size 变化并应用到DOM
watch(
  () => props.size,
  (newSize) => {
    if (panelRef.value && newSize) {
      const isHorizontal = splitter?.layout.value === "horizontal";
      const sizeProperty = isHorizontal ? "width" : "height";

      let size = newSize;
      if (typeof size === "number") {
        size = `${size}px`;
      }

      // 直接设置DOM样式，确保尺寸立即生效
      panelRef.value.style[sizeProperty] = size;
      // console.log(`更新面板尺寸: ${sizeProperty} = ${size}`)
    }

    emit("update:size", newSize);
  },
  { immediate: true }
);

// 组件挂载后确保尺寸正确应用
onMounted(async () => {
  await nextTick();
  if (panelRef.value && props.size) {
    const isHorizontal = splitter?.layout.value === "horizontal";
    const sizeProperty = isHorizontal ? "width" : "height";

    let size = props.size;
    if (typeof size === "number") {
      size = `${size}px`;
    }

    panelRef.value.style[sizeProperty] = size;
    console.log(`挂载时设置面板尺寸: ${sizeProperty} = ${size}`);
  }
});

// 暴露面板引用给父组件使用
defineExpose({
  panelRef,
});
</script>

<style lang="scss">
@use "@/styles/tm-splitter-panel.scss";
</style>
