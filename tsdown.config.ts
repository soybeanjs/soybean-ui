import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';
import pkg from './package.json';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/constant/index.ts',
    'src/composables/index.ts',
    'src/nuxt/index.ts',
    'src/resolver/index.ts'
  ],
  platform: 'neutral',
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies), '@vue/shared'],
  noExternal: ['aria-hidden'],
  clean: true,
  dts: {
    vue: true
  },
  unbundle: true,
  plugins: [unpluginVue({ isProduction: true }), unpluginVueJsx()],
  sourcemap: false,
  minify: false
});
