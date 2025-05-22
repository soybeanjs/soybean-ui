import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useConfigProvider } from '../components/config-provider/context';
import type { Direction } from '../types';

export function useDirection(dir?: MaybeRefOrGetter<Direction | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(dir) || context?.dir?.value || 'ltr');
}
