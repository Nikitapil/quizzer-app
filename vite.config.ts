/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { defineConfig } from 'vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/quizzer-app/',
  plugins: [
    vue(),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      runtimeOnly: false,
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        '/src/locales/**'
      )
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      include: ['src/*'],
      exclude: ['src/api']
    },
    setupFiles: ['vitest.setup.ts']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
