import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite-plus';
import type { RolldownPluginOption } from 'rolldown';
import pkg from './package.json' with { type: 'json' };

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

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  pack: {
    entry: ['src/index.ts'],
    platform: 'node',
    deps: {
      neverBundle: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]
    },
    plugins: [cssRawPlugin()],
    clean: true,
    dts: true,
    sourcemap: false,
    minify: true,
    fixedExtension: false
  }
});
