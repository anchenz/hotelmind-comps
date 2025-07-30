// src/views/main.js
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import "../styles/base/index.scss";
import App from "./App.vue";
import Home from "./Home.vue";
import ButtonDemo from "./ButtonDemo.vue";
import TmSplitterDemo from "./TmSplitterDemo.vue";

// 导入组件库
import Components from "../index.js";

// 创建路由
const routes = [
  { path: "/", component: Home },
  { path: "/button", component: ButtonDemo },
  { path: "/splitter", component: TmSplitterDemo },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 创建应用
const app = createApp(App);

// 使用路由
app.use(router);

// 使用组件库
app.use(Components);

// 挂载应用
app.mount("#app");
