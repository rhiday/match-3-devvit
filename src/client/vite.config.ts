import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, readdirSync, mkdirSync } from 'fs';
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
          copyFileSync(resolve(publicDir, 'snapmatch.jpeg'), resolve(outDir, 'snapmatch.jpeg'));
          copyFileSync(resolve(publicDir, 'pop.ogg'), resolve(outDir, 'pop.ogg'));
          copyFileSync(resolve(publicDir, 'Plop.ogg'), resolve(outDir, 'Plop.ogg'));
          
          // Copy all tile images
          const tilesDir = resolve(publicDir, 'tiles');
          const outTilesDir = resolve(outDir, 'tiles');
          mkdirSync(outTilesDir, { recursive: true });
          
          const tileFiles = readdirSync(tilesDir);
          tileFiles.forEach(file => {
            if (file.endsWith('.png')) {
              copyFileSync(resolve(tilesDir, file), resolve(outTilesDir, file));
            }
          });
          
          console.log('✓ Copied public assets and tile images');
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
