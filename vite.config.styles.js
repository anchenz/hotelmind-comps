// vite.config.styles.js - 专门用于构建样式文件
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: {
        theme: resolve(__dirname, "src/styles/index.scss"),
        "tm-splitter": resolve(
          __dirname,
          "src/components/TmSplitter/style-standalone.js"
        ),
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
