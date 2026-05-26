import { addComponent, defineNuxtModule } from '@nuxt/kit';
import { components } from '../constants';

export interface ModuleOptions {
  components: Partial<Record<keyof typeof components, boolean>> | boolean;
}

export default defineNuxtModule({
  meta: {
    name: '@soybeanjs/headless/nuxt',
    configKey: '@soybeanjs/headless',
    compatibility: {
      nuxt: '>=3.14'
    }
  },
  defaults: {
    components: true
  },
  setup(options: ModuleOptions, nuxt) {
    nuxt.hook('vite:extendConfig', config => {
      if (config.define) {
        config.define['import.meta.env.DEV'] = config.define?.['import.meta.dev'];
        config.define['import.meta.env.MODE'] = config.define?.['import.meta.test'] ? 'test' : 'development';
      }
    });

    function getComponents() {
      if (typeof options.components === 'object') {
        return Object.entries(components)
          .filter(([name]) => (options.components as Record<string, boolean>)[name])
          .flatMap(([_, _components]) => _components);
      }

      if (options.components) {
        return Object.values(components).flat();
      }

      return [];
    }

    for (const component of getComponents()) {
      addComponent({
        name: `${component}`,
        export: component,
        filePath: '@soybeanjs/headless'
      });
    }
  }
});
