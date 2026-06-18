import type { ComponentResolver } from 'unplugin-vue-components';
//---import { keysOf, kebabCase } from '@soybeanjs/utils';
import { components } from '../constants/components';

function createResolver() {
  const resolver: ComponentResolver = {
    type: 'component',
    resolve: (name: string) => {
      const $name = name.replace(/(^\w|-\w)/g, char => char.replace('-', '').toUpperCase());

      const values = Object.values(components).flat();

      if (values.includes($name)) {
        //---const path = kebabCase(keysOf(components).find(key => components[key].includes($name))!);

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
