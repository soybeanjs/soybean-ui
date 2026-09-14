import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { readGeneratedMessagePath, resolveGeneratedLocaleFileName } from '~/shared/generated-messages';
import type { GeneratedMessages } from '~/shared/generated-messages';

// Generated API / changelog descriptions live in `src/generated/{api,changelog}-locales/*.json`
// (produced by `sui translate api` / `sui translate changelog`), keyed by dotted
// `descriptionKey` / `summaryKey` paths.
const generatedLocaleModules = import.meta.glob<GeneratedMessages>('../generated/{api,changelog}-locales/*.json', {
  eager: true,
  import: 'default'
});

const generatedMessagesByFile = new Map<string, GeneratedMessages>();

for (const [path, messages] of Object.entries(generatedLocaleModules)) {
  const fileName = path.match(/([\w-]+)\.json$/u)?.[1];

  if (fileName) {
    generatedMessagesByFile.set(fileName, messages);
  }
}

function getGeneratedMessages(locale: string): GeneratedMessages {
  return generatedMessagesByFile.get(resolveGeneratedLocaleFileName(locale)) ?? {};
}

export function useGeneratedI18n() {
  const { locale } = useI18n({ useScope: 'global' });
  const generatedMessages = computed(() => getGeneratedMessages(locale.value));

  function resolveGeneratedText(text?: string | null, textKey?: string | null) {
    if (textKey) {
      const translated = readGeneratedMessagePath(generatedMessages.value, textKey)?.trim();

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
