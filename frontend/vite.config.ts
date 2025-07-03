import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs', // Explicitly point to the config
  },
  server: {
    port: 3004,
    host: true,
  },
});