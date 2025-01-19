import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHtmlPlugin } from 'vite-plugin-html';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'background.js', dest: '.' },
      ]
    }),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blocked: resolve(__dirname, 'blocked.html'),
      },
    },
  },
});