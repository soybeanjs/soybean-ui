import { readFileSync } from 'node:fs';
import { defineConfig } from 'tsdown';
import type { RolldownPluginOption } from 'rolldown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';
import pkg from './package.json' with { type: 'json' };
import headlessPkg from './headless/package.json' with { type: 'json' };

export default defineConfig({
  entry: ['src/index.ts', 'src/nuxt/index.ts', 'src/resolver/index.ts'],
  platform: 'neutral',
  deps: {
    neverBundle: [
      ...Object.keys(headlessPkg.dependencies),
      ...Object.keys(headlessPkg.devDependencies),
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.devDependencies),
      '@vueuse/integrations/useFuse'
    ]
  },
  clean: true,
  dts: {
    vue: true
  },
  unbundle: true,
  plugins: [cssRawPlugin(), unpluginVue({ isProduction: true }), unpluginVueJsx()],
  sourcemap: false,
  minify: true
});

function cssRawPlugin(): RolldownPluginOption {
  const rawCssQueryRE = /\.css\?raw$/;

  const plugin: RolldownPluginOption = {
    name: 'raw-css-loader',
    load(id) {
      if (!rawCssQueryRE.test(id)) return null;

      const filePath = id.replace(/\?raw$/, '');
      const css = readFileSync(filePath, 'utf8');

      return `export default ${JSON.stringify(css)};`;
    }
  };

  return plugin;
}
