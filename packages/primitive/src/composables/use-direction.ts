import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { injectConfigProviderContext } from '../components/config-provider/context';
import type { Direction } from '../types';

export function useDirection(dir?: Ref<Direction | undefined>) {
  const context = injectConfigProviderContext({
    dir: ref('ltr')
  });

  return computed(() => dir?.value || context.dir?.value || 'ltr');
}
