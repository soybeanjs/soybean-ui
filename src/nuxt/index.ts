import { addComponent, defineNuxtModule } from '@nuxt/kit';
import { components } from '../constants';

export interface ModuleOptions {
  components: Partial<Record<keyof typeof components, boolean>> | boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'soybean-headless/nuxt',
    configKey: 'soybean-headless',
    compatibility: {
      nuxt: '>=3.14'
    }
  },
  defaults: {
    components: true
  },
  setup(options) {
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
        filePath: 'soybean-headless'
      });
    }
  }
});
