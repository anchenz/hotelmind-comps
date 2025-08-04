// src/views/main.js
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import "@/styles/base/theme.scss";
// 导入各种示例组件
import SplitterDemo from "./src/views/TmSplitterDemo.vue";
import Home from "./src/views/Home.vue";
// 路由配置
const routes = [
  { path: "/", component: Home },
  { path: "/splitter", component: SplitterDemo },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
