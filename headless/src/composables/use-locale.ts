import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useConfigProvider } from '../components/config-provider/context';

export function useLocale(locale?: MaybeRefOrGetter<string | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(locale) || context?.locale?.value || 'en');
}
