import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useConfigProvider } from '../components/config-provider/context';

export function useNonce(nonce?: MaybeRefOrGetter<string | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(nonce) || context?.nonce?.value);
}
