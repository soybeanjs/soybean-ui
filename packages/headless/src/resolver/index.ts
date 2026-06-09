import type { ComponentResolver } from 'unplugin-vue-components';
import { kebabCase, pascalCase } from '@soybeanjs/utils';
import { components } from '../constants';

export interface ResolverOptions {
  /**
   * Whether to use standalone components
   *
   * "true" means use `import { AccordionRoot } from '@soybeanjs/headless/accordion'`
   *
   * "false" means use `import { AccordionRoot } from '@soybeanjs/headless'`
   *
   * @defaultValue false
   */
  standalone?: boolean;
}

function createResolver(options: ResolverOptions = {}) {
  const resolver: ComponentResolver = {
    type: 'component',
    resolve: (name: string) => {
      const values = Object.values(components).flat();
      const $name = pascalCase(name);

      if (values.includes($name)) {
        const moduleName = kebabCase($name).split('-')[0];

        const $from = options.standalone ? `@soybeanjs/headless/${moduleName}` : `@soybeanjs/headless`;

        return {
          name: $name,
          from: $from
        };
      }

      return null;
    }
  };

  return resolver;
}

export default createResolver;
