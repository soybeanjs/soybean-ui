import type { ComponentResolver } from 'unplugin-vue-components';
import { components } from '../constant/components';
import { toKebabCase } from '../shared';

export interface ResolverOptions {
  /**
   * Whether to use standalone components
   *
   * "true" means use `import { AccordionRoot } from 'soy-ui/accordion'`
   *
   * "false" means use `import { AccordionRoot } from 'soy-ui'`
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

      if (values.includes(name)) {
        const moduleName = toKebabCase(name).split('-')[0];

        const _from = options.standalone ? `soy-ui/${moduleName}` : `soy-ui`;

        return {
          name,
          from: _from
        };
      }
    }
  };

  return resolver;
}

export default createResolver;
