import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      target: "https://eticaret-backend.onrender.com",
        changeOrigin: true,
        secure: false,
    }
  },
  plugins: [react()],
  optimizeDeps: {
    include: ['redux-thunk'], 
  },
});

