import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { resolveLocaleDirection } from '../../locale/locales';
import { useContext } from '../../composables/use-context';
import type { Direction } from '../../types';
import type { ConfigProviderContext } from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext<ConfigProviderContext>('ConfigProvider');

/**
 * Resolve the effective direction: explicit `dir` first, then ConfigProvider, then the
 * `ConfigProvider.locale` (registered locales and known RTL subtags), then `ltr`.
 */
export function useDirection(dir?: MaybeRefOrGetter<Direction | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(dir) || context?.dir || resolveLocaleDirection(context?.locale) || 'ltr');
}

/**
 * Resolve the effective locale: explicit `locale` first, then ConfigProvider, then `en`.
 */
export function useLocale(locale?: MaybeRefOrGetter<string | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(locale) || context?.locale || 'en');
}

/**
 * Resolve the effective nonce: explicit `nonce` first, then ConfigProvider.
 */
export function useNonce(nonce?: MaybeRefOrGetter<string | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(nonce) || context?.nonce);
}
