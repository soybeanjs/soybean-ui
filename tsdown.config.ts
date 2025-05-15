import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';
import fg from 'fast-glob';

export default defineConfig(() => {
  const entry: Record<string, string> = {};

  const components = fg.sync('src/components/**/index.ts');
  components.forEach(component => {
    const name = component.replace('/index.ts', '').replace('src/components/', '');
    entry[`components/${name}/index`] = component;
  });

  return {
    entry: {
      'shared/index': 'src/shared/index.ts',
      ...entry,
      index: 'src/index.ts'
    },
    platform: 'neutral',
    external: ['vue', '@vue/shared'],
    clean: true,
    dts: {
      vue: true
    },
    plugins: [unpluginVue({ isProduction: true }), unpluginVueJsx()],
    sourcemap: false,
    minify: false
  };
});
