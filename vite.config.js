import * as path from 'path'
import { defineConfig } from 'vite'
// import vue from "@vitejs/plugin-vue";
import { createVuePlugin } from "vite-plugin-vue2";
import vitePluginImp from 'vite-plugin-imp'
import { version } from "./package.json";
// const banner =
//   "/*!\n" +
//   ` * v-drag-layout v${version}\n` +
//   ` * (c) 2021-${new Date().getFullYear()} Evan You\n` +
//   " * Released under the MIT License.\n" +
//   " */";
// https://vitejs.dev/config/
export default defineConfig({
  ssr: false,
  plugins: [
    createVuePlugin({ jsx: true }),
    vitePluginImp({
      libList: [require('autoprefixer')]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'lib': path.resolve(__dirname, './lib'),
    }
  },
  define: {
    $version: JSON.stringify(version)
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  },
  build: {
    // 压缩
    minify: "esbuild",
    // 进行压缩计算
    brotliSize: true,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'VDragLayout',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue', 'vuedraggable'],
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          // vuedraggable: 'Draggable',
        }
      }
    }
  }
})
