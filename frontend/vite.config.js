import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        delimiters: ['{{', '}}'],
        whitespace: 'preserve'
      }
    }
  })],
  build: {
    outDir: 'dist',  
    emptyOutDir: true 
  }
})
