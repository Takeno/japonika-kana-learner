/// <reference types="vitest" />
/// <reference types="vite/client" />

import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.[jt]sx?/],
    },
    threads: false,
    isolate: false,
    setupFiles: ['./vitest-setup.ts'],
  },
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
