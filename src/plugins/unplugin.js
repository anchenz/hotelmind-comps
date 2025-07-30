/**
 * 此文件用于支持使用unplugin-vue-components进行自动按需引入
 */

// 组件列表
const components = ["MyButton", "TmSplitter", "TmSplitterPanel"];

// 组件解析器
function TourmindResolver() {
  return {
    type: "component",
    resolve: (name) => {
      if (components.includes(name)) {
        // 转换组件名为对应的路径
        let componentPath;
        switch (name) {
          case "MyButton":
            componentPath = "@tourmindai/components/es/components/Button";
            break;
          case "TmSplitter":
            componentPath = "@tourmindai/components/es/components/TmSplitter";
            break;
          case "TmSplitterPanel":
            componentPath =
              "@tourmindai/components/es/components/TmSplitter/SplitterPanel";
            break;
          default:
            return;
        }

        return {
          name,
          from: componentPath,
          sideEffects: `${componentPath}/style`,
        };
      }
    },
  };
}

export { TourmindResolver };
