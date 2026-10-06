import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // Default build targets the domain root (Superhosting: https://pizzavetrilo.bg/).
    // Set DEPLOY_TARGET=gh (GitHub Actions workflow / `npm run build:gh`)
    // to build for GitHub Pages at /pizza-vetrilo/.
    base: process.env.DEPLOY_TARGET === 'gh' ? '/pizza-vetrilo/' : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
