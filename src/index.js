// src/index.js
import MyButton from "./components/Button.vue";
import "./styles/global.scss"; // 引入全局样式
import TmSplitter from "./components/TmSplitter/index.vue";
import TmSplitterPanel from "./components/TmSplitter/SplitterPanel.vue";

// 创建 install 方法
const install = (app) => {
  app.component("MyButton", MyButton);
  app.component("TmSplitter", TmSplitter);
  app.component("TmSplitterPanel", TmSplitterPanel);
  // 注册其他组件...
};

// 所有组件列表
const components = {
  MyButton,
  TmSplitter,
  TmSplitterPanel,
};

// 导出单个组件
export { MyButton, TmSplitter, TmSplitterPanel, install };

// 导出 Vue 插件
export default {
  install,
  ...components,
};
