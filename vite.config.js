import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: '0.0.0.0',
    port: 5000,
    proxy:{
      '/api':{

       // target: 'https://umsbackend.farado.store', // Added https:// to the target URL
        // target: 'http://localhost:8000', // For local development
        changeOrigin: true,
        
      }
    }
  }
})

