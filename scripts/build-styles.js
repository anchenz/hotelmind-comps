// scripts/build-styles.js
import { build } from "vite";
import { resolve } from "path";
import fs from "fs";

const __dirname =
  process.platform === "win32"
    ? new URL(".", import.meta.url).pathname.slice(1)
    : new URL(".", import.meta.url).pathname;

async function buildStylesIndividually() {
  const stylesDir = resolve(__dirname, "../dist/styles");

  // 确保目录存在
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  const stylesToBuild = [
    {
      name: "all",
      entry: resolve(__dirname, "../src/entries/all-styles.js"),
      description: "全量样式",
    },
    {
      name: "theme",
      entry: resolve(__dirname, "../src/entries/theme.js"),
      description: "主题样式",
    },
    {
      name: "button",
      entry: resolve(__dirname, "../src/components/Button/style-standalone.js"),
      description: "Button组件样式",
    },
    {
      name: "tm-splitter",
      entry: resolve(
        __dirname,
        "../src/components/TmSplitter/style-standalone.js"
      ),
      description: "TmSplitter组件样式",
    },
  ];

  for (const style of stylesToBuild) {
    console.log(`构建 ${style.description}...`);

    try {
      await build({
        configFile: false,
        build: {
          outDir: stylesDir,
          emptyOutDir: false,
          lib: {
            entry: style.entry,
            name: style.name,
            fileName: () => `${style.name}.js`,
            formats: ["es"],
          },
          rollupOptions: {
            output: {
              assetFileNames: `${style.name}.[ext]`,
            },
          },
        },
      });

      console.log(`✓ ${style.description} 构建完成`);
    } catch (error) {
      console.error(`✗ ${style.description} 构建失败:`, error);
    }
  }

  console.log("所有样式文件构建完成！");
}

buildStylesIndividually().catch(console.error);
