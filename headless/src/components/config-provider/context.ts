import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import type { Direction } from '../../types';
import { useContext } from '../../composables';
import type { ConfigProviderContextParams } from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext(
  'ConfigProvider',
  (params: ConfigProviderContextParams) => params
);

export function useDirection(dir?: MaybeRefOrGetter<Direction | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(dir) || context?.dir?.value || 'ltr');
}

export function useLocale(locale?: MaybeRefOrGetter<string | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(locale) || context?.locale?.value || 'en');
}

export function useNonce(nonce?: MaybeRefOrGetter<string | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(nonce) || context?.nonce?.value);
}
