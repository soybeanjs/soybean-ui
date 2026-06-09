import type { ComponentResolver } from 'unplugin-vue-components';
import { components } from '../constants/components';

function createResolver() {
  const resolver: ComponentResolver = {
    type: 'component',
    resolve: (name: string) => {
      const values = Object.values(components).flat();

      const $name = name.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase());

      if (values.includes($name)) {
        return {
          name: $name,
          from: '@soybeanjs/ui'
        };
      }

      return null;
    }
  };

  return resolver;
}

export default createResolver;
