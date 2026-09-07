import { createThemeInitScript } from '@soybeanjs/theme/ssr';
import { progress } from '@soybeanjs/ui';
import { defineApp } from 'ubean/client';
import 'uno.css';

export default defineApp({
  rootId: 'app',
  head: {
    title: 'SoybeanUI Documentation',
    htmlAttrs: { lang: 'en' },
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    script: [{ innerHTML: createThemeInitScript() }]
  },
  router: {
    setup(router) {
      router.beforeEach((to, from) => {
        if (to.path !== from.path) {
          progress.start();
        }
      });

      router.afterEach(() => {
        progress.done();
      });
    }
  }
});
