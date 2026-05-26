import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import fg from 'fast-glob';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  entry: [
    ...fg.sync('src/components/**/index.ts'),
    ...fg.sync('src/*/index.ts'),
    'src/locale/langs/*.ts',
    'src/index.ts'
  ],
  platform: 'browser',
  target: 'es2020',
  deps: {
    neverBundle: [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.dependencies)],
    alwaysBundle: ['aria-hidden']
  },
  clean: true,
  dts: {
    vue: true
  },
  unbundle: true,
  plugins: [unpluginVue({ isProduction: true })],
  sourcemap: false,
  minify: true,
  define: {
    'import.meta.env.DEV': 'undefined',
    'import.meta.env.MODE': 'undefined'
  }
});
