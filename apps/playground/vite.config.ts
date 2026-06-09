import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'vue-router/vite';
import Unocss from 'unocss/vite';
import UiResolver from '../../packages/ui/src/resolver';

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    Vue(),
    VueJsx(),
    Unocss(),
    VueRouter({
      dts: fileURLToPath(new URL('./src/typings/typed-router.d.ts', import.meta.url))
    }),
    Components({
      dts: fileURLToPath(new URL('./src/typings/components.d.ts', import.meta.url)),
      resolvers: [UiResolver()]
    })
  ],
  server: {
    open: true
  }
});
