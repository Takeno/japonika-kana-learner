/// <reference types="vitest" />
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  test: {
    setupFiles: ['./vitest-setup.ts'],
  },
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
});
