import type { App } from 'vue';
import { setupI18n as installDocsI18n } from '../../../docs/src/modules/i18n';

export function setupI18n(app: App) {
  installDocsI18n(app);
}

export default {
  install(app: App) {
    setupI18n(app);
  }
};
