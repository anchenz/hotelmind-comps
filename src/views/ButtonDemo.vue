<!-- src/views/ButtonDemo.vue -->
<template>
  <div class="button-demo">
    <h2>按钮组件测试</h2>

    <div class="demo-section">
      <h3>基础按钮</h3>
      <div class="demo-row">
        <MyButton label="主要按钮" variant="primary" @click="handleClick" />
        <MyButton label="次要按钮" variant="secondary" @click="handleClick" />
        <MyButton label="危险按钮" variant="danger" @click="handleClick" />
      </div>
    </div>

    <div class="demo-section">
      <h3>按钮事件</h3>
      <div class="demo-row">
        <MyButton label="点击我" @click="handleClick" />
      </div>
      <div v-if="clickCount > 0" class="demo-result">
        按钮被点击了 {{ clickCount }} 次
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MyButton } from "../index.js";

const clickCount = ref(0);

const handleClick = () => {
  clickCount.value += 1;
  console.log("按钮被点击了");
};
</script>

<style scoped>
.button-demo {
  padding: 20px 0;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-row {
  display: flex;
  gap: 16px;
  margin: 16px 0;
}

.demo-result {
  margin-top: 16px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
}
</style>
