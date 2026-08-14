// unplugin-vue-components resolver for @soybeanjs/ui-x.
// TODO(ui-x): scaffold placeholder — implement resolver once components exist.

import type { ComponentResolver } from 'unplugin-vue-components';

export function uiXResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: () => undefined
  };
}
