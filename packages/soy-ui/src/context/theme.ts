import { computed } from 'vue';
import { injectConfigProviderContext } from '../components/config-provider/context';

export function useThemeSize() {
  const context = injectConfigProviderContext();

  const size = computed(() => context.size.value || 'md');

  return size;
}
