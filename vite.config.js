import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define backend URLs for different environments
const backendUrl = process.env.NODE_ENV === 'production'
  ? 'https://cholayilmadrassa-be.onrender.com'
  : 'http://localhost:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
      },
    },
  },
});
