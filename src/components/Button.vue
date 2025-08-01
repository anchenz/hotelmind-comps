<!-- src/components/Button.vue -->
<template>
  <button class="my-button" :class="variantClass" @click="onClick">
    {{ label }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "按钮",
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "danger"].includes(value),
  },
});

const emits = defineEmits(["click"]);

const onClick = () => {
  emits("click");
};

const variantClass = computed(() => `my-button--${props.variant}`);
</script>

<style lang="scss">
// 注意：此样式依赖主题变量，用户需要先引入theme
// import "@tourmindai/components/theme"

.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  line-height: 1.4;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(var(--primary-500-rgb), 0.2);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  // Primary variant
  &--primary {
    background-color: var(--button-bg);
    color: var(--button-text);

    &:hover:not(:disabled) {
      background-color: var(--button-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--button-active);
    }
  }

  // Secondary variant
  &--secondary {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--border-primary);

    &:hover:not(:disabled) {
      background-color: var(--item-hover-bg);
      border-color: var(--primary-color);
    }

    &:active:not(:disabled) {
      background-color: var(--primary-color);
      color: var(--white);
    }
  }

  // Danger variant
  &--danger {
    background-color: var(--error);
    color: var(--white);

    &:hover:not(:disabled) {
      background-color: #d32f2f;
    }

    &:active:not(:disabled) {
      background-color: #b71c1c;
    }
  }
}
</style>
