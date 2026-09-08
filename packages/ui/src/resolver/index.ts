import type { ComponentResolver } from 'unplugin-vue-components';
import { keysOf, kebabCase, pascalCase } from '@soybeanjs/headless/shared';
import { components } from '../constants/components';

function createResolver() {
  const map = new Map<string, string>();

  keysOf(components).forEach(key => {
    components[key].forEach(component => {
      map.set(component, key);
    });
  });

  const resolver: ComponentResolver = {
    type: 'component',
    resolve: (id: string) => {
      const name = pascalCase(id);

      const value = map.get(name);

      if (!value) {
        return null;
      }

      const path = kebabCase(value);

      return {
        name,
        from: `@soybeanjs/ui/${path}`
      };
    }
  };

  return resolver;
}

export default createResolver;
