// vite.config.styles.js - 专门用于构建样式文件
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: {
        // 全局主题样式
        theme: resolve(__dirname, "src/styles/base/theme.scss"),
        // 所有组件样式合集
        all: resolve(__dirname, "src/entries/all-styles.js"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
        // 样式文件输出到 styles 目录
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "styles/[name].[ext]";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },
});
