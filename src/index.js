// src/index.js
// 注意：样式文件已移至 styles 命名空间，请按需引入
// 全量引入样式：import '@tourmindai/components/styles/all'
// 按需引入：import '@tourmindai/components/styles/theme' + 使用组件（组件自带样式）
import TmSplitter from "./components/TmSplitter/index.vue";
import TmSplitterPanel from "./components/TmSplitterPanel/index.vue";

// 创建 install 方法
const install = (app) => {
  app.component("TmSplitter", TmSplitter);
  app.component("TmSplitterPanel", TmSplitterPanel);
  // 注册其他组件...
};

// 所有组件列表
const components = {
  TmSplitter,
  TmSplitterPanel,
};

// 导出单个组件
export { TmSplitter, TmSplitterPanel, install };

// 导出 Vue 插件
export default {
  install,
  ...components,
};
