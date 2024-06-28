import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 브라우저 자동 열기 설정
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true
      }
    }
  },
  optimizeDeps: {
    // exclude: ['msw'], // 의존성 추가
    include: ['msw'], // 필요한 경우 이 부분을 추가하세요
    exclude: ['some-large-dependency'], // 필요 없는 경우를 이 부분에 추가
  }
});

