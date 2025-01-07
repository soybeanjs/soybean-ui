import { type Ref, computed, ref } from 'vue';
import { injectConfigProviderContext } from '../components/config-provider/context';

export function useLocale(locale?: Ref<string | undefined>) {
  const context = injectConfigProviderContext({
    locale: ref('en')
  });
  return computed(() => locale?.value || context.locale?.value || 'en');
}
