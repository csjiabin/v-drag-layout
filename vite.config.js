import * as path from 'path'
import { defineConfig } from 'vite'
// import vue from "@vitejs/plugin-vue";
import { createVuePlugin } from "vite-plugin-vue2";
import { version } from "./package.json";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin({ jsx: true })],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'lib': path.resolve(__dirname, './lib'),
    }
  },
  define: {
    $version: JSON.stringify(version)
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.js'),
      name: 'VDragLayout',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        }
      }
    }
  }
})
