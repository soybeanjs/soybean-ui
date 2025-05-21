import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';
import fg from 'fast-glob';

export default defineConfig(() => {
  const entry = getEntry();

  return {
    entry,
    platform: 'neutral',
    external: ['vue', '@vue/shared', '@unocss/reset', '@nuxt/schema', '@nuxt/kit', 'unplugin-vue-components'],
    clean: true,
    dts: {
      vue: true
    },
    plugins: [unpluginVue({ isProduction: true }), unpluginVueJsx()],
    sourcemap: false,
    minify: false
  };
});

function getEntry() {
  const entry: Record<string, string> = {};

  const names = fg.sync('src/*/index.ts');
  const excludes = ['types'];
  names.forEach(n => {
    const name = n.replace('/index.ts', '').replace('src/', '');
    if (excludes.includes(name)) return;
    entry[`${name}/index`] = n;
  });

  // components entry
  const components = fg.sync('src/components/**/index.ts');
  components.forEach(component => {
    const name = component.replace('/index.ts', '').replace('src/components/', '');
    entry[`components/${name}/index`] = component;
  });

  // index entry
  entry.index = 'src/index.ts';
  entry.types = 'src/types/index.ts';

  return entry;
}
