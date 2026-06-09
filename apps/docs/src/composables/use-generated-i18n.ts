import { useI18n } from 'vue-i18n';

export function useGeneratedI18n() {
  const { locale, messages } = useI18n({ useScope: 'global' });

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

  function resolveGeneratedText(text?: string | null, textKey?: string | null) {
    if (textKey) {
      const translatedMessage = resolveLocaleMessage(textKey);

      if (translatedMessage) {
        const translated = translatedMessage.trim();

        if (translated && translated !== textKey) {
          return translated;
        }
      }
    }

    return text?.trim() ?? '';
  }

  return {
    resolveGeneratedText
  };
}
