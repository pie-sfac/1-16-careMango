import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@', replacement: '/src' },
    ],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warnHandler) {
        // if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        if (warning.message.includes('is declared but its value is never read.')) return;
        warnHandler(warning);
        // return;
      },
    },
  },
});
