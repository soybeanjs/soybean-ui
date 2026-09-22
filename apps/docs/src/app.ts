import { defineApp } from 'ubean/client';
import { createThemeInitScript } from '@soybeanjs/theme/ssr';
import { progress } from '@soybeanjs/ui';
// import '@soybeanjs/ui/styles.css';
import 'uno.css';
import { docsFontLinks } from './shared/fonts';
import './styles/global.css';

export default defineApp({
  rootId: 'app',
  head: {
    title: 'SoybeanUI Documentation',
    htmlAttrs: { lang: 'en' },
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    // The customizer swaps `--font-*` at runtime, so every family it can select
    // has to be loaded up front — see `shared/fonts.ts`.
    link: docsFontLinks,
    script: [{ innerHTML: createThemeInitScript() }]
  },
  router: {
    setup(router) {
      router.beforeEach((to, from) => {
        // Skip the initial navigation: the first page is already SSR-rendered,
        // so running progress before hydration mutates the provider's inline
        // style and triggers a hydration style mismatch.
        if (from.matched.length > 0 && to.path !== from.path) {
          progress.start();
        }
      });

      router.afterEach(() => {
        progress.done();
      });
    }
  }
});
