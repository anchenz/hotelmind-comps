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

<style lang="scss" scoped>
@use "../styles/button.scss";
</style>
