// unplugin-vue-components resolver for @soybeanjs/chart.
// TODO(chart): scaffold placeholder — implement resolver once components exist.

import type { ComponentResolver } from 'unplugin-vue-components';

export function chartResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: () => undefined
  };
}
