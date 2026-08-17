// Nuxt module for @soybeanjs/chart.
import { addComponent, defineNuxtModule } from '@nuxt/kit';
import { components } from '../constants/components';

export default defineNuxtModule({
  meta: {
    name: '@soybeanjs/chart',
    configKey: 'chart',
    compatibility: {
      nuxt: '>=3.14'
    }
  },
  setup() {
    for (const component of Object.values(components).flat()) {
      addComponent({
        name: component,
        export: component,
        filePath: '@soybeanjs/chart'
      });
    }
  }
});
