// src/index.js
import MyButton from "./components/Button.vue";
// 注意：样式文件已移除，请按需引入样式
// 全量引入样式：import '@tourmindai/components/style'
// 按需引入：import '@tourmindai/components/theme' + import '@tourmindai/components/button/style'
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
