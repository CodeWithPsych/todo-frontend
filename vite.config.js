import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3006,
    proxy: {
      '/api/': {
        target: 'https://codewithpsychtodobackend.netlify.app/',
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
