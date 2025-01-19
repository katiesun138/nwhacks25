// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';  // Import the copy plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        background: './src/background.js',  // Your background.js entry
      },
      output: {
        entryFileNames: '[name].js',  // Preserve file name
      },
      plugins: [
        copy({
          targets: [
            {
              src: 'src/background.js',  // Path to your background script
              dest: 'public',             // Output to public folder
            },
          ],
        }),
      ],
    },
  },
});
