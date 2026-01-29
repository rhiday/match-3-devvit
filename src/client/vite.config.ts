import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    {
      name: 'copy-public-assets',
      closeBundle() {
        const outDir = resolve(__dirname, '../../dist/client');
        const publicDir = resolve(__dirname, './public');
        
        try {
          // Copy public assets
          copyFileSync(resolve(publicDir, 'snoo.png'), resolve(outDir, 'snoo.png'));
          copyFileSync(resolve(publicDir, 'pop.ogg'), resolve(outDir, 'pop.ogg'));
          copyFileSync(resolve(publicDir, 'Plop.ogg'), resolve(outDir, 'Plop.ogg'));
          console.log('✓ Copied public assets');
        } catch (err) {
          console.error('Failed to copy public assets:', err);
        }
      }
    }
  ],
  logLevel: 'warn',
  build: {
    outDir: '../../dist/client',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        splash: 'splash.html',
        game: 'game.html',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
        sourcemapFileNames: '[name].js.map',
      },
    },
  },
});
