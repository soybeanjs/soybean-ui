import { useI18n } from 'vue-i18n';

export function useApiI18n() {
  const { t } = useI18n({ useScope: 'global' });

  function resolveApiText(description?: string | null, descriptionKey?: string | null) {
    if (descriptionKey) {
      const translated = String(t(descriptionKey)).trim();

      if (translated && translated !== descriptionKey) {
        return translated;
      }
    }

    return description?.trim() ?? '';
  }

  return {
    resolveApiText,
    t
  };
}
