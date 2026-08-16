import { addComponent, defineNuxtModule } from '@nuxt/kit';
import { components } from '../constants/components';

export interface ModuleOptions {
  components: Partial<Record<keyof typeof components, boolean>> | boolean;
}

export default defineNuxtModule({
  meta: {
    name: '@soybeanjs/admin/nuxt',
    configKey: '@soybeanjs/admin',
    compatibility: {
      nuxt: '>=3.14'
    }
  },
  defaults: {
    components: true
  },
  setup(options: ModuleOptions) {
    function getComponents() {
      if (typeof options.components === 'object') {
        return Object.entries(components)
          .filter(([name]) => (options.components as Record<string, boolean>)[name])
          .flatMap(([, _components]) => _components);
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
        filePath: '@soybeanjs/admin'
      });
    }
  }
});
