import tailwindcss from '@tailwindcss/vite'
import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'node:url'

// The 3D scene chunk (three.js + R3F, ~665 kB) can't be trimmed further and is
// lazy-loaded only on the uhra post. The limit sits just above it so the
// warning still catches anything new that grows this big.
const CHUNK_SIZE_WARNING_LIMIT_KB = 700;

// App directory and build output are set in react-router.config.ts.
export default defineConfig(({ isSsrBuild }) => ({
  publicDir: `frontend/public`,
  build: {
    chunkSizeWarningLimit: CHUNK_SIZE_WARNING_LIMIT_KB,
    // package.json is "type": "commonjs" for the backend, so the ESM server
    // bundle used for prerendering needs .mjs chunks (entry: serverBuildFile).
    ...(isSsrBuild && {
      rollupOptions: { output: { chunkFileNames: `assets/[name]-[hash].mjs` } },
    }),
  },
  plugins: [
    tailwindcss(),
    svgr({ include: 'frontend/assets/svg/**/*.svg' }),
    reactRouter(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./frontend', import.meta.url))
    }
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
}))
