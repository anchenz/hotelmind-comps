import { resolve } from "path";
import { existsSync } from "fs";

// 自动导入组件插件
const components = ["TmSplitter", "TmSplitterPanel"];

const resolveComponent = (name) => {
  // 优先导入ES模块
  const esPath = resolve(__dirname, `../dist/es/index.js`);
  if (existsSync(esPath)) {
    switch (name) {
      case "TmSplitter":
        componentPath = "@tourmindai/components/es/components/TmSplitter";
        break;
      case "TmSplitterPanel":
        componentPath = "@tourmindai/components/es/components/TmSplitterPanel";
        break;
      default:
        componentPath = "@tourmindai/components";
    }
  }

  return componentPath || "@tourmindai/components";
};

export default function unpluginVue(options = {}) {
  return {
    name: "unplugin-vue-components",
    configResolved() {
      console.log("组件自动导入插件已启用");
    },
  };
}
