import { useI18n } from 'vue-i18n';

export function useApiI18n() {
  const { locale, messages, t } = useI18n({ useScope: 'global' });

  function resolveLocaleMessage(path: string) {
    const segments = path.split('.');
    const localeMessages = messages.value as Record<string, unknown>;
    let current: unknown = localeMessages[locale.value];

    for (const segment of segments) {
      if (!current || typeof current !== 'object' || !(segment in current)) {
        return null;
      }

      current = current[segment as keyof typeof current];
    }

    return typeof current === 'string' ? current : null;
  }

  function resolveApiText(description?: string | null, descriptionKey?: string | null) {
    if (descriptionKey) {
      const translatedMessage = resolveLocaleMessage(descriptionKey);

      if (translatedMessage) {
        const translated = translatedMessage.trim();

        if (translated && translated !== descriptionKey) {
          return translated;
        }
      }
    }

    return description?.trim() ?? '';
  }

  return {
    resolveApiText,
    t
  };
}
