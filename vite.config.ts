/// <reference types="vitest" />
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({mode}) => ({
  test: {
    setupFiles: ['./vitest-setup.ts'],
  },
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  ...(mode === 'kana-quiz'
    ? {
        build: {
          lib: {
            entry: `${__dirname}/src/target/kana-quiz.tsx`,
            name: 'Kana-Quiz',
            fileName: 'kana-quiz',
          },
          rollupOptions: {
            output: {
              assetFileNames: (assetInfo) => {
                if (assetInfo.name === 'style.css') {
                  return 'kana-quiz.css';
                }
                return assetInfo.name;
              },
            },
          },
        },
      }
    : undefined),
}));
