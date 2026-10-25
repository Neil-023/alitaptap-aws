import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/alitaptap-aws/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'], 
      manifest: {
        name: "Alitaptap - AI Fire Safety Inspector",
        short_name: "Alitaptap",
        description: "AI-Powered Fire Safety in Your Pocket.",
        theme_color: "#0a2342",
        background_color: "#0a2342",
        display: "standalone",
        start_url: "/Alitaptap/",
        scope: "/Alitaptap/",
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Exposes Vite outside the container
    port: 5173,
    watch: {
      usePolling: true, // Forces file change detection on Docker mounts
      interval: 100,
    },
    hmr: {
      clientPort: 3003, // Matches host port 3003 from docker-compose.yml
    },
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('lucide-react')) {
            return 'lucide';
          }
          if (id.includes('react-router-dom')) {
            return 'router';
          }
        }
      }
    }
  }
})