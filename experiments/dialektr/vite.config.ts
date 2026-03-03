import { defineConfig } from 'vite';

export default defineConfig({
  // relative base so the built files work at any path depth
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
