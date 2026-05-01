import { useI18n } from 'vue-i18n';

export function useApiI18n() {
  const { t, te } = useI18n();

  function resolveApiText(description?: string | null, descriptionKey?: string | null) {
    if (descriptionKey && te(descriptionKey)) {
      const translated = String(t(descriptionKey)).trim();

      if (translated) {
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
