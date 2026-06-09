import { useI18n } from 'vue-i18n';
import { useGeneratedI18n } from '@/composables/use-generated-i18n';

export function useApiI18n() {
  const { t } = useI18n({ useScope: 'global' });
  const { resolveGeneratedText } = useGeneratedI18n();

  function resolveApiText(description?: string | null, descriptionKey?: string | null) {
    return resolveGeneratedText(description, descriptionKey);
  }

  return {
    resolveApiText,
    t
  };
}
