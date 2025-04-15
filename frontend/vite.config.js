import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api' :{
        // target: 'https://zuchat-backend.vercel.app',
        target: 'http://16.171.4.205:8000/',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
