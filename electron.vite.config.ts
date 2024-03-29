import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

// import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src') // если псевдоним для корня
        // '@': fileURLToPath(new URL('./src/renderer/src', import.meta.url))
      }
    },
    plugins: [vue()]
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "@scss/shared.scss";'
    //     }
    //   }
    // }
  }
})
