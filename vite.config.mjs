// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Sadece local development için gerekli
      // Local backend varsa URL’yi değiştir
      '/api': {
        target: 'http://localhost:5173',  // Local backend yoksa mock veya frontend ile test
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
