import { defineConfig } from 'vite';
import vue from 'unplugin-vue/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import unocss from 'unocss/vite';

export default defineConfig({
  root: './playground',
  plugins: [vue(), tsconfigPaths(), unocss()]
});
