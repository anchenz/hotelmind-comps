// 导入组件
import TmSplitterPanel from "../SplitterPanel.vue";

// 安装函数
TmSplitterPanel.install = function (app) {
  app.component("TmSplitterPanel", TmSplitterPanel);
};

// 默认导出组件
export default TmSplitterPanel;
