import { computed, toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';
import { useContext } from '@soybeanjs/headless/composables';
import type { ThemeSize } from '@/theme';
import type { ConfigProviderContextParams } from './types';

export const [provideConfigProviderContext, useConfigProvider] = useContext(
  'UiConfigProvider',
  (params: ConfigProviderContextParams) => params
);

export function useThemeSize(size?: MaybeRefOrGetter<ThemeSize | undefined>) {
  const context = useConfigProvider();

  return computed(() => toValue(size) || context?.size?.value || 'md');
}
