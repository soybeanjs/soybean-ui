import type { Router } from 'vue-router';
import { progress } from '@soybeanjs/ui';

export function setupProgressGuard(router: Router) {
  if (import.meta.env.SSR) return;

  router.beforeEach((to, from) => {
    if (to.path !== from.path) {
      progress.start();
    }
  });

  router.afterEach(() => {
    progress.done();
  });
}
