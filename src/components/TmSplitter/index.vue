<template>
  <div
    class="tm-splitter"
    :class="[`tm-splitter--${layout}`]"
    ref="splitterRef"
  >
    <slot></slot>
  </div>
</template>

<script setup>
/**
 * TmSplitter 分隔面板组件
 * 支持水平和垂直布局，可拖拽调整面板大小
 */
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  provide,
  nextTick,
  watch,
} from "vue";

const props = defineProps({
  /** 布局方向 'horizontal' | 'vertical' */
  layout: {
    type: String,
    default: "horizontal",
    validator: (value) => ["horizontal", "vertical"].includes(value),
  },
  /** 初始面板尺寸 */
  initialSizes: {
    type: Array,
    default: () => [],
    validator: (value) => Array.isArray(value),
  },
});

const emit = defineEmits(["resize-start", "resize", "resize-end"]);

const splitterRef = ref(null);
const isDragging = ref(false);
const dragIndex = ref(-1);
const startPosition = ref(0);
const startSizes = ref([]);
const panelElements = ref([]);
const currentSizes = ref([]);

// 初始化面板元素
onMounted(async () => {
  await nextTick();
  initPanels();
});

/**
 * 初始化面板和分隔条
 */
function initPanels() {
  if (!splitterRef.value) return;

  const children = Array.from(splitterRef.value.children);
  panelElements.value = children.filter((child) =>
    child.classList.contains("tm-splitter-panel")
  );

  // 应用初始尺寸
  applyInitialSizes();

  // 创建分隔条
  createDividers();
}

/**
 * 应用初始尺寸到面板
 */
function applyInitialSizes() {
  if (props.initialSizes.length > 0 && panelElements.value.length > 0) {
    panelElements.value.forEach((panel, index) => {
      if (index < props.initialSizes.length) {
        const size = props.initialSizes[index];
        const sizeProperty = props.layout === "horizontal" ? "width" : "height";

        // 对于两个面板的情况，第二个面板使用calc来确保总宽度正确
        if (index === 1 && panelElements.value.length === 2) {
          const firstPanelSize = props.initialSizes[0];
          const dividerSize = 8; // 分隔线宽度
          panel.style[
            sizeProperty
          ] = `calc(100% - ${firstPanelSize} - ${dividerSize}px)`;
        } else {
          panel.style[sizeProperty] = size;
        }
        // console.log(`应用初始尺寸到面板 ${index}: ${panel.style[sizeProperty]}`)
      }
    });

    // 保存当前尺寸
    currentSizes.value = [...props.initialSizes];
  }
}

/**
 * 监听初始尺寸变化
 */
watch(
  () => props.initialSizes,
  (newSizes) => {
    if (newSizes.length > 0 && panelElements.value.length > 0) {
      applyInitialSizes();
    }
  },
  { deep: true }
);

/**
 * 创建分隔条
 */
function createDividers() {
  // 移除现有的分隔条
  const existingDividers = splitterRef.value.querySelectorAll(
    ".tm-splitter-divider"
  );
  existingDividers.forEach((divider) => divider.remove());

  // 在相邻面板之间插入分隔条
  for (let i = 0; i < panelElements.value.length - 1; i++) {
    const divider = createDividerElement(i);

    // 插入到当前面板后面
    const nextPanel = panelElements.value[i + 1];
    splitterRef.value.insertBefore(divider, nextPanel);
  }
}

/**
 * 创建分隔条元素
 */
function createDividerElement(index) {
  const divider = document.createElement("div");
  divider.className = "tm-splitter-divider";

  const line = document.createElement("div");
  line.className = "tm-splitter-divider-line";
  divider.appendChild(line);

  // 设置默认样式确保可见
  divider.style.flexShrink = "0";
  if (props.layout === "horizontal") {
    divider.style.width = "8px";
    divider.style.height = "100%";
  } else {
    divider.style.width = "100%";
    divider.style.height = "8px";
  }

  // 添加事件监听
  divider.addEventListener("mousedown", (e) => handleMouseDown(e, index));

  return divider;
}

