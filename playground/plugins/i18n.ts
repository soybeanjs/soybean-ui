import type { App } from 'vue';
import { install } from '../../docs/src/modules/i18n';

export function setupI18n(app: App) {
  // @ts-expect-error ignore
  install({ app });
}

export default {
  install(app: App) {
    setupI18n(app);
  }
};
