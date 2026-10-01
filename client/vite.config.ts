import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    allowedHosts: ['.trycloudflare.com'], // tunnel demo (Cloudflare quick tunnel)
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
