import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Налаштування для CSS (Tailwind)
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },

  // Налаштування для сервера розробки
  server: {
    // Налаштування проксі для перенаправлення API-запитів
    proxy: {
      // Будь-який запит, що починається з /api, буде перенаправлено
      '/api': {
        // Адреса вашого NestJS-бекенду
        target: 'http://localhost:3000', // Переконайтесь, що порт правильний
        changeOrigin: true,
        // Переписуємо шлях: /api/employees -> /employees
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
