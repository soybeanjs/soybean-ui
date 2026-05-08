import { en } from './langs/en';
import type { LocaleMessages } from './types';

const localeRegistry: Record<string, LocaleMessages> = { en };

/**
 * Register a locale so `useLocaleMessages()` can resolve it by name.
 *
 * Call this once at app setup before mounting, e.g.:
 * ```ts
 * import { registerLocale } from '@soybeanjs/headless/locale';
 * import { zhCN } from '@soybeanjs/headless/locale/zh-CN';
 * registerLocale('zh-CN', zhCN);
 * ```
 */
export function registerLocale(name: string, messages: LocaleMessages): void {
  localeRegistry[name] = messages;
}

/**
 * Look up registered messages for `locale`, falling back to `en`.
 * Only `en` is pre-registered; all other locales require an explicit
 * `registerLocale()` call to avoid bundling unused language files.
 */
export function resolveLocale(locale: string): LocaleMessages {
  return localeRegistry[locale] ?? en;
}

export { en };
