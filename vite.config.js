import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copy } from 'vite-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: './app.html',
    },
  },
  plugins: [react()],
})
