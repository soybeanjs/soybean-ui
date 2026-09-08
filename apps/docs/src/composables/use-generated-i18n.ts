import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

type LocaleMessages = Record<string, unknown>;

// Generated API / changelog descriptions live in `src/generated/{api,changelog}-locales/*.json`
// (produced by `sui gen api --translate` / `sui gen changelog --translate`). The sui generator
// writes `zh-CN.json` while the site locale code is `zh`, so resolve the file via an alias map
// instead of relying on the global i18n messages merge.
const GENERATED_LOCALE_FILES: Record<string, string> = {
  zh: 'zh-CN'
};

const generatedLocaleModules = import.meta.glob<LocaleMessages>('../generated/{api,changelog}-locales/*.json', {
  eager: true,
  import: 'default'
});

const generatedMessagesByFile = new Map<string, LocaleMessages>();

for (const [path, messages] of Object.entries(generatedLocaleModules)) {
  const fileName = path.match(/([\w-]+)\.json$/u)?.[1];

  if (fileName) {
    generatedMessagesByFile.set(fileName, messages);
  }
}

function getGeneratedMessages(locale: string): LocaleMessages {
  const fileName = GENERATED_LOCALE_FILES[locale] ?? locale;
  const messages = generatedMessagesByFile.get(fileName);

  if (!messages) {
    return {};
  }

  return messages;
}

function readMessagePath(messages: LocaleMessages, path: string): string | null {
  let current: unknown = messages;

  for (const segment of path.split('.')) {
    if (!current || typeof current !== 'object' || !(segment in current)) {
      return null;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === 'string' ? current : null;
}

export function useGeneratedI18n() {
  const { locale } = useI18n({ useScope: 'global' });
  const generatedMessages = computed(() => getGeneratedMessages(locale.value));

  function resolveGeneratedText(text?: string | null, textKey?: string | null) {
    if (textKey) {
      const translated = readMessagePath(generatedMessages.value, textKey)?.trim();

      if (translated && translated !== textKey) {
        return translated;
      }
    }

    return text?.trim() ?? '';
  }

  return {
    resolveGeneratedText
  };
}
