import { type Ref, computed, ref } from 'vue';
import { injectConfigProviderContext } from '../components/config-provider/context';

export function useNonce(nonce?: Ref<string | undefined>) {
  const context = injectConfigProviderContext({
    nonce: ref()
  });
  return computed(() => nonce?.value || context.nonce?.value);
}
