// vite.config.styles.js - 专门用于构建样式文件
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist/styles",
    emptyOutDir: false, // 不清空目录，保留之前的构建文件
    lib: {
      entry: {
        // 全量样式入口
        all: resolve(__dirname, "src/entries/all-styles.js"),
        // 主题文件独立入口
        theme: resolve(__dirname, "src/entries/theme.js"),
        // 各组件独立样式入口
        button: resolve(__dirname, "src/components/Button/style-standalone.js"),
        "tm-splitter": resolve(
          __dirname,
          "src/components/TmSplitter/style-standalone.js"
        ),
      },
      formats: ["es"], // 只需要ES格式，因为这些主要是CSS
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
