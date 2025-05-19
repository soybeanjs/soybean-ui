import type { ComponentResolver } from 'unplugin-vue-components';
import { components } from '../constants';
import { toKebabCase } from '../shared';

export interface ResolverOptions {
  /**
   * Whether to use standalone components
   *
   * "true" means use `import { AccordionRoot } from 'soybean-primitives/accordion'`
   *
   * "false" means use `import { AccordionRoot } from 'soybean-primitives'`
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

        const $from = options.standalone ? `soybean-primitives/${moduleName}` : `soybean-primitives`;

        return {
          name,
          from: $from
        };
      }

      return null;
    }
  };

  return resolver;
}

export default createResolver;
