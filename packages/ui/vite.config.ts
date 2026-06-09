import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite-plus';
import vue from '@vitejs/plugin-vue';
import type { RolldownPluginOption } from 'rolldown';
import unpluginVue from 'unplugin-vue/rolldown';
import headlessPkg from '../headless/package.json' with { type: 'json' };
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [vue()],
  pack: {
    entry: ['src/index.ts', 'src/nuxt/index.ts', 'src/resolver/index.ts'],
    platform: 'neutral',
    deps: {
      neverBundle: Object.keys({
        ...headlessPkg.dependencies,
        ...headlessPkg.devDependencies,
        ...pkg.dependencies,
        ...pkg.devDependencies
      })
    },
    clean: true,
    dts: {
      vue: true
    },
    unbundle: true,
    plugins: [cssRawPlugin(), unpluginVue({ isProduction: true })],
    sourcemap: false,
    minify: true,
    define: {
      'import.meta.env.DEV': 'undefined',
      'import.meta.env.MODE': 'undefined'
    }
  },
  test: {
    globals: true,
    include: ['test/specs/**/*.spec.ts'],
    environment: 'happy-dom',
    setupFiles: ['./test/setup.ts']
  }
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
