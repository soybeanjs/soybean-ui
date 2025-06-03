import { defineConfig } from 'vite';
import devtools from 'vite-plugin-vue-devtools';
import vue from 'unplugin-vue/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import unocss from 'unocss/vite';

export default defineConfig({
  root: './playground',
  plugins: [vue(), tsconfigPaths({ root: './', ignoreConfigErrors: true }), unocss(), devtools()],
  server: {
    open: true
  }
});
