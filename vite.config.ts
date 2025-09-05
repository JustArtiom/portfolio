import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: `frontend`,
  plugins: [react()],
  build: {
    outDir: `../dist_frontend`,
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:3000`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})