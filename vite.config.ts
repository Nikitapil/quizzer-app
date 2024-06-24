/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { defineConfig } from 'vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';

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
    }),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      exclude: ['src/api']
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  }
});
