// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// 判断当前命令是开发还是构建
const command = process.env.npm_lifecycle_event || "";
const isDev = command === "dev";
const isBuild = command === "build";

// 开发模式配置
const devConfig = {
  root: ".",
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["vue", "vue-router"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
};

// 构建模式配置
const buildConfig = {
  build: {
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "TourmindComponents",
      fileName: (format) => `tourmindai-components.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named", // 修复导出警告
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
};

function getConfig() {
  const strategy = {
    dev: devConfig,
    build: buildConfig,
  };
  return strategy[isDev ? "dev" : "build"];
}

export default defineConfig({
  plugins: [vue()],
  ...getConfig(),
});
