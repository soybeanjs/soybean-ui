import type { Direction } from '../types';
import enLocale from './langs/en';
import zhCNLocale from './langs/zh-CN';
import type { LocaleMessages, LocaleRegistry } from './types';

/**
 * The locale registry is a simple in-memory object that maps locale keys to their corresponding registry entries.
 */
const localeRegistry: Record<string, LocaleRegistry> = {
  [enLocale.key]: enLocale,
  [zhCNLocale.key]: zhCNLocale
};

/**
 * Register a locale so `useLocaleMessages()` can resolve it by name.
 *
 * Call this once at app setup before mounting.
 *
 * Supported forms:
 * 1. `registerLocale(localeRegistry)` for built-in locale files or any custom locale
 *    that needs explicit `name` and `dir` metadata.
 * 2. `registerLocale(key, messages)` for a lightweight custom locale keyed only by
 *    its message table.
 *
 * For example:
 * ```ts
 * import { registerLocale } from '@soybeanjs/headless/locale';
 * import type { LocaleMessages } from '@soybeanjs/headless/locale';
 * import zhTW from '@soybeanjs/headless/locale/zh-TW';
 *
 * registerLocale(zhTW);
 *
 * // or register a custom locale by key:
 *
 * const customMessages: LocaleMessages = {
 *  // ...messages
 * }
 * registerLocale('fr', customMessages);
 * ```
 */
export function registerLocale(locale: LocaleRegistry): void;
export function registerLocale(key: string, messages: LocaleMessages): void;
export function registerLocale(localeOrKey: LocaleRegistry | string, messagesOrLocale?: LocaleMessages): void {
  const locale =
    typeof localeOrKey === 'string'
      ? {
          key: localeOrKey,
          name: localeOrKey,
          messages: messagesOrLocale as LocaleMessages
        }
      : localeOrKey;

  localeRegistry[locale.key] = locale;
}

export function resolveLocaleRegistry(locale?: string): LocaleRegistry {
  return locale ? (localeRegistry[locale] ?? enLocale) : enLocale;
}

/**
 * Look up registered messages for `locale`, falling back to `en`.
 * Only `en` and `zh-CN` are pre-registered by default.
 */
export function resolveLocale(locale: string): LocaleMessages {
  return resolveLocaleRegistry(locale).messages;
}

export function resolveLocaleDirection(locale?: string): Direction {
  return locale ? (localeRegistry[locale]?.dir ?? 'ltr') : 'ltr';
}

export { enLocale as en };
