// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import fs from "fs";
import path from "path";

// 判断当前命令是开发还是构建
const command = process.env.npm_lifecycle_event || "";
const isDev = command === "dev";
const isBuild = command === "build";

// 获取components目录下的所有组件
function getComponentEntries() {
  const componentsDir = path.resolve(__dirname, "src/components");
  const entries = {};

  // 添加主入口
  entries.index = resolve(__dirname, "src/index.js");

  // 遍历components目录
  const dirs = fs.readdirSync(componentsDir);
  dirs.forEach((dir) => {
    const fullDir = path.join(componentsDir, dir);
    const stats = fs.statSync(fullDir);

    if (stats.isDirectory()) {
      // 目录情况，如TmSplitter文件夹
      const indexFile = path.join(fullDir, "index.vue");
      if (fs.existsSync(indexFile)) {
        entries[dir.toLowerCase()] = path.join(fullDir, "index.vue");
      }
    } else if (stats.isFile() && dir.endsWith(".vue")) {
      // 单文件组件情况，如Button.vue
      const name = dir.replace(".vue", "").toLowerCase();
      entries[name] = path.join(componentsDir, dir);
    }
  });

  return entries;
}

export default defineConfig({
  plugins: [vue()],
  // 根据命令类型使用不同的配置
  ...(isDev
    ? {
        // 开发模式配置
        root: "src/views",
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
      }
    : {
        // 构建模式配置
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
      }),
});
