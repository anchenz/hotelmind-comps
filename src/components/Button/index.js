// 导入组件
import Button from "../Button.vue";
import "./style.js";

// 安装函数
Button.install = function (app) {
  app.component("MyButton", Button);
};

// 默认导出组件
export default Button;
