import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/login': {
        target: 'https://dev.apinetbo.bekindnetwork.com/api/Authentication',
        changeOrigin: true,
        rewrite: (path) => {
          // /api/login?path=/Login → /Login
          const url = new URL(path, 'http://localhost');
          const pathParam = url.searchParams.get('path') || '/Login';
          return pathParam;
        }
      },
      '/api/actions': {
        target: 'https://dev.api.bekindnetwork.com/api/v1',
        changeOrigin: true,
        rewrite: (path) => {
          // /api/actions?path=/actions/admin-list → /actions/admin-list
          const url = new URL(path, 'http://localhost');
          const pathParam = url.searchParams.get('path') || '';
          // Mantener los query params originales excepto 'path'
          const params = new URLSearchParams(url.search);
          params.delete('path');
          return pathParam + (params.toString() ? `?${params.toString()}` : '');
        }
      },
      '/auth': {
        target: 'https://dev.apinetbo.bekindnetwork.com/api/Authentication',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      }
    }
  }
})
