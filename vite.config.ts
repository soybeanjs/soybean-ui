import { defineConfig } from 'vite';
import vue from 'unplugin-vue/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: './playground',
  plugins: [vue(), tsconfigPaths()]
});
