// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    proxy: {
      '/api': {
        // target: 'https://umsbackend.farado.store', // Uncomment for production
        // target: 'http://localhost:8000', // Uncomment for local development
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS with a valid certificate
      },
    },
  },
});
