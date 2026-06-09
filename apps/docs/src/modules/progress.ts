import { progress } from '@soybeanjs/ui';
import type { UserModule } from '@/types';

export const install: UserModule = ({ router }) => {
  if (!import.meta.env.SSR) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path) {
        progress.start();
      }
    });

    router.afterEach(() => {
      progress.done();
    });
  }
};
