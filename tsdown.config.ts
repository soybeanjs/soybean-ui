import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';
import fg from 'fast-glob';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  entry: [
    ...fg.sync('src/components/**/index.ts'),
    ...fg.sync('src/*/index.ts').filter(glob => glob !== 'src/types/index.ts'),
    'src/index.ts'
  ],
  platform: 'neutral',
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies), '@nuxt/kit', '@nuxt/schema'],
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
