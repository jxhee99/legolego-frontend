import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // WebSocket은 global 객체를 필요하기 때문에 지정
  plugins: [react()],
  define: {
    global: 'window', // global 변수를 window로 정의
  },
  server: {
    open: true, // 브라우저 자동 열기 설정
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
      '/ws': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
      }
    },
  },
});
