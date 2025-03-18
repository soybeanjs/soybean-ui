import type { ComponentResolver } from 'unplugin-vue-components';
import { components } from '../constant/components';
import { toKebabCase } from '../shared';
export interface ResolverOptions {
  /**
   * Whether to use standalone components
   *
   * "true" means use `import { AccordionRoot } from '@soybean-ui/primitives/accordion'`
   *
   * "false" means use `import { AccordionRoot } from '@soybean-ui/primitives'`
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

        const _from = options.standalone ? `@soybean-ui/primitives/${moduleName}` : `@soybean-ui/primitives`;

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
