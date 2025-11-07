import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';
import pkg from './package.json' with { type: 'json' };
import headlessPkg from './headless/package.json' with { type: 'json' };

export default defineConfig({
  entry: ['src/index.ts', 'src/nuxt/index.ts', 'src/resolver/index.ts'],
  platform: 'neutral',
  external: [
    ...Object.keys(headlessPkg.dependencies),
    ...Object.keys(headlessPkg.devDependencies),
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.devDependencies),
    '@nuxt/kit',
    '@nuxt/schema',
    '@vueuse/integrations/useFuse'
  ],
  clean: true,
  dts: {
    vue: true
  },
  unbundle: true,
  plugins: [unpluginVue({ isProduction: true }), unpluginVueJsx()],
  sourcemap: false,
  minify: true
});
