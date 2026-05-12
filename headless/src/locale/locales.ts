import type { Direction } from '../types';
import enLocale from './langs/en';
import zhCNLocale from './langs/zh-CN';
import type { LocaleMessages } from './types';

const rtlLanguageCodes = new Set(['ar', 'fa', 'he', 'ur']);

const localeRegistry: Record<string, LocaleMessages> = {
  en: enLocale,
  'zh-CN': zhCNLocale
};

function getPrimaryLanguageSubtag(locale?: string): string {
  const normalizedLocale = locale?.trim().replace(/_/gu, '-').toLowerCase();

  if (!normalizedLocale) {
    return 'en';
  }

  return normalizedLocale.split('-')[0] ?? 'en';
}

/**
 * Register a locale so `useLocaleMessages()` can resolve it by name.
 *
 * Call this once at app setup before mounting when you need to add a custom locale
 * or opt into one of the non-pre-registered built-in locale files, e.g.:
 * ```ts
 * import { registerLocale } from '@soybeanjs/headless/locale';
 * import zhTW from '@soybeanjs/headless/locale/zh-TW';
 * registerLocale('zh-TW', zhTW);
 * ```
 */
export function registerLocale(name: string, messages: LocaleMessages): void {
  localeRegistry[name] = messages;
}

/**
 * Look up registered messages for `locale`, falling back to `en`.
 * Only `en` and `zh-CN` are pre-registered by default.
 */
export function resolveLocale(locale: string): LocaleMessages {
  return localeRegistry[locale] ?? enLocale;
}

export function resolveLocaleDirection(locale?: string): Direction {
  return rtlLanguageCodes.has(getPrimaryLanguageSubtag(locale)) ? 'rtl' : 'ltr';
}

export { enLocale as en };
