import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';

export default defineConfig({
  entry: ['src/index.ts'],
  plugins: [unpluginVue({ isProduction: true }), unpluginVueJsx()],
  clean: true,
  dts: true,
  external: [],
  shims: true,
  sourcemap: false,
  platform: 'neutral'
});
