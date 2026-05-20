import { createI18n } from 'vue-i18n';
import type { Locale } from 'vue-i18n';
import type { UserModule } from '../types';

type LocaleMessages = Record<string, unknown>;
type LocaleMessageLoader = () => Promise<{ default: LocaleMessages }>;

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {}
});

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.yml$/)?.[1],
    loadLocale
  ])
) as Record<Locale, LocaleMessageLoader>;

const generatedApiLocalesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../generated/api-locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale
  ])
) as Partial<Record<Locale, LocaleMessageLoader>>;

const generatedChangelogLocalesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../generated/changelog-locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale
  ])
) as Partial<Record<Locale, LocaleMessageLoader>>;

export const availableLocales = Object.keys(localesMap);

const loadedLanguages: string[] = [];

function isLocaleMessages(value: unknown): value is LocaleMessages {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cloneLocaleMessages(messages: LocaleMessages): LocaleMessages {
  return Object.fromEntries(
    Object.entries(messages).map(([key, value]) => {
      if (isLocaleMessages(value)) {
        return [key, cloneLocaleMessages(value)];
      }

      return [key, value];
    })
  );
}

function mergeLocaleMessages(...messageGroups: Array<LocaleMessages | undefined>): LocaleMessages {
  const merged: LocaleMessages = {};

  for (const messageGroup of messageGroups) {
    if (!messageGroup) {
      continue;
    }

    for (const [key, value] of Object.entries(messageGroup)) {
      if (isLocaleMessages(value) && isLocaleMessages(merged[key])) {
        merged[key] = mergeLocaleMessages(merged[key] as LocaleMessages, value);
        continue;
      }

      merged[key] = isLocaleMessages(value) ? cloneLocaleMessages(value) : value;
    }
  }

  return merged;
}

async function loadLocaleMessages(lang: Locale): Promise<LocaleMessages> {
  const [messages, generatedApiMessages, generatedChangelogMessages] = await Promise.all([
    localesMap[lang](),
    generatedApiLocalesMap[lang]?.(),
    generatedChangelogLocalesMap[lang]?.()
  ]);

  return mergeLocaleMessages(messages.default, generatedApiMessages?.default, generatedChangelogMessages?.default);
}

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any;
  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', lang);
  }
  return lang;
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang) {
    return setI18nLanguage(lang);
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang);
  }

  // If the language hasn't been loaded yet
  const messages = await loadLocaleMessages(lang as Locale);
  i18n.global.setLocaleMessage(lang, messages);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}

export const install: UserModule = ({ app }) => {
  app.use(i18n);

  let locale = 'en';

  if (!import.meta.env.SSR) {
    const storageLocale = localStorage.getItem('locale');
    if (storageLocale) {
      locale = storageLocale;
    }
  }

  loadLanguageAsync(locale);
};
