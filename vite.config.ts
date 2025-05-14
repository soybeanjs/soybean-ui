import { defineConfig } from 'vite';
import vue from 'unplugin-vue/vite';

export default defineConfig({
  root: './playground',
  plugins: [vue()]
});