/**
 * 处理鼠标按下事件
 */
function handleMouseDown(event, index) {
  const currentPanel = panelElements.value[index];
  const nextPanel = panelElements.value[index + 1];

  // 检查是否可以调整大小
  if (!canResize(currentPanel) || !canResize(nextPanel)) {
    return;
  }

  event.preventDefault();

  isDragging.value = true;
  dragIndex.value = index;
  startPosition.value =
    props.layout === "horizontal" ? event.clientX : event.clientY;

  // 记录初始大小
  startSizes.value = panelElements.value.map((panel) => {
    return props.layout === "horizontal"
      ? panel.offsetWidth
      : panel.offsetHeight;
  });

  emit("resize-start", index, [...startSizes.value]);

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  document.body.style.cursor =
    props.layout === "horizontal" ? "e-resize" : "row-resize";
  document.body.style.userSelect = "none";
}

/**
 * 处理鼠标移动事件
 */
function handleMouseMove(event) {
  if (!isDragging.value) return;

  const currentPosition =
    props.layout === "horizontal" ? event.clientX : event.clientY;
  const delta = currentPosition - startPosition.value;

  const currentIndex = dragIndex.value;
  const nextIndex = currentIndex + 1;

  if (currentIndex >= 0 && nextIndex < panelElements.value.length) {
    const currentPanel = panelElements.value[currentIndex];
    const nextPanel = panelElements.value[nextIndex];

    const currentSize = startSizes.value[currentIndex] + delta;
    const nextSize = startSizes.value[nextIndex] - delta;

    // 检查最小/最大限制
    const currentMin = getMinSize(currentPanel);
    const currentMax = getMaxSize(currentPanel);
    const nextMin = getMinSize(nextPanel);
    const nextMax = getMaxSize(nextPanel);

    if (
      currentSize >= currentMin &&
      currentSize <= currentMax &&
      nextSize >= nextMin &&
      nextSize <= nextMax
    ) {
      // 更新面板大小
      const sizeProperty = props.layout === "horizontal" ? "width" : "height";
      currentPanel.style[sizeProperty] = `${currentSize}px`;
      console.log("currentSize", currentSize);

      // 计算第二个面板的大小，需要扣除分隔线的宽度
      const dividerSize = 8; // 分隔线宽度
      nextPanel.style[
        sizeProperty
      ] = `calc(100% - ${currentSize}px - ${dividerSize}px)`;

      const newSizes = [...startSizes.value];
      newSizes[currentIndex] = currentSize;
      newSizes[nextIndex] = nextSize;
      console.log("newSizes", newSizes);

      // 更新当前尺寸状态
      currentSizes.value = newSizes;

      emit("resize", dragIndex.value, newSizes);
    }
  }
}

/**
 * 处理鼠标抬起事件
 */
function handleMouseUp() {
  if (!isDragging.value) return;

  const newSizes = panelElements.value.map((panel) => {
    return props.layout === "horizontal"
      ? panel.offsetWidth
      : panel.offsetHeight;
  });

  emit("resize-end", dragIndex.value, newSizes);

  isDragging.value = false;
  dragIndex.value = -1;

  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

/**
 * 检查面板是否可以调整大小
 */
function canResize(panel) {
  return panel.getAttribute("data-resizable") !== "false";
}

/**
 * 获取面板最小尺寸
 */
function getMinSize(panel) {
  const min = panel.getAttribute("data-min");
  return min ? (min.endsWith("px") ? parseInt(min) : parseFloat(min)) : 0;
}

/**
 * 获取面板最大尺寸
 */
function getMaxSize(panel) {
  const max = panel.getAttribute("data-max");
  return max
    ? max.endsWith("px")
      ? parseInt(max)
      : parseFloat(max)
    : Infinity;
}

// 提供布局信息给子组件
provide("splitter", {
  layout: computed(() => props.layout),
});

// 清理事件监听器
onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});

// 暴露方法给外部使用
defineExpose({
  initPanels,
  splitterRef,
});
</script>

<style lang="scss" scoped>
@use "../../styles/tm-splitter.scss";
</style>
