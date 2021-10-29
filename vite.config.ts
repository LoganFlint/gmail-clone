
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import components from "vite-plugin-components"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), components()],
})
