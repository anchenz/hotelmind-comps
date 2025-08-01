// 导入组件
import TmSplitter from "./index.vue";
import "./style.js";

// 安装函数
TmSplitter.install = function (app) {
  app.component("TmSplitter", TmSplitter);
};

// 默认导出组件
export default TmSplitter;
