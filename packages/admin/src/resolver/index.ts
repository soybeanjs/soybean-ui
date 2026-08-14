// unplugin-vue-components resolver for @soybeanjs/admin.
// TODO(admin): scaffold placeholder — implement resolver once components exist.

import type { ComponentResolver } from 'unplugin-vue-components';

export function adminResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: () => undefined
  };
}
